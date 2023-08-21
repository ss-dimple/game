import request from '@/utils/request'

export const getTypeManage = (data: any) =>
  request({
    url: '/game/TypeManage',
    method: 'post',
    data
  })

export const addType = (data:any)=>
  request({
    url:`/game/addType`,
    method:'post',
    data
  })

  export const updateType = (data:any)=>
  request({
    url:`/game/updateType`,
    method:'put',
    data
  })

export const deleteType = (id: Number) =>
  request({
    url:`/game/deleteType?id=${id}`,
    method:'delete'
  })

  export const getSeachGameInfo = (data:any) => 
  request({
    url:'/game/getSeachGameInfo',
    method:'post',
    data
  })
  export const getGameInfoById = (id: Number) =>
  request({
    url: `/game/getGameInfoById?id=${id}`,
    method: 'get'
  })
  export const getImageListById = (id: Number) =>
  request({
    url: `/game/getImageListById?id=${id}`,
    method: 'get'
  })
  export const updateConditionById = (id:Number)=>
  request({
    url:`/game/updateConditionById?id=${id}`,
    method:'put',
  })
  


