<template>
    <div class="login-container">
      <div class="login-back"></div>
      <div class="login-title">
          <h2>游戏展示平台系统</h2>
        </div>
      <div class="login-form">
          <h1>注册</h1>
        <el-form
          :label-position="left"
          ref="loginFormRef"
          :model="loginForm"
          status-icon
          :rules="loginRules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入昵称" prop="username" class="formItem">
            <el-input 
              class="formInput"
              ref="usernameRef"
              v-model="loginForm.username" 
              type="text" 
              tabindex="1"
              autocomplete="off" />
          </el-form-item>
          <el-form-item label="请输入密码" prop="password" class="formItem">
            <el-input 
              class="formInput"
              ref="passwordRef"
              v-model="loginForm.password" 
              type="password" 
              tabindex="2"
              @keyup.enter="handlerLogin"
              autocomplete="off" />
          </el-form-item>
          <el-form-item label="请选择性别">
            <el-select v-model="loginForm.sex" prop="sex" class="formItem">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
            </el-select>
           </el-form-item>
           <el-form-item label="请输入邮箱" prop="email" class="formItem">
            <el-input 
              class="formInput"
              ref="usernameRef"
              v-model="loginForm.email" 
              type="text" 
              tabindex="1"
              autocomplete="off" >
              <template  #append>
                <el-button  :loading="loading" type="primary" >获取验证码</el-button>
            </template>
            </el-input>
          </el-form-item>
          <el-form-item label="请输入验证码" prop="code" class="formItem" >
            <el-input 
              class="formInput"
              ref="usernameRef"
              v-model="loginForm.code" 
              type="text" 
              tabindex="1"
              autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button
              size="large"
              :loading="loading"
              type="primary" 
              @click="handlerLogin"
              >注册</el-button>
              <el-button
              size="large"
              :loading="loading"
              type="primary" 
              @click="register"
              >重置</el-button>
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
    
    const loginForm = reactive({
      username: '',
      password: '',
      sex: '',
      email:'',
      code:'',
    })
  
    const loginRules = reactive({
      username: [{ validator: checkUsername, trigger: 'blur' }],
      password: [{ validator: validatePass, trigger: 'blur' }],
      email:[{ 
          required: true,
          message: 'Please input email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
        }]
    })
  
    const loading = ref(false);
    
    const handlerLogin = ()=> {
      (loginFormRef.value as any).validate(async(valid: boolean) => {
        if(valid){
          loading.value = true;
          try {
            const result:any = await userStore.login(loginForm.username,loginForm.password)
              if(userStore.token){
                router.push({
                path:'/'
              })
              setTimeout(() => {
                loading.value = false;
                  }, 0.5 * 1000)
            }
            if(result.code !== 200){
              ElMessage({
                              type: 'warning',
                              message: result.message,
                          })
            }
          } catch (error) {
            loginForm.username =''
            loginForm.password =''
          }
          loading.value = false;
        }else{
          return false;
        }
      })
    }
  
    const register=()=>{
      console.log('q register')
      
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
  
  