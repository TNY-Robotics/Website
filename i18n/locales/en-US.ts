export default defineI18nLocale(async (locale) => ({
    error: {
        title: 'Error {code} !',
        404: 'Page not found',
        500: 'Internal server error',
        unknown: 'Unknown error'
    },
    main: {
        title: 'TNY Robotics',
        slogan: 'Empowering curiosity. Unlocking capability.'
    },
    language: {
        fr: 'Français',
        en: 'English'
    },
    theme: {
        auto: 'Auto',
        light: 'Light',
        dark: 'Dark'
    },
    footer: {reserved: 'All rights reserved'},
    docs: { name: 'Documentation' },
    index: (await import('./en-US/index')).default,
    robots: (await import('./en-US/robots')).default,
    apps: (await import('./en-US/apps')).default,
    about: (await import('./en-US/about')).default,
    tny360: (await import('./en-US/tny360')).default,
}));