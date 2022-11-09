import Mock from 'mockjs'

const MockAPI = [
    // 测试接口信息
    {
        url: 'api/weiManage/getUsers',
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
        url: 'api/weiManage/login',
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
        url: 'api/weiManage/getMenuLists',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: [
                    {
                        title: '首页',
                        icon: 'index',
                        router: '/index',
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
                        title: 'WEI-DESIGN',
                        icon: 'weiDesign',
                        router: 'weiDesign',
                        children: [
                            {
                                title: '界面设计',
                                icon: 'myDesign',
                                router: '/weiDesign/myDesign',
                            },
                            {
                                title: '模板市场',
                                icon: 'tplMarket',
                                router: '/weiDesign/tplMarket',
                            },
                        ],
                    },
                    {
                        title: '管理配置',
                        icon: 'manage',
                        router: 'manage',
                        children: [
                            {
                                title: '用户管理',
                                icon: 'userManage',
                                router: '/manage/userManage',
                            },
                            {
                                title: '组织管理',
                                icon: 'userGroupManage',
                                router: '/manage/userGroupManage',
                            },
                        ],
                    },
                    {
                        title: '错误页',
                        icon: 'errPage',
                        router: 'errPage',
                        children: [
                            {
                                title: '404',
                                icon: 'is404',
                                router: '/errPage/is404',
                            },
                            {
                                title: '500',
                                icon: 'is500',
                                router: '/errPage/is500',
                            },
                        ],
                    },
                ],
            }
        },
    },
    // 组件信息
    {
        url: 'api/weiManage/getAssemblyLists',
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
]

MockAPI.forEach((o, i) => {
    Mock.mock(MockAPI[i].url, MockAPI[i].method, o.response || null)
})
