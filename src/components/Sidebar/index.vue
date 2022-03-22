<template>
  <div>
    <ul>
        <li v-for="(item, i) in itemList" :key="i">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRef, toRefs, PropType } from "vue";

interface itemListType {
    name: string,
    path: string
}
export default defineComponent({
  name: "sideBar",
  props: {
    sign: {
      type: String,
      default: "",
    },
    itemList: {
      type: Array as PropType<itemListType[]>,
      default: [
        {
          name: "标题1",
          path: "",
        },
        {
          name: "标题2",
          path: "",
        },
      ],
    },
  },
  setup(props, context) {
    const num = ref(100);
    console.log("num", num.value);
    const { itemList, sign } = props
    console.log(itemList, sign);
    debugger
    const addNum = () => {
      num.value += 1;
    };
    return {
      num,
      addNum,
      itemList,
      sign
    };
  },
});
</script>

<style lang="less" scoped>
</style>