<template>
    <div class="list-filter clearfix">
        <div class="price">
            <el-row class="price-title">
                <el-col :span="12">价格</el-col>
                <el-col :span="12" style="text-align: right;">0-{{this.price}}</el-col>
            </el-row>

            <el-slider v-model="price" :max="4000" @change="handleChange"></el-slider>
        </div>

        <div class="hotel-grade">
            <p>住宿等级</p>

            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <span v-if="form.levels.length>0">已选{{this.form.levels.length}}项</span>
                    <span v-else>不限</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width:150px">
               
                        <el-checkbox-group v-model="form.levels">

                            <el-dropdown-item v-for="(item,index) in filter.levels" :key="index" >
                                <el-checkbox style="width:100%" :label="item.id">{{item.name}}</el-checkbox>
                            </el-dropdown-item>
                            
                        </el-checkbox-group>

                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class="hotel-grade">
            <p>住宿类型</p>

            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <span v-if="form.types.length>0">已选{{this.form.types.length}}项</span>
                    <span v-else>不限</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width:150px">
            
                        <el-checkbox-group v-model="form.types">

                            <el-dropdown-item v-for="(item,index) in filter.types" :key="index" >
                                <el-checkbox  style="width:100%" :label="item.id">{{item.name}}</el-checkbox>
                            </el-dropdown-item>

                        </el-checkbox-group>
                
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class="hotel-grade">
            <p>酒店设施</p>

            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <span v-if="form.assets.length>0">已选{{this.form.assets.length}}项</span>
                    <span v-else>不限</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width:150px">
 
                        <el-checkbox-group v-model="form.assets">

                            <el-dropdown-item  v-for="(item,index) in filter.assets" :key="index">
                                <el-checkbox style="width:100%" :label="item.id">{{item.name}}</el-checkbox>
                            </el-dropdown-item>

                        </el-checkbox-group>
                    
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class="hotel-grade" style="border-right:none">
            <p>酒店品牌</p>

            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <span v-if="form.brands.length>0">已选{{this.form.brands.length}}项</span>
                    <span v-else>不限</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width:180px; overflow-y: scroll; height:230px">

                        <el-checkbox-group v-model="form.brands">

                            <el-dropdown-item  v-for="(item,index) in filter.brands" :key="index">
                                <el-checkbox style="width:100%" :label="item.id">{{item.name}}</el-checkbox>
                            </el-dropdown-item>

                        </el-checkbox-group>
                        
                
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                // 价格
                price: 4000,
                levels: [], // 酒店等级
                types: [], // 酒店类型
                assets: [], // 酒店设施
                brands: [] // 酒店品牌
            },
            price: 4000,
            hotel_grade: "不限",
            filter:{},
            
        };
    },
    watch:{
        form:{
            deep:true,
            handler(){
                // 复制一份form
                let theFilterOptions = {...this.form};
                let str = "";
                //判断酒店星级，当有值时才进行拼接
                if(theFilterOptions.levels.length > 0){
                    str += "&hotellevel_in=" + theFilterOptions.levels.join("&hotellevel_in=");
                }

                // 判断酒店类型
                if (theFilterOptions.types.length > 0) {
                    str += "&hoteltype=" + theFilterOptions.types.join("&hoteltype=");
                }

                // 判断酒店设施
                if (theFilterOptions.assets.length > 0) {
                    str += "&hotelasset_in=" + theFilterOptions.assets.join("&hotelasset_in=");
                }

                // 判断酒店品牌
                if (theFilterOptions.brands.length > 0) {
                    str += "&hotelbrand_in=" + theFilterOptions.brands.join("&hotelbrand_in=");
                }

                // 判断酒店价格
                str += "&price_lt=" + theFilterOptions.price

                str = `?city=${this.$route.query.city}` + str;

                // 请求酒店数据
                this.$axios({
                    url: "/hotels" + str
                }).then(res=>{
                    const { total, data } = res.data;
                    
                    // 将数据发送回父组件
                    this.$emit("getFilterHotelList", data,total,str);
                })
            }
        },
        $route(){
            this.form = {
                price: 4000,
                levels: [], // 酒店等级
                types: [], // 酒店类型
                assets: [], // 酒店设施
                brands: [] // 酒店品牌
            }
        }
    },
    methods: {
        // 价格滑块松开时触发
        handleChange(){
            this.form.price = this.price
        }
    },
    mounted(){
        this.$axios({
            url:'/hotels/options',
        }).then(res=>{
            this.filter = res.data.data
            // console.log(this.filter);
        })
    }
};
</script>

<style scoped lang="less">
.clearfix:before,
.clearfix:after {
    content: "";
    display: table;
}
.clearfix:after {
    clear: both;
}
.clearfix {
    *zoom: 1;
}
.list-filter {
    border: 1px solid #ddd;
    height: 70px;
    margin-bottom: 20px;
    padding: 5px 0;

    .price {
        width: 25%;
        height: 100%;
        border-right: 1px solid #ddd;
        padding: 0 20px;
        float: left;
        .el-slider {
            margin-top: 5px;
        }
        .price-title {
            font-size: 14px;
            padding: 5px 0;
            color: #666;
        }
    }

    .hotel-grade {
        width: 13.6%;
        height: 100%;
        border-right: 1px solid #ddd;
        padding: 0 20px;
        float: left;
        font-size: 14px;
        color: #666;
        p {
            padding: 5px 0;
        }

        .el-dropdown {
            width: 100%;
            height: 35px;
            line-height: 30px;
            font-size: 13px;
            i {
                text-align: right;
                float: right;
                line-height: 30px;
            }
        }
    }
}
/deep/.el-dropdown-menu__item{
    padding: 0;
}
/deep/.el-checkbox__inner{
    margin-left: 20px;
}
</style>