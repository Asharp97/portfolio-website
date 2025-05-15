<template>
  <div>
    <div class="bg-copper-50 min-h-dvh py-22 text-black">
      <Mouse-Follower
        :location="locationPercent"
        :text="title"
        :x="mouse.x.value"
        :y="mouse.y.value"
        class="absolute z-20"
      />
      <Transition name="rotate" mode="out-in">
        <button
          v-if="!switching && scroll < 100"
          class="text-lg uppercase text-white hover:tracking-widest font-normal fixed top-2 right-2 bg-copper-500 p-4 hover:p-4.5 duration-300 rounded-full cursor-pointer"
          @click="switchLocale()"
        >
          {{ locale == "en" ? "tr" : "en" }}
        </button>
        <!-- <button @click="isDark = !isDark">{{ isDark }}</button> -->
      </Transition>
      <Transition name="switch">
        <div v-if="!switching" class="max-w-380 px-1 mx-auto">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-1 w-full"
          >
            <div class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-12">
              <Card class="card">
                <div class="flex justify-between flex-wrap gap-3">
                  <div class="flex-1">
                    <h1>Ali <span>Elsayed</span></h1>
                  </div>
                  <div
                    class="flex flex-1 justify-between flex-wrap gap-2 w-full"
                  >
                    <ul class="columns-2">
                      <li
                        v-for="(name, n) in content.titles"
                        :key="n"
                        class="mr-2 min-w-36"
                        @mouseleave="activeContent = null"
                        @mouseover="activeContent = n"
                      >
                        <div class="flex items-center gap-1 mb-1 group">
                          <Hashtag :active="activeContent == name" />
                          <h3>{{ name }}</h3>
                        </div>
                      </li>
                    </ul>
                    <ul
                      class="flex flex-col items-end flex-wrap w-full lg:w-20 text-right"
                    >
                      <li v-for="social in content.socials" :key="social">
                        <NuxtLink :to="social.link" skills="_blank">
                          <h3
                            class="capitalize underline hover:tracking-wider duration-300"
                          >
                            {{ social.name }}
                          </h3>
                        </NuxtLink>
                      </li>
                      <li>
                        <a
                          :href="`/ali-elsayed-resume-${locale}.pdf`"
                          skills="_blank"
                          rel="noopener noreferrer"
                        >
                          <h3
                            class="capitalize underline hover:tracking-wider duration-300"
                          >
                            Résumé
                          </h3>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="h-96" />
                <div class="flex justify-between items-end flex-wrap">
                  <client-only>
                    <p class="w-full md:w-1/2">
                      <MDC :value="content.summary" />
                    </p>
                  </client-only>
                  <div class="flex-1 flex justify-end items-end">
                    <Hashtag
                      :active="true"
                      :logo="true"
                      @mouseleave="activeContent = null"
                      @mouseover="activeContent = 6"
                    />
                  </div>
                </div>
              </Card>
            </div>
            <div class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-7">
              <Card
                ref="experience"
                class="card"
                :content="content.experience"
                :active="activeContent == 0"
                delay="300ms"
                :name="content.titles[0]"
                @click="hideMouse(0)"
                @mouseenter="activateContent(0)"
                @hide-follower="activateContent(null)"
                @mouseleave="activateContent(null)"
              />
            </div>
            <div class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5">
              <Card
                ref="skills"
                class="card"
                :content="content.skills"
                delay="400ms"
                :active="activeContent == 1"
                :name="content.titles[1]"
                @click="hideMouse(1)"
                @mouseenter="activateContent(1)"
                @hide-follower="activateContent(null)"
                @mouseleave="activateContent(null)"
              />
            </div>
            <div class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5">
              <Card
                ref="projects"
                class="card"
                :content="content.projects"
                delay="100ms"
                :active="activeContent == 2"
                :name="content.titles[2]"
                @click="hideMouse(2)"
                @mouseenter="activateContent(2)"
                @hide-follower="activateContent(null)"
                @mouseleave="activateContent(null)"
              />
            </div>
            <div class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5">
              <Card
                ref="education"
                class="card"
                :content="content.education"
                delay="150ms"
                :active="activeContent == 3"
                :name="content.titles[3]"
                @click="hideMouse(3)"
                @mouseenter="activateContent(3)"
                @hide-follower="activateContent(null)"
                @mouseleave="activateContent(null)"
              />
            </div>
            <div class="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2">
              <Card
                ref="languages"
                class="card"
                delay="400ms"
                :active="activeContent == 4"
                :name="content.titles[4]"
                @click="hideMouse(4)"
                @mouseenter="activateContent(4)"
                @mouseleave="activateContent(null)"
              >
                <ul class="flex flex-col gap-6">
                  <li
                    v-for="(x, n) in content.languages.points"
                    :key="n"
                    class="flex flex-col gap-1"
                  >
                    <div class="text-2xl font-light">{{ x.label }}</div>
                    <div
                      class="bg-copper-200 h-2 rounded-4xl w-9/12 ml-auto my-2"
                    >
                      <motion.div
                        :initial="{ width: 0 }"
                        :animate="{ width: `${x.value}%` }"
                        :transition="{
                          duration: 0.4,
                          delay: 0.9,
                          width: {
                            type: 'spring',
                            visualDuration: 0.9,
                            bounce: 1,
                            stiffness: 100,
                          },
                        }"
                        class="bg-gradient-to-r from-copper-400 to-copper-600 h-full rounded-4xl"
                      />
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
            <div class="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-6">
              <Card
                ref="certificates"
                class="card"
                delay="400ms"
                :content="content.certificates"
                :active="activeContent == 5"
                :name="content.titles[5]"
                @click="hideMouse(5)"
                @mouseenter="activateContent(5)"
                @hide-follower="activateContent(null)"
                @mouseleave="activateContent(null)"
              />
            </div>
            <div class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-6">
              <Card
                :ref="content.titles[6]"
                class="card"
                :active="activeContent == 6"
                :name="content.titles[6]"
                @click="hideMouse(6)"
                @mouseenter="activateContent(6)"
                @mouseleave="activateContent(null)"
              >
                <Form-component :text="content.callMe" :locale="locale" />
              </Card>
            </div>
            <div class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-12">
              <Card class="card" delay="900ms">
                <div class="flex justify-between text-md">
                  <div>
                    © {{ new Date().getFullYear() }} {{ content.footer[0] }}
                  </div>
                  <div class="text-right">
                    {{ content.footer[1] }}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import contentEn from "../static/content-en.js";
