// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/i18n'
  ],
  css: [ '~/assets/main.css' ],
  i18n: {
    baseUrl: 'https://tny-robotics.com/',
    locales: [
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr-FR.ts' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en-US.ts' },
    ],
    defaultLocale: 'fr',
    strategy: 'no_prefix'
  },
  app: {
    head: {
      title: 'TNY Robotics',
      titleTemplate: 'TNY Robotics | %s',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    }
  }
})