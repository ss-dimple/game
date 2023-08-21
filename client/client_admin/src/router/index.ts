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
    path:'/',
    component:Layout,
    redirect:'/home',
    children:[
      {
        path:'home',
        component:()=>import('@/views/welcome/index.vue'),
        meta:{
          alwaysShow:false
        }
      }
    ]
  },
  {
    path: '/404',
    component:error404,
    meta: { hidden: true }
  },
]


export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path:'/user',
    component:shallowRef(Layout),
    redirect:'/user/manage',
    meta:{
      title:'用户管理',
      icon:'UserFilled',
      roleLevels:[2],
      alwaysShow:true,
      haveSubs:false
    },
    children:[
      {
        path:'manage',
        component:()=>import('@/views/user-manage/index.vue'),
        meta:{
          title:'用户管理',
          icon:'UserFilled',
          roleLevels:[2],
          alwaysShow:true
        }
      }
    ]
  },
  {
    path:'/gamer',
    component:shallowRef(Layout),
    redirect:'/gamer/manage',
    meta:{
      title:'团队管理',
      icon:'user',
      roleLevels:[2],
      alwaysShow:true,
      haveSubs:false
    },
    children:[
      {
        path:'manage',
        component:()=>import('@/views/gamer-manage/index.vue'),
        meta:{
          title:'团队管理',
          icon:'user',
          roleLevels:[2],
          alwaysShow:true
        }
      }
    ]
  },
  {
    path:'/gameInfo',
    component:shallowRef(Layout),
    redirect:'/gameInfo/manage',
    meta:{
      title:'游戏基础信息管理',
      icon:'SetUp',
      roleLevels:[2],
      alwaysShow:true,
      haveSubs:true
    },
    children:[
      {
        path:'typeManage',
        component:()=>import('@/views/type-manage/index.vue'),
        meta:{
          title:'游戏类别管理',
          icon:'SetUp',
          roleLevels:[2],
          alwaysShow:true
        }
      },
      {
        path:'tagManage',
        component:()=>import('@/views/tag-manage/index.vue'),
        meta:{
          title:'游戏标签管理',
          icon:'SetUp',
          roleLevels:[2],
          alwaysShow:true
        }
      },
      {
        path:'commentManage',
        component:()=>import('@/views/comment-manage/index.vue'),
        meta:{
          title:'游戏评论管理',
          icon:'SetUp',
          roleLevels:[2],
          alwaysShow:true
        }
      },
      // {
      //   path:'templateManage',
      //   component:()=>import('@/views/template-manage/index.vue'),
      //   meta:{
      //     title:'游戏模板管理',
      //     icon:'SetUp',
      //     roleLevels:[1],
      //     alwaysShow:true
      //   }
      // },
    ]
  },
  {
    path:'/games',
    component:shallowRef(Layout),
    redirect:'/games/manage',
    meta:{
      title:'游戏作品管理(管理员)',
      icon:'List',
      roleLevels:[2],
      alwaysShow:true,
      haveSubs:false
    },
    children:[
      {
        path:'manage',
        component:()=>import('@/views/all-games-manage/index.vue'),
        meta:{
          title:'游戏作品管理(管理员)',
          icon:'List',
          roleLevels:[2],
          alwaysShow:true
        }
      }
    ]
  },
  {
    path:'/directorInfo',
    component:shallowRef(Layout),
    redirect:'/directorInfo/groupManage',
    meta:{
      title:'导师信息管理',
      icon:'Guide',
      roleLevels:[1],
      alwaysShow:true,
      haveSubs:true
    },
    children:[
      {
        path:'groupManage',
        component:()=>import('@/views/role-manage/index.vue'),
        meta:{
          title:'分组管理',
          icon:'Guide',
          roleLevels:[1],
          alwaysShow:true
        }
      },
      {
        path:'gamesManage',
        component:()=>import('@/views/template-manage/index.vue'),
        meta:{
          title:'游戏管理(导师)',
          icon:'Guide',
          roleLevels:[1],
          alwaysShow:true
        }
      },
    ]
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    meta: { alwaysShow: false }
  }
]

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
