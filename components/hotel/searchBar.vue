<template>
    <div class="container">
        <el-form class="hotel-search-bar">
            <el-form-item style="padding-right:10px">
                <el-autocomplete
                    v-model="form.city.value"
                    class="inline-input"
                    placeholder="请输入内容"
                    :fetch-suggestions="queryDestSearch"
                    @select="handleDestSelect"
                    @blur="handleBlur"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item>
                <el-date-picker
                    v-model="form.date"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    default-value="2010-10-01"
                ></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-popover
                    ref="popover5"
                    placement="bottom"
                    width="320"
                    margin-bottom="50"
                    v-model="visible2"
                >
                    <el-row style="padding-bottom:20px; border-bottom: 1px solid #dddddd;">
                        <el-col :span="8">
                            <span>每间</span>
                        </el-col>

                        <el-col :span="8" style="padding: 0 5px;">
                            <el-select v-model="value1" placeholder="成人" size="mini">
                                <el-option
                                    v-for="item in options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>

                        <el-col :span="8" style="padding: 0 5px;">
                            <el-select v-model="value2" placeholder="儿童" size="mini">
                                <el-option
                                    v-for="item in options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>

                    <div style="text-align: right; margin: 0">
                        <el-button
                            size="mini"
                            type="text"
                            @click="visible2 = false"
                            style="padding-top: 25px;"
                        >取消</el-button>
                        <el-button type="primary" size="mini" @click="handleSetNumber">确定</el-button>
                    </div>

                </el-popover>

                <el-input v-popover:popover5 placeholder="人数未定" v-model="values" readonly="readonly" ></el-input>
                <i
                    class="el-icon-user"
                    style="position: absolute; right:10px; top:10px; font-size: 20px; color:#c0c4cc"
                ></i>
            </el-form-item>

            <el-form-item style="padding-left:10px">
                <el-button type="primary" @click="handleCheckPrice">查看价格</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                // 目的地
                city: {
                    id: 0,      // 城市id
                    value: "",  // 城市的名称（去掉市字后）
                    scenics: [], // 城市景点
                },
                date: "",           // 日期
                number: "",         // 人数
            },
            cities:[],  // 输入的目的地请求回来的数组
            visible2: false,
            options1: [
                {
                    value: "1成人",
                    label: "1"
                },
                {
                    value: "2成人",
                    label: "2"
                },
                {
                    value: "3成人",
                    label: "3"
                },
                {
                    value: "4成人",
                    label: "4"
                }
            ],
            options2: [
                {
                    value: "1儿童",
                    label: "1"
                },
                {
                    value: "2儿童",
                    label: "2"
                },
                {
                    value: "3儿童",
                    label: "3"
                },
                {
                    value: "4儿童",
                    label: "4"
                }
            ],
            value1: "",
            value2: "",
            values:""
        };
    },

    watch:{
        
    },
    mounted(){
        // 请求旅游景点
        // this.getTravel();
    },
    methods: {

        // 请求旅游景点
        getTravel(){
            // 请求旅游景点
            this.$axios({
                url: "/cities?name=" + this.form.city.value
            }).then(res=>{
                // 将景点赋值到城市对象中
                this.form.city.scenics = res.data.data[0].scenics; 

                // 把景点数据数组发送回父组件
                this.$emit("getCityScenics", this.form.city.scenics,this.form.city.value);
            })
        },
        
        // 输入目的地提示市名称
        queryDestSearch(value,cb){
            // 如果无值，就直接不执行以下代码
            if(!value){
                cb([]);
                return;
            }

            this.$axios({
                url:"/cities?name=" + value
            }).then(res=>{
                const {data} = res.data;
                // 遍历data数组，给每一项加上value属性
                const cities = data.filter(v=>{
                    v.value = v.name.replace("市","");
                    return v
                });
                // 将搜索到的城市赋值给data中的cities，便于其他模块使用
                this.cities = cities;
                cb(cities);
            })
        },
        
        // 目的地下拉选择时触发
        handleDestSelect(item) {
            // 获取表单需要的数据，目的地的城市id和名称
            this.form.city.value = item.value;
            this.form.city.id = item.id;

            // 请求旅游景点
            this.getTravel();

            // 改变url的城市id
            this.$router.push({
                path:"/hotel",
                query:{
                    city:this.form.city.id
                }
            })
        },

        // 目的地输入框失去焦点时触发
        handleBlur(){
            if(!this.form.city.value) return;

            // 获取表单需要的数据，目的地的城市id和名称
            this.form.city.value = this.cities[0].value;
            this.form.city.id = this.cities[0].id;

        },

        // 人数选框确定按键 ：按下确认人数
        handleSetNumber(){
            this.values = this.value1 + this.value2;
            // 把数字从字符串中提取出来，比如"1成人1儿童"提取成 1,1
            const v1 = this.value1;
            const v2 = this.value2;

            const res1 = +v1.replace("成人","");
            const res2 = +v2.replace("儿童","");
            this.form.number = res1 + res2;

            this.visible2 = false;
        },

        // 查看价格
        handleCheckPrice(){
            if(!this.form.city.id){
                this.$message.error("输入目的地才能进行搜索");
                return ;
            }

            // 准备接口数据
            const city = this.form.city.id;   // 城市id
            const enterTime = this.form.date[0];    // 入住时间
            const leftTime = this.form.date[1];     // 离店时间

            let query = {
                city
            }

            if(this.form.date[0]&&this.form.date[1]){
                query.enterTime = enterTime;
                query.leftTime = leftTime;
            }

            // 请求旅游景点
            this.getTravel();

            // 改变url
            this.$router.push({
                path:"/hotel",
                query
            })
        }
    }
};
</script>

<style scoped lang="less">
.container {
    width: 1000px;
    margin: 0 auto;

    .hotel-search-bar {
        .el-form-item {
            display: inline-block;
        }
    }
}
</style>