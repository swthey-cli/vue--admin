<template>
  <div id="layout">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>
<script>
import LayoutNav from "./Components/nav";
import LayoutHeader from "./Components/header";
import LayoutMain from "./Components/main";
export default {
  name: "layout",
  components: { LayoutNav, LayoutHeader, LayoutMain },
  setup() {}
};
</script>
<style lang="scss" scoped>
</style>