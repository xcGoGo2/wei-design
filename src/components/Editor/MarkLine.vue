<template>
    <div class="mark-line">
        <div
            v-for="line in markLineData.lines"
            v-show="markLineData.lineStatus[line] || false"
            :key="line"
            :ref="line"
            class="line"
            :class="line.includes('x')? 'xline' : 'yline'"
        ></div>
    </div>
</template>

<script lang='ts' setup>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore();

const markLineData = reactive<any>({
    lines: ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'], // 分别对应三条横线和三条竖线
    diff: 3, // 相距 dff 像素将自动吸附
    lineStatus: {
        xt: false,
        xc: false,
        xb: false,
        yl: false,
        yc: false,
        yr: false,
    },
})

debugger

const curComponentIndex = computed(() => store.state.weiDesign.curComponentIndex);
const componentData = computed(() => store.state.weiDesign.componentsInCanvas);

const hideLine = () => {
    Object.keys(markLineData.lineStatus).forEach((line: string) => {
        markLineData.lineStatus[line] = false
    })
}

const showLine = (isDownward: any, isRightward: any) => {
    const lines = ref();
    const components = componentData.value
    const curComponentHalfwidth = components[curComponentIndex.value].style.width / 2
    const curComponentHalfHeight = components[curComponentIndex.value].style.height / 2
    hideLine()
}

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
