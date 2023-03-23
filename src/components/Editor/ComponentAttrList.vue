<template>
    <div class="component-attr-list-container">
        <div class="title">
            <span>页面配置</span>
            <svg-icon name="预览"></svg-icon>
        </div>
        <div class="size-config">
            <span class="size-width">
                <label for="canvas-size-width">宽度</label>
                <el-input-number id="canvas-size-width" v-model="componentAttrListData.width" :min="1" />
            </span>
            <span class="size-height">
                <label for="canvas-size-height">长度</label>
                <el-input-number id="canvas-size-height" v-model="componentAttrListData.height" :min="1" />
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const componentAttrListData = reactive({
    width: 1920,
    height: 1080
})
</script>

<style lang="scss" scoped>
.component-attr-list-container {
    width: 100%;
    height: 100%;
}
</style>
