<template>
  <div>
    <div class="flex justify-between flex-wrap gap-3">
      <div class="flex-1">
        <NuxtLink to="#home">
          <h1 v-if="!mounted || isMobile" class="text-7xl font-bold">
            Ali Elsayed
          </h1>
          <text-split v-else text="Ali Elsayed" tag="h1" />
        </NuxtLink>
      </div>
      <div class="flex flex-1 justify-between flex-wrap gap-2 w-full">
        <nav class="hidden md:block">
          <ul class="columns-2">
            <li v-for="(name, n) in titles" :key="n" class="mr-2 min-w-36">
              <!-- @click="scroll()" -->
              <button
                class="flex items-center gap-1 mb-1 group cursor-pointer"
                @mouseover="emit('setTitle', name)"
                @mouseleave="emit('setTitle', '')"
                >
                <Hashtag />
                <h3>{{ name }}</h3>
              </button>
            </li>
          </ul>
        </nav>

        <ul class="flex flex-col items-end flex-wrap w-full lg:w-20 text-right">
          <li v-for="social in common.socials" :key="social">
            <NuxtLink :to="social.link" target="_blank">
              <h3
                class="capitalize underline hover:tracking-wider duration-300">
                {{ social.name }}
              </h3>
            </NuxtLink>
          </li>
          <li>
            <a
              :href="`/ali-elsayed-resume-${locale}.pdf`"
              skills="_blank"
              rel="noopener noreferrer">
              <h3
                class="capitalize underline hover:tracking-wider duration-300">
                Résumé
              </h3>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="h-50" />
    <div class="flex justify-between items-end flex-wrap gap-3">
      <Mark-down :text="processedSummary" class="w-full md:w-1/2" />
      <div class="flex-1 md:flex justify-end items-end hidden">
        <Hashtag :active="true" :logo="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import common from "../static/common.json";
const props = defineProps(["titles", "summary", "locale", "isMobile"]);
const emit = defineEmits(["setTitle"]);
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
const processedSummary = computed(() => {
  const years = new Date().getFullYear() - 2020;
  return props.summary.replace("{{years}}", years);
});
</script>

<style lang="scss" scoped></style>
