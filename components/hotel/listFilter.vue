<template>
    <div class="list-filter clearfix">
        <div class="price">
            <el-row class="price-title">
                <el-col :span="12">价格</el-col>
                <el-col :span="12" style="text-align: right;">0-{{this.form.price}}</el-col>
            </el-row>

            <el-slider v-model="form.price" :max="4000"></el-slider>
        </div>

        <div class="hotel-grade">
            <p>住宿等级</p>

            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    不限
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width:150px">

                    <el-dropdown-item v-for="(item,index) in filter.levels" :key="index">
                        <el-checkbox style="width:100%">{{item.name}}</el-checkbox>
                    </el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class="hotel-grade">
            <p>住宿类型</p>

            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    不限
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width:150px">

                    <el-dropdown-item v-for="(item,index) in filter.types" :key="index">
                        <el-checkbox style="width:100%">{{item.name}}</el-checkbox>
                    </el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class="hotel-grade">
            <p>酒店设施</p>

            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    不限
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width:150px">

                    <el-dropdown-item  v-for="(item,index) in filter.assets" :key="index">
                        <el-checkbox style="width:100%">{{item.name}}</el-checkbox>
                    </el-dropdown-item>
                    
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class="hotel-grade" style="border-right:none">
            <p>酒店品牌</p>

            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    不限
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width:180px; overflow-y: scroll; height:230px">

                    <el-dropdown-item   v-for="(item,index) in filter.brands" :key="index">
                        <el-checkbox style="width:100%">{{item.name}}</el-checkbox>
                    </el-dropdown-item>
                
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
                price: 1,
                levels: [], // 酒店等级
                types: [], // 酒店类型
                assets: [], // 酒店设施
                brands: [] // 酒店品牌
            },
            hotel_grade: "不限",
            filter:{},
        };
    },
    methods: {},
    mounted(){
        this.$axios({
            url:'/hotels/options',
        }).then(res=>{
            this.filter = res.data.data
            console.log(this.filter);
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
</style>