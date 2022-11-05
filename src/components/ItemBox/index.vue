<template>
<div class='item-box-container item-box'>
    <div class='item-header'>
        <slot name='header'>
            标题
        </slot>
    </div>
    <div class='item-body'>
        <slot></slot>
    </div>
</div>
</template>

<script lang='ts' setup>

const props = defineProps({
    title: {
        type: String,
    },
    headerHeight: {
        type: String,
        default: '60px'
    }
});


</script>

<style scoped lang='less'>
.item-box-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: v-bind('props.headerHeight') auto;

    .item-header {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 20px;
        border-bottom: 1px solid @color;
    }

    .item-body {
        width: 100%;
        padding: 0 20px;
    }
}
</style>