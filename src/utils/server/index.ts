/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import Request from '../request/index'

import router from '../../router'
import type { RequestConfig } from '../request/types'
import { store } from '@/store/store'

console.log('BASE_URL', import.meta.env.VITE_BASE_URL)
const request = new Request({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      console.log('实例请求拦截器')

      // Do something before request is sent
      const token = store.getters['user/token']
      //   console.log('token:', token)
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        }
      }

      return config
    },
    // 响应拦截器
    responseInterceptors: (response: AxiosResponse) => {
      console.log('实例响应拦截器')
      // Do something with response data
      console.log('response', response)

      if (response.status / 100 !== 2) return Promise.reject(response)

      const resp = response.data
      if (resp && resp.code !== 0) {
        console.log('状态码异常', resp)
        if (resp.result) {
          ElMessage({
            message: resp.result.message,
            center: true,
            type: 'error',
          })
        }
        return resp
      }

      return response
    },
    async responseInterceptorsCatch (error) {
      // Do something with response error
      console.log('请求出现异常 - ', error)
      console.log('错误对象类型 - ', Object.prototype.toString.call(error))
      console.log('error.name', error.name)
      console.log('error.message', error.message)
      console.log('error.code', error.code)
      console.log('error.status', error.status)

      // 网络异常
      if (error.message === 'Network Error') {
        ElMessage({
          message: '网络错误！',
          center: true,
          type: 'error',
        })
        return await Promise.reject(error)
      }
      else if (error.message.includes('timeout')) {
        ElMessage({
          message: '响应超时',
          center: true,
          type: 'error',
        })
        return await Promise.reject(error)
      }

      // 网络正常，但请求失败
      const resp = error.response
      const data = resp.data || null
      console.log(resp)
      if (resp && resp.status) {
        switch (resp.status) {
          // 401: 未登录，或者登录过期
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。
          case 401:
            ElMessage({
              message: '未登录',
              center: true,
            })
            // 清除token
            localStorage.removeItem('token')
            // store.commit("loginSuccess", null);
            store.commit('set_isLogin', false)
            router.push({
              path: '/user/login',
              query: {
                redirect: router.currentRoute.value.fullPath,
              },
            })
            break

            // 403 没有接口相关权限
            // 对用户进行提示
            // 跳转登录页面
          case 403:
            ElMessage({
              message: '你没有权限执行该操作',
              center: true,
            })
            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            // setTimeout(() => {
            //   router.replace({
            //     path: "/index",
            //     query: {
            //       redirect: router.currentRoute.fullPath
            //     }
            //   });
            // }, 1000);
            break

            // 404请求不存在
          case 404:
            ElMessage({
              message: '接口不存在！',
              center: true,
            })
            break
            // 其他错误，直接抛出错误提示
          default:
            if (data && data.error) {
              ElMessage({
                message: data.result?.message || '服务器错误！',
                center: true,
                type: 'error',
              })
            }
            else {
              ElMessage({
                message: '请求发生异常1！',
                center: true,
                type: 'error',
              })
            }
        }
      }
      else {
        ElMessage({
          message: '请求发生异常2！',
          center: true,
          type: 'error',
        })
      }
      console.log(' ==== axios尝试处理异常结束 ==== ')
      return await Promise.reject(error)
    },
  },
})

interface EMSRequestConfig<T, R> extends RequestConfig<EMSResponse<R>> {
  data?: T
}
interface EMSResponse<T> {
  code: number
  data: T
  msg: string
  error: string
}

/**
 * @description: 函数的描述
 * @interface D 请求参数的interface
 * @interface T 响应结构的intercept
 * @param {EMSRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const ATRequest = async <D = any, T = any>(config: EMSRequestConfig<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET')
    config.params = config.data

  return await request.request<EMSResponse<T>>(config).then(async (res) => {
    if (res?.code === 0) return await Promise.resolve(res.data)
    else return await Promise.reject(res)
  })
}

export const POST = async <T = any, R = AxiosResponse<T>, D = any>(url: string, data: D, config?: EMSRequestConfig<D, T>) => {
  if (config == null)config = {}
  config.url = url
  config.data = data
  config.method = 'POST'
  return await ATRequest(config)
}
export const GET = async <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: EMSRequestConfig<D, T>) => {
  if (config == null)config = {}
  config.url = url
  config.method = 'GET'
  return await ATRequest(config)
}
export default ATRequest
