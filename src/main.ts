import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'  // 引入router
import store from './store/index'
import Api from './api/index'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
import './api/mock/index';
import svgIcon from "@/assets/svg/index.vue";
import 'virtual:svg-icons-register';
import WeiRow from '@/components/Layout/Row/index.vue';
import WeiCol from '@/components/Layout/Col/index.vue';

const app = createApp(App);

// 全局组件
for (const name in ElIcons){
	app.component(name,(ElIcons as any)[name])
};
app.component('svg-icon', svgIcon);
app.component('wei-row', WeiRow);
app.component('wei-col', WeiCol);


app.use(router).use(store);
// app.config.globalProperties.$api = Api;  // 配置全局数据请求

// 依赖注入配置全局变量 页面中使用 inject 接收
app.provide('global', {
	$api: Api,
});

app.mount('#app');