export function useElementTop(elements: Ref<HTMLElement | null>[]) {
  const distances = ref<number[]>([]);

  const updateDistances = () => {
    distances.value = elements.map((el) =>
      el.value ? el.value.getBoundingClientRect().top : 0
    );
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
