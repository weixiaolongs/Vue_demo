<template>
  <div class="content" :style="{left: isCollapse ? '65px' : '250px'}">
    <h3>{{title}}</h3>
    <router-view />
    <!-- 底部 -->
  </div>
</template>

<script>
// 引入bus
import bus from "./bus";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    title() {
      return this.$route.meta.name
    }
  },
  methods: {
    a() {}
  },
  created() {
    // $(body).on('click', function () {
    // })
    //
    bus.$on("collapse", collapse => {
      this.isCollapse = collapse;
    });
  }
};
</script>

<style scoped>
.content {
  position: absolute;
  right: 0;
  top: 70px;
  bottom: 0;
  transition: left 0.3s ease-in-out;
  overflow-y: auto;
  padding: 10px;
  /* left: 250px; */
}
</style>