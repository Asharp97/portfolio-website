<template>
  <div>
    <div class="flex justify-between flex-wrap gap-3">
      <div class="flex-1">
        <h1>Ali <span>Elsayed</span></h1>
      </div>
      <div class="flex flex-1 justify-between flex-wrap gap-2 w-full">
        <nav>
          <ul class="columns-2">
            <li v-for="(name, n) in titles" :key="n" class="mr-2 min-w-36">
              <div class="flex items-center gap-1 mb-1 group">
                <Hashtag :active="activeContent == name" />
                <h3>{{ name }}</h3>
              </div>
            </li>
          </ul>
        </nav>

        <ul class="flex flex-col items-end flex-wrap w-full lg:w-20 text-right">
          <li v-for="social in socials" :key="social">
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
          <MDC :value="summary" />
        </p>
      </client-only>
      <div class="flex-1 flex justify-end items-end">
        <Hashtag :active="true" :logo="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["socials", "titles", "summary"]);
</script>

<style lang="scss" scoped></style>
