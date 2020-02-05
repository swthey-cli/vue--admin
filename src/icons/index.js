import Vue from "vue";
import svgIcon from "./svgIcon.vue";
//自定义全局组件
Vue.component('svg-icon', svgIcon);
/**
 * require.context:读取指定目录的所有文件
 * 第一个:目录
 * 第二个:是否遍历子级目录
 * 第三个：定义遍历文件规则 正则表达式匹配以.svg结尾的文件
 */
const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => {
    return requireContext.keys().map(requireContext);
};
requireAll(req)