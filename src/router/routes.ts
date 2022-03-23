/*
 * @Author: chenwei
 * @Date: 2022-02-10 13:30:14
 * @LastEditors: chenwei
 * @LastEditTime: 2022-02-11 12:49:07
 * @FilePath: \weiManage\src\router\routes.ts
 * @Description: 路由配置
 * 
 */
import Home from '../views/Home/index.vue'
import Login from '../views/Login/index.vue'
export default [
    { path: '/', redirect: '/home'},
    { path: '/login', component: Login },
    { path: '/home', component: Home },
]

