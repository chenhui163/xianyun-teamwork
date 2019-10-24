<template>
  <div class="comment">
    <p>评论</p>

    <el-tag
      closable
      @close="handleClose"
      v-if="this.replyComment"
      class="tag"
    >回复@ {{this.tags.name}}</el-tag>
    <!-- 评论框 -->
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 3}"
      placeholder="说点什么吧。。。"
      resize="none"
      v-model="content"
      ref="inp"
    ></el-input>

    <!-- 图片上传 -->
    <el-upload
      action="http://127.0.0.1:1337/upload"
      name="files"
      list-type="picture-card"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      ref="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>

    <!-- 提交按钮 -->

    <el-button type="primary" size="mini" class="btn" @click="Submit">提交</el-button>

    <!-- 评论显示区域 -->
    <div class="comment_main">
      <div class="comment_info" v-for="(item, index) in dataList" :key="index">
        <div class="comment_user">
          <img
            :src="$axios.defaults.baseURL + item.account.defaultAvatar"
            v-if="item.account.defaultAvatar"
          />
          <span>{{item.account.nickname}}</span>
          <span class="time">{{item.datatime}}</span>
          <span class="level">{{item.level}}</span>
        </div>

        <!-- 层中楼 -->
        <CommentFloor v-if="item.parent" :data="item.parent" @handleReply="handleReply" />

        <div class="comment-content">
          {{item.content}}
          <div class="pics">
            <img
              v-for="(item,index) in item.pics"
              :key="index"
              :src="$axios.defaults.baseURL+ item.url"
              v-if="item.url"
            />
          </div>
          <em @click="handleReply(item)">回复</em>
        </div>
      </div>
    </div>

    <!-- 分页功能 -->
    <el-row type="flex" justify="center" style="margin-top:10px;">
      <div class="foot">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="comments.length"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import CommentFloor from "@/components/post/CommentFloor";
const moment = require("moment");
export default {
  components: {
    CommentFloor
  },

  data() {
    return {
      tags: { name: "标签一", type: "hidden" },
      isshow: true,

      content: "",
      dialogImageUrl: "",
      pics: [], //图片
      dialogVisible: false, //是否能放大图片预览

      // 评论
      comments: [],
      // 点击回复的评论
      replyComment: null,
      pageIndex: 1,
      pageSize: 2
    };
  },
  methods: {
    getdatalist() {
      const post = this.$route.query.id;
      this.$axios({
        url: "/posts/comments?post=" + post
        // params: {
        //   _start: this.pageIndex-1,
        //   _limit: this.pageSize
        // }
      }).then(res => {
        const { data } = res.data;
        this.comments = data;

        for (let key in data) {
          data[key].datatime = moment(data.created_up).format("YYYY-MM-DD");
        }
        console.log(this.comments);
      });
    },
    handleClose() {
      this.replyComment = null;
    },
    handleSuccess(res, file) {
      console.log(res);
      this.pics.push(res[0]);
    },
    handleRemove(fileList) {
      console.log(this.pics);
    },

    // 提交评论
    async Submit() {
      // 准备数据
      const data = {
        content: this.content,
        pics: this.pics,
        post: this.$route.query.id
      };

      if (this.replyComment) {
        data.follow = this.replyComment.id;
      }

      // 发请求
      const res = await this.$axios({
        method: "POST",
        url: "/comments",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data
      });

      console.log(res.data);
      if (res.data.status === 0) {
        this.$message.success("提交成功");
      }
      setTimeout(() => {
        this.getdatalist();
      }, 200);
      this.content = "";
      this.$refs.upload.clearFiles();
    },

    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },

    // 点击回复按钮时候触发的方法
    handleReply(item) {
      // 获取到当前要回复的id
      this.replyComment = item;
      this.$refs.inp.focus();
      this.tags.name = item.account.nickname;
    }
  },

  computed: {
    dataList() {
      const arr = this.comments.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return arr;
    }
  },
  mounted() {
    this.getdatalist();
  }
};
</script>

<style scoped lang="less">
.comment {
  position: relative;
  width: 100%;
  margin-top: 20px;
  p {
    margin-bottom: 10px;
  }

  .tag {
    margin: 20px 0 10px;
  }
  textarea {
    resize: none;
    width: 100%;
    min-height: 30px;
  }

  /deep/.el-upload {
    width: 100px;
    height: 100px;
    line-height: 100px;
    margin: 10px 0px;
  }

  .btn {
    margin-bottom: 10px;
  }
  .comment_main {
    border: 1px solid #999;
    .comment_info {
      // margin-top: 20px;
      padding: 10px;

      border-bottom: 1px solid rgba(226, 226, 226, 0.8);

      .comment_user {
        font-size: 12px;
        line-height: 10px;
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          border-radius: 50px;
        }
        span {
          color: #666;
          padding: 0 5px;
        }
        .level {
          padding: 0 10px;
          flex: 1;
          text-align: right;
        }
      }
      .comment-content {
        padding: 10px 0;

        .pics {
          display: flex;
          img {
            width: 100px;
            height: 100px;
          }
        }
        em {
          font-size: 12px;
          float: right;
          color: #666;
          cursor: pointer;
        }
      }
    }
  }
}
</style>