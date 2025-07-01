const inputBaseSettings =
  "bg-white! dark:bg-slate-200! placeholder:text-gray-800 text-black! placeholder:font-light w-full";
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
        body: "w-full",
      },
      variants: {
        variant: {
          solid: {
            root: "bg-inverted text-inverted bg-gray-100 dark:bg-dark-500 dark:text-white text-black rounded-2xl flex items-center group-hover/outer:scale-99 root",
            base: "w-full",
          },
        },
      },
      defaultVariants: {
        variant: "solid",
      },
    },
    button: {
      slots: {
        base: "dark:bg-slate-500 dark:hover:bg-slate-700 bg-copper-500 text-white! cursor-pointer duration-300",
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
