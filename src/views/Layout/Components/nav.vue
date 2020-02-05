<!--左侧导航菜单-->
<template>
  <div id="nav-wrap">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item,index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
          <!--一级菜单-->   
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"></svg-icon>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!--子级菜单-->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
      
    </el-menu>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(prop, context) {
    //定义基础数据
    const isCollapse = ref(false);
    const routers = reactive(context.root.$router.options.routes);
    console.log(routers);
    //方法函数
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      routers,
      isCollapse,
      handleOpen,
      handleClose
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  width: $navMenu;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  svg{
    font-size: 15px;
    margin-right: 10px;
  }
}
</style>