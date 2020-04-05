<template>
  <el-dialog
    :title="data.title"
    :visible.sync="data.dialog_info_flag"
    @close="close"
    width="630px"
    :close-on-click-modal="false"
    @opened="opened"
  >
    <el-form :model="data.form" ref="addUserInfo" :rules="data.rules">
      <el-form-item label="用户名:" :label-width="data.formLabelWidth" prop="username">
        <el-input v-model="data.form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" :label-width="data.formLabelWidth" prop="truename">
        <el-input v-model="data.form.truename" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" :label-width="data.formLabelWidth" prop="password">
        <el-input type="password" v-model="data.form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" :label-width="data.formLabelWidth" prop="phone">
        <el-input v-model.number="data.form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="地区:" :label-width="data.formLabelWidth" prop="region">
        <cityIndex :cityPickerData.sync="data.cityPickerData"></cityIndex>
      </el-form-item>
      <el-form-item label="是否启用:" :label-width="data.formLabelWidth" prop="status">
        <el-radio v-model="data.form.status" label="1">禁用</el-radio>
        <el-radio v-model="data.form.status" label="2">启用</el-radio>
      </el-form-item>
      <el-form-item label="角色:" :label-width="data.formLabelWidth" prop="role">
        <el-checkbox-group v-model="data.form.role">
          <el-checkbox v-for="item in data.roleList" :key="item.id" :label="item.role">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger" @click="dialogConfirm('addUserInfo')">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import sha1 from "js-sha1";
import { reactive, ref, watch } from "@vue/composition-api";
import cityIndex from "@/components/CityPicker";
import { GetRoles, AddUser, EditUser } from "@/api/users";
import {
  stripscript,
  ValidateEmail,
  VaildatePass
} from "@/utils/validate.js";
export default {
  name: "addUser",
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: () => { }
    }
  },
  components: { cityIndex },
  setup (props, { root, emit, refs }) {
    //验证用户名
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!ValidateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    //验证密码
    const validatePassword = (rule, value, callback) => {
      if ((data.form.id && value) || (!data.form.id)) {
        data.form.password = stripscript(value);
        value = data.form.password;
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (!VaildatePass(value)) {
          callback(new Error("密码不能含有非法字符，长度在6-20之间"));
        } else {
          callback();
        }
      }
      if (data.form.id && !value) {
        callback();
      }
    };
    const data = reactive({
      dialog_info_flag: false,
      title: "",
      formLabelWidth: "90px",
      cityPickerData: {},
      roleList: [],
      form: {
        username: "",
        truename: "",
        password: "",
        phone: "",
        region: {},
        status: "1",
        role: [],
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        role: [{ required: true, message: "请选择角色", trigger: "change" }]
      }
    });
    watch(() => {
      data.dialog_info_flag = props.flag;
    });
    const getRoles = () => {
      GetRoles().then(response => {
        data.roleList = response.data.data;
      }).catch();
    }
    const resetForm = () => {
      data.cityPickerData = {};
      refs.addUserInfo.resetFields();
    }
    const close = () => {
      data.dialog_info_flag = false;
      resetForm();
      emit("update:flag", false);
    };
    const opened = () => {
      getRoles();
      let editData = props.editData;
      if (editData.id) {
        data.title = "编辑";
        editData.role = editData.role.split(',');
      } else {
        data.title = "新增";
        data.form.id && delete data.form.id;
      }
      for (let key in editData) {
        data.form[key] = editData.id ? editData[key] : "";
      }
    };
    const userEdit = (params) => {
      EditUser(params).then(response => {
        root.$message({
          type: response.data.resCode === 0 ? "success" : "error",
          message: response.data.message
        });
        close();
        //调用查询接口
        emit("refterTableData");
      }).catch();
    }

    const userAdd = (params) => {
      AddUser(params).then(response => {
        root.$message({
          type: response.data.resCode === 0 ? "success" : "error",
          message: response.data.message
        });
        close();
        //调用查询接口
        emit("refterTableData");
      }).catch();
    }

    const dialogConfirm = (formName) => {
      refs[formName].validate(valid => {
        if (valid) {
          let requestData = Object.assign({}, data.form);
          requestData.region = JSON.stringify(data.cityPickerData);
          requestData.role = requestData.role.join();
          if (requestData.id) {
            if (requestData.password) {
              requestData.password = sha1(requestData.password);
            } else {
              delete requestData.password;
            }
            userEdit(requestData);
          } else {
            requestData.password = sha1(requestData.password);
            userAdd(requestData);
          }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    return {
      data,
      close,
      opened,
      dialogConfirm,
      resetForm,
      getRoles
    };
  }
};
</script>
<style lang="sass" scoped>

</style>