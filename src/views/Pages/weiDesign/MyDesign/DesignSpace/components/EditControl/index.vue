<template>
    <div class="edit-control-container">
        <div id="wrap">
            <div id="content" @scroll="scrollEdit">
                <div class="edit-canvas">111</div>
            </div>
        </div>
        <SketchRule
            class="ruler-container"
            :lang="lang"
            :thick="thick"
            :scale="scale"
            :width="10000"
            :height="10000"
            :startX="startX"
            :startY="startY"
            :shadow="shadow"
            :horLineArr="lines.h"
            :verLineArr="lines.v"
            :cornerActive="true"
            @handleLine="handleLine"
            @onCornerClick="handleCornerClick"
        />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

import SketchRule from "@/components/Ruler/sketchRuler.vue";

const rectWidth = 160;
const rectHeight = 200;
const scale = ref(1);
const startX = ref(0);
const startY = ref(0);
const lines = reactive({
    h: [100],
    v: [100],
});
const thick = ref(20);
const lang = ref("zh-CN");
const shadow = reactive({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
});
const isShowRuler = ref(true);
const isShowReferLine = ref(true);

const handleLine = (e: any) => {
    console.log(e)
    debugger;
};

const handleCornerClick = (e: any) => {
    console.log(e)
    debugger;
};

const scrollEdit = (e: any) => {
    console.log(111, e);
}
</script>

<style lang="scss" scoped src="./index.scss"></style>

<style lang="scss">
.ruler-container {

    .h-container {
        position: absolute;
        width: 10000px!important;
        top: 0;
    }

    .v-container {
        position: absolute;
        height: 10000px!important;
        top: 0;

    }
}
</style>
