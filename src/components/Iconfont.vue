<template>
  <i :class="'iconfont icon-' + icon" />
</template>

<script setup lang="ts">
const props = defineProps({
  icon: String,
})
</script>

<style scoped>
@import "../assets/iconfont/iconfont.css";

</style>
