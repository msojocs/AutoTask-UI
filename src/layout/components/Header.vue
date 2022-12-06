<!--
 * @Author: msojocs jiyecafe@gmail.com
 * @Date: 2022-09-15 16:18:57
 * @LastEditors: msojocs jiyecafe@gmail.com
 * @LastEditTime: 2022-11-10 14:12:19
 * @FilePath: \webv2\src\layout\components\Header.vue
 * @Description: ""
 * Copyright (c) 2022 by msojocs email: jiyecafe@gmail.com, All Rights Reserved.
-->
<template>
  <div class="navbar">
    <!-- 左边按钮 -->
    <div class="flex items-center justify-between" style="width: 100%;">
      <div style="display: flex;align-items: center;cursor: pointer;" @click="switchSidebar">
        <el-icon v-if="isCollapse" :size="40">
          <Expand />
        </el-icon>
        <el-icon v-else :size="40">
          <Fold />
        </el-icon>
        <div>
          <!-- 右边其它 -->
          {{ $t('ems.sys.name') }}
        </div>
      </div>
      <div class="flex mr-9">
        <div class="mr-2">
          <el-select v-model="language" placeholder="Select" style="width: 100px;" @change="onLangChange">
            <el-option
              label="中文简体"
              value="zhCn"
            />
            <el-option
              label="中文繁体"
              value="zhTw"
            />
            <el-option
              label="English"
              value="en"
            />
          </el-select>
        </div>
        <div :span="4" style="display: flex;align-items: center;cursor: pointer;">
          <el-dropdown>
            {{ store.getters['user/userName'] }}
            <template #dropdown>
              <el-dropdown-menu>
                <router-link to="/changepass">
                  <el-dropdown-item>修改密码</el-dropdown-item>
                </router-link>
                <el-dropdown-item @click="exitAccount">
                  退出
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCustomStore } from '@/store/store'

const store = useCustomStore()
const router = useRouter()
const language = ref(store.getters['app/getCurrentLang'] || 'zhCn')
const { locale } = useI18n()

const exitAccount = () => {
  store.commit('user/updateToken', '')
  router.push({
    name: 'login',
  })
}

const isCollapse = computed(() => store.getters['app/isSidebarClose'])
const switchSidebar = () => {
  store.commit('app/switchSidebar')
}

const onLangChange = (lang: string) => {
  locale.value = lang
  store.commit('app/changeLang', lang)
}
</script>

<style scoped>

</style>
