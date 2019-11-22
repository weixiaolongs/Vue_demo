<template>
  <el-dialog :title="title" :visible.sync="visible" width="30%" :before-close="close">
      <el-form :model="newForm" :inline="true">
        <el-form-item label="部门名称">
          <el-input v-model="newForm.name" autocomplete="off" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="部门编号">
          <el-input v-model="newForm.sn" autocomplete="off" placeholder="请输入部门编号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="subDept">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            newForm: {}
        }
    },
    // 监听当前属性变化
    watch: {
        form(newVal, oldVal) {
            console.log(newVal, oldVal)
            // this.form === newVal
            if(newVal) {
                this.newForm = {...newVal} // 浅拷贝
            }
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        visible: {
            type: Boolean,
            default: false
        },
        form: {
            type: Object,
            default: {}
        }
    },
    methods: {
        subDept() {
            this.$emit('deptfn', this.newForm)
        }, 
        close() {
            // 关闭弹窗,visible的值改成是false
            this.$emit('closedialog')
        }
    }
}
</script>

<style>

</style>