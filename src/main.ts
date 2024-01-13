import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import Antd from 'ant-design-vue';
import i18n from './language';
import piniaPluginPersist from 'pinia-plugin-persist'
store.use(piniaPluginPersist)
// 创建vue实例
const app = createApp(App);

app.use(store);
app.use(router);
app.use(Antd);
app.use(i18n);
// 挂载实例
app.mount('#app');
