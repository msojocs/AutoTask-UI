<template>
  <div class="body-form">
    <div class="mode-switch">
      <ElRadioGroup v-model="bodyMode" @update:model-value="switchMode">
        <el-radio label="none">
          none
        </el-radio>
        <el-radio label="formData">
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
    <div v-if="!loading">
      <component :is="editCmp" v-if="bodyMode != 'none'" v-model="bodyData.data[bodyMode]" :lang="editorLang" />
      <component
        :is="editCmp"
        v-else
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ReqeustBodyBodyType } from './types'

const props = defineProps<{
  body: ReqeustBodyBodyType
}>()
const bodyMode = ref<'none' | 'form' | 'formData' | 'raw' | 'binary'>('formData')
const editCmp = shallowRef()
const editorLang = ref<'text' | 'json' | 'html' | 'xml' | 'javascript'>('text')
const bodyData = ref(props.body)
// loading处理bug
const loading = ref(false)

const updateType = () => {
  console.log('BodyForm updateType')
  if (bodyMode.value === 'raw')
    bodyData.value.type = editorLang.value
  else
    bodyData.value.type = bodyMode.value
}

const loadModule = (mode: string) => {
  console.log('BodyForm loadModule')
  updateType()
  /**
   * 组件在加载时会初始化数据
   * 由于component是异步加载
   * 会导致v-model先切换完成，然后切换component
   * 这样新的v-model会被旧的component初始化
   * 导致数据错误
   */
  loading.value = true
  import(`./body/${mode}.vue`).then((res) => {
    editCmp.value = res.default
    loading.value = false
  }).catch((err) => {
    console.error('模块缺失', err)
  })
}

onMounted(() => {
  loadModule(bodyMode.value)
})

const switchMode = (mode: any) => {
  console.log('BodyForm switchMode to:', mode)
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
