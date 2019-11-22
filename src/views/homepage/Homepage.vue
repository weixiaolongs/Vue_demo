<template>
  <div class="home-wrapper">
    <ma-header/>
    <!-- 左侧导航菜单 -->
    <nav-menu />
    <!-- 中间内容 -->
    <ma-content />
  </div>
</template>

<script>
import MaContent from "./children/Content";
import NavMenu from "./children/NavMenu";
import MaHeader from "./children/Header";
export default {
  components: {
    MaContent,
    NavMenu,
    MaHeader
  }
};
</script>

<style lang="less" scoped>
.home-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>