<template>
    <div class="canvas-attr-list-container">
        <div class="title">
            <span>页面配置</span>
            <svg-icon name="预览" size="1.15em"></svg-icon>
        </div>
        <div class="size-config config-item">
            <span class="size-width">
                <label for="canvas-size-width">宽度</label>
                <el-input-number id="canvas-size-width" size="small" v-model="canvasAttrListData.width" :min="1" />
            </span>
            <span class="size-height">
                <label for="canvas-size-height">长度</label>
                <el-input-number id="canvas-size-height" size="small" v-model="canvasAttrListData.height" :min="1" />
            </span>
        </div>
        <div class="config-item">
            <label>背景颜色</label>
            <el-color-picker v-model="canvasAttrListData.bgColor" show-alpha />
        </div>
        <div class="config-item">
            <label>背景控制</label>
            <el-button size="small">清除背景</el-button>
            <el-button size="small">清除颜色</el-button>
        </div>
        <div class="config-item">
            <label>适配方式</label>
            <el-button-group>
                <el-button size="small">自适应</el-button>
                <el-button size="small">X轴铺满</el-button>
                <el-button size="small">Y轴铺满</el-button>
                <el-button size="small">四周拉伸</el-button>
            </el-button-group>
        </div>
        <div class="title">
            <span>主题颜色</span>
            <svg-icon name="调色板" size="1.15em"></svg-icon>
        </div>
        <div class="config-item color-config">
            <div v-for="(item, key) in themeColor" :style="{borderTop: `2px solid ${showThemeBorderColor(key)}`}" :key="item.name" :class="[`color-line theme-color-${key}`, canvasAttrListData.selectTheme === key ? 'active': '']" @click="selectThemeColor(key)">
                <label>{{ item.name }}</label>
                <div class="color-item-box">
                    <span v-for="color in item.colors" :key="color" class="color-item" :style="{backgroundColor: color}"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
const canvasAttrListData = reactive<any>({
    width: 1920,
    height: 1080,
    bgColor: '#ffffff',
    selectTheme: 'light'
});

const themeColor = reactive<any>({
    light: {
        name: '明亮',
        colors: ["#4992FF", "#00B7FF", "#00D3F3", "#00E8BF", "#90F58B", "#F9F871"]
    },
    dim: {
        name: '暗淡',
        colors: ['#5470C6', '#BB70C5', '#FF77A9', '#FF9583', '#FFC567', '#F9F871']
    },
    Macaroon: {
        name: '马卡龙',
        colors: ['#2EC7C9','#41D6BE','#68E2AC','#95ED96','#C5F481','#F9F871']
    },
    blueGreen: {
        name: '蓝绿',
        colors: ['#3FB1E3', '#00C8E3', '#00DBD0', '#5FEBAF', '#ADF58B', '#F9F871']
    },
    deepPurple: {
        name: '深紫',
        colors: ['', '', '', '', '', '']
    },
    retro: {
        name: '复古',
        colors: ['', '', '', '', '', '']
    },
    pinkishBlue: {
        name: '粉青',
        colors: ['', '', '', '', '', '']
    },
    ashPowder: {
        name: '灰粉',
        colors: ['', '', '', '', '', '']
    },
    greenGrass: {
        name: '青草',
        colors: ['', '', '', '', '', '']
    },
    orangeRed: {
        name: '橘红',
        colors: ['', '', '', '', '', '']
    },
    dark: {
        name: '深色',
        colors: ['', '', '', '', '', '']
    },
    romanRed: {
        name: '罗马红',
        colors: ['', '', '', '', '', '']
    },

});

const selectThemeColor = (key: string | number) => {
    canvasAttrListData.selectTheme = key || 'light'
}

const showThemeBorderColor = (key: string | number) => {
    const isSel = key === canvasAttrListData.selectTheme;
    return isSel ? themeColor[key].colors[0] : 'transparent';
}


</script>

<style lang="scss" scoped>
$themeColor: v-bind(themeColor);
.canvas-attr-list-container {
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 14px;
    font-weight: 700;
    // overflow-y: scroll;

    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 700;
        height: 35px;
        width: 100%;
        border-radius: 6px;
        background-color: #fff;
        cursor: pointer;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 8%);

        span {
            margin-right: 5px;
        }
    }

    .size-config {
        justify-content: space-between;

    }

    .config-item {
        width: 100%;
        margin: 20px 0;
        display: flex;
        align-items: center;

        label {
            width: auto;
            margin-right: 8px;

        }
    }

    .color-config {
        display: flex;
        flex-direction: column;

        .color-line {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            padding-left: 10px;
            // border: #e8e8e9 1px solid;
            background-color: #FFF;
            border-radius: 20px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all .3s;
            border-top: 2px solid transparent;

            &.active {
                box-shadow: var(--el-box-shadow-lighter);
            }

            &:hover {
                box-shadow: var(--el-box-shadow-lighter);
            }

            label {
                width: 30px;
                margin-right: 5px;
            }

            .color-item-box {
                display: flex;
                align-items: center;
                justify-content: space-around;
                width: calc(100% - 35px);

                .color-item {
                    width: 30px;
                    height: 30px;
                    // margin: 0 10px;
                    border-radius: 50%;
                }

            }


        }
    }
}
</style>

