<template>
  <div class="container">
    <transition name="router_animate">
      <w-button v-if="isVisible">1111</w-button>
    </transition>

    <w-button @click="click">点击</w-button>
  </div>
</template>

<script setup lang="ts">
const isVisible = ref(true)
const click = () => {
  isVisible.value = !isVisible.value
}
</script>

<style lang="scss" scoped>
.w-button {
  display: inline-block;
}

.router_animate-enter-active {
  animation: rollIn 1s;
}
.router_animate-leave-active {
  animation: rollOut 0.6s;
}
</style>
