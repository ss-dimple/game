<template>
<div class="main">
    <div class="top">
        <el-carousel :interval="4000" type="card" height="400px" >
            <el-carousel-item v-for="item in 6" :key="item" >
                <h3 text="2xl" justify="center">
                    {{ item }}
                    <button class="top-button">点击下载</button>
                </h3>
                <!-- <button>详情</button> -->
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="best">
        <div class="best-top">
            <div class="best-title">精品展示</div>
            <div class="best-title-right">
                <div class="best-btn">
                    更多
                    <el-icon class="best-btn-icon"><ArrowRight /></el-icon>
                </div>
            </div>
        </div>
        
        <div class="best-list" >
            <div class="best-list-item" v-for="item in bestList" :key="item.id">
                <div class="best-list-item-img">
                    <router-link :to="'/game/'+item.id" tag="div"> 
                        <!-- <img :src="item.gameImg" alt="" > -->
                        <img src="../../../public/images/精品-1.jpg" alt="" >
                    </router-link>
                    <!-- <img src="../../../public/images/精品-1.jpg" alt="" @click="$router.push(`/game/${item.id}`)"> -->
                </div>
                <div class="best-list-item-desc">
                    <span class="best-list-item-price">{{ item.gameName }}</span>
                    <span class="best-list-item-theme">{{item.gameTitle}}</span>
                    <span class="best-list-item-name">{{item.tags}}</span>
                </div>
            </div>
            <!-- <div class="best-list-item">
                <div class="best-list-item-img">
                    <img src="../../../public/images/精品-1.jpg" alt="" >
                </div>
                <div class="best-list-item-desc">
                    <div class="best-list-item-price">价格</div>
                    <div class="best-list-item-theme">主题</div>
                    <div class="best-list-item-name">游戏名</div>
                </div>
            </div>
            <div class="best-list-item">
                <div class="best-list-item-img">
                    <img src="../../../public/images/精品-1.jpg" alt="">
                </div>
                <div class="best-list-item-desc">
                    <div class="best-list-item-price">价格</div>
                    <div class="best-list-item-theme">主题</div>
                    <div class="best-list-item-name">游戏名</div>
                </div>
            </div>
            <div class="best-list-item">
                <div class="best-list-item-img">
                    <img src="../../../public/images/精品-1.jpg" alt="">
                </div>
                <div class="best-list-item-desc">
                    <div class="best-list-item-price">价格</div>
                    <div class="best-list-item-theme">主题</div>
                    <div class="best-list-item-name">游戏名</div>
                </div>
            </div>
            <div class="best-list-item">
                <div class="best-list-item-img">
                    <img src="../../../public/images/精品-1.jpg" alt="">
                </div>
                <div class="best-list-item-desc">
                    <div class="best-list-item-price">价格</div>
                    <div class="best-list-item-theme">主题</div>
                    <div class="best-list-item-name">游戏名</div>
                </div>
            </div>
            <div class="best-list-item">
                <div class="best-list-item-img">
                    <img src="../../../public/images/精品-1.jpg" alt="">
                </div>
                <div class="best-list-item-desc">
                    <div class="best-list-item-price">价格</div>
                    <div class="best-list-item-theme">主题</div>
                    <div class="best-list-item-name">游戏名</div>
                </div>
            </div> -->
        </div>
        
    </div>
    <div class="type">      
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" >
            <el-tab-pane class="type-list" label="单机游戏" name="first" >
                <div class="type-list-items"  >
                    <div class="type-list-item" v-for="item in type1GameInfo" :key="item.id" @mouseover="showHover=true" @mouseout="showHover=false">
                        <div class="type-list-item-img">
                            <router-link :to="'/game/'+item.id" tag="div">
                                <img src="../../../public/images/精品-1.jpg" alt="" class="type-item-img-self">
                            </router-link>
                        </div>
                        <div class="type-list-item-info">
                            <div class="type-item-info-top">
                                <span class="type-info-top-desc">{{item.gameTitle}}</span>
                                <!-- <span>"搜索指数" 
                                    "18049"
                                </span> -->
                                <div class="type-game-star">
                                    <div class="type-game-digit-score">8.4</div>
                                    <div class="type-game-score-star">评星</div>
                                </div>
                            </div>
                            <div class="type-item-info-middle">
                                <span class="type-info-middle-name">
                                    <span>{{item.gameName}}</span>
                                     <i class="icon lowest-icon"></i> 
                                </span>
                            </div>
                            <div class="type-item-info-bottom">
                                <div class="type-info-bottom-time">2023-03-13</div>
                                <!-- <div class="type-info-bottom-price">
                                    <span class="type-info-bottom-disprice">334</span>
                                    <span class="type-info-bottom-oriprice">556</span>
                                </div> -->
                                
                                <span class="type-info-bottom-text">{{item.tags}}</span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="type-list-item">
                        <div class="type-list-item-img">
                            <img src="../../../public/images/精品-1.jpg" alt="" class="type-item-img-self">
                        </div>
                        <div class="type-list-item-info">
                            <div class="type-item-info-top">
                                <span class="type-info-top-desc">黑暗奇幻的动作游戏</span>
                                <span>"搜索指数" 
                                    "18049"
                                </span>
                            </div>
                            <div class="type-item-info-middle">
                                <span class="type-info-middle-name">
                                    <span>艾尔登法环</span>
                                     <i class="icon lowest-icon"></i> 
                                </span>
                            </div>
                            <div class="type-item-info-bottom">
                                <div class="type-info-bottom-time">2023-03-13</div>
                                <div class="type-info-bottom-price">
                                    <span class="type-info-bottom-disprice">334</span>
                                    <span class="type-info-bottom-oriprice">556</span>
                                </div>
                                
                                <span class="type-info-bottom-text">-19.35</span>
                            </div>
                        </div>
                    </div> -->
                    <div class="type-list-btn">
                        <span class="btn">查看更多</span>
                    </div>
                </div>
                <!-- style="transform: translate3d(0px, 254px, 0px);" v-for="item in type1GameInfo" :key="item.id" v-if="showHover"-->
                <div class="type-game-info"> 
                    <!-- 排行榜 -->
                    <div class="type-info-top">
                        <div class="type-top-title">单机游戏评分排行</div>
                    </div>
                    <div class="type-info-ranks">
                        <div class="type-ranks-title">
                            <div class="type-title-one">排名</div>
                            <div class="type-title-two">游戏名称</div>
                            <div class="type-title-three">评分</div>
                        </div>
                        <div class="type-ranks-rank">
                            <div class="type-rank">
                                <div class="type-rank-one">
                                    <img style="width: 30px; height: 30px" src="../../assets/images/金牌.png" fit="cover" />
                                </div>
                                <div class="type-rank-two">绝地求生</div>
                                <div class="type-rank-three">9.0</div>
                            </div>
                            <el-divider />
                            <div class="type-rank">
                                <div class="type-rank-one">
                                    <img style="width: 30px; height: 30px" src="../../assets/images/银牌.png" fit="cover" />
                                </div>
                                <div class="type-rank-two">绝地求生</div>
                                <div class="type-rank-three">9.0</div>
                            </div>
                            <el-divider />
                            <div class="type-rank">
                                <div class="type-rank-one">
                                    <img style="width: 30px; height: 30px" src="../../assets/images/铜牌.png" fit="cover" />
                                </div>
                                <div class="type-rank-two">绝地求生</div>
                                <div class="type-rank-three">9.0</div>
                            </div>
                            <el-divider />
                        </div>
                    </div>
                </div> 
            </el-tab-pane>
            <el-tab-pane class="type-list" label="网络游戏" name="second">
                <div class="type-list-items"  >
                    <div class="type-list-item" v-for="item in type2GameInfo" :key="item.id">
                        <div class="type-list-item-img">
                            <router-link :to="'/game/'+item.id" tag="div">
                                <img src="../../../public/images/精品-1.jpg" alt="" class="type-item-img-self">
                            </router-link>
                        </div>
                        <div class="type-list-item-info">
                            <div class="type-item-info-top">
                                <span class="type-info-top-desc">{{item.gameTitle}}</span>
                                <span>"搜索指数" 
                                    "18049"
                                </span>
                            </div>
                            <div class="type-item-info-middle">
                                <span class="type-info-middle-name">
                                    <span>{{item.gameName}}</span>
                                     <i class="icon lowest-icon"></i> 
                                </span>
                            </div>
                            <div class="type-item-info-bottom">
                                <div class="type-info-bottom-time">2023-03-13</div>
                                <!-- <div class="type-info-bottom-price">
                                    <span class="type-info-bottom-disprice">334</span>
                                    <span class="type-info-bottom-oriprice">556</span>
                                </div> -->
                                
                                <span class="type-info-bottom-text">{{item.tags}}</span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="type-list-item">
                        <div class="type-list-item-img">
                            <img src="../../../public/images/精品-1.jpg" alt="" class="type-item-img-self">
                        </div>
                        <div class="type-list-item-info">
                            <div class="type-item-info-top">
                                <span class="type-info-top-desc">黑暗奇幻的动作游戏</span>
                                <span>"搜索指数" 
                                    "18049"
                                </span>
                            </div>
                            <div class="type-item-info-middle">
                                <span class="type-info-middle-name">
                                    <span>艾尔登法环</span>
                                     <i class="icon lowest-icon"></i> 
                                </span>
                            </div>
                            <div class="type-item-info-bottom">
                                <div class="type-info-bottom-time">2023-03-13</div>
                                <div class="type-info-bottom-price">
                                    <span class="type-info-bottom-disprice">334</span>
                                    <span class="type-info-bottom-oriprice">556</span>
                                </div>
                                
                                <span class="type-info-bottom-text">-19.35</span>
                            </div>
                        </div>
                    </div> -->
                    <div class="type-list-btn">
                        <span class="btn">查看更多</span>
                    </div>
                </div>
                <div class="type-game-info"> 
                    <!-- 排行榜 -->
                    <div class="type-info-top">
                        <div class="type-top-title">网络游戏评分排行</div>
                    </div>
                    <div class="type-info-ranks">
                        <div class="type-ranks-title">
                            <div class="type-title-one">排名</div>
                            <div class="type-title-two">游戏名称</div>
                            <div class="type-title-three">评分</div>
                        </div>
                        <div class="type-ranks-rank">
                            <div class="type-rank">
                                <div class="type-rank-one">
                                    <img style="width: 30px; height: 30px" src="../../assets/images/金牌.png" fit="cover" />
                                </div>
                                <div class="type-rank-two">绝地求生</div>
                                <div class="type-rank-three">9.0</div>
                            </div>
                            <el-divider />
                            <div class="type-rank">
                                <div class="type-rank-one">
                                    <img style="width: 30px; height: 30px" src="../../assets/images/银牌.png" fit="cover" />
                                </div>
                                <div class="type-rank-two">绝地求生</div>
                                <div class="type-rank-three">9.0</div>
                            </div>
                            <el-divider />
                            <div class="type-rank">
                                <div class="type-rank-one">
                                    <img style="width: 30px; height: 30px" src="../../assets/images/铜牌.png" fit="cover" />
                                </div>
                                <div class="type-rank-two">绝地求生</div>
                                <div class="type-rank-three">9.0</div>
                            </div>
                            <el-divider />
                        </div>
                    </div>
                </div> 
            </el-tab-pane>
            <el-tab-pane class="type-list" label="小游戏" name="third">
                <div class="type-list-items"  >
                    <div class="type-list-item" v-for="item in type3GameInfo" :key="item.id">
                        <div class="type-list-item-img">
                            <router-link :to="'/game/'+item.id" tag="div">
                                <img src="../../../public/images/精品-1.jpg" alt="" class="type-item-img-self">
                            </router-link>
                        </div>
                        <div class="type-list-item-info">
                            <div class="type-item-info-top">
                                <span class="type-info-top-desc">{{item.gameTitle}}</span>
                                <span>"搜索指数" 
                                    "18049"
                                </span>
                            </div>
                            <div class="type-item-info-middle">
                                <span class="type-info-middle-name">
                                    <span>{{item.gameName}}</span>
                                     <i class="icon lowest-icon"></i> 
                                </span>
                            </div>
                            <div class="type-item-info-bottom">
                                <div class="type-info-bottom-time">2023-03-13</div>
                                <!-- <div class="type-info-bottom-price">
                                    <span class="type-info-bottom-disprice">334</span>
                                    <span class="type-info-bottom-oriprice">556</span>
                                </div> -->
                                
                                <span class="type-info-bottom-text">{{item.tags}}</span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="type-list-item">
                        <div class="type-list-item-img">
                            <img src="../../../public/images/精品-1.jpg" alt="" class="type-item-img-self">
                        </div>
                        <div class="type-list-item-info">
                            <div class="type-item-info-top">
                                <span class="type-info-top-desc">黑暗奇幻的动作游戏</span>
                                <span>"搜索指数" 
                                    "18049"
                                </span>
                            </div>
                            <div class="type-item-info-middle">
                                <span class="type-info-middle-name">
                                    <span>艾尔登法环</span>
                                     <i class="icon lowest-icon"></i> 
                                </span>
                            </div>
                            <div class="type-item-info-bottom">
                                <div class="type-info-bottom-time">2023-03-13</div>
                                <div class="type-info-bottom-price">
                                    <span class="type-info-bottom-disprice">334</span>
                                    <span class="type-info-bottom-oriprice">556</span>
                                </div>
                                
                                <span class="type-info-bottom-text">-19.35</span>
                            </div>
                        </div>
                    </div> -->
                    <div class="type-list-btn">
                        <span class="btn">查看更多</span>
                    </div>
                </div>
                <div class="type-game-info"> 
                    <!-- 排行榜 -->
                    <div class="type-info-top">
                        <div class="type-top-title">小游戏评分排行</div>
                    </div>
                    <div class="type-info-ranks">
                        <div class="type-ranks-title">
                            <div class="type-title-one">排名</div>
                            <div class="type-title-two">游戏名称</div>
                            <div class="type-title-three">评分</div>
                        </div>
                        <div class="type-ranks-rank">
                            <div class="type-rank">
                                <div class="type-rank-one">
                                    <img style="width: 30px; height: 30px" src="../../assets/images/金牌.png" fit="cover" />
                                </div>
                                <div class="type-rank-two">绝地求生</div>
                                <div class="type-rank-three">9.0</div>
                            </div>
                            <el-divider />
                            <div class="type-rank">
                                <div class="type-rank-one">
                                    <img style="width: 30px; height: 30px" src="../../assets/images/银牌.png" fit="cover" />
                                </div>
                                <div class="type-rank-two">绝地求生</div>
                                <div class="type-rank-three">9.0</div>
                            </div>
                            <el-divider />
                            <div class="type-rank">
                                <div class="type-rank-one">
                                    <img style="width: 30px; height: 30px" src="../../assets/images/铜牌.png" fit="cover" />
                                </div>
                                <div class="type-rank-two">绝地求生</div>
                                <div class="type-rank-three">9.0</div>
                            </div>
                            <el-divider />
                        </div>
                    </div>
                </div>  
            </el-tab-pane>
            <el-tab-pane class="type-list" label="网页游戏" name="fourth">
                <div class="type-list-items"  >
                    <div class="type-list-item" v-for="item in type4GameInfo" :key="item.id">
                        <div class="type-list-item-img">
                            <router-link :to="'/game/'+item.id" tag="div">
                                <img src="../../../public/images/精品-1.jpg" alt="" class="type-item-img-self">
                            </router-link>
                        </div>
                        <div class="type-list-item-info">
                            <div class="type-item-info-top">
                                <span class="type-info-top-desc">{{item.gameTitle}}</span>
                                <span>"搜索指数" 
                                    "18049"
                                </span>
                            </div>
                            <div class="type-item-info-middle">
                                <span class="type-info-middle-name">
                                    <span>{{item.gameName}}</span>
                                     <i class="icon lowest-icon"></i> 
                                </span>
                            </div>
                            <div class="type-item-info-bottom">
                                <div class="type-info-bottom-time">2023-03-13</div>
                                <!-- <div class="type-info-bottom-price">
                                    <span class="type-info-bottom-disprice">334</span>
                                    <span class="type-info-bottom-oriprice">556</span>
                                </div> -->
                                
                                <span class="type-info-bottom-text">{{item.tags}}</span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="type-list-item">
                        <div class="type-list-item-img">
                            <img src="../../../public/images/精品-1.jpg" alt="" class="type-item-img-self">
                        </div>
                        <div class="type-list-item-info">
                            <div class="type-item-info-top">
                                <span class="type-info-top-desc">黑暗奇幻的动作游戏</span>
                                <span>"搜索指数" 
                                    "18049"
                                </span>
                            </div>
                            <div class="type-item-info-middle">
                                <span class="type-info-middle-name">
                                    <span>艾尔登法环</span>
                                     <i class="icon lowest-icon"></i> 
                                </span>
                            </div>
                            <div class="type-item-info-bottom">
                                <div class="type-info-bottom-time">2023-03-13</div>
                                <div class="type-info-bottom-price">
                                    <span class="type-info-bottom-disprice">334</span>
                                    <span class="type-info-bottom-oriprice">556</span>
                                </div>
                                
                                <span class="type-info-bottom-text">-19.35</span>
                            </div>
                        </div>
                    </div> -->
                    <div class="type-list-btn">
                        <span class="btn">查看更多</span>
                    </div>
                </div>
                <div class="type-game-info"> 
                    <!-- 排行榜 -->
                    <div class="type-info-top">
                        <div class="type-top-title">网页游戏评分排行</div>
                    </div>
                    <div class="type-info-ranks">
                        <div class="type-ranks-title">
                            <div class="type-title-one">排名</div>
                            <div class="type-title-two">游戏名称</div>
                            <div class="type-title-three">评分</div>
                        </div>
                        <div class="type-ranks-rank">
                            <div class="type-rank">
                                <div class="type-rank-one">
                                    <img style="width: 30px; height: 30px" src="../../assets/images/金牌.png" fit="cover" />
                                </div>
                                <div class="type-rank-two">绝地求生</div>
                                <div class="type-rank-three">9.0</div>
                            </div>
                            <el-divider />
                            <div class="type-rank">
                                <div class="type-rank-one">
                                    <img style="width: 30px; height: 30px" src="../../assets/images/银牌.png" fit="cover" />
                                </div>
                                <div class="type-rank-two">绝地求生</div>
                                <div class="type-rank-three">9.0</div>
                            </div>
                            <el-divider />
                            <div class="type-rank">
                                <div class="type-rank-one">
                                    <img style="width: 30px; height: 30px" src="../../assets/images/铜牌.png" fit="cover" />
                                </div>
                                <div class="type-rank-two">绝地求生</div>
                                <div class="type-rank-three">9.0</div>
                            </div>
                            <el-divider />
                        </div>
                    </div>
                </div> 
            </el-tab-pane>
        </el-tabs>
   </div>
   <el-backtop :right="20" :bottom="100" style="width:80px;height:80px;" >
        <el-icon size="70px" color="gray" background-color="#272d31"><ArrowUpBold /></el-icon>
   </el-backtop>
