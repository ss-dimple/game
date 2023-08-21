<template>
  <el-drawer v-model="outerVisible"  title="游戏基本信息" size="30%" :before-close="handleClose" >
    <template #default>
      <div class="gameInfo">
        <!-- <el-table :data="gameInfo" border stripe style="width: 100%" >
          <el-table-column  prop="gameName" label="游戏名" />
          <el-table-column  prop="typeId" label="游戏类型" :formatter="typeIdFormatter" />
          <el-table-column  prop="gameTitle" label="游戏简介" />
          <el-table-column  prop="gameTitle" label="游戏简介" />
          <el-table-column  prop="gameTitle" label="游戏简介" />
        </el-table> -->
        <el-descriptions
          direction="vertical"
          :column="2"
          size="large"
          v-for="item in gameInfo"
          :key="item.id"
          border
        >
          <el-descriptions-item label="游戏名称"> {{item.gameName}}</el-descriptions-item>
          <el-descriptions-item label="团队名"  >{{teamDict[item.teamId]}}</el-descriptions-item>
          <el-descriptions-item label="类别" >{{types[item.typeId]}}</el-descriptions-item>
          <el-descriptions-item label="标签"  >{{item.tags}}</el-descriptions-item>
          <el-descriptions-item label="语言"  >{{item.language}}</el-descriptions-item>
          <el-descriptions-item label="配置"  >{{item.set}}</el-descriptions-item>
          <el-descriptions-item  label="概要" :span="2" >{{item.gameTitle}}</el-descriptions-item>
          <el-descriptions-item  label="简介" :span="2" >{{item.gameDesc}}</el-descriptions-item>
        </el-descriptions>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button  @click="handleDownload" >查看图片</el-button>
          <el-drawer
          v-model="innerDrawer"
          title="游戏宣传图"
          :append-to-body="true"                       
          >
            <template #default>
              <!-- 下载图片 -->
              <el-image
                :width="200"
                v-for="i in imageList"
                :src="i"
              />
            </template>
          </el-drawer>
      </div>
    </template>
  </el-drawer>
</template>
  
<script lang="ts" setup>
import { ref, toRefs ,toRef,reactive,watch,computed, onMounted} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { getGameInfoById , getImageListById, updateConditionById } from '@/api/game'
import {getTeamInfo} from '@/api/user'
import { ElMessageBox } from 'element-plus'
import axios from 'axios';

const props = defineProps({
    getGameInfoShow:Boolean,
    drawer:Boolean,
    id:Number
})
const innerDrawer = ref(false)
const emit = defineEmits(['closeGetGameInfo','GetGameInfoComplete'])

const gameId = ref(0)
const gameInfo:any = ref([])
const images:any = ref([])
const teams:any=ref([])
watch(
    ()=>props.id,
    async (id:number)=>{
        console.log(id,'gameId')
        //根据id获取游戏信息
        const result = await getGameInfoById(id) 
        console.log(result, 'result') 
        gameInfo.value=result.data
        console.log(gameInfo.value, 'gameInfo')
        //根据id获取图片文件名称
        const imageList = await getImageListById(id)
        images.value = imageList.data
        console.log(images.value,'images')
        //根据id获取团队信息
        const teamInfo = await getTeamInfo()
        teams.value = teamInfo.data
        console.log(teams.value,'teams')
        // gameId.value=id
    },
)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您已审核完毕吗？')
    .then(async () => {
      done()
      //通过游戏id将游戏审核的状态改为已审核
      const result = await updateConditionById(props.id)
      console.log(result, 'result')
      outerVisible.value = false;
    })
    .catch(() => {
      // catch error
    })
}
const outerVisible = computed({
    get() {
        return props.drawer;
    },
    set(v) {
        emit('closeGetGameInfo',"close Add user")
    },
});

//下载图片 先根据id查找图片名称 然后再传入后端 一个个下载
const imageSrc = ref<string>('');
const imageList:any = ref([])
  const handleDownload = ()=> {
    innerDrawer.value = true
    const fileType = '1';
    for(const i in images.value){
      axios.defaults.baseURL='http://127.0.0.1:7001';
      axios({
        method: 'post',
        url: '/api/files/download',
        data: {
          fileName:images.value[i],
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
          imageList.value.push(imageSrc.value)
          console.log(imageList.value,'imageList')
        }
      }).catch((error)=>{
        console.log(error)
      })
    }

    // const formData = new FormData();
    // images.value.forEach((item:any,index:any)=>{
    //   formData.append('filename['+index+']',item)
    // })

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    // axios.defaults.baseURL='http://127.0.0.1:7001';
    // axios({
    //   method: 'post',
    //   url: '/api/files/download',
    //   // data: {
    //   //   userid:'1111111',
    //   //   fileName:'p1.jpg',
    //   // },
    //   data: formData,
    //   responseType: 'blob'
    // }).then((res)=>{
    //   console.log(res,'res')
    //   const { data } = res;
    //   const reader = new FileReader()
    //   reader.readAsDataURL(data)
    //   reader.onload = (ev: any) => {
    //     imageSrc.value = ev.target.result
    //     imageList.value.push(imageSrc.value)
    //   }
    //   console.log(imageList,'imageList')
    // }).catch((error)=>{
    //   console.log(error)
    // })
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
  const teamDict:Record<any, string>={id: teams.value.id,value:teams.value.teamName,}


  // const teams: Record<number, string>={

  // }
  </script>
  <style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
    }

  </style>