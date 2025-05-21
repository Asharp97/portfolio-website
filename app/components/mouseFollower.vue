<template>
  <div
    class="-translatex-20 -translate-y-42"
    :style="{
      transform: `translate(${x}px, ${y}px)`,
    }"
  >
    <AnimatePresence>
      <motion.div
        v-if="text"
        class="absolute overflow-clip bg-copper-600 dark:bg-slate-600 rounded-xl text-white p-2 whitespace-nowrap h-10 flex flex-col gap-2"
        :initial="animateFrom"
        :animate="animateTo"
        :exit="animateFrom"
        :transition="transition"
      >
        <text-split :text="text" />
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup>
import { AnimatePresence, motion } from "motion-v";
defineProps(["text", "x", "y"]);
const animateFrom = {
  opacity: 0,
  y: -50,
  filter: "blur(3px)",
};
const animateTo = {
  opacity: 1,
  y: 0,
  filter: "blur(0)",
};
const transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  duration: 0.2,
};
</script>

<style lang="scss" scoped></style>
