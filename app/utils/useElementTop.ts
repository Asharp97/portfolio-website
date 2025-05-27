export function useElementTop(elements: Ref<HTMLElement | null>[]) {
  const distances = ref<{ top: number; height: number }[]>([]);

  const updateDistances = () => {
    distances.value = elements.map((el) => {
      const rect = el.value
        ? el.value.getBoundingClientRect()
        : { top: 0, height: 0 };
      return { top: rect.top, height: rect.height };
    });
  };

  onMounted(() => {
    updateDistances();
    window.addEventListener("scroll", updateDistances);
    window.addEventListener("resize", updateDistances);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", updateDistances);
    window.removeEventListener("resize", updateDistances);
  });

  return { distances };
}
