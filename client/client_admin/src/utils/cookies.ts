import Cookies from 'js-cookie'

//User
const tokenKey = 'my_vue_typescript_admin_access_token'
const activeMenu = 'my_vue_typescript_admin_menu'

export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)

export const getCookieActiveMenu = () => Cookies.get(activeMenu)
export const setCookieActiveMenu = (menuName: string) => Cookies.set(activeMenu, menuName)
export const removeCookieActiveMenu = () => Cookies.remove(activeMenu)