<template>
  <div class="box">
    <h1 class="title">{{posts.title}}</h1>
    <div class="postinfo">
      <span>攻略: 2019-05-22 10:57</span>
      <span>阅读：{{posts.watch}}</span>
    </div>
    <div class="content" v-html="posts.content"></div>
    <div class="option">
      <div class="option-item">
        <i class="iconfont icontuding">&#xe60d;</i>
        <p>评论()</p>
      </div>
      <div class="star option-item" @click="handlestar(posts.id)"
      :class="{active:star.indexOf(posts.id)>-1}"
      >
        <i class="iconfont icontuding" >&#xe6f8;</i>
        <p>收藏</p>
      </div>
      <div class="share option-item">
        <i class="iconfont icontuding">&#xe60b;</i>
        <p>分享</p>
      </div>
      <div class="like option-item" :class="{active: posts.like === 5||2 }">
        <i class="iconfont icontuding" @click="handlelike(posts.id)">&#xe615;</i>
        <p>点赞({{posts.like}})</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: {},
      star:""
    };
  },

  mounted() {
    this.getpost();

  },

  watch: {
    $route() {
      this.getpost(); 
    }
  },

  methods: {
    // 请求文章
    getpost() {
      const id = this.$route.query.id;
      this.$axios({
        url: "/posts/" + id
      }).then(res => {
        this.posts = res.data;
        this.star  =JSON.stringify(res.data.account.starPosts) 
        console.log(this.posts)

      });
    },
    // 收藏功能
    handlestar(id) {
      // console.log("收藏功能");
      this.$axios({
        url: "/posts/star",
        params: {
          id
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        if (res.status === 0 || res.message === "已收藏") {
          JSON.parse(this.star).push(this.posts.id)
        }
      });
    },
    //点赞功能
    handlelike(id) {
      console.log("点赞功能");
      this.$axios({
        url: "/posts/like",
        params: {
          id
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.like === 1;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.box {
  .title {
    padding-bottom: 10px;
    border-bottom: 1px solid #666;
  }

  .postinfo {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    span {
      color: #666;
      font-size: 16px;
      margin-right: 20px;
    }
  }
}
.content {
  /deep/ img {
    max-width: 100%;
  }
}

.option {
  display: flex;
  justify-content: center;
  padding-top: 60px;

  .option-item {
    text-align: center;
    margin-right: 20px;
    i {
      font-size: 25px;
    }

    p {
      font-size: 14px;
    }
  }
  .active {
    color: #ffa90b;
  }
}
</style>