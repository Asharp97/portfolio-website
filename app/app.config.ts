const inputSettings = "bg-white! placeholder:text-copper-900 w-full";
const inputRootSettings = "w-full";
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
    input: {
      slots: {
        root: [inputRootSettings],
        base: [inputSettings],
      },
      defaultVariants: {
        variant: "soft",
      },
    },
    textarea: {
      slots: {
        root: [inputRootSettings],
        base: [inputSettings],
      },
      defaultVariants: {
        variant: "soft",
      },
    },
  },
});
