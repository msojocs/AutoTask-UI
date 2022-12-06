<template>
  <div class="login text-4xl">
    <span>Auto Task</span>
    <br>
    <el-card>
      <div class="m-9">
        <el-form>
          <el-form-item label="账号">
            <el-input v-model="userName" type="text" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" type="password" />
          </el-form-item>
          <el-form-item>
            <el-row style="width:100%">
              <el-col :span="4" />
              <el-col :span="20">
                <el-button type="primary" style="width: 100%;" @click="loginStart">
                  登录
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login } from './api/user'
import { store } from '@/store/store'

const userName = ref('')
const password = ref('')

const router = useRouter()

const genMenu = (funcList: any[], father_function_key: string | null) => {
  const result = []
  const child = funcList.filter(e => e.father_function_key === father_function_key)
  for (const func of child) {
    const data: any = {
      path: func.path_name || '/',
      name: func.function_id,
      meta: {
        title: {
          zhCn: func.function_name_zh_cn,
          en: func.function_name_en,
          zhTw: func.function_name_zh_tw,
        },
        icon: func.menu_icon,
        type: func.function_sub_type,
        hidden: func.is_visible === 'N',
      },
    }
    if (func.path_name && func.path_name.includes('/:'))
      data.props = true
    if (func.obj_name) {
      data.props = {
        tableName: func.obj_name,
      }
    }

    data.children = genMenu(funcList, func.function_key)
    result.push(data)
  }
  if (father_function_key == null && result[0]) return result[0].children || result
  return result
}

const loginStart = () => {
  login(userName.value, password.value).then((res) => {
    console.log('登录结果:', res)
    if (res.token) {
      // 菜单处理
      // eslint-disable-next-line no-console
      // console.log(res.functionlist)
      // const funcList = res.functionlist
      // const menuTree = genMenu(funcList, null)
      // eslint-disable-next-line no-console
      // console.log('menuTree:', menuTree)
      // store.commit('user/updateMenu', menuTree)

      // token存储更新
      store.commit('user/updateToken', res.token)
      store.commit('user/updateUserName', res.user_name)
      router.push({ name: 'home' })
    }
    else {
      ElMessage({ type: 'error', message: 'token 丢失' })
    }
  }).catch((err) => {
    console.error(err)
  })
}
</script>

<style scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
}
</style>
