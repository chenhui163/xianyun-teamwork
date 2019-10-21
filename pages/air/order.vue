<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm 
                    :flightsData="flightsData"
                    @set-all-price="setAllPrice"
                />
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <OrderAside 
                    :flightsData="flightsData"
                    :allPrice="allPrice"
                    :count="count"
                />   
            </div>
        </el-row>
    </div>
</template>

<script>
// 引入订创建订单的表单组件
import OrderForm from "@/components/air/orderForm";
// 引入订创建订单的侧边栏组件
import OrderAside from "@/components/air/orderAside";

export default {
    // 注册
    components:{
        OrderForm,
        OrderAside
    },

    // 数据
    data(){
        return {
            // 航班的信息
            flightsData:{
                insurances: [], // 初始化保险数组
                seat_infos: {}  // 初始化座位信息
            },
            // 订单总价格
            allPrice: 0,
            // 订单总人数
            count: 0
        }
    },

    // 页面加载完毕时执行
    mounted(){
        // 从url中获取航班id和座位seat_xid
        const query = this.$route.query;
        
        // 请求航班信息
        this.$axios({
            url: "/airs/" + query.id,
            params: {
                seat_xid: query.seat_xid
            }
        }).then(res=>{
            const { status, data } = res;

            if(status === 200) {
                // 将获取到的保险信息数组赋值给data中的insurances
                this.flightsData = data;
            }
        })
    },

    // 方法
    methods:{
        // 设置订单总价格
        setAllPrice(price, count){
            this.allPrice = price;
            this.count = count;
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>