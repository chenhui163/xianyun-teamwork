<template>
  <div class="main">
    <div class="hotel_address">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="nav_bar">
        <el-breadcrumb-item :to="{ path: '/hotel?city=' +cityId }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel?city=' +cityId }">{{hotelInfo.real_city}}酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{hotelInfo.name}}</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="title">
        <span>{{hotelInfo.name}}</span>
        <em class="iconfont">&#xe60e;</em>
        <em class="iconfont">&#xe60e;</em>
        <em class="iconfont">&#xe60e;</em>
        <em class="iconfont">&#xe60e;</em>
        <em class="iconfont">&#xe60e;</em>
        <br />
        <p>{{hotelInfo.alias}}</p>
        <br />
        <i class="el-icon-location"></i>
        <p>{{hotelInfo.address}}</p>
      </div>
    </div>

    <el-row type="flex" class="picture" v-if="hotelInfo.pics">
      <div class="picture_l">
        <!-- <img :src="$axios.defaults.baseURL + hotelInfo.pics[0].url"/> -->
        <img
          src="https://desk-fd.zol-img.com.cn/t_s960x600c5/g4/M07/04/0F/ChMlzF1vGRGIdswoAAM-m0WU7P0AAXiSwHqi_AAAz6z492.jpg"
          ref="mainPic"
        />
      </div>
      <div class="picture_r">
        <div @click="changePic_a">
          <img src="https://desk-fd.zol-img.com.cn/t_s960x600c5/g4/M07/04/0F/ChMlzF1vGRGIdswoAAM-m0WU7P0AAXiSwHqi_AAAz6z492.jpg" />
        </div>
        <div @click="changePic_b">
          <img src="https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/00/0F/ChMkJ1g1WYmIdjyuAAK2AFYZK9IAAYAlQPqRpkAArYY926.jpg" />
        </div>
        <div @click="changePic_c">
          <img src="https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/08/00/ChMkJlafMmeISJltAAZZgNeu0joAAHfJgJka8sABlmY195.jpg" />
        </div>
        <div @click="changePic_d">
          <img src="https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/0A/ChMkJ1bKz3GINVu7AA9Ylkt9unMAALJVQFmtbQAD1iu792.jpg" />
        </div>
        <div @click="changePic_e">
          <img src="https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/03/02/ChMkJ1v8-QGIZsfTAA3ESBvNf6UAAtapADL5CYADcRg723.jpg" />
        </div>
        <div @click="changePic_f">
          <img src="http://5b0988e595225.cdn.sohucs.com/images/20180419/247f318888a64c8f800d2343e4c066d6.jpeg" />
        </div>
      </div>
    </el-row>

    <el-row type="flex" class="hotel_info" v-if="hotelInfo.products">
      <div class="info_title">
        <div>价格来源</div>
        <div>低价房型</div>
        <div>最低价格/每晚</div>
      </div>
      <a href="https://www.ctrip.com/">
        <div>{{hotelInfo.products[0].name}}</div>
        <div>{{hotelInfo.products[0].bestType}}</div>
        <div>
          <i>￥</i>
          <span>{{hotelInfo.products[0].price}}</span> 起
          <i class="el-icon-arrow-right"></i>
        </div>
      </a>
      <a href="http://www.elong.com/">
        <div>{{hotelInfo.products[1].name}}</div>
        <div>{{hotelInfo.products[1].bestType}}</div>
        <div>
          <i>￥</i>
          <span>{{hotelInfo.products[1].price}}</span> 起
          <i class="el-icon-arrow-right"></i>
        </div>
      </a>
      <a href="https://www.hotels.cn">
        <div>{{hotelInfo.products[2].name}}</div>
        <div>{{hotelInfo.products[2].bestType}}</div>
        <div>
          <i>￥</i>
          <span>{{hotelInfo.products[2].price}}</span> 起
          <i class="el-icon-arrow-right"></i>
        </div>
      </a>
    </el-row>

    <div class="map_nav">
      <div class="map">
        <HotelMap></HotelMap>
      </div>
      
      <div class="nav_m">
        <div class="nav_top">
          <!-- <span>风景</span><span>交通</span> -->
          <span v-for="(item, index) in ['风景', '交通']"
          :key="index"
          @click="handleClick(index)"
          :class="{active: current === index}"
          >{{item}}</span>
        </div>
        <div class="nav_bottom" v-if="current === 0">
          <span><i>世纪广场</i><i>0.96公里</i></span>
          <span><i>文澜路广场</i><i>0.52公里</i></span>
          <span><i>山羊公园</i><i>2.08公里</i></span>
          <span><i>南京邮电信息无涯亭</i><i>0.90公里</i></span>
          <span><i>南京财经大学仙林校区广场</i><i>0.47公里</i></span>
          <span><i>敬文林</i><i>0.94公里</i></span>
          <span><i>高觉敷</i><i>0.98公里</i></span>
          <span><i>南京邮电大学仙林校区</i><i>0.89公里</i></span>
          <span><i>仙林曼度广场</i><i>1.06公里</i></span>
          <span><i>山羊湖公园</i><i>1.58公里</i></span>
        </div>
        <div class="nav_bottom" v-if="current === 1">
          <span><i>仙林中心(地铁站)</i><i>0.82公里</i></span>
          <span><i>大成名店(公交站)</i><i>0.10公里</i></span>
          <span><i>大成名店公园停车场</i><i>0.04公里</i></span>
          <span><i>学则路(地铁站)</i><i>1.26公里</i></span>
          <span><i>金鹰奥莱城仙林店停车场</i><i>0.45公里</i></span>
          <span><i>学津路(公交站)</i><i>0.29公里</i></span>
          <span><i>南京财经大学(公交站)</i><i>0.32公里</i></span>
          <span><i>山羊公园(地铁站)</i><i>0.37公里</i></span>
          <span><i>杉湖西路(公交站)</i><i>0.61公里</i></span>
          <span><i>学则路(地铁站)</i><i>0.00公里</i></span>
        </div>
      </div>
    </div>

    <el-row type="flex" class="hotel_info_two">
      <div class="base_info">
        <div>基本信息</div>
        <div>入住时间: 14:00之后</div>
        <div>离点时间: 12:00之前</div>
        <div>{{hotelInfo.creation_time}}/{{hotelInfo.renovat_time}}</div>
        <div>酒店规模：{{hotelInfo.roomCount}}间客房</div>
      </div>
      <div class="main_equipment">
        <div>主要设施</div>
        <div>
          <span>wifi</span>
        </div>
      </div>
      <div class="park">
        <div>停车服务</div>
        <div>{{hotelInfo.parking}}</div>
      </div>
      <div class="brand">
        <div>品牌信息</div>
        <div>-</div>
      </div>
    </el-row>

    <div class="comment">
      <div class="true_comment">
        <!-- <h3>0条真实用户评论</h3> -->
      </div>
      <el-row type="flex" class="num_code">
        <div class="num">
          <div>
            <span>总评分</span>
            ：{{hotelInfo.all_remarks}}
          </div>
          <div>
            <span>好评数</span>
            ：{{hotelInfo.good_remarks}}
          </div>
          <div>
            <span>差评数</span>
            ：{{hotelInfo.bad_remarks}}
          </div>
        </div>
        <div class="code">
          <div class="code_one">
            <el-rate
              v-model="hotelInfo.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}分"
            ></el-rate>
            <div class="shallow"></div>
            <div class="shallow_text">推荐</div>
          </div>

          <div class="code_two" v-if="hotelInfo.scores">
            <div class="two_in">
              <div>环境</div>
              <div>{{hotelInfo.scores.environment}}</div>
            </div>
            <el-progress
              v-if="hotelInfo.scores"
              type="circle"
              :percentage="hotelInfo.scores.environment * 10"
              color="#ff9900"
            ></el-progress>
          </div>

          <div class="code_three" v-if="hotelInfo.scores">
            <div class="three_in">
              <div>产品</div>
              <div>{{hotelInfo.scores.product}}</div>
            </div>
            <el-progress
              v-if="hotelInfo.scores"
              type="circle"
              :percentage="hotelInfo.scores.product * 10"
              color="#ff9900"
            ></el-progress>
          </div>

          <div class="code_four" v-if="hotelInfo.scores">
            <div class="four_in">
              <div>服务</div>
              <div>{{hotelInfo.scores.service}}</div>
            </div>
            <el-progress
              v-if="hotelInfo.scores"
              type="circle"
              :percentage="hotelInfo.scores.service * 10"
              color="#ff9900"
            ></el-progress>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import HotelMap from "@/components/hotel/hotelMap";