</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { TabsPaneContext  } from 'element-plus'
import { ElMessage } from 'element-plus';
import { getTypeList ,getBestList , getType1GameInfo ,getType2GameInfo, getType3GameInfo,getType4GameInfo } from '@/api/game';


//导航栏
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
//精品列表
const bestList:any = ref([])
//类别列表
const typeList :any = ref([])

const showHover =ref(false)
const type1GameInfo:any = ref([])
const type2GameInfo:any = ref([])
const type3GameInfo:any = ref([])
const type4GameInfo:any = ref([])

onMounted(async()=>{
    try{
        const typeResult:any = await getTypeList();
        console.log(typeResult,'获取到类别数据')
        typeList.value = typeResult.data

        const bestResult:any = await getBestList();
        console.log(bestResult,'获取到游戏数据')
        bestList.value = bestResult.data

        //获取网络、小游戏、单机、网页数据
        const type1Result :any = await getType1GameInfo();
        // console.log(type1GameInfo,'单机游戏')
        type1GameInfo.value = type1Result.data
        const type2Result :any = await getType2GameInfo();
        // console.log(type2GameInfo,'单机游戏')
        type2GameInfo.value = type2Result.data
        const type3Result :any = await getType3GameInfo();
        // console.log(type3GameInfo,'单机游戏')
        type3GameInfo.value = type3Result.data
        const type4Result :any = await getType4GameInfo();
        // console.log(type4GameInfo,'单机游戏')
        type4GameInfo.value = type4Result.data
    }catch(error){
        console.log(error)
        ElMessage.error('获取初始数据失败！')
    }
})


