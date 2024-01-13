import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { start, close } from '@/utils/nprogress';
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined
} from '@ant-design/icons-vue';

const routes: any = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/components/Layout/index.vue'),
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {
                    title: '首页',
                    icon: DesktopOutlined
                },
                component: () => import('@/views/home.vue')
            },
            {
                path: 'mouse',
                name: 'Mouse',
                meta: {
                    title: '鼠标',
                    icon: UserOutlined,
                },
                component: () => import('@/views/vueUse.vue')
            },
            {
                path: 'people',
                name: 'people',
                meta: {
                    title: '人员信息',
                    icon: PieChartOutlined
                },
                component: () => import('@/views/user/user.vue'),
                redirect: '/people/online',
                children: [
                    {
                        path: 'online',
                        name: 'online',
                        meta: {
                            title: '在职',
                        },
                        component: () => import('@/views/user/online.vue')
                    },
                    {
                        path: 'leave',
                        name: 'leave',
                        meta: {
                            title: '离职',
                        },
                        component: () => import('@/views/user/leave.vue')
                    }
                ]
            },
            {
                path: 'black',
                name: 'black',
                meta: {
                    title: '键盘',
                    icon: TeamOutlined,
                    // 路由缓存
                    keepAlive: false,
                    requireAuth: true
                },
                component: () => import('@/views/user/user.vue'),
                children: [
                    {
                        path: 'keyword',
                        meta: {
                            title: '键盘'
                        },
                        component: () => import('@/views/user/user.vue'),
                        children: [
                            {
                                path: 'game',
                                meta: {
                                    title: '打字测试'
                                },
                                component: () => import('@/views/black.vue')
                            },
                            {
                                path: 'onlineTest',
                                meta: {
                                    title: '在职测试'
                                },
                                component: () => import('@/views/user/online.vue')
                            }
                        ]
                    },
                    {
                        path: 'test',
                        meta: {
                            title: '离职测试'
                        },
                        component: () => import('@/views/user/leave.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        meta: {
            title: '登录'
        },
        component: () => import('@/views/login/index.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((pre, next) => {
    start();
});

router.afterEach(() => {
    close();
});
export default router;
