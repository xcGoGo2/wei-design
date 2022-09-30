/*
 * @Author: chenwei
 * @Date: 2022-02-10 11:56:12
 * @LastEditors: chenwei
 * @LastEditTime: 2022-02-11 18:15:20
 * @FilePath: \weiManage\src\main.ts
 * @Description: 
 * 
 */
import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'  // 引入router
import store from './store/index'
import Api from './api/index'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
import './api/mock/index'
import svgIcon from "@/assets/svg/index.vue";
import 'virtual:svg-icons-register'

const app = createApp(App);

for (const name in ElIcons){
	// el-icon => 全局组件
	app.component(name,(ElIcons as any)[name])
}

app.component('svg-icon', svgIcon)

app.use(router).use(store)
// app.config.globalProperties.$api = Api;  // 配置全局数据请求

// 依赖注入配置全局变量 页面中使用 inject 接收
app.provide('global', {
	$api: Api,
})

app.mount('#app')
