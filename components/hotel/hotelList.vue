<template>
    <div>
        <!-- 酒店列表 -->
        <el-row class="hotel-list">
            <!-- 图片部分 -->
            <el-col class="img" :span="8">
                 <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
            </el-col>

            <!-- 酒店信息 -->
            <el-col class="info" :span="16">
                <el-col class="info-text" :span="15">
                    <h3>好来阁商务宾馆</h3>
                    <p class="hotel-type">
                        hao lai ge shang wu hotel
                        <el-tooltip class="item" effect="dark" content="3星级" placement="top-start">
                            <span>
                                <i class="el-icon-star-on"></i>
                                <i class="el-icon-star-on"></i>
                                <i class="el-icon-star-on"></i>
                            </span>
                        </el-tooltip>
                        经济型
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
                            <span class="start-on" style="width: 50%;">
                               <i class="el-icon-star-off"></i>
                               <i class="el-icon-star-off"></i>
                               <i class="el-icon-star-off"></i>
                               <i class="el-icon-star-off"></i>
                               <i class="el-icon-star-off"></i>
                            </span> 
                        </span>
                        <em class="comment-score" :span="4"><i class="color-orangered">3.5分</i></em>
                        <em class="comment-count" :span="5"><i class="color-orangered">62</i>条评价</em>
                        <em class="comment-travel" :span="5"><i class="color-orangered">22</i>篇游记</em>
                    </p>
                    <p class="comment-location">
                        <span class="el-icon-location"></span>
                        位于: 高淳县淳溪镇镇兴路118号(高淳县委党校对面)
                    </p>
                </el-col>
                <el-col class="info-price" :span="9">
                    <div class="price-row">
                        <p>携程</p>
                        <p>
                            <span class="price">￥100</span>起
                            <i class="el-icon-arrow-right"></i>
                        </p>
                    </div>
                    <div class="price-row">
                        <p>艺龙</p>
                        <p>
                            <span class="price">￥60</span>起
                            <i class="el-icon-arrow-right"></i>
                        </p>
                    </div>
                    <div class="price-row">
                        <p>Hotels.com</p>
                        <p>
                            <span class="price">￥40</span>起
                            <i class="el-icon-arrow-right"></i>
                        </p>
                    </div>
                </el-col>
            </el-col>
        </el-row>

        <!-- 分页 -->
        <!-- 
            size-change：改变当前页显示个数
            current-change：改变当前页下标时触发
            current-page：相当于pageIndex
            page-size：相当于pageSize
            page-sizes：选择显示多少页的数组
         -->
        <el-pagination
            class="list-page"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {

    data(){

        return {
            pageIndex: 1, // 当前页码
            pageSize: 10, // 每页显示个数
            total: 0,     // 酒店总个数
        }

    },

    methods: {
        // 改变每页显示个数时触发
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        // 改变当前页下标时触发
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }

}
</script>

<style scoped lang="less">

    /* 酒店列表 */
    .hotel-list{
        margin-bottom: 20px;
        padding: 25px 0;
        border-bottom: 1px solid #eeeeee;

        /* 图片 */
        .img{
            box-sizing: border-box;
            padding: 0 10px;
        }

        /* 酒店信息 */
        .info{
            .info-text{
                box-sizing: border-box;
                padding: 0 10px;

                h3{
                    font-size: 24px;
                    font-weight: 400;
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

    /* 分页 */
    .list-page{
        margin-bottom: 50px;
        text-align: right;
    }

</style>