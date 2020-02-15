<template>
  <div id="category">
    <el-button type="danger" @click="addFirst">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-warp">
            <div class="category" v-for="item in category.item" :key="item.id">
              <h4>
                <svg-icon iconClass="minus" class="minus" style="color:#ccc"></svg-icon>
                {{item.category_name}}
                <div class="button_group">
                  <el-button size="mini" type="danger" round @click="editCategory(item)">编辑</el-button>
                  <el-button size="mini" type="success" round>添加子级</el-button>
                  <el-button size="mini" round @click="deleteCategory(item.id)">删除</el-button>
                </div>
              </h4>
              <ul v-if="item.children">
                <li v-for="childItem in item.children" :key="childItem.id">
                  {{childItem.category_name}}
                  <div class="button_group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form label-width="142px" class="form-wrap">
            <el-form-item label="一级分类名称:" v-if="category_first_input">
              <el-input v-model="form.categoryName" :disabled="category_first_disabled"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称:" v-if="category_children_input">
              <el-input v-model="form.secCategoryName" :disabled="category_children_disabled"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="submit"
                :loading="submit_button_loading"
                :disabled="submit_button_disabled"
              >确认</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {
  AddFistCategory,
  GetCategory,
  DeleteCategory,
  EditCategory
} from "@/api/news";
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { common } from "@/api/common";
export default {
  name: "category",
  setup(props, context) {
    const { getInfoCategory, categoryItem } = common();
    const submit_button_type = ref("");
    const edit_categoryId = ref("");
    const submit_button_loading = ref(false);
    const category_first_input = ref(true);
    const category_children_input = ref(true);

    const category_first_disabled = ref(true);
    const category_children_disabled = ref(true);
    const submit_button_disabled = ref(true);
    const form = reactive({
      categoryName: "",
      secCategoryName: ""
    });
    const category = reactive({
      item: []
    });
    //页面挂载完成 执行获取分类信息数据
    onMounted(() => {
      getInfoCategory();
    });
    //监听分类信息数据 赋值
    watch(()=>categoryItem.item, (value)=>{
      category.item = value;
    });
    //点击一级分类按钮
    const addFirst = () => {
      submit_button_type.value = "first_add";
      category_first_input.value = true;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
      category_children_input.value = false;
    };
    //点击一级分类编辑按钮
    const editCategory = item => {
      submit_button_type.value = "first_edit";
      form.categoryName = item.category_name;
      category_first_disabled.value = false;
      category_children_input.value = false;
      submit_button_disabled.value = false;
      //将分类ID值 存储到变量
      edit_categoryId.value = item.id;
    };
    //点击一级分类添加子级按钮
    //删除分类
    const deleteCategory = id => {
      context.root
        .$confirm("确认删除该条分类信息吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          DeleteCategory({ categoryId: id })
            .then(response => {
              context.root.$message({
                message: response.data.message,
                type: response.data.resCode === 0 ? "success" : "error"
              });
              let index = category.item.findIndex(s => s.id == id);
              category.item.splice(index, 1);
            })
            .catch(error => {});
        })
        .catch(error => {});
    };

    /** 分类提交 */
    const submit = () => {
      submit_button_type.value === "first_add"
        ? addFirstSubmit()
        : editFirstSubmit();
    };

    //新增一级分类提交
    const addFirstSubmit = () => {
      if (!form.categoryName) {
        context.root.$message.error("分类名称不能为空");
        return false;
      }
      submit_button_loading.value = true;
      AddFistCategory({ categoryName: form.categoryName })
        .then(response => {
          context.root.$message({
            message: response.data.message,
            type: response.data.resCode === 0 ? "success" : "error"
          });
          category.item.push(response.data.data);
          submit_button_loading.value = false;
          form.categoryName = "";
          form.secCategoryName = "";
        })
        .catch(error => {
          submit_button_loading.value = false;
          context.refs.form.resetFields();
          form.categoryName = "";
          form.secCategoryName = "";
        });
    };
    //编辑一级分类提交
    const editFirstSubmit = () => {
      EditCategory({
        id: edit_categoryId.value,
        categoryName: form.categoryName
      })
        .then(response => {
          context.root.$message({
            message: response.data.message,
            type: response.data.resCode === 0 ? "success" : "error"
          });
          let data = category.item.filter(s => s.id == edit_categoryId.value);
          data[0].category_name = response.data.data.data.categoryName;
          submit_button_loading.value = false;
        })
        .catch(error => {
          submit_button_loading.value = false;
        });
    };
    return {
      submit_button_type,
      submit_button_loading,
      category_first_input,
      category_children_input,
      category_first_disabled,
      category_children_disabled,
      submit_button_disabled,
      category,
      form,
      submit,
      addFirst,
      deleteCategory,
      editCategory,
      addFirstSubmit,
      editFirstSubmit
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.category-warp {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    position: relative;
    padding-left: 40px;
    svg {
      position: absolute;
      left: 15px;
      top: 15px;
      background-color: #fff;
    }
  }

  li {
    position: relative;
    padding-left: 40px;
    margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    &:hover {
      @include webkit(transition, all 0.5s ease 0s);
      background-color: #f3f3f3;
    }
  }
  .button_group {
    position: absolute;
    z-index: 2;
    right: 11px;
    z-index: 2;
    top: -1px;
    button {
      font-size: 12px;
    }
  }
}
.form-wrap {
  width: 410px;
  padding-top: 26px;
}
.hr-e9e9e9 {
  width: calc(100%+60px);
  margin: 30px 0 30px -30px;
  border: none;
  border-bottom: 1px solid #e9e9e9;
}
</style>