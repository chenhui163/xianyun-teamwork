<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="conditions.airport" placeholder="起飞机场">
                    <el-option
                    v-for="(item,index) in data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="conditions.flightTimes"  placeholder="起飞时间">
                    <el-option
                    v-for="(item,index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="conditions.company"  placeholder="航空公司">
                    <el-option
                    v-for="(item,index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="conditions.airSize" placeholder="机型">
                    <el-option
                    v-for="(item,index) in sizeOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {

    props:{
        data:{
            type: Object,

            default: {

            }
        }
    },

    data(){
        return {
            // 机型列表
            sizeOptions: [
                {name: "大", size: "L"},
                {name: "中", size: "M"},
                {name: "小", size: "S"},
            ],

            // 声明一个对象，用于存放筛选的条件数据
            conditions : {
                airport: "",        // 出发机场
                flightTimes: "",    // 出发时间
                company: "",        // 选择的航空公司
                airSize: "",        // 选择的飞机型号
            },
        }
    },

    // 监听
    watch:{
        conditions:{ //监听的对象
            deep:true, //深度监听设置为 true
            handler:function(){
                
                // 对总数据进行遍历
                // 假设每一项都是符合条件的
                let arr = this.data.flights.filter( v => {
                    // 定义开关，初始为true
                    let flag = true;

                    // 起飞机场筛选
                    // 有值就判断，无值就不判断，因为无值说明不对该项的这个属性进行筛选，直接放行
                    // 如果 机场 有值，且不与该项的起飞机场的值相等，flag就变为false
                    if(this.conditions.airport && this.conditions.airport !== v.org_airport_name ){
                        flag = false;
                    }

                    // 起飞时间筛选
                    if(this.conditions.flightTimes){
                        // 筛选条件的时间段，切割成数组
                        const flightTimes = this.conditions.flightTimes.split(",");
                        // 总数据每一项的起飞时间的小时部分
                        const start = v.dep_time.split(":")[0];
                        // 筛选判断
                        if(start < +flightTimes[0] || start >= +flightTimes[1]){
                            flag = false;
                        }
                    }

                    // 航空公司筛选
                    if(this.conditions.company && this.conditions.company !== v.airline_name){
                        flag = false;
                    }

                    // 飞机型号筛选
                    if(this.conditions.airSize && this.conditions.airSize !== v.plane_size){
                        flag = false;
                    }

                    return flag;
                });

                // 将数据传回父组件
                this.$emit("handleFilter", arr);
            }
        }
    },

    methods: {
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            // 清空所有筛选条件
            this.conditions.airport = "";
            this.conditions.flightTimes = "";
            this.conditions.company = "";
            this.conditions.airSize = "";

            // 出发事件，恢复备份信息
            this.$emit("handleFilter");
        },
    },

}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>