<template>
    <div>
        <!-- 出口页面 -->
        <RouterView  v-slot="{ Component }">
            <keep-alive max="10">
                <component :is="Component" />
            </keep-alive>
        </RouterView>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
