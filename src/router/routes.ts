import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import Index from '@/views/Pages/Index/index.vue'
import Assembly from '@/views/Pages/Assembly/index.vue'
import Boardsheet from '@/views/Pages/Boardsheet/index.vue'
import MyDesign from '@/views/Pages/MyDesign/index.vue'
import TplMarket from '@/views/Pages/TplMarket/index.vue'
import DesignSpace from '@/views/Pages/MyDesign/DesignSpace/index.vue'

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
                component: Index,
            },
            {
                path: '/assembly',
                name: '组件',
                component: Assembly,
            },
            {
                path: '/boardsheet',
                name: '数据集',
                component: Boardsheet,
            },
            {
                path: '/weiDesign',
                name: '',
                children: [
                    {
                        path: 'myDesign',
                        name: '界面设计',
                        component: MyDesign,
                    },
                    {
                        path: 'tplMarket',
                        name: '模板市场',
                        component: TplMarket,
                    },
                ],
            },
            // {
            //     path: '/manage/userManage',
            //     name: '用户管理',
            //     component: import('@/views/Pages/manage/UserManage/index.vue'),
            // },
            // {
            //     path: '/manage/userGroupManage',
            //     name: '组织管理',
            //     component: import('@/views/Pages/manage/userGroupManage/index.vue'),
            // },
            // {
            //     path: '/errPage/is404',
            //     name: '404',
            //     component: import('@/views/Pages/errPage/Is404/index.vue'),
            // },
            // {
            //     path: '/errPage/is500',
            //     name: '500',
            //     component: import('@/views/Pages/errPage/Is500/index.vue'),
            // },
        ],
    },
    {
        path: '/weiDesign/designSpace',
        name: '工作空间',
        component: DesignSpace,
        meta: {
            title: '工作空间'
        },
    }
]
