<template>
  <div class="footer-pager">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSizeChange(size) {
      this.$emit("changesize", size);
    },
    handleCurrentChange(page) {
      // 子传父
      this.$emit("changepage", page);
    }
  }
};
</script>

<style scoped>
.footer-pager {
    padding: 20px;
    text-align: right;
}
</style>