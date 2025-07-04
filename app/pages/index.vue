<template>
  <div id="home" ref="bod">
    <div class="bg-white dark:bg-dark-900 min-h-dvh text-black py-30">
      <Mouse-Follower :text="title" class="absolute z-20 hidden md:block" />

      <Transition name="go-down" appear>
        <header
          v-show="scroll < 50 && mounted"
          class="flex top-15 left-1/2 -translate-1/2 px-10 fixed w-full max-w-380">
          <Transition name="rotate" mode="out-in">
            <button
              v-show="!switchingLocale"
              :class="bubbleClass"
              class="mr-auto"
              @click="switchLocale()">
              {{ locale == "en" ? "tr" : "en" }}
            </button>
          </Transition>
          <client-only>
            <Transition name="rotate" mode="out-in">
              <button
                v-show="!switchingTheme"
                :class="bubbleClass"
                class="ml-auto"
                @click="switchTheme()">
                <Icon
                  :name="
                    isDark
                      ? 'material-symbols:light-mode'
                      : 'material-symbols:dark-mode'
                  " />
              </button>
            </Transition>
          </client-only>
        </header>
      </Transition>

      <Transition name="switch">
        <div v-if="!switchingLocale" class="max-w-380 px-4 mx-auto">
          <!-- MAIN PARENT -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-3 w-full duration-500 relative">
            <!-- HERO -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-6 lg:col-span-12">
              <Card
                class="card h-fit!"
                @click="toggleMouse('title.hero')"
                @mouseenter="activateContent('title.hero')"
                @mouseleave="activateContent()">
                <Hero
                  :locale="locale"
                  :titles="content.titles"
                  :summary="content.summary" />
              </Card>
            </div>
            <!-- Experiences -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-3 lg:col-span-7">
              <Card
                :id="t('title.experiences')"
                class="card"
                :content="content.experience"
                :delay="3 * delayCoeff + 'ms'"
                :name="content.titles[0]"
                @click="toggleMouse('title.experiences')"
                @mouseenter="activateContent('title.experiences')"
                @mouseleave="activateContent()" />
            </div>
            <!-- SKills -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-3 lg:col-span-5">
              <Card
                :id="t('title.skills')"
                class="card"
                :content="content.skills"
                :delay="4 * delayCoeff + 'ms'"
                :name="content.titles[1]"
                @click="toggleMouse('title.skills')"
                @mouseenter="activateContent('title.skills')"
                @mouseleave="activateContent()" />
            </div>
            <!-- Side Projects -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-3 lg:col-span-5 relative">
              <Card
                :id="t('title.projects')"
                class="card"
                :content="content.projects"
                :delay="1 * delayCoeff + 'ms'"
                :name="content.titles[2]"
                @click="toggleMouse('title.projects')"
                @mouseenter="activateContent('title.projects')"
                @mouseleave="activateContent()" />
            </div>
            <!-- Education -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-3 lg:col-span-5 relative">
              <Card
                :id="t('title.education')"
                class="card"
                :content="content.education"
                :delay="1 * delayCoeff + 'ms'"
                :name="content.titles[3]"
                @click="toggleMouse('title.education')"
                @mouseenter="activateContent('title.education')"
                @mouseleave="activateContent()" />
            </div>
            <!-- Languages  -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-2 lg:col-span-2 relative">
              <Card
                :id="t('title.languages')"
                class="card"
                :delay="4 * delayCoeff + 'ms'"
                :name="content.titles[4]"
                @click="toggleMouse('title.languages')"
                @mouseenter="activateContent('title.languages')"
                @mouseleave="activateContent()">
                <Langs :content="content.languages.points" />
              </Card>
            </div>
            <!-- Certificates -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-4 lg:col-span-6 relative">
              <Card
                :id="t('title.certificates')"
                class="card"
                :delay="4 * delayCoeff + 'ms'"
                :content="content.certificates"
                :name="content.titles[5]"
                @click="toggleMouse('title.certificates')"
                @mouseenter="activateContent('title.certificates')"
                @mouseleave="activateContent()" />
            </div>
            <!-- Contact Form-->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-6 lg:col-span-6 relative">
              <Card
                id="form"
                class="card"
                :name="content.titles[6]"
                @click="toggleMouse('title.form')"
                @mouseenter="activateContent('title.form')"
                @mouseleave="activateContent()">
                <Form-component />
              </Card>
            </div>
            <!-- Footer -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-6 lg:col-span-12 relative">
              <Card class="card" :delay="5 * delayCoeff + 'ms'">
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
import contentEn from "../static/content-en.json";
import contentTr from "../static/content-tr.json";
import { useDark, useToggle } from "@vueuse/core";
import { useScroll } from "motion-v";

onMounted(() => {
  mounted.value = true;
});
const mounted = ref(false);

const switchingLocale = ref(false);
const switchingTheme = ref(false);

const isDark = useDark();
const toggleDark = useToggle(isDark);
const switchTheme = async () => {
  switchingTheme.value = true;
  await wait(100);
  toggleDark();
  switchingTheme.value = false;
};
const switchLocale = async () => {
  switchingLocale.value = true;
  await wait(100);
  await setLocale(locale.value == "en" ? "tr" : "en");
  switchingLocale.value = false;
};

const { scrollY } = useScroll();
const scroll = ref(0);
useMotionValueEvent(scrollY, "change", (latest) => {
  scroll.value = latest;
});

const { locale, setLocale, t } = useI18n();
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
const activateContent = async (key: string = "") => {
  title.value = key ? t(key) : "";
};

const toggleMouse = (key: string = "") => {
  title.value = title.value ? "" : t(key);
};

const bubbleClass =
  "text-lg uppercase text-white hover:tracking-widest font-normal bg-copper-500 dark:bg-slate-500 flex justify-center items-center w-15 h-15 hover:translate-y-1 duration-300 rounded-full cursor-pointer";

const delayCoeff = 80;
</script>

<style>
.go-down-enter-active,
.go-down-leave-active {
  transition: all 1.4s var(--drift);
}
.go-up-leave-active,
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
  opacity: 0;
  filter: blur(2px);
}

.go-up-leave-to {
  transform: translateY(-100px);
  rotate: 360deg;
  filter: blur(2px);
  width: fit-content;
  height: fit-content;
}

.go-down-leave-to,
.go-down-enter-from {
  transform: translateY(50px);
  opacity: 0;
  filter: blur(2px);
}
</style>
