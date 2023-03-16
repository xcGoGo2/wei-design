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
        <div class="config-item background-img-config">
            <!--<label>背景图片</label>-->
            <el-upload
                style="width: 100%"
                drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple
            >
                <el-icon class="el-icon--upload" size="100px"><PictureFilled /></el-icon>
                <div class="el-upload__text">
                    背景图需小于 5M ，格式为 png/jpg/gif 的文件
                </div>
            </el-upload>
        </div>
        <div class="config-item color-config">
            <label>背景颜色</label>
            <el-color-picker label="1111" color-format="hex" popper-class="color-popper-container" v-model="pageConfig.backgroundColor" show-alpha @active-change="changePageBgColor" />
            <!--<span class="color-pick-value">{{ pageConfig.backgroundColor }}</span>-->
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
import { useDesignStore } from '@/stores/design';
import { themeColor } from '@/hooks/useEchartTheme'

const store = useDesignStore();

const pageConfig = computed(() => store.$state.pageConfig);

const selectThemeColor = (key: string | number) => {
    pageConfig.value.theme = key || 'light'
}

const showThemeBorderColor = (key: string | number) => {
    const isSel = key === pageConfig.value.theme;
    return isSel ? (themeColor as any)[key].colors[0] : 'transparent';
}

const changePageBgColor = (e: string) => {
    store.setPageConfigByKey("backgroundColor", e);
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

        .size-width,.size-height {
            label {
                margin-right: 5px;
            }
        }
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

    .background-img-config {
        align-items: flex-start;

        .el-upload {
            width: 200px;

            .el-icon--upload svg {
                width: 100px;
                height: 100px;
            }
        }
    }

    .color-config {
        //position: relative;
        //.color-pick-value {
        //    display: inline-flex;
        //    width: 200px;
        //    position: absolute;
        //    left: -200px;
        //    align-items: center;
        //    transform: translateX(100%);
        //}
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
    .color-config .el-color-picker {
        flex: 1;

        .el-color-picker__trigger {
            width: 100%;
        }
    }
}

.color-popper-container .el-color-dropdown__btns button {
    display: none;
}

</style>

