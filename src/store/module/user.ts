/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Module } from 'vuex'
import type { State } from '../store'

export interface UserState {
  token: string
  userName: string
  menu: any
}
export const user: Module<UserState, State> = {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    userName: localStorage.getItem('userName') || '',
    menu: JSON.parse(localStorage.getItem('menu') || '[]'),
  }),
  mutations: {
    updateToken (state: UserState, token: string) {
      // 变更状态
      state.token = token
      localStorage.setItem('token', token)
    },
    updateUserName (state: UserState, userName: string) {
      state.userName = userName
      localStorage.setItem('userName', userName)
    },
    updateMenu (state: UserState, menu: any) {
      state.menu = menu
      localStorage.setItem('menu', JSON.stringify(menu))
    },
  },
  actions: {

  },
  getters: {
    token (state: UserState) {
      return state.token
    },
    userName (state: UserState) {
      return state.userName
    },
    menu (state: UserState) {
      return state.menu
    },
  },
}
