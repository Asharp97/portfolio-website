<template>
  <div
    :class="[
      'border-2 duration-300 rounded-2xl',
      `col-span-${span}`,
      active ? `border-black` : 'border-transparent',
    ]">
    <UCard
      :class="active ? `scale-105` : ''"
      class="duration-300 origin-bottom-right">
      <div v-if="content" class="flex items-center gap-2 min-h-54">
        <div class="flex w-1/2 flex-1 h-54">
          <ClientOnly>
            <Swiper
              class="w-full"
              :module="Autoplay"
              direction="vertical"
              :space-between="50"
              :autoplay="{
                delay: 500,
                disableOnInteraction: true,
              }"
              @swiper="onSwiper"
              @slide-change="onSlideChange">
              <Swiper-slide v-for="(e, n) in content" :key="n">
                <div class="flex flex-col justify-between h-54">
                  <div class="flex justify-between items-center">
                    <div>
                      <h5 class="text-4xl font-light">{{ e.title }}</h5>
                      <NuxtLink :to="e.link">
                        <h2>
                          {{ e.subtitle }}
                          <span v-if="e.link"
                            ><Icon
                              class="text-sm"
                              name="cuida:open-in-new-tab-outline"
                          /></span>
                        </h2>
                      </NuxtLink>
                    </div>
                    <div class="text-right">
                      <h6>{{ e.date }}</h6>
                      <USeparator v-if="e.location" decorative="true" />
                      <h6 class="font-semibold">{{ e.location }}</h6>
                    </div>
                  </div>
                  <!-- <Placeholder class="h-16" /> -->
                  <p><MDC :value="e.description" /></p>
                  <ul class="points">
                    <li
                      v-for="x in e.points"
                      :key="x"
                      class="flex hover:bg-copper-100 duration-300 p-1">
                      <MDC :value="x.label" class="w-37 font-semibold" />
                      <MDC :value="x.value" class="flex-1" />
                    </li>
                  </ul>
                </div>
              </Swiper-slide>
            </Swiper>
          </ClientOnly>
        </div>
        <div v-if="content.length > 1" class="w-fit flex flex-col">
          <div
            v-for="n in content.length"
            :key="n"
            class="flex justify-center p-1 pointer-cursor"
            @click="paginationHandle(n - 1)">
            <Hashtag :active="n - 1 === pagination" />
          </div>
        </div>
      </div>
      <slot v-else />
    </UCard>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";

defineProps(["content", "span", "active"]);

const slider = ref(null);
let modules;
const onSwiper = (swiper) => {
  slider.value = swiper;
  modules = [Mousewheel, Autoplay];
};

const pagination = ref(0);

const onSlideChange = (e) => {
  pagination.value = e.activeIndex;
};
const paginationHandle = (e) => {
  pagination.value = e;
  slider.value.slideTo(e, 400);
};
// const modules = [Mousewheel, Autoplay];
</script>

<style scoped>
.points {
  list-style: disc;
}
</style>
