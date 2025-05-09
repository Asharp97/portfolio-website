<template>
  <Transition name="tada">
    <div
      v-show="mounted"
      :style="{ '--delay': delay }"
      :class="[
        'border-1 rounded-2xl duration-300 h-full ',
        active
          ? `border-copper-700 shadow-xl origin-left  `
          : 'border-transparent',
      ]">
      <UCard :id="`#${name}`" class="h-full duration-300 default-bg relative">
        <div
          v-if="content"
          class="flex flex-col sm:flex-row h-90 sm:h-full sm:items-center gap-2 w-full">
          <div
            :class="active ? `scale-103` : ''"
            class="flex sm:w-1/2 flex-1 lg:h-60 duration-300 w-full md:h-90 h-40">
            <ClientOnly>
              <Swiper
                :modules="[Autoplay]"
                :rewind="true"
                :breakpoints="{
                  '640': {
                    direction: 'horizontal',
                  },
                  '768': {
                    direction: 'vertical',
                  },
                }"
                :space-between="50"
                :speed="400"
                :mousewheel="true"
                :autoplay="{
                  delay: contentDelay,
                  disableOnInteraction: false,
                }"
                @swiper="onSwiper"
                @slide-change="onSlideChange">
                <Swiper-slide v-for="(e, n) in content" :key="n">
                  <div
                    class="flex flex-col justify-between h-full duration-500">
                    <div class="flex justify-between items-center">
                      <div>
                        <NuxtLink :to="e.titleLink">
                          <h5
                            class="text-2xl sm:text-4xl flex font-light group">
                            {{ e.title }}
                            <span v-if="e.titleLink"
                              ><Icon
                                class="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 duration-300"
                                name="cuida:open-in-new-tab-outline"
                            /></span>
                          </h5>
                        </NuxtLink>
                        <NuxtLink :to="e.subtitleLink">
                          <h2 class="group">
                            {{ e.subtitle }}
                            <span v-if="e.subtitleLink"
                              ><Icon
                                class="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 duration-300"
                                name="cuida:open-in-new-tab-outline"
                            /></span>
                          </h2>
                        </NuxtLink>
                      </div>
                      <div v-if="e.date || e.location" class="text-right">
                        <h6>{{ e.date }}</h6>
                        <USeparator v-if="e.location" decorative="true" />
                        <h6 class="font-semibold">{{ e.location }}</h6>
                      </div>
                    </div>
                    <p v-if="e.description"><MDC :value="e.description" /></p>
                    <ul v-if="e.points" class="points">
                      <li
                        v-for="x in e.points"
                        :key="x"
                        class="flex hover:bg-copper-100 duration-300 p-1 px-2">
                        <MDC :value="x.label" class="w-37 font-semibold" />
                        <MDC :value="x.value" class="flex-1" />
                      </li>
                    </ul>
                  </div>
                </Swiper-slide>
              </Swiper>
            </ClientOnly>
          </div>
          <div v-if="content.length > 1" class="w-fit flex md:flex-col">
            <div
              v-for="n in content.length"
              :key="n"
              class="flex justify-center p-1 pointer-cursor"
              @mouseover="paginationHandle(n - 1)"
              @click="paginationHandle(n - 1)">
              <Hashtag :active="n - 1 === pagination" />
            </div>
          </div>
        </div>
        <slot v-else class="flex items-center" />
      </UCard>
    </div>
  </Transition>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";

import getDelay from "../utils/getDelayByContent.js";

const emit = defineEmits(["hideFollower"]);

const slider = ref(null);

const onSwiper = (swiper) => {
  slider.value = swiper;
  slider.value.slideTo(props.content.length, 900);
};

const props = defineProps(["content", "active", "name", "delay"]);

const pagination = ref(0);
const contentDelay = ref();

const onSlideChange = async (e) => {
  pagination.value = e.activeIndex;

  const currentContent = props.content[e.activeIndex];
  contentDelay.value = getDelay(currentContent);
};

const paginationHandle = (e) => {
  pagination.value = e;
  if (slider.value) slider.value.slideTo(e);
  emit("hideFollower");
};

// const mounted = ref(true);
const mounted = ref(false);
onMounted(() => {
  setTimeout(() => {
    mounted.value = true;
  }, 400);
  setTimeout(() => {
    paginationHandle(0);
  }, 700);
});
</script>

<style scoped>
.points {
  list-style: disc;
}
.swiper-slide {
  transition: 300ms;
}
.swiper-slide-active {
  gap: 0;
}
.swiper-slide-next {
  gap: 2rem;
}
.swiper-slide-prev,
.swiper-slide-next {
  filter: blur(2px);
}
.tada-enter-active,
.tada {
  transition-delay: var(--delay);
}
</style>
