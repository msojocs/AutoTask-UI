<template>
  <div>
    <h2>菜单维护</h2>
    <el-row>
      <el-col :span="11">
        <el-card>
          <template #header>
            <el-button @click="resetTable">
              重置
            </el-button>
            <el-button type="primary" @click="showNew = true">
              新增
            </el-button>
          </template>

          <el-tree
            :data="menuTreeData"
            node-key="key"
            draggable
            :default-expanded-keys="defaultExpandKeys"
            @node-click="onNodeClick"
            @node-drop="onNodeDrop"
          >
            <template #default="{ data }">
              <span class="custom-tree-node">
                <span>{{ data.original.function_name_zh_cn }}</span>
              </span>
            </template>
          </el-tree>
          <!-- <el-button type="primary" @click="saveMenuList">保存</el-button> -->
        </el-card>
      </el-col>
      <el-col :span="1" />

      <el-col :span="12">
        <el-card v-if="menuEditData">
          <template #header>
            菜单编辑
          </template>
          <menu-edit :menu-data="menuEditData" :father-name="menuFatherName" />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="showNew">
      <menu-new @add-ok="showNew = false, resetTable()" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ElMessage } from 'element-plus'
import { getMenuListReq } from './api'
import MenuEdit from './MenuEdit.vue'
import MenuNew from './MenuNew.vue'

interface MenuDataType{
  key: string
  original: any
  children?: MenuDataType[]
}
// 菜单树，数组
const menuTreeData = ref()
const menuEditData = ref()
const originalMenuList = ref()
const showNew = ref(false)
const defaultExpandKeys = ref<string[]>([])

// 生成树形结构
const genTree = (funcList: any[], father_function_key: string | null): MenuDataType[] => {
  const result = []
  const child = funcList.filter(e => e.father_function_key === father_function_key)
  for (const func of child) {
    const data: MenuDataType = {
      key: func.function_key,
      original: func,
    }

    data.children = genTree(funcList, func.function_key)
    result.push(data)
  }
  // if(father_function_key == null)return result[0].children || result
  return result
}

// 加载数据
const loadData = () => {
  getMenuListReq().then((res) => {
    console.log('getMenuListReq:', res)

    const funcList = res.functionlist
    originalMenuList.value = funcList
    console.log('funcList:', funcList)
    const menuTree = genTree(funcList, null)
    for (const menu of menuTree)
      defaultExpandKeys.value.push(menu.key)

    menuTreeData.value = menuTree
    console.log('menuTree:', menuTree)
    // ElMessage.success({
    //   message: '加载成功！'
    // })
  })
}
loadData()

// 重置
const resetTable = () => {
  menuEditData.value = null
  loadData()
}
// 保存变动菜单
const saveMenuList = () => {
  const menuTree = menuTreeData.value
  if (menuTree && menuTree.length) {
    const newMenuList = []
    const tq = JSON.parse(JSON.stringify(menuTree))
    while (tq.length > 0) {
      const menu = tq.pop()
      newMenuList.push(menu.original)
      if (menu.children)
        tq.push(...menu.children)
    }
    console.log('newMenuList:', newMenuList)
  }
}

// 当节点被点击的时候触发
const onNodeClick = (item: any) => {
  console.log(item)
  menuEditData.value = item.original
}

// 拖拽成功完成时触发的事件
const onNodeDrop = (node: Node, lastNode: Node, pos: string) => {
  console.log('onNodeDrop:', node, lastNode, pos)

  switch (pos) {
    // 同级菜单
    case 'after':
    case 'before':
      node.data.original.father_function_key = lastNode.data.original.father_function_key
      break
    // 成为子菜单
    case 'inner':
      node.data.original.father_function_key = lastNode.data.original.function_key
      break

    default:
      break
  }
}

// 计算正在编辑的菜单的父菜单名称
const menuFatherName = computed(() => {
  const fatherKey = menuEditData.value?.father_function_key
  if (!fatherKey) return ''
  const fatherMenu = originalMenuList.value.filter((e: { function_key: any }) => e.function_key === fatherKey)
  if (fatherMenu.length === 0) return ''
  return fatherMenu[0].function_name_zh_cn
})

</script>

<style scoped>

</style>
