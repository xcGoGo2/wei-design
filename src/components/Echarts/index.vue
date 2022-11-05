<template>
    <div class='my-echarts' :key='getRandomKey' ref='myEcharts'></div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import elementResizeDetectorMaker from 'element-resize-detector';

import { getRandomKey } from '@/utils'

const props = defineProps({
    options: {
        type: Object,
        default: () => {
            return {
                title: {},
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            }
        }
    }
});

let myChart: any;

const myOptions = computed(() => {
    return props.options;
});

const myEcharts = ref<HTMLElement>();

const initCharts = () => {
    if (myEcharts.value) {
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(myEcharts.value);
        myChart.setOption(myOptions.value);

        // 窗口变动自适应echart
        window.addEventListener('resize', () => {
            myChart.resize();
        });

        //监听元素尺寸变化 自适应echart
        //let erd = elementResizeDetectorMaker();
        //erd.listenTo(myEcharts.value, function() {
        //    nextTick(function() {
        //        //使echarts尺寸重置
        //        myChart.resize();
        //    })
        //})
    }

}
onMounted(() => {
    setTimeout(() => {
        initCharts();
    });
});

</script>

<style scoped lang='less'>
.my-echarts {
    width: 100%;
    height: 100%;
}
</style>