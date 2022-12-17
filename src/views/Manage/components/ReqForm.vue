<template>
  <div>
    <h1>请求编辑器</h1>
    <br>
    <div class="m-5">
      <div class="url">
        <!-- URL信息 -->
        <el-input v-model="url">
          <template #prepend>
            <el-select v-model="request.method">
              <el-option value="GET" label="GET" />
              <el-option value="POST" label="POST" />
              <el-option value="PUT" label="PUT" />
              <el-option value="DELETE" label="DELETE" />
              <el-option value="PATCH" label="PATCH" />
              <el-option value="OPTION" label="OPTION" />
              <el-option value="HEAD" label="HEAD" />
            </el-select>
          </template>
        </el-input>
        <el-button class="send-button" type="primary" @click="sendRequest">
          发送
        </el-button>
      </div>
      <div>
        <el-tabs v-model="configType">
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
            <BodyForm :body="request.body" />
          </el-tab-pane>
          <el-tab-pane label="Expected" name="expected">
            <ExpectedForm v-model:expected="request.expected" />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="result">
        <pre>{{ requestResult }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { testRequest } from './api'
import AuthForm from './AuthForm.vue'
import BodyForm from './BodyForm.vue'
import HeaderForm from './HeaderForm.vue'
import ParamForm from './ParamForm.vue'
import ExpectedForm from './ExpectedForm.vue'
import type { ParamDataType, RequestBodyType, RequestType } from './types'

// 标记K值是否有携带等号
const equlaMark = ref<string[]>([])
const requestResult = ref('')
const configType = ref('expected')

const request = reactive<RequestType>({
  method: 'POST',
  url: 'https://httpbin.org/post',
  // proxy: 'http://127.0.0.1:8888',
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
      enable: true,
      edit: '',
      key: 'k3',
      value: 'v3',
      desc: '测试三号',
    },
    {
      id: '4',
      enable: true,
      edit: '',
      key: ' 7',
      value: '',
      desc: '测试四号',
    },
    {
      id: '5',
      enable: undefined,
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
    type: 'text',
    data: {

    },
  },
  expected: [
    {
      name: '状态码',
      enable: true,
      target: 'status',
      value: '200',
      exp: '>',
    },
  ],
})

const url = computed({
  get () {
    const u = request.url
    let ps = ''
    for (let i = 0; i < request.params.length - 1; i++) {
      const p = request.params[i]
      if (p.enable) {
        ps += `&${p.key}`
        if (p.value) ps += `=${p.value}`
        else if (equlaMark.value.includes(p.key)) ps += '='
      }
    }
    console.log('ps:', ps)
    if (ps)
      ps = `?${ps.substring(1)}`
    return u + ps
  },
  set (v: string) {
    console.log('set url', v)
    const d = v.split('?')
    if (d[0]) request.url = d[0]
    if (d[1]) {
      const ps = d[1].split('&')
      const tempData: ParamDataType[] = []
      for (const p of ps) {
        const kv: string[] = []

        // 有等号
        if (p.includes('=')) {
          kv[0] = p.slice(0, p.indexOf('='))
          kv[1] = p.slice(p.indexOf('=') + 1)
          equlaMark.value.push(kv[0])
        }
        else {
          kv[0] = p
          equlaMark.value = equlaMark.value.filter(e => e !== kv[0])
        }
        const data: ParamDataType = {
          enable: true,
          key: kv[0],
          value: kv[1] || '',
          id: `${tempData.length}`,
          edit: '',
          desc: '',
        }
        tempData.push(data)
      }
      for (let i = 0; i < request.params.length - 1; i++) {
        console.log('request.params:', i)
        const param = request.params[i]
        if (!param.enable) continue
        const index = tempData.findIndex(e => e.key === param.key)
        if (index === -1) {
          // 没找到
          equlaMark.value = equlaMark.value.filter(e => e !== param.key)
          request.params.splice(i--, 1)
        }
        else {
          // 找到
          param.value = tempData[index].value
          tempData.splice(index, 1)
        }
      }
      // 剩余的
      request.params.splice(request.params.length - 1, 0, ...tempData)
    }
  },

})

const sendRequest = () => {
  console.log('使用服务器发送请求')
  const header: Record<string, string> = {}
  for (let i = 0; i < request.header.length - 1; i++) {
    const h = request.header[i]
    if (h.enable)
      header[h.key] = h.value
  }

  console.log('params:', request.params)
  let ps = ''
  for (let i = 0; i < request.params.length - 1; i++) {
    const p = request.params[i]
    if (p.enable) ps += `&${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`
  }
  if (ps) ps = `?${ps.substring(1)}`

  const req: RequestBodyType = {
    method: request.method,
    url: request.url + ps,
    proxy: request.proxy,
    header,
    body: request.body,
    expected: request.expected || [],
  }
  testRequest(req).then((res) => {
    console.log('request result:', res)
    try {
      requestResult.value = JSON.stringify(JSON.parse(res.body), null, 4)
    }
    catch (e: any) {
      requestResult.value = JSON.stringify(res, null, 4)
    }
  })
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
