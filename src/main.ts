/*
 * @Author: chenwei
 * @Date: 2022-02-10 11:56:12
 * @LastEditors: chenwei
 * @LastEditTime: 2022-02-10 14:44:42
 * @FilePath: \weiManage\src\main.ts
 * @Description: 
 * 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'  // 引入router
import store from './store/index'

createApp(App).use(router).use(store).mount('#app')
