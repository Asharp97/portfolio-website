<template>
  <div class="bg-copper-100 min-h-dvh py-32">
    <button
      class="text-lg uppercase text-black hover:text-white hover:tracking-widest font-normal fixed top-2 right-2 hover:bg-copper-500 p-4 hover:p-4.5 duration-300 rounded-full cursor-pointer"
      @click="setLocale(locale == 'en' ? 'tr' : 'en')">
      {{ locale == "en" ? "tr" : "en" }}
    </button>
    <div class="max-w-400 px-1 mx-auto">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-1 w-full">
        <div class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-12">
          <Card class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-12">
            <div class="flex justify-between flex-wrap gap-3">
              <div class="flex-1">
                <h1>Ali <span>Elsayed</span></h1>
              </div>
              <div class="flex flex-1 justify-between flex-wrap gap-2 w-full">
                <ul class="columns-2">
                  <li
                    v-for="(title, n) in content.titles"
                    :key="title"
                    class="mr-2 min-w-36"
                    @mouseleave="activeContent = null"
                    @mouseover="activeContent = n">
                    <NuxtLink
                      :to="'#' + title"
                      class="flex items-center gap-1 mb-1 group">
                      <Hashtag :active="activeContent == title" />
                      <h3>{{ title }}</h3>
                    </NuxtLink>
                  </li>
                </ul>
                <ul
                  class="flex flex-col items-end flex-wrap w-full lg:w-20 text-right">
                  <li v-for="social in content.socials" :key="social">
                    <NuxtLink :to="social.link" target="_blank">
                      <!-- <Icon :name="social.icon" class="text-3xl text-copper-950" /> -->
                      <h3 class="capitalize underline">
                        {{ social.name }}
                      </h3>
                    </NuxtLink>
                  </li>
                  <li>
                    <a
                      :href="`/ali-elsayed-resume-${locale}.pdf`"
                      target="_blank"
                      rel="noopener noreferrer">
                      <h3 class="capitalize underline">Résumé</h3>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="h-12" />
            <div class="flex justify-between items-end flex-wrap">
              <client-only>
                <p class="w-full md:w-1/2"><MDC :value="content.summary" /></p>
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
            :content="content.experience"
            :active="activeContent == 0"
            delay="300ms"
            :name="content.titles[0]" />
        </div>

        <div class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5">
          <Card
            :content="content.skills"
            delay="400ms"
            :active="activeContent == 1"
            :name="content.titles[1]" />
        </div>

        <div class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5">
          <Card
            :content="content.projects"
            delay="100ms"
            :active="activeContent == 2"
            :name="content.titles[2]" />
        </div>
        <div class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5">
          <Card
            :content="content.education"
            delay="150ms"
            :active="activeContent == 3"
            :name="content.titles[3]" />
        </div>

        <div class="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2">
          <Card
            delay="400ms"
            :active="activeContent == 4"
            :name="content.titles[4]">
            <ul>
              <li
                v-for="(x, n) in content.languages.points"
                :key="n"
                class="flex flex-col gap-1">
                <div class="text-xl">{{ x.label }}</div>
                <div class="text-xl text-right">{{ x.value }}</div>
              </li>
            </ul>
          </Card>
        </div>

        <div class="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-6">
          <Card
            delay="400ms"
            :content="content.certificates"
            :active="activeContent == 5"
            :name="content.titles[5]" />
        </div>

        <div class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-6">
          <Card :active="activeContent == 6" :name="content.titles[6]">
            <Form-component :text="content.callMe" :locale="locale" />
          </Card>
        </div>

        <div class="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-12">
          <Card delay="900ms">
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
  </div>
</template>

<script setup>
import contentEn from "../../content-en.js";
import contentTr from "../../content-tr.js";

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

const activeContent = ref(null);
</script>
