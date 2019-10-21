<template>
    <div class="flight-item">
        <div  @click="flag = !flag">
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info">
                <el-col :span="6">
                    <span>{{item.airline_name}} </span> {{item.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{item.dep_time}}</strong>
                            <span>{{item.org_airport_name}}{{item.org_airport_quay}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>{{flightsTime}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{item.arr_time}}</strong>
                            <span>{{item.dst_airport_name}}{{item.dst_airport_quay}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{item.base_price/2}}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend" v-if="flag">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  
                justify="space-between" 
                align="middle"
            >
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <el-row type="flex" justify="space-between" align="middle" class="flight-sell"
                        v-for="(v,i) in item.seat_infos"
                        :key="i"
                    >
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{v.name}}</span> | {{v.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{v.par_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            type="warning" 
                            size="mini"
                            @click="handleChoose(item.id,v.seat_xid)"
                            >
                            选定
                            </el-button>
                            <p>剩余：{{v.discount}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {

    // 声明可接受的变量
    props: {
        // 航班列表数组每一项数据
        item: {
            // 声明接收的item的数据类型
            type: Object,
            // 如果没有传递数据过来，item默认是空数组
            default: {}
        }
    },

    // 数据
    data(){
        return {
            // 控制航班列表具体信息展开的开关
            flag: false
        }
    },

    // 计算属性
    computed:{

        // 航班起止花费时间
        flightsTime(){
            // 获取航班起止时间，转换成数组
            let start = this.item.dep_time.split(":");
            let end = this.item.arr_time.split(":");

            // 转换成分钟
            // 如果飞行时间过了凌晨，就多加24小时到到达时间
            if(end[0]<start[0]){ end[0] += 24;}

            start = start[0] * 60 + (+start[1]);
            end = end[0] * 60 + (+end[1]);

            // 计算相差时间
            const res = end - start;
            const hours = Math.floor(res / 60);
            const minuts = res % 60;

            return `${hours}小时${minuts}分`;
        }
    },

    //方法
    methods:{
        // 选定航班舱位
        // id：航班id
        // seat_xid：舱位id
        async handleChoose(id,seat_xid){
            // 通过url携带参数跳转到机票预定页
            this.$router.push({
                path: "/air/order", 
                query: {
                    id,
                    seat_xid
                }
            })
        }
    }

}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>