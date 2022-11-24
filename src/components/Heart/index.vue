<template>
    <span class="heart-container">
    </span>
</template>

<script setup lang="ts">
const props: any = defineProps({
    size: {
        type: String,
        default: '1em'
    },
    type: {
        type: String,
        validator(value: string) {
            return ['warn', 'success'].includes(value)
        },
        default: 'warn'
    },
    ms: {
        type: String,
        default: '1s'
    },
    large: {
        type: Number,
        default: 1.1
    }
})

const HEART_COLOR: any = {
    success: '#34c749',
    warn: '#fcbc40'
}

</script>

<style lang="scss" scoped>

.heart-container {
    display: inline-block;
    height: v-bind(size);
    width: v-bind(size);
    border-radius: 50%;
    background-color: v-bind('HEART_COLOR[props.type]');
    animation: scales v-bind('props.ms') linear infinite;
}

@keyframes scales {
    0% {
        transform: scale(1);
        opacity: 0.3
    };
    50% {
        transform: scale(v-bind('props.large'));
        opacity: 1
    }
    100% {
        transform: scale(1);
        opacity: 0.3
    }
}
</style>
