<template>
    <el-container>
        <!--侧边栏-->
        <el-aside width="200px">
            <div id="menutop">
                后台管理
            </div>  
            <Sidebar></Sidebar>
        </el-aside>
        <el-container>
            <el-header>
                <Hometop></Hometop>
            </el-header>
            <el-main>
                <Homeview></Homeview>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
    import Hometop from './components/Hometop.vue'
    import Homeview from './components/Homeview.vue'
    import Sidebar from './components/Sidebar.vue'
</script>

<style scoped lang="scss">

    .el-header{
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        height: 100vh;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }

    #menutop{
        height: 50px;
        color: red;
        font-style: italic;
        line-height: 50px;
        font-size: 30px;
    }
</style>