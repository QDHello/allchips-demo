import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/',
    name: 'index',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard"  */ '@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    meta: {
      title: 'Example',
      icon: 'example'
    },
    redirect: '/example/tree',
    children: [
      {
        path: 'tree',
        name: 'tree',
        component: () => import(/* webpackChunkName: "Tree" */ '@/views/tree/index.vue'),
        meta: {
          title: '树',
          icon: 'tree'
        }
      },
      {
        path: 'table',
        name: 'table',
        component: () => import(/* webpackChunkName: "Table" */ '@/views/table/index.vue'),
        meta: {
          title: '表格',
          icon: 'table'
        }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    meta: { title: '文章' },
    redirect: '/article',
    children: [
      {
        path: '/article',
        name: 'article',
        component: () => import(/* webpackChunkName: "Form" */ '@/views/form/index.vue'),
        meta: {
          title: '表单',
          icon: 'form'
        }
      }
    ]
  },
  {
    path: '/nest',
    component: Layout,
    redirect: '/nest/menu1',
    meta: {
      title: 'Nest',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        redirect: '/nest/menu1/menu1-1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            name: 'menu1-1',
            component: () => import(/* webpackChunkName: "menu1-1"  */ '@/views/nest/menu1/menu1-1/index.vue'),
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            name: 'menu1-2',
            component: () => import(/* webpackChunkName: "menu1-2"  */ '@/views/nest/menu1/menu1-2/index.vue'),
            meta: { title: 'menu1-2' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'menu2',
        component: () => import(/* webpackChunkName: "menu2" */ '@/views/nest/menu2/index.vue'),
        meta: { title: 'menu2' }
      },
    ]
  }
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any) {
  return originalPush.call(this, location).catch((err: any) => err)
}

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes
})

export default router
