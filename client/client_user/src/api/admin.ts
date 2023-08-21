import request from '@/utils/request'

export const login = (data: any) =>
  request({
    url: '/admin/login',
    method: 'post',
    data
  })

export const getUserByToken = () =>
  request({
    url: "/admin/adminInfo",
    method: 'get'
  })

export const logout = () =>
  request({
    url: "/logout",
    method: 'get'
  })

export const getSeachAdmin = (data:any) => 
  request({
    url:'/adminManage',
    method:'post',
    data
  })

export const updateAdminStatus = (data:any) => 
  request({
    url:'/verify/updateAdminStatus',
    method:'post',
    data
  })

export const addAdmin = (data:any) => 
  request({
    url:'/verify/setAdmin',
    method:'post',
    data
  })

export const editAdmin = (data:any)=>
  request({
    url:`/verify/setAdmin`,
    method:'put',
    data
  })

export const defaultAdminPassword = (id:number) =>
  request({
    url: `/verify/defAdminPassword?id=${id}`,
    method: 'get'
  })

export const updateAdminSelf = (data:any) =>
  request({
    url: `/verify/setAdminSelf`,
    method: 'post',
    data
  })

export const resetAdminPassword = (data:any) =>
  request({
    url: `/verify/setAdminSelfPassword`,
    method: 'post',
    data
  })



  