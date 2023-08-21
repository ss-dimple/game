import { defineStore } from 'pinia';
import {RouteRecordRaw} from 'vue-router';
import {asyncRoutes} from '@/router';
import { getCookieActiveMenu } from '../utils/cookies';

const hasPermission = (roleLevel:number, route: RouteRecordRaw) => {
    if (route.meta && route.meta.roleLevels) {
        const routeRoleLevels:any = route.meta.roleLevels;
        if(routeRoleLevels.indexOf(roleLevel) != -1){
            return true;
        }
        return false;
    } else {
      return true
    }
  }

export const filterAsyncRoutes = (routes: RouteRecordRaw[], roleLevel:number) => {
    const res: RouteRecordRaw[] = []
    routes.forEach(route => {
      const r = { ...route }
      if (hasPermission(roleLevel, r)) {
        if (r.children) {
          r.children = filterAsyncRoutes(r.children, roleLevel)
        }
        res.push(r)
      }
    })
    return res
}


export const PermissionStore = defineStore('permisson',{
    state:() => {
        return {
            dynamicRoutes:[] as RouteRecordRaw[],
            addRouteState:false,
            menuPath:getCookieActiveMenu()||''
        }
    },
    actions:{
        generateRoutes(roleLevel: number) {
            let accessedRoutes
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roleLevel)
            this.dynamicRoutes = accessedRoutes;
        },
        setAddRoutesState(stateValue: boolean) {
            this.addRouteState = stateValue;
        }
    }
})