import { defineStore } from 'pinia';
// import { login,getUserByToken,logout} from '@/api/admin';
import { login,getUserByToken,logout} from '@/api/user';
import { getToken, setToken, removeToken,removeCookieActiveMenu } from '@/utils/cookies';
import { resetRouter } from '@/router';
import { PermissionStore } from './permission'

export const UserStore = defineStore('user',{
    state:() => {
        return {
            token:getToken()||'',
            id:0,
            userno:0,
            username:'',
            sex:0,
            roleId:0,
            gradeId:0,
            classId:0,
        };
    },
    actions:{
        async login(username:string,password:string){
            username = username.trim()
            console.log('到仓库了')
            const result:any = await login({ username, password })
            console.log(result,'登录')
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
            console.log(this.token,'token')
            const { data } = await getUserByToken();
            console.log("userinfo",data)
            this.id = data.id;
            this.userno = data.userno;
            this.username = data.username;
            this.sex = data.sex;
            this.roleId = data.roleId;
            this.gradeId = data.gradeId;
            this.classId = data.classId;
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
            this.id=0,
            this.userno=0;
            this.username = '';
            this.roleId = 0;
            this.gradeId = 0;
            this.classId = 0;
            permissionStore.menuPath = '';
        }
    }
});