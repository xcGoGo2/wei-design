<template>
    <div class="col-container">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    name: 'Col',
    props: {
        // flex: 1, 1, 1
        span: {
            type: [Number, String],
            default: 1
        }
    },
    setup(props, context) {
        const { span } = props

        const colStyle = reactive({
            span
        })

        return {
            colStyle
        }
    },
})
</script>

<style lang="less" scoped>
.col-container {
    height: 100%;
    width: 100%;
    // border: 1px solid green;
    flex: v-bind('colStyle.span');
}
</style>
