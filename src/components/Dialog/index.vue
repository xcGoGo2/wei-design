<template>
    <el-dialog class="dialog-container-box animated">
        <template #header>
            <slot name="header">
                <div class="item-header">
                    <div class="item-left">
                        <span v-if="includesBtn('cancel')" class="red-btn btn" @click="cancel">
                            <svg-icon name="cancel" color="#1d2129" size="8px"></svg-icon>
                        </span>
                        <span v-if="includesBtn('reduce')" class="yellow-btn btn" @click="reduce">
                            <svg-icon name="reduce" color="#1d2129" size="8px"></svg-icon>
                        </span>
                        <span v-if="includesBtn('enLarge')" class="green-btn btn" @click="enLarge">
                            <svg-icon name="enLarge" color="#1d2129" size="8px"></svg-icon>
                        </span>
                    </div>
                </div>
            </slot>
        </template>

        <!-- body -->
        <slot></slot>
    </el-dialog>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

type btnType = 'cancel' | 'enLarge' | 'reduce';

const emits = defineEmits(['cancel', 'enLarge', 'reduce']);

const props = defineProps({
    btns: {
        type: Array as PropType<btnType[]>,
        default: () => {
            return ['cancel', 'enLarge']
        }
    }
})

const includesBtn = (btn: btnType) => {
    return props.btns.includes(btn);
};

const cancel = () => {
    emits('cancel', true)
};

const enLarge = () => {
    emits('enLarge', true)
};

const reduce = () => {
    emits('reduce', true)
};
</script>

<style lang="scss" scoped>
.dialog-container-box {
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
            cursor: pointer;

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

            .yellow-btn {
                background-color: #fdbd30;
            }

            .green-btn {
                background-color: #34c749;
            }
        }
    }
}
</style>

<style lang="scss">
// .item-card {
//     .el-card__header {
//         padding: 10px;
//     }
//     .el-card__body {
//         padding: 10px;
//         width: 100%;
//         height: calc(100% - 35px);
//     }
// }
</style>

