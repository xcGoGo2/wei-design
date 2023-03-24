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
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0
                }
            }
        }
    ]
})

options.value = {...options.value, ...props.chartOption};  // 外部传入选项覆盖内部选项

onMounted(() => {
})

</script>

<style lang="scss" scoped >

</style>
