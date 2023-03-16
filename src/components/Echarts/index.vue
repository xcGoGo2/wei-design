<template>
    <div class="my-echarts" :key="getRandomKey" :style="{height, width}" ref="myEchartRef"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
//import elementResizeDetectorMaker from 'element-resize-detector';
import { throttle, debounce } from '@/utils'
import bus from '@/utils/eventBus';
import geoJson from '@/assets/assembly/china.json';
import { registerTheme } from '@/hooks/useEchartTheme';
import { getRandomKey } from '@/utils'
import { useDesignStore } from '@/stores/design';

const store = useDesignStore();

// 主题
const theme = computed(() => store.$state.pageConfig.theme);

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
    },
    width: {
        type: [String],
        default: '100%'
    },
    height: {
        type: [String],
        default: '100%'
    }
});

let myChart: any;

const myOptions = computed(() => {
    return props.options;
});



const myEchartRef = ref<HTMLElement>();

const initCharts = () => {
    if (myEchartRef.value) {
        if( myChart ) {
            myChart.dispose();
        }
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(myEchartRef.value, theme.value);
        echarts.registerMap('china', geoJson as any );
        bus.emit('chartRender', myChart);
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
    // 注册echarts主题
    if(echarts) {
        registerTheme(echarts);
    };
    setTimeout(function() {
        nextTick(() => {
            initCharts();
            resizeCharts();
        })
    }, 0)
});

watch(theme, (n) => {
    initCharts();
})
</script>

<style scoped lang="scss">
.my-echarts {
    width: 100%;
    height: 100%;
    //background-color: #fff;
}
</style>

