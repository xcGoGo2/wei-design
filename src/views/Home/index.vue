<template>
  <div class="component-box">
    <div class="one">
      <Sidebar></Sidebar>
    </div>
    <div class="two">
      <Submenu></Submenu>
    </div>
    <div class="three">
      <Row direction="column" gutter="20px">
        <Col>
          <Header></Header>
        </Col>
        <Col>111</Col>
        <Col>111</Col>
      </Row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
    Header
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
    .three {
      width: 100%;
      height: 100%
    }
  
}
</style>
