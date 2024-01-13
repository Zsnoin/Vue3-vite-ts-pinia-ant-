# Vite + Vue3 + Typescript + Pinia + ant

# 环境依赖版本

- [node](https://github.com/nodejs/node)：v16.14.0
- [vite](https://github.com/vitejs/vite)：^2.8.0
- [vue](https://github.com/vuejs/vue)：^3.2.25
- [typescript](https://github.com/microsoft/TypeScript)：^4.5.4
- [pinia](https://github.com/vuejs/pinia)：^2.0.12
- [vue-router](https://github.com/vuejs/router)：^4.0.14
- [vueuse](https://github.com/vueuse/vueuse)：^8.2.0
- [eslint](https://github.com/eslint/eslint)：^8.12.0
- [prettier](https://github.com/prettier/prettier)：^2.6.1
- [commitizen](https://github.com/commitizen/cz-cli)：^4.2.4
- [husky](https://github.com/typicode/husky)：^7.0.4
- [ant-design-vue](https://www.antdv.com/docs/vue/introduce-cn/): "4.0.0-rc.6"

# 1. 初始化项目

## 按步骤提示初始化：

1. 使用 vite-cli 命令

```bash
# pnpm
pnpm create vite

# npm
npm init vite@latest

# yarn
yarn create vite
```

2. 输入项目名：

```bash
? Project name:  vite-vue3-ts-pinia
```

3. 选择一个框架（vue）

```bash
? Select a framework: » - Use arrow-keys. Return to submit.
     vanilla // 原生js
 >   vue     // 默认就是 vue3
     react   // react
     preact  // 轻量化react框架
     lit     // 轻量级web组件
     svelte  // svelte框架
```

4. 使用 typescript

```
? Select a variant: › - Use arrow-keys. Return to submit.
     vue
 ❯   vue-ts
```

5. 启动项目

```bash
cd vite-vue3-ts-pinia && pnpm install && pnpm run dev
```

## 快速初始化（建议使用）：

```
# pnpm
pnpm create vite project-name -- --template vue-ts

# npm 6.x
npm init vite@latest project-name --template vue-ts
 
# npm 7+, 需要额外的双横线：
npm init vite@latest project-name -- --template vue-ts
 
# yarn
yarn create vite project-name --template vue-ts
```

## 集成配置

1. 为保证 node 的使用

```bash
pnpm i @types/node --save-dev
```

2. 修改 `tsconfig.json`

```json
{
    "compilerOptions": {
        "typeRoots": [
            "node_modules/@types", // 默认值
            "src/types"
        ],
        "target": "esnext",
        "useDefineForClassFields": true,
        "module": "esnext",
        "moduleResolution": "node",
        "strict": true,
        "jsx": "preserve",
        "sourceMap": true,
        "resolveJsonModule": true,
        "esModuleInterop": true,
        "lib": ["esnext", "dom"],
        "baseUrl": "./",
        "paths": {
            "@": ["src"],
            "@/*": ["src/*"]
        }
    },
    "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

3. 修改 `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [vue()],
    server: {
        port: 8080, //启动端口
        hmr: {
            host: '127.0.0.1',
            port: 8080
        },
        // 设置 https 代理跨域
        proxy: {
            //  /api 开头的接口执行代理
            '/api': {
                //  实际请求地址
                target: 'your https address',
                //  开启跨域
                changeOrigin: true,
                //  实际请求地址不包含 /api ，替换为 空。
                rewrite: (path: string) => path.replace(/^\/api/, '')
            },
            //  /test 开头的接口执行代理
            '/api': {
                target: 'your https address',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/test/, '')
            }
        }
    }
});
```

# 2. 代码质量风格的统一

## 集成 `eslint`

1. 安装

```bash
pnpm i eslint eslint-plugin-vue --save-dev
```

由于 ESLint 默认使用  [Espree](https://github.com/eslint/espree)  进行语法解析，无法识别 TypeScript 的一些语法，故我们需要安装  [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser) 替代掉默认的解析器

```bash
pnpm install @typescript-eslint/parser --save-dev
```

安装对应的插件  [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)  它作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则。

```bash
pnpm install @typescript-eslint/eslint-plugin --save-dev
```

2. 创建配置文件： `.eslintrc.js`  或  `.eslintrc.json`

```javascript
module.exports = {
    parser: 'vue-eslint-parser',

    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },

    extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended'],

    rules: {
        // override/add rules settings here, such as:
    }
};
```

3. 创建忽略文件：`.eslintignore`

```
node_modules/
dist/
index.html
```

4. 命令行式运行：修改 `package.json`

```json
{
    ...
    "scripts": {
        ...
        "eslint:comment": "使用 ESLint 检查并自动修复 src 目录下所有扩展名为 .js 和 .vue 的文件",
        "eslint": "eslint --ext .js,.vue --ignore-path .gitignore --fix src",
    }
    ...
}
```

## 集成 `prettier`

1. 安装

```bash
pnpm i prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

2. 创建配置文件： `prettier.config.js` 或 `.prettierrc.js`

```javascript
module.exports = {
    // 一行最多 80 字符
    printWidth: 80,
    // 使用 4 个空格缩进
    tabWidth: 4,
    // 不使用 tab 缩进，而使用空格
    useTabs: false,
    // 行尾需要有分号
    semi: true,
    // 使用单引号代替双引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // jsx 不使用单引号，而使用双引号
    jsxSingleQuote: false,
    // 末尾使用逗号
    trailingComma: 'all',
    // 大括号内的首尾需要空格 { foo: bar }
    bracketSpacing: true,
    // jsx 标签的反尖括号需要换行
    jsxBracketSameLine: false,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用 lf
    endOfLine: 'auto'
};
```

3. 修改 `.eslintrc.js` 配置

```javascript
module.exports = {
    ...

    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended'
    ],

    ...
};
```

4. 命令行式运行：修改 `package.json`

```json
{
    ...
    "scripts": {
        ...
        "prettier:comment": "自动格式化当前目录下的所有文件",
        "prettier": "prettier --write"
    }
    ...
}
```

# 3. 集成 `pinia`

`Pinia` 读音：['piːnə]，是 Vue 官方团队推荐代替`Vuex`的一款轻量级状态管理库。

**Pinia 有如下特点：**

- 完整的 typescript 的支持；
- 足够轻量，压缩后的体积只有 1.6kb;
- 去除 mutations，只有 state，getters，actions（这是我最喜欢的一个特点）；
- actions 支持同步和异步；
- 没有模块嵌套，只有 store 的概念，store 之间可以自由使用，更好的代码分割；
- 无需手动添加 store，store 一旦创建便会自动添加；

## 安装

```
 pnpm i pinia --save
```

## 使用

1. 新建 src/store 目录并在其下面创建 index.ts，导出 store

```typescript
import { createPinia } from 'pinia';

const store = createPinia();

export default store;
```

2. 在 main.ts 中引入并使用

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // 创建vue实例
const app = createApp(App); // 挂载pinia
app.use(store); // 挂载实例
app.mount('#app');
```

3. **定义 State：** 在 src/store 下面创建一个 user.ts

```typescript
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            name: '张三'
        };
    },
    actions: {
        updateName(name) {
            this.name = name;
        }
    }
});
```

4. **获取 State：** 在 src/components/usePinia.vue 中使用

```typescript
 <template>
   <div>{{ userStore.name }}</div>
 </template>

 <script lang="ts" setup>
 import { useUserStore } from '@/store/user'

 const userStore = useUserStore()
 </script>
```

5. **修改 State：**

```typescript
 // 1. 直接修改 state （不建议）
 userStore.name = '李四'

 // 2. 通过 actions 去修改
 <script lang="ts" setup>
 import { useUserStore } from '@/store/user'

 const userStore = useUserStore()
 userStore.updateName('李四')
 </script>
```

> 更详细上手指南：[链接](https://juejin.cn/post/7049196967770980389) 官方文档：[链接](https://pinia.vuejs.org/introduction.html)

# 4. 集成 `vue-router4`

## 安装

```bash
 pnpm i vue-router --save
```

## 使用

1. 新建 src/router 目录并在其下面创建 index.ts，导出 router

```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            keepAlive: true,
            requireAuth: false
        },
        component: () => import('@/pages/login.vue')
    },
    {
        path: '/',
        name: 'Index',
        meta: {
            title: '首页',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/index.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;
```

2. 在 main.ts 中引入并使用

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from '@/router'; // 创建vue实例

const app = createApp(App);

app.use(router); // 挂载实例

app.mount('#app');
```

3. 修改 App.vue

```typescript
<template>
       <RouterView /> 
</template>
```

# 5. 集成 `vueuse`

`VueUse` 是一个基于  `Composition API` 的实用函数集合。

## 安装

```
 pnpm i @vueuse/core
```

## 使用

1. 创建一个新的 src/page/vueUse.vue 页面来做一个简单的 demo

```typescript
 <template>
   <h1> 测试 vueUse 的鼠标坐标 </h1>
   <h3>Mouse: {{x}} x {{y}}</h3>
 </template>

 <script lang="ts">
     import { defineComponent } from 'vue';
     import { useMouse } from '@vueuse/core'

     export default defineComponent({
         name: 'VueUse',
         setup() {
           const { x, y } = useMouse()

           return {
             x, y
           }
         }
     });
 </script>
```

useMouse 只是 vueuse 的一个最基本的函数库，还有许多，总会有一个适合你；

更多函数官方文档：[链接](https://vueuse.org/)

# 6. CSS 的集成

## 方案一：原生 css variable 新特性：

原生支持，不需要第三方插件，具体使用文档可 [查看](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var)

1. 新建文件 src/styles/index.css

```css
 :root {
   --main-bg-color: pink;
 }
 ​
 body {
   background-color: var(--main-bg-color);
 }
```

注：还可以增加 PostCSS 配置，(任何受  [postcss-load-config](https://github.com/postcss/postcss-load-config) 支持的格式，例如  `postcss.config.js` )，它将会自动应用于所有已导入的 CSS。

## 方案二：scss 或 less：

1. 安装

```bash
 # .scss and .sass  （sass为例）
pnpm install sass node-sass sass-loader

 # .less
pnpm add -D less
```

2. 使用在 .vue 文件模板中

```typescript
//局部引用  在 .vue 文件夹中
<script>
import "@/assets/style/idnex.scss";
</script>
<style lang="scss" scoped>
</style>

// 全局引用 在 main.ts中
import "./assets/style/idnex.scss";
```

3. 引入变量、混入

```typescript
// 举例：在 src/style/ 文件夹中创建 color.scss、mixin.scss 文件

// color.scss 文件
// 颜色变量
$red: #ff3c3c;
$orange: #ff9302;
$yellow: #fecf03;
$blue: #2e6cf6;
$green: #5cc9a5;


//mixin.scss
// 混入-滚动条样式
@mixin scroll-bar {
  &::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }
}
```

4. 配置

```typescript
// 按照上面的方法引入变量是不会生效的，scss变量 需要在 打包工具 中配置，如 vue.config.js、vite.config.ts
export default defineConfig({
    css: {
        // css预处理器
        preprocessorOptions: {
            scss: {
                // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
                // 给导入的路径最后加上 ;
                additionalData: '@import "@/styles/mixin.scss";@import "@/styles/color.scss";'
            }
        }
    }
});
```

5. 使用

```typescript
// 经过上面的方法引入后，即可在全局使用配置好的变量和混入了，使用方法如下
<style lang="scss">
#app {
    @include scroll-bar;
    color: $blue;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;

    margin-top: 60px;
}
</style>
```

# 7. 集成 `axios`

`axios` 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

## 安装

```bash
 pnpm i axios
```

## 使用：

1. 新建 src/utils/axios.ts

```typescript
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const service = axios.create(); // Request interceptors

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // do something
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    }
); // Response interceptors

service.interceptors.response.use(
    async (response: AxiosResponse) => {
        // do something
    },
    (error: any) => {
        // do something
        return Promise.reject(error);
    }
);

export default service;
```

2. 在页面中使用即可

```typescript
<script lang="ts">
    import request from '@/utils/axios';
    const requestRes = async () => {
        let result = await request({
                    url: '/api/xxx',
                    method: 'get'
                  });
    }

</script>
```

## 封装请求参数和响应数据的所有 api (可选项)

1. 新建 `src/api/index.ts`

```typescript
import * as login from './module/login';
import * as index from './module/index';

export default Object.assign({}, login, index);
```

2. 新建 `src/api/module/login.ts` 和 `src/api/module/index.ts`

```typescript
import request from '@/utils/axios';

/**
 * 登录
 */

interface IResponseType<P = {}> {
    code?: number;
    status: number;
    msg: string;
    data: P;
}
interface ILogin {
    token: string;
    expires: number;
}
export const login = (username: string, password: string) => {
    return request<IResponseType<ILogin>>({
        url: '/api/auth/login',
        method: 'post',
        data: {
            username,
            password
        }
    });
};
```

3. 由于使用了 typescript，所以需新增 `src/types/shims-axios.d.ts`

```typescript
import { AxiosRequestConfig } from 'axios';
/**
 * 自定义扩展axios模块
 * @author Maybe
 */
declare module 'axios' {
    export interface AxiosInstance {
        <T = any>(config: AxiosRequestConfig): Promise<T>;
        request<T = any>(config: AxiosRequestConfig): Promise<T>;
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
        patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    }
}
```

4. 在 `src/pages/request.vue` 页面中使用

```typescript
<script lang="ts">
    import API from '@/api';

    const requestRes = async () => {
        let result = await API.login('zhangsan', '123456');
    }

</script>
```

# 8. css 的 UI 样式库

> 可选很多，根据自己项目的需求去进行选择即可

**注意：UI 库一般需要按需引入（下面以 `element-plus` 为例）**

1. 安装 `vite-plugin-style-import`

```bash
pnpm i vite-plugin-style-import --save-dev
```

2. 修改 `vite.config.ts`

```typescript
...
import styleImport from 'vite-plugin-style-import'


export default defineConfig({
    ...
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    resolveStyle: (name) => {
                        return `element-plus/lib/theme-chalk/${name}.css`;
                    },
                    ensureStyleFile: true // 忽略文件是否存在, 导入不存在的CSS文件时防止错误。
                }
            ]
        })
    ],
    ...
})
```

# 9. 安装 husky

1. 安装

```bash
# 1.安装
pnpm i husky lint-staged -D

# 2.生成 .husky 的文件夹
npx husky install

# 3.添加 hooks，会在 .husky 目录下生成一个 pre-commit 脚本文件
npx husky add .husky/pre-commit "npx --no-install lint-staged"

# 4.添加 commit-msg
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

# 5. 使用 `git commit -m "message"` 就会看到 hook 生效了。
```

2. 添加配置 `package.json`

```json
{
  ...
  "lint-staged": {
        "*.{js,ts}": [
            "npm run eslint",
            "npm run prettier"
        ]
  }
  ...
}
```

# 10. 安装 nprogress 进度条

1. 安装

```bash
pnpm i nprogress -S
//类型声明文件
pnpm i --save-dev @types/nprogress
```

2. 封装 nprogress

```ts
// 文件位置：  src/utils/nprogress.ts
// 引入进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

//全局进度条的配置
NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 1000, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
});

// 打开进度条
export const start = () => {
    NProgress.start();
};

// 关闭进度条
export const close = () => {
    NProgress.done();
};
```

3. 使用

```ts
# （1） 分别在请求拦截器 和 响应拦截器 中，打开 和 关闭 进度条 /src/utils/axios.ts
// 请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 进度条开始
        start()
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    async (response: AxiosResponse) => {

        // 进度条关闭
        close()
        return response
    },
    (error: any) => {
        // do
        return Promise.reject(error);
    }
);

# （2） 分别在路由开始 和 路由结束 中，打开 和 关闭 进度条。 /src/router/index.ts

router.beforeEach((pre, next) => {
    start()
})

router.afterEach(() => {
    close()
})
```

# 11. vue-i18n 国际化

1. 安装

```bash
# 需要注意的是vue3最好使用9.x以上的版本！
pnpm install vue-i18n@9 --save
```

2. 全局注册

```ts
//   /src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import i18n from './language';
const app = createApp(App);
app.use(i18n);
app.mount('#app');
```

3. 创建 i18n 所需文件夹

```ts
-src -
    language - //语言配置文件夹
    locales;
en_US.ts; //多语言翻译 key-value 形式
zh_CN.ts;
index.ts; //配置
```

4. 使用

```vue
<template>
    <div>{{t(1)}}</div>
</template>

<script setup lang="ts">
// 国际化
import { useI18n } from 'vue-i18n'
const { t }: any = useI18n();
<script>
```

5. ui 框架国际化（ant-design-vue)

```vue
// ant-design-vue 提供了一个 Vue 组件 ConfigProvider 用于全局配置国际化文案 //
根据使用框架的不同进行配置
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
    provide('useLanguage', useLanguage);
</script>
```

# 12. 有时间在补充Layout组件封装等

1. 安装

```bash
# layout组件封装

```