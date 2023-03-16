import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import SystemInfo from '@/views/Pages/SystemInfo/index.vue'
import Assembly from '@/views/Pages/Assembly/index.vue'
import Boardsheet from '@/views/Pages/Boardsheet/index.vue'
import WeiDesign from '@/views/Pages/WeiDesign/index.vue'
import TplMarket from '@/views/Pages/TplMarket/index.vue'
import DesignSpace from '@/views/Pages/WeiDesign/DesignSpace/index.vue'
import Preview from '@/views/Pages/WeiDesign/DesignSpace/preview/index.vue'

export default [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login, name: 'Login' },
    {
        path: '/home',
        redirect: '/weiDesign',
        component: Home,
        children: [
            {
                path: '/weiDesign',
                name: '界面设计',
                component: WeiDesign,
            },
            {
                path: '/tplMarket',
                name: '模板市场',
                component: TplMarket,
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
                path: '/systemInfo',
                name: '系统信息',
                component: SystemInfo,
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
    },
    {
        path: '/preview',
        name: '预览',
        component: Preview
    },
    {
        path: '/demos',
        name: '演示测试',
        component: () => import("@/demos/ElementDrag.vue")
    },
    {
        path: '/properMenu',
        name: '演示测试',
        component: () => import("@/demos/ProperMenu.vue")
    }
]
