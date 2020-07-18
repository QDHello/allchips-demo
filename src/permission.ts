import router from './router'
import NProgress from 'nprogress'
import "nprogress/nprogress.css"
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
// NProgress页面最上面的进度条
NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to: Route, from: Route, next: any) => {
  NProgress.start()
  if (UserModule.token) {
    if (to.path == "/login") {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断是否包含管理员角色
      if (UserModule.roles.length == 0) {
        try {
          await UserModule.GetUserInfo()
          // 不留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 清空token，重新登录
          UserModule.ResetToken()
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 重定向至登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: Route) => {
  NProgress.done()
  document.title = to.meta.title
})