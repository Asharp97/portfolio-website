<template>
  <div class="bg-copper-100 py-32">
    <div class="container mx-auto">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-1"
      >
        <UCard
          class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-12 shadow-sm"
        >
          <div class="flex justify-between flex-wrap gap-3">
            <div class="flex-1">
              <h1>Ali <span>Elsayed</span></h1>
            </div>
            <div class="flex flex-1 justify-between flex-wrap gap-2">
              <ul class="columns-2">
                <li
                  v-for="(title, n) in titles"
                  :key="title"
                  class="mr-2 min-w-36"
                  @click="
                    () => {
                      activeContent == n
                        ? (activeContent = '')
                        : (activeContent = n);
                    }
                  "
                >
                  <NuxtLink
                    :to="'#' + title"
                    class="flex items-center gap-1 mb-1 group"
                  >
                    <Hashtag :active="activeContent == title" />
                    <h3>{{ title }}</h3>
                  </NuxtLink>
                </li>
              </ul>
              <ul
                class="flex flex-col items-end flex-wrap w-full lg:w-30 text-right"
              >
                <li v-for="social in socials" :key="social">
                  <NuxtLink :to="social.link" target="_blank">
                    <!-- <Icon :name="social.icon" class="text-3xl text-copper-950" /> -->
                    <h3 class="capitalize underline">
                      {{ social.name }}
                    </h3>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="h-32" />
          <div class="flex justify-between flex-wrap">
            <client-only>
              <p class="w-full md:w-1/2"><MDC :value="summary" /></p>
            </client-only>
            <div class="flex-1 flex justify-end items-end">
              <hashtag :active="true" :logo="true" />
              <!-- <div
                class="text-right w-fit bg-copper-100 rounded-lg px-4 py-2 text-md text-gray-800 hover:shadow-xl transition duration-300 cursor-pointer"
                @click="activeContent = 6"
              >
                <h5>Wanna talk?</h5>
              </div> -->
            </div>
          </div>
        </UCard>

        <Card
          v-if="mounted"
          class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-7"
          :content="experience"
          :active="activeContent == 0"
          :name="titles[0]"
        />

        <Card
          v-if="mounted"
          :content="skills"
          class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5"
          :active="activeContent == 1"
          :name="titles[1]"
        />
        <Card
          v-if="mounted"
          :content="projects"
          class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4"
          :active="activeContent == 2"
          :name="titles[2]"
        />
        <Card
          v-if="mounted"
          :content="education"
          class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5"
          :active="activeContent == 3"
          :name="titles[3]"
        />
        <Card
          v-if="mounted"
          class="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3"
          :active="activeContent == 4"
          :name="titles[4]"
        >
          <div class="flex flex-col justify-between h-full">
            <h5 class="text-4xl font-light">{{ lang.title }}</h5>
            <Placeholder class="py-8" />
            <ul>
              <li
                v-for="(x, n) in lang.points"
                :key="n"
                class="flex justify-between w-full"
              >
                <div class="font-semibold">{{ x.label }}</div>
                {{ x.value }}
              </li>
            </ul>
          </div>
        </Card>
        <Card
          v-if="mounted"
          :content="certificates"
          :active="activeContent == 5"
          :name="titles[5]"
          class="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-5"
        />
        <Card
          v-if="mounted"
          :active="activeContent == 6"
          :name="titles[6]"
          class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-7"
        >
          <Form-component
        /></Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  titles,
  socials,
  summary,
  experience,
  lang,
  skills,
  education,
  projects,
  certificates,
} from "../../content.js";

const activeContent = ref(null);
watch(
  () => activeContent.value,
  () => {
    setTimeout(() => {
      activeContent.value = null;
    }, 800);
  }
);

</script>

<style scoped></style>
