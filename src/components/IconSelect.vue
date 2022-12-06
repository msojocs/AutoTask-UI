<template>
  <div style="display: flex;flex-flow: wrap;">
    <span v-for="icon in icons" :key="icon">
      <component :is="icon" style="width: 25px;" @click="emits('select', icon)" />
    </span>
  </div>
</template>

<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const icons = ref<string[]>([])
const emits = defineEmits(['select'])

for (const [key] of Object.entries(ElementPlusIconsVue)) {
  console.log(key)
  icons.value.push(key)
}
</script>

<style scoped>

</style>
