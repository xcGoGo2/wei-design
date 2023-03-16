<template>
    <div class="component-control-container" :class="!shrinkComponent ? 'shrinkComponent':''">
        <div class="top">
            <span class="left-box">
                组件
                <svg-icon name="chart"></svg-icon>
            </span>
            <span class="right-box">
                <el-input
                    v-model="searchValue"
                    size="small"
                    placeholder="搜索组件"
                    :suffix-icon="Search"
                />
                <el-button-group size="small">
                    <el-tooltip effect="dark" placement="top" content="单列">
                        <el-button type="" plain>
                            <template #icon>
                                <svg-icon name="单列"></svg-icon>
                            </template>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" placement="top" content="双列">
                        <el-button type="" plain>
                            <template #icon>
                                <svg-icon name="双列"></svg-icon>
                            </template>
                        </el-button>
                    </el-tooltip>
                </el-button-group>
            </span>
        </div>
        <div class="content">
            <ul class="components-list">
                <li
                    v-for="(item, index) in componentsList"
                    :key="item.title"
                    :class="activeComponentIndex === index ? 'active': ''"
                    @click="selectComponentList(index)"
                >
                    <svg-icon :name="item.icon" size="1.25em"></svg-icon>
                    <span class="title">{{ item.title }}</span>
                </li>
            </ul>
            <ul class="layer-list">
                <li
                    v-for="(item, index) in layerList"
                    :class="activeLayerIndex === index ? 'active': ''"
                    @click="selectLayerIndex(index)"
                    :key="item.name"
                >
                    {{item.name }}
                </li>
            </ul>
            <ul class="chart-list">
                <li v-for="(item, index) in chartList" :key="index + item.id" draggable='true' :data-index="index" @dragstart="handleDragStart($event, item)">
                    <item-card :btns="['cancel', 'enLarge', 'reduce']">
                        <template #headerRight>
                            <span>{{ item.label }}</span>
                        </template>
                        <div class="layer-content">
                            <html2-canvas :component-data="item"></html2-canvas>
                            <!--<svg-icon :name="item.icon" style="width: 90%; height: 90%"></svg-icon>-->
                        </div>
                    </item-card>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { Search } from '@element-plus/icons-vue';
import ItemCard from '@/components/ItemCard/index.vue';
import Html2Canvas from '@/components/Html2canvas/index.vue';
import List from '@/custom-components/config';
import { Compnents } from '@/type';

const props = defineProps({
    shrinkComponent: {
        type: Boolean,
        default: false
    }
})

const componentsList = (List || []);
const activeComponentIndex = ref(0); // 选择组件 index
const activeLayerIndex = ref(0);  // 选择 类型 index

const layerList = computed(() => {
    return [{
        name: '全部',
        components: [],
        value: 'all'
    }, ...(List || [])[activeComponentIndex.value].list]
})


const selectComponentList = (index: number) => {
    activeComponentIndex.value = index;
    activeLayerIndex.value = 0;
};

const chartList = computed(() => {
    if((layerList.value[activeLayerIndex.value] as any).value === 'all') {
        const list: any[] = [];
        layerList.value.forEach((o: any) => {
            if(o.components.length) {
                list.push(...o.components);
            }
        })
        return list;
    }

    return layerList.value[activeLayerIndex.value]?.components || []
})

const selectLayerIndex = (index: number) => {
    activeLayerIndex.value = index;
}

const searchValue = ref('');

const handleDragStart = (e: any, item: Compnents) => {
    const itemStr = JSON.stringify(item);
    e.dataTransfer.setData('component', itemStr)}
</script>

<style src='./index.scss' lang="scss" scoped></style>

<style lang="scss">
.component-control-container {
    .content {
        .item-card {
            .el-card__header {
                padding: 4px 10px;
                .btn {
                    height: 8px;
                    width: 8px;
                }
            }
        }
    }
}
</style>
