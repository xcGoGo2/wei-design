<template>
    <div class="layer-control-container">
        <div class="top">
            <span class="left-box">
                图层
                <svg-icon name="layer"></svg-icon>
            </span>
            <span class="right-box">
                <el-button-group size="small">
                    <el-tooltip effect="dark" placement="top" content="缩略图">
                        <el-button type="" plain>
                            <template #icon>
                                <svg-icon name="缩略图"></svg-icon>
                            </template>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" placement="top" content="文本列">
                        <el-button type="" plain>
                            <template #icon>
                                <svg-icon name="列表1"></svg-icon>
                            </template>
                        </el-button>
                    </el-tooltip>
                </el-button-group>
                <svg-icon class="prev" @click="shrink" title="收起" size="1.1em" name="pre"></svg-icon>
            </span>
        </div>
        <div class="content">
            <ul>
                <li :class="curComponentIndex === index ? 'active': ''" v-for="(item, index) in layerControlData.layerList" :key="item.title + index" @click="selectLayer(index)">
                    <svg-icon :name="item.icon" class="img"></svg-icon>
                    <span class="title">{{ item.title }}</span>
                    <span class="control">
                        <svg-icon class="lock" name="unlock"></svg-icon>
                        <svg-icon class="show" name="show"></svg-icon>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useStore } from 'vuex';
import {Compnents} from "@/type";

const store = useStore();
const emits = defineEmits(['shrink']);

// layer 组件数据集合
const layerControlData = reactive<{layerList: Compnents[]}>({
    layerList: []
});

// 获取当前展示在 画布中的组件列表
const layerList = computed(() => store.state.weiDesign.componentsInCanvas);
// 当前选中组件
const curComponentIndex = computed(() => store.state.weiDesign.curComponentIndex);

watch(layerList, (n, o) => {
    layerControlData.layerList = (n || []).map((o: Compnents) => {
        o.ifLock = o.ifLock ? o.ifLock: false;
        o.ifShow= o.ifShow ? o.ifShow: true;
        return o;
    })
})

const selectLayer = (index: number) => {
    store.commit('weiDesign/setComponentIndex', index);
}

const shrink = () => {
    emits('shrink', true)
}
</script>

<style scoped src='./index.scss' lang="scss"></style>
