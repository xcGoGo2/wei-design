// 图表信息处理
import BG4 from '@/assets/Index/earth2.jpg'
import { getRandomColor } from '@/utils'
import { randomNum } from '@/utils/number'
import { INDEX_API } from '@/api/service/index'

/**
 * 系统信息统计
 */
export const systemInfomationData = () => {
    return {
        legend: {
            right: 0,
            top: 'center',
            orient: 'vertical',
            align: 'right',
        },
        tooltip: {
            show: true,
        },
        series: [
            {
                name: '系统信息统计',
                type: 'pie',
                radius: [0, 70],
                center: ['35%', '50%'],
                roseType: '',
                itemStyle: {
                    borderRadius: 5,
                },
                label: {
                    position: 'inside',
                },
                data: [
                    { value: 2000, name: '图表' },
                    { value: 1212, name: '数据集' },
                    { value: 4000, name: '组件' },
                    { value: 2211, name: '用户量' },
                    { value: 12121, name: '访问量' },
                    { value: 4346, name: '页面数量' },
                ],
            },
        ],
    }
}

export const systemUserData = () => {
    var colorList = [
        [
            '#ff7f50',
            '#87cefa',
            '#da70d6',
            '#32cd32',
            '#6495ed',
            '#ff69b4',
            '#ba55d3',
            '#cd5c5c',
            '#ffa500',
            '#40e0d0',
            '#1e90ff',
            '#ff6347',
            '#7b68ee',
            '#d0648a',
            '#ffd700',
            '#6b8e23',
            '#4ea397',
            '#3cb371',
            '#b8860b',
            '#7bd9a5',
        ],
        [
            '#ff7f50',
            '#87cefa',
            '#da70d6',
            '#32cd32',
            '#6495ed',
            '#ff69b4',
            '#ba55d3',
            '#cd5c5c',
            '#ffa500',
            '#40e0d0',
            '#1e90ff',
            '#ff6347',
            '#7b68ee',
            '#00fa9a',
            '#ffd700',
            '#6b8e23',
            '#ff00ff',
            '#3cb371',
            '#b8860b',
            '#30e0e0',
        ],
        [
            '#929fff',
            '#9de0ff',
            '#ffa897',
            '#af87fe',
            '#7dc3fe',
            '#bb60b2',
            '#433e7c',
            '#f47a75',
            '#009db2',
            '#024b51',
            '#0780cf',
            '#765005',
            '#e75840',
            '#26ccd8',
            '#3685fe',
            '#9977ef',
            '#f5616f',
            '#f7b13f',
            '#f9e264',
            '#50c48f',
        ],
    ][2]

    const list = [
        {
            title: 'Vue3 One Piece',
            url: 'https://vue3js.cn/'
        },
        {
            title: 'Vite: 下一代的前端工具链',
            url: 'https://cn.vitejs.dev/'
        },
        {
            title: 'qiankun: 完善的微前端解决方案',
            url: 'https://qiankun.umijs.org/zh'
        },
        {
            title: 'svelte',
            url: 'https://www.sveltejs.cn/docs'
        },
        {
            title: 'Sails.js: 优秀的web后台开发框架',
            url: 'https://www.eggjs.org/zh-CN/intro/'
        },{
            title: 'egg.js',
            url: 'https://www.eggjs.org/zh-CN/intro/'
        },{
            title: '用于构建用户界面的 JavaScript 库 React',
            url: 'https://www.eggjs.org/zh-CN/intro/'
        },{
            title: '丰富的JQuery插件库',
            url: 'https://www.jq22.com/'
        },{
            title: 'Mokcjs 文档 Vitepress版',
            url: 'http://mock.pe666.cn/'
        },{
            title: '组件库ElementUI',
            url: 'https://element-plus.org/zh-CN/'
        },
    ];

    const data = list.map((o: any, i: number) => {
        return {
            name: o.title,
            value: randomNum(1000, 10000),
            symbolSize: randomNum(10, 100),
            draggable: true,
            itemStyle: {
                normal: {
                    shadowBlur: 100,
                    shadowColor: colorList[i],
                    color: colorList[i],
                },
            },
        }
    })

    return {
        // 图表标题
        title: {
            show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '"产品生态"主题图谱', //主标题文本，'\n'指定换行
            x: 'center', // 水平安放位置，默认为左对齐，可选为：
            // 'center' ¦ 'left' ¦ 'right'
            // ¦ {number}（x坐标，单位px）
            y: 'bottom', // 垂直安放位置，默认为全图顶端，可选为：
            // 'top' ¦ 'bottom' ¦ 'center'
            // ¦ {number}（y坐标，单位px）
            //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc', // 标题边框颜色
            borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
            padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
            // 接受数组分别设定上右下左边距，同css
            itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
            textStyle: {
                fontSize: 18,
                fontWeight: 'bolder',
                color: '#333', // 主标题文字颜色
            },
            subtextStyle: {
                color: '#aaa', // 副标题文字颜色
            },
        },
        backgroundColor: '#fff',
        tooltip: {},
        animationDurationUpdate: function (idx: any) {
            // 越往后的数据延迟越大
            return idx * 100
        },
        animationEasingUpdate: 'bounceIn',
        color: ['#fff', '#fff', '#fff'],
        series: [
            {
                type: 'graph',
                layout: 'force',
                force: {
                    repulsion: 300,
                    edgeLength: 100,
                },
                roam: true,
                label: {
                    normal: {
                        show: true,
                    },
                },
                data: data,
            },
        ],
    }
}

export const growData = () => {
    return {
        color: getRandomColor(),
        grid: {
            top: '20px',
            right: 0,
            bottom: '20px',
        },
        tooltip: {
            show: true,
        },
        xAxis: {
            type: 'category',
            data: [
                '2021-10',
                '2021-11',
                '2021-12',
                '2022-01',
                '2022-02',
                '2022-03',
                '2022-04',
                '2022-05',
                '2022-06',
                '2022-07',
                '2022-08',
                '2022-09',
            ],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 120, 200, 150, 80, 130],
                type: 'bar',
                itemStyle: {
                    borderRadius: [8, 8, 0, 0],
                },
                showBackground: true,
            },
        ],
    }
}

export const growRoateData = () => {
    return {
        color: getRandomColor(),
        tooltip: {
            show: true,
            trigger: 'axis',
        },
        grid: {
            top: '20px',
            right: 0,
            bottom: '20px',
        },
        xAxis: {
            type: 'category',
            data: [
                '2021-10',
                '2021-11',
                '2021-12',
                '2022-01',
                '2022-02',
                '2022-03',
                '2022-04',
                '2022-05',
                '2022-06',
                '2022-07',
                '2022-08',
                '2022-09',
            ],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 120, 200, 150, 80, 130],
                type: 'line',
                showBackground: true,
            },
        ],
    }
}

