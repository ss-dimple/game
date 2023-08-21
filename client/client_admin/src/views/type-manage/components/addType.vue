<template>
    <el-dialog v-model="outerVisible" 
                title="新增类别" 
                @close="closeAddType" 
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
                    :loading="addTypeLoading"
                    >添加类别</el-button
                >
                <el-button @click="resetForm(ruleFormRef)">清空</el-button>
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
    import { ref, toRefs ,toRef,reactive,watch,computed} from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import { addType } from '@/api/game'

    const formSize = ref('default')
    const ruleFormRef = ref<FormInstance>()

    const props = defineProps({
        addTypeShow:Boolean,  
    })

    const ruleForm = reactive({
        typeName: '',
        typeLevel: '',
    })

    const showInfo = ref('')

    const rules = reactive<FormRules>({
        typeName: [
            { required: true, message: '请输入类别名', trigger: 'blur' },
            { min: 2, max: 10, message: '用户名长度在2到10个字符', trigger: 'blur' },
        ],
        typeLevel: [
            { required: true, message: '请输入类别级别', trigger: 'blur' },
            { message: '用户编号长度在4到5个字符', trigger: 'change' },
        ]
    })

    const options = Array.from({ length: 10000 }).map((_, idx) => ({
        value: `${idx + 1}`,
        label: `${idx + 1}`,
    }))

    const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // console.log('submit!')
            submitAddType();
        } else {
            console.log('error submit!', fields)
        }
    })
    }
    const emit = defineEmits(['closeAddType','addTypeComplete'])

    const addTypeLoading = ref(false);

    const submitAddType = async()=>{
        addTypeLoading.value = true;
        try {
            const addResult:any = await addType(ruleForm); 
            console.log("addResult",addResult)
            addTypeLoading.value = false;
            if(addResult.code == 200){
                console.log("addResult",addResult)
                emit('addTypeComplete');
                outerVisible.value = false;
                resetForm(ruleFormRef.value)
            }else{
                showInfoBox(addResult.message)
            }
            
        } catch (error) {
            console.log(error);
            addTypeLoading.value = false;
        }
    }

    const showInfoBox = (info:string)=>{
        showInfo.value = info;
        innerVisible.value = true;
    }

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }

    const outerVisible = computed({
        get() {
            return props.addTypeShow;
        },
        set(v) {
            emit('closeAddType',"close Add user")
        },
    });
   
    const innerVisible = ref(false)

    const closeAddType = ()=>{
        console.log("close add user")
        outerVisible.value = false;
    }
  </script>
  <style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
    }
  </style>