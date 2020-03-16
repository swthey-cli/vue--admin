<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="6">
        <div class="label-wrap category">
          <label for>分类:</label>
          <div class="warp-content">
            <el-select v-model="data.type_value" style="width:100%;">
              <el-option label="请选择" value>请选择</el-option>
              <el-option
                v-for="item in data.options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              >{{ item.category_name }}</el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="label-wrap date">
          <label for>{{"时间："&nbsp;&nbsp;&nbsp;}}</label>
          <div class="warp-content">
            <el-date-picker
              v-model="data.date_value"
              style="width:100%"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
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
            <selectVue :config="data.configSelect"></selectVue>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="data.search_keyWords" placeholder="请输入内容" style="width:100%"></el-input>
      </el-col>
      <el-col :span="18">
        <div class="label-wrap btn_button">
          <label for></label>
          <div class="warp-content">
            <el-button type="danger" size="small" @click="getNewsList">查询</el-button>
            <el-button type="success" size="small" @click="data.dialog_info = true">新增</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <tableVue :config="data.configTable">
      <template v-slot:imgUrl="slotData">
        <img :src="slotData.data.imgUrl" min-width="70" height="70" />
      </template>
      <template v-slot:operation="slotData">
        <el-button type="success" size="mini" @click="edit_item(slotData.$index, slotData.data)">编辑</el-button>
        <el-button type="success" size="mini" @click="edit_detail_item(slotData.data)">编辑详情</el-button>
        <el-button @click="delete_item(slotData.$index, slotData.data)" type="danger" size="mini">删除</el-button>
      </template>
    </tableVue>
    <!--新增弹窗-->
    <DialogInfo :flag.sync="data.dialog_info" :category="data.options.category"></DialogInfo>
    <!--编辑弹窗-->
    <DialogEditInfo
      :flag.sync="data.edit_info"
      :edit_id="data.row_id"
      :category="data.options.category"
      @getNewInfoList="getNewsList"
    ></DialogEditInfo>
  </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import DialogEditInfo from "./dialog/eidt";
import tableVue from "@/components/Table";
import { GetCategory, GetNewsList, DeleteInfo } from "@/api/news";
import selectVue from "@/components/Select";
import { global } from "@/utils/global";
import { common } from "@/api/common";
import { formatDate } from "@/utils/common";
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
export default {
  name: "infoIndex",
  components: { DialogInfo, DialogEditInfo, selectVue, tableVue },
  setup (props, { root, refs }) {
    const { str, confirm } = global();
    const { getInfoCategory } = common();
    //基础数据
    const data = reactive({
      configTable: {
        selection: false,
        requestData: {
          url: "getNewList",
          method: "post",
          data: {
            categoryId: "",
            startTiem: "",
            endTime: "",
            title: "",
            id: "",
            pageNumber: 1,
            pageSize: 10
          }
        },
        tHead: [
          { label: "标题", field: "title" },
          {
            label: "类型",
            field: "categoryId",
            formatter: (row) => {
              return toCategroy(row);
            }
          },
          { label: "图片", field: "imgUrl", columnType: "slot", slotName: "imgUrl" },
          {
            label: "日期",
            field: "createDate",
            formatter: (row) => {
              return toDate(row);
            }
          },
          { label: "操作", columnType: "slot", slotName: "operation" }
        ],
        pageination: true
      },
      dialog_info: false, //新增按钮弹窗标识
      edit_info: false, //编辑按钮弹窗标识
      type_value: "", //类型绑定值
      date_value: "", //日期绑定值
      search_key: "id", //关键字下拉框绑定值
      search_keyWords: "", //文本框搜索绑定值
      delete_id: "", //删除数据主键ID
      row_id: "", //编辑获取数据主键ID
      //下拉框绑定数据
      options: {
        category: [] //类型下拉框
      },
      configSelect: ["id", "title"],
      tableData: [], //表格数据
      total: 0, //总记录数
      page: {
        //分页
        pageNumber: 1, //页脚
        pageSize: 5 //页码
      }
    });
    //转换列表类型值
    const toCategroy = row => {
      let res = data.options.category.filter(s => s.id == row.categoryId)[0];
      if (res == null) {
        return "";
      }
      return res.category_name;
    };
    //转换列表日期值
    const toDate = row => {
      return formatDate(row.createDate);
    };
    //获取信息列表表格数据
    const getNewsList = () => {
      let requestData = {
        pageNumber: data.page.pageNumber,
        pageSize: data.page.pageSize
      };
      if (data.type_value) {
        requestData.categoryId = data.type_value;
      }
      if (data.date_value) {
        requestData.startTiem = data.date_value[0];
        requestData.endTime = data.date_value[1];
      }
      if (data.search_keyWords) {
        requestData[data.search_key] = data.search_keyWords;
      }
      GetNewsList(requestData)
        .then(response => {
          data.tableData = response.data.data.data;
          data.total = response.data.data.total;
        })
        .catch();
    };
    //编辑
    const edit_item = (index, row) => {
      data.edit_info = true;
      data.row_id = row.id;
    };
    //编辑详情
    const edit_detail_item = row => {
      // root.$router.push({
      //   path:`/detailInfo/${row.id}/${row.title}`
      // })
      root.$store.commit("infoDetail/UPDATE_STATE_VALUE", {
        id: {
          value: row.id,
          sessionKey: "info_id",
          session: true
        },
        title: {
          value: row.title,
          sessionKey: "info_title"
        }
      });
      root.$router.push({
        name: "DetailInfo",
        params: {
          id: row.id,
          title: row.title
        }
      });
    };
    //单行删除
    const delete_item = (index, row) => {
      data.delete_id = [row.id];
      confirm({ content: "确认删除此信息吗？", fn: delete_confirm });
    };
    //批量删除
    const deleteAll = () => {
      if (!data.delete_id || data.delete_id.length == 0) {
        root.$message.error("请选择需要删除的数据");
        return false;
      }
      confirm({ content: "确认删除选中的信息吗？", fn: delete_confirm });
    };
    const delete_confirm = () => {
      //调用删除接口
      DeleteInfo({ id: data.delete_id })
        .then(response => {
          root.$message.success(response.data.message);
          data.delete_id = "";
          getNewsList(); //调用获取信息列表接口
        })
        .catch(error => {
          console.log(error);
        });
    };
    //获取选中表格行的ID值
    const handleSelectionChange = value => {
      data.delete_id = value.map(item => item.id);
    };
    //挂载完成生命周期函数
    onMounted(() => {
      //调用获取分类赋值给下拉框
      root.$store
        .dispatch("common/getInfoCategory")
        .then(response => {
          data.options.category = response.data.data.data;
        })
        .catch();
      //调用获取信息列表接口
      getNewsList();
    });
    return {
      data,
      delete_item,
      deleteAll,
      getNewsList,
      toDate,
      toCategroy,
      handleSelectionChange,
      edit_item,
      edit_detail_item
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
