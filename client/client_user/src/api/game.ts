import request from '@/utils/request'

export const getTagList = () =>
  request({
    url: "/game/tagList",
    method: 'get'
  })

  export const getBestList = () =>
  request({
    url: "/game/bestList",
    method: 'get'
  })

  export const getTypeList = () =>
  request({
    url: "/game/typeList",
    method: 'get'
  })

  export const getType1GameInfo = () =>
  request({
    url: "/game/getType1GameInfo",
    method: 'get'
  })

  export const getType2GameInfo = () =>
  request({
    url: "/game/getType2GameInfo",
    method: 'get'
  })

  export const getType3GameInfo = () =>
  request({
    url: "/game/getType3GameInfo",
    method: 'get'
  })

  export const getType4GameInfo = () =>
  request({
    url: "/game/getType4GameInfo",
    method: 'get'
  })
  
  export const submitGame = (data: any) =>
  request({
    url: '/game/submitGame',
    method:'post',
    data
  })

  export const getGameInfoById = (id: Number) =>
  request({
    url: `/game/getGameInfoById?id=${id}`,
    method: 'get'
  })

  export const getCommentInfoById = (id: Number) =>
  request({
    url: `/game/getCommentInfoById?id=${id}`,
    method: 'get'
  })
  
  export const getGameDescByGameName = (gameName: string) =>
  request({
    url: `/game/getGameDescByGameName?gameName=${gameName}`,
    method: 'get'
  })

  export const commentSubmit = (data: any) =>
  request({
    url: '/game/commentSubmit',
    method:'post',
    data
  })

  export const getFileNameByGameId = (gameId: Number) =>
  request({
    url: `/game/getFileNameByGameId?gameId=${gameId}`,
    method: 'get'
  })

  export const getImageListById = (id: Number) =>
  request({
    url: `/game/getImageListById?id=${id}`,
    method: 'get'
  })
  export const addGameAvg = (data: any) =>
  request({
    url: '/game/addGameAvg',
    method: 'put',
    data
  })