import contentTr from "../static/content-tr.js";
import { useMouse } from "@vueuse/core";
import { motion, useScroll } from "motion-v";

// const colorMode = useColorMode();
// const isDark = computed({
//   get() {
//     return colorMode.value === "dark";
//   },
//   set(_isDark) {
//     colorMode.preference = _isDark ? "dark" : "light";
//   },
// });
const { scrollY } = useScroll();
const scroll = ref(0);
useMotionValueEvent(scrollY, "change", (latest) => {
  scroll.value = latest;
});

const mouse = useMouse();

const { locale, setLocale } = useI18n();

const content = computed(() => {
  switch (locale.value) {
    case "tr":
      return contentTr;
    case "en":
    default:
      return contentEn;
  }
});

const title = ref(null);
const activateContent = (index) => {
  if (index != null) title.value = content.value.titles[index];
  else title.value = null;
};
const hideMouse = (index) => {
  if (title.value) title.value = null;
  else title.value = content.value.titles[index];
};

const activeContent = ref(null);

const switching = ref(false);
const switchLocale = async () => {
  switching.value = true;
  await new Promise((resolve) => setTimeout(resolve, 200));
  await setLocale(locale.value == "en" ? "tr" : "en");
  switching.value = false;
};
</script>
<style>
.rotate-leave-active,
.switch-leave-active {
  transition: all 0.4s var(--drift);
}
.switch-enter-from .card,
.switch-leave-to .card {
  opacity: 0;
  /* filter: blur(5px); */
  scale: 0.9;
}
.rotate-enter-from,
.rotate-leave-to {
  rotate: 360deg;
  opacity: 0.7;
  filter: blur(2px);
}
</style>
