<template>
  <div>
    <!-- 评论楼层 -->
    <div class="comment-floor">
      <!-- 递归 -->
      <comment v-if="data.parent" :data="data.parent" @handleReply="handleReply"></comment>

      <div ref="mous">
        <div class="user">
          <img
            :src="$axios.defaults.baseURL + data.account.defaultAvatar"
            v-if="data.account.defaultAvatar"
          />
          <span>{{data.account.nickname}}</span>
          <span>{{data.created_at}}</span>
          <span class="level">{{data.level}}</span>
        </div>

        <div class="floor-header">
          <span class="text">{{data.content}}</span>

          <div class="pics">
            <img
              v-for="(item,index) in data.pics"
              :key="index"
              :src="$axios.defaults.baseURL+ item.url"
              v-if="item.url"
            />
          </div>
          <em @click="handleReply" ref="rep">回复</em>
        </div>

        <div class="comment-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require("moment");

export default {
  name: "comment",
  props: {
    data: {
      type: Object,
      default: {}
    }
  },

  methods: {
    handleReply() {
      this.$emit("handleReply", this.data);
    }
  }
};
</script>

<style scoped lang="less">
.comment-floor {
  padding: 10px;
  background: #f6f6f6;
  border: 1px solid #eeeeee;

  .user {
    font-size: 14px;
    line-height: 15px;
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      border-radius: 50px;
    }
    .level {
      padding: 0 10px;
      flex: 1;
      text-align: right;
    }
  }
  .floor-header {
    font-size: 13px;
    color: #666;
    padding: 20px 0;
    .pics {
      display: flex;
      img {
        width: 100px;
        height: 100px;
      }
    }
    i {
      font-size: 12px;
      color: #999;
    }
    em {
      float: right;
      cursor: pointer;
    }
  }
}

.comment-floor:not(:first-child) {
  border-top: none;
}
</style>