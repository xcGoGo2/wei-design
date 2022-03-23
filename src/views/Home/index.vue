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
    <div class="component-box">
        <Sidebar></Sidebar>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Sidebar from '../../components/Sidebar/index.vue'

export default defineComponent({
    name: 'Home',
    components: {
        Sidebar
    },
    props: {},
    setup() {

    }
})
</script>


<style lang="less">
.component-box {
    width: 80px;
    height: 100%;
}
</style>
