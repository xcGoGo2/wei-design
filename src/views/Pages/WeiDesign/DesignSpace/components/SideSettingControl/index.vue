<template>
    <div class="side-setting-container">
        <canvas-attr-list v-if="currentIndex === -1"></canvas-attr-list>
        <component-attr-list v-else></component-attr-list>
    </div>
</template>

<script lang="ts" setup>
import ComponentAttrList from '@/components/Editor/ComponentAttrList.vue';
import CanvasAttrList from '@/components/Editor/CanvasAttrList.vue';
import { useDesignStore } from '@/stores/design';
import { computed } from 'vue';

const store = useDesignStore();

const currentIndex = computed(() => store.$state.curComponentIndex);




</script>

<style scoped lang="scss" src='./index.scss'></style>
