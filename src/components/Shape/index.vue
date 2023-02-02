<template>
    <div class="shape" ref="$shape" :class="[isActive() ? 'active': '', active]" v-drag @click='selectCurComponent'>
        <div v-for="item in (isActive()? getPointList() : [])" :key="item" class="shape-point" :style="getPointStyle(item)" @mousedown="handleMouseDownOnPoint(item, $event)"></div>
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, onMounted } from 'vue'
import { useMouseXY } from '@/hooks/useMouseXY'
import { useStore } from 'vuex';
import { debounce, throttle } from '@/utils'
const store = useStore();

const $shape = ref();
const props = defineProps({
    active: {
        type: Boolean,
        default: false,
    },
    element: {
        required: true,
        type: Object,
        default: () => {},
    },
    defaultStyle: {
        required: true,
        type: Object,
        default: () => {},
    },
    index: {
        required: true,
        type: [Number, String],
        default: 0,
    }
})

const shapeData = reactive<any>({
    pointList: ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'], // 八个方向
    pointList2: ['r', 'l'], // 左右两个方向
    initialAngle: { // 每个点对应的初始角度
        lt: 0,
        t: 45,
        rt: 90,
        r: 135,
        rb: 180,
        b: 225,
        lb: 270,
        l: 315,
    },
    angleToCursor: [ // 每个范围的角度对应的光标
        { start: 338, end: 23, cursor: 'nw' },
        { start: 23, end: 68, cursor: 'n' },
        { start: 68, end: 113, cursor: 'ne' },
        { start: 113, end: 158, cursor: 'e' },
        { start: 158, end: 203, cursor: 'se' },
        { start: 203, end: 248, cursor: 's' },
        { start: 248, end: 293, cursor: 'sw' },
        { start: 293, end: 338, cursor: 'w' },
    ],
    cursors: {}
})

const curComponentIndex = computed(() => store.state.curComponentIndex);

const selectCurComponent = (e: any) => {
    store.commit('setComponentIndex', props.index ? props.index : 0);
    // 阻止向父组件冒泡
    e.stopPropagation()
    e.preventDefault()
}

const shapeXY = reactive({
    toMove: false,
    position: {
        x: 0,
        y: 0
    }
})

const scale = computed(() => store.state.canvasScale)

const vDrag = {
    mounted: (el: any) => {
        el.onmousedown=function(e: any){
            store.commit('setComponentIndex', props.index ? props.index : 0);
            const { x, y } = useMouseXY();
            shapeXY.position.x = x;
            shapeXY.position.y = y;

            document.onmousemove=function(e: any){
                const { x, y } = useMouseXY();
                const top = parseInt($shape.value.style.top) ;
                const left = parseInt($shape.value.style.left);
                $shape.value.style.top = top + (y / scale.value - shapeXY.position.y / scale.value) + 'px';
                $shape.value.style.left = left + (x / scale.value - shapeXY.position.x / scale.value) + 'px';
                shapeXY.position.x = x;
                shapeXY.position.y = y;
            };
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
            };
        };
    }
}

const handleMouseDownOnPoint = (item: any, e: any) => {

}

const getPointList = () => {
    return props.element.component === 'line-shape' ? shapeData.pointList2 : shapeData.pointList
}

const getPointStyle = (point: any) => {
    let { width, height } = props.defaultStyle;
    width = parseInt(width);
    height = parseInt(height);
    const hasT = /t/.test(point)
    const hasB = /b/.test(point)
    const hasL = /l/.test(point)
    const hasR = /r/.test(point)
    let newLeft = 0
    let newTop = 0
    // 四个角的点
    if (point.length === 2) {
        newLeft = hasL ? 0 : width
        newTop = hasT ? 0 : height
    } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
            newLeft = width / 2
            newTop = hasT ? 0 : height
        }
        // 左右两边的点，高度居中
        if (hasL || hasR) {
            newLeft = hasL ? 0 : width
            newTop = Math.floor(height / 2)
        }
    }
    return {
        marginLeft: '-5px',
        marginTop: '-5px',
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: shapeData.cursors[point],
    }
}

const isActive = () => {
    return curComponentIndex.value === props.index;
}
</script>

<style lang="scss" scoped>
.shape {
    position: absolute;
    border: 2px solid transparent;

    &:hover {
        cursor: move;
        border: 2px solid $activeColor-2;
        background: rgba(134, 209, 203, 0.1);
    }

    &.active {
        cursor: move;
        border: 2px solid $activeColor-2;
        background: rgba(134, 209, 203, 0.3);
    }
}

.active {
    outline: 1px solid #70c0ff;
    user-select: none;
}

.shape-point {
    position: absolute;
    background: #fff;
    border: 1px solid #59c7f9;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: 1;
}

.icon-xiangyouxuanzhuan {
    position: absolute;
    top: -34px;
    left: 50%;
    transform: translateX(-50%);
    cursor: grab;
    color: #59c7f9;
    font-size: 20px;
    font-weight: 600;

    &:active {
        cursor: grabbing;
    }
}

.icon-suo {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
