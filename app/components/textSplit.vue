<template>
  <AnimatePresence>
    <component :is="tag ? tag : 'span'" class="flex">
      <motion.div
        v-for="(charachter, n) in str"
        :key="n"
        :initial="fromAniamtion"
        :animate="toAnimation"
        :exit="fromAniamtion"
        :transition="{
          type: 'spring',
          stiffness: 500,
          damping: 50,
          delay: 0.02 * n,
          duration: 0.2,
        }"
      >
        {{ charachter }}
      </motion.div>
    </component>
  </AnimatePresence>
</template>

<script setup>
import { motion, AnimatePresence } from "motion-v";
const props = defineProps(["text", "tag", "condition"]);
const str = ref();
const fromAniamtion = {
  y: 120,
  opacity: 0,
};
const toAnimation = {
  y: 0,
  opacity: 1,
};

const spl = () => {
  if (props.text) {
    str.value = props.text
      .split("")
      .map((item) => (item === " " ? (item = "\u00A0") : item));
  }
};

onMounted(() => {
  spl();
});

watch(props.text, () => {
  spl();
});
</script>

<style lang="scss" scoped></style>
