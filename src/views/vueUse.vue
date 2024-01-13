<template>
    <h1> {{ t(7) }} </h1>
    <h3>Mouse: {{ x }} x {{ y }}</h3>
    <a-button @click="goRoute">{{ t(8) }}</a-button>
    <UsePinia></UsePinia>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t }: any = useI18n();
import request from '@/api/index';
import { onMounted } from 'vue';
import { useMouse } from '@vueuse/core';
import UsePinia from '@/components/UsePinia.vue';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
const stores = useUserStore()
const $router = useRouter()
const { x, y } = useMouse();
const getData = async () => {
    let obj = {
        limit: 100,
        page: 1,
        sector: '',
        workid: '',
        name: '',
        post: '',
        types: ''
    };
    let result = await request.getUserInfo(obj);
    console.log(result.data);
};
const goRoute = () => {
    stores.pageRoute('/black/keyword/game', '打字测试')
    $router.push('/black/keyword/game')
}
onMounted(() => {
    getData();
});
</script>

<style scoped></style>
