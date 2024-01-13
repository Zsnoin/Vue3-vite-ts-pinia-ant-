<template>
    <div>
        <ConfigProvider :locale="language">
            <router-view></router-view>
        </ConfigProvider>
    </div>
</template>

<script setup lang="ts">
    import { ref, provide } from 'vue';
    import { ConfigProvider } from 'ant-design-vue';
    // ant国际化
    import ant_zhCN from 'ant-design-vue/lib/locale/zh_CN';
    let language: any = ref(ant_zhCN);
    const useLanguage = (value: any) => {
        language.value = value;
    };
    // 爷孙通信 组件国际化
    provide('useLanguage', useLanguage);
</script>

<style>
    *,
    p {
        padding: 0;
        margin: 0;
    }
</style>
