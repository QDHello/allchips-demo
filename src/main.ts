import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUI from "element-ui"
import SvgIcon from 'vue-svgicon'

import 'normalize.css'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import '@/icons/components'
// 权限验证
import '@/permission'

Vue.config.productionTip = false
Vue.use(elementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
