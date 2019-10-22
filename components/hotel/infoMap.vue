<template>
    
    <el-row class="indroduce_map">

        <!-- 介绍部分 -->
        <el-col class="indroduce" :span="14">
            <el-row class="area">
                <el-col :span="3">
                    <div>区域：</div>
                </el-col>
                <el-col :span="21">
                        <div class="area-info" :class="{ 'hidden': isHidden }">
                            <span class="area-info-all">全部</span>
                            <a href="#" v-for="(item,index) in scenics" :key="index">{{item.name}}</a>
                        </div>
                        <i @click="handleHidden">
                            <span class="el-icon-arrow-down icon_arrow_down"></span>等{{scenics.length}}个区域
                        </i>
                </el-col>
            </el-row>

            <el-row class="strategy">
                <el-col :span="3">
                    <div>攻略:</div>
                </el-col>
                <el-col :span="21">
                        <div>
                            北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。
                        </div>
                </el-col>
            </el-row>

            <el-row class="average">
                <el-col :span="3">
                    <div>场均
                        <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top-start">
                            <span class="el-icon-info"></span>
                        </el-tooltip>:
                    </div>
                </el-col>
                <el-col :span="21">
                    <el-row>
                        <span :span="8" class="score">
                            <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="top-start">
                                <span>
                                    <i class="el-icon-star-on"></i>
                                    <i class="el-icon-star-on"></i>
                                    <i class="el-icon-star-on"></i>
                                    ￥1999
                                </span>
                            </el-tooltip>
                        </span>
                        <span :span="8" class="score">
                            <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="top-start">
                                <span>
                                    <i class="el-icon-star-on"></i>
                                    <i class="el-icon-star-on"></i>
                                    <i class="el-icon-star-on"></i>
                                    <i class="el-icon-star-on"></i>
                                    ￥5999
                                </span>
                            </el-tooltip>
                        </span>
                        <span :span="8" class="score">
                            <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="top-start">
                                <span>
                                    <i class="el-icon-star-on"></i>
                                    <i class="el-icon-star-on"></i>
                                    <i class="el-icon-star-on"></i>
                                    <i class="el-icon-star-on"></i>
                                    <i class="el-icon-star-on"></i>
                                    ￥9999
                                </span>
                            </el-tooltip>
                        </span>
                    </el-row>
                </el-col>
            </el-row>
            
        </el-col>

        <!-- 地图部分 -->
        <el-col class="map" :span="10">
            <div id="container"></div> 
        </el-col>

    </el-row>

</template>

<script>
export default {
    props:{
        scenics:{
            type: Array,
            default: []
        }
    },

    data(){
        return {
            // 判断是否隐藏的开关条件
            isHidden: false
        }
    },

    methods:{

        // 鼠标点击给 介绍部分-区域-区域信息 隐藏产出部分
        handleHidden(){
            this.isHidden = !this.isHidden;
        }

    },

    mounted(){
        window.onLoad  = function(){

            /* 地图部分js代码 */

            var map = new AMap.Map('container', {
                resizeEnable: true,
                center:[113.264359, 23.12908],  // 中心点坐标
                zoom:15
            });


            // 创建一个 Marker 实例：
            var marker = new AMap.Marker({
                position: new AMap.LngLat(113.26435363558198, 23.129065200285243),    // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '北京'
            });

            // 将创建的点标记添加到已有的地图实例：
            map.add(marker);

            // 创建一个 Marker 实例：
            var marker2 = new AMap.Marker({
                position: new AMap.LngLat(113.26648867395784, 23.13242962690394),    // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '北京'
            });

            // 将创建的点标记添加到已有的地图实例：
            map.add(marker2);

        }

        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=84d0212fd924d073ed43991d7bcaa7a8&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }

}
</script>

<style scoped lang="less">

    /* 隐藏超出部分 */
    .hidden{
        height: 40px;
        overflow: hidden;
    }

    .indroduce_map{
        margin-bottom: 20px;
    }
    
    /* 左边介绍 */
    .indroduce{
        box-sizing: border-box;
        padding: 0 5px;
        color: #666666;
        font-size: 14px;

        /* 区域 */
        .area{
            margin-bottom: 20px;
            /* 区域地名信息 */
            .area-info{

                .area-info-all{
                    margin-right: 14px;
                    padding: 0 2px;
                    color: #999;
                    background: #eee;
                }
                a{
                    margin-right: 14px;
                    padding: 0 2px;
                }
                a:hover{
                    color: #0099ff;
                    text-decoration: underline;
                }

            }

            /* 折叠部分 */
            i{
                color: #999;
                cursor: pointer;
                /* 向下箭头 */
                .icon_arrow_down{
                    margin-right: 5px;
                    color: #f90;
                }
            }
            
        }

        /* 攻略 */
        .strategy{
            margin-bottom: 20px;
        }
        
        /* 场均 */
        .average{
            margin-bottom: 20px;
            .score{
                margin-right: 20px;
                i{
                    color: #ff9900;
                }
            }
        }
    }

/* ************************************* */

    /* 地图容器 */
    #container{
        width:400px;
        height: 280px;
    }

    .map{
        box-sizing: border-box;
        padding: 0 5px;
    }

</style>