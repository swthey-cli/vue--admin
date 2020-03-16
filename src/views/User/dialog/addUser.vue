<template>
  <el-dialog
    title="新增"
    :visible.sync="data.dialog_info_flag"
    @close="close"
    width="630px"
    :close-on-click-modal="false"
    @opened="opened"
  >
    <el-form :model="data.form">
      <el-form-item label="用户名:" :label-width="data.formLabelWidth">
        <el-input v-model="data.form.title" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" :label-width="data.formLabelWidth">
        <el-input v-model="data.form.title" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" :label-width="data.formLabelWidth">
        <el-input v-model="data.form.title" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="地区:" :label-width="data.formLabelWidth">
        <cityIndex :cityPickerData.sync="data.cityPickerData"></cityIndex>
      </el-form-item>
      <el-form-item label="是否启用:" :label-width="data.formLabelWidth">
        <el-radio v-model="data.form.status" label="1">禁用</el-radio>
        <el-radio v-model="data.form.status" label="0">启用</el-radio>
      </el-form-item>
      <el-form-item label="角色:" :label-width="data.formLabelWidth">
        <el-checkbox-group v-model="data.form.roleCode">
          <el-checkbox
            v-for="item in data.form.roleList"
            :key="item.id"
            :label="item.role"
          >{{item.name}}</el-checkbox>
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
import { GetRoles } from "@/api/users";
export default {
  name: "addUser",
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
      form: {
        category: [],
        title: "",
        content: "",
        status: "0",
        roleCode: [],
        roleList: []
      }
    });
    watch(() => {
      data.dialog_info_flag = props.flag;
    })
    const getRoles = () => {
      GetRoles().then(response => {
        data.form.roleList = response.data.data;
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