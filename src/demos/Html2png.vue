<template>
  <div class='html-2-png-container' ref="dom2imageRef">
    <div>测试文字 普通 dom 元素</div>
    <div>
        <label>测试echarts 图</label>
        <HorizontalBarChart></HorizontalBarChart>
    </div>
  </div>

  <el-button @click="toImagg">导出</el-button>


  <img class="demo-img" :src="demoImgSrc" alt="">
</template>

<script setup lang='ts'>
import HorizontalBarChart from "@/custom-components/Charts/BarChart/HorizontalBarChart.vue";
import { ref } from "vue";
// import { useDom2image } from "@/hooks/useDom2image"

const dom2imageRef = ref<HTMLElement | null>(null);

const demoImgSrc = ref('');

const toImagg = async () => {
    console.log(dom2imageRef);
    const options = {};
    // demoImgSrc.value = await useDom2image(dom2imageRef.value as HTMLElement);

}

</script>

<style lang='scss' scoped>
.html-2-png-container {
    height: 200px;
    width: 200px;
    border: 1px solid red;
    background-color: #fff;
}

.demo-img {
    height: 200px;
    height: 200px;
}
</style>
