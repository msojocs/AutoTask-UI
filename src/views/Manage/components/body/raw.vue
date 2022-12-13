<template>
  <div>
    <!-- editor -->
    <Editor
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

const props = defineProps({
  lang: {
    default: '',
  },
})

const code = ref('console.log(\'Hello, world!\')')
const editorRef = shallowRef()

const log = console.log
</script>

<style scoped>
.editor {
  height: 400px;
}
</style>
