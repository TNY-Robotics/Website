import { visualizer } from 'rollup-plugin-visualizer';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxtjs/i18n'],
  css: [ '~/assets/main.css' ],
  features: {
    inlineStyles: true
  },
  vite: {
    build: {
      cssCodeSplit: true
    },
    plugins: [
      visualizer({
        filename: './stats.html',
        open: true,
        gzipSize: true
      })
    ],
  },
  ssr: true,
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
  fonts: {
    families: [
      { name: 'Poppins', weights: ['300', '400', '500', '700'], styles: ['normal', 'italic'] },
    ]
  },
  mdc: {
    highlight: {
      theme: {
        default: 'one-light',
        dark: 'one-dark-pro',
      },

      langs: [
        'js',
        'ts',
        'py',
        'cpp',
        'c',
        'json'
      ],      
      wrapperStyle: true 
    }
  },
})