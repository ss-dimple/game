
<template>
  <div class="main">
    <el-tabs :tab-position="tabPosition"  class="slider-tabs">
      <el-tab-pane label="我的团队" class="main-team" >
        <!-- <div class="team-top">
          <h3>团队信息</h3>
          <template #extra>
          <el-button type="primary" @click="onAddTeam">创建团队</el-button>
        </template>
        </div> -->
        <div class="team-top">
            <div class="team-top-title" ><h2>团队信息</h2></div>
            <div class="team-top-btu">
              <!-- <el-button size="large" type="primary" @click="onNewSearch">查询</el-button> -->
              <el-button size="large" type="primary" @click="onAddTeam">创建团队</el-button>
            </div>
        </div>
        <el-descriptions
          class="margin-top"
          :column="3"
          border
          v-for="item in teamInfo"
        >
        <!-- <template #extra>
          <el-button type="primary" @click="onAddTeam">创建团队</el-button>
        </template> -->
        <el-descriptions-item width="140px">
          <template #label>
            <div class="cell-item">
              团队名称
            </div>
          </template>
          {{item.teamName}}
        </el-descriptions-item>
        <el-descriptions-item width="140px">
          <template #label>
            <div class="cell-item">
              指导老师
            </div>
          </template>
          {{item.teacherId}}
        </el-descriptions-item>
        <el-descriptions-item >
          <template #label>
            <div class="cell-item">
              团队介绍
            </div>
          </template>
          {{item.teamInfo}}
        </el-descriptions-item>
        <el-descriptions-item >
          <template #label>
            <div class="cell-item">
              队长姓名
            </div>
          </template>
          {{item.player0Name}}
        </el-descriptions-item>
        <el-descriptions-item >
          <template #label>
            <div class="cell-item">
              队长学号
            </div>
          </template>
          {{item.player0Id}}
        </el-descriptions-item>
        <el-descriptions-item >
          <template #label>
            <div class="cell-item">
              队长职责
            </div>
          </template>
          {{item.player0Work}}
        </el-descriptions-item>
        <el-descriptions-item >
          <template #label>
            <div class="cell-item">
              队员姓名
            </div>
          </template>
          {{item.player1Name}}
        </el-descriptions-item>
        <el-descriptions-item >
          <template #label>
            <div class="cell-item">
              队员学号
            </div>
          </template>
          {{item.player1Id}}
        </el-descriptions-item>
        <el-descriptions-item >
          <template #label>
            <div class="cell-item">
              队员职责
            </div>
          </template>
          {{item.player1Work}}
        </el-descriptions-item>
      </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="我的上传">
        <div class="upload-item" v-for="item in gameInfo" :key="item">
            <div class="upload-item-img">
                <img src="../../../public/images/精品-1.jpg" alt="" >
                <!-- <el-image src="../../../public/images/精品-1.jpg" /> -->
            </div>
            <div class="upload-item-desc">
                <div class="upload-desc-top">
                  <span class="upload-top-title">{{item.gameName}}</span>
                  <!-- <div class="upload-top-tag" v-for="i in item.tags ">
                    <el-tag class="upload-top-tag" type="info">{{ i }}</el-tag>
                  </div> -->
                  <!-- <el-tag class="upload-top-tag" type="info">i</el-tag> -->
                  <el-tag class="upload-top-tag" type="info">{{ item.tags }}</el-tag>
                </div>
                <div class="upload-desc-middle">
                  <span>{{item.gameTitle}}</span>
                </div>
                <div class="upload-desc-bottom">
                  <div class="upload-bottom-date">
                    <span>2022-02-25</span>
                  </div>
                  <el-divider direction="vertical" style="height: 40px;"/>
                  <div class="upload-bottom-star">
                    <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                    />
                  </div>
                </div>
            </div>
            <div class="upload-item-button">
              <el-button class="upload-buttom-button1"  round>查看详情</el-button>
              <el-button-group class="upload-buttom-button2" >
                <el-button size="large" :icon="View" circle @click="button1" />
                <el-button size="large" :icon="Hide" circle @click="button2" />
                <el-button size="large" type="danger" :icon="Delete" circle />
              </el-button-group>
              
            </div>      
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的下载">
        <div class="upload-item">
            <div class="upload-item-img">
                <img src="../../../public/images/精品-1.jpg" alt="" >
                <!-- <el-image src="../../../public/images/精品-1.jpg" /> -->
            </div>
            <div class="upload-item-desc">
                <div class="upload-desc-top">
                  <span class="upload-top-title">艾尔登法环</span>
                  <el-tag class="upload-top-tag" type="info">ARPG</el-tag>
                  <el-tag class="upload-top-tag" type="info">角色扮演</el-tag>
                </div>
                <div class="upload-desc-middle">
                  <span>享受克服困境时的成就感吧</span>
                </div>
                <div class="upload-desc-bottom">
                  <div class="upload-bottom-date">
                    <span>2022-02-25</span>
                  </div>
                  <el-divider direction="vertical" style="height: 40px;"/>
                  <div class="upload-bottom-star">
                    <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value} 分"
                    />
                  </div>
                </div>
            </div>
            <div class="upload-item-button">
              <el-progress type="circle" :percentage="100" status="success" />
            </div>      
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的评价">
        <div class="comment-item">
          <div class="comment-item-left">
            <div class="comment-left-content">
              <span>就是我买了这个游戏但它没自动给我下载，我以为它会自动下载的，然后我不知道该怎么整了，谁能跟我说一下？怎么才能玩？</span>
            </div>
            <div class="comment-left-date">
              <span>2023/03/27</span>
            </div>
          </div>
          <div class="comment-item-right">
            <div class="comment-right-button">
              <el-button type='' text='plain' size="large" >
                去详情<el-icon class="el-icon--right"><DArrowRight /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>    
  </div>
  <addTeam :addTeamShow="addTeamShow" @closeAddTeam="closeAddTeam" @addTeamComplete="onSubmit"></addTeam>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import {
  View,
  Delete,
  Hide,
} from '@element-plus/icons-vue'
  import type { TabsPaneContext } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { getTeamInfoByUserno, getGameInfoInfoByUsername } from '@/api/user'
  import { UserStore } from '@/store/user'
  import  addTeam from './compents/addTeam.vue'
  //侧边导航
  const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
  const tabPosition = ref('left')

  //我的团队
  const userStore = UserStore();
  const username = ref(userStore.username)
  const userno = ref(userStore.userno)
  const teamInfo: any = ref([])
  const gameInfo: any = ref([])
  // const onNewSearch = ()=>{
  //   onSubmit()
  // }
  onMounted(async()=>{
    onSubmit()
  })

  const onSubmit = async() =>{
    try{
      //通过当前账户id查找所在团队信息
      teamInfo.value = (await getTeamInfoByUserno(userno.value)).data
      //通过当前账户姓名查找出上传的游戏
      gameInfo.value = (await getGameInfoInfoByUsername(username.value)).data
      console.log(gameInfo, 'gameInfo')
      //通过当前账户id查找出评论列表
    }catch(error){
      console.log(error)
    }
  }

  //创建团队
  const addTeamShow = ref(false)
  const onAddTeam = () =>{
    addTeamShow.value =true
  }
  const closeAddTeam = (v: boolean) =>{
    addTeamShow.value =false;
  }
  
  //评论
  const value = ref(3.7) //页面静态评分

  //作品操作
  const button1 = () => {
    ElMessage({
      message: '您已公开作品！',
      type: 'warning',
    })
  }
  const button2 = () => {
    ElMessage({
      message: '您已私密作品！',
      type: 'warning',
    })
  }


  </script>
  
  <style>

