<template>
    <div class="assembly-container">
        <!--组件：组件包含内置的组件，外部也可以自己上传组件，然后预览介绍，详情接口入参配置等。-->
        <el-card class='custom-card' shadow='hover' v-for='item in assemblyList' :key='item.img'>
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
        <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>

        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { assemblyType } from '@/type';
import { custom_api_assembly } from '@/api/service/index';

let assemblyList = ref<assemblyType[]>([])
custom_api_assembly.getAssemblyLists().then(res => {
    if(res) {
        assemblyList.value = res.data;
    }
})
</script>

<style lang="less" scoped>
.assembly-container {
    width: 100%;
    height: 100%;
    padding: 20px;
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
}
</style>

<style lang='less'>
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
