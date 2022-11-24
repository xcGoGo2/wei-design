<template>
    <div class='info-container'>
        <div class='dependencies-container'>
            <el-descriptions border>
                <el-descriptions-item v-for='item in dependenciesList' :key='item.key + item.value' :label='item.key'>
                    {{ item.value }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script lang='ts' setup>
import config from '../../../../../../package.json';

console.log(config);
const { dependencies, devDependencies, version } = config;
const dependenciesList = Object.entries(dependencies).map(([key, value]) => {
    return {
        key,
        value
    }
});

const devDependenciesList = Object.entries(devDependencies).map(([key, value]) => {
    return {
        key,
        value
    }
});
console.log(dependenciesList)
</script>

<style scoped lang='scss'>
.info-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;

    .devDependencies-container, .dependencies-container {
        width: 100%;
    }
}
</style>
