/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// index.ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestConfig, RequestInterceptors } from './types'

class Request {
  // axios 实例
  instance: AxiosInstance
  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>

  constructor (config: RequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log('全局请求拦截器')
        return config
      },
      async (err: any) => {
        console.log('request error:', err)
        return await Promise.reject(err)
      },
    )

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptors,
      config.interceptors?.requestInterceptorsCatch,
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptors,
      config.interceptors?.responseInterceptorsCatch,
    )

    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        console.log('全局响应拦截器')
        return res.data
      },
      (err: any) => err,
    )
  }

  async request<T>(config: RequestConfig<T>): Promise<T> {
    return await new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if ((config.interceptors?.requestInterceptors) != null)
        config = config.interceptors.requestInterceptors(config)

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if ((config.interceptors?.responseInterceptors) != null)
            res = config.interceptors.responseInterceptors(res)

          resolve(res)
        })
        .catch((err: any) => {
          console.error('error')
          reject(err)
        })
    })
  }
}

export default Request
