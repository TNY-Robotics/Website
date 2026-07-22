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
    disclaimer: {
        title: 'Hey!',
        content: 'This site is currently [bd](under development). Some features may not be available or may not work correctly.\nFeel free to share your feedback or report any issues via our GitHub page or contact email.\nThank you for your understanding and patience as we work to improve the site!',
    },
    newsletter: {
        name: 'Join Waitlist',
        title: 'Join the waitlist',
        content: 'A second drop of our [hl](TNY-360) is coming soon!\nBe among the first to receive it by signing up for our waitlist.',
        emailPlaceholder: 'Your email address',
        success: {
            title: 'Registration successful!',
            content: 'Thank you for signing up for our waitlist. We will send you updates soon!',
        },
        error: {
            title: 'Woops! An error occurred.',
            content: 'Sorry, we couldn\'t process your registration. Please try again later.',
        },
        already: {
            title: 'You are already registered!',
            content: 'It seems this email address is already on the waitlist. No need to sign up again!',
        },
        release: {
            title: 'Estimated Release Date',
            date: 'End of July 2026',
        },
        downtime: 'Sorry, waitlist registration is temporarily disabled.\nCome back later to join it!'
    },
    qr: {
        invalid: {
            title: 'Invalid QR Code',
            content: 'Sorry, it seems the QR code you scanned is invalid or expired.\nBut you can still visit our documentation for more information!',
        },
        redirect: {
            title: 'Redirecting...',
            content: 'You will be redirected to the corresponding documentation.',
        }
    },
    footer: (await import('./en-US/footer')).default,
    docs: (await import('./en-US/docs')).default,
    index: (await import('./en-US/index')).default,
    tny360: (await import('./en-US/tny360')).default,
    education: (await import('./en-US/education')).default,
    software: (await import('./en-US/software')).default,
    about: (await import('./en-US/about')).default,
}));