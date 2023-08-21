import router from './router'
import {RouteLocationNormalized} from 'vue-router'
// import { AdminStore } from './store/admin';
import { UserStore } from './store/user';
import { PermissionStore } from './store/permission';
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login','/register']
//路由添加状态
// let addRouteState:boolean = false;

router.beforeEach(async(to:RouteLocationNormalized, _:RouteLocationNormalized,next:any)=>{
    //进度条
    // const adminStore = AdminStore();
    const userStore = UserStore();
    const permissionStore = PermissionStore();
    NProgress.start()
    if(userStore.token){
        console.log(to.path, 'to path')
        if(to.path === '/login'){
            next({path:'/'})
            NProgress.done()
        }else{
            //动态路由，路由匹配速度会快于动态添加，
            //所以在刷新页面时需要判断一下router对象是否执行了添加新路由的操作
            if(permissionStore.addRouteState){
                next();
            }else{
                try {
                   await userStore.getUserInfo()
                   const roleLevel = userStore.roleId
                   if(roleLevel){
                    permissionStore.generateRoutes(roleLevel)
                    // console.log(PermissionModule.dynamicRoutes)
                    permissionStore.dynamicRoutes.forEach(route => {
                        router.addRoute(route)
                    })
                   }
                } catch (error) {
                    userStore.resetToken()
                    ElMessage.error("路由信息加载失败！！！")
                    next('/login')
                    NProgress.done()
                }
                permissionStore.setAddRoutesState(true);
                next({ ...to, replace: true })
            }   
            NProgress.done()
        }
    }else{
        if(whiteList.indexOf(to.path) !== -1){
            next()
        }else{
            next({path:'/login'})
        }
        NProgress.done()
    }
})