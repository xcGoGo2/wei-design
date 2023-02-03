/*
 * @Author: chenwei
 * @Date: 2022-02-10 13:30:14
 * @LastEditors: chenwei
 * @LastEditTime: 2022-02-11 12:49:07
 * @FilePath: \weiDesign\src\router\routes.ts
 * @Description: 路由配置
 *
 */
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'

export default [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login, name: 'Login' },
    {
        path: '/home',
        redirect: '/index',
        component: Home,
        children: [
            {
                path: '/index',
                name: '首页',
                component: import('@/views/Pages/Index/index.vue'),
            },
            {
                path: '/assembly',
                name: '组件',
                component: import('@/views/Pages/Assembly/index.vue'),
            },
            {
                path: '/boardsheet',
                name: '数据集',
                component: import('@/views/Pages/Boardsheet/index.vue'),
            },
            {
                path: '/weiDesign',
                name: '',
                children: [
                    {
                        path: 'myDesign',
                        name: '界面设计',
                        component: import('@/views/Pages/weiDesign/MyDesign/index.vue'),
                    },
                    {
                        path: 'tplMarket',
                        name: '模板市场',
                        component: import('@/views/Pages/weiDesign/TplMarket/index.vue'),
                    },
                ],
            },
            {
                path: '/manage/userManage',
                name: '用户管理',
                component: import('@/views/Pages/manage/UserManage/index.vue'),
            },
            {
                path: '/manage/userGroupManage',
                name: '组织管理',
                component: import('@/views/Pages/manage/userGroupManage/index.vue'),
            },
            {
                path: '/errPage/is404',
                name: '404',
                component: import('@/views/Pages/errPage/Is404/index.vue'),
            },
            {
                path: '/errPage/is500',
                name: '500',
                component: import('@/views/Pages/errPage/Is500/index.vue'),
            },
        ],
    },
    {
        path: '/weiDesign/designSpace',
        name: '工作空间',
        component: import('@/views/Pages/weiDesign/MyDesign/DesignSpace/index.vue'),
        meta: {
            title: '工作空间'
        },
    }
]
