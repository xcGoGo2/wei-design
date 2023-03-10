<template>
    <div class="demos-test-container">
        <div class="drag-element">
            这是拖拽元素
            <div v-for="item in (isActive()? getPointList() : [])" :key="item" :data-name="item" class="shape-point" :style="getPointStyle(item)" @mousedown="handleMouseDownOnPoint(item, $event)"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
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
.demos-test-container {
    width: 100%;
    height: 100%;
    position: relative;

    .drag-element {
        width: 200px;
        height: 200px;
        border: 1px solid red;
        cursor: pointer;
    }
}
</style>
