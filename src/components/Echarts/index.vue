<template>
    <div class="my-echarts" :key="getRandomKey" ref="myEchartRef"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
//import elementResizeDetectorMaker from 'element-resize-detector';
import { throttle, debounce } from '@/utils'
import geoJson from '@/assets/assembly/china.json';

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

const myEchartRef = ref<HTMLElement>();

const initCharts = () => {
    if (myEchartRef.value && !myChart) {
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(myEchartRef.value);
        echarts.registerMap('china', geoJson as any );
        myChart.setOption(myOptions.value);
    }

}

const resizeCharts = () => {
    // 窗口变动自适应echart
    window.addEventListener('resize', () => {
        myChart.resize();
    });

    //监听元素尺寸变化 自适应echart
    let ifRender = ref(false);
    const resizeObserver = new ResizeObserver(
        function(element) {
            nextTick(() => {
                if (ifRender.value) {
                    myChart.resize();
                }
                ifRender.value = true;
            })
        }
    )
    resizeObserver.observe(myEchartRef.value as HTMLElement);
}
onMounted(() => {
    setTimeout(() => {
        initCharts();
        resizeCharts();
    });
});
</script>

<style scoped lang="scss">
.my-echarts {
    width: 100%;
    height: 100%;
}
</style>
