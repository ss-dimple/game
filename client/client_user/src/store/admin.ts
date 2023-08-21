import { defineStore } from 'pinia';
import { login,getUserByToken,logout} from '@/api/admin';
import { getToken, setToken, removeToken,removeCookieActiveMenu } from '@/utils/cookies';
import { resetRouter } from '@/router';
import { PermissionStore } from './permission'

export const AdminStore = defineStore('admin',{
    state:() => {
        return {
            token:getToken()||'',
            nickName:'',
            name:'',
            sex:0,
            phone:'',
            level:0,
            userId:0
        };
    },
    actions:{
        async login(username:string,password:string){
            console.log('2333')
            username = username.trim()
            const result:any = await login({ username, password })
            if(result.code !== 200){
                return result;
            }else{
                setToken(result.data.token)
                this.token = result.data.token;
            }
        },
        async getUserInfo(){
            if(this.token === ''){
                throw Error('获取用户信息错误：未持有token')
            }
            const {data} = await getUserByToken();
            console.log("userinfo1111",data)
            this.name = data.name;
            this.userId = data.id;
            this.nickName = data.nickName;
            this.level = data.level;
            this.sex = data.sex;
            this.phone = data.phone;
        },
    
        resetToken(){
            removeToken();
            this.token = '';
        },
    
        async logout() {
            if (this.token === '') {
                throw Error('LogOut: token is undefined!')
            }
            // 后端await logout()
            await logout();
            removeToken();
            resetRouter();
            removeCookieActiveMenu();
            const permissionStore = PermissionStore();
            permissionStore.setAddRoutesState(false);
    
            this.token ='';
            this.name='';
            this.nickName = '';
            this.userId = 0;
            this.level = 0;
            permissionStore.menuPath = '';
        }
    }
});