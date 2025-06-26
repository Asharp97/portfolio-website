<template>
  <div>
    <ClientOnly>
      <Swiper
        class="h-full flex items-center"
        :allow-slide-next="swiperLock"
        :allow-slide-prev="swiperLock"
        @swiper="onSwiper"
      >
        <Swiper-slide>
          <div class="flex flex-wrap gap-8 h-full">
            <div
              class="flex-1 rounded-lg text-md text-gray-800 dark:text-gray-50 transition duration-300"
            >
              <p class="text-3xl font-light text-right">
                {{ text }}
              </p>
            </div>
            <UForm
              :state="state"
              class="space-y-4 w-full sm:w-1/2"
              @submit="onSubmit"
            >
              <TransitionGroup name="list">
                <UFormField name="email">
                  <UInput
                    v-model="state.email"
                    :placeholder="locale == 'tr' ? 'Eposta' : 'Email'"
                    @blur="validate('email')"
                  />
                </UFormField>
                <div v-if="errorMsg['email']" :class="errorClass">
                  {{ errorMsg["email"] }}
                </div>
                <UFormField name="name">
                  <UInput
                    v-model="state.name"
                    :placeholder="locale == 'tr' ? 'Isim' : 'Name'"
                    @blur="validate('name')"
                  />
                </UFormField>
                <div v-if="errorMsg['name']" :class="errorClass">
                  {{ errorMsg["name"] }}
                </div>
                <UFormField name="msg">
                  <UTextarea
                    v-model="state.msg"
                    :placeholder="locale == 'tr' ? 'Mesaj' : 'Message'"
                    @blur="validate('msg')"
                  />
                </UFormField>
                <div v-if="errorMsg['msg']" :class="errorClass">
                  {{ errorMsg["msg"] }}
                </div>
                <UButton
                  type="submit"
                  class="text-white dark:bg-slate-700 dark:hover:bg-slate-500 duration-300 cursor-pointer"
                >
                  {{ locale == "tr" ? "Gönder" : "Send" }}
                </UButton>
              </TransitionGroup>
            </UForm>
          </div>
        </Swiper-slide>
        <Swiper-slide>
          <Feedback icon="eos-icons:three-dots-loading">
            {{
              locale === "tr"
                ? "Sizden haber almak için çok heyecanlıyım! Bir saniye lütfen..."
                : "I'm super excited to hear from you! Just give me a second..."
            }}
          </Feedback>
        </Swiper-slide>
        <Swiper-slide>
          <Feedback icon="line-md:confirm-circle-twotone">
            {{
              locale === "tr"
                ? "Mesajınızı aldım! Teşekkürler – en kısa sürede size geri döneceğim."
                : "Got your message! Thanks a lot – I'll get back to you as soon as I can."
            }}
          </Feedback>
        </Swiper-slide>
        <Swiper-slide>
          <Feedback icon="material-symbols:error">
            {{
              locale === "tr"
                ? "Aman! Bir şeyler yolunda gitmedi. İnternetine bir göz atıp tekrar denesene?"
                : "Uh-oh! Looks like something didn’t go through. Maybe check your internet and give it another shot?"
            }}
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
const supabase = useSupabaseClient();
const props = defineProps(["text", "locale"]);
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
    message:
      props.locale === "tr"
        ? "Geçerli bir e-posta adresi giriniz."
        : "Please enter a valid email address.",
  }),
  name: z.string().min(2, {
    message:
      props.locale === "tr"
        ? "İsim en az 2 karakter olmalıdır."
        : "Name must be at least 2 characters long.",
  }),
  msg: z.string().min(10, {
    message:
      props.locale === "tr"
        ? "Mesaj en az 10 karakter olmalıdır."
        : "Message must be at least 10 characters long.",
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
const send = async () => {
  return await supabase.from("contacts").insert(state);
};

const swiperLock = ref(false);

const onSubmit = async () => {
  if (validate("email") && validate("name") && validate("msg")) {
    swiperLock.value = true;
    await slider.value.slideTo(1);
    const { error } = await send();
    if (!error) {
      await slider.value.slideTo(2);
    } else await slider.value.slideTo(3);
    swiperLock.value = false;
  }
};
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
