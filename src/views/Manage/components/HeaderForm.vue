<template>
  <div class="request-form" @change="onHeaderChange">
    <div class="title">
      <span class="name">Headers</span>
      <div class="hide-button" @click="showAuto = !showAuto">
        <span>&nbsp;hidden</span>
      </div>
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
          <template
            v-for="(item, index) in headerData"
            :key="item.id"
          >
            <template v-if="showAuto && item.auto">
              <div
                class="row sort-item is-blocked"
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
                  @mousedown="draggable = true && index != headerData.length - 1"
                  @mouseup="draggable = false"
                >
                  <!-- <drag-icon v-if="item.edit == '' && index != kvData.length - 1" class="drag-icon" /> -->
                  <el-checkbox v-if="index != headerData.length - 1" v-model="item.enable" />
                </div>
                <div @click="item.edit = 'key'">
                  <div class="edit-area">
                    <div
                      v-if="item.edit == 'key'"
                      :id="item.id"
                      :ref="edit"
                      class="edit-item"
                      :placeholder="index == headerData.length - 1 ? 'Key' : ''"
                      contenteditable="true"
                      @input="item.key = ($event.target as any).innerHTML"
                      @blur="onBlur(item)"
                      @keydown="blockKeyDown"
                    >
                      {{ item.key }}
                    </div>
                    <span v-else>{{ item.key || (index == headerData.length - 1 ? 'Key' : '') }}</span>
                  </div>
                </div>
                <div @click="item.edit = 'value'">
                  <div class="edit-area">
                    <div
                      v-if="item.edit == 'value'"
                      :id="item.id"
                      :ref="edit"
                      class="edit-item"
                      :placeholder="index == headerData.length - 1 ? 'Value' : ''"
                      contenteditable="true"
                      @input="item.value = ($event.target as any).innerHTML"
                      @blur="onBlur(item)"
                      @keydown="blockKeyDown"
                    >
                      {{ item.value }}
                    </div>
                    <span v-else>{{ item.value || (index == headerData.length - 1 ? 'Value' : '') }}</span>
                  </div>
                </div>
                <div @click="item.edit = 'desc'">
                  <div class="edit-area">
                    <div
                      v-if="item.edit == 'desc'"
                      :id="item.id"
                      :ref="edit"
                      class="edit-item"
                      :placeholder="index == headerData.length - 1 ? 'Description' : ''"
                      contenteditable="true"
                      @input="item.desc = ($event.target as any).innerHTML"
                      @blur="onBlur(item)"
                      @keydown="blockKeyDown"
                    >
                      {{ item.desc }}
                    </div>
                    <span v-else>{{ item.desc || (index == headerData.length - 1 ? 'Description' : '') }}</span>
                  </div>
                  <!-- <div
                    v-if="item.edit == '' && index < kvData.length - 1"
                    class="delete-button"
                    style="width: 25px;"
                    @click.stop="doDeleteItem(index)"
                  >
                    <el-icon><Delete /></el-icon>
                  </div> -->
                </div>
              </div>
            </template>
            <template v-else-if="!item.auto">
              <div
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
                  @mousedown="draggable = true && index != headerData.length - 1"
                  @mouseup="draggable = false"
                >
                  <drag-icon v-if="item.edit == '' && index != headerData.length - 1" class="drag-icon" />
                  <el-checkbox v-if="index != headerData.length - 1" v-model="item.enable" />
                </div>
                <div @click="item.edit = 'key'">
                  <div class="edit-area">
                    <div
                      v-if="item.edit == 'key'"
                      :id="item.id"
                      :ref="edit"
                      class="edit-item"
                      :placeholder="index == headerData.length - 1 ? 'Key' : ''"
                      contenteditable="true"
                      @input="item.key = ($event.target as any).innerHTML"
                      @blur="onBlur(item)"
                    >
                      {{ item.key }}
                    </div>
                    <span v-else>{{ item.key || (index == headerData.length - 1 ? 'Key' : '') }}</span>
                  </div>
                </div>
                <div @click="item.edit = 'value'">
                  <div class="edit-area">
                    <div
                      v-if="item.edit == 'value'"
                      :id="item.id"
                      :ref="edit"
                      class="edit-item"
                      :placeholder="index == headerData.length - 1 ? 'Value' : ''"
                      contenteditable="true"
                      @input="item.value = ($event.target as any).innerHTML"
                      @blur="onBlur(item)"
                    >
                      {{ item.value }}
                    </div>
                    <span v-else>{{ item.value || (index == headerData.length - 1 ? 'Value' : '') }}</span>
                  </div>
                </div>
                <div @click="item.edit = 'desc'">
                  <div class="edit-area">
                    <div
                      v-if="item.edit == 'desc'"
                      :id="item.id"
                      :ref="edit"
                      class="edit-item"
                      :placeholder="index == headerData.length - 1 ? 'Description' : ''"
                      contenteditable="true"
                      @input="item.desc = ($event.target as any).innerHTML"
                      @blur="onBlur(item)"
                    >
                      {{ item.desc }}
                    </div>
                    <span v-else>{{ item.desc || (index == headerData.length - 1 ? 'Description' : '') }}</span>
                  </div>
                  <div
                    v-if="item.edit == '' && index < headerData.length - 1"
                    class="delete-button"
                    style="width: 25px;"
                    @click.stop="doDeleteItem(index)"
                  >
                    <!-- 删除图标 -->
                    <el-icon><Delete /></el-icon>
                  </div>
                </div>
              </div>
            </template>
          </template>
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
import DragIcon from './DragIcon.vue'
import type { HeaderDataType } from './types'

