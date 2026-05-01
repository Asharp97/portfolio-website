<template>
  <div class="bg-white h-dvh pt-10">
    <Hashtag :active="true" :logo="true" class="m-auto w-50" />
  </div>
</template>

<script setup>
onMounted(() => {
  if (window.location.hostname === "localhost:3000") {
    console.log("localhost");
  }
});
</script>

<style lang="scss" scoped></style>