export default {
  data() {
    return {
      //酒店信息
      hotelInfo: {},
      cityId: "",
      current: 0
    };
  },

  mounted() {
    const { id, cityId } = this.$route.query;
    console.log(id, cityId);
    this.cityId = cityId;

    this.$axios({
      url: "/hotels?id=" + id
    }).then(res => {
      this.hotelInfo = res.data.data[0];
      console.log(this.hotelInfo);

      localStorage.setItem("loc_one", this.hotelInfo.location.latitude);
      localStorage.setItem("loc_two", this.hotelInfo.location.longitude);
    });
  },

  methods: {
    handleClick(index){
      //点击时候改变current
      this.current = index
      
    },
    changePic_a() {
      var pic = this.$refs.mainPic;
      pic.src =
        "https://desk-fd.zol-img.com.cn/t_s960x600c5/g4/M07/04/0F/ChMlzF1vGRGIdswoAAM-m0WU7P0AAXiSwHqi_AAAz6z492.jpg";
    },
    changePic_b() {
      var pic = this.$refs.mainPic;
      pic.src =
        "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/00/0F/ChMkJ1g1WYmIdjyuAAK2AFYZK9IAAYAlQPqRpkAArYY926.jpg";
    },
    changePic_c() {
      var pic = this.$refs.mainPic;
      pic.src =
        "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/08/00/ChMkJlafMmeISJltAAZZgNeu0joAAHfJgJka8sABlmY195.jpg";
    },
    changePic_d() {
      var pic = this.$refs.mainPic;
      pic.src =
        "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/0A/ChMkJ1bKz3GINVu7AA9Ylkt9unMAALJVQFmtbQAD1iu792.jpg";
    },
    changePic_e() {
      var pic = this.$refs.mainPic;
      pic.src =
        "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/03/02/ChMkJ1v8-QGIZsfTAA3ESBvNf6UAAtapADL5CYADcRg723.jpg";
    },
    changePic_f() {
      var pic = this.$refs.mainPic;
      pic.src =
        "http://5b0988e595225.cdn.sohucs.com/images/20180419/247f318888a64c8f800d2343e4c066d6.jpeg";
    }
  },

  components: {
    HotelMap
  }
};
</script>

