<template>
  <div class="tabBar-container">
    <el-tag class="" :effect="activeIndex === i ? 'dark': 'light'" v-for="(item, i) in tagList" :key="i + item.title" @click="clickTag(item, i)" @close="closeTag(i)" size="large" :type="item.type" :closable="true">{{ item.title }}</el-tag>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { randomNum } from "@/utils/index";
  import { tagType } from '../../../type';
  const route = useRoute();
  const router = useRouter();
  const tagList: tagType[] = reactive([
    {
      title: '首页',
      path: '/index',
      type: getTagColor()
    }
  ]);

  let activeIndex = ref<number>(0);  // 当前高亮tag

  initTab(route);
  watch(route, (v, o) => {
    initTab(v);
  });

  // 点击标签
  const clickTag = (item: tagType, i: number) => {
    activeIndex.value = i;
    router.push(item.path);
  }

  // 关闭标签
  const closeTag = (i: number) => {
    if(i === 0) {
      return
    };

    tagList.splice(i, 1);

    if(activeIndex.value === i) {
      activeIndex.value = 0;
      clickTag(tagList[0], 0);
    };

    if(activeIndex.value > i) {
      activeIndex.value -= 1;
    }

  };

  /**
   * initTab 渲染tab
   * @param routeData 
   */
  function initTab(routeData: any) {
    const index = tagList.findIndex(m => {
      return m.title === routeData.name && m.path === routeData.path;
    });
    activeIndex.value = index >= 0? index : tagList.length;
    if(index < 0) {
      tagList.push({
        title: routeData.name,
        path: routeData.path,
        type: getTagColor()
      })
    }
  }

  // 随机 tag 类型
  function getTagColor () {
    const type = ['success','info','warning','danger'];
    const index = randomNum(0, type.length - 1);
    return type[index];
  }
</script>

<style lang="less" scoped>
.tabBar-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;

}
</style>

<!-- elementui 样式 -->
<style lang="less">
.tabBar-container {
  .el-tag {
    margin: 0 5px;
    cursor: pointer;
  }
}
</style>
