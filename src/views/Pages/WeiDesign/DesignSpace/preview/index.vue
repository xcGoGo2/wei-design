<template>
    <div class="preview-page-container-box" ref="previewBox">
        <div class="preview-page-container">
            <div v-for="(item, index) in componentsInCanvas" class="components-show-content" :style="item.style" :key="item.id + item.id">
                <component class="custom-component-class" :is="item.component" :propValue="item.propValue" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {getItem} from "@/utils";
import {onMounted} from "vue";

const previewBox = ref<any>(null);

const componentsInCanvas = getItem('componentsInCanvas');
const config = getItem('pageConfig');
const pageConfig = reactive({
    width: config.width + 'px',
    height: config.height + 'px',
    backgroundColor: config.backgroundColor,
    scale: 1
})

onMounted(() => {
    const { clientWidth, clientHeight } = previewBox.value;
    pageConfig.scale = clientWidth < config.width ? clientWidth / config.width: 1;
})


</script>

<style lang="scss" scoped>
.preview-page-container-box {
    width: 100%;
    height: 100%;

    .preview-page-container {
        height: v-bind('pageConfig.height');
        width: v-bind('pageConfig.width');
        position: absolute;
        background-color: v-bind('pageConfig.backgroundColor');
        box-shadow: 0 8px 10px #00000012;
        border-radius: 20px;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        overflow: hidden;
        transform: scale(v-bind('pageConfig.scale'));

        .components-show-content {
            position: absolute;

            .custom-component-class {
                width: 100%;
                height: 100%;
            }

        }
    }
}

</style>
