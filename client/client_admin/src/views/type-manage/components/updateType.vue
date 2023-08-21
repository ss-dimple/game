<template>
    <el-dialog v-model="outerVisible" 
                title="修改用户信息" 
                @close="closeUpdateType" 
                width="30%"
                :close-on-click-modal="false">
      <template #default>
        <el-dialog
          v-model="innerVisible"
          width="30%"
          :title="showInfo"
          append-to-body
        />
      </template>
      <template #footer>
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
        >
            <el-form-item label="编号" prop="id">
                <el-input v-model="ruleForm.id" style="width: 180px"/>
            </el-form-item>
            <el-form-item label="类别名称" prop="typeName">
                <el-input v-model="ruleForm.typeName" style="width: 180px"/>
            </el-form-item>
            <el-form-item label="类别级别" prop="typeLevel">
                <el-select-v2
                v-model="ruleForm.typeLevel"
                :options="options"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                    :loading="updateTypeLoading"
                    >更新类别信息
                </el-button>
            </el-form-item>
        </el-form>
      </template>
    </el-dialog>
  </template>
  
  <script lang="ts" setup>
    import { ref, toRefs ,toRef,reactive,watch,computed,PropType,onMounted} from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import { updateType } from '@/api/game'

    const formSize = ref('default')
    const ruleFormRef = ref<FormInstance>()
    
    interface typeInfo {
        id:number,
        typeName:string,
        typeLevel:number,

    }
    const props = defineProps({
        updateTypeShow:Boolean,
        typeInfo:Object as PropType<typeInfo>
        // userInfo:Object
    })

    const ruleForm = reactive({
        id:0,
        typeName: '',
        typeLevel: 0,
    })

    watch(
        ()=>props.typeInfo,
        (newVal:any,oldVal:any)=>{
            console.log(newVal,'newVal')
            console.log(oldVal,'oldVal')
            ruleForm.id = newVal.id;
            ruleForm.typeName = newVal.typeName;
            ruleForm.typeLevel = newVal.typeLevel;
        },
    )

    const options = Array.from({ length: 10000 }).map((_, idx) => ({
        value: `${idx + 1}`,
        label: `${idx + 1}`,
    }))
        
    const showInfo = ref('')

    const rules = reactive<FormRules>({
        typeName: [
            { required: true, message: '请输入类别名', trigger: 'blur' },
            { min: 2, max: 10, message: '用户名长度在2到10个字符', trigger: 'blur' },
        ],
        typeLevel: [
            { required: true, message: '请输入类别级别',  },
            // { message: '', trigger: 'change' },
        ]
    })

    const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // console.log('submit!')
            submitEditType();
        } else {
            console.log('error submit!', fields)
        }
    })
    }
    const emit = defineEmits(['closeUpdateType','updateTypeComplete'])

    const updateTypeLoading = ref(false);

    const submitEditType = async()=>{
        updateTypeLoading.value = true;
        try {
            console.log("ruleForm",ruleForm)
            const updateResult:any = await updateType(ruleForm); 
            updateTypeLoading.value = false;
            if(updateResult.code == 200){
                console.log("updateResult",updateResult)
                emit('updateTypeComplete');
                outerVisible.value = false;
            }else{
                showInfoBox(updateResult.message)
            }
        } catch (error) {
            console.log(error);
            updateTypeLoading.value = false;
        }
    }

    const showInfoBox = (info:string)=>{
        showInfo.value = info;
        innerVisible.value = true;
    }

    const outerVisible = computed({
        get() {
            return props.updateTypeShow;
        },
        set(v) {
            emit('closeUpdateType',"close Update type")
        },
    });
   
    const innerVisible = ref(false)

    const closeUpdateType = ()=>{
        // console.log("close add user")
        outerVisible.value = false;
    }
  </script>
  <style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
    }
  </style>