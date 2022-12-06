<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import SubMenu from './SubMenu.vue'
import { useCustomStore } from '@/store/store'
import { constantRoutes } from '@/router'
const store = useCustomStore()
const menu = constantRoutes.concat(store.getters['user/menu'])
console.log('use menu:', menu)

const router = useRouter()
const route = useRoute()

const props = defineProps({
  isCollapse: Boolean,
})
</script>

<template>
  <el-menu
    :router="true"
    :default-active="router.currentRoute.value.path"
    background-color="#545c64"
    text-color="#fff"
    :collapse="isCollapse"
    style="--el-menu-border-color: #545c64"
    class="el-menu-vertical"
    :collapse-transition="false"
  >
    <sub-menu v-for="m in menu" :key="m.path" :menu="m" />
  </el-menu>
</template>

<style scoped>

.el-menu-vertical:not(.el-menu--collapse){
  width: 200px;
  min-height: 400px;
  text-align: left;
}
</style>
