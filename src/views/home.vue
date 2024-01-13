<template>
    <div>
        <h1 class="user-name">{{ t(2) }}</h1>
        <a-empty />
    </div>
</template>

<script setup lang="ts">
// 国际化
import { useI18n } from 'vue-i18n';
const { t }: any = useI18n();
</script>

<style scoped lang="scss">
h1 {
    text-align: center;
    padding: 10px;
    font-size: 30px;
}
</style>
