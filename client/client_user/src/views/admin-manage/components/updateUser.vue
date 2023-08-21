<template>
    <el-dialog v-model="outerVisible" 
                title="修改管理用户信息" 
                @close="closeAddUser" 
                width="30%"
                :close-on-click-modal="false">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
        >
            <el-form-item label="登录名" prop="username">
                <el-input v-model="ruleForm.username" style="width: 180px"/>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" style="width: 180px"/>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone" style="width: 180px"/>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="ruleForm.sex">
                    <el-option label="男" :value=1 />
                    <el-option label="女" :value=2 />
                </el-select>
            </el-form-item>
            <el-form-item label="角色" prop="level">
                <el-select v-model="ruleForm.level">
                    <el-option label="超级管理员" :value=1 />
                    <el-option label="导师" :value=2 />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                    :loading="addUserLoading"
                    >更新用户信息
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
  </template>
  
  <script lang="ts" setup>
    import { ref,reactive,watch,computed,PropType} from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import {editAdmin} from '@/api/admin'
    import { ElMessage } from 'element-plus'

    const formSize = ref('default')
    const ruleFormRef = ref<FormInstance>()
    
    interface userInfoType {
        id:number,
        name:string,
        username:string,
        phone:string,
        sex:number,
        level:number
    }
    const props = defineProps({
        updateUserShow:Boolean,
        roles:Object,
        userInfo:Object as PropType<userInfoType>
        // userInfo:Object
    })

    const ruleForm = reactive({
        id:'',
        name: '',
        username:'',
        phone:'',
        sex: 0,
        level: 0,
    })

    watch(
        ()=>props.userInfo,
        (newVal:any,oldVal:any)=>{
            // console.log(newVal)
            // console.log(oldVal)
            ruleForm.id = newVal.id;
            ruleForm.username = newVal.nickName;
            ruleForm.name = newVal.name;
            ruleForm.sex = newVal.sex;
            ruleForm.level = newVal.level;
            ruleForm.phone = newVal.phone;
        },
    )
        
    let serverCheckname = false;
    const validatorUsername = (rule: any, value: any, callback: any) => {
        const reg = /^[a-zA-Z]\w{4,10}$/;
        if(!reg.test(value)){
            callback(new Error('字母开头，可包含数字下划线 4-10个字符'));
        }else if(serverCheckname){
            callback(new Error('登录名已被使用，请重新输入'));
            serverCheckname = false;
        }else{
            callback();
        }
    }

    const rules = reactive<FormRules>({
    username: [{required: true,validator:validatorUsername, trigger:'blur'}],
    name: [
        { required: true, message: '请输入用户编号', trigger: 'blur' },
        { min: 2, max: 10, message: '用户编号长度在2到10个字符', trigger: 'blur' },
    ],
    sex: [
        {
        required: true,
        message: '请选择性别',
        trigger: 'change',
        },
    ],
    level: [
        {
        required: true,
        message: '请选择角色',
        trigger: 'change',
        },
    ]
    })

    const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // console.log('submit!')
            submitEditUser();
        } else {
            console.log('error submit!', fields)
        }
    })
    }
    const emit = defineEmits(['closeUpdateUser','updateUserComplete'])

    const addUserLoading = ref(false);

    const submitEditUser = async()=>{
        addUserLoading.value = true;
        try{
            const updateResult:any = await editAdmin(ruleForm); 
            addUserLoading.value = false;
            if(updateResult.code === 200){
                emit('updateUserComplete');
                outerVisible.value = false;
                ElMessage.info(updateResult.message);
            } else if(updateResult.code === 10001){
                serverCheckname = true;
                ruleFormRef.value?.validate();
                ElMessage({
                            type: 'warning',
                            message: updateResult.message,
                        })
            }else{
                ElMessage({
                            type: 'warning',
                            message: updateResult.message,
                        })
            }
        }catch(error){
            addUserLoading.value = false;
            ElMessage({
                            type: 'warning',
                            message: '修改用户失败',
                        })
        }
        
    }

    const outerVisible = computed({
        get() {
            return props.updateUserShow;
        },
        set(v) {
            emit('closeUpdateUser',"close Update user")
        },
    });
   
    const closeAddUser = ()=>{
        // console.log("close add user")
        outerVisible.value = false;
    }
  </script>
  <style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
    }
  </style>