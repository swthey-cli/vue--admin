<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="6">
        <div class="label-wrap category">
          <label for>类型:</label>
          <div class="warp-content">
            <el-select v-model="type_value" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="label-wrap date">
          <label for>{{"时间："&nbsp;&nbsp;&nbsp;}}</label>
          <div class="warp-content">
            <el-date-picker
              v-model="date_value"
              style="width:100%"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="label-wrap key-words">
          <label for>{{"关键字："&nbsp;&nbsp;&nbsp;}}</label>
          <div class="warp-content">
            <el-select v-model="search_key" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in searchOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="search_keyWords" placeholder="请输入内容" style="width:100%"></el-input>
      </el-col>
      <el-col :span="18">
        <div class="label-wrap btn_button">
          <label for></label>
          <div class="warp-content">
            <el-button type="danger" size="small">查询</el-button>
            <el-button type="success" size="small" @click="dialog_info=true">新增</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--表格数据-->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="540"></el-table-column>
      <el-table-column prop="category" label="类型" width="100"></el-table-column>
      <el-table-column prop="date" label="日期" width="200"></el-table-column>
      <el-table-column prop="user" label="管理员" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini">编辑</el-button>
          <el-button @click="handleClick(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--底部分页-->
    <el-row>
      <el-col :span="10">
        <el-button size="medium">批量删除</el-button>
      </el-col>
      <el-col :span="14">
        <el-pagination
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </el-col>
    </el-row>
    <!--编辑弹窗-->
    <DialogInfo :flag.sync="dialog_info"></DialogInfo>
  </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "infoIndex",
  components: { DialogInfo },
  setup(props, context) {
    const dialog_info = ref(false); //新增弹窗标识
    const type_value = ref(""); //类型绑定值
    const date_value = ref(""); //日期绑定值
    const search_key = ref("id"); //关键字绑定值
    const search_keyWords = ref(""); //文本框搜索绑定值
    //类型下拉框数据
    const options = reactive([
      {
        value: 1,
        label: "国际信息"
      },
      {
        value: 2,
        label: "国内信息"
      },
      {
        value: 3,
        label: "行业信息"
      }
    ]);
    //关键字下拉框数据
    const searchOption = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);
    //表格基础数据
    const tableData = reactive([
      {
        title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员"
      },
      {
        title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员"
      },
      {
        title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员"
      },
      {
        title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员"
      }
    ]);
    const handleSizeChange = () => {};
    const handleCurrentChange = () => {};
    return {
      dialog_info,
      type_value,
      date_value,
      search_key,
      search_keyWords,
      options,
      searchOption,
      tableData,
      handleSizeChange,
      handleCurrentChange
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-words {
    @include labelDom(right, 99, 40);
  }
  &.btn_button {
    .warp-content {
      padding-left: 50px;
    }
  }
}
.el-row {
  margin-bottom: 20px;
}
</style>