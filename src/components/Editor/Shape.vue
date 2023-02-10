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
import bus from '@/utils/eventBus';
import { Compnents } from '@/type'
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
    cursors: {
        lt: 'nw-resize',
        t: 'n-resize',
        rt: 'ne-resize',
        r: 'e-resize',
        rb: 'se-resize',
        b: 'n-resize',
        lb: 'sw-resize',
        l: 'e-resize',
    }
})

const curComponentIndex = computed(() => store.state.weiDesign.curComponentIndex);

const delComponentIndex = (e: any) => {
    store.commit('weiDesign/setComponentIndex', -1);
}
const selectCurComponent = (e: any) => {
    store.commit('weiDesign/setComponentIndex', props.index ? props.index : 0);

    window.document.addEventListener('click', delComponentIndex);

    // 阻止向父组件冒泡
    e.stopPropagation()
    e.preventDefault()
}

watch(curComponentIndex, (n, o) => {
    window.document.removeEventListener('click', delComponentIndex);
})

const shapeXY = reactive({
    x: 0,
    y: 0
})
const component: Compnents = computed(() => store.state.weiDesign.componentsInCanvas).value[props.index];

const scale = computed(() => store.state.weiDesign.canvasScale)

const vDrag = {
    mounted: (el: any) => {
        component.style.width = $shape.value.offsetWidth + 'px';
        component.style.height = $shape.value.offsetHeight + 'px';
        store.commit('weiDesign/changeComponentsInCanvasByIndex', {index: props.index, component});

        el.onmousedown=function(e: any){
            store.commit('weiDesign/setComponentIndex', props.index ? props.index : 0);
            const { x, y } = useMouseXY();
            shapeXY.x = x;
            shapeXY.y = y;

            document.onmousemove=function(e: any){
                const { x, y } = useMouseXY();
                const top = parseInt($shape.value.style.top) ;
                const left = parseInt($shape.value.style.left);
                $shape.value.style.top = top + (y / scale.value - shapeXY.y / scale.value) + 'px';
                $shape.value.style.left = left + (x / scale.value - shapeXY.x / scale.value) + 'px';
                component.style.top = $shape.value.style.top;
                component.style.left = $shape.value.style.left;
                store.commit('weiDesign/changeComponentsInCanvasByIndex', {index: props.index, component});
                shapeXY.x = x;
                shapeXY.y = y;

                // 全局事件处理
                bus.emit('moveComponent', component);
            };
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
                bus.emit('unMoveComponent');
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
    const offsetWidth = $shape.value.offsetWidth;
    const offsetHeight = $shape.value.offsetHeight;
    let width = 10, height = 10, left, top;
    switch (point) {
        case 'lt':
            left = -6;
            top = -6;
            break;
        case 'rt':
            left = offsetWidth -7;
            top = -7;
            break;
        case 'rb':
            left = offsetWidth - 7;
            top = offsetHeight - 7;
            break;
        case 'lb':
            left = -7;
            top = offsetHeight - 7;
            break;
        case 't':
            width = 18;
            left = (offsetWidth / 2) - 10;
            top = -7;
            break;
        case 'r':
            height = 18;
            left = offsetWidth - 7;
            top = (offsetHeight / 2) - 10;
            break;
        case 'b':
            width = 18;
            left = (offsetWidth / 2) - 10;
            top = offsetHeight - 7;
            break;
        case 'l':
            height = 18;
            left = -7;
            top = (offsetHeight / 2) - 10;
            break;

    }

    return {
        left: `${left}px`,
        top: `${top}px`,
        cursor: shapeData.cursors[point],
        width: `${width}px`,
        height: `${height}px`,
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
    //outline: 1px solid $activeColor-1;
    user-select: none;
}

.shape-point {
    position: absolute;
    background: #fff;
    border: 1px solid $activeColor-1;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    z-index: 1;
}

.icon-xiangyouxuanzhuan {
    position: absolute;
    top: -34px;
    left: 50%;
    transform: translateX(-50%);
    cursor: grab;
    color: $activeColor-1;
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
