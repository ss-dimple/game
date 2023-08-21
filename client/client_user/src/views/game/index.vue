<template>
<div class="main">
  <div class="header-menu">
    <Hometop>
      <Sidebar></Sidebar> 
    </Hometop>
  </div>
    <div class="common-layout">
      <el-container  v-for="item in gameInfo">
        <el-header >
          <div class="header-left">
            <!-- <el-image style="width: 100px; height: 100px" src="../../../public/images/精品-1.jpg" fit="cover" /> -->
            <div class="header-left-img">
              <img :src="imageList[0]" alt="" fit="fill" >
            </div>
          </div>
          <div class="header-right">
            <div class="header-right-name">{{item.gameName}}</div>
            <div class="header-right-tag">
              <el-button type="info" plain text bg>
                {{item.tags}}
              </el-button>
              <!-- <el-button type="info" plain text bg>
                ARPG<el-icon class="el-icon--right" ><ArrowRight/></el-icon>
              </el-button> -->
            </div>
            <!-- <div class="header-right-desc"> -->
              <div class="header-right-title">{{item.gameTitle}}</div>
              <div class="header-right-team">创作团队：啊对对小组</div>
            <!-- </div> -->
            <div class="header-right-button">
              <el-button type="primary" plain style="width: 644px; height: 45px;"  @click="handleDownloadFile">点击下载</el-button>
            </div>
          </div>
        </el-header>
        <el-container class="middle-layout">
          <el-container>
            <el-main>
              <div class="main-desc">
                <div class="main-desc-title">游戏详情</div>
                <div class="main-desc-info">
                  <!-- 《艾尔登法环》是一款以正统黑暗奇幻世界为舞台的动作RPG游戏。走进辽阔的场景与地下迷宫探索未知，挑战困难重重的险境，享受克服困境时的成就感吧。不仅如此，登场角色之间的利害关系谱成的群像剧，更是不容错过。充满刺激的辽阔世界
无缝连接的辽阔世界──尽情探索状况多变的开放场景，构造复杂、立体的巨大地下迷宫。(小于150字) -->
{{item.gameDesc}}
                </div>
              </div>
              <div class="main-images">
                <div class="main-images-title">图片</div>
                <div class="main-images-item">
                  <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="i in imageList" :key="i">
                      <img :src="i" alt="" fit="fill" >
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
            </el-main>
            <el-aside width="200px">
              <div class="aside-info">
                <div class="aside-info-title">游戏信息</div>
                <div class="aside-info-main">
                  <div class="aside-main-one">
                    <span>适配系统：</span>
                    <span>{{item.set}}</span>
                  </div>
                  <div class="aside-main-two">
                    <span>语言：</span>
                    <span>{{item.language}}</span>
                  </div>
                </div>
              </div>
              <div class="aside-bank">
                <div class="aside-bank-title">排行榜</div>
              </div>
            </el-aside>
          </el-container>
          <el-footer>
            <div class="footer-comment">
              <div class="footer-comment-info">
                <div class="footer-comment-title">评价</div>
                <div class="footer-comment-grade">
                  <div class="footer-grade-star">
                    <p>{{item.avg }} </p>
                    <!-- <el-rate
                    size="large"
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}分"
                    /> -->
                  </div>
                  <div class="footer-grade-button">
                    <el-button type="danger" @click="onAddComment" >写评价</el-button>
                  </div>
                </div>
              </div>
              <div class="footer-comment-list" v-for="comment in commentInfo">
                <div class="footer-comment-item">
                  <div class="footer-item-left">
                    <div class="footer-left-avatar">
                      <el-avatar
                      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                      width="48px" height="48px"
                      />
                    </div>
                  </div>
                  <div class="footer-item-right">
                    <div class=" footer-right-name">{{ comment.userno }}</div>
                    <div class="footer-right-desc">
                      <span>{{ comment.commentContent }}</span>
                    </div>
                    <div class="footer-right-more">
                      <!-- new Data()获取系统当前时间-->
                      <div class="footer-more-time">{{format(new Date(comment.commentTime), 'yyyy-MM-dd')}}</div>
                      <div class="footer-more-button">
                        <!-- <div class="footer-button-support flex-h" @click="handleClick" :class="isUp?'check':''">
                          <div class="footer-support-img" :class="isUp?'support-img-check':''">
                            <img v-if="isUp" src="../../../public/images/support2.png" alt="" width="50px" height="50px">
                            <img  src="../../../public/images/support1.png" alt="" width="50px" height="50px">
                          </div>
                        </div>
                        <div class="footer-support-num">{{ support }}</div> -->
                      </div>
                    </div>
                  </div>
                  <div class="footer-clear-fix"></div>
                </div>
              </div>
              <div class="footer-comment-more">
                <el-button plain @click="onsubmit">
                  点击更多<el-icon><ArrowRight /></el-icon>
                </el-button>
              </div>
            </div>
          </el-footer>
        </el-container>
      </el-container>
      <el-backtop :right="20" :bottom="100" style="width:80px;height:80px" >
        <el-icon size="70px" color="gray"><ArrowUp /></el-icon>
   </el-backtop>
  </div>
