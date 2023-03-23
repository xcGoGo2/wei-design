<template>
    <div class="demos-test-container">
        <div class="drag-element" v-drag ref="$elem" @click="activeElement">
            这是拖拽元素
            <template v-if="isActive">
                <div v-for="item in shapeData.pointList" :key="item" :data-name="item" class="shape-point" :style="getPointStyle(item)" @mousedown="handleMouseDownOnPoint(item, $event)"></div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {useMouseXY} from "@/hooks/useMouseXY";
import bus from "@/utils/eventBus";

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

const getPointList = () => {
    return  shapeData.pointList
}

const $elem = ref<any>(null)

let getPointStyle = (point: any) => {
    if(isActive.value) {
        const offsetWidth = $elem.value.offsetWidth;
        const offsetHeight = $elem.value.offsetHeight;
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
}

const isActive = ref(false);
const activeElement = () => {
    isActive.value = true;
}

const vDrag = {
    mounted: (el: any) => {
        const shapeXY = reactive({
            x: 0,
            y: 0
        });
        el.onmousedown=function(e: any){
            if(e.target && e.target.dataset.name) {
                return;
            }
            const { x, y } = useMouseXY();
            shapeXY.x = x;
            shapeXY.y = y;

            document.onmousemove=function(e: any){
                const { x, y } = useMouseXY();
                const top = parseInt($elem.value.style.top || '0') ;
                const left = parseInt($elem.value.style.left || '0');
                $elem.value.style.top = top + (y - shapeXY.y ) + 'px';
                $elem.value.style.left = left + (x- shapeXY.x) + 'px';
                shapeXY.x = x;
                shapeXY.y = y;

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
        $elem.value.style.left = $elem.value.offsetLeft  + 'px';
        $elem.value.style.right = $elem.value.offsetParent.offsetWidth - $elem.value.offsetWidth - $elem.value.offsetLeft + 'px';
        $elem.value.style.top = $elem.value.offsetTop + 'px';
        $elem.value.style.bottom = $elem.value.offsetParent.offsetHeight - $elem.value.offsetHeight - $elem.value.offsetTop + 'px';
        $elem.value.style.width = $elem.value.offsetWidth + 'px';
        $elem.value.style.height = $elem.value.offsetHeight + 'px';
        if(item.length === 2) {
            // 四周
            $elem.value.style.width = $elem.value.offsetWidth + ( x - oldX)  + 'px';
            $elem.value.style.height = $elem.value.offsetHeight + (y - oldY)  + 'px';

        }else if (item === 'r' || item === 'l') {
            // 横向
            if(item === 'r') {
                $elem.value.style.right = 'auto';
                $elem.value.style.width = $elem.value.offsetWidth + ( x - oldX)  + 'px';
            }else {
                $elem.value.style.left = 'auto';
                $elem.value.style.width = $elem.value.offsetWidth - ( x - oldX)  + 'px';
            }
        }else {
            // 竖向
            if(item === 't') {
                $elem.value.style.top = 'auto';
                $elem.value.style.height = $elem.value.offsetHeight - (y - oldY)  + 'px';
            }else {
                $elem.value.style.bottom = 'auto';
                $elem.value.style.height = $elem.value.offsetHeight + (y - oldY)  + 'px';
            }
        }
        oldX = x;
        oldY = y;
    };
    document.onmouseup = () => {
        document.onmousemove=null;
        document.onmouseup=null;
    }

    // 阻止向父组件冒泡
    e.stopPropagation()
    e.preventDefault()
}
</script>

<style lang="scss" scoped>
.demos-test-container {
    width: 100%;
    height: 100%;
    position: relative;

    .drag-element {
        width: 200px;
        height: 200px;
        border: 1px solid red;
        cursor: pointer;
        position: absolute;

        .shape-point {
            position: absolute;
            height: 10px;
            width: 10px;
            outline: 2px solid #0a8278;
        }
    }
}
</style>
