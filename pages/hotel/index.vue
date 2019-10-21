<template>
    <div class="container">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>酒店</el-breadcrumb-item>
                <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 目的地酒店搜索工具栏 -->
        <SearchBar />

        <!-- 介绍信息&地图组件 -->
        <InfoMap />

        <!-- 酒店列表过滤器 -->
        <ListFilter />

        <!-- 酒店列表 -->
        <HotelList />

    </div>
</template>

<script>
// 引入目的地酒店搜索工具栏组件
import SearchBar from "@/components/hotel/searchBar";
// 引入攻略&地图组件
import InfoMap from "@/components/hotel/infoMap";
// 引入酒店列表
import HotelList from "@/components/hotel/hotelList";
// 引入酒店列表过滤器
import ListFilter from "@/components/hotel/listFilter";


export default {
    // 注册
    components:{
        SearchBar,
        InfoMap,
        HotelList,
        ListFilter
    }
}
</script>

<style scoped lang="less">

    /* 版心 */
    .container{
        margin: 0 auto;
        width: 1000px;
    }

    /* 面包屑导航 */
    .breadcrumb{
        padding: 20px 0;
        font-size: 14px;
        font-weight: 400;
    }

    /* 酒店搜索工具栏 */
    .hotel-search-bar{

    }

    /*  */

</style>