</div>

<addComment :addCommentShow="addCommentShow"   @closeAddComment="closeAddComment" @addComemntComplete="onsubmit"></addComment>
</template>

<script lang="ts" setup>
import Hometop from '../../Layout/components/Hometop.vue'
import Sidebar from '../../Layout/components/Sidebar.vue'
import {useRouter,useRoute} from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { format } from 'date-fns'
import axios from 'axios';
import { UserStore } from '@/store/user'
import { onMounted, ref, computed } from 'vue'
import {getGameInfoById , getCommentInfoById, getFileNameByGameId, getImageListById, addGameAvg} from '@/api/game'
import { reduceIntegral } from '@/api/user'
import addComment from './compents/addComment.vue'

const route= useRoute()
const gameInfo: any= ref([])
const commentInfo:any = ref([])
let  gameId:any = ref()
const fileName = ref()
const images = ref([])
let length = ref()
// const value =ref(0)
let sum = 0;

onMounted(async() => {
   gameId  = Number(route.params.id)   //接收路径参数
  console.log('接收到参数id:' + gameId) 
  // gameInfo.value = await getGameInfoById(id)
  //通过id获取游戏详情
  gameInfo.value = (await getGameInfoById(gameId)).data
  console.log(gameInfo, 'gameInfo')
  //通过id获取游戏评论
  commentInfo.value = (await getCommentInfoById(gameId)).data
  console.log(commentInfo.value, 'commentInfo')
  length.value = commentInfo.value.length
  console.log(length.value, 'length')
  //获取平均值评分并传入游戏表
  commentInfo.value.forEach((value:any)=>{
    sum += value.commentScore
  })
  console.log(sum, 'sum')
  const value = sum/length.value
  const avg = value.toFixed(1);
  // value.value=avg.toFixed(1)
  const avgInfo:any= ref([])
  Reflect.set(avgInfo,'avg',avg)
  Reflect.set(avgInfo,'gameId',gameId)
  console.log(avgInfo,'avgInfo')
  const result:any = (await addGameAvg(avgInfo)).data
  console.log(result,'avgs')
  //通过id获取游戏压缩包名称
  fileName.value = (await getFileNameByGameId(gameId)).data
  console.log(fileName.value, 'fileName')
  //通过id获取游戏图片名称
  const imageList = await getImageListById(gameId)
  images.value = imageList.data
  console.log(images, 'images')
  handleDownload()
  onsubmit()
})


//写评论
const addCommentShow = ref(false)
 const onAddComment = ()=>{
  addCommentShow.value = true
 }
 const closeAddComment =(v:boolean)=>{
  addCommentShow.value = false
 }

 const onsubmit = async()=>{
  console.log(111)
  // commentInfo.value = (await getCommentInfoById(gameId)).data
 }



const userStore = UserStore()
const username:string = userStore.username
console.log(username,'username')

//下载图片
//下载图片 先根据id查找图片名称 然后再传入后端 一个个下载
const imageSrc = ref<string>('');
const imageList:any = ref([])
  const handleDownload = ()=> {
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
        // G、	fileReader():是一种异步读取文件机制
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
  }
