<template>
  <div class="content">
    <el-steps :active="active" align-center>
      <el-step title="填写游戏基本信息" :icon="Edit" />
      <el-step title="提交宣传图和压缩包" :icon="Upload" />
      <!-- <el-step title="Step 3" :icon="Picture" /> -->
  </el-steps>
  </div>
<div class="main">
    <div class="main-info">
        <div class="main-info-left" v-if="active === 1">
            <div class="main-left-title">
                <span>游戏基本信息</span>
            </div>
            <div class="main-left-form">
                <el-form
                ref="ruleFormRef"
                :model="gameInfo"
                :rules="rules"
                label-width="130px"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
                label-position="left"
                >
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="游戏名称" prop="gameName" >
                      <el-input maxlength="15" show-word-limit  v-model="gameInfo.gameName" clearable placeholder="请输入3-15字的游戏名称" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"  :offset="2">
                    <el-form-item label="游戏类别" prop="typeId">
                      <el-select v-model="gameInfo.typeId" clearable placeholder="选择类别" >
                      <el-option
                        v-for="(item,index) in types"
                        :key="index"
                        :label="item.typeName"
                        :value="item.typeLevel"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="游戏标签" prop="tags">
                    <el-checkbox-group v-model.number="gameInfo.tags" >
                         <el-checkbox 
                            v-for="(item,index) in tagInfo"
                            :key="index"
                            :label="item.tagName"
                            :value="item.tagLevel"
                             />
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="游戏概要" prop="gameTitle" >
                    <el-input  maxlength="15" show-word-limit  v-model="gameInfo.gameTitle" clearable placeholder="请输入不超15字的游戏概要" />
                </el-form-item>
                <el-form-item label="游戏详情" prop="gameDesc" >
                    <el-input maxlength="150" show-word-limit  v-model="gameInfo.gameDesc" type="textarea" clearable placeholder="请输入15-150字的游戏详情"/>
                </el-form-item>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="语言" prop="language" >
                    <!-- <el-input show-word-limit  v-model="gameInfo.language"  clearable placeholder="请输入游戏配置语言"/>繁体中文 / 简体中文 / 英语 / 日语 -->
                      <el-checkbox-group v-model="gameInfo.language" > 
                        <el-checkbox label="繁体中文" name="language" />
                        <el-checkbox label="简体中文" name="language" />
                        <el-checkbox label="英语" name="language" />
                        <el-checkbox label="日语" name="language" />
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"  :offset="2">
                    <el-form-item label="设配系统" prop="set" >
                    <!-- <el-input  show-word-limit  v-model="gameInfo.set"  clearable placeholder="请输入游戏设配系统"/> -->
                      <el-checkbox-group v-model="gameInfo.set">
                        <el-checkbox label="Win" name="set" />
                        <el-checkbox label="Mac" name="set" />
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="是否为老师上传" prop="gameMeta">
                      <el-select v-model="gameInfo.gameMeta"  >
                        <el-option label="是" :value="1" />
                        <el-option label="不是" :value="0" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"  :offset="2">
                    <el-form-item label="选择团队" prop="teamId"  :rules="[{required:gameInfo.gameMeta == 0 ?true:false  , trigger: 'change',}]">
                      <el-select v-model="gameInfo.teamId" clearable placeholder="选择上传团队" >
                        <el-option
                          v-for="(item,index) in teams"
                          :key="index"
                          :label="item.teamName"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="指导老师" prop="teacherId">
                      <el-select v-model="gameInfo.teacherId" clearable placeholder="选择指导老师">
                        <el-option
                        v-for="(item,index) in teachers"
                        :key="index"
                        :label="item.username"
                        :value="item.userno"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"  :offset="2">
                    <el-form-item label="审核后是否公开" prop="status" >
                      <el-select v-model="gameInfo.status"  >
                        <el-option label="公开" :value="1" />
                        <el-option label="不公开" :value="0" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="loading">
                        提交
                    </el-button>
                    <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                    <!-- <el-button style="margin-top: 12px;" @click="next" v-if="active<3" type="success">下一步</el-button> -->
                </el-form-item>
            </el-form>
            </div>
        </div>
        <div class="main-info-right" v-if="active === 2">
            <div class="main-right-title">
                <span>游戏宣传主图与安装包</span>
            </div>
            <el-upload
              ref="uploadRef"
              class="upload-demo"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :auto-upload="false"
              :on-change="beforeUpload"
            >
              <template #trigger>
                <el-button type="primary">请选择游戏宣传图和压缩文件</el-button>
              </template>
              <el-button class="ml-3" type="success" @click="FileUpload">
                提交
              </el-button>

              <template #tip>
                <div class="el-upload__tip">
                  仅支持jpg/png/jpeg/zip格式和文件大小不能大于10mb
                </div>
              </template>
            </el-upload>

            <!-- <div class="main-right-img">
              // <el-form-item  prop="imgPath"> 
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-change="handleImgChange"
              :auto-upload="false"
            >
              // <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              //<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon> 
              <template #trigger>
                <el-button type="primary">选择主图</el-button>
              </template>
              <el-button type="success"  @click="imgUpload" 
              :disabled="uploadImgDisable" :loading="uploadImgLoading"> 提交宣传主图</el-button>
            </el-upload>
          </el-form-item> 
            </div>
            <div class="main-right-files">
              <el-upload class="upload"
                 ref="upload"
                 action=""
                 :http-request="upload"
                 :file-list="fileUploadList"	
                 :auto-upload="false"			
                 :on-change="handleChange"	
                 :on-preview="handlePreview"	
                 :on-remove="handleRemove"	
                 :multiple=false
                 >	
                <el-button slot="trigger"
                          type="primary"
                          @click="delFile">选取文件</el-button>
              </el-upload>
              <el-button type="primary" :loading="uploadFileLoading" @click="FileUpload">上传</el-button>
            </div> -->
            <!-- <el-button style="margin-top: 12px;" @click="pre" v-if="active>1" type="primary">上一步</el-button>
            <el-button style="margin-top: 12px;" @click="next" v-if="active<3" type="success">下一步</el-button> -->
        </div>
    </div>

