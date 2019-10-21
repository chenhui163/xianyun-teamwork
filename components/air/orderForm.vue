<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
	  <input type="hidden" :value="allPrice">
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)" v-if="index>0">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in flightsData.insurances" :key="index">
          <el-checkbox
            @change="handleChange(item.id)"
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
	  // 航班数据
    flightsData: {
      type: Object,
      default(){
        return {}
      }
    }
  },

  // 数据
  data() {
    return {
      // 乘机人可以有多个，使用数组保存
      // username：乘机人姓名
      // id：乘机人的证件号
      users: [
        {
          username: "",
          id: ""
        }
      ],

      insurances: [], // 保险id的数组集合
      contactName: "", // 联系人名字
      contactPhone: "", // 联系人电话
      invoice: false, // 是否需要发票，默认fasle
      captcha: "" // 验证码
    };
  },

  // 计算
  computed:{
	  // 订单总价格
	  allPrice(){
		  	if(!this.flightsData) return;

			// 总价格
			let price = 0;
			// 乘机人数
			let count = this.users.length;

			// 计算净票价的价格
			price = this.flightsData.seat_infos.org_settle_price * count;

			// 计算保险价格
			// 找到总数据中保险数组与data中的保险数组id相同的
			// flightsData.insurances中id比下标少1
			this.insurances.forEach(v=>{
				price += this.flightsData.insurances[v-1].price * count;
			})

			// 计算燃油费
			price += this.flightsData.airport_tax_audlet * count;

			// 将数据返回父组件
			this.$emit("set-all-price", price, count);
			// 返回总价格
		  	return price;
	  }
  },

  // 方法
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      // 删除指定位置的1条数据
      this.users.splice(index, 1);
    },

    // 变更保险
    handleChange(id) {
      // 查找insurances数组中是否已存在变更的保险项
      const index = this.insurances.indexOf(id);
      if (index > -1) {
        // 如果找到有相同的，就删除那一项
        this.insurances.splice(index, 1);
      } else {
        // 如果没有找到，就追加到insurances数组中
        this.insurances.push(id);
      }
    },

    // 发送手机验证码
    async handleSendCaptcha() {
        // 判断手机号是否为空，为空的话就不执行下面的发送验证码操作，并弹出提示信息
        if (!this.contactPhone) {
			this.$message.error("请输入手机号码！");
			return ;
        }

        // 调用user模块中的sendCaptcha方法发送验证码
        const res = await this.$store.dispatch("user/sendCaptcha", this.contactPhone);

        const code = res.data.code;
        // 验证码弹窗提示
        if(res.status===200){
            this.$alert(`${code}`, '注册验证码', {
                confirmButtonText: '确定'
            });
        }
    },

    // 提交订单
    handleSubmit() {
        // 显示拼接的表单数据
        const data = {
            users: this.users,
            insurances: this.insurances,
            contactName: this.contactName,
            contactPhone: this.contactPhone,
            captcha: this.captcha,
            invoice: this.invoice,
            seat_xid: this.$route.query.seat_xid,
            air: this.$route.query.id,
		}
		
		// 遍历data，检查是否有空值
		let flag = true;
		for(let key in data){
			// 检查除了发票外的所有属性是否有值，如果没有就将flag变为false
			if(key!=="invoice" && !data[key]){
				flag = false;
			}
		}
		// 根据flag判断data是否完整决定要不要弹出提示信息，true代表完整，false代表不完整
		if(flag){
			this.$message({
				message: "正在生成订单！请稍等",
				type: "success"
			})
		}
        
        // 从本地存储获取token
        const token = this.$store.state.user.userInfo.token || "";
        // 发送请求
        this.$axios({
            url: "/airorders",
            method: "POST",
            data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res=>{
			const {data} = res.data;
			// 如果提交订单成功，跳转到订单支付页
			if(res.status === 200 && res.data.message === "订单提交成功"){
				this.$router.push({
					path: "/air/pay",
					query: {
						id: data.id
					}
				});
			}
        })

    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>