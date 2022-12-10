<template>
  <div class="request-form">
    <div class="title">
      <span>Query Params</span>
    </div>
    <div class="edit">
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
        </div>
      </div>
      <div class="body test_wrapper" @dragover="dragover($event)">
        <transition-group name="sort">
          <div
            v-for="(item, index) in dataList" :key="item.id"
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
              @mousedown="draggable = true && index != dataList.length - 1"
              @mouseup="draggable = false"
            >
              <drag-icon v-if="item.edit == '' && index != dataList.length - 1" class="drag-icon" />
              <el-checkbox v-if="index != dataList.length - 1" v-model="item.enable" />
            </div>
            <div @click="item.edit = 'key'">
              <div>
                <input
                  v-if="item.edit == 'key'"
                  :id="item.id"
                  :ref="edit"
                  v-model="item.key"
                  class="edit-item"
                  :placeholder="index == dataList.length - 1 ? 'Key' : ''"
                  @blur="onBlur(item)"
                >
                <span v-else>{{ item.key || (index == dataList.length - 1 ? 'Key' : '') }}</span>
              </div>
            </div>
            <div @click="item.edit = 'value'">
              <div>
                <input
                  v-if="item.edit == 'value'"
                  :id="item.id"
                  :ref="edit"
                  v-model="item.value"
                  class="edit-item"
                  :placeholder="index == dataList.length - 1 ? 'Value' : ''"
                  @blur="onBlur(item)"
                >
                <span v-else>{{ item.value || (index == dataList.length - 1 ? 'Value' : '') }}</span>
              </div>
            </div>
            <div @click="item.edit = 'desc'">
              <div>
                <input
                  v-if="item.edit == 'desc'"
                  :id="item.id"
                  :ref="edit"
                  v-model="item.desc"
                  class="edit-item"
                  :placeholder="index == dataList.length - 1 ? 'Description' : ''"
                  @blur="onBlur(item)"
                >
                <span v-else>{{ item.desc || (index == dataList.length - 1 ? 'Description' : '') }}</span>
              </div>
              <div
                v-if="item.edit == '' && index < dataList.length - 1"
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
  </div>
</template>

<script lang="ts" setup>
import DragIcon from './DragIcon.vue'

const oldData = ref(null) // 开始排序时按住的旧数据
const newData = ref(null) // 拖拽过程的数据
const draggable = ref(false)

// 列表数据
const dataList = ref([
  {
    id: '1',
    enable: false,
    edit: '',
    key: 'k1',
    value: 'v1',
    desc: '测试一号',
  },
  {
    id: '2',
    enable: false,
    edit: '',
    key: 'k2',
    value: 'v2',
    desc: '测试二号',
  },
  {
    id: '3',
    enable: false,
    edit: '',
    key: 'k3',
    value: 'v3',
    desc: '测试三号',
  },
  {
    id: '4',
    enable: true,
    edit: '',
    key: 'k4',
    value: 'v4',
    desc: '测试四号',
  },
  {
    id: '4',
    enable: true,
    edit: '',
    key: '',
    value: '',
    desc: '',
  },
])

const edit = (e: any) => {
  console.log('input edit:', e)
  if (e && e.focus)
    e.focus()
  else if (e && e.target && e.target.focus)
    e.target.focus()
}
const onBlur = (e: any) => {
  console.log('onblur')
  e.edit = ''
}
const doDeleteItem = (index: number) => {
  console.log('doDeleteItem:', index)
  dataList.value.splice(index, 1)
}
const newDataInput = (e: any) => {
  console.log('newDataInput')

  const last = dataList.value[dataList.value.length - 1]
  if (!(last.key + last.value + last.desc)) return

  dataList.value.push({
    id: `${dataList.value.length + 1}`,
    edit: '',
    key: '',
    value: '',
    desc: '',
    enable: true,
  })
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
    const oldIndex = dataList.value.indexOf(oldData.value)
    const newIndex = dataList.value.indexOf(newData.value)
    const newItems = [...dataList.value]
    // 删除老的节点
    newItems.splice(oldIndex, 1)
    // 在列表中目标位置增加新的节点
    newItems.splice(newIndex, 0, oldData.value)
    dataList.value = [...newItems]
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
  .edit{
    background-color: #fff;
    .header{
      display: flex;
      height: 35px;
      align-items: center;
      justify-content: center;
      div{
        display: flex;
        height: 100%;
        width: 33.3%;
        border-right: 1px solid #eee;
        border-top: 1px solid #eee;
        span{
          margin: 5px;
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
          justify-content: end;
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
          >div{
            width: 100%;
            margin: 5px;
            span{
              padding-left: 5px;
            }
          }
          .edit-item{
            width: 100%;
            padding-left: 5px;
            background-color: #000000;
            &:focus-visible{
              outline: none!important;
              background-color: #fff;
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
        .delete-button{
          opacity: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px;
          cursor: pointer;
          &:hover{
            border-radius: 3px;
            background-color: #ddd;
          }
        }
        &:hover .delete-button, &:hover .drag-icon{
          opacity: 1;
        }
      }
    }
  }
}
</style>