</div>
</template>

<script setup lang="ts" >
import { VueElement, onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules, UploadFile, UploadFiles } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { Edit, Picture, Upload } from '@element-plus/icons-vue'
import type {UploadInstance, UploadProps, UploadUserFile } from 'element-plus'
// import { UploadFilled } from '@element-plus/icons-vue'
import {getTeachers, getTeamInfo} from '@/api/user'
import {getTypeList,getTagList , submitGame, getGameDescByGameName } from '@/api/game'
import axios from 'axios';
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { UserStore } from '@/store/user'
// import type { UploadProps } from 'ant-design-vue';
// import {submitImgFile, submitFile } from '@/api/files'

//步骤条
// let active:number = 1
const active = ref(1)
const router = useRouter()

//教师、类别、标签、团队
const teachers: any = ref([]);
const types: any = ref([])
const tagInfo: any = ref([])
const teams: any = ref([])

onMounted(async() => {
  teachers.value = (await getTeachers()).data
  types.value = (await getTypeList()).data
  tagInfo.value = (await getTagList()).data
  teams.value = (await getTeamInfo()).data
  // console.log(teams, 'teachers')
  // console.log(types, tags )
})

//基本信息
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
interface paramsGame {
  gameName:string,
  gameTitle:string,
  gameDesc:string,
  language:never[],
  set: never[],
  teamId:number | null,
  typeId:number | null,
  tags: never[],
  status:number | null,
  gameMeta:number | null,
  teacherId:number| null
}

const gameInfo = reactive<paramsGame>({
  gameName: '',
  teamId: null,
  typeId: null,
  tags: [],
  gameTitle: '',
  gameDesc: '',
  language: [],
  set: [],
  status: null,
  gameMeta: null,
  teacherId: null,
})


