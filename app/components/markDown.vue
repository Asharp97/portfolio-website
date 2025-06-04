<script setup>
const props = defineProps(["text"]);

const parseBold = () => {
  return props.text.split(/\*\*(.+?)\*\*/g);
};
</script>

<template>
  <div>
    <span v-for="(part, index) in parseBold(text)" :key="index">
      <template v-if="index % 2 === 1">
        <strong>{{ part }}</strong>
      </template>
      <template v-else>
        {{ part }}
      </template>
    </span>
  </div>
</template>
