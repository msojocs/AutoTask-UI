<template>
  <div>
    空的请求体
  </div>
</template>

<script setup lang="ts">

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  lang: {
    default: '',
  },
  modelValue: {
    required: true,
    type: String,
  },
})

const rawString = computed({
  get () {
    return props.modelValue
  },
  set (v: string) {
    emits('update:modelValue', v)
  },
})
</script>

<style scoped>

</style>
