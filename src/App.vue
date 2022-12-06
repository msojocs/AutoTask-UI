<!--
 * @Author: msojocs jiyecafe@gmail.com
 * @Date: 2022-09-14 13:42:48
 * @LastEditors: msojocs jiyecafe@gmail.com
 * @LastEditTime: 2022-11-03 20:05:54
 * @FilePath: \webv2\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import en from 'element-plus/es/locale/lang/en'
import { useCustomStore } from './store/store'

const langMap: any = {
  zhCn,
  en,
  zhTw,
}
const store = useCustomStore()
const locale = computed(() => langMap[store.getters['app/getCurrentLang']] || zhCn)

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design
const isMobile = () => {
  const rect = body.getBoundingClientRect()
  return rect.width - 1 < WIDTH
}

const resizeHandler = () => {
  if (!document.hidden) {
    const deviceType = isMobile()
    store.dispatch('app/toggleDevice', deviceType ? 'mobile' : 'desktop')

    if (deviceType)
      store.dispatch('app/closeSideBar')
  }
}

// 注册窗口宽度变化监听事件
onBeforeMount(() => {
  window.addEventListener('resize', resizeHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})
onMounted(() => {
  const deviceType = isMobile()
  if (deviceType) {
    store.dispatch('app/toggleDevice', 'mobile')
    store.dispatch('app/closeSideBar')
  }
})
onActivated(() => {

})
onDeactivated(() => {

})
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style scoped>

</style>
