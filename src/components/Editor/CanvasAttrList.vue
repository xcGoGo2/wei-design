<template>
    <div class="canvas-attr-list-container">
        <div class="title">
            <span>页面配置</span>
            <svg-icon name="预览" size="1.15em"></svg-icon>
        </div>
        <div class="size-config config-item">
            <span class="size-width">
                <label for="canvas-size-width">宽度</label>
                <el-input-number id="canvas-size-width" size="small" v-model="pageConfig.width" :min="1" />
            </span>
            <span class="size-height">
                <label for="canvas-size-height">长度</label>
                <el-input-number id="canvas-size-height" size="small" v-model="pageConfig.height" :min="1" />
            </span>
        </div>
        <div class="config-item color-config">
            <label>背景颜色</label>
            <el-color-picker popper-class="color-popper-container" v-model="pageConfig.backgroundColor" show-alpha @active-change="changePageBgColor" />
        </div>
        <div class="config-item">
            <label>背景控制</label>
            <el-button size="small">清除背景</el-button>
            <el-button size="small">清除颜色</el-button>
        </div>
        <div class="config-item">
            <label>适配方式</label>
            <el-radio-group size="small" v-model="pageConfig.adapter">
                <el-radio-button size="small" label="auto" >自适应</el-radio-button>
                <el-radio-button size="small" label="XPro" >X轴铺满</el-radio-button>
                <el-radio-button size="small" label="YPro" >Y轴铺满</el-radio-button>
                <el-radio-button size="small" label="XYPro" >四周铺满</el-radio-button>
            </el-radio-group>
        </div>
        <div class="title">
            <span>主题颜色</span>
            <svg-icon name="调色板" size="1.15em"></svg-icon>
        </div>
        <div class="config-item theme-config">
            <div v-for="(item, key) in themeColor" :style="{borderTop: `2px solid ${showThemeBorderColor(key)}`}" :key="item.name" :class="[`color-line theme-color-${key}`, pageConfig.theme === key ? 'active': '']" @click="selectThemeColor(key)">
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
import { useStore } from 'vuex';
import { themeColor } from '@/hooks/useEchartTheme'

const store = useStore();

const pageConfig = computed(() => store.state.weiDesign.pageConfig);

// 宽度
// const width = computed({
//     get() {
//         return pageConfig.value.width;
//     },
//     set(v) {
//         store.commit('weiDesign/setPageConfigByKey', {key: 'width', value: v})
//     }
// })

// const themeColor = reactive<any>({
//     light: {
//         name: '明亮',
//         colors: ["#4992FF", "#00B7FF", "#00D3F3", "#00E8BF", "#90F58B", "#F9F871"]
//     },
//     dim: {
//         name: '暗淡',
//         colors: ['#5470C6', '#BB70C5', '#FF77A9', '#FF9583', '#FFC567', '#F9F871']
//     },
//     Macaroon: {
//         name: '马卡龙',
//         colors: ['#2EC7C9','#41D6BE','#68E2AC','#95ED96','#C5F481','#F9F871']
//     },
//     blueGreen: {
//         name: '蓝绿',
//         colors: ['#3FB1E3', '#00C8E3', '#00DBD0', '#5FEBAF', '#ADF58B', '#F9F871']
//     },
//     deepPurple: {
//         name: '深紫',
//         colors: ['#9B8BBA', '#D390BE', '#FF98AD', '#FFAD8F', '#FFCF73', '#F9F871']
//     },
//     retro: {
//         name: '复古',
//         colors: ['#D97B7C', '#BB6D8A', '#93658D', '#695E85', '#455572', '#2F4858']
//     },
//     pinkishBlue: {
//         name: '粉青',
//         colors: ['#FD98AF', '#D087B1', '#9E7AA8', '#6F6B94', '#485B78', '#2F4858']
//     },
//     ashPowder: {
//         name: '灰粉',
//         colors: ['#516B91', '#208EB2', '#00B0BC', '#30CFAA', '#97E98A', '#F9F871']
//     },
//     greenGrass: {
//         name: '青草',
//         colors: ['#4FA397', '#5BB898', '#76CB92', '#9ADD87', '#C6EC7B', '#F9F871']
//     },
//     orangeRed: {
//         name: '橘红',
//         colors: ['#8A3349', '#984932', '#916820', '#77862C', '#44A15B', '#00B7A0']
//     },
//     dark: {
//         name: '深色',
//         colors: ['#C22E34', '#CA2E67', '#BD4598', '#9B62C0', '#637BD9', '#008EE0']
//     },
//     romanRed: {
//         name: '罗马红',
//         colors: ['#E12054', '#C7510D', '#957200', '#548500', '#008E4B', '#00918C']
//     }
// });

const selectThemeColor = (key: string | number) => {
    pageConfig.value.theme = key || 'light'
}

const showThemeBorderColor = (key: string | number) => {
    const isSel = key === pageConfig.value.theme;
    return isSel ? themeColor[key].colors[0] : 'transparent';
}

const changePageBgColor = (e: string) => {
    store.commit('weiDesign/setPageConfigByKey', { key: 'backgroundColor', value: e});
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

        & > label {
            width: auto;
            margin-right: 8px;

        }
    }

    .theme-config {
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

<style lang="scss">
.canvas-attr-list-container {
    .color-config .el-color-picker .el-color-picker__trigger {
        width: 200px;

    }
}

.color-popper-container .el-color-dropdown__btns button {
    display: none;
}

</style>

