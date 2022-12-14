<template>
  <div class="body-form">
    <div class="mode-switch">
      <ElRadioGroup v-model="bodyMode" @change="switchMode">
        <el-radio label="none">
          none
        </el-radio>
        <el-radio label="form-data">
          form-data
        </el-radio>
        <el-radio label="form">
          x-www-form-urlencoded
        </el-radio>
        <el-radio label="raw">
          raw
        </el-radio>
        <el-radio label="binary">
          binary
        </el-radio>
        <!-- <el-radio label="gql">
          GraphQL
        </el-radio> -->
      </ElRadioGroup>
      &nbsp;
      <el-select v-if="bodyMode == 'raw'" v-model="editorLang" @change="updateType">
        <el-option label="Text" value="text" />
        <el-option label="Javascript" value="javascript" />
        <el-option label="Json" value="json" />
        <el-option label="HTML" value="html" />
        <el-option label="XML" value="xml" />
      </el-select>
    </div>
    <div>
      <component :is="editCmp" v-model="bodyData.data" :lang="editorLang" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RequestBody } from './types'

const props = defineProps<{
  body: RequestBody
}>()
const bodyMode = ref('raw')
const editCmp = shallowRef()
const editorLang = ref('text')
const bodyData = ref(props.body)

const updateType = () => {
  bodyData.value.t = bodyMode.value
  if (bodyMode.value === 'raw')
    bodyData.value.t = editorLang.value
}

const loadModule = (mode: string) => {
  updateType()
  import(`./body/${mode}.vue`).then((res) => {
    editCmp.value = res.default
  }).catch((err) => {
    console.error('模块缺失', err)
  })
}

onMounted(() => {
  loadModule(bodyMode.value)
})

const switchMode = (mode: any) => {
  loadModule(mode)
}
</script>

<style lang="less" scoped>
.body-form {
  .mode-switch {
    display: flex;
    margin-bottom: 5px;
  }
}
</style>
