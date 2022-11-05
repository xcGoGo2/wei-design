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
            <el-card class=''>
                <template #header>
                    <span>系统统计信息</span>
                </template>
                <div class='chart-box'>
                    <Echarts :options='systemInfomationData'></Echarts>
                </div>
            </el-card>
            <el-card class=''>
                <template #header>
                    <span>使用者增长量</span>
                </template>
                <div class='chart-box'>
                    <Echarts :options='growData'></Echarts>
                </div>
            </el-card>
            <el-card class=''>
                <template #header>
                    <span>使用者增速</span>
                </template>
                <div class='chart-box'>
                    <Echarts :options='growRoateData'></Echarts>
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
            <div>11111</div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import HorseRaceLamp from './components/HorseRaceLamp/index.vue';
import QuickLinks from './components/QuickLinks/index.vue';
import DependenceInfo from './components/DependenceInfo/index.vue'

import { getRandomColor } from '@/utils'

import { systemInfomationData, growData, growRoateData } from '@/views/Pages/Index/chartConfig'

// 系统统计信息
</script>

<style lang="less" scoped>
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
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 20px;

        .chart-box {
            height: 250px;
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
