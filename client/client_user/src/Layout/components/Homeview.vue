<template>
    <!-- <div class="path">
        <el-link type="primary">{{menuPath}}</el-link>
    </div> -->
    <RouterView></RouterView>
</template>
<!-- <script lang="ts" setup>
    import { computed } from 'vue';
    import { PermissionStore } from '../../store/permission';

    const permissionStore = PermissionStore();
    const menuPath = computed(()=> {return permissionStore.menuPath});
    
</script> -->

<style scoped>
    .path{
        text-align: left;
    }
</style>
