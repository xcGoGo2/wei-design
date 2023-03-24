import { uuid } from "@/utils";
export default [
    {
        title: '图表',
        icon: '图表',
        list: [
            {
                name: '柱状图',
                components: [
                    {
                        id: uuid(),
                        type: 'chart', // 元素类性
                        component: 'WMixedLineBarChart', // 组件名称，需要提前注册到 Vue
                        label: '柱状图', // 左侧组件列表中显示的名字
                        propValue: '柱状图', // 组件所使用的值
                        icon: '平台', // 左侧组件列表中显示的图标
                        animations: [], // 动画列表
                        events: {}, // 事件列表
                        chartOption: {},  // 图表组件的定制化样式
                        style: { // 组件样式
                            width: '500px',
                            height: '300px',
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: '',
                            letterSpacing: 0,
                            textAlign: '',
                            color: '',
                        }
                    },
                    {
                        id: uuid(),
                        type: 'chart', // 元素类性
                        component: 'WHorizontalBarChart', // 组件名称，需要提前注册到 Vue
                        label: '横向条形图', // 左侧组件列表中显示的名字
                        propValue: '柱状图图', // 组件所使用的值
                        icon: '平台', // 左侧组件列表中显示的图标
                        animations: [], // 动画列表
                        events: {}, // 事件列表
                        chartOption: {},  // 图表组件的定制化样式
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
            },
            {
                name: '折线图',
                components: [

                    {
                        id: uuid(),
                        type: 'chart', // 元素类性
                        component: 'WSmoothedLineChart', // 组件名称，需要提前注册到 Vue
                        label: '平滑折线图', // 左侧组件列表中显示的名字
                        propValue: '折线图', // 组件所使用的值
                        icon: '平台', // 左侧组件列表中显示的图标
                        animations: [], // 动画列表
                        events: {}, // 事件列表
                        chartOption: {},  // 图表组件的定制化样式
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
                        chartOption: {},  // 图表组件的定制化样式
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
                        chartOption: {},  // 图表组件的定制化样式
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
                    }
                ]
            },
            {
                name: '饼图',
                components: [
                    {
                        id: uuid(),
                        type: 'chart', // 元素类性
                        component: 'WBasicPieChart', // 组件名称，需要提前注册到 Vue
                        label: '基础饼图', // 左侧组件列表中显示的名字
                        propValue: '饼图', // 组件所使用的值
                        icon: '平台', // 左侧组件列表中显示的图标
                        animations: [], // 动画列表
                        events: {}, // 事件列表
                        chartOption: {},  // 图表组件的定制化样式
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
        ]
    },
    {
        title: '信息',
        icon: '信息',
        list: []
    },
    {
        title: '列表',
        icon: '列表',
        list: []
    },
    {
        title: '小组件',
        icon: '小组件',
        list: [
            {
                name: "按钮",
                components: [
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
                ]
            }
        ]
    }
]
