export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('show-on-display', {

        created(el) {
            el.setAttribute('data-observe', '');
        },

        mounted(el) {
            const observer = new IntersectionObserver(
                (entries, observerInstance) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            el.classList.add('is-visible');
                            observerInstance.unobserve(el);
                        }
                    });
                },
                { threshold: 0.1 }
            );

            observer.observe(el);
        },

        getSSRProps() {
            return { 'data-observe': '' };
        }

    });
});