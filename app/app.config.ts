export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: "copper",
      neutral: "stone",
    },
    card: {
      variants: {
        variant: {
          solid: {
            root: "bg-inverted text-inverted bg-copper-50 text-black rounded-2xl overflow-clip",
          },
        },
      },
      defaultVariants: {
        variant: "solid",
      },
    },
  },
});
