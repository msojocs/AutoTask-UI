<!--
 * @Author: msojocs jiyecafe@gmail.com
 * @Date: 2022-09-15 14:58:15
 * @LastEditors: msojocs jiyecafe@gmail.com
 * @LastEditTime: 2022-11-01 17:49:24
 * @FilePath: \webv2\src\layout\components\SubMenu.vue
 * @Description: ""
 * Copyright (c) 2022 by msojocs email: jiyecafe@gmail.com, All Rights Reserved.
-->
<template>
  <template v-if="!menu?.meta?.hidden">
    <!-- 没有子菜单 -->
    <el-menu-item v-if="isOnlyOneChild(menu)" :key="onlyOneChild.path" :index="onlyOneChild.path">
      <el-icon>
        <component :is="onlyOneChild.meta?.icon" />
      </el-icon>
      <span>{{ onlyOneChild.meta?.title[lang] }}</span>
    </el-menu-item>

    <!-- 有子菜单 -->
    <el-sub-menu v-else :index="menu?.path">
      <template #title>
        <el-icon>
          <component :is="menu?.meta?.icon" />
        </el-icon>
        <span>{{ menu?.meta?.title[lang] }}</span>
      </template>
      <SubMenu v-for="m in menu?.children" :key="m.path" :menu="m" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCustomStore } from '@/store/store'

const store = useCustomStore()
const props = defineProps({
  menu: Object,
})
const lang = computed(() => store.getters['app/getCurrentLang'])

const onlyOneChild = ref()
const isOnlyOneChild = (menu: any) => {
  if (menu.children) {
    const showingChildren = menu.children.filter((e: any) => {
      if (e?.meta.hidden) return false
      onlyOneChild.value = e
      return true
    })
    // 判断当前路由，是否有孩子children，以及孩子个数；
    if (showingChildren.length === 1)
      return true

    // 如果没有孩子，则展示父级路由；
    if (showingChildren.length === 0) {
      onlyOneChild.value = { ...menu, noShowingChildren: true }
      return true
    }
  }
  else {
    onlyOneChild.value = { ...menu, noShowingChildren: true }
    return true
  }
  return false
}
// console.log('props menu:', props.menu)
</script>

<style scoped>

</style>
