<template>
  <div>
    <h1>请求编辑器</h1>
    <br>
    <div class="m-5">
      <div class="url">
        <!-- URL信息 -->
        <el-input v-model="request.url">
          <template #prepend>
            <el-select v-model="request.method">
              <el-option value="GET" label="GET" />
              <el-option value="POST" label="POST" />
            </el-select>
          </template>
        </el-input>
        <el-button class="send-button" type="primary" @click="sendRequest">
          发送
        </el-button>
      </div>
      <div>
        <el-tabs active-name="body">
          <el-tab-pane label="Params" name="params">
            <ParamForm :params="request.params" />
          </el-tab-pane>
          <el-tab-pane label="Authorization" name="authorization">
            <AuthForm />
          </el-tab-pane>
          <el-tab-pane label="Headers" name="headers">
            <HeaderForm :headers="request.header" />
          </el-tab-pane>
          <el-tab-pane label="Body" name="body">
            <BodyForm />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthForm from './AuthForm.vue'
import BodyForm from './BodyForm.vue'
import HeaderForm from './HeaderForm.vue'
import ParamForm from './ParamForm.vue'
import type { RequestType } from './types'

const request: RequestType = {
  method: 'GET',
  url: 'https://httpbin.org/post',
  params: [
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
      value: 'v299999999999999999999988888888888888888899999999999999999999999999999999998',
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
  ],
  header: [{
    id: '1',
    enable: false,
    edit: '',
    key: 'k1',
    value: 'v1',
    desc: '测试一号',
    auto: true,
  },
  {
    id: '2',
    enable: false,
    edit: '',
    key: 'k2',
    value: 'v299999999999999999999988888888888888888899999999999999999999999999999999998',
    desc: '测试二号',
    auto: true,
  },
  {
    id: '3',
    enable: false,
    edit: '',
    key: 'k3',
    value: 'v3',
    desc: '自动三号',
    auto: true,
  },
  {
    id: '4',
    enable: true,
    edit: '',
    key: 'k4',
    value: 'v4',
    desc: '测试四号',
    auto: false,
  },
  {
    id: '5',
    enable: true,
    edit: '',
    key: '',
    value: '',
    desc: '',
    auto: false,
  }],
  body: {
    t: '',
    data: '',
  },
}

const sendRequest = () => {
  console.log('使用服务器发送请求')
}

</script>

<style lang="less" scoped>
.url {
  display: flex;
  >.send-button{
    margin-left: 10px;
  }
}
</style>
