<template>
    <el-button>{{ propValue }}</el-button>
</template>

<script lang='ts' setup>
import { defineProps } from 'vue';

defineProps({
    propValue: {
        type: String,
        default: '这是button'
    }
})
</script>

<style lang='scss' scoped src="./index.scss"></style>
