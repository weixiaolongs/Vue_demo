<template>
  <div class="home-header">
    <h3>叩丁狼客户管理系统</h3>
    <div class="home-header-icon" @click="collapseFn">
      <i class="el-icon-menu"></i>
    </div>
    <!-- <span class="home-header-name">姓名</span> -->
    <el-dropdown class="home-header-name" trigger="click">
      <span class="el-dropdown-link">
        下拉菜单
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import bus from './bus'
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    collapseFn() {
      this.isCollapse = !this.isCollapse
      bus.$emit('collapse', this.isCollapse)
    }
  }
};
</script>

<style lang="less" scoped>
.home-header {
  width: 100%;
  height: 70px;
  background-color: #409eff;
  color: #fff;
  h3 {
    display: inline-block;
    height: 70px;
    padding-left: 20px;
    line-height: 70px;
  }
  .home-header-icon {
    display: inline;
    position: relative;
    i {
      position: absolute;
      left: 20px;
      top: -1px;
      font-size: 24px;
    }
  }
  .home-header-name {
    float: right;
    margin-right: 20px;
    line-height: 70px;
    span {
      color: #fff;
    }
  }
}
</style>