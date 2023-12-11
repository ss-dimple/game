<template>
  <el-dialog v-model="outerVisible"  title="游戏基本信息" size="30%" :before-close="handleClose" >
    <template #default>
      <div class="gameInfo">
        <el-descriptions
          direction="vertical"
          :column="2"
          size="large"
          v-for="item in gameInfo"
          :key="item.id"
          border
        >
          <el-descriptions-item label="游戏名称"> {{item.gameName}}</el-descriptions-item>
          <el-descriptions-item label="团队名"  >{{item.teamName}}</el-descriptions-item>
          <el-descriptions-item label="类别" >{{types[item.typeId]}}</el-descriptions-item>
          <el-descriptions-item label="标签"  >{{item.tags}}</el-descriptions-item>
          <el-descriptions-item label="语言"  >{{item.language}}</el-descriptions-item>
          <el-descriptions-item label="配置"  >{{item.set}}</el-descriptions-item>
          <el-descriptions-item  label="概要" :span="2" >{{item.gameTitle}}</el-descriptions-item>
          <el-descriptions-item  label="简介" :span="2" >{{item.gameDesc}}</el-descriptions-item>
          <el-descriptions-item  label="主图" >
             <el-image style="width: 250px; height: 100px" :src="String(images)" fit="cover"
              :preview-src-list="images" :zoom-rate="1.2"
              :max-scale="9"  :min-scale="0.2"/>
            </el-descriptions-item>
          <el-descriptions-item  label="游戏安装包" >
            <el-button type="primary" plain  @click="zipDownload">点击下载</el-button>
          </el-descriptions-item>
          <el-descriptions-item  label="宣传图" :span="2">
            <div style="flex: auto">
              <el-carousel trigger="click" height="250px">
                <el-carousel-item v-for="i in pictureList" :key="i" >
                  <el-image
                      :width="200"
                      :src="i"
                      
                    />
                </el-carousel-item>
              </el-carousel>
            </div> 
          </el-descriptions-item>

        </el-descriptions>
      </div>
    </template>
    <template v-if="check == '0'" #footer>
      <el-button type="success" @click="checkOver">审核完毕</el-button>
      <el-button type="danger" @click="replyVisible = true" >驳回</el-button>
    </template>

  </el-dialog>

  <el-dialog
    v-model="replyVisible"
    title="确定驳回吗？"
    width="30%"
    :before-close="handleClose"
  >
    <el-input
      v-model="reply"
      :rows="2"
      type="textarea"
      placeholder="驳回理由or建议"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="replyVisible = false">取消</el-button>
        <el-button type="primary" @click="checkReply">
          确定驳回
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>
  
<script lang="ts" setup>
import { ref, toRefs ,toRef,reactive,watch,computed, onMounted} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { getGameInfoById , getPictureListById, getImageNameById,getFileNameByGameId,updateCheck,addRejectInfo} from '@/api/game'
import {getTeamInfo} from '@/api/user'
import { ElMessageBox } from 'element-plus'
import axios from 'axios';
import { Picture } from '@element-plus/icons-vue'

const props = defineProps({
    getGameInfoShow:Boolean,
    drawer:Boolean,
    id:Number
})
// const innerDrawer = ref(false)
const emit = defineEmits(['closeGetGameInfo','GetGameInfoComplete'])


const gameInfo:any = ref([])
const pictureName:any = ref([])
const teams:any=ref([])
const imageName:any = ref()
const fileName = ref()
const check:any = ref()

const rejectInfo:any = ref({})
const replyVisible = ref(false)
const reply = ref('')

watch(
    ()=>props.id,
    async (id:number)=>{
        console.log(id,'gameId')
        //根据id获取游戏信息
        // const gameDesc = await getGameInfoById(id) 
        // gameInfo.value=gameDesc.data
        gameInfo.value = (await getGameInfoById(id)).data
        check.value = gameInfo.value[0].check
        console.log(gameInfo.value, check.value ,'gameInfo')

        //根据id获取宣传图片文件名称
        pictureName.value = (await getPictureListById(id)).data
        console.log(pictureName.value,'imagesname')

        //根据id获取宣传主图文件名称
        imageName.value = (await getImageNameById(id)).data
        console.log(imageName,'主图文件名称');
        
        //根据id获取团队信息
        teams.value = (await getTeamInfo()).data
        console.log(teams.value,'teams')
        // gameId.value=id

        //通过id获取游戏压缩包名称
        const gameId = id
        fileName.value = (await getFileNameByGameId(gameId)).data
        console.log(fileName.value, 'fileName')

        pictureDownload()
        imageDownload()
    },
)


const handleClose = (done: () => void) => {
  ElMessageBox.confirm('暂时不提交审核结果吗？')
    .then(async () => {
      done()
      outerVisible.value = false;
    })
    .catch(() => {
      // catch error
    })
}
const outerVisible = computed({
    get() {
        return props.getGameInfoShow;
    },
    set(v) {
        emit('closeGetGameInfo',"close Add user")
    },
});

//下载图片 先根据id查找宣传图片名称 然后再传入后端 一个个下载
const pictureSrc = ref<string>('');
const pictureList:any = ref([])
  const pictureDownload = ()=> {
    
    // innerDrawer.value = true
    const fileType = '1';
    for(const i in pictureName.value){
      axios.defaults.baseURL='http://127.0.0.1:7001';
      axios({
        method: 'post',
        url: '/api/files/download',
        data: {
          fileName:pictureName.value[i],
          fileType: fileType,
        },
        responseType: 'blob'
      }).then((res)=>{
        console.log(res)
        const { data } = res;
        const reader = new FileReader()
        reader.readAsDataURL(data)
        reader.onload = (ev: any) => {
          pictureSrc.value = ev.target.result
          pictureList.value.push(pictureSrc.value)
          console.log(pictureList.value,'imageList')
        }
      }).catch((error)=>{
        console.log(error)
      })
    }
  }

