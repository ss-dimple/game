import axios from 'axios'
// import { AdminStore } from '@/store/admin'
import { UserStore } from '@/store/user'
import { ElMessage,ElMessageBox } from 'element-plus'


const service = axios.create({
    // url = base url + request url
    baseURL: process.env.VUE_APP_BASE_API, 
    timeout: 5000
  })

  //请求拦截器
service.interceptors.request.use(
    (config:any) => {
      // Add header to every request
      // const adminStore = AdminStore();
      const userStore = UserStore();
      if (userStore.token) {
        config.headers['authorization'] = userStore.token
      }
      // console.log("config",config)
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )

// 响应拦截器
service.interceptors.response.use(
    (response) => {
      // const adminStore = AdminStore();
      const userStore = UserStore();
      // console.log("response data",response.data)
      // if(response.data.code == 200){
      //   return response.data
      // }else{
        if (response.data.code === 11001 || response.data.code === 11002) {
            ElMessageBox.confirm(
            '你已被登出，可以取消继续留在该页面，或者重新登录',
            'Warning',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            userStore.resetToken()
            location.reload() // To prevent bugs from vue-router
          })
        // }else{
          // ElMessage({
          //   message: response.data.message,
          //   type: 'error',
          //   duration: 5 * 1000
          // })
        // }
        // return Promise.reject(response.data.message)
      }
      console.log("response data",response.data)
      return response.data
    },
    (error) => {
        console.log(error.message)
        // ElMessage({
        //   message: '请求接口失败',
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        return Promise.reject(error)
    }
  )
  
  export default service