<template>
    <div class="designSpace-container">
        <!--头部控制-->
        <div class="header">
            <div class="left-box">
                <span class="logo-box">
                    <svg-icon class="logo" name="lightning" width="30px" height="30px" color="#0ca296"></svg-icon>
                </span>
                <div class="btn-box">
                    <el-tooltip
                        effect="dark"
                        content="图表组件"
                        placement="bottom"
                    >
                        <el-button :plain="!showChart" type="primary" @click="showConfig('chart', $event)">
                            <template #icon>
                                <svg-icon name="chart" size="2em" color=""></svg-icon>
                            </template>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip
                        effect="dark"
                        content="图层控制"
                        placement="bottom"
                    >
                        <el-button  :plain="!showLayer" type="primary" @click="showConfig('layer', $event)">
                            <template #icon>
                                <svg-icon name="layer" color=""></svg-icon>
                            </template>
                        </el-button>
                    </el-tooltip>

                    <el-tooltip
                        effect="dark"
                        content="详情设置"
                        placement="bottom"
                    >
                        <el-button  :plain="!showSide" type="primary" @click="showConfig('side', $event)">
                            <template #icon>
                                <svg-icon name="sideSetting" color=""></svg-icon>
                            </template>
                        </el-button>
                    </el-tooltip>

                    <div class="line"></div>
                    <el-button plain disabled type="">
                        <template #icon>
                            <svg-icon name="pre" color=""></svg-icon>
                        </template>
                    </el-button>
                    <el-button plain disabled type="">
                        <template #icon>
                            <svg-icon name="next" color=""></svg-icon>
                        </template>
                    </el-button>
                </div>
            </div>
            <div class="center-box">
                <div @click="editName" style="display: flex;align-items: center">
                    <svg-icon name="work" color="#9f9f9f" size="1.25em"></svg-icon>
                    <span style="font-weight: bold; margin: 0 5px;">工作空间 — </span>
                    <el-button class="name-edit" v-show="!ifShowEditInput" circle type="">{{ webName }}</el-button>
                    <el-input maxlength="20" show-word-limit ref="webNameRef" data-type="input" v-model="webName" v-show="ifShowEditInput" type="text"></el-input>
                </div>
            </div>
            <div class="right-box">
                <el-button type="" size="large">
                    <svg-icon name="预览" color="" size="1.2em"></svg-icon>
                    预览
                </el-button>
                <el-button type="" size="large">
                    <svg-icon name="发布" color="" size="1.2em"></svg-icon>
                    发布
                </el-button>
            </div>
        </div>
        <!--内容显示-->
        <div class="content">
            <!--组件图层展示区域-->
            <div class="component-control" :class="showChart? '': 'shrink'">
                <component-control :shrink-component="showChart"></component-control>
            </div>
            <div class="layer-control" :class="!showLayer? 'hideLayer': ''">
                <layer-control @shrink="layerShrink"></layer-control>
            </div>
            <div class="edit-control">
                <edit-control></edit-control>
            </div>
            <div class="side-setting-control" :class="!showSide? 'hideSideSetting': ''">
                <side-setting-control></side-setting-control>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import ComponentControl from './components/ComponentControl/index.vue';
import LayerControl from './components/LayerControl/index.vue';
import EditControl from './components/EditControl/index.vue';
import SideSettingControl from './components/SideSettingControl/index.vue';

const ifShowEditInput = ref(false);
const webName = ref('项目一');
const webNameRef = ref(null);
const editName = (e: any) => {
    if(ifShowEditInput.value && e.target.dataset.type && e.target.dataset.type === 'input') {
        return
    }
    ifShowEditInput.value = !ifShowEditInput.value;
    (webNameRef.value as any).focus();
};

const showChart = ref(true);
const showLayer = ref(true);
const showSide = ref(false);
const layerShrink = () => {
    showLayer.value = false;
}

const showConfig = (show: string, event: any) => {
    switch (show) {
        case 'chart':
            showChart.value = !showChart.value;
            break;
        case 'layer':
            showLayer.value = !showLayer.value;
            break;
        case 'side':
            showSide.value = !showSide.value;
            break;

    }
    let target = event.target
    while (target.nodeName !== 'BUTTON') { target = target.parentNode } target.blur()
}
</script>

<style scoped lang="scss" src='./index.scss'></style>

<style lang="scss">

</style>