//根据主图名称下载主图
const imageSrc = ref<string>('');
const images:any = ref([])
  const imageDownload = ()=> {    
    // innerDrawer.value = true
    const fileType = '3';
    for(const i in imageName.value){
      axios.defaults.baseURL='http://127.0.0.1:7001';
      axios({
        method: 'post',
        url: '/api/files/download',
        data: {
          fileName:imageName.value[i],
          fileType: fileType,
        },
        responseType: 'blob'
      }).then((res)=>{
        console.log(res)
        const { data } = res;
        const reader = new FileReader()
        reader.readAsDataURL(data)
        reader.onload = (ev: any) => {
          imageSrc.value = ev.target.result
          images.value.push(imageSrc.value)
          console.log(images.value,'主图')
        }
      }).catch((error)=>{
        console.log(error)
      })
    }
  }

  //根据游戏名下载压缩包
const zipDownload = async ()=> {
    const fileType ='2';
      axios.defaults.baseURL='http://127.0.0.1:7001';
      axios({
        method: 'post',
        url: '/api/files/download',
        data: {
          fileType: fileType,
          fileName: fileName.value.toString()
        },
        responseType: 'blob'
      }).then((res)=>{
        console.log(res)
        const { data, headers, status } = res;
        if(status == 200){
          const fileName = headers['content-disposition'].replace(/\w+;filename=(.*)/, '$1')
          console.log('filename =',fileName);
          const blob = new Blob([data], {type: headers['content-type']})
          //createElement（）再对象中创建一个对象
          let link = document.createElement('a')
          //createObjectURL（）是Url的一个静态方法，使用之后会将后端返回的文件数据解析编码成一个blob的链接，再通过appendChild将filename这个节点添加到url上，
          //然后使我们点击下载时会得到一个url，作为压缩包的下载链接，可以获取到指定文件的完整内容。
          let url = window.URL.createObjectURL(blob)
          link.href = url
          //setAttribute()方法只能通过元素节点对象调用的函数
          link.setAttribute('download',fileName)
          //appendChild()节点的子节点列表末添加新的子节点
          document.body.appendChild(link)
          link.click();
          //removeChild()节点的子节点列表末移除新的子节点
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }else{
          console.log('error')
        }
      }).catch((error)=>{
        console.log(error)
      })
    }
  
    const checkInfo:any =ref({})
    const  checkOver = async()=>{
    //通过游戏id传入审核值 1 修改游戏状态为 已审核 
      Reflect.set(checkInfo.value,'check', 1)
      Reflect.set(checkInfo.value,'gameId', Number(props.id))
      console.log(checkInfo.value,'check');
      
      const result = await updateCheck(checkInfo.value)
      console.log(result, '已审核')
      outerVisible.value = false;
   }
  
   const checkReply = async() =>{
      //通过游戏id传入审核值 2 修改游戏状态为 已驳回  并将游戏id 教师id 上传者昵称 回复语传入reject表中
      Reflect.set(checkInfo.value,'check', 2)
      Reflect.set(checkInfo.value,'gameId', Number(props.id))
      const result = await updateCheck(checkInfo.value)
      console.log(result, '已驳回')

      const gameId = gameInfo.value[0].id
      const teacherId = gameInfo.value[0].teacherId
      const username = gameInfo.value[0].username
      Reflect.set(rejectInfo.value,'gameId', gameId)
      Reflect.set(rejectInfo.value,'teacherId', teacherId)
      Reflect.set(rejectInfo.value,'username', username)
      Reflect.set(rejectInfo.value,'reply', reply.value)
      console.log(rejectInfo.value,'rejectInfo');
      const reject = await addRejectInfo(rejectInfo.value)
      console.log(reject,'reject');
           
      replyVisible.value = false
      outerVisible.value = false;
   }


    
    // const submitAddType = async()=>{
    //     addTypeLoading.value = true;
    //     try {
    //         const addResult:any = await addType(ruleForm); 
    //         console.log("addResult",addResult)
    //         addTypeLoading.value = false;
    //         if(addResult.code == 200){
    //             console.log("addResult",addResult)
    //             emit('GetGameInfoComplete');
    //             outerVisible.value = false;
    //             resetForm(ruleFormRef.value)
    //         }else{
    //             showInfoBox(addResult.message)
    //         }
            
    //     } catch (error) {
    //         console.log(error);
    //         addTypeLoading.value = false;
    //     }
    // }
  //   const typeIdFormatter=(row:any)=>{
  //     if(row.typeId == 1){
  //         return "单机游戏"
  //     }else if(row.typeId == 2){
  //         return "网络游戏"
  //     }else if(row.typeId == 3){
  //         return "小游戏"
  //     }else if(row.typeId == 4){
  //         return "网页游戏"
  //     }
  //     return ""
  // }
  const types: Record<number, string> ={
    1:'单机游戏',
    2:'网络游戏',
    3:'小游戏',
    4:'网页游戏',
  }
  const teamDict:Record<any, string> = {id: teams.value.id , value:teams.value.teamName}

  </script>
  <style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
    }

    #footer{
      padding: 10px;
      margin: 10px;
      text-align: center;
    }


  </style>