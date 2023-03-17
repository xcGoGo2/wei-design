<template>
  <div class="component-box">
    <el-container>
      <el-aside style="width: auto">
        <suspense>
          <Sidebar></Sidebar>
        </suspense>
      </el-aside>
      <el-container>
        <el-header style="padding: 0">
          <design-header></design-header>
        </el-header>
        <div class="tabBar">
          <TabBar></TabBar>
        </div>
        <el-main style="padding: 0; height: calc(100% - 100px);">
            <suspense>
                <router-view></router-view>
            </suspense>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue';

import Sidebar from '../../components/Sidebar/index.vue';
import Submenu from '../../components/Submenu/index.vue';
import Row from '../../components/Layout/Row/index.vue';
import Col from '../../components/Layout/Col/index.vue';
import DesignHeader from '../../components/Header/index.vue';
import TabBar from '../../components/TabBar/index.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Sidebar,
    Submenu,
    Row,
    Col,
    DesignHeader,
    TabBar,
  },
  props: {},
  setup(props) {
    // 获取全局对象`
    const global: any = inject('global');

    // global.$api.Get('api/weiDesign/getUsers', {}).then((res: any) => {
    //   console.log('测试接口', res);
    // });
  },
});
</script>

<style lang="scss">
.component-box {
  display: flex;
  height: 100%;

  .tabBar {
    height: 40px;
    width:100%;
    background-color: #FFFFFF;
    border-bottom: 1px solid #dddfe5;
  }
}
</style>
