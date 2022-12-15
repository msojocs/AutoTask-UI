<template>
  <div class="request-form">
    <div class="title">
      <span>Form Data</span>
    </div>
    <div v-if="editMode === 'kv'" class="kv-edit">
      <div class="header">
        <div style="width: 40px;border-left: 1px solid #eee;">
          &nbsp;
        </div>
        <div>
          <span>KEY</span>
        </div>
        <div>
          <span>VALUE</span>
        </div>
        <div>
          <span>DESCRIPTION</span>
          <div class="change-mode" @click="onChangeMode">
            <!-- 模式切换 -->
            Bulk Edit
          </div>
        </div>
      </div>
      <div class="body test_wrapper" @dragover="dragover($event)">
        <transition-group name="sort">
          <div
            v-for="(item, index) in formData" :key="item.id"
            class="row sort-item"
            :draggable="draggable"
            @dragstart="dragstart(item)"
            @dragenter="dragenter(item,$event)"
            @dragend="dragend(item,$event)"
            @dragover="dragover($event)"
            @input="newDataInput"
          >
            <div
              style="width: 40px;border-left: 1px solid #eee;"
              class="checkbox"
              @mousedown="draggable = true && index != formData.length - 1"
              @mouseup="draggable = false"
            >
              <drag-icon v-if="item.edit == '' && index != formData.length - 1" class="drag-icon" />
              <el-checkbox v-if="index != formData.length - 1" v-model="item.enable" />
            </div>
            <!-- 参数名 -->
            <div @click="item.edit = 'key'">
              <div class="edit-area">
                <div
                  v-if="item.edit == 'key'"
                  :id="item.id"
                  :ref="edit"
                  class="edit-item"
                  :placeholder="index == formData.length - 1 ? 'Key' : ''"
                  contenteditable="true"
                  @input="item.key = ($event.target as any).innerHTML"
                  @blur="onBlur(item)"
                >
                  {{ item.key }}
                </div>
                <div v-else class="simple">
                  <span>{{ item.key || (index == formData.length - 1 ? 'Key' : '') }}</span>
                  <div class="data-type" @click.stop>
                    <el-select v-model="item.type" class="type-select" size="small" @change="item.value = ''">
                      <el-option label="Text" value="text" />
                      <el-option label="File" value="file" />
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
            <!-- 参数值 -->
            <div @click="item.edit = 'value'">
              <div class="edit-area">
                <template v-if="item.type == 'text'">
                  <!-- 文本数据 -->
                  <div
                    v-if="item.edit == 'value'"
                    :id="item.id"
                    :ref="edit"
                    class="edit-item"
                    :placeholder="index == formData.length - 1 ? 'Value' : ''"
                    contenteditable="true"
                    @input="item.value = ($event.target as any).innerHTML"
                    @blur="onBlur(item)"
                  >
                    {{ item.value }}
                  </div>
                  <span v-else>{{ item.value || (index == formData.length - 1 ? 'Value' : '') }}</span>
                </template>
                <template v-else>
                  <!-- 上传文件 -->
                  <div class="select-binary">
                    <label v-if="!item.value.length" class="text" for="binary_file">Selecte file</label>
                    <div v-else class="name">
                      <span class="filename">{{ item.value }}</span>
                      <span class="remove" @click="item.value = ''">x</span>
                    </div>
                    <input id="binary_file" type="file" style="opacity: 0;">
                  </div>
                </template>
              </div>
            </div>
            <!-- 参数描述 -->
            <div @click="item.edit = 'desc'">
              <div class="edit-area">
                <div
                  v-if="item.edit == 'desc'"
                  :id="item.id"
                  :ref="edit"
                  class="edit-item"
                  :placeholder="index == formData.length - 1 ? 'Description' : ''"
                  contenteditable="true"
                  @input="item.desc = ($event.target as any).innerHTML"
                  @blur="onBlur(item)"
                >
                  {{ item.desc }}
                </div>
                <span v-else>{{ item.desc || (index == formData.length - 1 ? 'Description' : '') }}</span>
              </div>
              <div
                v-if="item.edit == '' && index < formData.length - 1"
                class="delete-button"
                style="width: 25px;"
                @click.stop="doDeleteItem(index)"
              >
                <!-- 删除图标 -->
                <el-icon><Delete /></el-icon>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <div v-else class="bulk-edit">
      <div class="header">
        <div />
        <div>
          <div class="change-mode" @click="onChangeMode">
            <!-- 模式切换 -->
            Key-Value Edit
          </div>
        </div>
      </div>
      <div class="body test_wrapper" @dragover="dragover($event)">
        <el-input v-model="bulkData" type="textarea" :rows="7" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DragIcon from '../DragIcon.vue'
