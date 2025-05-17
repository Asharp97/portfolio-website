<template>
  <div>
    <div class="noise bg-[var(--overlay)] dark:bg-transparent" />
    <div
      class="from-gray-50 to-white bg-radial-[at_50%_-50%] from-15% to-85% dark:from-slate-600 dark:to-gray-900 bg-repeat min-h-dvh text-black py-30">
      <Mouse-Follower
        :location="locationPercent"
        :text="title"
        :x="mouse.x.value"
        :y="mouse.y.value"
        class="absolute z-20" />

      <header
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
              :name="
                isDark
                  ? 'material-symbols:light-mode'
                  : 'material-symbols:dark-mode'
              " />
          </button>
        </Transition>
      </header>

      <Transition name="switch">
        <div v-if="!switchingLocale" class="max-w-380 px-4 mx-auto">
          <!-- MAIN PARENT -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-3 w-full">
            <!-- HERO -->
            <div class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-12">
              <Card class="card h-fit!">
                <Hero
                  :titles="content.titles"
                  :socials="content.socials"
                  :summary="content.summary" />
              </Card>
            </div>

            <!-- Experiences -->
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

            <!-- SKills -->
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

            <!-- Side Projects -->
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

            <!-- Education -->
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

            <!-- Languages  -->
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
                <Langs :content="content.languages.points" />
              </Card>
            </div>

            <!-- Certificates -->
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

            <!-- Contact Form-->
            <div class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-6">
              <Card
                ref="form"
                class="card"
                :active="activeContent == 6"
                :name="content.titles[6]"
                @mouseenter="activateContent(6)"
                @mouseleave="activateContent(null)">
                <Form-component :text="content.callMe" :locale="locale" />
              </Card>
            </div>

            <!-- Footer -->
            <div class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-12">
              <Card class="card" delay="900ms">
                <footer-component :content="content.footer" />
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
  "text-lg uppercase text-white hover:tracking-widest font-normal bg-copper-500 dark:bg-slate-500 flex justify-center items-center w-15 h-15 hover:translate-y-1 duration-300 rounded-full cursor-pointer";
</script>

<style>
.rotate-leave-active,
.switch-leave-active {
  transition: all 0.4s var(--drift);
}
.switch-enter-from .card,
.switch-leave-to .card {
  opacity: 0;
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
