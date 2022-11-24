export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Hoe Snel Was Ik?",
      meta: [
        {
          name: "description",
          content: "HoeSnelWasIk Roei uitslagen van IRIS regatta tijdswaarneming",
        },
        { name: "theme-color", content: "#4285f4" },
      ],
      link: [{ rel: "icon", href: "/favicon.png" }],
    },
  },
  modules: ["@pinia/nuxt", "@vueuse/nuxt", "@nuxtjs/tailwindcss", "nuxt-icon"],
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      BASE_URL: "https://dev.hoesnelwasik.nl/api/",
    },
  },
});
