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
      </div>
      <!-- <div class="main-comments">
        <el-card shadow="hover" class="comment-item">
          <el-row :gutter="20">
            <el-col :span="18">
              <div class="comment-item-left">
                <div class="comment-left-content">
                  <span>就是我买了这个游戏但它没自动给我下载，我以为它会自动下载的，然后我不知道该怎么整了，谁能跟我说一下？怎么才能玩？</span>
                </div>
                <div class="comment-left-date">
                  <span>用户姓名</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="comment-item-right">
                <div class="comment-right-button">
                  <el-button  text size="large" >
                    去详情<el-icon class="el-icon--right"><DArrowRight /></el-icon>
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
       </el-card>
      </div> -->
      <div>
        <el-table :data="tableData" stripe style="width: 100%" >
          <el-table-column prop="name" label="用户名" />
          <el-table-column prop="comment" label="评论" />
          <el-table-column prop="gameName" label="游戏名称" />
          <el-table-column prop="team" label="团队名称" />
          <el-table-column label="操作" width="300">
              <template #default="scope">
                  <el-button
                      type="danger"
                      size="small"
                      @click.prevent="deleteRow(scope.row)"
                      >
                      删除
                  </el-button>
                  <el-button
                      v-if="scope.row.status == 1"
                      :loading="updateUserStatusLoading"
                      type="warning"
                      size="small"
                      @click.prevent="updateUserStatus(scope.row,0)"
                      >
                      禁用
                  </el-button>
                  <el-button 
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
                  </el-button>
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
      
    </div>
</template>

<script lang="ts" setup>
import { reactive,ref} from 'vue'
  import { getSeachGamer, defaultGamerPassword, updateGamerStatus } from '@/api/gamer'
  import { ElMessage,ElMessageBox,ElLoading } from 'element-plus'

  const pageSize = ref(10)
  const total = ref(0)
  const currentPage = ref(1)

  const tableData:any = ref([])

  interface paramsType {
    name:string,
    comment:string,
    gameName:string,
    team:string,
      page:number,
      limit:number
  }
  const searchUserForm = reactive<paramsType>({
    name:'',
    comment:'',
    gameName:'',
    team:'',
    page:currentPage.value,
    limit:pageSize.value
  })
  const searching = ref(false)
  const onNewSearch = ()=>{
      searchUserForm.page = 1;
      onSubmit()
  }
  const onSubmit = async() => {
      try {
          searching.value = true
          const seachUsers:any =await getSeachGamer(searchUserForm);
          // console.log(seachUsers.data.users)
          // console.log(seachUsers.data.pageCount)
          tableData.value = seachUsers.data.list;
          total.value = seachUsers.data.pagination.total;
          searching.value = false
      } catch (error) {
          searching.value = false
          console.log(error);
          ElMessage.error("搜索用户信息失败失败！！！")
      }
  }

  
  const defaultUserPassword = async(userInfo:any)=>{
      ElMessageBox.confirm(
          '确定要重置 ' + userInfo.name +'  这个用户的密码吗?',
          '警告',
          {
          confirmButtonText: '重置',
          cancelButtonText: '取消',
          type: 'warning',
          }
      ).then(async() => {
          const loading = ElLoading.service({
              lock: true,
              text: 'Loading',
              background: 'rgba(0, 0, 0, 0.7)',
          })
          try {
              const defPassResult:any = await defaultGamerPassword(userInfo.id);
              ElMessage({
                          type: 'info',
                          message: defPassResult.message,
                      })
              loading.close()
          } catch (error) {
              loading.close()
              ElMessage({
                          type: 'warning',
                          message: '重置密码失败',
                      })
          }
         
      })
  }

  const deleteRow = async(userInfo:any) => {
      ElMessageBox.confirm(
          '确定要删除 ' + userInfo.username +'  这个用户吗?',
          '警告',
          {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning',
          }
      ).then(async() => {
          const loading = ElLoading.service({
              lock: true,
              text: 'Loading',
              background: 'rgba(0, 0, 0, 0.7)',
          })
          try {
              const deleteResult:any = null
              console.log(deleteResult)
              if(deleteResult.success){
                  ElMessage({
                      type: 'info',
                      message: deleteResult.info.msg,
                  })
              }else{
                  ElMessage({
                      type: 'warning',
                      message: deleteResult.info.msg,
                  })
              }
              loading.close()
              onSubmit()
          } catch (error) {
              console.log(error)
              loading.close()
          }
      }).catch((error) => {
          console.log(error)
      })
  }

  const updateUserStatusLoading = ref(false);
  const updateUserStatus = async(userInfo:any,status:number)=>{
      updateUserStatusLoading.value = true;
      try {
          const upodateReslt:any = await updateGamerStatus({
              id:userInfo.id,
              status:status
          })
          updateUserStatusLoading.value = false;
          console.log("upodateReslt",upodateReslt)
          ElMessage({
                      type: 'info',
                      message: upodateReslt.message,
                  })
          onSubmit();
      } catch (error) {
          updateUserStatusLoading.value = false;
          ElMessage({
                          type: 'warning',
                          message: '修改用户可/禁用状态失败',
                      })
      }
      
  }

  const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
      onSubmit();
  }
  const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
      onSubmit();
  }

  const statusFormateter=(row:any)=>{
      if(row.status == 1){
          return "启用"
      }else if(row.status == 0){
          return "禁用"
      }
      return ""
  }

//筛选框
const value = ref('')

const options = [
  {
    value: '隐藏的评论',
    label: '隐藏的评论',
  },
  {
    value: '公开的评论',
    label: '公开的评论',
  }
]
</script>
  <style scoped>
  .container{
  /* border: 1px solid silver; */
  /* position: absolute; */
  }
 .top-select{
  float: left;
  margin: 8px;
  /* border: 1px solid silver; */
  padding: 10px;
  /* width: 100%; */
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