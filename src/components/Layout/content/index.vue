<template>
    <a-card class="content">
        <section class="app-main">
            <template v-if="RouterActive">
                <RouterView v-slot="{ Component }">
                    <keep-alive max="10">
                        <component :is="Component" />
                    </keep-alive>
                </RouterView>
            </template>
        </section>
    </a-card>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue';
import { useUserStore } from '@/store/user';
const stores = useUserStore();
const RouterActive = ref(true);
watch(
    () => stores.$state.reset,
    () => {
        RouterActive.value = false;
        nextTick(() => {
            RouterActive.value = true;
        });
    }
);
</script>

<style scoped lang="scss">
.content {
    height: calc(100vh - 58px);
    box-sizing: border-box;
    overflow: auto;
    margin: 0px 10px;

    div {
        height: 500px;
    }
}

:deep(.ant-card-body) {
    padding: 0;
}
</style>
