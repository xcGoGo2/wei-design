<template>
  <div class="component-box">
    <el-container>
      <el-aside style="width: auto;">
        <Sidebar></Sidebar>
      </el-aside>
      <el-container>
        <el-header style="padding: 0">
          <Header></Header>
        </el-header>
        <el-main style="padding: 0">
          <view-router>
            Main 界面
          </view-router>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Sidebar from "../../components/Sidebar/index.vue";
import Submenu from "../../components/Submenu/index.vue";
import Row from "../../components/Layout/Row/index.vue";
import Col from "../../components/Layout/Col/index.vue";
import Header from "../../components/Header/index.vue";

export default defineComponent({
  name: "Home",
  components: {
    Sidebar,
    Submenu,
    Row,
    Col,
    Header,
  },
  props: {},
  setup(props) {
  },
});
</script>

<style lang="less">
.component-box {
  display: flex;
  height: 100%;
}
</style>
