<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">
                <!-- fetch-suggestions：类似于input方法，在输入框的值发生变化的时候触发 -->
                <!-- select：点击选中建议项时触发 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                v-model="form.departCity"
                @blur="handleBlur('depart')"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                v-model="form.destCity"
                @blur="handleBlur('dest')"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="form.departDate"
                ></el-date-picker>
            </el-form-item>

            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>

            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>
// 引入moment插件
import moment from "moment";

export default {
    data(){
        return {
            // tab栏的数据
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            // tab栏项的下标
            currentTab: 0,

            // 最终表单要提交的属性
            form:{
                departCity: "", // 出发城市
                departCode: "", // 出发城市代码
                destCity: "",  // 到达城市
                destCode: "",  // 到达城市代码
                departDate: "", // 日期字符串
            },

            // 根据搜索推荐的城市
            cities: []
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            this.currentTab = index;

            if(index===1){
                this.currentTab = 0;
                this.$message.error("暂未开通往返机票购买功能");
            }
        },
        
        // 出发城市输入框值发生变化时候会触发
        // value：输入框的值
        // cb:回调函数，必须要调用，调用时候必须要传递一个数组的参数，
        // 数组中的元素必须是一个对象，对象中必须要有value属性
        queryDepartSearch(value, cb){
            // 如果输入框没有值，不执行搜索
            if(!value){
                this.cities = [];
                cb([]);
                return;
            }

            // 搜索实时机票城市
            this.$axios({
                url: "/airs/city?name=" + value
            }).then(res=>{
                const { data } = res.data;
                // 遍历data数组，给每一项加上value属性
                const cities = data.filter(v=>{
                    v.value = v.name.replace("市","");
                    return v
                });
                // 将搜索到的城市赋值给data中的cities，便于其他模块使用
                this.cities = cities;
                cb(cities);
            });
        },

        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDestSearch(value, cb){
            // 出发城市输入框值发生变化的业务功能和目标城市的一样，因此直接调用出发城市的方法
            // value是目标城市输入框选中的值，cb是目标城市的回调函数
            this.queryDepartSearch(value, cb);
        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            // 获取表单需要的数据，出发城市和出发城市代码
            this.form.departCity = item.value;
            this.form.departCode = item.code;
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            // 获取表单需要的数据，目标城市和目标城市代码
            this.form.destCity = item.value;
            this.form.destCode = item.code;
        },

        // 确认选择日期时触发
        handleDate(value){
            // 使用moment插件的format方法转换日期格式
            this.form.departDate = moment(value).format("YYYY-MM-DD");
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            const { departCity, departCode, destCity, destCode } = this.form;
            this.form.departCity = destCity;
            this.form.departCode = destCode;
            this.form.destCity = departCity;
            this.form.destCode = departCode;
        },

        // 输入框失去焦点时触发
        // 使用中括号获取对象的属性的方式，能够在同一个函数事项两个输入框的赋值
        // 输入框失去焦点时，默认获取第一项
        handleBlur(type){
            // 如果输入框没有值，就不执行下面的动作
            if(this.cities.length === 0 ) return ;

            this.form[type + "City"] = this.cities[0].value;
            this.form[type + "Code"] = this.cities[0].code;
        },

        // 提交表单是触发
        handleSubmit(){

            // 自定义验证
            let rules = {
                // message是错误信息，value是表单中对应的值
                departCity: {
                    message: '请输入出发城市', value: this.form.departCity 
                },
                destCity: {
                    message: '请输入到达城市', value: this.form.destCity 
                },
                departDate: {
                    message: '请输入出发时间', value: this.form.departDate 
                }
            }

            // 循环rules这个对象，判断对象属性的value如果是空的，打印出message错误信息

            // 使用开关思想，初始为true，如果找到value为空的，就改变开关状态
            let flag = true;

            Object.keys(rules).forEach(v=>{
                // 判断如果有空的value，name就不再进行验证，直接return结束
                if(!flag) return;

                const { message, value } = rules[v];
                // 对象属性的value如果是空
                if(!value){
                    // 将flag改变为false
                    flag = false;
                    this.$message.error(message);
                }
            })

            // 如果存在有空的value，直接return结束，否则说明数据完整
            if(!flag) return;

            // 数据完整时执行搜索跳转，同时将数据传递过去
            this.$router.push({
                path: "/air/flights",
                query: this.form
            })

            // 添加航班搜索记录到本地存储
            this.$store.commit("air/setHistory", this.form);
        }
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
    cursor: pointer;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
