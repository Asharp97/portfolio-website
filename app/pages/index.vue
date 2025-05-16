<template>
  <div>
    <div class="noise" />
    <div
      class="from-gray-50 to-white bg-radial-[at_50%_-50%] from-15% to-85% dark:from-slate-600 dark:to-gray-900 bg-repeat min-h-dvh text-black py-30">
      <Mouse-Follower
        :location="locationPercent"
        :text="title"
        :x="mouse.x.value"
        :y="mouse.y.value"
        class="absolute z-20" />

      <nav
        class="max-w-380 flex justify-between top-15 left-1/2 -translate-1/2 px-10 fixed w-full">
        <Transition name="rotate" mode="out-in">
          <button
            v-show="!switchingLocale && scroll < 100"
            :class="bubbleClass"
            @click="switchLocale()">
            {{ locale == "en" ? "tr" : "en" }}
          </button>
        </Transition>
        <Transition name="rotate" mode="out-in">
          <button
            v-show="!switchingTheme && scroll < 100"
            :class="bubbleClass"
            @click="switchTheme()">
            <Icon
              class="translate-y-1"
              :name="
                isDark
                  ? 'material-symbols:light-mode'
                  : 'material-symbols:dark-mode'
              " />
          </button>
        </Transition>
      </nav>
      <Transition name="switch">
        <div v-if="!switchingLocale" class="max-w-380 px-4 mx-auto">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-1 w-full">
            <div class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-12">
              <Card class="card">
                <div class="flex justify-between flex-wrap gap-3">
                  <div class="flex-1">
                    <h1>Ali <span>Elsayed</span></h1>
                  </div>
                  <div
                    class="flex flex-1 justify-between flex-wrap gap-2 w-full">
                    <ul class="columns-2">
                      <li
                        v-for="(name, n) in content.titles"
                        :key="n"
                        class="mr-2 min-w-36"
                        @mouseleave="activeContent = null"
                        @mouseover="activeContent = n">
                        <div class="flex items-center gap-1 mb-1 group">
                          <Hashtag :active="activeContent == name" />
                          <h3>{{ name }}</h3>
                        </div>
                      </li>
                    </ul>
                    <ul
                      class="flex flex-col items-end flex-wrap w-full lg:w-20 text-right">
                      <li v-for="social in content.socials" :key="social">
                        <NuxtLink :to="social.link" skills="_blank">
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
                      @mouseover="activeContent = 6" />
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
                @mouseleave="activateContent(null)" />
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
                @mouseleave="activateContent(null)" />
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
                @mouseleave="activateContent(null)" />
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
                @mouseleave="activateContent(null)" />
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
                @mouseleave="activateContent(null)">
                <ul class="flex flex-col gap-6">
                  <li
                    v-for="(x, n) in content.languages.points"
                    :key="n"
                    class="flex flex-col gap-1">
                    <div class="text-2xl font-light">{{ x.label }}</div>
                    <div
                      class="bg-copper-200 dark:bg-slate-200 h-2 rounded-4xl w-9/12 ml-auto my-2">
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
                        class="bg-gradient-to-r from-copper-400 to-copper-600 dark:from-slate-700 dark:to-slate-400 h-full rounded-4xl" />
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
                @mouseleave="activateContent(null)" />
            </div>
            <div class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-6">
              <Card
                :ref="content.titles[6]"
                class="card"
                :active="activeContent == 6"
                :name="content.titles[6]"
                @click="hideMouse(6)"
                @mouseenter="activateContent(6)"
                @mouseleave="activateContent(null)">
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
import { useMouse, useDark, useToggle } from "@vueuse/core";
import { motion, useScroll } from "motion-v";

const switchingLocale = ref(false);
const switchingTheme = ref(false);

const isDark = useDark();
const toggleDark = useToggle(isDark);
const switchTheme = async () => {
  switchingTheme.value = true;
  await new Promise((resolve) => setTimeout(resolve, 200));
  toggleDark();
  switchingTheme.value = false;
};
const switchLocale = async () => {
  switchingLocale.value = true;
  await new Promise((resolve) => setTimeout(resolve, 200));
  await setLocale(locale.value == "en" ? "tr" : "en");
  switchingLocale.value = false;
};

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
const bubbleClass =
  "text-lg uppercase text-white hover:tracking-widest font-normal bg-copper-500 dark:bg-slate-500 p-3 px-3.5 hover:p-4.5 duration-300 rounded-full cursor-pointer";
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

.noise {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 100;
}

.noise::after {
  background-image: url(../../app/assets/img/noise.jpg);
  content: "";
  width: calc(100% + 20rem);
  height: calc(100% + 20rem);
  position: absolute;
  left: -10rem;
  top: -10rem;
  opacity: 0.08;
  will-change: transform;
  animation: noise 1s steps(2) infinite;
}
@keyframes noise {
  0% {
    transform: translate3d(0, 9rem, 0);
  }

  10% {
    transform: translate3d(-1rem, -4rem, 0);
  }
  20% {
    transform: translate3d(-8rem, 2rem, 0);
  }
  30% {
    transform: translate3d(9rem, -9rem, 0);
  }
  40% {
    transform: translate3d(-2rem, 7rem, 0);
  }
  50% {
    transform: translate3d(-9rem, -4rem, 0);
  }
  60% {
    transform: translate3d(2rem, 6rem, 0);
  }
  70% {
    transform: translate3d(7rem, -8rem, 0);
  }
  80% {
    transform: translate3d(-9rem, 1rem, 0);
  }
  90% {
    transform: translate3d(6rem, -5rem, 0);
  }
  100% {
    transform: translate3d(-7rem, 0, 0);
  }
}
</style>
