<template>
  <div>
    <!-- editor -->
    <Editor
      v-model:value="rawString"
      height="80vh"
      theme="vs-dark"
      default-language="javascript"
      :language="lang"
      default-value="// some comment"
      @change="log"
    />
  </div>
</template>

<script setup lang="ts">
import Editor from '@guolao/vue-monaco-editor'

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  lang: {
    default: 'text',
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
    console.log('update rawString:', v)
    emits('update:modelValue', v)
  },
})

const editorRef = shallowRef()

const log = console.log
</script>

<style scoped>
.editor {
  height: 400px;
}
</style>
