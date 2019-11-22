<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="acitveRoute"
    class="home-menu"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened
    router
  >
    <el-submenu :index="index + ''" v-for="(menu,index) in menuConfig" :key="index">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{menu.title}}</span>
      </template>
      <el-menu-item v-for="(submenu, sidx) in menu.subs" :key="sidx" :index="submenu.index">{{submenu.title}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import menuConfig from '@/config/menuConfig'
import bus from './bus'
export default {
    data() {
        return {
            menuConfig: menuConfig,
            isCollapse: false
        }
    },
    computed: {
        acitveRoute() {
            return this.$route.meta.path
        }
    },
    created() {
        console.log(this.$route)
        bus.$on('collapse', (collapse) => {
          this.isCollapse = collapse
        })
    }
};
</script>

<style lang="less" scoped>
.home-menu {
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  // width: 250px;
  overflow-y: auto;
}
.home-menu::-webkit-scrollbar {
    width: 0;
}
// 同时存在两个类名,就不会有width等于250px
.home-menu:not(.el-menu--collapse) {
  width: 250px;
}
</style>