</script>

<style scoped>
.main{
    background-color: #1b1d1f;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.top{
    /* border: 1px solid silver ; */
    margin: 8px;
    padding: 10px;
    width: 1350px;
}
.top-button{
    background-color: #ffffff;
    position: relative;
    top: 230px;
    right: -260px;
    width: 100px;
    height: 50px;
    /* display: flex; */
}

.best{
    /* border: 1px solid silver ; */
    margin: 8px;
    padding: 10px;
    width: 1350px;
}
.best-top{
    /* border: 1px solid silver; */
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 1350px;
}
.best-title{
    /* border: 1px solid black; */
    height: 45px;
    width: 1700px;
    text-align: left;
    font-size: large;
    line-height: 40px;
    position: relative;
    padding-left: 11px;
    /* font-family: '正楷'; */
}
.best-title:before{
    background: #024aff;
    content: "";
    height: 40px;
    left: 0;
    position: absolute;
    top: 1px;
    width: 5px;
}
.best-title-right{
    align-items: center;
    display: flex;
}
.best-btn{
    color: #85898b;
    cursor: pointer;
    font-size: 16px;
    line-height: 35px;
    right: 140px;
    position: absolute;
}
.best-btn-icon{
    float: right;
    padding-top: 10px;
}

.best-list{
    display: flex;
    flex-wrap: wrap;
    /* margin-top: 24px; */
    width: 1350px;
    /* margin: 8px; */
    padding: 5px;
    /* border: 1px solid black; */
}
.best-list-item{
    cursor: pointer;
    height: 258px;
    /* margin-right: 24px; */
    position: relative;
    width: 300px;
    margin: 8px;
    padding: 8px;
    /* border: 1px solid black; */
}

