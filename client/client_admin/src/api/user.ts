import request from '@/utils/request'

export const login = (data: any) =>
    request({
        url:'/user/public/login',
        method: 'post',
        data
    })


export const getUserByToken = () =>
    request({
        url:'/user/verify/userInfo',
        method: 'get',
    })


export const logout = () =>
    request({
        url:'/user/verify/logout',
        method: 'get',
    })


export const getSeachUser = (data:any) => 
  request({
    url:'/user/verify/userManage',
    method:'post',
    data
  })
export const getTeamInfo = () =>
request({
    url:'/user/verify/getTeamInfo',
    method:'get'
})