<template>
    <div class="searchBar">   
        <el-form :inline="true" :model="searchUserForm" class="demo-form-inline">
            <el-form-item label="用户状态">
                <el-select v-model="searchUserForm.userStatus"  placeholder="选择用户状态" style="width: 100px;">
                    <el-option
                        key=1
                        label="可用"
                        :value=1
                        />
                    <el-option
                        key=2
                        label="不可用"
                        :value=0
                        />
                </el-select>
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="searchUserForm.level" clearable placeholder="选择级别" style="width: 100px;">
                    <el-option
                        key=1
                        label="管理员"
                        :value=1
                        />
                    <el-option
                        key=2
                        label="导师"
                        :value=2
                        />
                </el-select>
            </el-form-item>
            <el-form-item label="工号">
                <el-input v-model="searchUserForm.number" clearable placeholder="工号" style="width: 100px;"/>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="searchUserForm.name" clearable placeholder="姓名" style="width: 100px;"/>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="searchUserForm.sex" clearable placeholder="选择性别" style="width: 100px;">
                    <el-option
                        key=1
                        label="男"
                        :value=1
                        />
                    <el-option
                        key=2
                        label="女"
                        :value=2
                        />
                </el-select>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="searchUserForm.phone" clearable placeholder="电话" style="width: 150px;"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onNewSearch" :loading="searching">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="onAddUser">新增</el-button>
            </el-form-item>
        </el-form>
    </div> 
    <div>
        <el-table :data="tableData" stripe style="width: 100%" >
            <el-table-column prop="number" label="工号"  />
            <el-table-column prop="name" label="用户姓名" />
            <el-table-column prop="phone" label="电话"  />
            <el-table-column prop="sex" label="性别" :formatter="sexFormateter"/>
            <el-table-column prop="level" label="角色" :formatter="levelFormateter"/>
            <el-table-column prop="status" label="状态" :formatter="statusFormateter"/>
            <el-table-column label="操作" width="300">
                <template #default="scope">
                    <span v-if="adminId != scope.row.id">
                    <el-button
                        type="primary"
                        size="small"
                        @click.prevent="updateUserFun(scope.row)"
                        >
                        编辑
                    </el-button>
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
                    </span>
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
    <addUser :addUserShow="addUserShow"  @closeAddUser="closeAddUser" @addUserComplete="onSubmit"></addUser>
    <updateUser :updateUserShow="updateUserShow" :userInfo="updateUserVal"  @closeUpdateUser="closeUpdateUser" @updateUserComplete="onSubmit"></updateUser>
</template>

<script lang="ts" setup>
    import { reactive,ref} from 'vue'
    import { getSeachAdmin,updateAdminStatus,defaultAdminPassword} from '@/api/admin'
    import { ElMessage,ElMessageBox,ElLoading } from 'element-plus'
    import addUser from './components/addUser.vue'
    import updateUser from './components/updateUser.vue'
    import { AdminStore } from '../../store/admin'

    const adminStore = AdminStore();
    const pageSize = ref(10)
    const total = ref(0)
    const currentPage = ref(1)
    const addUserShow = ref(false)
    const updateUserShow = ref(false)

    const tableData:any = ref([])

    const adminId = ref(adminStore.userId);

    interface paramsType {
        name:string,
        number:number,
        phone:string,
        sex:number | null,
        level:number | null,
        userStatus:number,
        page:number,
        limit:number
    }
    const searchUserForm = reactive<paramsType>({
        name:'',
        number:'',
        phone:'',
        sex:null,
        level:null,
        userStatus:1,
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
            const seachUsers:any =await getSeachAdmin(searchUserForm);
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

    const onAddUser = ()=>{
        addUserShow.value = true;
    }
    const closeAddUser= (v: boolean)=>{
        // console.log(v)
        addUserShow.value = false;
    }

    const closeUpdateUser= (v: boolean)=>{
        // console.log(v)
        updateUserShow.value = false;
    }

   
    const updateUserVal = ref()
    const updateUserFun = (userInfo:any) =>{
        // console.log(userInfo)
        updateUserVal.value = userInfo;
        updateUserShow.value = true;
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
                const defPassResult:any = await defaultAdminPassword(userInfo.id);
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
            const upodateReslt:any = await updateAdminStatus({
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

    const sexFormateter=(row:any)=>{
        if(row.sex == 1){
            return "男"
        }else if(row.sex == 2){
            return "女"
        }
        return ""
    }
    const levelFormateter=(row:any)=>{
        if(row.level == 1){
            return "管理员"
        }else if(row.level == 2){
            return "导师"
        }
        return ""
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