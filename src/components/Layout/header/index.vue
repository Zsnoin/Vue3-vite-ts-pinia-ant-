<template>
    <a-layout-header class="header">
        <div class="left-col">
            <a-dropdown :trigger="['contextmenu']">
                <div style="height: 100%">
                    <a-tabs v-model:activeKey="activeKey" :tab-bar-gutter="2" type="editable-card" size="small" hide-add
                        @tabClick="activeTab" @edit="onEdit">
                        <a-tab-pane v-for="pane in routeTabs" :key="pane.key" :tab="pane.title"
                            :closable="pane.path == '/home' ? false : true"></a-tab-pane>
                    </a-tabs>
                </div>
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="1" @click="closeTab('all')">关闭所有</a-menu-item>
                        <a-menu-item key="2" @click="closeTab('other')">关闭其他</a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
        <div class="right-col" flex="300px">
            <a-space>
                <a-button title="刷新" type="dashed" shape="circle" :icon="h(SyncOutlined)" @click="refresh" />
                <a-button title="全屏" type="dashed" shape="circle" :icon="h(fullIcon)" @click="fullScreen" />
                <a-select v-model:value="value" label-in-value style="width: 80px" :options="options"
                    @change="handleChange">
                </a-select>
                <a-dropdown>
                    <div class="image">
                        <img src="/src/assets/avatar.png" alt="" />
                    </div>
                    <template #overlay>
                        <a-menu @click="onClick">
                            <a-menu-item key="/home">首页</a-menu-item>
                            <a-menu-item key="/login">退出登录</a-menu-item>
                            <a-menu-item key="/">设置</a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </a-space>
        </div>
    </a-layout-header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { CompressOutlined, ExpandOutlined, SyncOutlined } from '@ant-design/icons-vue';
import { computed, h, ref, onMounted, inject } from 'vue';
// 国际化
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
import { useRouter } from 'vue-router';
// ant国际化
import ant_zhCN from 'ant-design-vue/lib/locale/zh_CN';
import ant_enUS from 'ant-design-vue/lib/locale/en_US';
const stores = useUserStore();
let routeTabs = stores.$state.routeTab;
const fullIcon = ref(CompressOutlined);
const $router = useRouter();
// 激活tab
const activeKey = computed(() => stores.$state.activeKey);
const useLanguage: any = inject('useLanguage');
const onEdit = (targetKey: string | MouseEvent) => {
    remove(targetKey as string);
};
const remove = (targetKey: string) => {
    // 移除的元素是当前激活的tab，前进一位
    if (targetKey == activeKey.value) {
        for (let i = 0; i < routeTabs.length; i++) {
            if (routeTabs[i].key == targetKey) {
                $router.push(routeTabs[i - 1].path);
                break;
            }
        }
    }
    stores.removeTab(targetKey);
};
interface key {
    key: string;
    path: string;
    name: string;
}
const activeTab = (targetKey: string) => {
    stores.changeActive(targetKey);
    let path = routeTabs.find((el: key) => el.key == targetKey).path;
    $router.push(path);
};

const closeTab = (type: string) => {
    if (type === 'all') $router.push('/home');
    stores.closeTab(type);
};

const refresh = () => {
    stores.$state.reset = !stores.$state.reset;
};

const fullScreen = () => {
    // 用来判断当前是不是全屏 true or null
    let full = document.fullscreenElement;
    if (!full) {
        // 全屏
        document.documentElement.requestFullscreen();
        fullIcon.value = ExpandOutlined;
    } else {
        // 退出全屏
        document.exitFullscreen();
        fullIcon.value = CompressOutlined;
    }
};

const value: any = ref({
    value: 'zh-cn',
    label: '中文',
    lang: ant_zhCN
});
const options: any = [
    {
        value: 'zh-cn',
        label: '中文',
        lang: ant_zhCN
    },
    {
        value: 'en-us',
        label: 'English',
        lang: ant_enUS
    }
];

const selectTab = () => {
    // window.location.pathname 获取路径部分
    const currentPath = window.location.pathname;
    let lists = document.querySelectorAll('.list');
    for (let i = 0; i < lists.length; i++) {
        if (lists[i].getAttribute('data-path') == currentPath) {
            lists[i].classList.add('active');
        }
    }
};

const handleChange = (lang: any) => {
    value.value = lang;
    locale.value = lang.value;
    useLanguage(lang.option.lang);
};

const onClick = (key: any) => {
    if (key.key == '/login') {
        stores.exitReset()
    }
    $router.push(key.key);
};
onMounted(() => {
    selectTab();
});
</script>

<style lang="scss" scoped>
.header {
    height: 46px;
    margin: 5px 10px;
    background-color: #fff;
    padding: 0;
    display: flex;
    align-items: center;

    .left-col {
        max-width: calc(100% - 300px);
    }

    .right-col {
        width: 300px;
        margin-left: auto;
        display: flex;
        justify-content: flex-end;

        .image {
            width: 46px;
            height: 46px;
            border-radius: 50%;
            cursor: pointer;
            overflow: hidden;
            margin-right: 10px;

            img {
                width: 46px;
                height: 46px;
                transition: all 0.5s;

                &:hover {
                    transform: scale(1.5);
                }
            }
        }
    }

    .ant-tabs {
        margin-top: 18px;
    }

    :deep(.ant-tabs-tab-active) {
        background-color: #1677ff;
        border-radius: 5px !important;

        & .ant-tabs-tab-btn {
            color: white;
        }

        .ant-tabs-tab-remove {
            color: white;
        }
    }
}
</style>
