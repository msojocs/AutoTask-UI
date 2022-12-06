/*
 * @Author: msojocs jiyecafe@gmail.com
 * @Date: 2022-09-14 13:42:48
 * @LastEditors: msojocs jiyecafe@gmail.com
 * @LastEditTime: 2022-11-07 14:19:18
 * @FilePath: \webv2\src\main.ts
 * @Description: ""
 * Copyright (c) 2022 by msojocs email: jiyecafe@gmail.com, All Rights Reserved.
 */
import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { Locale, Path } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import 'element-plus/dist/index.css'
import { key, store } from './store/store'
import router from './router'
import messages from './locales'

const app = createApp(App)
const i18n = createI18n({
  // something vue-i18n options here ...
  legacy: false,
  locale: 'zhCn',
  fallbackLocale: 'en',
  messages,
  missing: (locale: Locale, key: Path) => {
    console.log(locale, key)
    const t = key.split('.')
    console.log(t)
    return t[t.length - 1]
  },
})
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

app.use(store, key)
  .use(router)
  .use(ElementPlus)
  .use(i18n)
  .mount('#app')
