<template>
    <div class="container">
        <!-- 幻灯片 -->
        <el-carousel 
        :interval="5000" 
        arrow="always">
            <el-carousel-item
                v-for="(item,index) in banners"
                :key="index"
            >
                <div class="banner-image"
                    :style="`background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;
                    background-size:contain contain;`"
                >
                </div>
            </el-carousel-item>
        </el-carousel>

        <!-- 搜索框 -->
        <div class="banner-content">
            <div class="search-bar">
                
                <!-- tab栏 -->
                <el-row 
                type="flex" 
                class="search-tab">
                    <span v-for="(item,index) in options" 
                        :key="index" 
                        :class="{ active: index===current }"
                        @click="handleClick(index)"
                        >
                        <i>{{item.type}}</i>
                    </span>
                </el-row>
                
                <!-- 输入框 -->
                <el-row 
                    type="flex" 
                    align="middle" 
                    class="search-input"
                >
                    <input :placeholder="options[current].placeholder" v-model="search"/>
                    <i class="el-icon-search" @click="handleCheckPrice"></i>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // 数据
    data(){
        return {
            // 轮播图数据
            banners: [],

            // 首页tab栏选项数据
            options:[
                { type: "攻略", placeholder:"搜索城市" },
                { type: "酒店", placeholder:"搜索附近酒店" },
                { type: "机票", placeholder:"" }
            ],

            // 当前选中的项的索引值
            current: 0,
            search:'', //搜索框
            searchReturn:[] //搜索返回结果
        }
    },

    // 页面加载完毕时执行
    mounted(){
        // 请求首页轮播图数据
        this.$axios({
            url:"/scenics/banners"
        }).then(res=>{
            const {data} = res.data;
            this.banners = data;
        })
    },

    // 方法
    methods:{
        // 让current与当前点击的选项的索引值同步
        handleClick(index){
            this.current = index;

            if(this.options[this.current].type==="机票"){
                this.$router.push("/air");
            }
            
        },
        handleCheckPrice(){
            if(this.options[this.current].type==="酒店"){
                
                this.$axios({
                    url:'/cities?name='+this.search,
                }).then(res=>{
                    this.searchReturn = res.data.data
                    console.log(res);
                    // const city = this.searchReturn[0].name.replace('市','')
                    const city = this.searchReturn[0].id

                    this.$router.push({
                        path:"/hotel",
                        query:{
                            city
                        }
                    })
                })
            }
            
        }
    }

}
</script>

<style scoped lang="less">
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }

    .banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;

        .search-bar{
            width:552px;
            margin:0 auto;
        }

        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{
                background: #eee;
                }
            }

            span{
                width:82px;
                height:36px;
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;

                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }

                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }

        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;

            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }

            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
    }
}
</style>