<template>
    <Echarts :options="options"></Echarts>
</template>

<script lang="ts" setup>
import ECharts from '@/components/Echarts/index.vue';
import * as echarts from 'echarts';
import { ref, onMounted} from 'vue'

const props = defineProps({
    chartOption: {
        type: Object,
        default: () => {
            return {
            }
        }
    }
});

const options = ref({
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        }
    ]
})

options.value = {...options.value, ...props.chartOption};  // 外部传入选项覆盖内部选项

onMounted(() => {
})

</script>

<style lang="scss" scoped >

</style>