const rules = reactive<FormRules>({
  gameName: [
    { required: true, message: '请输入游戏名称', trigger: 'blur' },
    { min: 3, max: 15, message: 'Length should be 3 to 8', trigger: 'blur' },
  ],
  typeId: [
    {
      required: true,
      message: '请选择游戏类别',
      trigger: 'change',
    },
  ],
  tags: [
    {
      type: 'array',
      required: true,
      message: '请选择游戏标签',
      trigger: 'change',
    },
  ],
  gameTitle:[
    { required: true, message: '请输入不超15字的游戏概要', trigger: 'blur' },
    { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' },
  ],
  gameDesc: [
    { required: true, message: '请输入15-150字的游戏详情', trigger: 'blur' },
    { min: 15, max: 150, message: 'Length should be 15 to 150', trigger: 'blur' },
  ],
  language:[
    {
      type: 'array',
      required: true,
      message: '请选择语言',
      trigger: 'change',
    },
  ],
  set:[
    {
      type: 'array',
      required: true,
      message: '请选择设配系统',
      trigger: 'change',
    },
  ],
  status: [
    {
      required: true,
      message: '',
      trigger: 'change',
    },
  ],
  gameMeta: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  teacherId: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
})

const loading = ref(false);

// let gameId = ref(0)
let gameId :any = ref()
let teamId :any = ref()
const userStore = UserStore();
const username = ref(userStore.username)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
  ElMessageBox.confirm(
    '提交后不可修改！！是否确认提交？',
    'Warning',
    {
      confirmButtonText: 'yes',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      ElMessage({
        type: 'success',
        message: '提交成功！',
      })
      if (valid) {
        console.log(gameInfo, 'submit!')
        // gameName.value = gameInfo.gameName
        // console.log(gameName.value,'gameName')
        const gameName: string = gameInfo.gameName
        loading.value = true;
          try {
            const newTag = gameInfo.tags.join(",")
            const newLanguage = gameInfo.language.join(",")
            const newSet = gameInfo.set.join(",")
            // console.log(newTag, 'newTag')
            Reflect.set(gameInfo,'newTag', newTag);
            Reflect.set(gameInfo,'newLanguage', newLanguage);
            Reflect.set(gameInfo,'newSet', newSet);
            Reflect.set(gameInfo,'username', username);
            console.log(gameInfo, 'gameInfo')
            const result:any = await submitGame(gameInfo)
            if(result.code !== 200){
              // ElMessage({
              //   type: 'warning',
              //   message: result.message,
              // })
              console.log(gameName,'gameName')
              const gameDesc = (await getGameDescByGameName(gameName)).data
              console.log(gameDesc,'gameDesc')
              gameId.value = gameDesc.id
              teamId.value = gameDesc.teamId
              console.log(gameId.value,teamId.value, 'gameId,teamId')
              active.value+=1
            }
          } catch (error) {
            console.log('error submit!', error)
          }
          loading.value = false;
      } else {
        console.log('error submit!', fields)
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '提交失败！',
      })
    })
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

//上传下载文件
const uploadRef = ref<UploadInstance>()
const fileList:any = ref([])
// const fileUploadList:any = ref([])
const uploadFileLoading =ref(false)
// let fileType = ref('2')

const  beforeUpload= (uploadFile:UploadFile,_uploadFiles:UploadFiles)=> {
  const type = ['image/png','image/jpg','image/jpeg','application/x-zip-compressed'];
  const extFileName:string = uploadFile.raw?.type as string;
  const extFileSize:Number = uploadFile.raw?.size as Number;
  console.log(uploadFile.raw, '上传文件')
  if(type.indexOf(extFileName) === -1){
    ElMessage({
      type:'warning',
      message:'不符合此类型上传文件',
    })
    uploadRef.value!.clearFiles()
    return false;
  }else if(((extFileSize / 1024 /1024) >10) ) {
    ElMessage({
      type:'warning',
      message:'文件大小不能大于10mb',
    })
    uploadRef.value!.clearFiles()
    return false;
  }else{
    // imageSrc2.value = window.URL.createObjectURL(uploadFile.raw as Blob)
    // fileList.value = uploadFile.raw;
    fileList.value = [...fileList.value, uploadFile.raw];
    // fileList.value.uid = Date.now(); // 设置uid为当前时间戳
    console.log(fileList.value, 'fileList') 
  }
}
//上传文件
const FileUpload = async() => {
    const formData = new FormData();
    fileList.value.forEach((file: any, index: any)=>{
      formData.append('files['+index+']', file)
      formData.append('gameId',gameId.value)
      formData.append('teamId',teamId.value)
      // formData.append("pid",'4545554545')
    })
    uploadFileLoading.value = true;
    //FormData.entries() 方法返回一个 iterator对象 ，此对象可以遍历访问FormData中的键值对。其中键值对的key是一个 USVString 对象；value是一个 USVString , 或者 Blob对象。
    for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    axios.defaults.baseURL='http://127.0.0.1:7001';
    axios({
        method: 'post',
        url: '/api/files/upload',
        data: formData,
        headers: { "Content-Type": "multipart/form-data"}
    }).then(({data}) => {
        // imageSrc2.value = data.data.info[0]
        console.log(data)
        ElMessage({
          message: '提交成功!请等待指导老师审核！',
          type: 'success',
        })
        router.push({
          path:'/'
        })
    }).catch((err) =>{
        console.log(err)
    }).finally(() =>{
        console.log("upload is over")
        uploadFileLoading.value = false;
    })

}


