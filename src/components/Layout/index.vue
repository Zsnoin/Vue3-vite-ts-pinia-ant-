<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" @collapse="collStatus" class="sider" theme="light" collapsible>
            <div class="logo"> Logo </div>
            <Menu></Menu>
        </a-layout-sider>
        <a-layout>
            <Header></Header>
            <Content></Content>
            <!-- <Comtne></Comtne> -->
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import { ref, watch, computed, onMounted } from 'vue';
import Menu from './menu/index.vue';
import Header from './header/index.vue';
import Content from './content/index.vue';

import { useUserStore } from '@/store/user';
const stores = useUserStore();
const collapsed = ref<boolean>(stores.$state.collapsed);
const collStatus = () => {
    stores.aisdeCollapsed()
}
</script>
<style lang="scss" scoped>
.sider {
    .logo {
        height: 32px;
        margin: 10px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        background: url('/src/assets/logo.png') no-repeat;
        background-size: 100% 100%;
        color: white;
        cursor: pointer;
        border-radius: 2px;
    }
}
</style>
