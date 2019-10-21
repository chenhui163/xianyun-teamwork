<template>
    <div class="aside">
        <div class="air-info">
            <el-row type="flex" justify="space-between" class="info-top">
                <div>{{flightsData.dep_date}}</div>
                <div>{{flightsData.org_city_name}} - {{flightsData.dst_city_name}}</div>
            </el-row>    
            <el-row 
            type="flex" 
            justify="space-between" 
            align="middle" 
            class="info-step">
                <el-col :span="5" class="flight-airport">
                    <strong>{{flightsData.dep_time}}</strong>
                    <span>{{flightsData.org_airport_name}}{{flightsData.org_airport_quay}}</span>
                </el-col>
                <el-col :span="14" class="flight-time">
                    <span>--- {{this.rankTime}} ---</span>
                    <span>{{flightsData.airline_name}}{{flightsData.flight_no}}</span>
                </el-col>
                <el-col :span="5" class="flight-airport">
                    <strong>{{flightsData.arr_time}}</strong>
                    <span>{{flightsData.dst_airport_name}}{{flightsData.dst_airport_quay}}</span>
                </el-col>
            </el-row> 
        </div>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>订单总价</span>
            <span>金额</span>
            <span>数量</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>成人机票</span>
            <span>￥{{flightsData.seat_infos.org_settle_price}}</span>
            <span>x{{count}}</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>机建＋燃油</span>
            <span>¥{{flightsData.airport_tax_audlet}}/人/单程</span>
            <span>x{{count}}</span>
        </el-row>
        <el-row type="flex" justify="space-between" align="middle" class="info-bar">
            <span>应付总额：</span>
            <span class="price">￥ {{allPrice}}</span>
        </el-row>           
    </div>
</template>

<script>
// 引入计算相隔时间方法
import { getIntervalTime } from "@/untils/untils";

export default {
   
    props: {
        flightsData: {
            type: Object,
            default(){
                return {
                    
                }
            }
        },
        //订单总价格
        allPrice: 0,
        // 订单总人数
        count: 0
    },

    // 计算
    computed: {
        // 计算飞行时间
        rankTime(){
            // 如果数据还没传过来，就不计算
            if(!this.flightsData.dep_time){
                return "";
            }

            const res = getIntervalTime(this.flightsData.dep_time, this.flightsData.arr_time);
            return res;
        }
    }
}
</script>

<style scoped lang="less">
/*aside*/
.aside{
    width: 350px;
    height: fit-content;
    border:1px #ddd solid;
}

.air-info{
    padding:15px;

    .info-top{
        margin-bottom:10px;
        > div:last-child{
            font-size:14px;
        }
    }

    .info-step{
        .flight-airport{
            strong{
                display: block;
                font-size: 22px;
                font-weight: normal;
            }

            span{
                font-size: 12px;
                color:#999;
            }
        }

        .flight-time{
            text-align: center;
            font-size: 12px;
            color:#999;
            span{
                display: block;
            }
        }
    }
}

.info-bar{
    border-top:1px #ddd dashed;
    padding: 10px 15px;
    font-size: 14px;
    color: #666;

    .price{
        font-size:28px;
        color: orange;
    }
}
</style>