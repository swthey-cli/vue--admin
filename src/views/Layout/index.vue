<template>
  <div id="layout" :class="[!menuStatus?'open':'close']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>
<script>
import LayoutNav from "./Components/nav";
import LayoutHeader from "./Components/header";
import LayoutMain from "./Components/main";
import { computed } from '@vue/composition-api';
export default {
  name: "layout",
  components: { LayoutNav, LayoutHeader, LayoutMain },
  setup(props,context) {
    const menuStatus =computed(()=>context.root.$store.state.app.isCollapse);
    return {
      menuStatus
    }
  }
};
</script>
<style lang="scss" scoped>
</style>