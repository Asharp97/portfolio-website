const inputBaseSettings =
  "bg-copper-50! placeholder:text-gray-800 text-black! placeholder:font-light w-full";
const inputRootSettings = "w-full ";

export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: "copper",
      neutral: "stone",
    },
    card: {
      slots: {
        body: "w-full h-full",
      },
      variants: {
        variant: {
          solid: {
            root: "bg-inverted text-inverted bg-white text-black rounded-2xl overflow-clip flex items-center",
            base: "w-full ",
          },
        },
      },
      defaultVariants: {
        variant: "solid",
      },
    },
    input: {
      slots: {
        root: inputRootSettings,
        base: inputBaseSettings,
      },
      defaultVariants: {
        variant: "soft",
      },
    },
    textarea: {
      slots: {
        root: inputRootSettings,
        base: inputBaseSettings,
      },
      defaultVariants: {
        variant: "soft",
      },
    },
  },
});
