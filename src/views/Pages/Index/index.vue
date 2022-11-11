<template>
    <div class="index-container">
        <el-card class="horse-race-lamp " :body-style='{ height: "100px" }'>
            <template #header>
                <div style="display: flex; align-items: center;">
                    <svg-icon
                        name="aichong"
                        size="1.25em"
                        class="aichong2"
                        :color="getRandomColor()"
                    ></svg-icon>
                    <span style="margin: 0 5px">每日一句</span>
                    <svg-icon
                        name="aichong2"
                        size="1.25em"
                        class="aichong2"
                        :color="getRandomColor()"
                    ></svg-icon>
                </div>
            </template>
            <HorseRaceLamp></HorseRaceLamp>
        </el-card>
        <div class='system-preview'>
            <el-card class='' header="系统统计信息">
                <div class='chart-box' ref="chartRef">
                    <Echarts v-if="chartWidth" :options='systemInfomationData()'></Echarts>
                </div>
            </el-card>
            <el-card header="生态新闻">
                <div class='chart-box'>
                    <Echarts v-if="chartWidth" :options='systemUserData()'></Echarts>
                </div>
            </el-card>
            <el-card class='' header="使用者增长量">
                <div class='chart-box'>
                    <Echarts v-if="chartWidth" :options='growData()'></Echarts>
                </div>
            </el-card>
            <el-card class='' header="使用者增速">
                <div class='chart-box'>
                    <Echarts v-if="chartWidth" :options='growRoateData()'></Echarts>
                </div>
            </el-card>
        </div>
        <el-card class="quick-links">
            <template #header>
                <span>快捷链接</span>
            </template>
            <QuickLinks></QuickLinks>
        </el-card>
        <el-card class="dependence-info-box">
            <template #header>
                <span>依赖信息</span>
            </template>
            <DependenceInfo></DependenceInfo>
        </el-card>
        <el-card class="history-log">
            <template #header>
                <span>历史记录</span>
            </template>
            <el-timeline>
                <el-timeline-item v-for='item in systemLog' :key='item.time' center :timestamp='item.time' placement='top' :color='getRandomColor()'>
                    <el-card>
                        <h4>{{ item.title }}</h4>
                        <p>{{ item.content }}</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import HorseRaceLamp from './components/HorseRaceLamp/index.vue';
import QuickLinks from './components/QuickLinks/index.vue';
import DependenceInfo from './components/DependenceInfo/index.vue'

import { getRandomColor } from '@/utils'

import { systemInfomationData, systemUserData, growData, growRoateData } from '@/views/Pages/Index/chartConfig';

let chartRef = ref<HTMLElement>();
const chartWidth = ref<string | number>(0);
onMounted(() => {
    nextTick(() => {
        setTimeout(() => {
            chartWidth.value = (chartRef.value?.clientWidth || 0) *0.8 + 'px';
        });
    })
});

const systemLog = reactive<{
    time: string;
    title: string;
    content: string;
}[]>([
    {
        time: '2022年2月10日 GMT+8 14:55:45',
        title: '第一次开发提交',
        content: '最初的想法是想做一个私有的组件库，就用来存一些自己的小组件，小插件！'
    },
    {
        time: '2022年3月 - 2022年9月',
        title: '项目暂停',
        content: '.....'
    },
    {
        time: '2022年9月19日 GMT+8 00:28:06',
        title: '继续开发',
        content: '一段时间耽搁了，空闲时间又将这个项目重新捡起来，开始不断完善中。'
    },
    {
        time: '2022年11月5日 GMT+8 22:39:01',
        title: '第一个Start',
        content: '感谢来自Github名为daweedkob的小伙伴的第一个start！'
    }
])

// 系统统计信息
</script>

<style lang="less" scoped>
@chartWidth: v-bind(chartWidth);

.index-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 20px;

    .horse-race-lamp {
        .aichong2 {
            position: relative;
            z-index: 100;
            animation: beat 1s linear infinite;
        }
    }

    .system-preview {
        margin-top: 20px;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 20px;

        .chart-box {
            height: @chartWidth;
            width: 100%;
        }
    }

    .quick-links {
        margin-top: 20px;
    }

    .dependence-info-box {
        background-color: #FFFFFF;
        border-radius: 5px;
        margin-top: 20px;
    }

    .history-log {
        background-color: #FFFFFF;
        margin-top: 20px;
    }
}
</style>
