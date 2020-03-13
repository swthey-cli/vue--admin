<template>
  <el-select v-model="data.selectedValue">
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
    }
  },
  setup (props, { root }) {
    const data = reactive({
      optionsArrs: [],
      selectedValue: "",
      options: [
        { vlaue: "name", label: "姓名" },
        { vlaue: "phone", label: "手机号" },
        { vlaue: "email", label: "邮箱" },
        { vlaue: "id", label: "ID" },
        { vlaue: "title", label: "标题" }
      ]
    });
    const initSelectValue = () => {

      props.config.forEach(element => {
        let arr = data.options.filter(x => x.vlaue == element)[0];
        data.optionsArrs.push(arr);
      });
      data.selectedValue = data.optionsArrs[0].label;
    }
    onMounted(() => {
      initSelectValue();
    })
    return {
      data
    }
  }
}
</script>
<style lang="scss" scoped>
</style>