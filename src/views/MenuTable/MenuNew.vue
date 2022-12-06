<template>
  <div>
    <el-form
      ref="refMenuForm"
      :model="menuData"
      label-width="150px"
      :rules="menuRules"
      status-icon
    >
      <el-form-item label="父功能名称">
        <el-input :disabled="true" />
      </el-form-item>
      <el-form-item label="功能表示号" prop="function_id">
        <el-input v-model="menuData.function_id" />
      </el-form-item>
      <el-form-item label="功能名称（简体）">
        <el-input v-model="menuData.function_name_zh_cn" />
      </el-form-item>
      <el-form-item label="功能名称（繁体）">
        <el-input v-model="menuData.function_name_zh_tw" />
      </el-form-item>
      <el-form-item label="功能名称（英文）">
        <el-input v-model="menuData.function_name_en" />
      </el-form-item>
      <el-form-item label="功能类型">
        <el-select v-model="menuData.function_sub_type">
          <el-option v-for="vt in viewTypes" :key="vt" :label="vt" :value="vt" />
        </el-select>
      </el-form-item>
      <el-form-item label="功能描述">
        <el-input v-model="menuData.function_desc" />
      </el-form-item>
      <el-form-item label="功能表">
        <el-tooltip
          content="主档SQL的表名"
          effect="light"
          trigger="click"
        >
          <el-input v-model="menuData.obj_name" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="路由">
        <el-input v-model="menuData.path_name" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="menuData.menu_icon" />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-select v-model="menuData.active">
          <el-option label="启用" value="Y" />
          <el-option label="禁用" value="N" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否在菜单隐藏">
        <el-select v-model="menuData.is_visible">
          <el-option label="隐藏" value="N" />
          <el-option label="显示" value="Y" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveMenu(refMenuForm)">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { postSaveMenu } from './api'
import { Type2View } from '@/router'

interface MenuType {
  state: string
  active: string
  buttons: string
  display_menu: string
  father_function_key: string
  function_desc: string
  function_id: string
  function_key: string
  function_module: string
  function_name_en: string
  function_name_zh_cn: string
  function_name_zh_tw: string
  function_serial_key: number
  function_sub_type: string
  function_type: string
  is_default_show: string
  is_visible: string
  menu_icon: string
  menu_sel_icon: string
  obj_name: string
  path_name: string
  sequence: number
  sub_item: string
  trx_date: string
  trx_user_key: string
  trx_user_serial_key: number
}
const props = defineProps<{
  fatherName?: string
}>()

const menuData = reactive({
  state: 'ADDNEW',
  active: '',
  buttons: '',
  display_menu: '',
  father_function_key: '',
  function_desc: '',
  function_id: '',
  function_key: '',
  function_module: '',
  function_name_en: '',
  function_name_zh_cn: '',
  function_name_zh_tw: '',
  function_serial_key: 0,
  function_sub_type: '',
  function_type: 'EMS',
  is_default_show: '',
  is_visible: '',
  menu_icon: '',
  menu_sel_icon: '',
  obj_name: '',
  path_name: '',
  sequence: 0,
  sub_item: '',
  trx_date: '',
  trx_user_key: '',
  trx_user_serial_key: 0,
})
const emits = defineEmits(['addOk'])

const checkFunctionId = (rule: any, value: any, callback: any) => {
  if (value === '')
    callback(new Error('请输入功能号'))
  else
    callback()
}
const refMenuForm = ref<FormInstance>()
const menuRules = reactive({
  function_id: [{ validator: checkFunctionId, trigger: 'blur' }],
})

const viewTypes = computed(() => {
  return Object.keys(Type2View)
})
const saveMenu = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      postSaveMenu(menuData)
        .then((res) => {
          ElMessage.success('添加成功！')
          emits('addOk')
        })
    }
    else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style scoped>

</style>
