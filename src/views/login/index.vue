<template>
    <div class="login">
        <div class="form">
            <p class="title">登录通用后台模板</p>
            <a-form :model="formState" v-bind="layout" name="nest-messages" :validate-messages="validateMessages"
                @finish="onFinish">
                <a-form-item :name="['user', 'username']" label="账号" :rules="[{ required: true }]">
                    <a-input placeholder="请输入账号" v-model:value="formState.user.username" />
                </a-form-item>

                <a-form-item :name="['user', 'password']" label="密码" :rules="[{ required: true }]">
                    <a-input-password placeholder="请输入密码" v-model:value="formState.user.password" />
                </a-form-item>
                <a-form-item class="loginBtn">
                    <a-button type="primary" html-type="submit">登录</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
const stores = useUserStore();
const $router = useRouter()
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const validateMessages = {
    required: '${label}是必需的!',
};

const formState = reactive({
    user: {
        username: 'admin',
        password: '123456'
    },
});
const onFinish = (values: any) => {
    console.log('Success:', values);
    const path = stores.$state.activePath || '/'
    $router.push(path)
};

onMounted(() => {

})

</script>

<style scoped lang="scss">
.login {
    width: 100%;
    height: 100vh;
    background-color: rgb(221, 240, 252);
    position: relative;
    background: url('/src/assets/bg.jpg') no-repeat;
    background-size: 100% 100%;

    .form {
        width: 40%;
        position: absolute;
        box-sizing: border-box;
        min-width: 450px;
        max-width: 550px;
        padding: 20px 50px 20px 20px;
        background: rgba(217, 217, 217, 0.58);
        border: 1px solid white;
        box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
        backdrop-filter: blur(6px);
        border-radius: 17px;
        cursor: pointer;
        transition: all 0.3s;
        user-select: none;
        font-weight: bolder;
        color: black;
        top: 25%;
        left: 50%;
        transform: translateX(-50%);

        &:hover {
            box-shadow: 6px 8px 20px white;
        }

        .title {
            margin-left: 10%;
            margin-bottom: 10px;
            font-size: 28px;
            color: royalblue;
            font-weight: 600;
            letter-spacing: -1px;
            position: relative;
            display: flex;
            align-items: center;
            padding-left: 30px;
        }

        .loginBtn {
            text-align: center;
            button {
                width: 100%;
                margin-left: calc(4*100%/20);
            }
        }
    }
}


.title::before,
.title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: royalblue;
}

.title::before {
    width: 18px;
    height: 18px;
    background-color: royalblue;
}

.title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1.5s linear infinite;
}

@keyframes pulse {
    from {
        transform: scale(0.5);
        opacity: 1;
    }

    to {
        transform: scale(2);
        opacity: 0;
    }
}
</style>
