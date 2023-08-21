<template>
    <div class="container">
      <div class="top-select">
        <el-select v-model="value" class="m-2" placeholder="Select" size="large">
          <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          />
        </el-select>
        <div class="searchBar">   
          <el-form :inline="true" :model="searchGameForm" class="demo-form-inline">
              <el-form-item label="游戏名">
                  <el-input v-model="searchGameForm.gameName" clearable placeholder="游戏名" style="width: 100px;"/>
              </el-form-item>
              <el-form-item label="游戏类型">
                  <el-input v-model.number="searchGameForm.typeId" clearable placeholder="游戏类型" style="width: 100px;"/>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="onNewSearch" :loading="searching">查询</el-button>
              </el-form-item>
              <!-- <el-form-item>
                    <el-button type="success" @click="onAddType">新增</el-button> -->
                <!-- </el-form-item> -->
          </el-form>
        </div> 
      </div>
      <div>
        <el-table :data="tableData" stripe style="width: 100%" >
          <el-table-column prop="id" label="序号" />
          <el-table-column prop="gameName" label="游戏名" />
          <el-table-column prop="typeId" label="游戏类型" :formatter="typeIdFormatter" />
          <el-table-column prop="gameTitle" label="游戏简介" />
          <!-- <el-table-column prop="gameName" label="游戏名称" /> -->
          <!-- <el-table-column prop="team" label="团队名称" /> -->
          <el-table-column label="操作" width="300">
              <template #default="scope">
                  <el-button
                    type="primary"
                    style="margin-left: 16px"
                    size="small"
                    @click.prevent="onGameInfo(scope.row)"
                    >
                    查看详情
                    <!--  @click="drawer = true" v-model="drawer" @click="onAddType"-->
                  </el-button>
                  <!-- <el-drawer :visible.sync="drawer" title="游戏基本信息" size="30%" :before-close="handleClose" >
                    <div>
                      <el-button @click="innerDrawer = true">查看图片</el-button>
                      <el-drawer
                        v-model="innerDrawer"
                        title="游戏宣传图"
                        :append-to-body="true"                       
                      >
                        <p>_(:зゝ∠)_</p>
                      </el-drawer>
                    </div>
                  </el-drawer> -->
                  <!-- <el-button
                    @click.prevent="deleteRow(scope.row)"
                      v-if="scope.row.status == 1"
                      :loading="updateUserStatusLoading"
                      type="warning"
                      size="small"
                      @click.prevent="updateUserStatus(scope.row,0)"
                      >
                      禁用
                  </el-button> -->
                  <!-- <el-button 
                      v-if="scope.row.status == 0"
                      :loading="updateUserStatusLoading"
                      type="success"
                      size="small"
                      @click.prevent="updateUserStatus(scope.row,1)"
                      >
                      启用
                  </el-button>
                  <el-button 
                      v-if="scope.row.status == 1"
                      :loading="updateUserStatusLoading"
                      type="success"
                      size="small"
                      @click.prevent="defaultUserPassword(scope.row)"
                      >
                      重置密码
                  </el-button> -->
              </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="demo-pagination-block">
          <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :small=true
          :disabled=false
          :background=true
          layout="total, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          />
      </div> 
      <!-- <div class="game-list">
        <div class="game-list-item">
          <div class="game-item-image">
            <img src="" alt="">图片
          </div>
          <div class="game-item-desy">
            <div class="game-desy-left">
              <div class="game-left-name">艾尔登法环</div>
              <div class="game-left-team">团队名</div>
            </div>
            <div class="game-desy-right">
              <div class="game-right-button">查看详情</div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <!-- <getGameInfo :getGameInfoShow="getGameInfoShow" @closeGetGameInfo="closeGetGameInfo" @getGameInfoComplete="onSubmit"></getGameInfo> -->
    <getGameInfo :getGameInfoShow="getGameInfoShow" :id="id"  :drawer="drawer" @closeGetGameInfo="closeGetGameInfo" @GetGameInfoComplete="onSubmit"></getGameInfo>

</template>

<script lang="ts" setup>
import { onMounted, reactive,ref} from 'vue'
import { getSeachGamer, defaultGamerPassword, updateGamerStatus } from '@/api/gamer'
import { ElMessage,ElMessageBox,ElLoading } from 'element-plus'
import { UserStore } from '@/store/user'
import { getSeachGameInfo  } from '@/api/game'
import getGameInfo from './components/getGameInfo.vue'

  const pageSize = ref(10)
  const total = ref(0)
  const currentPage = ref(1)

  const tableData:any = ref([])

  interface paramsType {
    id: number | null,
    gameName:string,
    typeId: number | null,
    gameTitle:string,
    page:number,
    limit:number
  }
  const searchGameForm = reactive<paramsType>({
    id: null,
    gameName:'',
    typeId: null,
    gameTitle: '',
    page:currentPage.value,
    limit:pageSize.value
  })

  const userStore = UserStore();
  const username = userStore.username
  const searching = ref(false)
  const onNewSearch = ()=>{
    searchGameForm.page = 1;
    onSubmit()
  }
  const onSubmit = async() => {
      try {
          searching.value = true
          console.log(searchGameForm.page,'page')
          Reflect.set(searchGameForm,'username', username)
          const seachUsers:any =await getSeachGameInfo(searchGameForm);
          console.log(seachUsers.data,'seachUsers.data')
          console.log(seachUsers.data.pageCount, 'seachUsers.data.pageCount')
          tableData.value = seachUsers.data.list;
          total.value = seachUsers.data.pagination.total;
          searching.value = false
      } catch (error) {
          searching.value = false
          console.log(error);
          ElMessage.error("搜索用户信息失败失败！！！")
      }
  }

