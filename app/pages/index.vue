<template>
  <div class="bg-copper-100 min-h-dvh py-32">
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-6">
        <UCard class="col-span-12">
          <div class="flex justify-between">
            <div class="flex-1">
              <h1>Ali <span>Elsayed</span></h1>
              <!-- <h2 class="font-semibold text-xl text-gray-600 capitalize">
                Machine learning & software engineer
              </h2> -->
            </div>
            <div class="flex flex-1 justify-between">
              <ul class="columns-2">
                <li v-for="title in titles" :key="title" class="mr-2 min-w-36">
                  <NuxtLink
                    :to="'#' + title"
                    class="flex items-center gap-1 mb-1 group">
                    <Hashtag />
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
            <p class="w-full md:w-1/2"><MDC :value="summary" /></p>
            <div class="flex-1 flex justify-end items-end">
              <ul>
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
              </ul>
            </div>
          </div>
        </UCard>
        <UCard class="col-span-7 overflow-clip">
          <div class="flex items-center gap-2 min-h-54">
            <div class="flex flex-col relative">
              <div v-for="(e, n) in experience" :key="n" class="">
                <Transition
                  :name="n < active_exp ? `slide-up` : `slide-down`"
                  mode="out-in">
                  <div v-show="n == active_exp" class="flex flex-col">
                    <div class="flex justify-between items-center">
                      <div>
                        <h5 class="text-4xl font-light">{{ e.title }}</h5>
                        <NuxtLink :to="e.link">
                          <h2>
                            {{ e.subtitle }}
                            <span v-if="e.link"
                              ><Icon
                                class="text-sm"
                                name="cuida:open-in-new-tab-outline"
                            /></span>
                          </h2>
                        </NuxtLink>
                      </div>
                      <div class="text-right">
                        <h6>{{ e.date }}</h6>
                        <h6 class="font-semibold">{{ e.location }}</h6>
                      </div>
                    </div>
                    <Placeholder class="h-16" />
                    <p><MDC :value="e.description" /></p>
                  </div>
                </Transition>
              </div>
            </div>
            <div class="w-fit flex flex-col gap-2">
              <div
                v-for="(e, n) in experience"
                :key="n"
                class="flex justify-center">
                <Hashtag :active="n == active_exp" @click="active_exp = n" />
              </div>
            </div>
          </div>
        </UCard>
        <UCard class="col-span-5">
          {{ skills }}
        </UCard>
        <UCard class="col-span-5">
          {{ projects }}
        </UCard>
        <UCard class="col-span-5">
          {{ education }}
        </UCard>
        <UCard class="col-span-2">
          {{ lang }}
        </UCard>
        <UCard class="col-span-8">
          {{ certificates }}
        </UCard>
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
const active_exp = ref(0);
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

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 700ms cubic-bezier(0, 1, 0.6, 1);
}
.slide-down-leave-active,
.slide-up-leave-active {
  position: absolute;
  opacity: 1;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(200px);
  /* opacity: 0; */
}

/* Appear from top or disappear to top */
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-200px);
  /* opacity: 0; */
}

/* Final visible state for all */
.slide-up-enter-to,
.slide-down-enter-to,
.slide-up-leave-from,
.slide-down-leave-from {
  transform: translateY(0);
  /* opacity: 1; */
}
</style>
