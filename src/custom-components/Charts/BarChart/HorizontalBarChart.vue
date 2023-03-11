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
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
    },
    series: [
        {
            name: '2011',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
        {
            name: '2012',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
        }
    ]
})

onMounted(() => {
})

</script>

<style lang="scss" scoped >

</style>
