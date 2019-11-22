<template>
  <div>
    <el-form class="employee-form" ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" v-if="!employeeId">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="验证密码" v-if="!employeeId">
        <el-input v-model="form.checkPwd"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="form.deptId" placeholder="请选择活动区域">
          <el-option v-for="dept in deptArr" :key="dept.id" :label="dept.name" :value="dept.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="超级管理员">
        <el-switch v-model="form.admin"></el-switch>
      </el-form-item>
      <el-form-item label="分配角色" v-show="!form.admin">
        <el-transfer v-model="form.ids" :data="data" :props="{key: 'id',label: 'name'}"></el-transfer>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getRoles,
  getDepartments,
  addEmployee,
  getEmployee,
  updateEmployee
} from "@/request/api";
export default {
  data() {
    return {
      form: {},
      data: [],
      deptArr: [],
      employeeId: null
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      const { name, password, email, age, admin, deptId, ids } = this.form;
      if (this.employeeId) {
        updateEmployee({
          name,
          password,
          email,
          age,
          admin,
          dept: {
            id: deptId
          },
          ids: ids,
          id: this.employeeId
        }).then(res => {
            if (res.success) {
                this.$message.success('修改员工信息成功')
                this.$router.replace('/employee')
            }
        });
      } else {
        addEmployee({
          name,
          password,
          email,
          age,
          admin,
          dept: {
            id: deptId
          },
          ids: ids
        }).then(res => {
            if (res.success) {
                this.$message.success('添加员工信息成功')
                this.$router.replace('/employee')
            }
        });
      }
    }
  },
  created() {
    console.log(this);
    //   console.log(this.$route.params.eid)
    // this.employeeId = this.$route.params.eid || null;
    // this.$route.params &&
    //   this.$route.params.eid &&
    //   (this.employeeId = this.$route.params.eid);

    if (this.$route.params && this.$route.params.eid) {
      this.employeeId = this.$route.params.eid;
      getEmployee({
        id: this.employeeId
      }).then(res => {
        if (res.success) {
          // Object.defineProperty()
          // 第二种
          //   res.data = { ...res.data, deptId: res.data.dept.id };
          this.form = res.data; //dept: {id:}
          // this.form.deptId = res.data.dept.id
          // 第一种
          // $set 除了为属性赋值以外, 还会绑定属性的get和set方法
          //   res.data.dept && (this.$set(this.form, "deptId", res.data.dept.id));
          if (res.data.dept) {
            this.$set(this.form, "deptId", res.data.dept.id);
          }
          //   console.log(res.data.roles.map(role => role.id))
          this.$set(this.form, "ids", res.data.roles.map(role => role.id));

          console.log(this.form);
        }
      });
    }
    getRoles({
      currentPage: 1,
      pageSize: 100
    }).then(res => {
      if (res.success) {
        this.data = res.data.list;
      }
    });
    getDepartments({
      currentPage: 1,
      pageSize: 100
    }).then(res => {
      if (res.success) {
        this.deptArr = res.data.list;
      }
    });
  }
};
</script>

<style scoped>
.employee-form {
  margin: 20px;
  width: 750px;
}
</style>