import Mock from 'mockjs';
import { uuid } from '@/utils';

const MockAPI = [
    // 测试接口信息
    {
        url: 'api/weiDesign/getUsers',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: {
                    'rows|10': [
                        {
                            id: '@guid',
                            name: '@cname',
                            'age|20-30': 23,
                            'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师'],
                        },
                    ],
                },
            }
        },
    },
    //登录
    {
        url: 'api/weiDesign/login',
        method: 'post',
        response: (loginContent: any) => {
            const { username, password } = JSON.parse(loginContent.body)
            if (username === 'admin' && password === '123456') {
                return {
                    code: 200,
                    message: 'ok',
                    data: {
                        username: 'admin',
                        showname: '管理员',
                        code: 'ADMIN',
                    },
                }
            }
        },
    },
    // menuList信息
    {
        url: 'api/weiDesign/getMenuLists',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: [
                    {
                        title: '我的设计',
                        icon: 'myDesign',
                        router: '/weiDesign',
                    },
                    {
                        title: '模板市场',
                        icon: 'tplMarket',
                        router: '/tplMarket',
                    },
                    {
                        title: '组件',
                        icon: 'assembly',
                        router: '/assembly',
                    },
                    {
                        title: '数据集',
                        icon: 'boardsheet',
                        router: '/boardsheet',
                    },
                    {
                        title: '系统信息',
                        icon: 'index',
                        router: '/systemInfo',
                    },
                ],
            }
        },
    },
    // 产品生态
    {
        url: 'api/weiDesign/getProductEcology',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: [
                    {
                        title: 'Vue3 One Piece',
                        url: 'https://vue3js.cn/'
                    },
                    {
                        title: 'Vite: 下一代的前端工具链',
                        url: 'https://cn.vitejs.dev/'
                    },
                    {
                        title: 'qiankun',
                        url: 'https://qiankun.umijs.org/zh'
                    },
                    {
                        title: 'svelte',
                        url: 'https://www.sveltejs.cn/docs'
                    },
                    {
                        title: 'Egg.js',
                        url: 'https://www.eggjs.org/zh-CN/intro/'
                    }
                ]
            }
        }
    },
    // 组件信息
    {
        url: 'api/weiDesign/getAssemblyLists',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: [
                    {
                        img: 'https://api.ixiaowai.cn/api/api.php',
                        title: '树组件',
                        content: '这是一个组件',
                        time: new Date(),
                    },
                    {
                        img: 'http://www.dmoe.cc/random.php',
                        title: '树组件2',
                        content: '这是一个组件11',
                        time: new Date(),
                    },
                    {
                        img: 'https://api.ixiaowai.cn/mcapi/mcapi.php',
                        title: '树组件3',
                        content: '这是一个组件222',
                        time: new Date(),
                    },
                    {
                        img: 'https://img.xjh.me/random_img.php?return=302',
                        title: '树组件4',
                        content: '这是一个组件33',
                        time: new Date(),
                    },
                ]
            }
        },
    },
    // 自定义组件信息
    {
        url: 'api/weiDesign/getComponentsList',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: [
                    {
                        id: uuid(),
                        type: 'element', // 元素类性
                        component: 'w-button', // 组件名称，需要提前注册到 Vue
                        label: '按钮', // 左侧组件列表中显示的名字
                        propValue: '按钮', // 组件所使用的值
                        icon: '平台', // 左侧组件列表中显示的图标
                        animations: [], // 动画列表
                        events: {}, // 事件列表
                        style: { // 组件样式
                            width: '',
                            height: '',
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: '',
                            letterSpacing: 0,
                            textAlign: '',
                            color: '',
                        },
                    },
                    {
                        id: uuid(),
                        type: 'chart', // 元素类性
                        component: 'WMixedLineBarChart', // 组件名称，需要提前注册到 Vue
                        label: '柱状图', // 左侧组件列表中显示的名字
                        propValue: '柱状图', // 组件所使用的值
                        icon: '平台', // 左侧组件列表中显示的图标
                        animations: [], // 动画列表
                        events: {}, // 事件列表
                        style: { // 组件样式
                            width: '500px',
                            height: '300px',
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: '',
                            letterSpacing: 0,
                            textAlign: '',
                            color: '',
                        },
                    },
                    {
                        id: uuid(),
                        type: 'chart', // 元素类性
                        component: 'WBasicPieChart', // 组件名称，需要提前注册到 Vue
                        label: '基础饼图', // 左侧组件列表中显示的名字
                        propValue: '饼图', // 组件所使用的值
                        icon: '平台', // 左侧组件列表中显示的图标
                        animations: [], // 动画列表
                        events: {}, // 事件列表
                        style: { // 组件样式
                            width: '500px',
                            height: '300px',
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: '',
                            letterSpacing: 0,
                            textAlign: '',
                            color: '',
                        },
                    },
                    {
                        id: uuid(),
                        type: 'chart', // 元素类性
                        component: 'WSmoothedLineChart', // 组件名称，需要提前注册到 Vue
                        label: '平滑折线图', // 左侧组件列表中显示的名字
                        propValue: '折线图', // 组件所使用的值
                        icon: '平台', // 左侧组件列表中显示的图标
                        animations: [], // 动画列表
                        events: {}, // 事件列表
                        style: { // 组件样式
                            width: '500px',
                            height: '300px',
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: '',
                            letterSpacing: 0,
                            textAlign: '',
                            color: '',
                        },
                    },{
                        id: uuid(),
                        type: 'chart', // 元素类性
                        component: 'WBasicAreaChart', // 组件名称，需要提前注册到 Vue
                        label: '基础面积图', // 左侧组件列表中显示的名字
                        propValue: '折线图', // 组件所使用的值
                        icon: '平台', // 左侧组件列表中显示的图标
                        animations: [], // 动画列表
                        events: {}, // 事件列表
                        style: { // 组件样式
                            width: '500px',
                            height: '300px',
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: '',
                            letterSpacing: 0,
                            textAlign: '',
                            color: '',
                        },
                    },{
                        id: uuid(),
                        type: 'chart', // 元素类性
                        component: 'WStackedLineChart', // 组件名称，需要提前注册到 Vue
                        label: '堆叠折线图', // 左侧组件列表中显示的名字
                        propValue: '折线图', // 组件所使用的值
                        icon: '平台', // 左侧组件列表中显示的图标
                        animations: [], // 动画列表
                        events: {}, // 事件列表
                        style: { // 组件样式
                            width: '500px',
                            height: '300px',
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: '',
                            letterSpacing: 0,
                            textAlign: '',
                            color: '',
                        },
                    },{
                        id: uuid(),
                        type: 'chart', // 元素类性
                        component: 'WHorizontalBarChart', // 组件名称，需要提前注册到 Vue
                        label: '横向条形图', // 左侧组件列表中显示的名字
                        propValue: '柱状图图', // 组件所使用的值
                        icon: '平台', // 左侧组件列表中显示的图标
                        animations: [], // 动画列表
                        events: {}, // 事件列表
                        style: { // 组件样式
                            width: '500px',
                            height: '300px',
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: '',
                            letterSpacing: 0,
                            textAlign: '',
                            color: '',
                        },
                    },
                ]
            }
        },
    },
]

MockAPI.forEach((o, i) => {
    Mock.mock(MockAPI[i].url, MockAPI[i].method, o.response || null)
})
