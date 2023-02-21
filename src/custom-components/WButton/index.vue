<template>
    <el-button ref="compRef">{{ propValue }}</el-button>
</template>

<script lang='ts' setup>
import { defineProps, defineExpose } from 'vue';

const compRef = ref();

defineProps({
    propValue: {
        type: String,
        default: '这是button'
    }
})

defineExpose({
    compRef
})
</script>

<style lang='scss' scoped src="./index.scss"></style>