//上传主图
// const upload = ref<UploadInstance>()
// const imageUrl = ref('')
// const files:any = ref()

// const uploadImgDisable = ref(true)
// const uploadImgLoading =ref(false)

//上传
// const imgCode: any= ref()
// const handleImgChange=(uploadFile:UploadFile,_uploadFiles:UploadFiles)=>{
//   const type = ['image/png','image/jpg','image/jpeg'];
//   const extFileName:string = uploadFile.raw?.type as string;
//   const extFileSize:Number = uploadFile.raw?.size as Number;
//   console.log(uploadFile.raw, '上传图片')
//   if(type.indexOf(extFileName) === -1){
//     ElMessage({
//       type:'warning',
//       message:'文件类型必须是PNG/jpg图片文件',
//     })
//     upload.value!.clearFiles()
//     return false;
//   }else if(extFileSize > 1500000){
//     ElMessage({
//       type:'warning',
//       message:'文件大小不能大于1500k',
//     })
//     upload.value!.clearFiles()
//     return false;
//   }
//   imageUrl.value = window.URL.createObjectURL(uploadFile.raw as Blob)
//   files.value = uploadFile.raw;

//   // var reader = new FileReader()
//   // reader.readAsDataURL(files.value);
//   // reader.onload = function(event) {
//   //   imgCode.value = event.target?.result;
//   //   console.log(imgCode.value,'imgCode.value')
//   // }
//   console.log(files.value,'files.value')
//   uploadImgDisable.value = false;
//   upload.value!.clearFiles()
// }



// // const formImgData: any = ref([])
// let fileImgType = ref('1')
// const imgUpload = async()=>{
//   console.log('fileImg',files.value)//带有base64格式的图片存入文件夹中
//   let formImgData = new FormData();
//   // console.log(gameId.id,imgCode.value,'gameId2+imgCode')
//   formImgData.append('fileImg',files.value);
//   formImgData.append('id',gameId.id);
//   formImgData.append('fileImgType',fileImgType.value);
//   // console.log(formImgData,'formImgData')
//   // Reflect.set(formImgData,'id', gameId.id);
//   // Reflect.set(formImgData,'imgCode', imgCode.value);
//   // Reflect.set(formImgData,'files', files.value);
//   console.log(formImgData, 'formImgData')
//   uploadImgLoading.value = true;
//   try{
//       console.log(formImgData,'formImgData')
//       const code:any = await submitImgFile(formImgData);
//       // console.log(uploadImageResult.success,'上传成功')
//       if(code==200){
//         imageUrl.value ='';
//         uploadImgDisable.value=true;
//         ElMessage({
//           type:'info',
//           message:'上传图片成功',
//         })
//                   // getShopPic();
//       }else{
//         ElMessage({
//           type:'warning',
//           message:'上传图片失败',
//         })
//       }
//       uploadImgLoading.value = false;
//   }catch(error){
//       uploadImgLoading.value = false;
//       console.log(error)
//       ElMessage({
//         type:'warning',
//         message:'上传商品图片失败',
//       })
//   }
// }

// //上传文件
// // const uploadRef = ref<UploadInstance>()
// const fileList:any = ref([])
// const fileUploadList:any = ref([])
// const uploadFileLoading =ref(false)
// let fileType = ref('2')
// //点击上传文件触发的额外事件,清空fileList
// const  delFile= ()=> {
//       fileList.value = [];
// }
// const  handleChange= (fileUploadList: any)=> {
//   fileList.value = fileUploadList;
//   console.log(fileList.value, "sb");
// }
// //上传文件
// const FileUpload = async() => {
//   let formFileData = new FormData();
//   // console.log(fileList.value.raw,'fileList[0].raw')
//   // console.log(gameId.id,fileType.value,'gameid+fileType')
//   formFileData.append("file", fileList.value.raw);//拿到存在fileList的文件存放到formFileData中
//   //下面数据是我自己设置的数据,可自行添加数据到formFileData(使用键值对方式存储)
//   formFileData.append("gameId", gameId.id);
//   formFileData.append("fileType", fileType.value);
//   console.log(formFileData,'formFileData')
//   try{
//     const code:any = await submitFile(formFileData);
//     console.log(code,'code')
//     if(code==200){
//         imageUrl.value ='';
//         uploadFileLoading.value=true;
//         ElMessage({
//           type:'info',
//           message:'上传压缩包成功',
//         })
//                   // getShopPic();
//       }else{
//         ElMessage({
//           type:'warning',
//           message:'上传压缩包失败',
//         })
//       }
//       uploadFileLoading.value=false;
//   }catch(error){
//     uploadFileLoading.value=false;
//     console.log(error, '上传文件失败!')
//   }
// }

