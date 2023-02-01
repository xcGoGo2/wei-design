<template>
    <div class="edit-control-container">
        <div class='wrap-container'>
            <div id="wrap" @scroll="scrollEdit" ref="$wrap">
                <div id="content">
                    <div ref="$canvas" class="edit-canvas" :style='{transform: `scale(${ scaleValueReal })`}' @drop="handleDrop" @dragover="handleDragOver" @click="deselectCurComponent">
                        <div class='components-show-content'>
                            <component
                                v-for="item in componentData"
                                :key="item.id"
                                :is="item.component"
                                class='custom-component-class'
                                :style="item.style"
                                :propValue="item.propValue"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class='edit-bottom-menu'>
                <el-slider v-model="sliderConfig.scaleValue" :format-tooltip="sliderConfig.formatSliderTip" @input='sliderConfig.inputScale' show-input size="small" />
            </div>
        </div>
        <SketchRule
            :key='sketchRuleKey'
            ref="$sketchRule"
            class="ruler-container"
            :lang="lang"
            :thick="thick"
            :scale="1"
            :width="10000"
            :height="10000"
            :startX="-5000"
            :startY="-5000"
            :shadow="shadow"
            :horLineArr="lines.h"
            :verLineArr="lines.v"
            :cornerActive="true"
            @handleLine="handleLine"
            @onCornerClick="handleCornerClick"
        />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useStore } from 'vuex';
import { Compnents } from '@/type';
import { deepCopy } from '@/utils/index';
import { useElementScale } from '@/hooks/useElementScale';
import { useMouseXY } from '@/hooks/useMouseXY';

import SketchRule from "@/components/Ruler/sketchRuler.vue";
import { sliderContextKey } from 'element-plus'

const store = useStore();

const $wrap = ref<any>();
const $sketchRule = ref<any>();
const $canvas = ref<any>();
const sketchRuleKey =ref<string>('');

// 缩放可视区
const sliderConfig: any = reactive({
    scaleValue: 100,
    inputScale: (scale: number) => {
        sliderConfig.scaleValue = scale;
        sketchRuleKey.value = (new Date).toString();
    },
    formatSliderTip: (value: any) => {
        return value + '%'
    }
});
const scaleValueReal = computed(() => {
    return sliderConfig.scaleValue / 100
});
const scaleValueRuler = computed(() => {
    return (sliderConfig.scaleValue / 100) * 10000 + 'px'
});
const scaleValueRulerWH = computed(() => {
    return (sliderConfig.scaleValue / 100) * 10000
})

const rulerScale = ref(1);
const startXY = computed(() => -(scaleValueRulerWH.value / 2));
const lines = reactive({
    h: [0],
    v: [0],
});
const thick = ref(20);
const lang = ref("zh-CN");
const shadow = reactive({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
});
const isShowRuler = ref(true);
const isShowReferLine = ref(true);

const handleLine = (e: any) => {
    console.log(e)
    debugger;
};

const handleCornerClick = (e: any) => {
    console.log(e);
    debugger;
};

const hRulerX = ref("0");
const hRulerY = ref("0");
const scrollEdit = (e: any) => {
    hRulerY.value = '-' + e.target.scrollTop + 'px';
    hRulerX.value = '-' + e.target.scrollLeft + 'px';
}

const setWrapPosition = () => {
    const scale = sliderConfig.scaleValue / 100;
    const x = ($wrap.value.clientWidth - $canvas.value.clientWidth * scale) / 2;
    const y = ($wrap.value.clientHeight - $canvas.value.clientHeight * scale) / 2;
    $wrap.value.scrollTop = 5000 - y;
    $wrap.value.scrollLeft = 5000 - x;
}

onMounted(() => {
    useElementScale($canvas.value);
    setWrapPosition();
});

// 自定义组件
const componentsList = computed(() => store.state.componentsList);
const componentData: Compnents[] = reactive([]);

// 拖拽事件
const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const component = deepCopy(componentsList.value[e.dataTransfer.getData('index')]);

    const { x, y } = useMouseXY($canvas.value, e);
    component.style.top = y + 'px';
    component.style.left = x + 'px';
    componentData.push(component);
}
const handleDragOver = (e: any) => {
    e.preventDefault();
}

watch(sliderConfig.scaleValue, (n, o) => {
    debugger

})


</script>

<style lang="scss" scoped src="./index.scss"></style>

<style lang="scss">
.ruler-container {

    .h-container {
        position: absolute;
        width: 10000px!important;
        top: 0;
        left: v-bind(hRulerX)!important;
    }

    .v-container {
        position: absolute;
        height: 10000px!important;
        left: 0;
        top: v-bind(hRulerY)!important;

    }
}
</style>
