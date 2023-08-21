<template>
    <el-dialog v-model="outerVisible" 
        title="创建团队" 
        @close="closeAddTeam" 
        width="30%"
        :close-on-click-modal="false">
      <template #footer>
        <el-form
        class="team-form"
        label-position="right"
        label-width="100px"
        :rules="teamRules"
        :model="teamForm"
        style="max-width: 460px"
        >
        <el-form-item label="队伍名称" prop="teamName">
            <el-input v-model="teamForm.teamName" />
        </el-form-item>
        <el-form-item label="队伍简介" prop="teamInfo">
            <el-input v-model="teamForm.teamInfo" type="textarea" />
        </el-form-item>
        <el-form-item label="队长姓名" prop="player0Name">
            <el-input v-model="teamForm.player0Name" />
        </el-form-item>
        <el-form-item label="队长学号" prop="player0Id">
            <el-input v-model.number="teamForm.player0Id" />
        </el-form-item>
        <el-form-item label="队长职责" prop="player0Work">
            <el-input v-model="teamForm.player0Work" />
        </el-form-item>
        <el-form-item label="队员1姓名" prop="player1Name">
            <el-input v-model="teamForm.player1Name" />
        </el-form-item>
        <el-form-item label="队员1学号" prop="player1Id">
            <el-input v-model.number="teamForm.player1Id" />
        </el-form-item>
        <el-form-item label="队员1职责" prop="player1Work">
            <el-input v-model="teamForm.player1Work" />
        </el-form-item>
        <el-form-item label="指导老师">
            <el-select v-model="teamForm.teacherId" clearable placeholder="选择指导老师" style="width: 100px;">
                <el-option
                v-for="(item,index) in teachers"
                :key="index"
                :label="item.username"
                :value="item.userno"
                />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitTeam">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
        <!-- <div>新建用户密码默认为：123456</div> -->
        <!-- <div class="dialog-footer">
          <el-button @click="closeaddType">Cancel</el-button>
          <el-button type="primary" @click="showInfoBox('hello')">
            open the inner Dialog
          </el-button>
        </div> -->
      </template>
    </el-dialog>
  </template>
  
  <script lang="ts" setup>
    import { ref, toRefs ,toRef,reactive,watch,computed ,onMounted} from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import {getTeachers, teamSubmit } from '@/api/user'
    import { ElMessage } from 'element-plus'



    const props = defineProps({
        addTeamShow:Boolean,    
    })
    const teamForm = reactive({
      teamName: '',
      teamInfo: '',
      player0Name: '',
      player0Id: null,
      player0Work: '',
      player1Name: '',
      player1Id: null,
      player1Work: '',
      teacherId: ''
    })

    const teamRules = reactive<FormRules>({
        teamName: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 6', trigger: 'blur' },
        ],
        teamInfo: [
        { required: true, message: 'Please input activity form', trigger: 'blur' },
        ],
        player0Name: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 2, max: 5, message: 'Length should be 2 to 5', trigger: 'blur' },
        ],
        player0Id: [
            { required: true, message: 'age is required' },
            { type: 'number', message: 'age must be a number' },
        ],
        player0Work: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 2, max: 5, message: 'Length should be 2 to 5', trigger: 'blur' },
        ],
        player1Name: [
            {  message: 'Please input Activity name', trigger: 'blur' },
            { min: 2, max: 5, message: 'Length should be 2 to 5', trigger: 'blur' },
        ],
        player1Id: [
            // {  message: 'age is required', trigger: 'blur' },
            { type: 'number', message: 'age must be a number' },
        ],
        player1Work: [
            {  message: 'Please input Activity name', trigger: 'blur' },
            { min: 2, max: 5, message: 'Length should be 2 to 5', trigger: 'blur' },
        ],
        teacherId: [
            {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
            },
        ],
    })

    //教师类别
    const teachers: any = ref([]);
    onMounted(async() => {
      teachers.value = (await getTeachers()).data
      console.log(teachers, 'teachers')
    })

    const addTeamLoading = ref(false);

    const submitTeam = async () => {
    addTeamLoading.value = true;
      try{
        console.log(teamForm,'teamForm')
        const result: any = await teamSubmit(teamForm);
        addTeamLoading.value = false;
        if(result.code ==200){
          ElMessage({
            type: 'success',
            message: '已成功提交至教师端审核，请耐心等待！'
          })
        }
        emit('addTeamComplete');
        outerVisible.value = false;
      }catch(error){
        console.log(error)
      }
    }
    const emit = defineEmits(['closeAddTeam','addTeamComplete'])

   

    // const resetForm = (formEl: FormInstance | undefined) => {
    //     if (!formEl) return
    //     formEl.resetFields()
    // }

    const outerVisible = computed({
        get() {
            return props.addTeamShow;
        },
        set(v) {
            emit('closeAddTeam',"close Add user")
        },
    });
   
    const innerVisible = ref(false)

    const closeAddTeam = ()=>{
        console.log("close add user")
        outerVisible.value = false;
    }
  </script>
  <style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
    }
    .el-dialog__body{
        padding: 0;
    }
  </style>