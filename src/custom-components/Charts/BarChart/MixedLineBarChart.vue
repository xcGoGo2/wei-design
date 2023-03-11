<template>
    <Echarts :options="options"></Echarts>
</template>

<script lang="ts" setup>
import ECharts from '@/components/Echarts/index.vue';
import * as echarts from 'echarts';
import { reactive, onMounted} from 'vue'

defineProps({
    propValue: {
        type: Object,
        default: () => {
            return {
                title: ''
            }
        }
    }
});

const options = reactive({
    tooltip: {
        trigger: 'item',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '2%',
        right: '4%',
        bottom: '14%',
        top:'16%',
        containLabel: true
    },
    legend: {
        data: ['调解成功', '调解失败', '调解终止','调解成功率'],
        left: '7%',
        top:'5%',
        textStyle: {
            color: "#666666"
        },
        itemWidth: 15,
        itemHeight: 10,
        itemGap: 25
    },
    xAxis: {
        type: 'category',
        data: ['2012','2013','2014','2015','2016','2017','2018','2019'],
        axisLine: {
            lineStyle: {
                color: '#cdd5e2'

            }
        },
        axisLabel: {
            textStyle: {
                color: "#666666"
            }
        },
    },

    yAxis: [{
        type: 'value',
        axisLine: {
            show: false,
            lineStyle: {
                color: '#cdd5e2'
            }
        },
        splitLine: {
            show: false,
        },
        axisLabel: {                textStyle: {
                color: "#666666"
            }},
    },
        {
            type: "value",
            name: "百分比",
            nameTextStyle: {
                color: "#666666"
            },
            position: "right",
            axisLine: {
                lineStyle: {
                    color: '#cdd5e2'
                }
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                formatter: "{value} %", //右侧Y轴文字显示
                textStyle: {
                    color: "#666666"
                }
            }
        }
    ],
    series: [{
        name: '调解成功',
        type: 'bar',
        barWidth: '12px',
        itemStyle: {
            normal: {
                barBorderRadius: 6,
            },
        },
        data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
    },
        {
            name: '调解失败',
            type: 'bar',
            barWidth: '12px',
            itemStyle: {
                normal: {
                    barBorderRadius: 6,
                }

            },
            data: [400, 500, 500, 500, 500, 400,400, 500, 500]
        },
        {
            name: '调解终止',
            type: 'bar',
            barWidth: '12px',
            itemStyle: {
                normal: {
                    barBorderRadius: 6,
                }
            },
            data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
        },{
            name: "调解成功率",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: false, //平滑曲线显示

            symbol: "circle", //标记的图形为实心圆
            symbolSize: 8, //标记的大小
            itemStyle: {
                normal: {
                    borderWidth: 5
                },

            },

            data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5]
        }
    ]
})

onMounted(() => {
})

</script>

<style lang="scss" scoped >

</style>