/* 
  .main{
    background: linear-gradient(180deg, #1b1d1f, #FFF 500px);
    
  } */
  .demo-tabs > .el-tabs__content {
    padding: 10px;
    color: #6b778c;
    /* font-size: 32px; */
    /* font-weight: 600; */
  }
  
  .el-tabs--right .el-tabs__content,
  .el-tabs--left .el-tabs__content {
    height: 100%;
  }
  .slider-tabs {
    /* border: 1px solid silver ; */
    background-color:silver ;
    box-shadow: inset;
    /* color: #fff; */
    margin: 8px;
    padding: 8px;
    height: 580px;
  }
  .main-team{
    overflow-y: scroll;
    height: 580px;
  }

  .team-top{
    display: flex;
    margin-top: 10px;
    /* border: 1px solid black; */
    align-items: center;
    justify-content: space-between;
  }

  .team-top-title{
    text-align: left;
    position: relative;
    padding-left: 11px;
  }

  .team-top-btu{
    cursor:pointer;
    right: 150px;
    position: absolute;
  }

  .el-descriptions {
    margin-top: 10px;
  }
  .el-descriptions__label.el-descriptions__cell.is-bordered-label{
    width: 140px;
  }
 .cell-item {
    display: flex;
    align-items: center;
  }
  .margin-top {
    margin-top: 20px;
    width: 95%;
  }

  .game-tabs{
    /* border: 1px solid black; */
    margin: 8px;
    padding: 8px;
    height: 500px;
  }
  .empty{
    /* border: 1px solid black; */
    margin-top: 80px;
  }
  .upload-item{
    border: 1px solid silver;
    height: 170px;
    margin: 8px;
    padding: 8px;
    display: flex;
    background-color: rgb(247, 246, 246);
  }
  .upload-item-img{
    /* border: 1px solid black; */
    width: 350px;
    height: 158px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
  }
  
  .upload-item-desc{
    /* border: 1px solid black; */
    width: 700px;
    height: 158px;
    margin: 5px;
    box-sizing: border-box;
    overflow: hidden;
    padding: 17px;
    position: relative;
  }
  .upload-desc-top{
    border: 1px solid black;
    color: rgb(63, 63, 63);
    width: 500px;
    line-height: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    position: relative;
    /* margin-left: 10px; */
  }
  .upload-top-title{
    /* border: 1px solid black; */
    font-size: 38px;
    font-weight: 600;
    width: 150px;
    height: 50px;
    line-height: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* margin: 5px; */
  }
  .upload-top-tag{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 3px;
    /* border: 1px solid black; */
    
  }
  .upload-desc-middle{
    color: rgb(133, 133, 133);
    display: flex;
    position: relative;
    margin-left: 15px;
    margin-top: 15px;
    font-size: 24px;
  }
  .upload-desc-bottom{
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 10px;
    /* border: 1px solid black; */
  }
  .upload-bottom-date{
    font-size: 14px;
    color: rgb(119, 119, 119);
    font-weight: 550;
    width: 150px;
    line-height: 1em;
    margin-top: 10px;
    margin-left: -10px;
  }
  .upload-bottom-star{
    font-size: 20px;
    color: rgb(156, 156, 156);
    font-weight: 550;
    width: 150px;
    line-height: 1em;
    margin-top: 5px;
  }

  .upload-item-button{
    /* border: 1px solid black; */
    width: 250px;
    height: 158px;
    margin: 5px;
    padding: 10px;
  }
  .upload-buttom-button1{
    text-align: center;
    margin-top: 25px;
    
  }
  .upload-buttom-button2{
    /* width: 100%; */
    margin-top: 18px;
    padding: 10px;
    /* border: 1px solid black; */
  }
  .comment-item{
    border: 1px solid silver;
    background-color: rgb(247, 246, 246);
    height: 75px;
    margin: 8px;
    padding: 8px;
    display: flex;
  }
  .comment-item-left{
    /* border: 1px solid black; */
    width: 80%;
    margin: 5px;
    /* height:65px; */
  }
  .comment-left-content{
    /* border: 1px solid black; */
    color: rgb(102, 100, 100);
    display: flex;
    font-size: 16px;
    height: 50px;
  }
  .comment-left-date{
    color: #a0a0a0;
    display: flex;
  }
  .comment-item-right{
    /* border: 1px solid black; */
    width: 20%;
    height: 70px;
    margin: 5px;
  }
  .comment-right-button{
    margin-top: 10px;
    
  }

  </style>
  