<template>
    <el-dialog v-model="outerVisible" 
                title="新增管理用户" 
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
                    >添加用户</el-button
                >
                <el-button @click="resetForm(ruleFormRef)">清空</el-button>
            </el-form-item>
        </el-form>
        <div>新建用户密码默认为：123456</div>
    </el-dialog>
  </template>
  
  <script lang="ts" setup>
    import type { FormInstance, FormRules } from 'element-plus';
    import { ref,reactive,computed } from 'vue';
    import { addAdmin } from '../../../api/admin';
    import { ElMessage } from 'element-plus'
    
    const formSize = ref('default')
    const ruleFormRef = ref<FormInstance>()

    const props = defineProps({
        addUserShow:Boolean,
    })

    const ruleForm = reactive({
        name: '',
        username: '',
        phone: '',
        sex: 1,
        level: 1,
    })

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
        { required: true, message: '请输入用户登录名', trigger: 'blur' },
        { min: 2, max:10, message: '用户登录名长度在2到10个字符', trigger: 'blur' },
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
                submitAddUser();
            } else {
                console.log('error submit!', fields)
            }
        })
    }
    const emit = defineEmits(['closeAddUser','addUserComplete'])

    const addUserLoading = ref(false);

    const submitAddUser = async()=>{
        addUserLoading.value = true;
        try{
            const addResult:any = await addAdmin(ruleForm);
            addUserLoading.value = false;
            if(addResult.code === 200){
                emit('addUserComplete');
                outerVisible.value = false;
                resetForm(ruleFormRef.value) 
                ElMessage.info(addResult.message);
            }else if(addResult.code === 10001){
                serverCheckname = true;
                ruleFormRef.value?.validate()
                ElMessage({
                            type: 'warning',
                            message: addResult.message,
                        })
            }else{
                ElMessage({
                            type: 'warning',
                            message: addResult.message,
                        })
            }
        }catch(error){
            addUserLoading.value = false;
            ElMessage({
                            type: 'warning',
                            message: '新增用户失败',
                        })
        }
        
    }

    

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }

    const outerVisible = computed({
        get() {
            return props.addUserShow;
        },
        set(v) {
            emit('closeAddUser',"close Add user")
        },
    });
   
    const closeAddUser = ()=>{
        console.log("close add user")
        outerVisible.value = false;
        resetForm(ruleFormRef.value) 
    }
  </script>
  <style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
    }
  </style>