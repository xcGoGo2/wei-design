<template>
    <div class="mark-line">
        <div v-for="line in markLineData.lines" v-show="markLineData.lineConfig[line].show || false" :key="line" :ref="line" :style='markLineData.lineConfig[line].style' class="line" :class="line.includes('x')? 'xline' : 'yline'"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import bus from '@/utils/eventBus'

const store = useStore();

const markLineData = reactive<any>({
    lines: ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'], // 分别对应三条横线和三条竖线
    diff: 3, // 相距 dff 像素将自动吸附
    lineConfig: {
        xt: { show: false, style: {} },
        xc: { show: false, style: {} },
        xb: { show: false, style: {} },
        yl: { show: false, style: {} },
        yc: { show: false, style: {} },
        yr: { show: false, style: {} },
    }
})

const curComponentIndex = computed(() => store.state.weiDesign.curComponentIndex);
const componentData = computed(() => store.state.weiDesign.componentsInCanvas);

const hideLine = () => {
    Object.keys(markLineData.lineConfig).forEach((line: string) => {
        markLineData.lineConfig[line].show = false;
    })
}

const checkLine = () => {
    const curComponent = componentData.value[curComponentIndex.value];
    componentData.value.forEach((com: any) => {
        const style = com.style;
        const componentStyle: any = {
            xt: parseInt(style.top) + 'px',
            xc: parseInt(style.top) + parseInt(style.height) / 2 + 'px',
            xb: parseInt(style.top) + parseInt(style.height) + 'px',
            yl: parseInt(style.left) + 'px',
            yc: parseInt(style.left) + parseInt(style.width) / 2 + 'px',
            yr: parseInt(style.left) + parseInt(style.width) + 'px',
        }
        Object.entries(markLineData.lineConfig).forEach(([key, value]: any) => {
            const position = key.indexOf('x') >= 0 ? 'top' : 'left';
            if(curComponent.id === com.id) {
                return
            }
            markLineData.lineConfig[key].show = Math.abs(parseInt(value.style[position]) - parseInt(componentStyle[key])) <= markLineData.diff;
        })
    })
}



onMounted(() => {
    bus.on('moveComponent', (component: any) => {
        checkLine();
        // Object.entries(markLineData.lineConfig).forEach(([key, value]: any) => {
        //     markLineData.lineConfig[key].show =true;
        // });
        Object.keys(markLineData.lineConfig).forEach((key) => {
            const lineStyle = markLineData.lineConfig[key].style;
            if(key === 'xt') {
                lineStyle.top = parseInt(component.style.top) + 'px'
            }
            if(key === 'xc') {
                lineStyle.top = parseInt(component.style.top) + parseInt(component.style.height) / 2 + 'px'
            }
            if(key === 'xb') {
                lineStyle.top = parseInt(component.style.top) + parseInt(component.style.height) + 'px'
            }
            if(key === 'yl') {
                lineStyle.left = parseInt(component.style.left) + 'px'
            }
            if(key === 'yc') {
                lineStyle.left = parseInt(component.style.left) + parseInt(component.style.width) / 2 + 'px'
            }
            if(key === 'yr') {
                lineStyle.left = parseInt(component.style.left) + parseInt(component.style.width) + 'px'
            }
        })

    });
    bus.on('unMoveComponent', () => {
        hideLine();
    })
})
</script>

<style lang="scss" scoped>
.mark-line {
    height: 100%;
}
.line {
    background: #59c7f9;
    position: absolute;
    z-index: 1000;
}
.xline {
    width: 100%;
    height: 1px;
}
.yline {
    width: 1px;
    height: 100%;
}
</style>
