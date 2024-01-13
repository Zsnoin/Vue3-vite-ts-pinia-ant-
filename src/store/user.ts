import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: (): any => ({
        name: '张三',
        // 侧边导航栏收起状态
        collapsed: false,
        // 顶部tab标签
        routeTab: [{ title: '首页', path: '/home', key: 'home' }],
        // 激活的tab标签
        activeKey: 'home',
        // 激活的menu菜单
        selectedKey: ['home'],
        // 展开的菜单项
        openKeys: [],
        // 激活路由路径
        activePath: '/home',
        // 刷新页面
        reset: true,
    }),
    persist: {
        enabled: true,
        // 自定义持久化参数
        strategies: [
            {
                // 自定义key
                key: 'login_store',
                // 自定义存储方式，默认sessionStorage
                storage: localStorage,
                // 指定要持久化的数据，默认所有 state 都会进行缓存，可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
                // paths: ['curUsername'],
            }
        ]
    },
    actions: {
        //侧边栏收起状态
        aisdeCollapsed() {
            this.collapsed = !this.collapsed
        },
        // 左侧菜单点击 首次添加tab
        addRouteTab(obj: any) {
            let exist = this.routeTab.some((el: any) => el.path == obj.path);
            this.activeKey = obj.key;
            this.selectedKey = obj.selectedKey;
            this.activePath = obj.path
            if (!exist) {
                this.routeTab.push(obj);
            }
        },
        // 菜单展开 or 关闭
        openMenu(openKeys: any) {
            this.openKeys = openKeys
        },
        // 点击顶部 tab 改变激活菜单
        changeActive(key: string) {
            this.activeKey = key;
            this.selectedKey[0] = key;
            const obj = this.routeTab.find((el: any) => el.key === key)
            this.activePath = obj.activePath
            this.activePath = obj.path
            const arr = obj.path.split('/')
            const openKeys = arr.filter((el: any, index: number) => index < arr.length - 1 && index > 0)
            this.openKeys = [...new Set([...this.openKeys, ...openKeys])]
        },
        // 顶部tab 移除某个路由
        removeTab(key: string) {
            for (let i = 0; i < this.routeTab.length; i++) {
                if (this.routeTab[i].key == key) {
                    if (this.routeTab[i].key == this.activeKey) {
                        this.changeActive(this.routeTab[i - 1].key)
                    }
                    this.routeTab.splice(i, 1);
                }
            }
        },
        // 顶部tab 关闭其他或所有路由
        closeTab(type: string) {
            if (type === 'all') {
                for (let i = 1; i < this.routeTab.length; i++) {
                    this.routeTab.splice(i, 1);
                    i--;
                }
                this.activeKey = 'home';
                this.selectedKey[0] = 'home';
                this.openKeys = []
            } else {
                for (let i = 1; i < this.routeTab.length; i++) {
                    if (this.routeTab[i].key !== this.activeKey) {
                        this.routeTab.splice(i, 1);
                        i--;
                    }
                }
            }
        },
        // 退出重置
        exitReset() {
            this.collapsed = false
            this.routeTab = [{ title: '首页', path: '/home', key: 'home' }]
            this.activeKey = 'home'
            this.selectedKey = ['home']
            this.openKeys = []
            this.activePath = '/home'
        },
        // 页面内路由跳转
        pageRoute(path: string, title: string) {
            let exist = this.routeTab.some((el: any) => el.path == path)
            const newArr = path.split('/')
            let openKeys: string[] = []
            if (newArr.length > 1) {
                openKeys = newArr.filter((el: any, index: number) =>
                    index < newArr.length - 1 && index > 0
                )
            }
            let obj = {
                title: title,
                path: path,
                key: newArr[newArr.length - 1]
            }
            if (!exist) this.routeTab.push(obj)
            this.activeKey = newArr[newArr.length - 1]
            this.selectedKey[0] = newArr[newArr.length - 1]
            this.openKeys = openKeys
            this.activePath = path
        }
    }
});
