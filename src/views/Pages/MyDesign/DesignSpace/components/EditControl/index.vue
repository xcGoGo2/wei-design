<template>
    <div class="edit-control-container">
        <div class="wrap-container">
            <div
                id="wrap"
                @scroll.prevent="scrollEdit"
                @mousedown.prevent="wrapMousedown"
                @mouseenter.prevent="wrapMouseenter"
                @mouseout.prevent="wrapMouseout"
                @mouseup.prevent="wrapMouseup"
                @mousemove.prevent="wrapMousemove"
                @mousewheel.prevent="mouseWheel"
                ref="$wrap"
            >
                <div id="content">
                    <div ref="$canvas" class="edit-canvas" :style="{transform: `scale(${ scaleValueReal })`}" @drop="handleDrop" @dragover="handleDragOver" @click="deselectCurComponent">
                        <div class="components-show-content">
                            <!--页面组件列表展示-->
                            <Shape v-for="(item, index) in componentData" :defaultStyle="item.style" :style="item.style" :key="item.id + item.id" :element="item" :zIndex="index" :index="index">
                                <component class="custom-component-class" :is="item.component" :propValue="item.propValue" />
                            </Shape>

                            <MarkLine></MarkLine>
                        </div>
                    </div>
                </div>
            </div>
            <div class="edit-bottom-menu">
                <el-slider v-model="sliderConfig.scaleValue" :format-tooltip="sliderConfig.formatSliderTip" @input="sliderConfig.inputScale" show-input size="small" />
            </div>
        </div>
        <SketchRule
            :key="sketchRuleKey"
            ref="$sketchRule"
            class="ruler-container"
            :lang="lang"
            :thick="thick"
            :scale="scaleValueReal"
            :width="10000"
            :height="10000"
            :startX="-5000 / scaleValueReal"
            :startY="-5000 / scaleValueReal"
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
import { deepCopy, uuid } from '@/utils';
import { useMouseXY } from '@/hooks/useMouseXY';

import SketchRule from "@/components/Ruler/sketchRuler.vue";
import Shape from '@/components/Editor/Shape.vue';
import MarkLine from '@/components/Editor/MarkLine.vue'

const store = useStore();

const $wrap = ref<any>();
const $sketchRule = ref<any>();
const $canvas = ref<any>();
const sketchRuleKey =ref<string>('');

// 缩放可视区
const sliderConfig: any = reactive({
    scaleValue: 60,
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

const lines = reactive({
    h: [],
    v: [],
});
const thick = ref(20);
const lang = ref("zh-CN");
const shadow = reactive({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
});

const handleLine = (e: any) => {
    console.log(e)
};

const handleCornerClick = (e: any) => {
    console.log(e);
};

const hRulerX = ref("0");
const hRulerY = ref("0");
const scrollEdit = (e: any) => {
    hRulerY.value = '-' + e.target.scrollTop + 'px';
    hRulerX.value = '-' + e.target.scrollLeft + 'px';
}

const isWrapMousedown = ref(false);
const startMoveWrap = reactive({
    x: 0,
    y: 0
})
const wrapMousedown = (e: any) => {
    if(e.target && e.target.id === 'content') {
        isWrapMousedown.value = true;
        startMoveWrap.x = e.x;
        startMoveWrap.y = e.y;
    }
}

const wrapMouseup = (e: any) => {
    if(e.target && e.target.id === 'content') {
        isWrapMousedown.value = false;
    }
}

const wrapMousemove = (e: any) => {
    if(isWrapMousedown.value) {
        $wrap.value.scrollLeft =  $wrap.value.scrollLeft - (e.x - startMoveWrap.x);
        $wrap.value.scrollTop = $wrap.value.scrollTop - (e.y - startMoveWrap.y);
        hRulerY.value = '-' + $wrap.value.scrollTop + 'px';
        hRulerX.value = '-' + $wrap.value.scrollLeft + 'px';
        startMoveWrap.x = e.x;
        startMoveWrap.y = e.y;
    }
}

const wrapMouseout = (e: any) => {
    // isWrapMousedown.value = false;
}

const wrapMouseenter = (e: any) => {

}

const mouseWheel = (e: any) => {
    let mouseTo = e && (e.deltaY > 0 || e.deltaX > 0) ? 'down' : 'up';
    if(mouseTo === 'down') {
        sliderConfig.scaleValue = sliderConfig.scaleValue - 5;
    }else {
        sliderConfig.scaleValue = sliderConfig.scaleValue + 5
    }
}

/**
 * 设置wrap显示的位置和大小
 */
const setWrapPositionSize = () => {
    const wrapW = $wrap.value.clientWidth;
    const wrapH = $wrap.value.clientHeight;
    const canvasW = $canvas.value.clientWidth;
    const canvasH = $canvas.value.clientHeight;
    if(canvasW > canvasH) {
        sliderConfig.scaleValue = ~~(((wrapW -200) / canvasW) * 100);  // 数字取整
    }else {
        sliderConfig.scaleValue = ~~(((wrapH -200) / canvasH) * 100);  // 数字取整
    }
    const scale = sliderConfig.scaleValue / 100;
    const x = ($wrap.value.clientWidth - $canvas.value.clientWidth * scale) / 2;
    const y = ($wrap.value.clientHeight - $canvas.value.clientHeight * scale) / 2;
    $wrap.value.scrollTop = 5000 - y;
    $wrap.value.scrollLeft = 5000 - x;
    hRulerY.value = '-' + $wrap.value.scrollTop + 'px';
    hRulerX.value = '-' + $wrap.value.scrollLeft + 'px';
}

onMounted(() => {
    setWrapPositionSize();
});

// 自定义组件
const componentsList = computed(() => store.state.weiDesign.componentsList);
const componentData = computed(() => store.state.weiDesign.componentsInCanvas);

// 拖拽事件
const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const component = deepCopy(componentsList.value[e.dataTransfer.getData('index')]);
    const x = e.offsetX;
    const y = e.offsetY;
    const width = parseInt(component.style.width || 0);
    const height = parseInt(component.style.height || 0);
    component.style.top = y - height / 2 + 'px';
    component.style.left = x - width / 2 + 'px';
    component.id = uuid(); // 拖入画布时重新生成uuid
    store.commit('weiDesign/setComponentsInCanvas', [...componentData.value, component]);
}
const handleDragOver = (e: any) => {
    e.preventDefault();
}

watch(() => sliderConfig.scaleValue, (n) => {
    sliderConfig.scaleValue = n < 10 ? 10 : n;
    store.commit('weiDesign/setCanvasScale', scaleValueReal.value)
})
</script>

<style lang="scss" scoped src='./index.scss'></style>

<style lang="scss">
.ruler-container {

    .h-container {
        position: absolute;
        width: 10000px!important;
        top: 0;
        left: v-bind(hRulerX)!important;
        transform-origin: center;
    }

    .v-container {
        position: absolute;
        height: 10000px!important;
        left: 0;
        top: v-bind(hRulerY)!important;
        transform-origin: center;
    }
}
</style>
