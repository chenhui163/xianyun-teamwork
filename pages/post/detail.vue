<template>
  <div class="contianer">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a>攻略详情</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-between">
      <!-- 攻略内容 -->
      <el-col :span="17" class="left">
        <div class="aside">
          <PostContent></PostContent>
        </div>

        <!-- 评论部分 -->
        <div class="comment">
          <Comment></Comment>
        </div>
      </el-col>

      <!--攻略推荐  -->
      <el-col :span="7" class="right">
        <p class="top">相关攻略</p>
        <div class="recommend">
          <Recommend v-for="(item,index) in recommend" :key="index" :posts="item"></Recommend>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PostContent from "@/components/post/PostContent";
import Comment from "@/components/post/Comment";
import Recommend from "@/components/post/Recommend";

export default {
  components: {
    PostContent,
    Comment,
    Recommend
  },
  data() {
    return {
      recommend: {}
    };
  },

  mounted() {
    this.$axios({
      url: "/posts/recommend",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      const { data } = res.data;
      this.recommend = data;
      // console.log(this.recommend);
    });
  },

  methods: {}
};
</script>

<style scoped lang="less">

.left {
    margin-right: 30px;
  }
  .contianer {
    padding: 20px;
    width: 1000px;
    margin: 20px auto;
    .aside {
      margin-top: 20px;
    }
    .recommend {
      .top {
        font-size: 18px;
        width: 100%;
        padding-bottom: 10px;
      }
    }
  }
</style>