import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import flowbite from "flowbite-react/tailwind";

export default {
  content: ["./src/**/*.tsx", "./public/**/*.html", flowbite.content()],
  theme: {
    colors: {
      transparent: "transparent",

      primary: "rgb(42,30,92)",
      secondary: "rgb(38,166,154)",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },

  plugins: [flowbite.plugin()],
} satisfies Config;
