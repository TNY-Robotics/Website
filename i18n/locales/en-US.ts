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
    docs: (await import('./en-US/docs')).default,
    index: (await import('./en-US/index')).default,
    tny360: (await import('./en-US/tny360')).default,
    education: (await import('./en-US/education')).default,
    software: (await import('./en-US/software')).default,
    about: (await import('./en-US/about')).default,
}));