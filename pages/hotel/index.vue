-<template>
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
        <ListFilter @getFilterHotelList="getFilterHotelList" @getFilterPrice="getFilterPrice" />

        <!-- 酒店列表 -->
        <HotelList  v-loading="loading" v-for="(item,index) in hotel" :key="index" :item="item" v-if="item.price <= filterPrice"/>
        <div v-if="hotel.length==0" class="isEmpty">暂无符合条件的酒店</div>
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
            :page-sizes="[5, 10, 15, 20]"
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
            pageSize: 10, // 每页显示个数
            total: 0,     // 酒店总个数
            hotel:[],       // 酒店列表
            scenics: [], //城市景点数组
            city: ""  ,   //城市名称
            filterPrice:9999,
            loading:true,//加载效果
            hotelCity:null
        }

    },
    mounted() {
        this.getList()
        // console.log(this.hotel)
        // 请求旅游景点
            setTimeout(() => {
                this.$axios({
                    url: "/cities?name=" + this.hotelCity.real_city
                }).then(res=>{
                    // 将景点赋值到城市对象中
                    console.log(res);

                    this.scenics = res.data.data[0].scenics; 
                    const city = res.data.data[0].id; 
                    
                    setTimeout(() => {
                        this.$router.push({
                            path:"/hotel",
                            query:{
                                city
                            }
                        })
                    }, 200);
                })

            }, 200);
            
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
            this.loading = true
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
            // console.log(this.hotel[0]);
            this.hotelCity = this.hotel[0]
            this.city = this.hotel[0].city.name;
            console.log(this.hotelCity);

            setTimeout(() => {
                this.loading = false
            }, 1000);
        })
        },

        // 从酒店搜索栏子组件获取城市景点
        getCityScenics(scenics,city){
            this.scenics = scenics;
            this.city = `${city}市`;
        },
        //筛选酒店列表
        getFilterHotelList(data){
            this.hotel = data
        },
        getFilterPrice(filterPrice){
            this.filterPrice = filterPrice
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
/** 没有符合条件的酒店时展示的空提醒的样式 */
.isEmpty{
    text-align: center;
    height: 300px;
    padding-top: 50px;
}
</style>