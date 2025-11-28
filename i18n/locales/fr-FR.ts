export default defineI18nLocale(async (locale) => ({
    error: {
        title: 'Erreur {code} !',
        404: 'Page non trouvée',
        500: 'Erreur interne du serveur',
        unknown: 'Erreur inconnue'
    },
    main: {
        title: 'TNY Robotics',
        slogan: 'Stimuler la curiosité. Développer les capacités.'
    },
    language: {
        fr: 'Français',
        en: 'English'
    },
    theme: {
        auto: 'Auto',
        light: 'Clair',
        dark: 'Sombre'
    },
    footer: {reserved: 'Tous droits réservés'},
    docs: (await import('./fr-FR/docs')).default,
    index: (await import('./fr-FR/index')).default,
    tny360: (await import('./fr-FR/tny360')).default,
    education: (await import('./fr-FR/education')).default,
    software: (await import('./fr-FR/software')).default,
    about: (await import('./fr-FR/about')).default,
}));