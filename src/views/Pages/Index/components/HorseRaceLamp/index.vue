<template>
    <div class="horse-race-lamp-container" ref="conRef">
        <div class="line" ref="lineRef">
            <div class="content">
                <span v-for="(item, i) in horseTextList" style='color: #909399' class="line-item" :key="i">{{ item.title }}</span>
            </div>
            <div style="position: absolute; bottom: 0; width: 100%" dir="rtl">{{ oneSentenceData.origin }}—— </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { custom_api_index } from '@/api/service/index';
import { getRandomColor } from '@/utils'

let horseTextList= ref<{title: string; color: string}[]>([]);
let oneSentenceData = ref<any>({});
custom_api_index.goodDailySentences().then((res: any) => {
    if(res) {
        oneSentenceData.value = res.data;
        horseTextList.value = (res.data.content || '').split('').map((o: string) => {
        return {
            title: o,
            color: getRandomColor()
        }
    });
    }
})

// 文本长度
const conRef: any = ref(null);
const lineRef: any = ref(null);
let conWidth = ref<number | string>(0);
let lineW = ref<number | string>(0);

onMounted(() => {
    conWidth.value = (conRef.value ? conRef.value.offsetWidth: 0) - 80 + 'px';
    lineW.value = (lineRef.value ? lineRef.value.offsetWidth: 0) * -1 + 'px';
});

</script>

<style lang="less" scoped>
@conwidth: v-bind(conWidth);
@lineW: v-bind(lineW);

.horse-race-lamp-container {
    height: 100%;
    width: 100%;
    white-space: normal;
    display: flex;
    align-items: center;
    overflow: hidden;

    .line {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 100%;

        .content {
            width: 100%;
            font-size: .4em;

            .line-item {
                margin: 0 2px;
                font-size: .5em;
            }

        }
    }
}
</style>