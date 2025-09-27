<template>
  <div>
    <ClientOnly>
      <Swiper
        class="h-full flex items-center"
        :allow-slide-next="swiperLock"
        :allow-slide-prev="swiperLock"
        @swiper="onSwiper">
        <Swiper-slide>
          <div class="flex flex-wrap gap-8 h-full">
            <div
              class="flex-1 rounded-lg text-md text-gray-800 dark:text-gray-50 transition duration-300">
              <p class="text-3xl font-light text-right">
                {{ $t("message.text") }}
              </p>
            </div>
            <UForm
              :state="state"
              class="space-y-4 w-full sm:w-1/2"
              @submit="onSubmit">
              <TransitionGroup name="list">
                <div :key="'email'">
                  <UFormField name="email">
                    <UInput
                      v-model="state.email"
                      :placeholder="t('placeholder.email')"
                      @blur="validate('email')" />
                  </UFormField>
                </div>
                <div
                  v-if="errorMsg['email']"
                  :key="'email-error'"
                  :class="errorClass">
                  {{ errorMsg["email"] }}
                </div>
                <div :key="'name'">
                  <UFormField name="name">
                    <UInput
                      v-model="state.name"
                      :placeholder="t('placeholder.name')"
                      @blur="validate('name')" />
                  </UFormField>
                </div>
                <div
                  v-if="errorMsg['name']"
                  :key="'name-error'"
                  :class="errorClass">
                  {{ errorMsg["name"] }}
                </div>
                <div :key="'msg'">
                  <UFormField name="msg">
                    <UTextarea
                      v-model="state.msg"
                      :placeholder="t('placeholder.message')"
                      @blur="validate('msg')" />
                  </UFormField>
                </div>
                <div
                  v-if="errorMsg['msg']"
                  :key="'msg-error'"
                  :class="errorClass">
                  {{ errorMsg["msg"] }}
                </div>
                <div :key="'submit'">
                  <UButton type="submit">
                    {{ $t("placeholder.button") }}
                  </UButton>
                </div>
              </TransitionGroup>
            </UForm>
          </div>
        </Swiper-slide>
        <Swiper-slide>
          <Feedback icon="eos-icons:three-dots-loading">
            {{ $t("message.Loading") }}
          </Feedback>
        </Swiper-slide>
        <Swiper-slide>
          <Feedback icon="line-md:confirm-circle-twotone">
            {{ $t("message.Success") }}
          </Feedback>
        </Swiper-slide>
        <Swiper-slide>
          <Feedback icon="material-symbols:error">
            {{ $t("message.Error") }}

            <UButton @click="goToSlide(1)">
              {{ $t("message.button") }}
            </UButton>
          </Feedback>
        </Swiper-slide>
      </Swiper>
    </ClientOnly>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { z } from "zod";
const { t } = useI18n();
const mail = useMail();

const state = reactive({
  email: "",
  name: "",
  msg: "",
});
const errorMsg = reactive({
  email: "",
  name: "",
  msg: "",
});
const schema = z.object({
  email: z.string().email({
    message: t("validation.email"),
  }),
  name: z.string().min(2, {
    message: t("validation.name_min", { min: 2 }),
  }),
  msg: z.string().min(10, {
    message: t("validation.msg_min", { min: 10 }),
  }),
});

const validate = async (field) => {
  const { success, error } = schema.shape[field].safeParse(state[field]);
  if (!success) {
    errorMsg[field] = error.issues[0].message;
    await wait(3000);
    errorMsg[field] = "";
  } else errorMsg[field] = "";

  return success;
};
const slider = ref(null);
const onSwiper = (swiper) => {
  slider.value = swiper;
};
const errorClass = "text-red-500 text-sm";

const swiperLock = ref(false);

const onSubmit = async () => {
  if (validate("email") && validate("name") && validate("msg")) {
    swiperLock.value = true;
    await mail.send({
      subject: `portofolio message from ${state.name}`,
      text: `FROM: ${state.email}/
        MESSAGE: ${state.msg}`,
    });
    await slider.value.slideTo(3); // Success slide
    swiperLock.value = false;
  }
};
async function goToSlide(x) {
  swiperLock.value = true;
  await slider.value.slideTo(x);
  swiperLock.value = false;
}
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 300ms cubic-bezier(0.55, 0, 0.1, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
.list-leave-active {
  position: absolute;
}
</style>
