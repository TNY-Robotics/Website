export default defineNuxtPlugin((nuxtApp) => {
    const router = nuxtApp.$router as import('vue-router').Router;
    
    router.afterEach(async (to, from) => {
        try {
            // Optionnel : ignorer la requête si on est en développement
            // if (import.meta.dev) return

            // Préparation des données
            const payload = {
                url: to.fullPath,
                name: to.name,
                referrer: document.referrer, // Dispo car on est côté client
                timestamp: new Date().toISOString()
            }

            const API_HOST = import.meta.env.DEV ? 'http://localhost:8000' : 'https://api.tny-robotics.com';

            // Envoi de la requête de manière non-bloquante
            // On utilise $fetch qui est natif à Nuxt 3
            await $fetch(`${API_HOST}/track`, {
                method: 'POST',
                body: payload
            });
        } catch (error) {
            // On log l'erreur mais on ne bloque pas l'expérience utilisateur
            console.error('Erreur tracking:', error)
        }
    });
});
