<template>
    <div id="content">
        <el-result
            icon="error"
            title="404"
            sub-title="无法找到要访问的页面"
        >
            <template #extra>
                <el-button type="primary" @click="goBack">Back</el-button>
            </template>
      </el-result>
    </div>
</template>

<script lang="ts" setup>
    import {useRouter} from 'vue-router'

    const router = useRouter();
    const goBack = ()=>{
        router.go(-1);
    }
</script>

<style scoped>
    #content{
        margin: 100px auto;
        text-align: center;
    }
</style>