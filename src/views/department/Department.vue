<template>
  <div>
    <div>
      <el-button type="success" @click="add">添加</el-button>
    </div>
    <!-- table -->
    <el-table :data="tableData" style="width: 100%" stripe border>
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="部门名称"></el-table-column>
      <el-table-column prop="sn" label="部门编号"></el-table-column>
      <el-table-column label="操作">
        <!-- <slot :row=""></slot> -->
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pager
      :page="currentPage"
      :size="pageSize"
      :total="total"
      @changepage="handleCurrentChange"
      @changesize="handleSizeChange"
    />
    <!-- 弹窗 -->
    <dept-dialog
      :title="dialogTitle"
      :visible="dialogFormVisible"
      :form="form"
      @closedialog="closeDialog"
      @deptfn="subDept"
    />
  </div>
</template>

<script>
import DeptDialog from "./children/DeptDialog";
import Pager from "@/components/pager/Pager";
//
import {
  getDepartments,
  addDepartments,
  editDepartments,
  delDepartments
} from "@/request/api";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页
      pageSize: 10, // 一页显示的数据数量
      total: 0, // 总条数
      dialogFormVisible: false,
      form: {},
      dialogTitle: ""
    };
  },
  components: {
    Pager,
    DeptDialog
  },
  methods: {
    //删除
    del(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delDepartments({
            id: row.id
          }).then(res => {
            if (res.success) {
              this.$message.success('删除成功')
              // 刷新表格
              this.getDeptDatas()
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 响应弹窗关闭的事件
    closeDialog() {
      this.dialogFormVisible = false;
    },
    subDept(newForm) {
      if (newForm.id) {
        // 编辑功能
        editDepartments(newForm).then(res => {
          if (res.success) {
            this.$message.success("编辑成功");
            // 关闭弹窗
            this.dialogFormVisible = false;
            // 重新请求一次表格数据
            this.getDeptDatas();
          }
        });
      } else {
        // 添加功能
        addDepartments(newForm).then(res => {
          if (res.success) {
            this.$message.success("添加成功");
            // 关闭弹窗
            this.dialogFormVisible = false;
            // 重新请求一次表格数据
            this.getDeptDatas();
          }
        });
      }
    },
    add() {
      this.form = {};
      this.dialogTitle = "部门添加";
      this.dialogFormVisible = true;
    },
    // 编辑弹窗
    edit(row) {
      this.dialogTitle = "部门编辑";
      console.log(row); // {id: name: sn:}
      // 1.JSON.parse(JSON.stringify(row))
      // 2.{...row} //拷贝
      // 3.{ id: row.id, name: row.name, sn: row.sn }; //row
      this.form = { ...row };
      this.dialogFormVisible = true;
    },
    // 页数改变的时候触发事件,size是改变页数后的值
    handleSizeChange(size) {
      console.log(size);
      this.pageSize = size;
      // 调用后端接口,发送请求
      this.getDeptDatas();
    },
    // 页码发生改变的时候触发事件, page是改变页码后的值
    handleCurrentChange(page) {
      console.log(page);
      this.currentPage = page;
      // 调用后端接口,发送请求
      this.getDeptDatas();
    },
    // 发送请求
    getDeptDatas() {
      getDepartments({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.success) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    }
  },
  created() {
    this.getDeptDatas();
  }
  // beforeMount() {},
  // mounted() {}
};
</script>

<style>
</style>