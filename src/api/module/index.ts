import request from '@/utils/axios';

export const getUserInfo = (data: any) => {
    return request({
        url: '/test/userinfo',
        method: 'post',
        data: data
    });
};
