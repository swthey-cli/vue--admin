<template>
  <el-dialog
    title="编辑"
    :visible.sync="data.dialog_info_flag"
    @close="close"
    width="630px"
    :close-on-click-modal="false"
    @opened="opened"
  >
    <el-form :model="data.form">
      <el-form-item label="用户名:" :label-width="data.formLabelWidth">
        <el-input v-model="data.form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" :label-width="data.formLabelWidth">
        <el-input v-model="data.form.truename" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" :label-width="data.formLabelWidth">
        <el-input type="password" v-model="data.form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" :label-width="data.formLabelWidth">
        <el-input type="number" v-model="data.form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="地区:" :label-width="data.formLabelWidth">
        <cityIndex :cityPickerData.sync="data.cityPickerData"></cityIndex>
      </el-form-item>
      <el-form-item label="是否启用:" :label-width="data.formLabelWidth">
        <el-radio v-model="data.form.status" label="1">禁用</el-radio>
        <el-radio v-model="data.form.status" label="0">启用</el-radio>
      </el-form-item>
      <el-form-item label="角色:" :label-width="data.formLabelWidth">
        <el-checkbox-group v-model="data.form.role">
          <el-checkbox v-for="item in data.roleList" :key="item.id" :label="item.role">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger" @click="dialogConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { reactive, ref, watch } from "@vue/composition-api";
import cityIndex from "@/components/CityPicker";
import { GetRoles, AddUser } from "@/api/users";
export default {
  name: "editUser",
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  components: { cityIndex },
  setup (props, { root, emit }) {
    const data = reactive({
      dialog_info_flag: false,
      formLabelWidth: "90px",
      cityPickerData: {},
      roleList: [],
      form: {
        username: "",
        truename: "",
        password: "",
        phone: 0,
        region: {},
        status: "0",
        role: [],
      }
    });

    watch([() => data.cityPickerData, () => props.flag], ([cityPickerData, flag]) => {
      data.form.region = cityPickerData;
      data.dialog_info_flag = flag;
    });
    const getRoles = () => {
      GetRoles().then(response => {
        data.roleList = response.data.data;
      }).catch();
    }

    const close = () => {
      data.dialog_info_flag = false;
      emit("update:flag", false);
    };
    const opened = () => {
      getRoles();
    };

    const dialogConfirm = () => {
      AddUser({
        username: data.form.username,
        truename: data.form.truename,
        password: data.form.password,
        phone: data.form.phone,
        region: data.form.region,
        status: data.form.status,
        role: data.form.role.join(',')
      }).then(response => {
        root.$message({
          type: response.data.resCode === 0 ? "success" : "error",
          message: response.data.message
        });
        data.dialog_info_flag = false;
        emit("update:flag", false);

      }).catch();
    };
    return {
      data,
      close,
      opened,
      dialogConfirm,
      getRoles
    };
  }
};
</script>
<style lang="sass" scoped>

</style>