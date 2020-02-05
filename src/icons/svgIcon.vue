<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
import {
  reactive,
  ref,
  isRef,
  toRefs,
  onMounted,
  computed
} from "@vue/composition-api";
export default {
  name: "svgIcon",
  //props: ['iconClass','className'],
  props: {
    iconClass: {
      type: String, //定义接收的值类型
      default: ""
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    //计算属性 得出最终结果并返回
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      return props.className ? `svg-icon ${props.className}` : `svg-icon`;
    });
    return {
      iconName,
      svgClass
    };
  }
};
</script>
<style lang="scss" scoped>
.svg-icon{
    width: 1em;
    height: 1em;
    fill:currentColor;
    color: #fff;
}
</style>