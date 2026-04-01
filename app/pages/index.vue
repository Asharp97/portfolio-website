<template>
  <div id="home" ref="bod">
    <div class="bg-white dark:bg-dark-900 min-h-dvh text-black py-30">
      <LazyMouseFollower
        v-if="mounted"
        :enable-follower="enableFollower"
        :text="title"
        class="absolute z-20 hidden md:block" />

      <Transition name="go-down" appear>
        <header
          v-show="scroll < 50 && mounted"
          class="flex top-15 left-1/2 -translate-1/2 px-10 fixed w-full max-w-380 gap-2">
          <Transition name="rotate" mode="out-in">
            <button
              v-show="!switchingLocale"
              :class="bubbleClass"
              class="mr-auto"
              @click="switchLocale()">
              {{ locale == "en" ? "tr" : "en" }}
            </button>
          </Transition>
          <!-- cookie disclaimer -->
          <Transition name="go-up">
            <div
              v-if="showCookieDisclaimer"
              class="text-md text-gray-900 dark:text-gray-100 text-center px-2 bg-gray-100 dark:bg-slate-800 rounded-lg p-2 relative">
              🍪 {{ t("cookie.message") }}
              <div class="font-light text-sm">{{ t("cookie.subtitle") }}</div>
              <Icon
                name="ic:sharp-cancel"
                class="absolute -top-1 -right-2 text-lg hover:rotate-90 duration-300 hover:scale-110 cursor-pointer"
                @click="closeCookieDisclaimer()" />
            </div>
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
                :class="
                  title === '' || title === t('title.hero') ? '' : fadeBack
                "
                @click="enableFollower = !enableFollower"
                @mouseenter="activateContent('title.hero')"
                @mouseleave="activateContent()">
                <Hero
                  :locale="locale"
                  :titles="content.titles"
                  :summary="content.summary"
                  :is-mobile="isMobile" />
              </Card>
            </div>
            <!-- Experiences -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-3 lg:col-span-7">
              <Card
                :id="t('title.experiences')"
                class="card"
                :class="
                  title === '' || title === content.titles[0]
                    ? ''
                    : fadeBack
                "
                :content="content.experience"
                :delay="3 * delayCoeff + 'ms'"
                :name="content.titles[0]"
                @click="enableFollower = !enableFollower"
                @mouseenter="activateContent('title.experiences')"
                @mouseleave="activateContent()" />
            </div>
            <!-- SKills -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-3 lg:col-span-5">
              <Card
                :id="t('title.skills')"
                class="card"
                :class="
                  title === '' || title === content.titles[1]
                    ? ''
                    : fadeBack
                "
                :content="content.skills"
                :delay="4 * delayCoeff + 'ms'"
                :name="content.titles[1]"
                @click="enableFollower = !enableFollower"
                @mouseenter="activateContent('title.skills')"
                @mouseleave="activateContent()" />
            </div>
            <!-- Side Projects -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-3 lg:col-span-5 relative">
              <Card
                :id="t('title.projects')"
                class="card"
                :class="
                  title === '' || title === content.titles[2]
                    ? ''
                    : fadeBack
                "
                :content="content.projects"
                :delay="1 * delayCoeff + 'ms'"
                :name="content.titles[2]"
                @click="enableFollower = !enableFollower"
                @mouseenter="activateContent('title.projects')"
                @mouseleave="activateContent()" />
            </div>
            <!-- Education -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-3 lg:col-span-5 relative">
              <Card
                :id="t('title.education')"
                class="card"
                :class="
                  title === '' || title === content.titles[3]
                    ? ''
                    : fadeBack
                "
                :content="content.education"
                :delay="1 * delayCoeff + 'ms'"
                :name="content.titles[3]"
                @click="enableFollower = !enableFollower"
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
                :class="
                  title === '' || title === content.titles[4]
                    ? ''
                    : fadeBack
                "
                @click="enableFollower = !enableFollower"
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
                :class="
                  title === '' || title === content.titles[5]
                    ? ''
                    : fadeBack
                "
                :delay="4 * delayCoeff + 'ms'"
                :content="content.certificates"
                :name="content.titles[5]"
                @click="enableFollower = !enableFollower"
                @mouseenter="activateContent('title.certificates')"
                @mouseleave="activateContent()" />
            </div>
            <!-- Contact Form-->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-6 lg:col-span-6 relative">
              <Card
                id="form"
                class="card"
                :class="
                  title === '' || title === t('title.form') ? '' : fadeBack
                "
                :name="t('title.form')">
                <LazyFormComponent
                  @trigger-follower="enableFollower = !enableFollower"
                  @enable-tooltip="activateContent('title.form')"
                  @disable-tooltip="activateContent()" />
              </Card>
            </div>
            <!-- Footer -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-6 lg:col-span-12 relative">
              <Card class="card" :delay="5 * delayCoeff + 'ms'">
                <LazyFooterComponent :content="content.footer" />
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

// Dynamic SEO meta tags based on locale
useHead({
  title: computed(() =>
    locale.value === "tr"
      ? "Ali Elsayed | Makine Öğrenmesi & Full-Stack Yazılım Mühendisi"
      : "Ali Elsayed | Machine Learning & Full-Stack Software Engineer"
  ),
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
  meta: [
    {
      name: "description",
      content: computed(() =>
        locale.value === "tr"
          ? "4+ yıllık deneyime sahip Makine Öğrenmesi ve Full-Stack Yazılım Mühendisi. TensorFlow, Vue.js, React, NestJS ve Python konularında uzman. İstanbul'da akıllı ve ölçeklenebilir uygulamalar geliştiriyorum."
          : "Machine Learning & Full-Stack Software Engineer with 4+ years of experience. Specialized in TensorFlow, Vue.js, React, NestJS, and Python. Building smart, scalable applications in Istanbul."
      ),
    },
    {
      property: "og:locale",
      content: computed(() => (locale.value === "tr" ? "tr_TR" : "en_US")),
    },
  ],
});

const title = ref("");
const activateContent = async (key: string = "") => {
  title.value = key ? t(key) : "";
};
const enableFollower = ref(true);

const bubbleClass =
  "text-lg uppercase text-white hover:tracking-widest font-normal bg-copper-500 dark:bg-slate-500 flex justify-center items-center w-15 h-15 hover:translate-y-1 duration-300 rounded-full cursor-pointer";

const isMobile = ref(false);
const delayCoeff = computed(() => (isMobile.value ? 0 : 80));

const cookieDisclaimer = useCookie("cookie-disclaimer", {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
});
const showCookieDisclaimer = ref(false);

onMounted(() => {
  // Detect mobile for performance optimizations
  isMobile.value = window.innerWidth < 768;

  mounted.value = true;

  // Show cookie disclaimer immediately if not accepted
  if (cookieDisclaimer.value !== "accepted") {
    showCookieDisclaimer.value = true;
  }
});

const closeCookieDisclaimer = () => {
  cookieDisclaimer.value = "accepted";
  showCookieDisclaimer.value = false;
};
const fadeBack = 'opacity-60 scale-99 grayscale-25 blur-[2px] sepia-50';
</script>

<style>
.go-down-enter-active,
.go-down-leave-active {
  transition: all 1.4s var(--drift);
}
.go-up-leave-active,
.go-up-enter-active,
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

.go-down-leave-to,
.go-down-enter-from {
  transform: translateY(50px);
  opacity: 0;
  filter: blur(2px);
}
.go-up-leave-to,
.go-up-enter-from {
  transform: translateY(-50px);
  opacity: 0;
  filter: blur(2px);
}
</style>
