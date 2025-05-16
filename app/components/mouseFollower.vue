<template>
  <div
    class="-translatex-20 -translate-y-40"
    :style="{
      transform: `translate(${x}px, ${y}px)`,
    }">
    <AnimatePresence>
      <motion.div
        v-if="text"
        class="absolute overflow-clip bg-copper-600 dark:bg-slate-600 text-white p-2 whitespace-nowrap h-10 flex flex-col gap-2"
        :initial="animateFrom"
        :animate="animateTo"
        :exit="animateFrom">
        <div v-for="n in count" :key="n">
          <motion.div
            :style="{
              transform: `translate(0px, -${18 * count * location}px)`,
            }">
            {{ text }}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup>
import { AnimatePresence, motion } from "motion-v";
defineProps(["text", "x", "y", "location"]);
const animateFrom = ref({
  opacity: 0,
  // y: 50,
  filter: "blur(10px)",
  borderRadius: "0px",
});
const animateTo = ref({
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  borderRadius: "10px",
});
const count = 18;
</script>

<style lang="scss" scoped></style>
