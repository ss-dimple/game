<template>
<div class="main">
    <div class="header-menu">
    <Hometop>
      <Sidebar></Sidebar> 
    </Hometop>
  </div>
    <div class="common-layout">
      <el-container>
        <el-header>
            <div class="header-top">
                <el-input 
                v-model="searchValue"
                class="header-top-input"
                placeholder="输入游戏名搜索"
                :prefix-icon="Search"
                />
                <el-button class="header-top-button" type="primary" >搜索</el-button>
            </div>
            <div class="header-button-list">
                <!-- <el-check-tag :checked="checked" @change="onChange" v-for="item in typeList" :key="item.id">{{item.type}}</el-check-tag> -->
                <el-button class="header-button-item" type="primary" plain v-for="item in tagList" :key="item.id">{{item.tagName}}</el-button>
            </div>
        </el-header>
        <el-main>
            <div class="type-list-items">
                    <div class="type-list-item">
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
                    </div>
                    <div class="type-list-item">
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
                    </div>
                    <div class="type-list-btn">
                        <!-- <span class="btn">查看更多</span> -->
                        <el-pagination background layout="prev, pager, next" :total="1000" />
                    </div>
                    
                </div>
                <div class="type-game-info">
                    <div class="type-game-name">艾尔登法环</div>
                    <div class="type-game-score">
                        <div class="type-game-star">
                            <div class="type-game-digit-score">8.4</div>
                            <div class="type-game-score-star">评星</div>
                        </div>
                    </div>
                    <div class="type-game-name-en"></div>
                    <div class="type-game-desc">享受克服困境时的成就感吧</div>
                    <div class="type-game-tags">
                        <div class="type-game-tag-item">角色扮演</div>
                        <div class="type-game-tag-item">ARPG</div>
                    </div>
                    <div class="type-game-img">
                        <img class="type-game-img-item" src="../../../public/images/精品-1.jpg" alt="">
                        <img class="type-game-img-item"  src="../../../public/images/精品-1.jpg" alt=''>
                        <img class="type-game-img-item"  src="../../../public/images/精品-1.jpg" alt="">
                    </div>
                </div>
        </el-main>
      </el-container>
    </div>
</div>
  </template>
<script lang="ts" setup >
import Hometop from '../../Layout/components/Hometop.vue'
import Sidebar from '../../Layout/components/Sidebar.vue'
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import {getTagList} from '@/api/game';
import item from 'element-plus/es/components/space/src/item';
// import { type } from 'os';

const router = useRouter();

//搜索
const searchValue = ref('')

//游戏标签
const checked = ref(false)

const tagList :any = ref([])

onMounted(async ()=>{
    try{
        const result:any =await getTagList();
        console.log(result,'获取到标签表数据')
        tagList.value = result.data
        console.log(tagList.value,'标签列表')
    }catch(error){
        console.log(error)
        ElMessage.error('获取标签表数据失败！')
    }
})

const onChange = (status: boolean) => {
  checked.value = status
}
</script>

<style scoped>
.main{
    background: linear-gradient(180deg, #000000 50px, #FFF 500px);
    /* height: 560px; */
  }
.header-menu{
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 70px;
  /* margin: 8px;
  padding: 10px; */
}
.common-layout{
    border: 1px solid silver ;
    /* margin: 8px;
    padding: 10px; */
    width: 80%;
    margin-left: 10%;
}

header{
    border: 1px solid silver;
    /* width: 100%; */
    height: 250px;
    /* display: flex; */
    margin: 8px;
    padding: 10px;
}
.header-top{
    /* border: 1px solid silver; */
    /* margin: 5px;
    padding: 5px; */
    height: 50px;
    display: flex;
}
.header-top-input{
    margin: 2px;
    padding: 2px;
    width: 89%;
}
.header-top-button{
    margin: 13px;
    padding: 2px;
    width: 8%;
    height: 35px;
    margin-top: 7px;
}
.header-button-list{
    border: 1px solid silver;
    margin: 5px;
    padding: 5px;
    display: flex;
}
.header-button-item{
    margin: 5px;
    padding: 5px;
}
main{
    border: 1px solid silver;
    /* width: 100%; */
    /* height: 450px; */
    display: flex;
    margin: 8px;
    padding: 10px;
    align-items: flex-start;
    justify-content: space-between;
    box-sizing: border-box;
    position: relative;
}
 /* .type-list{
    align-items: flex-start;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin: 8px;
    padding-right: 12px;
    border: 1px solid silver;

} */
/* .type-list-items{
    position: relative;
    width: 467px;
    border: 1px solid rgb(234, 10, 10);
    margin: 8px;

} */
.type-list-item{
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 135px;
    margin: 8px;
    padding: 10px;
    position: relative;
    width: 780px;
    z-index: 2;
    border: 1px solid rgb(234, 10, 10);

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
    /* color: rgba(255,255,255,.6); */
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
    padding: 27px;
    position: relative;
    width: 360px;
    margin: 8px;
}
.type-game-name{
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
}

</style>