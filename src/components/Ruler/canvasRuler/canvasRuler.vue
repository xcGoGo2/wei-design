<template>
  <canvas
    class="ruler"
    ref="canvasRef"
    @click="handleClick"
    @mouseenter="handleEnter"
    @mousemove="handleMove"
    @mouseleave="handleLeave"
  />
</template>
<script lang="ts">
import { drawHorizontalRuler, drawVerticalRuler } from './utils';
const getValueByOffset = (offset: any, start: any, scale: any) => Math.round(start + offset / scale)
import { defineComponent, ref, reactive, onMounted, watch } from 'vue';
export default defineComponent({
    props: {
        vertical: Boolean,
        start: Number,
        scale: Number,
        width: {
            type: Number,
            default: 1
        },
        height: {
            type: Number,
            default: 1
        },
        canvasConfigs: Object,
        selectStart: Number,
        selectLength: Number,
    },
    setup(props, { emit }) {
        const canvasRef = ref<any>();
        const canvasContext = ref<any>('');
        const initCanvasRef = () => {
            canvasContext.value = canvasRef.value && canvasRef.value.getContext('2d');
        };
        const updateCanvasContext = () => {
            const { ratio } = props.canvasConfigs as any;
            // 比例宽高
            canvasRef.value.width = props.width * ratio;
            canvasRef.value.height = props.height * ratio;

            const ctx = canvasRef.value.getContext('2d');
            ctx.font = `${12 * ratio}px -apple-system,
                "Helvetica Neue", ".SFNSText-Regular",
                "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB",
                "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`;
            ctx.lineWidth = 1;
            ctx.textBaseline = 'middle';
        };
        const drawRuler = () => {
            const options = {
                scale: props.scale,
                width: props.width,
                height: props.height,
                canvasConfigs: props.canvasConfigs
            }

            if (props.vertical) {
                drawVerticalRuler(
                    canvasContext.value,
                    props.start,
                    { y: props.selectStart, height: props.selectLength },
                    options
                )
            } else {
                drawHorizontalRuler(
                    canvasContext.value,
                    props.start,
                    { x: props.selectStart, width: props.selectLength },
                    options
                )
            }
        };
        const handleClick= (e: any) => {
            const offset = props.vertical ? e.offsetY : e.offsetX;
            const value = getValueByOffset(offset, props.start, props.scale);
            emit('onAddLine', value);
        };
        const handleEnter = (e: any) => {
            const offset = props.vertical ? e.offsetY : e.offsetX;
            const value = getValueByOffset(offset, props.start, props.scale);
            emit('onIndicatorShow', value);
        };
        const handleMove = (e: any) => {
            const offset = props.vertical ? e.offsetY : e.offsetX
            const value = getValueByOffset(offset, props.start, props.scale);
            emit('onIndicatorMove', value);
        };
        const handleLeave = () => {
            emit('onIndicatorHide');
        };

        onMounted(() => {
            initCanvasRef();
            updateCanvasContext()
            drawRuler()
        })

        watch([() => props.start, () => props.width, () => props.height], ([nS, nW, nH], [oS, oW, oH]) => {
            updateCanvasContext();
            drawRuler();
        })

        return {
            canvasRef,
            handleClick,
            handleEnter,
            handleMove,
            handleLeave
        }
    }
})
</script>
