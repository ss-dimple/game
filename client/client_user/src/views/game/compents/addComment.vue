<template>
    <el-dialog v-model="outerVisible" 
        title="写评论" 
        @close="closeAddComment" 
        width="30%"
        :close-on-click-modal="false"
        >
      <template #footer>
        <el-form
        class="Comment-form"
        label-position="right"
        :model="commentForm"
        style="max-width: 460px"
        >
        <el-form-item  prop="CommentScore">
            <el-rate
            v-model="commentForm.commentScore"
            :texts="['1', '2', '3', '4', '5']"
            show-text
            size="large"
            />
        </el-form-item>
        <el-form-item prop="commentContent" >
            <el-input v-model="commentForm.commentContent" type="textarea" />
        </el-form-item>
        <el-form-item>
            <el-button type="danger" @click="submitComment" style="float: right;">发表</el-button>
        </el-form-item>
    </el-form>
        <!-- <div>新建用户密码默认为：123456</div> -->
        <!-- <div class="dialog-footer">
          <el-button @click="closeaddType">Cancel</el-button>
          <el-button type="primary" @click="showInfoBox('hello')">
            open the inner Dialog
          </el-button>
        </div> -->
      </template>
    </el-dialog>
</template>
  
  <script lang="ts" setup>
    import { ref, toRefs ,toRef,reactive,watch,computed ,onMounted} from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import {useRouter,useRoute} from 'vue-router'
    import { commentSubmit } from '@/api/game'
    import { ElMessage } from 'element-plus'
    import {UserStore} from '@/store/user'

    const route= useRoute()
    const userStore = UserStore();
    const userno:any = userStore.userno

    //组件数据  //实现父子组件传值
    const props = defineProps({
        addCommentShow:Boolean, 
    })
    //游戏id
    let  gameId:any = ref()
    onMounted(async() => {
        gameId  = Number(route.params.id)   //接收路径参数
        console.log('游戏id1:' + gameId) 
    })

    const emit = defineEmits(['closeAddComment','addCommentComplete'])

    const outerVisible = computed({
        get() {
            return props.addCommentShow;
        },
        set(v) {
            emit('closeAddComment',"close Add user")
        },
    });

    const closeAddComment = ()=>{
        console.log("close add user")
        outerVisible.value = false;
    }

    const commentForm = reactive({
      commentScore: '',
      commentContent: '',
    })


    const addCommentLoading = ref(false);

    const submitComment = async () => {
    addCommentLoading.value = true;
      try{
        console.log(commentForm,gameId,userno,'commentForm')
        Reflect.set(commentForm,'userno',userno);
        Reflect.set(commentForm,'gameId',gameId);
        console.log(commentForm,'commentForm');
        const result: any = await commentSubmit(commentForm);
        addCommentLoading.value = false;
        // if(result.code ==200){
        //   ElMessage({
        //     type: 'success',
        //     message: '已成功提交至教师端审核，请耐心等待！'
        //   })
        // }
        emit('addCommentComplete');
        outerVisible.value = false;
      }catch(error){
        console.log(error)
      }
    }

  </script>
  <style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
    }
  </style>