<template>
  <div class="h-dvh flex justify-center items-center">
    <Noise />
    <h5
      class="text-[50rem] w-full h-full flex justify-center items-center font-black dark:text-gray-950 text-amber-50 absolute -z-10">
      404
    </h5>
    <div
      class="text-black dark:text-white flex justify-center gap-4 flex-col text-center">
      <h1>
        {{ $t("error.header") }}
      </h1>
      <p>
        {{ $t("error.text") }}
      </p>
      <NuxtLink
        :to="`/${locale == 'tr' ? 'tr' : ''}`"
        class="flex justify-center pointer-cursor">
        <UButton>
          <h2 class="uppercase">
            {{ $t("error.button") }}
          </h2>
        </UButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
</script>

<style lang="scss" scoped></style>
