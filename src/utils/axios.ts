import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { start, close } from '@/utils/nprogress';

const service = axios.create({
    baseURL: '',
    timeout: 1000
});

// 请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 进度条开始
        start();
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
        close();
        return response;
    },
    (error: any) => {
        // do
        return Promise.reject(error);
    }
);

export default service;
