<!--
 * @Author: msojocs jiyecafe@gmail.com
 * @Date: 2022-10-18 22:17:04
 * @LastEditors: msojocs jiyecafe@gmail.com
 * @LastEditTime: 2022-11-02 19:57:57
 * @FilePath: \webv2\src\layout\components\SideBar.vue
 * @Description: ""
 * Copyright (c) 2022 by msojocs email: jiyecafe@gmail.com, All Rights Reserved.
-->
<script setup lang="ts">
import CustomMenu from './CustomMenu.vue'
import { useCustomStore } from '@/store/store'
import Logo from '@/components/Logo.vue'

const store = useCustomStore()
const isCollapse = computed(() => store.getters['app/isSidebarClose'])
const switchSidebar = () => {
  store.commit('app/switchSidebar')
}
const device = computed(() => store.getters['app/getCurrentDevice'])
</script>

<template>
  <div v-if="device === 'mobile' && !isCollapse" class="drawer-bg" @click="switchSidebar" />
  <div
    :class="{
      'open-sidebar': !isCollapse,
      'hide-sidebar': isCollapse,
      'mobile': device === 'mobile',
      sidebar: true
    }"
  >
    <!-- <Logo /> -->
    <el-scrollbar>
      <CustomMenu :is-collapse="isCollapse" />
    </el-scrollbar>
  </div>
</template>

<style scoped>

/* sidebar自定义动画 */
.sidebar{
  transition: width .3s;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.open-sidebar{
  width: 200px;
}
.mobile{
  position: fixed;
  top: 0;
  /* height: 100vh; */
  z-index: 1001;
  background-color:#545c64;
}

/* .open-sidebar.mobile{
} */

.hide-sidebar{
  width: 67px;
}
.hide-sidebar.mobile{
  width: 0px;
}

/* 小宽度菜单出现时的遮罩 */
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  z-index: 999;
}

</style>
