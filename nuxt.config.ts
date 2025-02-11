// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxt/ui', '@nuxtjs/i18n'],
    i18n: {
        locales: [
            {
                code: 'fr',
                file: 'fr-FR.ts'
            },
            {
                code: 'en',
                file: 'en-US.ts'
            }
        ],
        lazy: false,
        defaultLocale: 'en',
        strategy: 'no_prefix',
    },
})