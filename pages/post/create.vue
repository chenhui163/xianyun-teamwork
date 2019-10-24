<template>
  <div class="container">
    <postForm :editDraftData="util" @clearUtil="clearUtil" />
    <drafts @editDraft="editDraft" />
  </div>
</template>

<script>
import postForm from "@/components/post/postForm";
import drafts from "@/components/post/drafts";
export default {
  components: {
    postForm,
    drafts
  },
  data() {
    return {
      util: {}
    };
  },
  methods: {
    editDraft(value){
      this.util = value
    },
    clearUtil(){
      this.util = ''
    }
  }
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  padding-top: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
</style>