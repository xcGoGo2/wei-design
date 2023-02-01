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
                    v-for="(item, index) in layerData.componentsList"
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
                    v-for="(item, index) in layerData.layerList"
                    :class="activeLayerIndex === index ? 'active': ''"
                    @click="selectLayerIndex(index)"
                    :key="item.title"
                >
                    {{item.title}}
                </li>
            </ul>
            <ul class="chart-list">
                <li v-for="(item, index) in layerData.chartList" :key="index + item.id" draggable='true' :data-index="index" @dragstart="handleDragStart">
                    <item-card btns="['cancel', 'enLarge', 'reduce']">
                        <template #headerRight>
                            <span>{{ item.label }}</span>
                        </template>
                        <div class="layer-content">
                            <svg-icon :name="item.icon" style="width: 90%; height: 90%"></svg-icon>
                        </div>
                    </item-card>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, computed } from 'vue'
import { useStore } from 'vuex';
import { Search } from '@element-plus/icons-vue';
import ItemCard from '@/components/ItemCard/index.vue';

const store = useStore();
const props = defineProps({
    shrinkComponent: {
        type: Boolean,
        default: false
    }
})

store.dispatch('fetchComponentsList');

const layerData = reactive({
    componentsList: [
        {
            icon: '图表',
            title: '图表'
        },{
            icon: '信息',
            title: '信息'
        },{
            icon: '列表',
            title: '列表'
        },{
            icon: '小组件',
            title: '小组件'
        }
    ],
    layerList: [
        {
            title: '所有',
            value: 'all'
        },{
            title: '柱状图',
            value: 'barChart'
        }
    ],
    chartList: computed(() => store.state.componentsList)
});


const activeComponentIndex = ref(0);
const selectComponentList = (index: number) => {
    activeComponentIndex.value = index;
};
const activeLayerIndex = ref(0);
const selectLayerIndex = (index: number) => {
    activeLayerIndex.value = index;
}

const searchValue = ref('');

const handleDragStart = (e: any) => {
    e.dataTransfer.setData('index', e.target.dataset.index)
}
</script>

<style src="./index.scss" lang="scss" scoped></style>

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
