<template>
    <div class="component-canvas-container" v-if="!canvasInit">
        <component ref="componentRef" :is="component.component"></component>
    </div>
    <div class="show-canvas-container" ref="showCanvasRef"></div>
</template>

<script lang="ts" setup>
import {defineProps, onMounted, nextTick } from "vue";
import html2canvas from "html2canvas";
import {convertCanvasToImage} from "@/utils";

const componentRef = ref();
const showCanvasRef = ref();

const props = defineProps({
    component: {
        type: Object,
        default: {}
    }
});
let canvasInit = ref<any>(null);

onMounted(() => {
    // 非echart组件
    if(!componentRef.value.$el.classList.contains('my-echarts')) {
        html2canvas(componentRef.value.$el).then(canvas => {
            canvasInit.value = true;
            showCanvasRef.value.appendChild(canvas);
        });
    }else{
        // echart 组件
        console.log(componentRef.value)
        debugger
        const res = convertCanvasToImage(componentRef.value)
        debugger
    }
})
</script>

<style scoped lang="scss">
.component-canvas-container {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: -1000;
}

.show-canvas-container {
    height: 100%;
    width: 100%;
}
</style>