import type { FormDataType } from '../types'

const oldData = ref(null) // 开始排序时按住的旧数据
const newData = ref(null) // 拖拽过程的数据
const draggable = ref(false)
const editMode = ref<'kv'|'bulk'>('kv')

const emits = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue?: FormDataType[]
}>()
// 列表数据
const formData = computed({
  get () {
    console.log('formData get', JSON.stringify(props.modelValue, null, 4))
    if (props.modelValue === undefined) {
      const defaultValue: FormDataType[] = [{
        id: '1',
        edit: '',
        key: '',
        value: '',
        desc: '',
        enable: true,
        type: 'text',
      }]
      emits('update:modelValue', defaultValue)
      return defaultValue
    }
    return props.modelValue
  },
  set (v: FormDataType[]) {
    console.log('formData set', v)
    emits('update:modelValue', v)
  },
})
const bulkData = ref('')

const edit = (e: any) => {
  console.log('input edit:', e)
  if (e && e.focus) {
    if (document.activeElement !== e) {
      e.focus()
      const range = window.getSelection() // 创建range
      range?.selectAllChildren(e) // range 选择obj下所有子内容
      range?.collapseToEnd() // 光标移至最后
    }
  }
}
const onBlur = (e: any) => {
  console.log('onblur')
  e.edit = ''
}
const doDeleteItem = (index: number) => {
  console.log('doDeleteItem:', index)
  formData.value.splice(index, 1)
}
const newDataInput = (e: any) => {
  console.log('newDataInput')
  const last = formData.value[formData.value.length - 1]
  if (!(last.key + last.value + last.desc)) return

  formData.value.push({
    id: `${formData.value.length + 1}`,
    edit: '',
    key: '',
    value: '',
    desc: '',
    enable: true,
    type: 'text',
  })
}
const onChangeMode = () => {
  if (editMode.value === 'kv') {
    // kv -> bulk
    bulkData.value = ''
    for (let i = 0; i < formData.value.length - 1; i++) {
      const data = formData.value[i]
      if (data.type === 'text')
        bulkData.value += `${data.enable ? '' : '//'}${data.key}:${data.value}\n`
    }
    bulkData.value = bulkData.value.trimEnd()
  }
  else {
    // bulk -> kv
    const lines = bulkData.value.split('\n')
    const tempData: FormDataType[] = [
      {
        id: '1',
        enable: true,
        edit: '',
        key: '',
        value: '',
        desc: '',
        type: 'text',
      },
    ]
    for (let i = 0; i < lines.length; i++) {
      // 数组不够，补一个
      if (i === tempData.length - 1) {
        tempData.push({
          id: `${tempData.length}`,
          enable: true,
          edit: '',
          key: '',
          value: '',
          desc: '',
          type: 'text',
        })
      }
      // 可能已有
      if (formData.value[i])
        tempData[i].desc = formData.value[i].desc

      const ele = tempData[i]
      let line = lines[i]
      if (line.startsWith('//')) {
        ele.enable = false
        line = line.substring(2)
      }
      const d = line.split(':')
      ele.key = d[0] || ''
      ele.value = d[1] || ''
    }
    formData.value = formData.value.filter(e => e.type === 'file')
    formData.value.push(...tempData)
  }
  editMode.value = editMode.value === 'kv' ? 'bulk' : 'kv'
}

const dragstart = (value: any) => {
  oldData.value = value
}

// 记录移动过程中信息
const dragenter = (value: any, e: any) => {
  newData.value = value
  e.preventDefault()
}

