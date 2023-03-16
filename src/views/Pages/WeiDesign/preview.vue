<template>
  <Dialog v-model="overviewVisible" class="show-disign-view-dialog" :show-close="false" :btns="['reduce', 'enLarge']" width="80%" @reduce="overviewVisible = false" :fullscreen="isDialogFullScreen" @en-large="isDialogFullScreen = true" :append-to-body="true">
        <div class="title">{{ showViewData.title }}</div>
        <div class="overviewImg">
            <svg-icon name="平台"></svg-icon>
        </div>
        <div class="bottom-line">
            <span>最后时间：{{ new Date() }}</span>
            <div class="right">
                <span class="status">
                    <Heart style="margin-right: 5px" size=".8em" type="warn"></Heart>
                    状态
                </span>
                <el-button class="edit" plain @click="toDesignSpace" >
                    <template #icon>
                        <svg-icon name="hammer" size="1.5em" color=""></svg-icon>
                    </template>
                </el-button>
            </div>
        </div>
    </Dialog>
</template>

<script setup lang='ts'>
import { ref, reactive, defineProps, PropType } from 'vue';
import { useRouter } from 'vue-router';
import Dialog from '@/components/Dialog/index.vue';
import { designListType } from '@/type';

const router = useRouter();

const overviewVisible = ref(false);
const isDialogFullScreen = ref(false);

const props = defineProps({
    showViewData: {
        type: Object as PropType<designListType>,
        default: () => {
            return {
                id: '11',
                img: '',
                title: '演示图表',
                status: 'warn'
            }
        }
    }
})

defineExpose({
    overviewVisible,
    isDialogFullScreen
})

const toDesignSpace = () => {
    const newUrl = router.resolve({
        path: "weiDesign/designSpace"
    });
    window.open(newUrl.href, "_blank");
}

</script>

<style lang='less' scoped>

</style>
