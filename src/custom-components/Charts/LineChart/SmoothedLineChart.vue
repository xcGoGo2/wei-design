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

onMounted(() => {
})

</script>

<style lang="scss" scoped >

</style>
