<template>
    <div class="shape" ref="$shape" :class="[isActive() ? 'active': '', active]" v-drag @click='selectCurComponent'>
        <div v-for="item in (isActive()? getPointList() : [])" :key="item" :data-name="item" class="shape-point" :style="getPointStyle(item)" @mousedown="handleMouseDownOnPoint(item, $event)"></div>
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { useMouseXY } from '@/hooks/useMouseXY'
import { useDesignStore } from '@/stores/design';
import bus from '@/utils/eventBus';
import { Compnents } from '@/type'
const store = useDesignStore();

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

const curComponentIndex = computed(() => store.$state.curComponentIndex);

const delComponentIndex = (e: any) => {
    store.$patch({
        curComponentIndex: -1
    });
}
const selectCurComponent = (e: any) => {
    store.$patch({
        curComponentIndex: Number(props.index),
    });

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
const component = store.$state.componentsInCanvas[Number(props.index)];

const scale = computed(() => store.$state.canvasScale)

const vDrag = {
    mounted: (el: any) => {
        component.style.width = $shape.value.offsetWidth + 'px';
        component.style.height = $shape.value.offsetHeight + 'px';
        store.changeComponentsInCanvasByIndex(props.index, component);

        el.onmousedown=function(e: any){
            store.$patch({
                curComponentIndex: Number(props.index ? props.index : 0)
            });

            if(e.target && e.target.dataset.name) {
                return;
            }
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
                store.changeComponentsInCanvasByIndex(props.index, component);
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
    let { x: oldX, y: oldY } = useMouseXY();
    document.onmousemove = () => {
        const { x, y } = useMouseXY();
        // 初始化元素的 width height top bottom right left
        $shape.value.style.left = $shape.value.offsetLeft  + 'px';
        $shape.value.style.right = $shape.value.offsetParent.offsetWidth - $shape.value.offsetWidth - $shape.value.offsetLeft + 'px';
        $shape.value.style.top = $shape.value.offsetTop + 'px';
        $shape.value.style.bottom = $shape.value.offsetParent.offsetHeight - $shape.value.offsetHeight - $shape.value.offsetTop + 'px';
        $shape.value.style.width = $shape.value.offsetWidth + 'px';
        $shape.value.style.height = $shape.value.offsetHeight + 'px';
        if(item.length === 2) {
            // 四周
            if(item === 'rt') {
                $shape.value.style.right = 'auto';
                $shape.value.style.top = 'auto';
                $shape.value.style.width = $shape.value.offsetWidth + ( x - oldX) / scale.value  + 'px';
                $shape.value.style.height = $shape.value.offsetHeight - (y - oldY) / scale.value  + 'px';
            }else if(item === 'rb') {
                $shape.value.style.right = 'auto';
                $shape.value.style.bottom = 'auto';
                $shape.value.style.width = $shape.value.offsetWidth + ( x - oldX) / scale.value  + 'px';
                $shape.value.style.height = $shape.value.offsetHeight + (y - oldY) / scale.value  + 'px';
            }else if(item === 'lt') {
                $shape.value.style.left = 'auto';
                $shape.value.style.top = 'auto';
                $shape.value.style.width = $shape.value.offsetWidth - ( x - oldX) / scale.value  + 'px';
                $shape.value.style.height = $shape.value.offsetHeight - (y - oldY) / scale.value  + 'px';
            }else {
                $shape.value.style.left = 'auto';
                $shape.value.style.bottom = 'auto';
                $shape.value.style.width = $shape.value.offsetWidth - ( x - oldX) / scale.value  + 'px';
                $shape.value.style.height = $shape.value.offsetHeight + (y - oldY) / scale.value  + 'px';
            }

        }else if (item === 'r' || item === 'l') {
            // 横向
            if(item === 'r') {
                $shape.value.style.right = 'auto';
                $shape.value.style.width = $shape.value.offsetWidth + ( x - oldX) / scale.value  + 'px';
            }else {
                $shape.value.style.left = 'auto';
                $shape.value.style.width = $shape.value.offsetWidth - ( x - oldX) / scale.value  + 'px';
            }
        }else {
            // 竖向
            if(item === 't') {
                $shape.value.style.top = 'auto';
                $shape.value.style.height = $shape.value.offsetHeight - (y - oldY) / scale.value  + 'px';
            }else {
                $shape.value.style.bottom = 'auto';
                $shape.value.style.height = $shape.value.offsetHeight + (y - oldY) / scale.value  + 'px';
            }
        }
        component.style.width = $shape.value.offsetWidth + 'px';
        component.style.height = $shape.value.offsetHeight + 'px';
        component.style.left = $shape.value.offsetLeft + 'px';
        component.style.top = $shape.value.offsetTop + 'px';
        component.style.right = $shape.value.offsetParent.offsetWidth - $shape.value.offsetWidth - $shape.value.offsetLeft + 'px';
        component.style.bottom = $shape.value.offsetParent.offsetHeight - $shape.value.offsetHeight - $shape.value.offsetTop + 'px';

        store.changeComponentsInCanvasByIndex(props.index, component);
        oldX = x;
        oldY = y;
    };
    document.onmouseup = () => {
        document.onmousemove=null;
    }

    // 阻止向父组件冒泡
    e.stopPropagation()
    e.preventDefault()
}
const getPointList = () => {
    return props.element.component === 'line-shape' ? shapeData.pointList2 : shapeData.pointList
}

const getPointStyle = (point: any) => {
    const offsetWidth = $shape.value.offsetWidth;
    const offsetHeight = $shape.value.offsetHeight;
    let width = 10, height = 10, left, top, right, bottom;
    switch (point) {
        case 'lt':
            left = -5;
            top = -5;
            break;
        case 'rt':
            right = -5;
            top = -5;
            break;
        case 'rb':
            right = -5;
            bottom = -5;
            break;
        case 'lb':
            left = -5;
            bottom = -5;
            break;
        case 't':
            width = 20;
            left = (offsetWidth / 2) - 10;
            top = -5;
            break;
        case 'r':
            height = 20;
            right = - 5;
            top = (offsetHeight / 2) - 10;
            break;
        case 'b':
            width = 20;
            left = (offsetWidth / 2) - 10;
            bottom = - 5;
            break;
        case 'l':
            height = 20;
            left = -5;
            top = (offsetHeight / 2) - 10;
            break;

    }

    return {
        left: `${left}px`,
        top: `${top}px`,
        right: `${right}px`,
        bottom: `${bottom}px`,
        cursor: shapeData.cursors[point],
        width: `${width}px`,
        height: `${height}px`,
        'border-radius': `${width / 2}px`
    }
}

const isActive = () => {
    return curComponentIndex.value === props.index;
}
</script>

<style lang="scss" scoped>
.shape {
    position: absolute;
    outline: 2px solid transparent;

    &:hover {
        cursor: move;
        outline: 2px solid $activeColor-2;
        background: rgba(134, 209, 203, 0.1);
    }

    &.active {
        cursor: move;
        outline: 2px solid $activeColor-2;
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
    outline: 2px solid $activeColor-1;
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
