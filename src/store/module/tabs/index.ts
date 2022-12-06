/*
 * @Author: msojocs jiyecafe@gmail.com
 * @Date: 2022-10-17 11:56:23
 * @LastEditors: msojocs jiyecafe@gmail.com
 * @LastEditTime: 2022-11-03 20:04:11
 * @FilePath: \webv2\src\store\module\tabs\index.ts
 * @Description: ""
 * Copyright (c) 2022 by msojocs email: jiyecafe@gmail.com, All Rights Reserved.
 */
import type { Module } from 'vuex'
import type { State } from '../../store'
import type { TabData, TabState } from './types'

export const tabs: Module<TabState, State> = {
  namespaced: true,
  state: () => ({
    tabsOption: [{
      title: {
        zhCn: '首页',
        en: 'Home Page',
        zhTw: '首页',
      },
      name: '/home',
      route: '/home',
    }],
    currentIndex: '/home',
    breadcrumbList: [],
  }),
  mutations: {
    ADD_TAB: (state: TabState, data: TabData) => {
      state.tabsOption.push(data)
    },
    DELETE_TAB: (state: TabState, name: string) => {
      const index = state.tabsOption.findIndex(tab => tab.name === name)
      state.tabsOption.splice(index, 1)
    },
    SET_TAB: (state: TabState, index: string) => {
      state.currentIndex = index
    },
    CLEAR_TAB: (state: TabState) => {
      // 初始化tab
      state.tabsOption = [
        {
          route: '/home',
          title: {
            zhCn: '首页',
            en: 'Home Page',
            zhTw: '首页',
          },
          name: 'home',
        },
      ]
    },
  },
  actions: {

  },
  getters: {
    getCurrentIndex (state: TabState) {
      return state.currentIndex
    },
    getTabsOption (state: TabState) {
      return state.tabsOption
    },
  },
}
