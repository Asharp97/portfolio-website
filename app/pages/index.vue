<template>
  <div id="home">
    <div class="noise bg-[var(--overlay)] dark:bg-transparent" />
    <div class="bg-white dark:bg-dark-900 min-h-dvh text-black py-30">
      <Mouse-Follower
        :text="title"
        :x="mouse.x.value"
        :y="mouse.y.value"
        class="absolute z-20" />

      <header
        class="max-w-380 flex justify-between top-15 left-1/2 -translate-1/2 px-10 fixed w-full">
        <Transition name="rotate" mode="out-in">
          <button
            v-show="!switchingLocale"
            :class="bubbleClass"
            @click="switchLocale()">
            {{ locale == "en" ? "tr" : "en" }}
          </button>
        </Transition>
        <Transition name="rotate" mode="out-in">
          <button
            v-show="!switchingTheme"
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
      <!-- <pre class="text-white fixed z-199 bg-black">{{ distances }}</pre> -->
      <Transition name="switch">
        <div v-if="!switchingLocale" class="max-w-380 px-4 mx-auto">
          <!-- MAIN PARENT -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-3 w-full duration-500"
            :class="{ 'gap-0!': distances[0] == 12 }">
            <!-- HERO -->
            <div
              :ref="boxes[0]"
              class="col-span-1 group/outer sm:col-span-2 duration-500 md:col-span-6 lg:col-span-12 sticky top-3">
              <Card
                :class="[{ 'scale-90': distances[0] == 12 }]"
                class="card h-fit! duration-900"
                @click="hideMouse('Merhabalar👋', 'Hi👋')"
                @mouseenter="activateContent('Merhabalar 👋', 'Hi👋')"
                @hide-follower="activateContent()"
                @mouseleave="activateContent()">
                <Hero
                  :locale="locale"
                  :titles="content.titles"
                  :socials="content.socials"
                  :summary="content.summary" />
              </Card>
            </div>
            <!-- Experiences -->
            <div
              :ref="boxes[1]"
              class="col-span-1 group/outer sm:col-span-2 md:col-span-3 lg:col-span-7 sticky top-3">
              <Card
                :id="locale == 'en' ? `Experiences` : `Deneyimler`"
                :class="[{ 'scale-90': distances[1] == 12 }]"
                class="card"
                :content="content.experience"
                :active="activeContent == 0"
                delay="300ms"
                :name="content.titles[0]"
                @click="hideMouse('Deneyimler', 'Experiences')"
                @mouseenter="activateContent('Deneyimler', 'Experiences')"
                @hide-follower="activateContent()"
                @mouseleave="activateContent()" />
            </div>
            <!-- SKills -->
            <div
              :ref="boxes[2]"
              class="col-span-1 group/outer sm:col-span-2 md:col-span-3 lg:col-span-5 sticky top-3">
              <Card
                :id="locale == 'en' ? `Skills` : `Yetenekler`"
                :class="[{ 'scale-90': distances[2] == 12 }]"
                class="card"
                :content="content.skills"
                delay="400ms"
                :active="activeContent == 1"
                :name="content.titles[1]"
                @click="hideMouse('Yetenekler', 'Skills')"
                @mouseenter="activateContent('Yetenekler', 'Skills')"
                @hide-follower="activateContent()"
                @mouseleave="activateContent()" />
            </div>
            <!-- Side Projects -->
            <div
              :ref="boxes[3]"
              class="col-span-1 group/outer sm:col-span-2 md:col-span-3 lg:col-span-5 sticky top-3">
              <Card
                :id="locale == 'en' ? `Side-Projects` : `Projeler`"
                :class="[{ 'scale-90': distances[3] == 12 }]"
                class="card"
                :content="content.projects"
                delay="100ms"
                :active="activeContent == 2"
                :name="content.titles[2]"
                @click="hideMouse('Projeler', 'Side-Projects')"
                @mouseenter="activateContent('Projeler', 'Side-Projects')"
                @hide-follower="activateContent()"
                @mouseleave="activateContent()" />
            </div>
            <!-- Education -->
            <div
              :ref="boxes[4]"
              class="col-span-1 group/outer sm:col-span-2 md:col-span-3 lg:col-span-5 sticky top-3">
              <Card
                :id="locale == 'en' ? `Education` : `Eğitim`"
                :class="[{ 'scale-90': distances[4] == 12 }]"
                class="card"
                :content="content.education"
                delay="150ms"
                :active="activeContent == 3"
                :name="content.titles[3]"
                @click="hideMouse('Eğitim', 'Education')"
                @mouseenter="activateContent('Eğitim', 'Education')"
                @hide-follower="activateContent()"
                @mouseleave="activateContent()" />
            </div>
            <!-- Languages  -->
            <div
              :ref="boxes[5]"
              class="col-span-1 group/outer sm:col-span-2 md:col-span-2 lg:col-span-2 sticky top-3">
              <Card
                :id="locale == 'en' ? `Languages` : `Diller`"
                :class="[{ 'scale-90': distances[5] == 12 }]"
                class="card"
                delay="400ms"
                :active="activeContent == 4"
                :name="content.titles[4]"
                @click="hideMouse('Diller', 'Languages')"
                @mouseenter="activateContent('Diller', 'Languages')"
                @hide-follower="activateContent()"
                @mouseleave="activateContent()">
                <Langs :content="content.languages.points" />
              </Card>
            </div>
            <!-- Certificates -->
            <div
              :ref="boxes[6]"
              class="col-span-1 group/outer sm:col-span-2 md:col-span-4 lg:col-span-6 sticky top-3">
              <Card
                :id="locale == 'en' ? `Certificates` : `Sertifikalar`"
                :class="[{ 'scale-90': distances[6] == 12 }]"
                class="card"
                delay="400ms"
                :content="content.certificates"
                :active="activeContent == 5"
                :name="content.titles[5]"
                @click="hideMouse('Sertifikalar', 'Certificates')"
                @mouseenter="activateContent('Sertifikalar', 'Certificates')"
                @hide-follower="activateContent()"
                @mouseleave="activateContent()" />
            </div>
            <!-- Contact Form-->
            <div
              :ref="boxes[7]"
              class="col-span-1 group/outer sm:col-span-2 md:col-span-6 lg:col-span-6 sticky top-3">
              <Card
                id="form"
                class="card"
                :active="activeContent == 6"
                :name="content.titles[6]"
                @click="hideMouse('Çekinme!', `Don't Be Shy!`)"
                @mouseenter="activateContent('Çekinme!', `Don't Be Shy!`)"
                @hide-follower="activateContent()"
                @mouseleave="activateContent()">
                <Form-component :text="content.callMe" :locale="locale" />
              </Card>
            </div>
            <!-- Footer -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-6 lg:col-span-12 sticky top-3">
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

<script setup lang="ts">
import contentEn from "../static/content-en.js";
import contentTr from "../static/content-tr.js";
import { useMouse, useDark, useToggle } from "@vueuse/core";
import { useElementTop } from "../utils/useElementTop";
import { useScroll } from "motion-v";

const boxes = Array.from({ length: 8 }, () => ref<HTMLElement | null>(null));

const { distances } = useElementTop(boxes);

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

const title = ref("");
const activateContent = (tr: string = "", en: string = "") => {
  title.value = locale.value === "tr" ? tr : en;
};

const hideMouse = (tr: string = "", en: string = "") => {
  if (title.value) {
    title.value = "";
  } else {
    title.value = locale.value === "tr" ? tr : en;
  }
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
