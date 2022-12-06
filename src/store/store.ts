import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import { useStore as baseUseStore, createStore } from 'vuex'
import { user } from './module/user'
import { tabs } from './module/tabs'
import { app } from './module/app'

// 为 store state 声明类型
export interface State {
  count: number
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store key')

// 创建一个新的 store 实例
export const store = createStore<State>({
  modules: {
    user,
    tabs,
    app,
  },
  state: {
    count: 0,
  },
})

// 定义自己的 `useStore` 组合式函数
export function useCustomStore () {
  return baseUseStore(key)
}
