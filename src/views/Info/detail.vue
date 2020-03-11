<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="信息分类:">
      <el-select v-model="form.category">
        <el-option
          v-for="item in data.category"
          :key="item.id"
          :label="item.category_name"
          :value="item.id"
        >{{ item.category_name }}</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻标题:">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="缩略图:">
      <uploadImg :imgurl.sync="form.imgUrl"></uploadImg>
    </el-form-item>
    <el-form-item label="发布日期:">
      <el-date-picker
        v-model="form.createDate"
        type="datetime"
        placeholder="选择日期时间"
        default-time="24:00:00"
        disabled
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="详细内容:">
      <quillEditor v-model="form.content" ref="myQuilEditor" :options="data.editorOption"></quillEditor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { reactive, onMounted } from "@vue/composition-api";
import uploadImg from "@/components/uploadImg";
import { formatDate } from "@/utils/common";
import { EditNewsInfo, GetNewsList } from "@/api/news";
//富文本编辑器
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "detailInfo",
  components: { quillEditor, uploadImg },
  setup (props, { root }) {
    const data = reactive({
      id: root.$route.params.id || root.$store.getters["infoDetail/info_id"],
      category: [], //分类下拉
      editorOption: {}
    });
    //表单数据
    const form = reactive({
      title: "",
      category: "",
      createDate: "",
      imgUrl: "",
      content: ""
    });
    //获取分类下拉框
    const getInfoselector = () => {
      //调用获取分类赋值给下拉框
      root.$store
        .dispatch("common/getInfoCategory")
        .then(response => {
          data.category = response.data.data.data;
        })
        .catch();
    };
    //获取当前行数据
    const getInfo = () => {
      GetNewsList({
        id: data.id,
        pageNumber: 1,
        pageSize: 1
      })
        .then(response => {
          let result = response.data.data.data[0];
          form.title = result.title;
          form.category = result.categoryId;
          form.createDate = formatDate(result.createDate);
          form.content = result.content;
          form.imgUrl = result.imgUrl;
        })
        .catch();
    };

    onMounted(() => {
      getInfoselector();
      getInfo();
    });
    //提交
    const submit = () => {
      //调用修改接口
      EditNewsInfo({
        id: data.id,
        categoryId: form.category,
        title: form.title,
        content: form.content,
        imgUrl: form.imgUrl
      })
        .then(response => {
          root.$message.success(response.data.message);
        })
        .catch();
    };
    const back = () => {
      root.$router.go(-1);
    };
    return {
      form,
      data,
      getInfo,
      submit,
      back,
      getInfoselector
    };
  }
};
</script>
<style lang="scss" scoped></style>
