import Cookies from 'js-cookie'   //同事安装@types/js-cookie模块

// User
const tokenKey = "vue_typescript_admin_access_token"
const getToken = () => Cookies.get(tokenKey)
const setToken = (token: string) => Cookies.set(tokenKey, token)
const removeToken = () => Cookies.remove(tokenKey)

// App
const sidebarStatusKey = "sidebar_status"
const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
const setSidebaStatus = (status: string) => Cookies.set(sidebarStatusKey, status)

export {
  getToken,
  setToken,
  removeToken,
  getSidebarStatus,
  setSidebaStatus,
}