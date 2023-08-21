import request from '@/utils/request'

export const getSeachGamer = (data:any) => 
  request({
    url:'/gamerManage',
    method:'post',
    data
  })

export const defaultGamerPassword = (id:number) =>
  request({
    url: `/defGamerPassword?id=${id}`,
    method: 'get'
  })

export const updateGamerStatus = (data:any) => 
  request({
    url:'/updateGamerStatus',
    method:'post',
    data
  })