<!--顶部-->
<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" class="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="../../../assets/images/face.jpg" alt />
        {{username}}
      </div>
      <div class="header-icon pull-left" @click="exit()">
        <svg-icon iconClass="close" class="close"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
import { removeToken, removeUserName } from "@/utils/app";
export default {
  name: "layoutHeader",
  setup(props, context) {
    const navMenuState = () => context.root.$store.commit("app/SET_COLLAPSE");
    const username = computed(() => context.root.$store.state.app.username);
    //通过vueX-Action 处理
    //const navMenuState =()=>context.root.$store.dispatch("toggleMenu");
    // const exit =()=>{
    //     context.root.$store.dispatch("app/exit").then(()=>{}).catch(()=>{});
    // }
    //登出
    const exit = () => {
      context.root
        .$confirm("确定退出吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          context.root.$message({
            type: "success",
            message: "退出成功"
          });
          removeToken();
          removeUserName();
          context.root.$router.push({
            name: "login"
          });
        })
        .catch(() => {});
    };

    return {
      navMenuState,
      username,
      exit
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #fff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
  line-height: 75px;
  z-index: 99;
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 20px;
    fill: currentColor;
    color: #000;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    display: inline-block;
    border-radius: 50px;
    margin: 0 18px -12px 0;
  }
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
</style>