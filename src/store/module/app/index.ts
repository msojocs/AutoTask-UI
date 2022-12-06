/*
 * @Author: msojocs jiyecafe@gmail.com
 * @Date: 2022-10-18 22:17:04
 * @LastEditors: msojocs jiyecafe@gmail.com
 * @LastEditTime: 2022-11-03 20:05:12
 * @FilePath: \webv2\src\store\module\app\index.ts
 * @Description: ""
 * Copyright (c) 2022 by msojocs email: jiyecafe@gmail.com, All Rights Reserved.
 */
import type { Module } from 'vuex'
import type { State } from '../../store'
import type { AppState } from './types'

export const app: Module<AppState, State> = {
  namespaced: true,
  state: () => ({
    isSidebarClose: false,
    device: 'desktop',
    lang: 'zhCn',
  }),
  mutations: {
    switchSidebar: (state: AppState) => {
      state.isSidebarClose = !state.isSidebarClose
    },
    closeSidebar: (state: AppState) => {
      state.isSidebarClose = true
    },
    openSidebar: (state: AppState) => {
      state.isSidebarClose = false
    },
    toggleDevice: (state: AppState, device: string) => {
      state.device = device
    },
    changeLang: (state: AppState, lang: string) => {
      state.lang = lang
    },
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit('switchSidebar')
    },
    closeSideBar ({ commit }) {
      commit('closeSidebar')
    },
    toggleDevice ({ commit }, device) {
      commit('toggleDevice', device)
    },
  },
  getters: {
    isSidebarClose (state: AppState) {
      return state.isSidebarClose
    },
    getCurrentDevice (state: AppState) {
      return state.device
    },
    getCurrentLang (state: AppState) {
      return state.lang
    },
  },
}
