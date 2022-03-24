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
    <div class="one">
      <Sidebar></Sidebar>
    </div>
    <div class="two">
      <Submenu></Submenu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Sidebar from "../../components/Sidebar/index.vue";
import Submenu from "../../components/Submenu/index.vue";

export default defineComponent({
  name: "Home",
  components: {
    Sidebar,
    Submenu,
  },
  props: {},
  setup() {},
});
</script>


<style lang="less">
.component-box {
    display: flex;
    height: 100%;

    
    .one {
        width: 80px;
        height: 100%;
    }
    .two {
        width: 200px;
        height: 100%;
    }
  
}
</style>
