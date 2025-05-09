<template>
  <div class="flex justify-around flex-wrap gap-4">
    <div
      class="flex-1 rounded-lg px-4 py-2 text-md text-gray-800 transition duration-300">
      <p class="text-3xl font-light text-right">
        {{ text }}
      </p>
    </div>

    <UForm :state="state" class="space-y-4 w-full sm:w-1/2" @submit="onSubmit">
      <UFormField name="email">
        <UInput
          v-model="state.email"
          :placeholder="locale == 'tr' ? 'Eposta' : 'Email'" />
      </UFormField>
      <UFormField name="email">
        <UInput
          v-model="state.name"
          :placeholder="locale == 'tr' ? 'Isim' : 'Name'" />
      </UFormField>
      <UFormField name="Message">
        <UTextarea
          v-model="state.msg"
          :placeholder="locale == 'tr' ? 'Mesaj' : 'Message'" />
      </UFormField>
      <UButton type="submit" class="text-white cursor-pointer" @click="send">
        {{ locale == "tr" ? "Gönder" : "Send" }}
      </UButton>
    </UForm>
  </div>
</template>

<script setup>
defineProps(["text", "locale"]);
const state = reactive({
  email: "",
  name: "",
  msg: "",
});

</script>

<style lang="scss" scoped></style>
