<!--
 * @Author: msojocs jiyecafe@gmail.com
 * @Date: 2022-10-14 13:34:57
 * @LastEditors: msojocs jiyecafe@gmail.com
 * @LastEditTime: 2022-11-01 18:26:27
 * @FilePath: \webv2\src\layout\components\Tab.vue
 * @Description: ""
 * Copyright (c) 2022 by msojocs email: jiyecafe@gmail.com, All Rights Reserved.
-->
<script setup lang="ts">
import type { TabPaneName } from 'element-plus'
import { useRouter } from 'vue-router'
import { useCustomStore } from '@/store/store'
import type { TabData } from '@/store/module/tabs/types'

const router = useRouter()
const store = useCustomStore()

const editableTabs = computed<TabData[]>(() => store.getters['tabs/getTabsOption'])
const currentIndex = computed<string>(() => store.getters['tabs/getCurrentIndex'])
const editableTabsValue = ref(currentIndex.value)
const lang = computed(() => store.getters['app/getCurrentLang'])

console.log(editableTabsValue.value, editableTabs.value)

watch(
  () => store.getters['tabs/getCurrentIndex'],
  (newVal) => {
    console.log('watch tabs/getCurrentIndex', newVal)
    editableTabsValue.value = newVal
  },
)

const removeTab = (targetName: TabPaneName) => {
  if (targetName === '/home') return

  const delIndex = editableTabs.value.findIndex(e => e.name === targetName)
  const newTab = editableTabs.value[delIndex + 1] || editableTabs.value[delIndex - 1]
  store.commit('tabs/DELETE_TAB', targetName)
  if (targetName === currentIndex.value)
    store.commit('tabs/SET_TAB', newTab.name)
}

const changePage = (targetName: TabPaneName) => {
  console.log('targetName:', targetName)
  const tabs = editableTabs.value
  tabs.forEach((tab, index) => {
    if (tab.name === targetName) {
      console.log('tab data:', tab)

      router.replace(tab.route)
      store.commit('tabs/SET_TAB', tab.name)
    }
  })
}
</script>

<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    class="demo-tabs"
    closable
    @tab-remove="removeTab"
    @tab-change="changePage"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title[lang]"
      :name="item.name"
    />
  </el-tabs>
</template>

<style scoped>

</style>
