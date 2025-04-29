<template>
  <div class="bg-copper-100 min-h-dvh py-8">
    <UContainer>
      <UCard class="bg-copper-300">
        <template #header>
          <h1 class="font-medium text-8xl">User Title</h1>
        </template>

        <Placeholder class="h-32" />

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
      <div class="w-full bg-copper-500 h-8"></div>
    </UContainer>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
