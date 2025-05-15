<template>
  <div class="w-full">
    <UCard class="flex-col">
      <template #header>
        <Icon :name="icon" class="text-copper-500 text-6xl" />
      </template>

      <template #footer>
        <h3 class="max-w-75 mx-auto text-center">
          <slot />
        </h3>
      </template>
    </UCard>
  </div>
</template>

<script setup>
defineProps(["icon"]);
</script>

<style lang="scss" scoped></style>
