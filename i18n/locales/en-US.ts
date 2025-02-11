export default defineI18nLocale(async (locale) => {
    return {
        error: {
            title: 'Error {code} !',
            404: 'Page not found',
            500: 'Internal server error',
            unknown: 'Unknown error'
        },
        language: {
            fr: 'French',
            en: 'English'
        },
        theme: {
            auto: 'Auto',
            light: 'Light',
            dark: 'Dark'
        },
        verbs: (await import('./en-US/verbs')).default,
        home: (await import('./en-US/home')).default,
        robots: (await import('./en-US/robots')).default,
        apps: (await import('./en-US/apps')).default,
        docs: (await import('./en-US/docs')).default,
        about: (await import('./en-US/about')).default,
        tny360: (await import('./en-US/tny360')).default,
        blockEditor: (await import('./en-US/blockEditor')).default
    };
});