<template>
    <div class="container">
        <div class="main" v-if="!flag">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{price}}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">
                        <!-- 二维码 -->
                        <canvas id="qrcode-stage"></canvas>
                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>

        <div class="ispay" v-if="flag">
            <p>订单已支付！</p>
        </div>
    </div>
</template>

<script>
// 引入生成二维码的插件
import QRCode from "qrcode";

export default {

    data(){
        return {
            // 订单价格
            price: 0,
            // 支付信息
            payInfo : {},
            // 订单编号
            orderNo: "",
            // 定时器编号
            timer: "",

            // 判断是否已支付
            flag: false
        }
    },
    
    mounted(){
        // 获取订单id
        const id = this.$route.query.id;
        // 获取本地存储的token
        const token = this.$store.state.user.userInfo.token || JSON.parse(localStorage.getItem('vuex')|| "{}").user.userInfo.token;
        
        // 设置定时器
        setTimeout(async () => {
            // 请求订单详情
            const res = await this.$axios({
                url: "/airorders/" + id,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            // 获取付款链接，付款金额
            const { payInfo, price, orderNo} = res.data;

            if(res.status===200){
                this.price = price;
                this.payInfo = payInfo;
                this.orderNo = orderNo;

                // 生成二维码到canvas
                const stage = document.querySelector("#qrcode-stage");
                QRCode.toCanvas(stage, payInfo.code_url, {
                    width: 200
                }); 

                // 第一次查询付款状态
                const result = await this.isPay();
                const { statusTxt } = result.data;
                if(statusTxt==="支付完成"){
                    this.$message.success("支付完成！");
                    // 支付完成时，清除定时器
                    clearInterval(this.timer);
                    // 开关变为true
                    this.flag = true;
                }
            }

            // 设置定时器
            this.timer = setInterval(async ()=>{
                if(this.flag) return ;
                
                const res = await this.isPay();
                const { statusTxt } = res.data;
                if(statusTxt==="支付完成"){
                    this.$message.success("支付完成！");
                    // 支付完成时，清除定时器
                    clearInterval(this.timer);
                    // 开关变为true
                    this.flag = true;
                }
            },3000);

        }, 200);
    },

    // 页面销毁的时候
    destroyed(){
        // 清除定时器
        clearInterval(this.timer);
    },

    // 方法
    methods:{
        // 查询付款状态
        async isPay(){
            const id = this.$route.query.id;    // 订单id
            const nonce_str = this.price;       // 支付接口返回的订单金额
            const out_trade_no = this.orderNo;  // 订单编号

            // 发送请求查询付款状态
            const res = await this.$axios({
                url: "/airorders/checkpay",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                },
                data: {
                    id,
                    nonce_str,
                    out_trade_no
                }
            });
            return res;
        }
    }

}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }

    .ispay{
        text-align: center;
        font-size: 20px;
    }
}
</style>