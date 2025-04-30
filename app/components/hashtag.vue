<template>
  <div
    class="cursor-pointer rounded-full w-fit text-xl text-white flex justify-center items-center duration-300 transition-all"
    :class="[
      active ? 'p-1 rotate-90 bg-copper-500' : 'p-0 rotate-0 bg-copper-950',
      'group-hover:p-1 group-hover:rotate-90 group-hover:bg-copper-500',
    ]">
    <Icon
      name="majesticons:hashtag-line"
      class="duration-300 transition-all"
      :class="[
        active ? 'opacity-100 text-lg' : 'opacity-0 text-xs',
        'group-hover:opacity-100 group-hover:text-lg',
      ]" />
  </div>
</template>

<script setup>
defineProps(["active"]);
</script>

<style scoped></style>
