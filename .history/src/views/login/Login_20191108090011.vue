<template>
  <div class="login-wrapper">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-container">
      <h3>叩丁狼客户关系管理系统</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username" placeholder="请输入账号" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          placeholder="请输入密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import axios from "axios";
// import qs from "qs";
import { LoginApi } from "@/request/api";
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          LoginApi({
            username: this.ruleForm.username,
            password: this.ruleForm.password
          }).then(res => {
              if (res.success) {
                  // 存储返回的data里面的数据, token值, 
                  localStorage.setItem('token', res.data)
                  // 跳转
                  this.$router.push('/department')
              } else {
                  // 错误提示
                  console.log(res)
                  this.$message.error(res.msg);
              }
          }).catch(err => {

          });
          //   axios
          //     .post(
          //       "/api/tokens",
          //       qs.stringify({
          //         username: this.ruleForm.username,
          //         password: this.ruleForm.password
          //       })
          //     )
          //     .then(res => {})
          //     .catch(err => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #324057;
  .login-container {
    width: 320px;
    height: 250px;
    h3 {
      padding: 10px 0;
      text-align: center;
      color: #fff;
      font-size: 24px;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>