//下载压缩包
const handleDownloadFile = async ()=> {
    //如果需要验证用户，需要先发送普通连接请求验证后再进行下载操作
    //先通过username判断是否是学生用户，找出userId并对其扣积分，再通过游戏id去查找压缩包名称，传入搜索压缩包再下载
    const result:any = await reduceIntegral(username)
    console.log(result,'result')
    const fileType ='2';
    if( result !== 200){
      console.log('开始下载')
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
    } else {
      ElMessage({
        type: 'error',
        message: '下载失败',
      })
    }
  
  }




//点赞
// const isUp = ref(false)
// const support = ref(0)
// const handleClick=()=>{
//   if(isUp.value==false){
//     support.value=support.value+1
//   }else{
//     support.value=support.value-1
//   }
//   isUp.value=!isUp.value
// }


</script>

<style scoped>
.main{
    /* background-color: #1b1d1f; */
    background: linear-gradient(180deg, #1b1d1f 20%, #e8e8e8 40%);
}
.header-menu{
  /* background-color: #1b1d1f; */
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 70px;
  /* margin: 8px;
  padding: 10px; */
}
.common-layout{
    /* border: 1px solid silver ; */
    /* margin: 8px;
    padding: 10px; */
    /* background-color: #f6f6f7; */
    width: 80%;
    margin-left: 10%;
}

header{
    /* border: 1px solid silver; */
    /* width: 100%; */
    height: 370px;
    display: flex;
    margin: 8px;
    padding: 10px;
}
.header-left{
  width: 49%;
  height: 89%;
  /* border: 1px solid silver; */
  margin: 8px;
  padding: 8px;
  position: relative;
}
.header-left-img{
  width: 99%;
  height: 99%;
}

.header-right{
  width: 45%;
  height: 99%;
  /* border: 1px solid silver; */
  margin: 8px;
  padding: 8px;
  position: relative;
}
.header-right-name{
  /* border: 1px solid black; */
  /* font-size: large; */
  font-size: 52px;
  font-weight: 500;
  line-height: 1em;
  margin: 5px;
  padding: 5px;
  color: #ffffff;
}
.header-right-tag{
  margin: 5px;
  padding: 5px;
}
/* .header-right-desc{
  border: 1px solid black; 
  padding: 5px;
   margin: 5px;
} */
.header-right-title{
  font-size: 38px;
  width:100%;
  color: rgb(207, 203, 203);
  margin: 5px;
  padding: 5px;
}
.header-right-team{
  font-size: 28px;
  color: rgb(182, 178, 178);
  /* margin: 5px; */
  margin-left: 5px;
  margin: 5px;
  padding: 5px;
}
.header-right-button{
  margin: 5px;
  font-size: 32px;
  font-weight: 500;
  line-height: 1em;
}
.middle-layout{
    display: flex;
    background-color: rgb(255, 255, 255);
    /* padding: 10px; */
}
aside{
    /* border: 1px solid silver; */
    width: 30%;
    height: 70%;
    margin: 13px;
    padding: 10px;
}
main{
    /* border: 1px solid silver; */
    width: 45%;
    height: 600px;
    margin: 13px;
    padding: 10px;
}
.main-desc{
  height: 140px;
  /* border: 1px solid silver; */
  margin: 8px;
  padding: 8px;
  position: relative;
}
.main-desc-title{
    /* border: 1px solid black; */
    height: 45px;
    text-align: left;
    font-size: large;
    line-height: 40px;
    position: relative;
    padding-left: 11px;
    /* font-family: '正楷'; */
}
.main-desc-title:before{
    background: #024aff;
    content: "";
    height: 40px;
    left: 0;
    position: absolute;
    top: 1px;
    width: 5px;
}
.main-desc-info{
  color: rgb(78, 78, 78);
  font-size: 16px;
  margin: 5px;
}
.main-images{
  height: 370px;
  border: 1px solid silver;
  margin: 8px;
  padding: 8px;
  position: relative;
}
.main-images-title{
  /* border: 1px solid black; */
  height: 45px;
  text-align: left;
  font-size: large;
  line-height: 40px;
  position: relative;
  padding-left: 11px;
    /* font-family: '正楷'; */
}
.main-images-title:before{
    background: #024aff;
    content: "";
    height: 40px;
    left: 0;
    position: absolute;
    top: 1px;
    width: 5px;
}
.main-images-item{
  margin: 5px;
}
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.aside-info{
  /* display: flex; */
  border: 1px solid rgb(239, 220, 198);
  margin: 8px;
  padding: 8px;
  position: relative;
}

.aside-info-title{
  height: 45px;
  text-align: left;
  font-size: large;
  line-height: 40px;
  position: relative;
  padding-left: 11px;
}
.aside-info-title:before{
    background: #024aff;
    content: "";
    height: 40px;
    left: 0;
    position: absolute;
    top: 1px;
    width: 5px;
}
.aside-info-main{
  /* border: 1px solid black; */
  /* padding: 10px; */
  margin-top: 15px;
  display: block;
  /* left: 10px; */
  /* left: 105px; */
  /* position: absolute; */
}
.aside-main-one{
  align-items: flex-start;
  display: flex;
  flex-flow: wrap;
  margin-bottom: 10px;
}
.aside-bank{
  display: flex;
  border: 1px solid bisque;
}

.aside-bank-title{
  height: 45px;
  text-align: left;
  font-size: large;
  line-height: 40px;
  position: relative;
  padding-left: 11px;
}
.aside-bank-title:before{
    background: #024aff;
    content: "";
    height: 40px;
    left: 0;
    position: absolute;
    top: 1px;
    width: 5px;
}

footer{
    border: 1px solid silver;
    width: 99%;
    height: 430px;
    margin: 8px;
    padding: 10px;
    overflow-y: scroll;
}
.footer-comment-info{
  border: 1px solid silver;
  display: flex;
  margin: 8px;
  padding: 10px;
  
  /* position: absolute; */
}
.footer-comment-title{
  height: 45px;
    text-align: left;
    font-size: large;
    line-height: 40px;
    position: relative;
    padding-left: 11px;
}
.footer-comment-title:before{
    background: #024aff;
    content: "";
    height: 40px;
    left: 0;
    position: absolute;
    top: 1px;
    width: 5px;
}
.footer-comment-grade{
  /* border: 1px solid silver; */
  /* margin-right: -100px; */
  /* position: relative; */
  display: flex;
}
.footer-grade-star{
  /* border: 1px solid silver; */
  margin-top: -35px;
  right: 300px;
  position: absolute;
  float: right;
  font-size: 32px;
  font-weight: 900px;
  color: red;
}
.footer-grade-button{
  right: 200px;
  position: absolute;
}

.footer-comment-item{
  position: relative;
  border: 1px solid rgba(0,0,0,.1);
  margin: 8px;
  padding: 8px;
  height: 120px;
}
.footer-item-left{
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 50%;
  box-sizing: border-box;
  float: left;
  height: 48px;
  margin: 0 16px 0 0;
  width: 48px;
}
.footer-left-avatar{
  background: 50%/cover no-repeat;
  border-radius: 50%;
  height: 100%;
  width: 100%;
}
.footer-item-right{
  float: left;
  padding: 0;
  width: calc(100% - 64px);
}
.footer-right-name{
  align-items: center;
    display: flex;
    justify-content: flex-start;
    color: #333;
    font-size: 13px;
    font-weight: 700;
    line-height: 13px;
    margin: 0 6px 0 0;
}
.footer-right-desc{
  font-size: 14px;
    line-height: 22px;
    margin: 12px auto 16px;
    word-break: break-word;
}
.footer-right-more{
  align-items: center;
    display: flex;
    justify-content: space-between;
}
.footer-more-time{
  color: #9195a3;
    font-size: 13px;
    line-height: 13px;
    margin: 0 30px 0 0;
}
.footer-more-button{
  align-items: center;
    display: flex;
    justify-content: flex-end;
}
.footer-clear-fix{
  clear: both;
}
.footer-comment-more{
  text-align: center;
  size: large;
}

</style>