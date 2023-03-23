<template>
    <div class="assembly-container">
        <!--组件：组件包含内置的组件，外部也可以自己上传组件，然后预览介绍，详情接口入参配置等。-->
        <el-card class='custom-card' shadow='hover' v-for='(item, i) in assemblyList' :key='item.img' data-name='el-card' @click='showAssemblyDetail(item, $event)'>
            <div class='el-custom-card-body'>
                <img class='custom-card-img' :src='item.img'
                     alt=''>
                <div class='discrible-box'>
                    <span class='title'>{{ item.title }}</span>
                    <span class='content'>{{ item.content }}</span>
                    <span class='time'>{{ item.time }}</span>
                </div>
            </div>
        </el-card>

        <!--组件详情-->
        <el-card class='show-assembly-box' v-show='detailBoxVisible'>
            <h1 @click='detailBoxVisible = false'>退出</h1>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { assemblyType } from '@/type';
import { ASSEMBLY_API } from '@/api/service/index';
import { ref } from 'vue';

let assemblyList = ref<assemblyType[]>([])
ASSEMBLY_API.getAssemblyLists().then(res => {
    if(res) {
        assemblyList.value = res.data;
    }
});

const detailBoxVisible = ref<boolean>(false);
const showAssemblyDetail = (item: assemblyType, e: any) => {
    detailBoxVisible.value = true;
}
</script>

<style lang="scss" scoped>
.assembly-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px 20px;

    .custom-card {
        height: 280px;
        cursor: pointer;

        .el-custom-card-body {
            height: 100%;
            width: 100%;
            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: 180px 100px;

            .custom-card-img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
            }

            .discrible-box {
                width: 100%;
                padding: 10px;
                //display: grid;
                //grid-template-rows: 25px auto 20px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;

                .title {
                    font-size: 16px;
                    font-weight: 700;
                }

                .time {
                    color: rgba(81, 90, 110, .6);
                }
            }
        }
    }

    .show-assembly-box {
        position: absolute;
        background-color: #fff;
        left: 20px;
        top: 20px;
        right: 20px;
        bottom: 20px;

    }

}
</style>

<style lang='scss'>
.assembly-container {
    .custom-card {
        .el-card__body {
            height: 100%;
            width: 100%;
            padding: 0;
        }
    }
}
</style>
