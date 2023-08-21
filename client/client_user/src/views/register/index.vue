<template>
    <div class="login-container">
      <div class="login-back"></div>
      <div class="login-title">
          <h2>游戏展示平台系统</h2>
        </div>
      <div class="login-form">
          <h1>注册</h1>
        <el-form
          label-position="left"
          ref="loginFormRef"
          :model="registerInfo"
          status-icon
          :rules="loginRules"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入昵称" prop="username" class="formItem">
            <el-input 
              class="formInput"
              ref="usernameRef"
              v-model="registerInfo.username" 
              type="text" 
              tabindex="1"
              autocomplete="off" />
          </el-form-item>
          <el-form-item label="请输入密码" prop="password" class="formItem">
            <el-input 
              class="formInput"
              ref="passwordRef"
              v-model.number="registerInfo.password" 
              type="password" 
              tabindex="2"
              @keyup.enter="submit"
              autocomplete="off" />
          </el-form-item>
          <el-form-item label="请选择性别" prop="sex">
            <el-select v-model="registerInfo.sex"  class="formItem">
                <el-option label="男" :value="1" />
                <el-option label="女" :value="0" />
            </el-select>
           </el-form-item>
           <el-form-item label="请输入邮箱" prop="email" class="formItem">
            <el-input 
              class="formInput"
              ref="emailRef"
              v-model="registerInfo.email" 
              type="text" 
              tabindex="1"
              autocomplete="off" >
              <template  #append  >
                <el-button  :loading="loading"  v-if="!disabled" @click="sendCode()">获取验证码</el-button>
                <el-button  :loading="loading"  v-else type="default" >{{timer}}秒后重新发送</el-button>
            </template>
            </el-input>
          </el-form-item>
          <el-form-item label="请输入验证码" prop="code" class="formItem" >
            <el-input 
              class="formInput"
              ref="codeRef"
              v-model.number="registerInfo.code" 
              type="text" 
              tabindex="1"
              autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button
              size="large"
              :loading="loading"
              type="primary" 
              @click="submit"
              >注册</el-button>
              <el-button
              size="large"
              :loading="loading"
              type="primary" 
              @click="goLogin"             
              >前往登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="pao kuai1"></div>
      <div class="pao kuai2"></div>
      <div class="pao kuai3"></div>
      <div class="pao kuai4"></div>
      <div class="pao kuai5"></div>
  </template>
  
  <script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import {useRouter} from 'vue-router'
    import { User,Lock } from '@element-plus/icons-vue'
    // import {AdminStore} from '@/store/admin'
    import {UserStore} from '@/store/user'
    import { ElMessage, LEFT_CHECK_CHANGE_EVENT, RIGHT_CHECK_CHANGE_EVENT } from 'element-plus'
    import { getEmailCode , register} from '@/api/user'
