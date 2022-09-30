import Mock from 'mockjs';

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
      };
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
            icon: '/src/assets/Sidebar/menu/report.png',
            router: '/index',
          },
          {
            title: '组件',
            icon: '/src/assets/Sidebar/menu/boardsheet.png',
            router: '/assembly',
          },
          {
            title: '数据集',
            icon: '/src/assets/Sidebar/menu/sheet.png',
            router: '/boardsheet',
          },
          {
            title: 'WEI-DESIGN',
            icon: '/src/assets/Sidebar/menu/report.png',
            router: 'weiDesign',
            children: [
              {
                title: '界面设计',
                icon: '/src/assets/Sidebar/menu/sheet.png',
                router: '/weiDesign/myDesign',
              },
              {
                title: '模板市场',
                icon: '/src/assets/Sidebar/menu/sheet.png',
                router: '/weiDesign/tplMarket',
              },
            ],
          },
          {
            title: '管理配置',
            icon: '/src/assets/Sidebar/menu/posts.png',
            router: 'manage',
            children: [
              {
                title: '用户管理',
                icon: '/src/assets/Sidebar/menu/posts.png',
                router: '/manage/userManage',
              },
              {
                title: '组织管理',
                icon: '/src/assets/Sidebar/menu/posts.png',
                router: '/manage/userGroupManage',
              },
            ],
          },
          {
            title: '错误页',
            icon: '/src/assets/Sidebar/menu/posts.png',
            router: 'errPage',
            children: [
              {
                title: '404',
                icon: '/src/assets/Sidebar/menu/posts.png',
                router: '/errPage/is404',
              },
              {
                title: '500',
                icon: '/src/assets/Sidebar/menu/posts.png',
                router: '/errPage/is500',
              },
            ],
          },
        ],
      };
    },
  },
];

MockAPI.forEach(o => {
  Mock.mock(o.url = '', o.method = 'get', o.response || null);
});
