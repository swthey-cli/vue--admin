<!--左侧导航菜单-->
<template>
  <div id="nav-wrap">
    <h1 class="logo">
      <img src="../../../assets/images/logo.png" alt />
    </h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
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
          <template  v-for="subItem in item.children">
            <el-menu-item
              v-if="!subItem.hidden"
              :key="subItem.id"
              :index="subItem.path"
            >{{subItem.meta.name}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(prop, context) {
    //定义基础数据
    const routers = reactive(context.root.$router.options.routes);
    const isCollapse = computed(() => context.root.$store.state.app.isCollapse);
    return {
      routers,
      isCollapse
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
.logo {
  text-align: center;
  img {
    margin: 28px auto 25px;
    width: 92px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
#nav-wrap {
  position: fixed;
  width: $navMenu;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 15px;
    margin-right: 10px;
  }
}
.open {
  .logo img {
    width: 92px;
  }
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  .logo img {
    margin: 0 auto;
    width: 60%;
  }
  #nav-wrap {
    width: $navMenuMin;
  }
}
</style>