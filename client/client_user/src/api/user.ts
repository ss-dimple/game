import request from '@/utils/request'

export const login = (data: any) =>
  request({
    url: '/user/public/login',
    method: 'post',
    data
  })

export const getEmailCode = (data: any) =>
  request({
    url: '/user/public/getEmailCode',
    method:'post',
    data
  })
  
  export const register = (data: any) =>
  request({
    url: '/user/public/register',
    method:'post',
    data
  })

  export const getUserByToken = () =>
  request({
    url: "/user/verify/userInfo",
    method: 'get'
  })

  export const logout = () =>
  request({
    url: "/user/verify/logout",
    method: 'get'
  })

  export const teamSubmit = (data: any) =>
  request({
    url: '/user/verify/teamSubmit',
    method:'post',
    data
  })

  export const getTeachers = () =>
  request({
    url: "/user/verify/getTeachers",
    method: 'get'
  })

  export const getTeamInfoByUserno = (userno: Number) =>
  request({
    url: `/user/verify/getTeamInfoByUserno?userno=${userno}`,
    method: 'get'
  })
  export const getGameInfoInfoByUsername = (username: string) =>
  request({
    url: `/user/verify/getGameInfoInfoByUsername?username=${username}`,
    method: 'get'
  })
  
  export const getTeamInfo = () =>
  request({
    url: "/user/verify/getTeamInfo",
    method: 'get'
  })
  export const reduceIntegral = (data: any) =>
  request({
    url: '/user/verify/reduceIntegral',
    method:'post',
    data
  })