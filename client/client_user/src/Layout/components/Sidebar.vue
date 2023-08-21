<template>
        <el-menu  
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
        >
            <div v-for="(item,index) in asyncRoutes">
                <div v-if="item.meta.alwaysShow">
                    <el-sub-menu v-if="item.meta.haveSubs" :index="index+1 +''">
                        <template #title>
                            <el-icon>
                                <component :is="item.meta.icon"/>
                            </el-icon>
                            <span>{{item.meta.title}}</span>
                        </template>
                        <el-menu-item-group  v-if="item.meta.haveSubs">
                            <el-menu-item  
                            v-for="(subItem,subIndex) in item.children" 
                            :index="index+1+'-'+subIndex+1"
                            @click="linkTo(item.path,subItem.path,item.meta.title,subItem.meta.title)">
                                {{subItem.meta.title}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-menu-item :index="index+1+''" 
                    v-if="!item.meta.haveSubs"
                    @click="linkTo(item.path,'',item.meta.title,'')"
                    >
                        <el-icon>
                            <component :is="item.meta.icon"/>
                        </el-icon>
                        <span>{{item.meta.title}}</span>
                    </el-menu-item>
                </div>
                
            </div>
        </el-menu>
    
</template>

<script lang="ts" setup>
    import {useRouter} from 'vue-router'
    import { PermissionStore } from '@/store/permission'
    import {computed} from 'vue'
    import { setCookieActiveMenu } from '../../utils/cookies';

    const permissionStore = PermissionStore();
    const handleOpen = (key: string, keyPath: string[]) => {
        // console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
        // console.log(key, keyPath)
    }

    const asyncRoutes = computed(()=>{
        return permissionStore.dynamicRoutes
    })

    const router = useRouter();
    const linkTo = (fRoute:string,sRoute:string,fRouteTitle:string,sRouteTitle:string)=>{
        if(sRoute){
            router.push({path:fRoute+"/"+sRoute})
        }else{
            router.push({path:fRoute})
        }
        let menuPath:string = fRouteTitle;
        if(sRouteTitle){
            menuPath += ' \/ ';
            menuPath += sRouteTitle;
        }
        
        // console.log(menuPath);
        setCookieActiveMenu(menuPath);
        permissionStore.menuPath = menuPath;
    }
</script>

<style scoped lang="scss" >
    .el-menu{
        // height: 100%;
        background-color: #D3DCE6;
    }
</style>