//查看详情
const drawer = ref(false)
const getGameInfoShow = ref(false)
const id = ref(0)

const onGameInfo = async(gameInfo:any)=>{
  try{
    console.log(gameInfo, 'gameInfo')
    id.value = gameInfo.id
    console.log(2333,id)
    getGameInfoShow.value = true ;
    // const games:any = gameInfo
    drawer.value = true
  }catch(error){
    console.log(error)
  }
}

const closeGetGameInfo = (v: boolean)=>{
  getGameInfoShow.value = false ;
}


  // const defaultUserPassword = async(userInfo:any)=>{
  //     ElMessageBox.confirm(
  //         '确定要重置 ' + userInfo.name +'  这个用户的密码吗?',
  //         '警告',
  //         {
  //         confirmButtonText: '重置',
  //         cancelButtonText: '取消',
  //         type: 'warning',
  //         }
  //     ).then(async() => {
  //         const loading = ElLoading.service({
  //             lock: true,
  //             text: 'Loading',
  //             background: 'rgba(0, 0, 0, 0.7)',
  //         })
  //         try {
  //             const defPassResult:any = await defaultGamerPassword(userInfo.id);
  //             ElMessage({
  //                         type: 'info',
  //                         message: defPassResult.message,
  //                     })
  //             loading.close()
  //         } catch (error) {
  //             loading.close()
  //             ElMessage({
  //                         type: 'warning',
  //                         message: '重置密码失败',
  //                     })
  //         }
         
  //     })
  // }

  // const deleteRow = async(userInfo:any) => {
  //     ElMessageBox.confirm(
  //         '确定要删除 ' + userInfo.username +'  这个用户吗?',
  //         '警告',
  //         {
  //         confirmButtonText: '确定删除',
  //         cancelButtonText: '取消',
  //         type: 'warning',
  //         }
  //     ).then(async() => {
  //         const loading = ElLoading.service({
  //             lock: true,
  //             text: 'Loading',
  //             background: 'rgba(0, 0, 0, 0.7)',
  //         })
  //         try {
  //             const deleteResult:any = null
  //             console.log(deleteResult)
  //             if(deleteResult.success){
  //                 ElMessage({
  //                     type: 'info',
  //                     message: deleteResult.info.msg,
  //                 })
  //             }else{
  //                 ElMessage({
  //                     type: 'warning',
  //                     message: deleteResult.info.msg,
  //                 })
  //             }
  //             loading.close()
  //             onSubmit()
  //         } catch (error) {
  //             console.log(error)
  //             loading.close()
  //         }
  //     }).catch((error) => {
  //         console.log(error)
  //     })
  // }

  // const updateUserStatusLoading = ref(false);
  // const updateUserStatus = async(userInfo:any,status:number)=>{
  //     updateUserStatusLoading.value = true;
  //     try {
  //         const upodateReslt:any = await updateGamerStatus({
  //             id:userInfo.id,
  //             status:status
  //         })
  //         updateUserStatusLoading.value = false;
  //         console.log("upodateReslt",upodateReslt)
  //         ElMessage({
  //                     type: 'info',
  //                     message: upodateReslt.message,
  //                 })
  //         onSubmit();
  //     } catch (error) {
  //         updateUserStatusLoading.value = false;
  //         ElMessage({
  //                         type: 'warning',
  //                         message: '修改用户可/禁用状态失败',
  //                     })
  //     }
      
  // }

  const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`) 
      onSubmit();
  }
  const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
      searchGameForm.page = val
      onSubmit();
  }

  const typeIdFormatter=(row:any)=>{
      if(row.typeId == 1){
          return "单机游戏"
      }else if(row.typeId == 2){
          return "网络游戏"
      }else if(row.typeId == 3){
          return "小游戏"
      }else if(row.typeId == 4){
          return "网页游戏"
      }
      return ""
  }
  

//筛选框
const value = ref('')

const options = [
  {
    value: '已审核',
    label: '已审核',
  },
  {
    value: '未审核',
    label: '未审核',
  }
]
</script>
  <style scoped>
  .container{
  border: 1px solid silver;
  /* position: absolute; */
  }
 .top-select{
  float: left;
  margin: 8px;
  display: flex;
  /* border: 1px solid silver; */
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  /* width: 100%; */
 }
 .searchBar{
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left:40px;
  /* text-align: left; */
 }
 .game-list{
  border: 1px solid black;
  margin-top: 8%;
  padding: 8px;
  height: 500px;
 }
 .game-list-item{
  border: 1px solid black;
  display: flex;
 }
 .game-item-image{
  border: 1px solid black;
  float: left;
  width: 150px;
  height: 100px;
 }
 /* .main-comments{
   border: 1px solid silver; 
  margin: 5px;
  padding: 5px;
 }
 .comment-item{
    border: 1px solid silver;
    height: 150px;
    width: 90%;
    margin: 3px;
    padding: 3px;
    display: flex;
  }
  .comment-item-left{
    border: 1px solid silver;
    height: 90px;
    border: 1px solid black; 
     width: 88%; 
     margin: 5px; 
     height:65px;
  }
  .comment-left-content{
    border: 1px solid black;
    color: rgb(102, 100, 100);
    display: flex;
    font-size: 16px;
    height: 50px;
  }
  .comment-left-date{
    color: #a0a0a0;
    display: flex;
  }
  .comment-item-right{
    border: 1px solid black;
    width: 20%;
    height: 70px;
    margin-right: -100px;
  }
  .comment-right-button{
    margin-top: 10px;
    
  } */
  </style>