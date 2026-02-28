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
    disclaimer: {
        title: 'Hey !',
        content: 'Ce site est actuellement [bd](en cours de développement). Certaines fonctionnalités peuvent ne pas être disponibles ou fonctionner de manière incorrecte.\nN\'hésitez pas à nous faire part de vos commentaires ou à signaler tout problème via notre page GitHub ou notre email de contact.\nMerci de votre compréhension et de votre patience pendant que nous travaillons à l\'amélioration du site !',
    },
    newsletter: {
        name: 'Se préinscrire',
        title: 'Rejoindre la liste d\'attente',
        content: 'Inscrivez-vous à notre liste d\'attente pour être informé de la sortie officielle du [hl](TNY - 360) !\nEn vous inscrivant, vous recevrez des mises à jour exclusives, des offres spéciales et la possibilité de précommander le robot avant son lancement public.',
        emailPlaceholder: 'Votre adresse e-mail',
        success: {
            title: 'Inscription réussie !',
            content: 'Merci de vous être inscrit à notre liste d\'attente. Nous vous enverrons bientôt des nouvelles !',
        },
        error: {
            title: 'Woops ! Une erreur est survenue.',
            content: 'Désolé, nous n\'avons pas pu traiter votre inscription. Veuillez réessayer plus tard.',
        },
        already: {
            title: 'Vous êtes déjà inscrit !',
            content: 'Il semble que cette adresse e-mail soit déjà inscrite à la liste d\'attente. Pas besoin de s\'inscrire à nouveau !',
        },
    },
    qr: {
        invalid: {
            title: 'QR Code invalide',
            content: 'Désolé, il semble que le QR code que vous avez scanné soit invalide ou expiré.\nMais vous pouvez toujours visiter notre documentation pour plus d\'informations !',
        },
        redirect: {
            title: 'Redirection...',
            content: 'Vous allez être redirigé vers la documentation correspondante.',
        },
        msg: {
            title: 'Attendez un peu, ce n\'est pas encore là !',
            content: 'Notre TNY-360 est [hl](encore en développement), donc ce QR Code n\'est pas encore actif.\nMais vous pouvez toujours [hl](rejoindre la liste d\'attente) pour être informé lorsqu\'il sera prêt !',
            learnMore: 'En savoir plus sur le TNY-360'
        }
    },
    footer: (await import('./fr-FR/footer')).default,
    docs: (await import('./fr-FR/docs')).default,
    index: (await import('./fr-FR/index')).default,
    tny360: (await import('./fr-FR/tny360')).default,
    education: (await import('./fr-FR/education')).default,
    software: (await import('./fr-FR/software')).default,
    about: (await import('./fr-FR/about')).default,
}));