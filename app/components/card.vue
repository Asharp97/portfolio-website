<template>
  <Transition name="tada" tag="div">
    <div
      v-show="mounted"
      :style="{ '--delay': delay }"
      class="rounded-2xl duration-300 h-full">
      <UCard
        :id="`#${name}`"
        class="h-full duration-300 default-bg relative rounded-none">
        <div
          v-if="content"
          class="flex flex-col sm:flex-row h-90 sm:h-full sm:items-center gap-2 w-full">
          <div
            class="flex sm:w-1/2 flex-1 lg:h-60 duration-300 w-full md:h-90 h-50">
            <ClientOnly>
              <Swiper
                class="w-full"
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
                :speed="swiperSpeed"
                :autoplay="{
                  delay: contentDelay,
                  disableOnInteraction: false,
                }"
                @swiper="onSwiper"
                @slide-change="onSlideChange">
                <Swiper-slide v-for="(e, n) in content" :key="n">
                  <div
                    class="flex flex-col justify-between h-full duration-500">
                    <div>
                      <div class="flex justify-between">
                        <div>
                          <NuxtLink :to="e.titleLink" target="_blank">
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
                          <NuxtLink :to="e.subtitleLink" target="_blank">
                            <h2
                              class="group text-copper-700 dark:text-gray-400">
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
                          <USeparator
                            v-if="e.location"
                            :decorative="true"
                            class="my-1"
                            color="secondry" />
                          <h6 class="font-light">{{ e.location }}</h6>
                        </div>
                      </div>

                      <div v-if="e.tags" class="flex flex-wrap gap-1 mt-0.5">
                        <div
                          v-for="(tag, j) in e.tags"
                          :key="j"
                          :class="j > 2 ? 'hidden md:block' : ''"
                          class="text-white dark:bg-slate-700 dark:hover:bg-slate-500 bg-copper-500 hover:bg-copper-700 duration-300 cursor-pointer p-1 rounded-lg">
                          {{ tag }}
                        </div>
                      </div>
                    </div>
                    <Mark-down v-if="e.description" :text="e.description" />
                    <ul v-if="e.points" class="points">
                      <li
                        v-for="x in e.points"
                        :key="x"
                        class="flex gap-2 hover:bg-copper-100 dark:hover:bg-slate-500 duration-300 p-1 px-2 rounded-xl">
                        <span class="w-37 font-semibold">{{ x.label }} </span>
                        <span class="flex-1">{{ x.value }}</span>
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
import "swiper/css/autoplay";

import getDelay from "../utils/getDelayByContent.js";

const slider = ref(null);

const onSwiper = (swiper) => {
  slider.value = swiper;
  slider.value.slideTo(props.content.length, 300);
};

const props = defineProps(["content", "name", "delay"]);

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
};

const mounted = ref(false);
const swiperSpeed = ref(800);
onMounted(async () => {
  swiperSpeed.value = 800;
  await wait(400);
  mounted.value = true;
  await wait(200);
  paginationHandle(0);
  swiperSpeed.value = 400;
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
