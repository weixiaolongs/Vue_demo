<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="deptId" placeholder="请选择部门">
          <el-option label="全部" :value="-1"></el-option>
          <el-option v-for="dept in deptArr" :key="dept.id" :label="dept.name" :value="dept.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getEmployeesData">查询</el-button>
        <el-button type="success" @click="goToAddView">添加</el-button>
        <el-button type="danger" @click="dels">批量删除</el-button>
        <el-button type="warning" @click="exportExcel">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="编号">
        <template slot-scope="scope">{{ scope.row.id}}</template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="email" label="email"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="dept.name" label="部门"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pager
      :page="currentPage"
      :size="pageSize"
      :total="total"
      @changepage="handleCurrentChange"
      @changesize="handleSizeChange"
    />
  </div>
</template>

<script>
import { getEmployees, getDepartments, exportExcelUrl, delEmployees } from "@/request/api";
import Pager from "@/components/pager/Pager";
export default {
  data() {
    return {
      keyword: "", // 关键字
      deptId: -1, // 选择的部门
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      deptArr: [],
      delArr: []
    };
  },
  components: {
    Pager
  },
  methods: {
    dels() {
      delEmployees({
        ids: this.delArr,
      }).then(res => {
        
      })
    },
    edit(row) {
      this.$router.push('/employee/edit/'  + row.id)
    },
    goToAddView() {
      this.$router.push('/employee/add')
    },
    exportExcel() {
      // 通过a标签的href属性发送一个get请求
      var aDom = document.createElement('a')
      document.body.appendChild(aDom)
      aDom.href = exportExcelUrl + '?token=' + localStorage.getItem('token')
      aDom.click()
      document.body.removeChild(aDom)
    },
    handleSelectionChange(selection) {
      console.log(selection);
      this.delArr = selection.map(employee => employee.id)
    },
    // 页码发生改变的时候触发事件, page是改变页码后的值
    handleCurrentChange(page) {
      console.log(page);
      this.currentPage = page;
      // 调用后端接口,发送请求
      this.getEmployeesData();
    },
    // 页数改变的时候触发事件,size是改变页数后的值
    handleSizeChange(size) {
      console.log(size);
      this.pageSize = size;
      // 调用后端接口,发送请求
      this.getEmployeesData();
    },
    getEmployeesData() {
      getEmployees({
        currentPage: this.currentPage,
        keyword: this.keyword,
        deptId: this.deptId,
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
      // 获取部门列表数据
      getDepartments({
          currentPage: 1,
          pageSize: 100
      }).then(res => {
          if (res.success) {
              this.deptArr = res.data.list
          }
      })
      this.getEmployeesData();
      
  }
};
</script>

<style>
</style>