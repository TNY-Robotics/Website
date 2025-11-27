// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxtjs/i18n'],
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
      titleTemplate: '%s | TNY Robotics',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    }
  },
  // Configuration du parser Markdown (MDC) utilisé par Content v3
  mdc: {
    highlight: {
      theme: 'one-dark-pro',
      
      // Attention : Dans MDC/v3, la clé s'appelle souvent 'langs', pas 'preload'
      langs: [
        'js',
        'ts',
        'py',
        'cpp',
        'c',
        'json'
      ],
      
      // Optionnel : active les wrappers pour pouvoir styliser le nom du fichier etc.
      wrapperStyle: true 
    }
  },
})