.best-list-item-img{
    display: flex;
    flex-direction: column;
    height: 158px;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    width: 100%;
}
.best-list-item-img:hover{
    box-shadow: 0 8px 8px 0 grey;
    transform: translate(0, -10px);
    transform: scale(1.3)
}
.best-list-item-desc{
    padding-top: 16px;
    width: 100%;
}

.best-list-item-price{
    display: flex;
    height: 21px;
}

.best-list-item-theme{
    color: #fff;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 500;
    line-height: 1em;
    margin-top: 12px;
    max-width: 282px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.best-list-item-name{
    color: rgba(255,255,255,.6);
    font-size: 14px;
    line-height: 1em;
    margin-top: 12px;
}
.type{
    /* margin-top: 45px; */
    margin: 8px;
    padding: 10px;
    /* border: 1px solid silver; */
    width: 1350px;

}
.demo-tabs{
    font-size: 18px;
    color: #fff;
    /* margin: 5px; */
}
.demo-tabs ::v-deep .el-tabs__item{
    color: #fff;
    }
.el-tabs__item.is-active {
  color: #024aff; 
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

 .type-list{
    align-items: flex-start;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    /* margin: 8px; */
    padding-right: 12px;
    /* border: 1px solid silver; */

}
.type-list-items{
    position: relative;
    width: 80%;
    /* border: 1px solid rgb(234, 10, 10); */
    margin: 8px;

}
.type-list-item{
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 135px;
    padding: 10px;
    position: relative;
    width: 930px;
    z-index: 2;
    /* border: 1px solid rgb(234, 10, 10); */
}
.type-list-item:hover{
    background-color: #272d31;

}
.type-list-item .type-list-item-img{
    height: 103px;
    position: relative;
}
.type-item-img-self{
    height: 103px;
    -o-object-fit: cover;
    object-fit: cover;
    width: 180px;
}
.type-list-item-info{
    box-sizing: border-box;
    height: 103px;
    margin-left: 24px;
    padding: 8px 0 9px;
    width: 639px;
}
.type-item-info-top{
    color: rgba(255,255,255,.6);
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    line-height: 16px;
}
.type-info-top-desc{
    max-width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.type-item-info-middle{
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 11px;
}
.type-info-middle-name{
    color: #fff;
    display: flex;
    font-family: PingFangSC-Medium;
    font-size: 19px;
    font-weight: 500;
    line-height: 1em;
}
.type-item-info-bottom{
    display: flex;
    height: 20px;
    justify-content: space-between;
    margin-top: 17px;
}
.type-info-bottom-time{
    align-items: flex-end;
    color: rgba(255,255,255,.6);
    display: flex;
    height: 20px;
}
.type-info-bottom-price{
    display: flex;
    flex-shrink: 0;
    height: 21px;
}
.type-info-bottom-disprice{
    align-items: baseline;
    color: #f14027;
    display: flex;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    height: 21px;
    margin-left: 100px;
    border: 1px solid black;
}
.type-info-bottom-oriprice{
    align-items: flex-end;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    font-size: 14px;
    height: 21px;
    margin-left: 126px;
    opacity: .6;
    text-decoration: line-through;
    border: 1px solid black;

}
.type-info-bottom-text{
    align-items: center;
    background-color: #3c4346;
    border-radius: 2px;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    height: 20px;
    margin-left: 6px;
    padding: 0 6px;
} 
.type-list-btn{
    cursor: pointer;
    display: flex;
    margin-top: 12px;
    padding-left: 12px;
}
.btn{
    align-items: center;
    background-color: #293034;
    color: #fff;
    display: flex;
    font-size: 15px;
    height: 51px;
    justify-content: center;
    width: 843px;
}
.type-game-info{
    background-color: #272d31;
    box-sizing: border-box;
    overflow: hidden;
    padding: 20px;
    position: relative;
    width: 400px;
    margin: 8px;
    height: 450px;
    /* border: 1px solid white; */
}
.type-info-top{
    /* border: 1px solid white; */
    align-items: center;
    display: flex;
    justify-content: space-between;
}

.type-top-title{
    height: 45px;
    /* width: 1700px; */
    text-align: left;
    font-size: large;
    line-height: 40px;
    position: relative;
    padding-left: 11px;
}
.type-top-title:before{
    background: #024aff;
    content: "";
    height: 40px;
    left: 0;
    position: absolute;
    top: 1px;
    width: 5px;
}
.type-info-ranks{
    /* border: 1px solid white; */
    background: #3e4449;
}
.type-ranks-title{
    /* border: 1px solid beige; */
    display: flex;
    font-size: 14px;
    color: #d3dce6;
    margin-top: 8px;
    padding: 5px;
}
.type-title-one{
    padding-left: 3px;
}
.type-title-two{
    padding-left: 35px;
}
.type-title-three{
    padding-left: 120px;
}
/* .type-ranks-rank{
    align-items: center;
    display: flex;
    justify-content: space-between;
} */
.type-rank{
    /* border: 1px solid white; */
    margin-top: 8px;
    padding: 5px;
    font-size: 16px;
    display: flex;
}
.type-rank-one{
    padding-left: 5px; 
}
.type-rank-two{
    padding-left:35px ;
}
.type-rank-three{
    padding-left:120px ;
    color: #f14027;
    font-size: 22px;
    font-weight: 700;
}
.el-divider--horizontal{
     margin: 8px 0;
     background: 0 0;
     border-top: 1px solid #c1c1c2;
 } 

/* .type-game-name{
    color: #fff;
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    font-weight: 600;
    line-height: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 200px;
}
.type-game-score{
    position: absolute;
    right: 27px;
    top: 27px;
    color: #f14027;
}
.type-game-star{
    display: inline-block;
}
.type-game-digit-score{
    font-size: 30px;
    margin-bottom: 3px;
    text-align: center;
}
.type-game-score-star{
    align-items: center;
    display: flex;
    height: 10px;
    justify-content: center;
}
.type-game-name-en{
    color: rgba(255,255,255,.5);
    font-size: 13px;
    height: 13px;
    line-height: 1em;
    margin-top: 9px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 200px;
}
.type-game-desc{
    color: rgba(255,255,255,.7);
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    margin-top: 15px;
    margin-left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.type-game-tags{
    display: flex;
    flex-wrap: wrap;
    height: 18px;
    margin-top: 9px;
    overflow: hidden;
}
.type-game-tag-item{
    align-items: center;
    border: 1px solid rgba(255,255,255,.5);
    border-radius: 2px;
    box-sizing: border-box;
    color: rgba(255,255,255,.5);
    display: flex;
    flex-shrink: 0;
    font-size: 12px;
    height: 18px;
    line-height: 12px;
    margin-right: 9px;
    padding: 0 4px;
}
.type-game-img{
    display: flex;
    flex-direction: column;
    margin-top: 24px;
}
.type-game-img-item{
    height: 156px;
    margin-top: 9px;
    -o-object-fit: cover;
    object-fit: cover;
    width: 279px;
} */

</style>