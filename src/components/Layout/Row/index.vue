<template>
  <div class="row-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Row",
  props: {
    // flex-direction
    direction: {
      type: String,
      default: "row",
    },
    // align-items
    align: {
      type: String,
      default: "center",
    },
    // justify-content
    justify: {
      type: String,
      default: "center",
    },
    // padding
    gutter: {
      type: [Number, String],
      default: '20px'
    }
  },
  setup(props, context) {
    const { direction, align, justify, gutter } = props;

    const rowStyle = reactive({
      direction,
      align,
      justify,
      gutter
    });
    return {
      rowStyle,
    };
  },
});
</script>

<style lang="less"  scoped>
.row-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: v-bind("rowStyle.direction");
  align-items: v-bind("rowStyle.align");
  justify-content: v-bind("rowStyle.justify");
  padding: v-bind("rowStyle.gutter");
  border: 1px solid red;
}
</style>
