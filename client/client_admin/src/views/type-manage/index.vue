<template>
  <div class="searchBar">   
      <el-form :inline="true" :model="searchTypeForm" class="demo-form-inline">
          <el-form-item label="类别名">
              <el-input v-model="searchTypeForm.typeName" clearable placeholder="类别名" style="width: 100px;"/>
          </el-form-item>
          <el-form-item label="类别级别">
              <el-input v-model.number="searchTypeForm.typeLevel" clearable placeholder="类别级别" style="width: 100px;"/>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onNewSearch" :loading="searching">查询</el-button>
          </el-form-item>
          <el-form-item>
                <el-button type="success" @click="onAddType">新增</el-button>
            </el-form-item>
      </el-form>
  </div> 
  <div>
      <el-table :data="tableData" stripe style="width: 100%" >
        <el-table-column prop="id" label="序号" />
          <el-table-column prop="typeName" label="类别名" />
          <el-table-column prop="typeLevel" label="类别级别" />
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
                      type="success"
                      size="small"
                      @click.prevent="updateRow(scope.row)"
                      >
                      编辑
                  </el-button>
                  <el-button
                      v-if="scope.row.status == 1"
                      :loading="updateTypeStatusLoading"
                      type="warning"
                      size="small"
                      @click.prevent="updateTypeStatus(scope.row,0)"
                      >
                      禁用
                  </el-button>
                  <el-button 
                      v-if="scope.row.status == 0"
                      :loading="updateTypeStatusLoading"
                      type="success"
                      size="small"
                      @click.prevent="updateTypeStatus(scope.row,1)"
                      >
                      启用
                  </el-button>
                  <el-button 
                      v-if="scope.row.status == 1"
                      :loading="updateTypeStatusLoading"
                      type="success"
                      size="small"
                      @click.prevent="defaultTypePassword(scope.row)"
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
  <addType :addTypeShow="addTypeShow"  @closeAddType="closeAddType" @addTypeComplete="onSubmit"></addType>
  <updateType :updateTypeShow="updateTypeShow" :typeInfo="updateTypeVal" @closeUpdateType="closeUpdateType" @updateTypeComplete="onSubmit"></updateType>
</template>

<script lang="ts" setup>
  import { reactive,ref} from 'vue'
  import { defaultGamerPassword, updateGamerStatus } from '@/api/gamer'
  import { ElMessage,ElMessageBox,ElLoading } from 'element-plus'
  import { getTypeManage, deleteType } from '@/api/game'
  import addType from './components/addType.vue'
  import updateType from './components/updateType.vue'


  const pageSize = ref(10)
  const total = ref(0)
  const currentPage = ref(1)

  const tableData:any = ref([])

  interface paramsType {
      typeName:string,
      typeLevel:number| null,
      page:number,
      limit:number
  }
  const searchTypeForm = reactive<paramsType>({
      typeName:'',
      typeLevel:null,
      page:currentPage.value,
      limit:pageSize.value
  })
  const searching = ref(false)
  const onNewSearch = ()=>{
      searchTypeForm.page = 1;
      onSubmit()
  }
  const onSubmit = async() => {
      try {
          searching.value = true
          const seachTypes:any =await getTypeManage(searchTypeForm);
          console.log(seachTypes)
          // console.log(seachTypes.data.pageCount)
          tableData.value = seachTypes;
        //   total.value = seachTypes.data.pagination.total;
          searching.value = false
      } catch (error) {
          searching.value = false
          console.log(error);
          ElMessage.error("搜索类别信息失败失败！！！")
      }
  }

  
  const defaultTypePassword = async(TypeInfo:any)=>{
      ElMessageBox.confirm(
          '确定要重置 ' + TypeInfo.name +'  这个用户的密码吗?',
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
              const defPassResult:any = await defaultGamerPassword(TypeInfo.id);
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

//增加
  const addTypeShow = ref(false)

  const onAddType = ()=>{
    addTypeShow.value = true ;
  }

  const closeAddType = (v: boolean)=>{
    addTypeShow.value = false ;
  }


//删除
  const deleteRow = async(typeInfo:any) => {
      ElMessageBox.confirm(
          '确定要删除 ' + typeInfo.typeName +'  这个类别吗?',
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
              const deleteResult:any = await deleteType(typeInfo.id)
              console.log(deleteResult,'删除成功')
            //   if(deleteResult.success){
            //       ElMessage({
            //           type: 'info',
            //           message: deleteResult.info.msg,
            //       })
            //   }else{
            //       ElMessage({
            //           type: 'warning',
            //           message: deleteResult.info.msg,
            //       })
            //   }
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

  //编辑
  const updateTypeShow = ref()
  const updateTypeVal = ref()

  const updateRow = (typeInfo:any) =>{
    updateTypeVal.value = typeInfo;
    console.log(typeInfo)
    updateTypeShow.value = true
  }

  const closeUpdateType = (v: boolean) =>{
    updateTypeShow.value = false
  }


  const updateTypeStatusLoading = ref(false);
  const updateTypeStatus = async(TypeInfo:any,status:number)=>{
      updateTypeStatusLoading.value = true;
      try {
          const upodateReslt:any = await updateGamerStatus({
              id:TypeInfo.id,
              status:status
          })
          updateTypeStatusLoading.value = false;
          console.log("upodateReslt",upodateReslt)
          ElMessage({
                      type: 'info',
                      message: upodateReslt.message,
                  })
          onSubmit();
      } catch (error) {
          updateTypeStatusLoading.value = false;
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
</script>

<style scoped>
.searchBar{
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left;
}
.demo-pagination-block + .demo-pagination-block {
margin-top: 10px;
}
.demo-pagination-block{
margin-bottom: 16px;
}
</style>