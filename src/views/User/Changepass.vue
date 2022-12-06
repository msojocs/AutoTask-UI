<template>
  <div>
    <h2>修改密码</h2>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      :label-width="100"
      style="max-width: 460px"
    >
      <el-form-item label="旧密码" prop="oldPass">
        <el-input v-model="ruleForm.oldPass" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { changePass } from './api/user'

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  oldPass: '',
  pass: '',
  checkPass: '',
})

const validateOldPass = (rule: any, value: any, callback: any) => {
  if (value === '')
    callback(new Error('请输入旧密码'))
  else
    callback()
}
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入新密码'))
  }
  else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '')
    callback(new Error('请再次输入新密码！'))
  else if (value !== ruleForm.pass)
    callback(new Error('两个新密码不匹配!'))
  else
    callback()
}

const rules = reactive({
  oldPass: [{ validator: validateOldPass, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!!')
      changePass(ruleForm.oldPass, ruleForm.pass)
        .then((res) => {
          console.log('changePass:', res)
          if (res) {
            ElMessage.success({
              message: '密码修改成功！',
            })
          }
        })
    }
    else {
      console.log('error submit!')
      return false
    }
  })
}

// const doChangePass = ()=>{
//   if(newPass.value !== newPass1.value){
//     ElMessage.error({
//       message: '新密码与确认密码不匹配！'
//     })
//     return;
//   }
//   changePass(oldPass.value, newPass.value)
//   .then(res=>{
//     console.log('changePass:', res)

//     ElMessage.success({
//       message: '密码修改成功！'
//     })
//   })
// }

</script>

<style scoped>

</style>