import { es, fa } from 'element-plus/es/locale'
  
    const router = useRouter()
    const loginFormRef = ref(null)
    // const adminStore = AdminStore();
    const userStore = UserStore();
  
    const checkUsername = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error('请输入用户编号'))
      }else{
        callback()
      }
    }
  
    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }else{
        callback()
      }
    }
    
    const registerInfo = reactive({
      username: '',
      password: '',
      sex: '',
      email:'',
      code:'',
    })
  
    const loginRules = reactive({
      username: [{ validator: checkUsername, trigger: 'blur', required: true}],
      password: [{ validator: validatePass, trigger: 'blur', required: true },
                 {type: 'number', message: 'password must be a number'}],
      sex: [{ required: true,  message: 'Please select sex',trigger: 'change',}],
      email:[{ 
          required: true,
          message: 'Please input email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
        }],
      code: [{type: 'number', message: 'code must be a number'}]
    })

    //发送验证码
    const disabled = ref(false)
    const count = ref(60)
    const timer = ref(0)

    //倒计时
    const timerHandler = () =>{
      timer.value = count.value
      disabled.value=true 
      let time = setInterval(() => {
        if(timer.value > 1 && timer.value <= count.value) {
          timer.value--
        } else {
          disabled.value = false
          clearInterval(time)
        }
      },1000)
    }

    const sendCode = ( ) => {
      (loginFormRef.value as any).validate(async(valid: boolean) => {
        if(valid){
          try{
            timerHandler()
            const emailInfo = [registerInfo.username,registerInfo.email]
            const result:any = await getEmailCode(emailInfo)
            console.log(result,'验证码发送成功')
          }catch(error){
            console.log(error,'发送验证码失败')
          }
        }else{
          return false;
        }
      })
    }

  //注册
    const loading = ref(false);
    
    const submit = async()=> {
      try{
        loading.value=true
        const result: any = await register(registerInfo);
        loading.value = false
        if(result==200){
          ElMessage({
            type: 'success',
            message: '恭喜注册成功，自动前往登录页面！',
          })
          router.push({path:'/login'})
        }
        console.log(result)
      }catch(error){
        console.log(error)
      }
    }

    const goLogin = ()=>{
      router.push({path:'/login'})
    }
  
  
  </script>
  
  <style lang="scss">
    .login-container {
      height: 100%;
      width: 100%;
      overflow: hidden;
      .login-back{
        height: 100%;
        width: 100%;
        background-color:#1b1d1f;
        position: absolute;
        z-index: -1;
        overflow: hidden;
      }
      
      .login-title{
        color: white;
        font-size: 60px;
        font-family: "楷体";
        font-weight: bold;
        text-align: center;
        margin: 0;
        padding: 30px;
        text-shadow: rgb(49, 61, 232) 1px 2px 1px;
      }
  
      .login-form{
        position: absolute;
        color: white;
        top: 60%;
        left: 50%;
        transform: translate(-50%,-50%);
        width:35%;
        padding: 10px;
        background-color: #40475d68;
        -moz-opacity:0.35;
        opacity:0.85;
        box-sizing:border-box;
        box-shadow:7px 7px 17px rgba(67, 67, 71, 0.5);
        border-radius: 10px;/*登录窗口边角圆滑*/
      }
  
    }
  
    .el-form-item__label {
      color: #FFFFFF;
      line-height:38px;
      font-size: 18px;
    }
    .el-form-item__content{
      height: 40px;
    }
  
    h1{
      margin:0 0 30px;
      padding-bottom:10px;
      color:#FFFFFF;
      text-align:center;
    }
  
    // .formItem{
    //   position: relative;
    //   margin-left: 2%;
    // }
  
    .formInput{
        display: flex;
      width: 80%;
      padding: 5px ;
      color: #fff;
      letter-spacing: 1px;
      margin-bottom:30px;/*输入框设置*/
      border:none;
      // border-bottom:1px solid #fff;
      outline:none;
      background:transparent;
    }
  
    button{
      cursor: pointer;
      margin-left: 20%;
    }
  
    .kuai1{
              z-index: -1;
              position: absolute;
              top: 600px;
              left: 50px;
              width: 100px;
              height: 100px;
              border-radius: 50%;
              background-image: radial-gradient(at 20px 20px,white 0%,#f0ccd5 25%, #5a93cb 45%, #cf3ebe 100%);
              box-shadow: 0px 0px 8px 0px pink;
              animation: run 3s linear infinite;
              animation-delay: -1s;
          }
          .kuai2{
              z-index: -1;
              position: absolute;
              top: 600px;
              left: 400px;
              width: 200px;
              height: 200px;
              border-radius: 50%;
              background-image: radial-gradient(at 20px 20px,white 0%,#F9ACBE 25%, #7DA0C3 45%, #C754BA 100%);
              box-shadow: 0px 0px 14px 0px pink;
              animation: run 3s linear infinite;
              animation-delay: -1.5s;
          }
          .kuai3{
              z-index: -1;
              position: absolute;
              top: 600px;
              left: 600px;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background-image: radial-gradient(at 20px 20px,white 0%,#F9ACBE 25%, #7DA0C3 45%, #C754BA 100%);
              box-shadow: 0px 4px 8px 0px pink;
              animation: run 3s linear infinite;
              animation-delay: -2.5s;
          }
          .kuai4{
              z-index: -1;
              position: absolute;
              top: 600px;
              left: 800px;
              width: 150px;
              height: 150px;
              border-radius: 50%;
              background-image: radial-gradient(at 20px 20px,white 0%,#F9ACBE 25%, #7DA0C3 45%, #C754BA 100%);
              box-shadow: 0px 0px 6px 0px pink;
              animation: run 3s linear infinite;
              animation-delay: -2s;
          }
          .kuai5{
              position: absolute;
              top: 600px;
              left: 1200px;
              width: 220px;
              height: 220px;
              border-radius: 50%;
              background-image: radial-gradient(at 20px 20px,white 0%,#F9ACBE 25%, #7DA0C3 45%, #C754BA 100%);
              box-shadow: 0px 0px 16px 0px pink;
              animation: run 3s linear infinite;
              animation-delay: -0.5s;
          }
          @keyframes run{
              0%{
                  transform: translate(0px, 400px);
              }
          
              100%{
                  transform: translate(0px, -800px);
                  
              }
          }
    
  </style>
  
  