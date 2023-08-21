<template>
    <!-- <el-container> -->
        <!--侧边栏-->
        <!-- <el-aside width="200px" >
            <div id="menutop">
                后台管理
            </div>  
             <Sidebar></Sidebar> 
        </el-aside> -->
        <el-container>
            <el-header>
                <Hometop>
                    <Sidebar></Sidebar> 
                </Hometop>
            </el-header>
            <el-main>
                <Homeview></Homeview>
            </el-main>
        </el-container>
    <!-- </el-container> -->
</template>

<script lang="ts" setup>
    import Hometop from './components/Hometop.vue'
    import Homeview from './components/Homeview.vue'
    import Sidebar from './components/Sidebar.vue'
</script>

<style scoped lang="scss">
*{
    background-color: #1b1d1f;
}
    .el-header{
        // background-color: #2d3136;
        color: #fff;
        text-align: center;
        line-height: 60px;
        height: 70px;
    }
   

    // .el-aside {
    //     background-color: #D3DCE6;
    //     color: #333;
    //     text-align: center;
    //     height: 100vh;
    // }

    .el-main {
        // background-color: #E9EEF3;
        color: #fff;
        text-align: center;
        // border: 1px solid black;
    }
    

    // #menutop{
    //     width:200px;
    //     height: 50px;
    //     color: rgb(3, 3, 3);
    //     font-style: italic;
    //     line-height: 50px;
    //     font-size: 30px;
    // }
</style>