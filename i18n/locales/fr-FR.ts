export default defineI18nLocale(async (locale) => {
    return {
        error: {
            title: 'Erreur {code} !',
            404: 'Page non trouvée',
            500: 'Erreur interne du serveur',
            unknown: 'Erreur inconnue'
        },
        language: {
            fr: 'Français',
            en: 'Anglais'
        },
        theme: {
            auto: 'Auto',
            light: 'Clair',
            dark: 'Sombre'
        },
        verbs: (await import('./fr-FR/verbs')).default,
        home: (await import('./fr-FR/home')).default,
        about: (await import('./en-US/about')).default,
        apps: (await import('./fr-FR/apps')).default,
        robots: (await import('./fr-FR/robots')).default,
        docs: (await import('./fr-FR/docs')).default,
        tny360: (await import('./fr-FR/tny360')).default,
        blockEditor: (await import('./fr-FR/blockEditor')).default
    };
});