// console.log(fileList,'fileList')

 //自定义上传文件
// const  uploadFile =(file:any)=> {
//   let formData = new FormData();
//   formData.append("file", file.file);
//   console.log(file.file, "sb2");
// }
 //删除文件
// const  handleRemove = (file: any,fileList: any)=> {
//       console.log(file, fileList);
// }
 // 点击文件
// const handlePreview= (file:any) =>{
//       console.log(file);
// }

//上传图片列表
// const imgList = ref<UploadUserFile[]>([])

// const dialogImageUrl = ref('')
// const dialogVisible = ref(false)

// const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
//   console.log(uploadFile, uploadFiles)
// }

// const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
//   dialogImageUrl.value = uploadFile.url!
//   dialogVisible.value = true
// }

// const statusFormatter=(row:any)=>{
//   if(row.status==)
// }
</script>

<style scoped>
.main{
    /* border: 1px solid silver ; */
    /* background-color:silver ; */
    /* margin: 8px;
    padding: 10px; */
    width: 95%;
    /* height: 700px; */
    margin: 10px;
    /* display: flex; */
}


.team-form{
  border: 1px solid silver;
  margin: 8px;
  padding: 10px;
}

.main-info{
    border: 1px solid silver;
    /* width: 95%; */
    /* height: 400px; */
    display: flex;
    margin: 8px;
    padding: 10px;
    color:#8c939d
}
.main-info-left{
    border: 1px solid rgb(228, 228, 228);
    background-color: rgb(247, 246, 246);
    width: 96%;
    /* height: 370px; */
    /* display: flex; */
    margin: 15px;
    padding: 15px;
}
.main-left-title{
    /* width: 95%; */
    border: 1px solid silver;
    text-align: left;
    color: black;
    height: 30px;
    margin: 5px;
    padding: 5px;
    font-weight: 600;
    font-size: 20px;
}
.main-left-form{
    border: 1px solid silver;
    margin: 5px;
    padding: 5px;
}
.main-info-right{
    border: 1px solid rgb(228, 228, 228);
    background-color: rgb(247, 246, 246);
    width: 55%;
    width: 96%;
    /* height: 350px; */
    /* display: flex; */
    margin: 5px;
    padding: 5px;
}
.main-right-title{
    width: 95%;
    border: 1px solid silver;
    color: black;
    text-align: left;
    height: 30px;
    margin: 5px;
    padding: 5px;
    font-weight: 600;
    font-size: 20px;
}
.upload-demo{
  margin: 5px;
  padding: 5px;
}
.main-right-img{
    border: 1px solid silver;
    margin: 10px;
    padding: 8px;

}
/* 上传主图样式 */
/* .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.main-right-files{
  border: 1px solid silver;
    margin: 5px;
    padding: 5px;
}

.main-images{
    border: 1px solid rgb(228, 228, 228);
    background-color: rgb(247, 246, 246);
    margin: 8px;
    padding: 10px;
}
.main-images-title{
    color: black;
    border: 1px solid silver;
    text-align: left;
    height: 30px;
    margin: 5px;
    padding: 5px;
    font-weight: 600;
    font-size: 20px;
}
.main-images-imgList{
  border: 1px solid silver;
  margin: 5px;
  padding: 5px;
} */
.main-button{
  border: 1px solid silver;
  /* background-color: rgb(247, 246, 246); */
  margin: 8px;
  padding: 10px;
}
.main-button-item{
  text-align: center;
  /* border: 1px solid silver; */
  /* margin: 5px;
  padding: 5px; */
  /* margin-left: 45%; */
}
</style>