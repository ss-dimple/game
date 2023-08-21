import { createRouter, createWebHashHistory,RouteRecordRaw} from 'vue-router'
import Layout from '@/Layout/index.vue'
import error404 from '@/views/error-page/404.vue'
import { shallowRef } from 'vue'

//静态路由，不区分权限
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/search',
    component: () => import('@/views/search/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/game/:id',
    component: () => import('@/views/game/index.vue'),
    meta: { hidden: true }
  },
  // {
  //   path:'/game',
  //   component:shallowRef(Layout),//引入通用路由
  //   redirect:'/game',
  //   meta:{
  //     title:'',
  //     roleLevels:[1],
  //     alwaysShow:true,
  //     haveSubs:false
  //   },
  //   children:[
  //     {
  //       path:'game',
  //       component:()=>import('@/views/game/index.vue'),
  //       meta:{
  //         title:'游戏详情页',
  //         // icon:'UserFilled',
  //         roleLevels:[1],
  //         alwaysShow:true
  //       }
  //     }
  //   ]
  // },
  
  // {
  //   path: '/404',
  //   component:error404,
  //   meta: { hidden: true }
  // },
]


export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path:'/',
    component:shallowRef(Layout),//引入通用路由
    redirect:'/home',
    meta:{
      title:'首页',
      roleLevels:[1],
      alwaysShow:true,
      haveSubs:false
    },
    children:[
      {
        path:'home',
        component:()=>import('@/views/home/index.vue'),
        meta:{
          title:'首页',
          // icon:'UserFilled',
          roleLevels:[1],
          alwaysShow:true
        }
      }
    ]
  },
  {
    path:'/mine',
    component:shallowRef(Layout),
    redirect:'/mine/manage',
    meta:{
      // title:'我的',
      icon:'Avatar',
      roleLevels:[1],
      alwaysShow:true,
      haveSubs:true
    },
    children:[
      {
        path:'manage',
        component:()=>import('@/views/mine-manage/index.vue'),
        meta:{
          title:'我的',
          // icon:'SetUp',
          roleLevels:[1],
          alwaysShow:true
        }
      },
      {
        path:'upload',
        component:()=>import('@/views/mine-upload/index.vue'),
        meta:{
          title:'我的上传',
          // icon:'SetUp',
          roleLevels:[1],
          alwaysShow:true
        }
      },
      {
        path:'login',
        component:()=>import('@/views/login/index.vue'),
        meta:{
          title:'退出登录',
          // icon:'SetUp',
          roleLevels:[1],
          alwaysShow:true
        }
      },
      // {
      //   path:'download',
      //   component:()=>import('@/views/mine-download/index.vue'),
      //   meta:{
      //     title:'我的下载',
      //     // icon:'SetUp',
      //     roleLevels:[1],
      //     alwaysShow:true
      //   }
      // },
      // {
      //   path:'manage',
      //   component:()=>import('@/views/mine-manage/index.vue'),
      //   meta:{
      //     title:'个人信息',
      //     // icon:'SetUp',
      //     roleLevels:[1],
      //     alwaysShow:true
      //   }
      // }
    ]
  },
  {
    path: '/404',
    component:error404,
    meta: { hidden: true }
  },

]
// export const pushRoutes: Array<RouteRecordRaw> = [
//   {
//     path:'/game',
//     component:shallowRef(Layout),//引入通用路由
//     redirect:'/game/detail/:id/',
//     meta:{
//       // title:'首页',
//       roleLevels:[1],
//       alwaysShow:true,
//       haveSubs:false
//     },
//     children:[
//       {
//         path:'detail/:id/',
//         component:()=>import('@/views/game/index.vue'),
//         meta:{
//           title:'游戏详情页',
//           // icon:'UserFilled',
//           roleLevels:[1],
//           alwaysShow:true
//         }
//       }
//     ]
//   },
// ]

//静态路由
const router = createRouter({
  history: createWebHashHistory(),
  routes:constantRoutes
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  console.log("重置路由")
  let newRoutes:RouteRecordRaw[]=[]
  const newRouter = createRouter({history: createWebHashHistory(),routes:newRoutes});
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
