<template>
  <div>
    <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '400px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
      @change="log('change', $event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { EditorView } from 'codemirror'
import { basicSetup } from 'codemirror'
import { Codemirror } from 'vue-codemirror'
import { json, jsonParseLinter } from '@codemirror/lang-json'
import { xml } from '@codemirror/lang-xml'
import { html } from '@codemirror/lang-html'
import { esLint, javascript } from '@codemirror/lang-javascript'
import { linter } from '@codemirror/lint'
import { Compartment, EditorState } from '@codemirror/state'

// @ts-expect-error eslint for browser
import eslint from 'eslint-linter-browserify'

const code = ref('console.log(\'Hello, world!\')')
const editorRef = shallowRef()
const props = defineProps({
  lang: {
    default: '',
  },
})
const log = console.log
// Codemirror EditorView instance ref
const view = shallowRef<EditorView>()
const language = new Compartment(); const tabSize = new Compartment()

const handleReady = (payload: any) => {
  view.value = payload.view
}

const extensions = computed(() => {
  const exts = [basicSetup, tabSize.of(EditorState.tabSize.of(8))]
  switch (props.lang) {
    case 'json':
      exts.push(language.of(json()))
      exts.push(linter(jsonParseLinter()))
      break
    case 'javascript':
      exts.push(javascript())
      exts.push(linter(esLint(new eslint.Linter())))
      break
    case 'xml':
      exts.push(language.of(xml()))
      break
    case 'html':
      exts.push(language.of(html()))
      break

    default:
      break
  }
  return exts
})
const getCodemirrorStates = () => {
  if (!view.value) return

  const state = view.value.state
  const ranges = state.selection.ranges
  const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
  const cursor = ranges[0].anchor
  const length = state.doc.length
  const lines = state.doc.lines
  // more state info ...
  // return ...
}
</script>

<style scoped>
.editor {
  height: 400px;
}
</style>
