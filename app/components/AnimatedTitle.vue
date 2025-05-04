<template>
  <div>
    <transition tag="div" name="char">
      <!-- <span
        v-for="(char, index) in textArray"
        :key="index"
        :style="{ transitionDelay: `${index * 50}ms` }"> -->
      <!-- {{ char }} -->
      <span v-if="trigger" class="translate-y-210">{{ text }}</span>
      <!-- </span> -->
    </transition>
  </div>
</template>

<script setup>
const props = defineProps(["text", "trigger"]);

const textArray = computed(() => props.text.split(""));
</script>

<style scoped>
.char-enter-active {
  transition: all 0.8s ease;
}
.char-leave-active {
  transition: all 0.1s ease;
}
.char-enter-from,
.char-leave-to {
  /* opacity: 0;
  filter: blur(5px); */
  /* transform: translateY(100px); */
}
</style>
