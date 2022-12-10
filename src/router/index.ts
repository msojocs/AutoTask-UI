/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as VueRouter from 'vue-router'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import { store } from '@/store/store'
import layout from '@/layout/index.vue'
import type { TabData } from '@/store/module/tabs/types'
// 1. 定义路由组件.
// 也可以从其他文件导入

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
// 基础路由
export const constantRoutes = [
  {
    path: '/',
    component: layout,
    redirect: '/home',
    meta: {
      title: {
        zhCn: '首页',
        en: 'Home',
        zhTw: '首页',
      },
      icon: 'House',
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: async () => await import('@/views/Home/index.vue'),
        meta: {
          title: {
            zhCn: '首页',
            en: 'Home',
            zhTw: '首页',
          },
          icon: 'House',
        },
      },
    ],
  },
  {
    path: '/changepass',
    redirect: '/user/changepass',
    component: layout,
    meta: {
      title: {
        'zhC-cn': '修改密码',
        'en': 'Change Pass',
        'zhTw': '修改密码',
      },
      icon: 'Timer',
      hidden: true,
    },
    children: [
      {
        path: '/user/changepass',
        name: 'changepass',
        component: async () => await import('@/views/User/Changepass.vue'),
        meta: {
          title: {
            zhCn: '修改密码',
            en: 'Change Pass',
            zhTw: '修改密码',
          },
          icon: 'Timer',
          hidden: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: async () => await import('@/views/User/Login.vue'),
    meta: {
      title: {
        zhCn: '登录',
        en: 'Login',
        zhTw: '登录',
      },
      icon: 'Timer',
      hidden: true,
    },
  },
  {
    path: '/manage',
    redirect: '/manage/job',
    component: layout,
    meta: {
      title: {
        zhCn: '管理',
        en: 'Manage',
        zhTw: '管理',
      },
      icon: 'Timer',
      hidden: false,
    },
    children: [
      {
        path: '/manage/job',
        name: 'job-manage',
        component: async () => await import('@/views/Manage/Job.vue'),
        meta: {
          title: {
            zhCn: '任务管理',
            en: 'Job Manage',
            zhTw: '任务管理',
          },
          hidden: false,
        },
        props: true,
      },
      {
        path: '/manage/request',
        name: 'request-manage',
        component: async () => await import('@/views/Manage/Request.vue'),
        meta: {
          title: {
            zhCn: '请求管理',
            en: 'Request Manage',
            zhTw: '请求管理',
          },
          hidden: false,
        },
        props: true,
      },
      {
        path: '/manage/requestEdit',
        name: 'request-edit',
        component: async () => await import('@/views/Manage/components/ReqForm.vue'),
        meta: {
          title: {
            zhCn: '请求编辑器',
            en: 'Request Editor',
            zhTw: '请求编辑器',
          },
          hidden: false,
        },
        props: true,
      },
    ],
  },
  // {
  //   path: '/:catchAll(.*)',
  //   name: 'NotFound',
  //   component: () => import('@/views/NotFound/NotFound.vue'),
  //   meta: {
  //     title: '404',
  //     icon: 'Timer',
  //     hidden: true
  //   },
  // },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes: constantRoutes, // `routes: routes` 的缩写
  strict: true,
})

export const Type2View: Record<string, any> = {
  NotFound: [async () => await import('@/views/NotFound/NotFound.vue'), true],
}

const addRoute = (menuList: RouteRecordRaw[], father: RouteRecordName | null = null) => {
  for (const menu of menuList) {
    const type: string = menu.meta?.type as string
    const view = Type2View[type]
    const route = {
      path: menu.path,
      name: menu.name,
      meta: menu?.meta ?? {},
      props: menu.props,
      strict: true,
      component: view ? view[0] : Type2View.NotFound[0],
    }
    route.meta.isKeepAlive = view ? view[1] : false
    // 根菜单用layout
    if (father == null)
      route.component = layout
    if (father)
      router.addRoute(father, route)

    else
      router.addRoute(route)

    if (menu.children != null)
      addRoute(menu.children, menu.name)
  }
}

let needRefreshRoute = true
// 定义全局前置守卫（里面有两个坑要注意）
router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)

  // 通过自定义方法获取用户 token 用来判断用户登录状态
  const token = store.getters['user/token']
  // console.log(token)
  if (token) {
    // 有token，已登录
    console.log('有token，已登录')
    if (needRefreshRoute) {
      // refresh route
      console.log('refresh route')
      const menu = store.getters['user/menu']
      addRoute(menu)
      needRefreshRoute = false
      // fix: 刷新出现404
      next({
        ...to,
        replace: true,
      })
    }
    else {
      const newTab: TabData = {
        title: to.meta?.title as Record<string, string>,
        name: to.fullPath,
        route: to.fullPath,
      }
      // 检查tab是否已存在
      const tabs: TabData[] = store.getters['tabs/getTabsOption']
      const tabIndex = tabs.findIndex(e => e.name === newTab.name)
      if (tabIndex === -1) {
        // 加入tab
        store.commit('tabs/ADD_TAB', newTab)
      }
      store.commit('tabs/SET_TAB', newTab.name)
      next()
    }
  }
  else {
    // 没有token，未登录
    console.log('没有token，未登录')
    needRefreshRoute = true
    if (to.name !== 'login')
      next({ name: 'login' })

    else
      next()
  }
})

export default router
