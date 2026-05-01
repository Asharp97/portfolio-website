<template>
  <div
    :class="['noise', { loaded: mounted }]"
    class="bg-[var(--overlay)] dark:bg-transparent" />
</template>
<script setup>
const mounted = ref(false);
onMounted(() => {
  // Defer noise texture loading to not block FCP
  requestIdleCallback(
    () => {
      mounted.value = true;
    },
    { timeout: 1000 }
  );
});
</script>
<style>
.noise {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 100;
}

.noise::after {
  content: "";
  width: calc(100% + 20rem);
  height: calc(100% + 20rem);
  position: absolute;
  left: -10rem;
  top: -10rem;
  opacity: 0;
  will-change: transform;
  animation: noise 1s steps(2) infinite;
  transition: opacity 0.3s ease;
}

.noise.loaded::after {
  background-image: url(/img/noise.jpg);
  opacity: 0.08;
}
@keyframes noise {
  0% {
    transform: translate3d(0, 9rem, 0);
  }

  10% {
    transform: translate3d(-1rem, -4rem, 0);
  }
  20% {
    transform: translate3d(-8rem, 2rem, 0);
  }
  30% {
    transform: translate3d(9rem, -9rem, 0);
  }
  40% {
    transform: translate3d(-2rem, 7rem, 0);
  }
  50% {
    transform: translate3d(-9rem, -4rem, 0);
  }
  60% {
    transform: translate3d(2rem, 6rem, 0);
  }
  70% {
    transform: translate3d(7rem, -8rem, 0);
  }
  80% {
    transform: translate3d(-9rem, 1rem, 0);
  }
  90% {
    transform: translate3d(6rem, -5rem, 0);
  }
  100% {
    transform: translate3d(-7rem, 0, 0);
  }
}
</style>
