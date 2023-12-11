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

  export const getPictureListById = (id: Number) =>
  request({
    url: `/game/getPictureListById?id=${id}`,
    method: 'get'
  })

  export const getImageNameById = (id: Number) =>
  request({
    url: `/game/getImageNameById?id=${id}`,
    method: 'get'
  })

  export const getFileNameByGameId = (gameId: Number) =>
  request({
    url: `/game/getFileNameByGameId?gameId=${gameId}`,
    method: 'get'
  })

  export const updateCheck = (data:any)=>
  request({
    url:`/game/updateCheck`,
    method:'put',
    data
  })

  export const addRejectInfo = (data:any)=>
  request({
    url:`/game/addRejectInfo`,
    method:'post',
    data
  })


  