<style scoped lang="less">
.main {
  width: 1000px;
  margin: 20px auto;
  .hotel_address {
    /deep/.nav_bar {
      margin-bottom: 20px;
    }
    .title {
      margin-bottom: 35px;
      span {
        font-size: 26px;
      }
      em {
        color: #ff9900;
      }
      i {
        color: #666;
      }
      p {
        display: inline;
        color: #666;
      }
    }
  }

  .picture {
    margin-bottom: 30px;
    .picture_l {
      flex: 3;
      padding-right: 20px;
      img {
        display: block;
        width: 100%;
      }
    }
    .picture_r {
      flex: 2;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      div {
        width: 196px;
        box-sizing: border-box;
        padding-left: 15px;
        margin-bottom: 13px;
        img {
          display: block;
          width: 100%;
          cursor: pointer;
        }
      }
    }
  }
  .hotel_info {
    flex-direction: column;
    margin-bottom: 58px;
    .info_title {
      display: flex;
      div {
        height: 60px;
        line-height: 60px;
        color: #909399;
        font-weight: 600;
        border-bottom: 1px solid #ccc;
        &:nth-child(1) {
          width: 420px;
          padding-left: 15px;
        }
        &:nth-child(2) {
          width: 420px;
        }
        &:nth-child(3) {
          width: 160px;
        }
      }
    }
    a {
      display: block;
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
      text-decoration: none;
      display: flex;
      &:hover {
        background-color: #f5f7fa;
        transition: all 0.5s;
      }
      div {
        color: #666;
        &:nth-child(1) {
          width: 420px;
          padding-left: 15px;
          i {
            color: #ff9b00;
          }
          span {
            color: #ff9b00;
          }
        }
        &:nth-child(2) {
          width: 420px;
          i {
            color: #ff9b00;
          }
          span {
            color: #ff9b00;
          }
        }
        &:nth-child(3) {
          width: 160px;
          i {
            color: #ff9b00;
          }
          span {
            color: #ff9b00;
          }
        }
      }
    }
  }
  .map_nav {
    display: flex;
    justify-content: space-between;
    .map {
      margin-bottom: 45px;
      width: 650px;
      height: 360px;
    }
    .nav_m {
      width: 330px;
      .nav_top {
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
        span {
          color: #666;
          font-size: 19px;
          &:nth-child(1) {
            margin-right: 40px;
          }
          &:hover {
            color: #409eff;
            cursor: pointer;
          }
        }
      }
      .nav_bottom {
        height: 300px;
        padding: 0 15px;
        overflow-y:scroll;
        span {
          display: block;
          display: flex;
          justify-content: space-between;
          margin-bottom: 21px;
          font-size: 17px;
          color: #666666;
          cursor: pointer;
        }
      }
    }
  }
  .hotel_info_two {
    flex-direction: column;
    margin-bottom: 66px;
    div {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
    }
    .base_info {
      display: flex;
      div {
        margin-right: 50px;
        color: #666;
        &:nth-child(1) {
          color: #000;
          padding-left: 15px;
        }
      }
    }
    .main_equipment {
      display: flex;
      div {
        margin-right: 15px;
        color: #666;
        &:nth-child(1) {
          color: #000;
          margin-right: 50px;
          padding-left: 15px;
        }
        span {
          padding: 6px 15px 6px 15px;
          background-color: #eee;
          border-radius: 8px;
        }
      }
    }
    .park {
      display: flex;
      div {
        margin-right: 50px;
        color: #666;
        &:nth-child(1) {
          color: #000;
          padding-left: 15px;
        }
      }
    }
    .brand {
      display: flex;
      div {
        margin-right: 50px;
        color: #666;
        &:nth-child(1) {
          color: #000;
          padding-left: 15px;
        }
      }
    }
  }

  .comment {
    margin-bottom: 58px;
    .num_code {
      .num {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-right: 99px;
        div {
          color: #ff9900;
          font-size: 20px;
        }
        span {
          background-color: #ff9b00;
          color: #fff;
          padding: 4px;
          border-radius: 4px;
        }
      }
      .code {
        display: flex;
        .code_one {
          position: relative;
          margin-right: 58px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .shallow {
            position: absolute;
            width: 126px;
            height: 126px;
            border: 3px solid #ff9900;
            border-radius: 50%;
            left: -13px;
            opacity: 0.3;
          }
          .shallow_text {
            position: absolute;
            font-size: 30px;
            color: #ff9900;
            opacity: 0.3;
            left: 23px;
            z-index: -999;
            transform: rotate(-30deg);
          }
        }
        .code_two {
          margin-right: 58px;
          position: relative;
          .two_in {
            text-align: center;
            background-color: #ffffff;
            position: absolute;
            color: #ff9900;
            font-size: 27px;
            z-index: 999;
            left: 36px;
            top: 45px;
            div {
              &:nth-child(2) {
                font-size: 20px;
              }
            }
          }
        }
        .code_three {
          margin-right: 58px;
          position: relative;
          .three_in {
            text-align: center;
            background-color: #ffffff;
            position: absolute;
            color: #ff9900;
            font-size: 27px;
            z-index: 999;
            left: 36px;
            top: 45px;
            div {
              &:nth-child(2) {
                font-size: 20px;
              }
            }
          }
        }
        .code_four {
          position: relative;
          .four_in {
            text-align: center;
            background-color: #ffffff;
            position: absolute;
            color: #ff9900;
            font-size: 27px;
            z-index: 999;
            left: 36px;
            top: 45px;
            div {
              &:nth-child(2) {
                font-size: 20px;
              }
            }
          }
        }
      }
    }
  }
  .active{
    color: #409eff !important;
    border-bottom: 2px solid #409eff;
    padding-bottom: 10px;
  }
}
</style>