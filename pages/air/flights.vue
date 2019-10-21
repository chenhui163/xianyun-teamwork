<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters
            :data="filterFlightsData"
            @handleFilter="handleFilter"
        />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <!-- 遍历航班列表数据，将航班列表数组每一项传递给航班信息组件 -->
        <FlightsItem v-for="(item,index) in pageDate" :key="index" :item="item" />

        <!-- 分页组件 -->
        <!-- 
                    size-change：选择每页显示的数据时会触发，如从每页显示5条切换到每页显示10条
                    current-change：当前显示页面改变时触发，如从第1页切换到第2页
                    current-page：当前页码，也就是pageIndex
                    page-size：每页现实的条数，也就是pageSize
                    page-sizes：每页显示条数选择器的选项设置
                    total：总的数据条数
        -->
        <el-pagination
          v-if="flightsData.flights.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="flightsData.total"
        ></el-pagination>

        <!-- 航班数据为空时的提示信息 -->
        <div class="tips" v-if="flightsData.flights.length===0 && loading">
          <p>温馨提示：暂无相关航班信息</p>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";

// 引入航班列表头部组件
import FlightsListHead from "@/components/air/flightsListHead";
// 引入航班列表组件
import FlightsItem from "@/components/air/flightsItem";
// 引入航班筛选组件
import FlightsFilters from "@/components/air/flightsFilters";
// 引入航班搜索历史记录组件
import FlightsAside from "@/components/air/flightsAside";

export default {
  // 注册
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },

  // 数据
  data() {
    return {
      // 航班列表的总数据
      flightsData: {
        flights: [],
        info: {},
        options: {},
        total: 0
      },

	  // 缓存一份新的列表数据数据，这个列表不会被修改
	  // 要赋初始值，因为有可能组件加载完时，数据还没起请求回来，就会造成报错
      filterFlightsData: {
        flights: [],
        info: {},
        options: {}
      },

      // 当前页码
      pageIndex: 1,
      // 当前页面显示条数
      pageSize: 5,

      // 判断页面是否加载完毕
      loading: false
    };
  },

  // 页面加载完毕时执行
  mounted() {
	  // 请求航班列表数据
	this.getFlightsData();
  },

	// 监听
	watch:{
		$route(){
			// 请求航班列表数据
			this.getFlightsData();
		}
	},

  // 计算
  computed: {
    // 分页使用的数据
    pageDate() {
      // 获取对应页面数据
      const res = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return res;
    }
  },

  // 方法
  methods: {
    // 选择每页显示的数据时会触发
    handleSizeChange(val) {
      // 将分页组件选择的条数同步到pageSize
      this.pageSize = val;
    },
    // 当前显示页码改变时触发
    handleCurrentChange(val) {
      this.pageIndex = val;
    },

    // 根据筛选条件更新航班信息的方法，可接收一个数组
    handleFilter(arr){
        // 根据返回的数据进行页面更新
        // 当this.flightsData.flights产生变化时，页面数据会重新渲染

        // 当有数据传递过时，才进行数据更新
        if(arr){
            this.pageIndex = 1;     // 返回第一页渲染
            this.flightsData.flights = arr;     // 替换要渲染的数据
            this.flightsData.total = arr.length;    // 更新分页组件的条数
        }else{
            // 如果没有数据，说明撤销了筛选
            // 使用备份数据恢复航班信息
            this.pageIndex = 1;
            this.flightsData.total = this.filterFlightsData.flights.length;
            this.flightsData.flights = this.filterFlightsData.flights;
        }
    },

	// 请求航班列表数据
	getFlightsData(){
		// params：get方式传递url参数的方法
		// this.$route.query：获取url地址栏中的参数组成的对象
		this.$axios({
		url: "/airs",
		params: this.$route.query
		}).then(res => {
		const { status, data } = res;
			// 如果请求成功，将数据赋值给航班列表总数据
			if (status === 200) {
				// 将数据赋值给航班列表总数据
				this.flightsData = data;
				// 赋值多一份给缓存数据
				this.filterFlightsData = { ...data };
				// 加载完毕后，修改loading的值为true
				this.loading = true;
			}
		});
	}

  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;

  .tips {
    text-align: center;
  }
}

.aside {
  width: 240px;
}
</style>