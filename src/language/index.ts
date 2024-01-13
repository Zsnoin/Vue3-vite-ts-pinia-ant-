import { createI18n } from 'vue-i18n';
import zhCN from './locales/zh_CN';
import enUS from './locales/en_US';

// ant国际化
import ant_zhCN from 'ant-design-vue/lib/locale/zh_CN';
import ant_enUS from 'ant-design-vue/lib/locale/en_US';

const messages = {
    'zh-cn': {
        ...zhCN,
        ...ant_zhCN
    },
    'en-us': {
        ...enUS,
        ...ant_enUS
    }
};

const i18n = createI18n({
    legacy: false,
    locale: 'zh-cn', // 默认显示语言
    messages
});

export default i18n;
