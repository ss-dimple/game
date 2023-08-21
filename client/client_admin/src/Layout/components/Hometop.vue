<template>
    <el-row :gutter="20">
        <el-col :span="6" :offset="16">
            <span class="content-text">欢迎:{{username}}</span>
        </el-col>
        <el-col :span="1">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar :icon="UserFilled" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="openSetAdminInfo()">修改个人信息</el-dropdown-item>
                    </el-dropdown-menu>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="openSetPassword()">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-col>
    </el-row>
    
    <el-dialog v-model="dialogInfoFormVisible" title="编辑个人信息">
        <el-form 
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
        >
            <el-form-item label="登录名" :label-width="formLabelWidth" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                <el-input v-model="ruleForm.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                <el-select v-model="ruleForm.sex">
                    <el-option label="男" :value=1 />
                    <el-option label="女" :value=2 />
                </el-select>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="ruleForm.phone" autocomplete="off" />
            </el-form-item>
            <el-button @click="dialogInfoFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submitInfoForm(ruleFormRef)"
            :loading="updateSelfInfoLoading">
            更新
            </el-button>
        </el-form>
    </el-dialog>

    <el-dialog v-model="dialogPassSetVisible" title="修改密码">
        <el-form
            ref="passRuleFormRef"
            :model="passRuleForm"
            status-icon
            :rules="passRules"
            label-width="120px"
            class="demo-ruleForm"
        >
            <el-form-item label="新密码" prop="pass">
            <el-input v-model="passRuleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass">
            <el-input
                v-model="passRuleForm.checkPass"
                type="password"
                autocomplete="off"
            />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitPassForm(passRuleFormRef)"
            :loading="resetAdminPasswordLoading"
                >确认修改</el-button
            >
            <el-button @click="resetPassForm(passRuleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
    import {UserFilled} from '@element-plus/icons-vue';
    // import { AdminStore } from '@/store/admin';
    import { UserStore } from '@/store/user';
    import { useRouter } from 'vue-router';
    import { ref, reactive, onMounted } from 'vue';
    import type { FormInstance, FormRules } from 'element-plus';
    import { ElMessage } from 'element-plus';
    import { updateAdminSelf,getUserByToken, resetAdminPassword} from '../../api/admin';

    const userStore = UserStore();
    const router = useRouter();
    const logout = async()=>{
        // console.log("logout")
        await userStore.logout()
        router.push({path:'/login'})
    }

    const username = ref(userStore.username )

    const dialogInfoFormVisible = ref(false)
    const formLabelWidth = '140px'

    const ruleFormRef = ref<FormInstance>()

    const ruleForm = reactive({
        name: '',
        username: '',
        phone: '',
        sex:0,
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
        ]
    })

    const submitInfoForm = async (formEl: FormInstance | undefined) => {
        console.log("validate is in")
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                // console.log('submit!')
                submitSelfAdminInfo();
            } else {
                console.log('error submit!', fields)
            }
        })
    }
    const updateSelfInfoLoading = ref(false);
    const submitSelfAdminInfo = async()=>{
        updateSelfInfoLoading.value = true;
        try{
            const result:any = await updateAdminSelf(ruleForm);
            updateSelfInfoLoading.value = false;
            if(result.code === 200){
                ElMessage.info(result.message);
                dialogInfoFormVisible.value = false;
            }else if(result.code === 10001){
                console.log("this fail")
                serverCheckname = true;
                ruleFormRef.value?.validate()
                ElMessage({
                            type: 'warning',
                            message: result.message,
                        })
            }else{
                ElMessage({
                            type: 'warning',
                            message: result.message,
                        })
            }
        }catch(error){
            updateSelfInfoLoading.value = false;
            ElMessage({
                            type: 'warning',
                            message: '更新个人信息失败',
                        })
        }
    }

    const openSetAdminInfo = async()=>{
        dialogInfoFormVisible.value = true;
        try {
            const result:any = await getUserByToken();
            if(result.code === 200){
                ruleForm.name = result.data.name;
                ruleForm.username = result.data.nickName;
                ruleForm.sex = result.data.sex;
                ruleForm.phone = result.data.phone;
            }else{
                dialogInfoFormVisible.value = false;
                ElMessage({
                            type: 'warning',
                            message: result.message,
                        })
            }
        } catch (error) {
            dialogInfoFormVisible.value = false;
            ElMessage({
                        type: 'warning',
                        message: '系统接口异常',
                    })
        }
    }

    const dialogPassSetVisible = ref(false);
    const passRuleFormRef = ref<FormInstance>()

    const openSetPassword = ()=>{
        dialogPassSetVisible.value = true;
        passRuleFormRef.value?.resetFields()
    }
    const passRuleForm = reactive({
        pass: '',
        checkPass: ''
    })

    const validatePass = (rule: any, value: any, callback: any) => {
        const reg = /^[0-9a-zA-Z_]{6,10}$/;
        if (value === '') {
            callback(new Error('请输入新密码'))
        }else if(!reg.test(value)){
            callback(new Error('只可包含字母、数字、下划线 6-10个字符'))
        } else {
            if (passRuleForm.checkPass !== '') {
            if (!passRuleFormRef.value) return
            passRuleFormRef.value.validateField('checkPass', () => null)
            }
            callback()
        }
    }
    const validatePass2 = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('再次输入新密码'))
        } else if (value !== passRuleForm.pass) {
            callback(new Error("两次密码输入不一致"))
        } else {
            callback()
        }
    }

    const passRules = reactive({
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    })

    const submitPassForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid) => {
            if (valid) {
            console.log('submit!')
            submitResetAdminPassword();
            } else {
            console.log('error submit!')
            return false
            }
        })
    }

    const resetPassForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }

    const resetAdminPasswordLoading = ref(false);
    const submitResetAdminPassword = async()=>{
        resetAdminPasswordLoading.value = true;
        try{
            const result:any = await resetAdminPassword({newPassword:passRuleForm.pass});
            resetAdminPasswordLoading.value = false;
            if(result.code === 200){
                ElMessage.info(result.message);
                dialogPassSetVisible.value = false;
            }else{
                ElMessage({
                            type: 'warning',
                            message: result.message,
                        })
            }
        }catch(error){
            resetAdminPasswordLoading.value = false;
            ElMessage({
                            type: 'warning',
                            message: '重置密码失败',
                        })
        }
    }
</script>

<style scoped>
    .el-row{
        margin-top: 10px;
    }
    
</style>