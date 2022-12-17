<template>
  <div class="binary-form">
    <!-- <h2>binary</h2> -->
    <div class="select-binary">
      <label v-if="binaryFile.length == 0" class="text" for="binary_file">Selecte file</label>
      <div v-else class="name">
        <span class="filename">{{ displayBinaryFile }}</span>
        <span class="remove" @click="deleteBinaryFile">x</span>
      </div>
      <input id="binary_file" type="file" style="opacity: 0;" @change="upload">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { deleteFile, uploadFile } from '../api'

const props = defineProps({
  modelValue: {
    required: true,
    type: String,
    default: '',
  },
})
const emits = defineEmits(['update:modelValue'])

const binaryFile = computed({
  get () {
    return props.modelValue
  },
  set (v: string) {
    emits('update:modelValue', v)
  },
})

const upload = (e: any) => {
  const file = e.target.files[0]
  const formdata = new FormData()
  formdata.append('file', file)
  uploadFile(formdata).then((res) => {
    console.log('upload ok', res)
    binaryFile.value = res.path
  }).catch((_err) => {
    e.target.files.clear()
  }).finally(() => {
    e.target.value = ''
  })
}
const deleteBinaryFile = () => {
  deleteFile(binaryFile.value).then((_res) => {
    binaryFile.value = ''
    ElMessage.success({
      message: '删除成功',
    })
  })
}
const displayBinaryFile = computed(() => {
  const a = binaryFile.value.split('/')
  return a[a.length - 1]
})
</script>

<style lang="less" scoped>
.binary-form{
  margin: 10px;
  .select-binary{
    .text{
      color: #808080;
      border-radius: 4px;
      background-color: #eeeeee99;
      padding: 2px 10px;
      cursor: pointer;
      &:hover {
        color: #000;
        background-color: #e0e0e0;
      }
    }
    >.name {
      border-radius: 5px;
      border: 1px solid #eee;
      font-size: small;
      width: fit-content;
      padding-left: 5px;
      padding-right: 5px;
      display: flex;
      align-items: center;
      >.remove {
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
