<template>
  <div
    :style="{ height: `${height}dvh` }"
    class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-12" />
</template>

<script setup>
defineProps(["height"]);
</script>

<style lang="scss" scoped></style>
