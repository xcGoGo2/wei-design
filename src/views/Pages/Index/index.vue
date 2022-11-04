<template>
  <div class="index-container">
    <div class="horse-race-lamp">
      <HorseRaceLamp></HorseRaceLamp>
    </div>
    <div class="quick-links">
      <QuickLinks></QuickLinks>
    </div>
    <div class="dependence-info">
      依赖信息
    </div>
    <div class="history-log">
      历史记录
    </div>
  </div>
</template>

<script setup lang="ts">
import HorseRaceLamp from './components/HorseRaceLamp/index.vue';
import QuickLinks from './components/QuickLinks/index.vue';

</script>

<style lang="less" scoped>
.index-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 20px;

  .horse-race-lamp {
    height: 100px;
    background-color: #FFFFFF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 20px;
  }

  .quick-links {
    height: 200px;
    background-color: #FFFFFF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 20px;
    margin-top: 20px;
  }

  .dependence-info {
    height: 200px;
    background-color: #FFFFFF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 20px;
    margin-top: 20px;
  }

  .history-log {
    height: 200px;
    background-color: #FFFFFF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 20px;
    margin-top: 20px;
  }
}
</style>