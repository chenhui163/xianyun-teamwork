<template>
  <div class="container-left">
    <h2 class="title">发表新攻略</h2>
    <p>分享你的个人游记，让更多人看到哦</p>
    <el-form :model="formData" :rules="rules" ref="form">
      <el-form-item prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" class="titile-input"></el-input>
      </el-form-item>
      <el-form-item>
        <div id="app">
          <VueEditor :config="config" ref="vueEditor" />
        </div>
      </el-form-item>
      <el-form-item label="选择城市" prop="city">
        <el-autocomplete
          class="inline-input"
          v-model="formData.city"
          :trigger-on-focus="false"
          :fetch-suggestions="querySearch"
          @blur="cityBlur"
          placeholder="请搜索游玩城市"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')" size="small">发布</el-button>
        <span class="draft">
          或者
          <i @click="savaDrafts('form')">保存到草稿</i>
        </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  name: "app",
  props: ["editDraftData"],
  data() {
    return {
      formData: {
        content: "",
        title: "",
        city: "",
        time: ""
      },
      form: {
        content: "",
        title: "",
        city: ""
      },
      util: {},
      inline: "true",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        city: [{ required: true, message: "请输入城市名称", trigger: "blur" }]
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://127.0.0.1:1337/upload",
          name: "files",
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`,
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://127.0.0.1:1337" + res.data[0].url);
          }
        },
        // 上传视频的配置
        uploadVideo: {
          url: "/upload",
          name: "files",
          Authorization: `Bearer` + this.$store.state.user.userInfo.token,
          uploadSuccess: (res, insert) => {
            insert("http://127.0.0.1:1337" + res.data[0].url);
          }
        }
      }
    };
  },
  components: {
    VueEditor
  },
  methods: {
    savaDrafts(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formData.content = this.$refs.vueEditor.editor.root.innerHTML;
          this.getTime();
          const data = { ...this.formData };
          this.$store.commit("posts/setPosts", data);
          for (var key in this.formData) {
            this.formData[key] = "";
          }
          this.$refs.vueEditor.editor.root.innerHTML = "";
          this.$message.success("保存草稿成功");
        } else {
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.form.city = this.util.id;
          this.form.title = this.formData.title;
          this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
          this.formData.content = this.form.content;
          const res = await this.$axios({
            url: "/posts",
            data: this.form,
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
            }
          });
          const { message } = res.data;
          if (message === "新增成功") this.$message.success("发布成功");
          this.formData = {};
          this.util = {};
          this.$refs.vueEditor.editor.root.innerHTML = "";
        } else {
          return false;
        }
      });
    },
    getTime() {
      //new Date() new一个data对象，当前日期和时间
      //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
      this.formData.time = new Date().toLocaleString();
    },
    async querySearch(value, cb) {
      value = value.replace(/\s+/g, "");
      if (value === "") return;
      const res = await this.$axios({
        url: "/airs/city?name=" + value
      });
      const { data } = res.data;
      if (data.length === 0) return;
      this.util = data[0];
      const newData = await data.filter(v => {
        return (v.value = v.name);
      });
      cb(newData);
    },
    cityBlur() {
      if (JSON.stringify(this.util) == "{}") return;
      this.formData.city = this.util.value;
      this.cities = this.util.name;
    },
    handleSelect(item) {
      this.util = item;
    }
  },
  watch: {
    editDraftData() {
      if (this.editDraftData === "") return;
      this.formData = this.editDraftData;
      this.$refs.vueEditor.editor.root.innerHTML = this.editDraftData.content;
      this.$emit("clearUtil");
    }
  }
};
</script>

<style scoped lang="less">
.container-left {
  width: 750px;
  .title {
    font-size: 22px;
    margin-bottom: 10px;
    font-weight: 400;
  }
  p {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .titile-input {
    margin-bottom: 20px;
  }
  .city-input {
    width: 200px;
  }
  #app {
    /deep/p {
      height: 375px;
    }
  }
  .draft {
    margin-left: 10px;
    i {
      color: orange;
      cursor: pointer;
    }
    i:hover {
      text-decoration: underline;
    }
  }
}
</style>