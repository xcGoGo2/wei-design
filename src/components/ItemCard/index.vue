<template>
    <el-card class="item-card">
        <template #header>
            <slot name="header">
                <div class="item-header">
                    <div class="item-left">
                        <span class="red-btn btn" @click="cancel">
                            <svg-icon name="cancel" color="#1d2129" size="8px"></svg-icon>
                        </span>
                        <span class="green-btn btn" @click="enLarge">
                            <svg-icon name="enLarge" color="#1d2129" size="8px"></svg-icon>
                        </span>
                    </div>
                </div>
            </slot>
        </template>

        <!-- body -->
        <slot></slot>
    </el-card>
</template>

<script setup lang="ts">
const emits = defineEmits(['cancel', 'enLarge']);

const cancel = () => {
    emits('cancel', true)
};

const enLarge = () => {
    emits('enLarge', true)
};


</script>

<style lang="less" scoped>
.item-card {
    width: 100%;
    height: 100%;

    .item-header {
        width: 100%;
        height: 15px;
        display: flex;
        align-items: center;

        .item-left {
            display: inline-flex;
            align-items: center;

            .btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 14px;
                height: 14px;
                margin: 0 4px;
                color: #1d2129;
                font-weight: 700;
                border-radius: 50%;

                .svg-icon {
                    transition: opacity 500ms;
                    opacity: 0;
                }
            }

            &:hover .btn .svg-icon {
                opacity: 1;
            }

            .red-btn {
                background-color: #fc625d;
            }

            .green-btn {
                background-color: #34c749;
            }
        }
    }
}
</style>

<style lang="less">
.item-card {
    .el-card__header {
        padding: 10px;
    }
    .el-card__body {
        padding: 10px;
        width: 100%;
        height: calc(100% - 35px);
    }
}
</style>