const props = defineProps({
  headers: {
    required: true,
    type: Array<HeaderDataType>,
  },
})

const oldData = ref(null) // 开始排序时按住的旧数据
const newData = ref(null) // 拖拽过程的数据
const draggable = ref(false)
const editMode = ref<'kv'|'bulk'>('kv')
const showAuto = ref(false)
const bulkData = ref('')

const headerData = ref(props.headers)
const edit = (e: any) => {
  console.log('input edit:', e)
  if (e && e.focus) {
    e.focus()
    const range = window.getSelection() // 创建range
    range?.selectAllChildren(e) // range 选择obj下所有子内容
    range?.collapseToEnd() // 光标移至最后
  }
}
const blockKeyDown = (e: any) => {
  e.preventDefault()
  return false
}
const onBlur = (e: any) => {
  console.log('onblur')
  e.edit = ''
}
const doDeleteItem = (index: number) => {
  console.log('doDeleteItem:', index)
  headerData.value.splice(index, 1)
}
const newDataInput = (e: any) => {
  console.log('newDataInput')

  const last = headerData.value[headerData.value.length - 1]
  if (!(last.key + last.value + last.desc)) return

  headerData.value.push({
    id: `${headerData.value.length + 1}`,
    edit: '',
    key: '',
    value: '',
    desc: '',
    enable: true,
    auto: false,
  })
}
const onChangeMode = () => {
  if (editMode.value === 'kv') {
    // kv -> bulk
    bulkData.value = ''
    for (let i = 0; i < headerData.value.length - 1; i++) {
      const data = headerData.value[i]
      bulkData.value += `${data.enable ? '' : '//'}${data.key}:${data.value}\n`
    }
    bulkData.value = bulkData.value.trimEnd()
  }
  else {
    // bulk -> kv
    const lines = bulkData.value.split('\n')
    const tempData: HeaderDataType[] = [
      {
        id: '1',
        enable: true,
        edit: '',
        key: '',
        value: '',
        desc: '',
        auto: false,
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
          auto: false,
        })
      }
      // 可能已有
      if (headerData.value[i])
        tempData[i].desc = headerData.value[i].desc

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
    headerData.value = tempData
  }
  editMode.value = editMode.value === 'kv' ? 'bulk' : 'kv'
}

const onHeaderChange = () => {
  console.log('change')
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
    const oldIndex = headerData.value.indexOf(oldData.value)
    const newIndex = headerData.value.indexOf(newData.value)
    const newItems = [...headerData.value]
    // 删除老的节点
    newItems.splice(oldIndex, 1)
    // 在列表中目标位置增加新的节点
    newItems.splice(newIndex, 0, oldData.value)
    headerData.value = [...newItems]
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
    display: flex;
    margin-bottom: 5px;
    >.name{
      color: red;
    }
    >.hide-button {
      cursor: pointer;
      font-size: small;
      border-radius: 50px;
      margin-left: 10px;
      padding: 0 10px;
      background-color: #eeeeee55;
      display: flex;
      align-items: center;
      color: #777;
      font-weight: bold;
    }
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
        &:hover .delete-button, &:hover .drag-icon{
          opacity: 1;
        }
      }
      .is-blocked{
        background-color: #eeeeee50;;;
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
