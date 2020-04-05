<template>
  <el-select v-model="data.selectedValue" @change="selectChange">
    <el-option
      v-for="item in data.optionsArrs"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>
<script>
import { reactive, onMounted } from '@vue/composition-api'
export default {
  name: "selectVue",
  props: {
    config: {
      type: Array,
      default: []
    },
    selectData: {
      type: Object,
      default: () => { }
    }
  },
  setup (props, { root, emit }) {
    const data = reactive({
      optionsArrs: [],
      selectedValue: "",
      options: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    });
    const initSelectValue = () => {
      let optionArr = [];
      props.config.forEach(element => {
        let arr = data.options.filter(x => x.value == element)[0];
        optionArr.push(arr);
      });
      console.log(data.optionsArrs);
      data.selectedValue = optionArr[0].label;
      data.optionsArrs = optionArr;
    }
    const selectChange = (val) => {
      let selectData = data.optionsArrs.filter(s => s.value == val)[0];
      emit("update:selectData", selectData);
    }
    onMounted(() => {
      initSelectValue();
    })
    return {
      data,
      selectChange
    }
  }
}
</script>
<style lang="scss" scoped>
</style>