<template>
  <div>
    <el-form :model="menuData" label-width="150px">
      <el-form-item label="父功能名称">
        <el-input :disabled="true" :value="fatherName" />
      </el-form-item>
      <el-form-item label="功能表示号" prop="FUNCTION_ID">
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
        <el-input v-model="menuData.menu_icon">
          <template #append>
            <el-button circle @click="selectIcon = true">
              <el-icon>
                <Aim />
              </el-icon>
            </el-button>
          </template>
        </el-input>
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
        <el-button type="primary" @click="saveMenu">
          保存
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="selectIcon">
      <icon-select @select="doSelectIcon" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import IconSelect from '../../components/IconSelect.vue'
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
  menuData?: MenuType
  fatherName?: string
}>()

const menuData = ref({ ...props.menuData })
const selectIcon = ref(false)

const doSelectIcon = (icon: string) => {
  selectIcon.value = false
  menuData.value.menu_icon = icon
}

const saveMenu = () => {
  menuData.value.state = 'MODIFY'
  postSaveMenu(menuData.value)
    .then((res) => {
      ElMessage.success('提交成功！')
      if (menuData.value.function_serial_key)
        menuData.value.function_serial_key++
    })
}
const viewTypes = computed(() => {
  return Object.keys(Type2View)
})
watch(
  () => props.menuData,
  (menu) => {
    if (menu) {
      console.log('edit menu:', menu)
      menuData.value = menu
    }
  },
)
watch(
  () => props.fatherName,
  (fatherName) => {
    if (fatherName)
      console.log('fatherName:', fatherName)
  },
)
</script>

<style scoped>

</style>
