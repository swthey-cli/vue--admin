<template>
  <el-dialog
    title="编辑"
    :visible.sync="data.dialog_info_flag"
    @close="close"
    width="580px"
    :close-on-click-modal="false"
    @opened="opened"
  >
    <el-form :model="data.form">
      <el-form-item label="类型:" :label-width="data.formLabelWidth">
        <el-select v-model="data.form.category" placeholder="请选择" style="width:100%;">
          <el-option
            v-for="item in data.categoryOption"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          >{{item.category_name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题:" :label-width="data.formLabelWidth">
        <el-input v-model="data.form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概况:" :label-width="data.formLabelWidth">
        <el-input type="textarea" v-model="data.form.content" placeholder="请输入概况"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger" @click="dialogConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { EditNewsInfo, GetNewsList } from "@/api/news";
import { reactive, ref, watch } from "@vue/composition-api";
export default {
  name: "eidtInfo",
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    },
    edit_id: {
      type: String,
      default: ""
    }
  },
  setup(props, { root, emit }) {
    const data = reactive({
      default_category: "",
      categoryOption: [], //分类下拉
      dialog_info_flag: false,
      formLabelWidth: "70px",
      form: {
        category: "",
        title: "",
        content: ""
      }
    });
    watch(() => {
      data.dialog_info_flag = props.flag;
    });
    const close = () => {
      data.dialog_info_flag = false;
      emit("update:flag", false);
    };
    const opened = () => {
      data.categoryOption = props.category;
      GetNewsList({
        id: props.edit_id,
        pageNumber: 1,
        pageSize: 1
      })
        .then(response => {
          let result = response.data.data.data[0];
          data.form.category = result.categoryId;
          data.form.title = result.title;
          data.form.content = result.content;
        })
        .catch(error => {});
    };
    const dialogConfirm = () => {
      //调用修改接口
      EditNewsInfo({
          id:props.edit_id,
          categoryId:data.form.category,
          title:data.form.title,
          content:data.form.content
      }).then(response=>{
         root.$message.success(response.data.message);
         data.dialog_info_flag =false;
         //回调父组件的查询方法
         emit("getNewInfoList");
      }).catch(error=>{
      });
    };
    return {
      data,
      close,
      opened,
      dialogConfirm
    };
  }
};
</script>
<style lang="sass" scoped>

</style>