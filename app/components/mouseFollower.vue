<template>
  <div
    class="-translatex-20 -translate-y-20"
    :style="{
      transform: `translate(${x}px, ${y}px)`,
    }">
    <AnimatePresence>
      <motion.div
        v-if="text"
        class="absolute bg-copper-600 text-white p-2 whitespace-nowrap h-9 overflow-clip"
        :initial="animate"
        :animate="{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          borderRadius: '10px',
        }"
        :exit="animate">
        <motion.div v-for="n in 3" :key="n">
          {{ text }} - {{ location }}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup>
import { AnimatePresence, motion } from "motion-v";
defineProps(["text", "x", "y", "location"]);
const animate = ref({
  opacity: 0,
  y: 50,
  filter: "blur(5px)",
  borderRadius: "0px",
});
</script>

<style lang="scss" scoped></style>
