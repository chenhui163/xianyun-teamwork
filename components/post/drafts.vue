<template>
  <div>
    <div class="drafts">
      <h3>草稿箱</h3>
      <ul>
        <li v-for="(item,index) in postList" :key="index" class="item">
          <div class="box">
            <span class="title" @click="editDrafts(item,index)">
              <span>{{item.title}}</span>
              <i class="el-icon-edit edit"></i>
            </span>
            <i class="el-icon-delete delete" @click="deletList(index)"></i>
          </div>
          <div class="time">{{item.time}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    editDrafts(item) {
      const data = { ...item };
      this.$emit("editDraft", data);
    },
    deletList(index) {
      let arr = [...this.postList];
      arr.splice(index, 1);
      this.$store.commit("posts/coverPosts", arr);
    }
  },
  mounted() {},
  computed: {
    postList() {
      return this.$store.state.posts.postLists;
    }
  }
};
</script>

<style scoped lang="less">
.drafts {
  padding: 10px;
  width: 200px;
  color: #666;
  border: 1px solid #ccc;
  h3 {
    text-align: center;
    margin-bottom: 20px;
  }
  .item {
    margin-bottom: 10px;
    .box {
      position: relative;
      display: flex;
      .title {
        position: relative;
        color: #000;
        font-size: 14px;
        cursor: pointer;
        width: 140px;
        padding-right: 20px;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
        white-space: nowrap;
        text-overflow: ellipsis;
        .edit {
          position: absolute;
          right: 0;
        }
      }
      .title:hover {
        color: orange;
        text-decoration: underline;
      }
      .delete {
        right: 5px;
        position: absolute;
      }
      .delete:hover {
        color: red;
        cursor: pointer;
      }
    }
    .time {
      font-size: 12px;
    }
  }
}
</style>