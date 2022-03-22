<!--
 * @Author: chenwei
 * @Date: 2022-02-10 15:03:44
 * @LastEditors: chenwei
 * @LastEditTime: 2022-02-10 15:52:58
 * @FilePath: \weiManage\src\views\Home\index.vue
 * @Description: 
 * 
-->

<template>
    <div>
        <Sidebar></Sidebar>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from "../../components/Sidebar/index.vue"
export default defineComponent({
    name: 'Home',
    components: {
        sideBar: Sidebar
    },
    props: {},
    setup() {

    }
})
</script>


<style lang="less" scoped>
div {
    border: 1px solid red;
}
</style>