// 拖拽最终操作
const dragend = (value: any, e: any) => {
  console.log('dragend')
  draggable.value = false
  if (oldData.value !== newData.value) {
    const oldIndex = formData.value.indexOf(oldData.value)
    const newIndex = formData.value.indexOf(newData.value)
    const newItems = [...formData.value]
    // 删除老的节点
    newItems.splice(oldIndex, 1)
    // 在列表中目标位置增加新的节点
    newItems.splice(newIndex, 0, oldData.value)
    formData.value = [...newItems]
  }
}

// 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
const dragover = (e: any) => {
  console.log('dragover')
  e.preventDefault()
}
</script>

<style lang="less" scoped>
.sort-move {
  transition: transform 0.3s;
}

.request-form {
  .title {
    color: red;
  }
  .kv-edit{
    background-color: #fff;
    .header{
      display: flex;
      height: 35px;
      align-items: center;
      justify-content: center;
      >div{
        display: flex;
        height: 100%;
        width: 33.3%;
        border-right: 1px solid #eee;
        border-top: 1px solid #eee;
        >span{
          margin: 5px;
        }
      }
      >div:last-child{
        justify-content: space-between;
        align-items: center;
        >.change-mode{
          cursor: pointer;
          height: 100%;
          padding-right: 10px;
          padding-left: 10px;
          border-left: 1px solid #eee;
          display: flex;
          align-items: center;
        }
      }
    }
    .body{
      display: flex;
      flex-direction: column;
      // align-items: center;
      user-select:none;
      .row {
        display: flex;
        height: 35px;
        cursor: text;
        >.checkbox{
          display: flex;
          justify-content: flex-end;
          padding-right: 5px;
          align-items: center;
          >.drag-icon{
            opacity: 0;
            &:hover{
              cursor: ns-resize;
            }
          }
        }
        >div{
          display: flex;
          height: 100%;
          width: 33.3%;
          border-right: 1px solid #eee;
          border-top: 1px solid #eee;
          >.edit-area{
            margin: 5px;
            // overflow: hidden;
            flex:1;
            width: 0;
            >span{
              display: block;
              padding-left: 5px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            >.simple {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 100%;
              >.data-type{
                opacity: 1;
                color: #aaa;
                >.type-select{
                  width: 90px;
                }
              }
            }
            >.select-binary{
              font-size: small;
              display: flex;
              align-items: center;
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
              >.name{
                width: fit-content;
                border-radius: 4px;
                padding-left: 3px;
                padding-right: 8px;
                border: 1px solid #eee;
                >.filename{
                  user-select: text;
                }
                >.remove{
                  cursor: pointer;
                  padding-left: 3px;
                }
              }
            }
          }
          .edit-item{
            width: 100%;
            padding-left: 5px;
            z-index: 10;
            background-color: #fff;
            word-wrap:break-word;
            word-break:break-all;
            position: relative;
            border: 1px solid #eee;
            &:focus-visible{
              outline: none!important;
              background-color: #fff;
            }
          }
          >.delete-button{
            opacity: 0;
            display: flex;
            position: absolute;
            right: 0px;
            top: 0;
            bottom: 0;
            justify-content: center;
            align-items: center;
            margin: 5px;
            cursor: pointer;
            background-color: #fff;
            &:hover{
              border-radius: 3px;
              background-color: #ddd;
            }
          }
        }
        &:last-child{
          border-bottom: 1px solid #eee;
          color: #ddd;
        }
        &:focus-within{
          background-color: #eeeeee55;
        }
        position: relative;
        &:hover .delete-button, &:hover .drag-icon, &:hover .edit-area > .simple > .data-type{
          opacity: 1;
        }
      }
    }
  }
  .bulk-edit{
    background-color: #fff;
    .header{
      display: flex;
      height: 35px;
      align-items: center;
      justify-content: right;
      border-left: 1px solid #eee;
      border-top: 1px solid #eee;
      border-right: 1px solid #eee;
      >div{
        display: block;
        height: 100%;
        // border-right: 1px solid #eee;
        // border-top: 1px solid #eee;
        white-space: nowrap;
      }
      >div:last-child{
        justify-content: space-between;
        align-items: center;
        >.change-mode{
          cursor: pointer;
          height: 100%;
          padding-right: 10px;
          padding-left: 10px;
          border-left: 1px solid #eee;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
