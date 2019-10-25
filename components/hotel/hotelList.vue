<template>
    <div>
        <!-- 酒店列表 -->
        <el-row class="hotel-list">
            <!-- 图片部分 -->
            <el-col class="img" :span="8">
                 <el-image class="imgs" :src="item.photos" @click="handleClick" ></el-image>
            </el-col>

            <!-- 酒店信息 -->
            <el-col class="info" :span="16">
                <el-col class="info-text" :span="15">
                    <h3 @click="handleClick">{{item.name}}</h3>
                    <p class="hotel-type">
                        {{item.alias}}
                        <el-tooltip class="item" effect="dark" content="3星级" placement="top-start">
                            <span>
                                <i class="el-icon-star-on"></i>
                                <i class="el-icon-star-on"></i> 
                                <i class="el-icon-star-on"></i>
                            </span>
                        </el-tooltip>
                        {{item.hoteltype.name}}
                    </p>
                    <p class="hotel-comment">
                        <!-- 评分星星显示部分 -->
                        <span class="comment-start" :span="10">
                            <!-- 底层的星星，灰色 -->
                            <span class="start-off">
                               <i class="el-icon-star-off"></i>
                               <i class="el-icon-star-off"></i>
                               <i class="el-icon-star-off"></i>
                               <i class="el-icon-star-off"></i>
                               <i class="el-icon-star-off"></i>
                            </span>
                            <!-- 评分的星星，高亮 -->
                            <span class="start-on" :style="`width: ${item.stars*20}%;`">
                               <i class="el-icon-star-off"></i>
                               <i class="el-icon-star-off"></i>
                               <i class="el-icon-star-off"></i>
                               <i class="el-icon-star-off"></i>
                               <i class="el-icon-star-off"></i>
                            </span> 
                        </span>
                        <em class="comment-score" :span="4"><i class="color-orangered">{{item.stars}}分</i></em>
                        <em class="comment-count" :span="5"><i class="color-orangered">{{item.all_remarks}}</i>条评价</em>
                        <em class="comment-travel" :span="5"><i class="color-orangered">{{item.common_remark}}</i>篇游记</em>
                    </p>
                    <p class="comment-location">
                        <span class="el-icon-location"></span>
                        位于: {{item.address}}
                    </p>
                </el-col>
                <el-col class="info-price" :span="9">
                    <div class="price-row" v-for="(v,i) in item.products" :key="i" @click="handleJump">
                        <p>{{v.name}}</p>
                        <p>
                            <span class="price">￥{{v.price}}</span>起
                            <i class="el-icon-arrow-right"></i>
                        </p>
                    </div>
                    
                </el-col>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    props:{
        item:{
            type: Object,
            // 默认是空对象      
            default: {}    
        }
    },
    methods: {
        // 跳转到酒店详情页
        handleClick(){
            const cityId = this.$route.query.city 
            const id = this.item.id

            this.$router.push({
                path: '/hotel/hotelDetail',
                query:{
                    cityId,
                    id
                }
            })
        },

        // 跳转到酒店网站
        handleJump(){
             location.href="https://hotels.ctrip.com/international/1646544.html?isfull=F&cbn=77&ecp=3550&ep=601059138&sd=F&Currency=USD&Exchange=7.0691&MinPriceRoomShadowID=0&ti=110106-b557256e-c381-47ed-abff-26486ed29a88&pi=102102&tt=1571966822&NoShowSearchBox=T&listproductid=1646544&listismemberlogin=F&liststarttime=2019-10-26&listendtime=2019-10-27&listhasfilters=false&listdatetime=2019-10-25%2009:27:06&masterhotelid=1646544&hcityid=11080#ctm_ref=hi_0_0_0_0_lst_sr_2_df_ls_4_n_hi_0_0_0";
        }
    }

}
</script>

<style scoped lang="less">

    /* 酒店列表 */
    .hotel-list{
        // margin-bottom: 20px;
        padding: 25px 0;
        border-bottom: 1px solid #eeeeee;

        /* 图片 */
        .img{
            box-sizing: border-box;
            padding: 0 10px;
            .imgs{
                width: 313px;
                height: 209px;
                cursor: pointer;
            }
        }

        /* 酒店信息 */
        .info{
            .info-text{
                box-sizing: border-box;
                padding: 0 10px;

                h3{
                    font-size: 24px;
                    font-weight: 400;
                    cursor: pointer;
                }
                .hotel-type{
                    margin-bottom: 10px;
                    font-size: 16px;
                    color: #999;
                    i{
                        color: #ff9900;
                    }
                }
                /* 酒店评论 */
                .hotel-comment{
                    margin-bottom: 10px;
                    /* 星星部分 */
                    .comment-start{
                        position: relative;
                        .start-off{
                            i{
                                font-size: 14px;
                                color: gray;
                            }
                        }
                        .start-on{
                            position: absolute;
                            left: 0;
                            top: 0;
                            display: inline-block;
                            white-space: nowrap;
                            overflow: hidden;
                            i{
                                font-size: 14px;
                                color: #ff9900;
                            }
                        }
                    }
                    /* 评分 */
                    .comment-score{
                        margin-right: 15px;
                        font-size: 14px;
                    }
                    /* 评价 */
                    .comment-count{
                        margin-right: 15px;
                        font-size: 16px;
                    }

                    /* 数字颜色 */
                    .color-orangered{
                        color: #ff9900;
                    }
                }
                .comment-location{
                    font-size: 14px;
                    color: #666;
                }
            }
            .info-price{
                box-sizing: border-box;
                margin-top: 15px;
                padding: 0 10px;

                .price-row{
                    display: flex;
                    align-items: center;
                    text-indent: 10px;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    color: #606266;
                    border-bottom: 1px solid #ebeef5;
                    cursor: pointer;

                    p{
                        display: inline-block;
                        width: 50%;
                    }
                    .price{
                        font-size: 16px;
                        color: #ff9900;
                    }
                }
                .price-row:hover{
                    background: #f5f7fa;
                }
            }
        }
    }


</style>