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
            host: 'localhost',
            port: 8080
        },
        // 设置代理 (多个代理)
        proxy: {
            //  /api接口执行这个代理
            '/api': {
                // 代理地址
                target: 'http://127.0.0.1:9071',
                // 开启跨域
                changeOrigin: true,
                //  实际路径没有 /api ， 把 /api 替换为空
                rewrite: (path: string) => path.replace(/^\/api/, '')
            },
            '/test': {
                target: 'http://127.0.0.1:9071',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/test/, '')
            }
        }
    },
    css: {
        // css预处理器
        preprocessorOptions: {
            scss: {
                // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
                // 给导入的路径最后加上 ;
                additionalData: '@import "@/styles/mixin.scss";@import "@/styles/color.scss";'
            }
        }
    },
    build: {
        chunkSizeWarningLimit: 10000
    }
});
