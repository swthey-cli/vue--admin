<template>
  <div>
    <el-row>
      <el-col :span="20">
        <div class="label-wrap">
          <label>关键字:</label>
          <div class="warp-content">
            <el-row :gutter="16">
              <el-col :span="5">
                <selectVue :config="data.configSelect" :selectData.sync="data.selectData"></selectVue>
              </el-col>
              <el-col :span="6">
                <el-input v-model="data.search_key" placeholder="请输入搜索的关键字"></el-input>
              </el-col>
              <el-col :span="12">
                <el-button type="danger" @click="renderTable">查询</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right" @click="addUserInfo">新增用户</el-button>
      </el-col>
    </el-row>
    <div class="black-space-30"></div>
    <tableVue ref="userTable" :config="data.configTable" :tableRow.sync="data.tableRow">
      <template v-slot:status="slotData">
        <el-switch
          @change="handlSwitchData(slotData.data)"
          v-model="slotData.data.status"
          inactive-value="1"
          active-value="2"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <template v-slot:operation="slotData">
        <el-button size="small" type="success" @click="eidtUser(slotData.data)">编辑</el-button>
        <el-button size="small" type="danger" @click="deleteUser(slotData.data)">删除</el-button>
      </template>
      <template v-slot:deleteAll>
        <el-button size="small" @click="deleteUserAll">批量删除</el-button>
      </template>
    </tableVue>
    <!--新增弹窗-->
    <addUser :flag.sync="data.dialogUser" :editData="data.editData" @refterTableData="referData"></addUser>
  </div>
</template>
<script>
import { reactive, watch, onMounted } from "@vue/composition-api";
import { DeleteUser, ActivesStatus } from "@/api/users";
import addUser from "./dialog/addUser";
import editUser from "./dialog/editUser";
import selectVue from "@/components/Select";
import tableVue from "@/components/Table";
export default {
  name: "userList",
  components: { selectVue, tableVue, addUser, editUser },
  setup (props, { root, refs }) {
    const data = reactive({
      dialogUser: false,
      search_key: "",
      selectData: {},
      tableRow: {},
      editData: {},
      configSelect: ["name", "phone", "email"],
      configTable: {
        selection: true,
        requestData: {
          url: "getUserList",
          method: "post",
          data: {
            username: "",
            truename: "",
            phone: "",
            pageNumber: 1,
            pageSize: 10
          }
        },
        tHead: [
          { label: "邮箱/用户名", field: "username" },
          { label: "真实姓名", field: "truename" },
          { label: "手机", field: "phone" },
          { label: "地区", field: "region" },
          { label: "角色", field: "role" },
          { label: "禁启用状态", field: "status", columnType: "slot", slotName: "status" },
          { label: "操作", columnType: "slot", slotName: "operation" }
        ],
        pageination: true
      }
    });
    const handlSwitchData = (row) => {
      ActivesStatus({ id: row.id, status: row.status }).then(response => {
        root.$message({
          type: response.data.resCode === 0 ? "success" : "error",
          message: response.data.message
        });
        referData();
      }).catch();
    }
    onMounted(() => {
      console.log(root.$router.params.username);
    })
    const addUserInfo = () => {
      data.dialogUser = true;
      data.editData = Object.assign({});
    }
    //编辑
    const eidtUser = (row) => {
      data.dialogUser = true;
      data.editData = Object.assign({}, row);
    }
    const deleteUser = (row) => {
      data.tableRow.idItem = [row.id];
      deleter({ id: data.tableRow.idItem });
    }
    const deleter = (requestData) => {
      root.$confirm('确认删除选中的数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteUser(requestData).then(response => {
          root.$message({
            type: response.data.resCode === 0 ? "success" : "error",
            message: response.data.message
          });
          referData();
        }).catch();
      }).catch();
    }

    const renderTable = () => {
      refs.userTable.paramsLoadData({
        [data.selectData.value]: data.search_key
      });
    }


    const referData = () => {
      refs.userTable.refresData();
    }
    const deleteUserAll = () => {
      if (!data.tableRow.idItem || data.tableRow.idItem === 0) {
        root.$message({
          type: "error",
          message: "请选择需要删除的数据"
        });
        return false;
      } else {
        deleter({ id: data.tableRow.idItem });
      }
    }

    return {
      data,
      eidtUser,
      deleteUser,
      deleter,
      deleteUserAll,
      referData,
      handlSwitchData,
      addUserInfo,
      renderTable
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
  @include labelDom(left, 60, 40);
}
</style>
