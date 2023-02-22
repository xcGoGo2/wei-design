<template>
    <div :class="`component-${componentType}-container`" ref="componentContainerRef">
        <component ref="componentRef" :is="componentData.component"></component>
    </div>
    <!-- <div class="component-canvas-container" v-if="!canvasInit">
        <component ref="componentRef" :is="componentData.component"></component>
    </div>
    <img class="show-imgs-container" v-if="canvasInit === 'chart'" :src="imgSrc" ref="imgRef" />
    <div class="show-div-container" ref="divRef"></div> -->
</template>

<script lang="ts" setup>
import { he } from "element-plus/es/locale";
import { onMounted } from "vue";
import { scale } from "zrender/lib/core/vector";
const componentRef = ref();
const props = defineProps({
    componentData: {
        type: Object,
        default: {}
    }
});

const componentType = ref('normal');
const componentContainerRef = ref();
const chartStyle = reactive({
    height: '100%',
    width: '100%',
    transform: "scale(1)"
});

onMounted(() => {
    // 非echart组件
    if(!componentRef.value.$el.classList.contains('my-echarts')) {
        componentType.value = 'normal';
    }else{
        // echart 组件
        // console.log(componentContainerRef);
        // debugger

        componentType.value = 'chart'
        const { width, height } = props.componentData.style;
        const scale = 93 / parseInt(width);
        chartStyle.width = 158 / scale + 'px';  // 158
        chartStyle.height = 93 / scale + 'px';  // 93
        chartStyle.transform = `scale(${scale})`
        console.log(props.componentData);
        debugger

    }
})
</script>

<style scoped lang="scss">

.component-chart-container {
    position: relative;
    width: v-bind('chartStyle.width');
    height: v-bind('chartStyle.height');
    transform: v-bind('chartStyle.transform');
}

.component-mormal-container {
    width: 100%;
    height: 100%;
}

</style>
