<template>
  <div>
    <div class="card" @click="handlelink(posts.id)">
      <div class="card-img">
        <img :src="this.posts.images[0]" />
      </div>
      <div class="card-info">
        <div class="title">{{posts.title}}</div>
        <p>2019-09-16 8:11 阅读{{posts.watch}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Object,
      default: {}
    }
  },

  mounted() {},
  methods: {
    handlelink(id) {
      this.$router.push({
        path: "/post/detail",
        query: {
          id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  display: flex;
  padding: 30px 0px;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #999;
  .card-img {
    margin-right: 10px;
    img {
      width: 100px;
      height: 80px;
    }
  }
  .card-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    p {
      font-size: 12px;
    }
  }
}
</style>
