<template>
  <div class="bg-copper-100 min-h-dvh py-32">
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-1">
        <UCard class="col-span-12 shadow-sm">
          <div class="flex justify-between">
            <div class="flex-1">
              <h1>Ali <span>Elsayed</span></h1>
              <h2 class="font-semibold text-xl text-gray-600">
                But you can call me A Sharp
              </h2>
            </div>
            <div class="flex flex-1 justify-between">
              <ul class="columns-2">
                <li
                  v-for="title in titles"
                  :key="title"
                  class="mr-2 min-w-36"
                  @click="
                    () => {
                      activeContent == title
                        ? (activeContent = '')
                        : (activeContent = title);
                    }
                  ">
                  <NuxtLink
                    :to="'#' + title"
                    class="flex items-center gap-1 mb-1 group">
                    <Hashtag :active="activeContent == title" />
                    <h3>{{ title }}</h3>
                  </NuxtLink>
                </li>
              </ul>
              <ul class="text-right">
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
              <!-- <ul>
                <li v-for="x in personal" :key="x">
                  <NuxtLink
                    :to="x.link ? x.link : `javascript:;`"
                    class="flex items-center gap-1 text-lg">
                    <span>
                      <Icon :name="x.icon" class="translate-y-0.5" />
                    </span>
                    <h4>{{ x.name }}</h4>
                  </NuxtLink>
                </li>
              </ul> -->
              <div
                class="text-right bg-copper-100 rounded-lg px-4 py-2 text-md text-gray-800 hover:shadow-xl transition duration-300 cursor-pointer">
                <p>
                  <!-- Let's talk, always happy to connect, share ideas, or just
                  chat. -->
                </p>
                <h5>Wanna talk?</h5>
              </div>
            </div>
          </div>
        </UCard>

        <Card
          :content="experience"
          :span="7"
          :active="activeContent == 'Experiences'" />
        <Card :content="skills" :span="5" :active="activeContent == 'Skills'" />
        <Card
          :content="projects"
          :span="5"
          :active="activeContent == 'Side Projects'" />
        <Card
          :content="education"
          :span="5"
          :active="activeContent == 'Education'" />
        <Card
          :content="lang"
          :span="2"
          :active="activeContent == 'Languages'" />
        <Card :content="certificates" :span="5" />
        <Card :span="7"> <Form-component /></Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  experience,
  lang,
  skills,
  education,
  projects,
  certificates,
} from "../../content.js";

const activeContent = ref("");
watch(
  () => activeContent.value,
  () => {
    setTimeout(() => {
      activeContent.value = "";
    }, 3000);
  }
);
const titles = [
  "Skills",
  "Certificates",
  "Experiences",
  "Side Projects",
  "Education",
  "Languages",
];
const socials = [
  {
    name: "github",
    link: "https://github.com/Asharp97",
    icon: "mdi:github",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/ali-elsayed-25974b130/",
    icon: "mdi:linkedin",
  },
];
const summary =
  "**Machine Learning** & **Full-Stack Software Engineer** with a background in Computer Engineering. Experienced in building smart, scalable apps using **Vertex AI**, **TensorFlow**, **BigQuery**, **Vue.js**, **Node.js**, and **Python**—blending AI with clean, high-performance code for real-world impact.";
const personal = [
  {
    name: "İstanbul · Türkiye",
    icon: "mdi:map-marker",
  },
  {
    name: "Ali-Hisham@hotmail.com",
    icon: "mdi:email",
    link: "mailto:ali-hisham@hotmail.com",
  },
];
</script>

<style scoped></style>
