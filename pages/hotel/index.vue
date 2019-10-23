<template>
    <div class="container">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>酒店</el-breadcrumb-item>
                <el-breadcrumb-item>{{city}}酒店预订</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 目的地酒店搜索工具栏 -->
        <SearchBar @getCityScenics="getCityScenics"/>

        <!-- 介绍信息&地图组件 -->
        <InfoMap :scenics="scenics" :hotel="hotel"/>

        <!-- 酒店列表过滤器 -->
        <ListFilter />

        <!-- 酒店列表 -->
        <HotelList v-for="(item,index) in hotel" :key="index" :item="item" />

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
            :page-sizes="[1, 2, 3, 4]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            v-if="hotel.length"
        ></el-pagination>
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
        data(){
        return {
            pageIndex: 1, // 当前页码
            pageSize: 4, // 每页显示个数
            total: 4,     // 酒店总个数
            hotel:[],       // 酒店列表
            scenics: [], //城市景点数组
            city: ""     //城市名称
        }

    },
    mounted() {
        this.getList()
        // console.log(this.hotel)
    },

    watch:{
        $route(){
            this.getList();
        }
    },

    methods:{
        // 改变每页显示个数时触发
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList()
            
        },
        // 改变当前页下标时触发
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getList()
        },
        getList(){
            this.$axios({
            url:'hotels',
            params:{
                ...this.$route.query,
                _start:(this.pageIndex-1)*this.pageSize,
                _limit:this.pageSize
            }
        }).then(res=>{
            const {data,total} = res.data
            this.hotel = [...data]   // 每次请求数据，酒店列表都会更新
            this.total = total
        })
        },

        // 从酒店搜索栏子组件获取城市景点
        getCityScenics(scenics,city){
            this.scenics = scenics;
            this.city = `${city}市`;
        }
    },
    // 注册
    components: {
        SearchBar,
        InfoMap,
        HotelList,
        ListFilter
    }
};
</script>

<style scoped lang="less">
/* 版心 */
.container {
    margin: 0 auto;
    width: 1000px;
}

/* 面包屑导航 */
.breadcrumb {
    padding: 20px 0;
    font-size: 14px;
    font-weight: 400;
}

/* 酒店搜索工具栏 */
.hotel-search-bar {
}

/* 分页 */
    .list-page{
        margin-bottom: 50px;
        text-align: right;
    }
</style>