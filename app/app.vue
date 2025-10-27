<template>
  <!-- <Lenis root> -->
  <Noise />
  <NuxtLayout>
    <Analytics/>
    <NuxtPage />
  </NuxtLayout>
  <!-- </Lenis> -->
</template>
<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
</script>
<style>
html {
  scroll-behavior: smooth;
}
</style>
