<template>
    <div class="side-setting-container">
        <!-- <component-attr-list></component-attr-list> -->
        <canvas-attr-list></canvas-attr-list>
    </div>
</template>

<script lang="ts" setup>
import ComponentAttrList from '@/components/Editor/ComponentAttrList.vue';
import CanvasAttrList from '@/components/Editor/CanvasAttrList.vue';
import { useStore } from 'vuex';
const store = useStore();

</script>

<style scoped lang="scss" src='./index.scss'></style>
