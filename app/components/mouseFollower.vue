<template>
  <div
    class="-translatex-20 -translate-y-20"
    :style="{
      transform: `translate(${x}px, ${y}px)`,
      animationTimingFunction: 'cubic-bezier(.59,.3,.28,1.29)',
    }">
    <div
      v-if="text"
      class="absolute z-30 bg-copper-600 text-white p-2 duration-500">
      {{ text }}
    </div>
  </div>
</template>

<script setup>
defineProps(["text", "x", "y"]);
</script>

<style lang="scss" scoped></style>
