<template>
    <div class="search">
        <a-input v-model:value="keyWord" @change="searchMenu" placeholder="搜索"></a-input>
    </div>
    <div class="menu">
        <a-menu v-model:openKeys="state.openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="light"
            :items="items" @click="goRoute" @openChange="openMenu"></a-menu>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, h, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import _ from 'lodash';
const keyWord = ref('')
const stores = useUserStore();
const $router = useRouter();
const routes: any = $router.options.routes[0].children;
const state: any = reactive({
    openKeys: [],
    preOpenKeys: []
});
// 激活菜单
const selectedKeys: any = computed(() => stores.$state.selectedKey);
// menu菜单
let items: any = ref([]);
let arrMenu: object[] = []
// 路由最终结果
const result = (ro: any) => {
    ro.forEach((route: any) => {
        let result = changeRoute(route);
        arrMenu.push(result);
    });
    items.value = arrMenu;
};

// 路由数据格式整理
const changeRoute = (obj: any) => {
    if (obj.children) {
        let children: any = [];
        obj.children.forEach((el: any) => {
            let els = changeRoute(el);
            children.push(els);
        });
        let item: any = {
            key: obj.path,
            icon: () => h(obj.meta.icon),
            label: obj.meta.title,
            title: obj.meta.title,
            children: children
        };
        return item;
    } else {
        let item = {
            key: obj.path,
            icon: () => h(obj.meta.icon),
            label: obj.meta.title,
            title: obj.meta.title
        };
        return item;
    }
};

const goRoute = ({ item, key, keyPath }: any) => {
    let path = '/' + [keyPath][0].join('/');
    $router.push(path)
    let obj = {
        title: [item][0].title,
        path: path,
        key: [key][0],
        selectedKey: [key]
    };
    stores.addRouteTab(obj);
};

watch(
    () => stores.$state.openKeys,
    (newValue, oldValue) => {
        if (!stores.$state.collapsed) state.openKeys = newValue
    }
)

const openMenu = () => {
    stores.openMenu(state.openKeys)
}

// 搜索菜单
const searchMenu = () => {
    let arr: object[] = []
    if (keyWord.value) {
        _.cloneDeep(arrMenu).forEach((route: any) => {
            let result = searchFunction(route, keyWord.value)
            arr.push(result)
        });
        items.value = arr;
    } else {
        items.value = arrMenu;
    }
}
// 搜索函数
const searchFunction = (route: any, value: any) => {
    if (route.title.includes(value)) {
        return route
    } else {
        if (route.children) {
            let arr: any = []
            route.children.forEach((el: any) => {
                let result = searchFunction(el, value)
                if (result) {
                    arr.push(result)
                }
            })
            if (arr.length > 0) {
                route.children = arr
                return route
            }
        }
    }

}

onMounted(() => {
    result(routes);
    state.openKeys = stores.$state.openKeys
});
</script>

<style scoped lang="scss">
.search {
    padding: 10px;
    height: 52px;
}

.menu {
    overflow-y: auto;
    height: calc(100vh - 52px - 48px - 52px);
}
</style>
