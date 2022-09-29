/*
 * @Author: chenwei
 * @Date: 2022-02-10 13:27:09
 * @LastEditors: chenwei
 * @LastEditTime: 2022-02-10 13:41:43
 * @FilePath: \weiManage\src\router\index.ts
 * @Description: 路由
 * 
 */

// 引入router
import { createRouter, createWebHashHistory } from 'vue-router'
// 引入routes配置
import routes from './routes'

export default createRouter({
    history: createWebHashHistory(),
    routes
})


