// 图表信息处理
import BG4 from '@/assets/Index/earth2.jpg';
import { getRandomColor } from '@/utils';

/**
 * 系统信息统计
 */
export const systemInfomationData = {
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

export const growData = {
    color: getRandomColor(),
    grid: {
        top: '20px',
        right: 0,
        bottom: '20px'
    },
    tooltip: {
        show: true
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
                borderRadius: [8, 8, 0, 0]
            },
            showBackground: true,
        },
    ],
}

export const growRoateData = {
    color: getRandomColor(),
    tooltip: {
        show: true,
        trigger: 'axis'
    },
    grid: {
        top: '20px',
        right: 0,
        bottom: '20px'
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

