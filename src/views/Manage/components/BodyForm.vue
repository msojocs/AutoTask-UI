<template>
  <div class="body-form">
    <div class="mode-switch">
      <ElRadioGroup v-model="bodyMode" @change="switchMode">
        <el-radio label="none">
          none
        </el-radio>
        <el-radio label="formdata">
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
      <el-select v-if="bodyMode == 'raw'" v-model="editorLang">
        <el-option label="Text" value="text" />
        <el-option label="Javascript" value="javascript" />
        <el-option label="Json" value="json" />
        <el-option label="HTML" value="html" />
        <el-option label="XML" value="xml" />
      </el-select>
    </div>
    <div>
      <component :is="editCmp" :lang="editorLang" />
    </div>
  </div>
</template>

<script setup lang="ts">
const bodyMode = ref('raw')
const editCmp = shallowRef()
const editorLang = ref('text')
const editCmps = {
  form: 'form',
}
const loadModule = (mode: string | number | boolean) => {
  import(`./body/${mode}.vue`).then((res) => {
    editCmp.value = res.default
  }).catch((err) => {
    console.error('模块缺失', err)
  })
}
onMounted(() => {
  loadModule(bodyMode.value)
})
const switchMode = (mode: string | number | boolean) => {
  loadModule(mode)
}
</script>

<style scoped>

</style>
