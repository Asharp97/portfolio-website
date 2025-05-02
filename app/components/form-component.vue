<template>
  <div class="flex justify-around flex-wrap gap-4">
    <div
      class="flex-1 rounded-lg px-4 py-2 text-md text-gray-800 hover:shadow-xl transition duration-300"
    >
      <p class="text-3xl font-light text-right">
        I'm always happy to connect, brainstorm, or even chat!
      </p>
    </div>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 w-full sm:w-1/2"
      @submit="onSubmit"
    >
      <UFormField name="email">
        <UInput v-model="state.email" placeholder="Email" />
      </UFormField>
      <UFormField name="email">
        <UInput v-model="state.name" placeholder="Name" />
      </UFormField>
      <UFormField name="Message">
        <UTextarea v-model="state.msg" placeholder="Message" />
      </UFormField>
      <UButton type="submit" class="text-white"> Submit </UButton>
    </UForm>
  </div>
</template>

<script setup>
const state = reactive({
  email: "",
  name: "",
  msg: "",
});
</script>

<style lang="scss" scoped></style>
