import request from '@/utils/request'

export const login = (data: any) =>
  request({
    url: '/admin/public/login',
    method: 'post',
    data
  })

export const getUserByToken = () =>
  request({
    url: '/admin/verify/adminInfo',
    method: 'get'
  })

export const logout = () =>
  request({
    url: '/admin/logout',
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
    url:'/updateAdminStatus',
    method:'post',
    data
  })

export const addAdmin = (data:any) => 
  request({
    url:'/setAdmin',
    method:'post',
    data
  })

export const editAdmin = (data:any)=>
  request({
    url:`/setAdmin`,
    method:'put',
    data
  })

export const defaultAdminPassword = (id:number) =>
  request({
    url: `/defAdminPassword?id=${id}`,
    method: 'get'
  })

export const updateAdminSelf = (data:any) =>
  request({
    url: `/setAdminSelf`,
    method: 'post',
    data
  })

export const resetAdminPassword = (data:any) =>
  request({
    url: `/setAdminSelfPassword`,
    method: 'post',
    data
  })



  