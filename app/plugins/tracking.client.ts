export default defineNuxtPlugin((nuxtApp) => {
    const router = nuxtApp.$router as import('vue-router').Router;
    
    router.afterEach(async (to, from) => {
        try {
            if (import.meta.dev) return

            const payload = {
                url: to.fullPath,
                name: to.name,
                referrer: document.referrer,
                timestamp: new Date().toISOString()
            }

            const API_HOST = import.meta.env.DEV ? 'http://localhost:8000' : 'https://api.tny-robotics.com';

            await $fetch(`${API_HOST}/track`, {
                method: 'POST',
                body: payload
            });
        } catch (error) {
            console.error('Erreur tracking:', error)
        }
    });
});
