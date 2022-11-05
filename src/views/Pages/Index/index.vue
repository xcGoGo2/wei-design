<template>
    <div class='index-container'>
        <el-card class='horse-race-lamp shadow' :body-style='{ height: "100px" }'>
            <template #header>
                <div style='display: flex; align-items: center;'>
                    <svg-icon name='aichong' size='1.25em' class='aichong2' :color='getRandomColor()'></svg-icon>
                    <span style='margin: 0 5px'>每日一句</span>
                    <svg-icon name='aichong2' size='1.25em' class='aichong2' :color='getRandomColor()'></svg-icon>
                </div>
            </template>
            <HorseRaceLamp ></HorseRaceLamp>
        </el-card>
        <el-card class='quick-links'>
            <template #header>
                <span>快捷链接</span>
            </template>
            <QuickLinks></QuickLinks>
        </el-card>
        <el-card class='dependence-info-box'>
            <template #header>
                <span>依赖信息</span>
            </template>
            <DependenceInfo></DependenceInfo>
        </el-card>
        <el-card class='history-log'>
            <template #header>
                <span>历史记录</span>
            </template>
            <div>
                11111
            </div>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import ItemBox from '@/components/ItemBox/index.vue'
import HorseRaceLamp from './components/HorseRaceLamp/index.vue';
import QuickLinks from './components/QuickLinks/index.vue';
import DependenceInfo from './components/DependenceInfo/index.vue'

import { getRandomColor } from '@/utils'
</script>

<style lang='less' scoped>
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
