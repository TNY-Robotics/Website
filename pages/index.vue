<template>
    <div class="flex flex-col grow justify-center items-center">
        <div class="relative flex flex-col grow w-full h-screen border-b-2 border-slate-700 dark:border-slate-500 overflow-hidden">
            <div ref="headerBg" class="absolute top-0 left-0 w-full h-full overflow-hidden">
                <img src="~/assets/card.svg" class="drop-shadow-lg w-[20em] md:w-[40em] absolute bottom-[-10%] left-[-30%] md:bottom-[-15%] md:left-[5%]" alt="">
                <img src="~/assets/cpu.svg" class="drop-shadow-lg w-[15em] md:w-[30em] absolute top-[10%] right-[0%] md:top-[-5%] md:right-[10%]" alt="">
                <img src="~/assets/connector.svg" class="drop-shadow-lg w-[20em] md:w-[30em] absolute top-[-5%] left-[-30%] md:top-[-10%] md:left-[-10%] lg:top-[-10%] lg:left-[10%]" alt="">
                <img src="~/assets/connector.svg" class="drop-shadow-lg w-[20em] md:w-[30em] absolute top-[0%] left-[-45%] md:top-[-5%] md:left-[-20%] lg:top-[-5%] lg:left-[5%]" alt="">
                <img src="~/assets/connector.svg" class="drop-shadow-lg w-[20em] md:w-[30em] absolute top-[5%] left-[-60%] md:top-[0%] md:left-[-30%] lg:top-[0%] lg:left-[0%]" alt="">
                <img src="~/assets/connector.svg" class="scale-[-1] drop-shadow-lg w-[20em] md:w-[30em] absolute bottom-[-5%] right-[-40%] md:bottom-[-20%] md:right-[-10%] lg:bottom-[-20%] lg:right-[10%]" alt="">
                <img src="~/assets/connector.svg" class="scale-[-1] drop-shadow-lg w-[20em] md:w-[30em] absolute bottom-[0%] right-[-50%] md:bottom-[-15%] md:right-[-20%] lg:bottom-[-15%] lg:right-[5%]" alt="">
                <img src="~/assets/connector.svg" class="scale-[-1] drop-shadow-lg w-[20em] md:w-[30em] absolute bottom-[5%] right-[-60%] md:bottom-[-10%] md:right-[-30%] lg:bottom-[-10%] lg:right-[0%]" alt="">
            </div>
            <div class="flex flex-col grow justify-center items-center z-50">
                <h1 class="text-center drop-shadow-xl text-5xl md:text-6xl lg:text-8xl"> {{ $t('home.tny.title') }} </h1>
                <h2 class="text-center drop-shadow-xl"> {{ $t('home.tny.subtitle') }} </h2>
            </div>
        </div>
        <TNYHeader />
        <div class="flex flex-col grow w-full min-h-screen py-32 px-4">
            <div class="flex flex-col grow justify-center items-center space-y-32">
                <h2 class="text-center text-4xl mb-4"> {{ $t('home.about.title') }} </h2>
                <div class="flex flex-col w-full justify-between max-w-[80em] pb-32">
                    <div class="flex flex-col w-full h-fit p-2 max-w-[40em]">
                        <h3 class="text-primary"> {{ $t('home.about.subtitle') }} </h3>
                        <Text label="home.about.content" />
                    </div>
                </div>
                <h2 class="text-center text-4xl mb-4"> {{ $t('home.robots.title') }} </h2>
                <div class="flex flex-col w-full justify-between max-w-[80em] pb-32">
                    <div class="h-fit p-2 max-w-[40em]">
                        <h3 class="text-primary"> {{ $t('home.robots.tny360.title') }} </h3>
                        <Text label="home.robots.tny360.content" />
                        <div class="p-8">
                            <UButton to="/robots/tny-360" trailing icon="i-heroicons-chevron-right"> {{ t('home.robots.tny360.button') }} </UButton>
                        </div>
                    </div>
                    <div class="h-fit p-2 max-w-[40em]">
                        <!-- image -->
                    </div>
                </div>
                <h2 class="text-center text-4xl mb-4"> {{ $t('home.apps.title') }} </h2>
                <div class="flex flex-col w-full justify-between max-w-[80em] pb-32">
                    <div class="h-fit p-2 max-w-[40em]">
                        <h3 class="text-primary"> {{ $t('home.apps.blockEditor.title') }} </h3>
                        <Text label="home.apps.blockEditor.content" />
                        <div class="p-8">
                            <UButton to="/apps/block-editor" trailing icon="i-heroicons-chevron-right"> {{ $t('home.apps.blockEditor.button') }} </UButton>
                        </div>
                    </div>
                    <div class="h-fit p-2 max-w-[40em]">
                        <!-- image -->
                    </div>
                </div>
                <h2 class="text-center text-4xl mb-4"> {{ $t('home.learnMore.title') }} </h2>
                <div class="flex flex-col w-full justify-between max-w-[80em] pb-32">
                    <div class="h-fit p-2 max-w-[40em]">
                        <h3 class="text-primary"> {{ $t('home.learnMore.subtitle') }} </h3>
                        <Text label="home.learnMore.content" />
                        <div class="p-8">
                            <UButton to="https://docs.tny-robotics.com" trailing icon="i-heroicons-chevron-right"> {{ $t('home.learnMore.button') }} </UButton>
                        </div>
                    </div>
                    <div class="h-fit p-2 max-w-[40em]">
                        <!-- image -->
                    </div>
                </div>
                <div class="text-center h-fit p-2 max-w-[40em]">
                    <h3 class="text-primary"> {{ $t('home.contact.title') }} </h3>
                    <Text label="home.contact.content" />
                    <div class="p-8">
                        <UButton to="/contact" trailing icon="i-heroicons-chevron-right"> {{ $t('home.contact.button') }} </UButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <TNYFooter />
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title:`TNY Robotics | ${t('home.title')}`,
    description: t('home.description'),
    ogTitle:`TNY Robotics | ${t('home.title')}`,
    ogDescription: t('home.description'),
    ogUrl: 'https://tny-robotics.com',
    ogImage: 'https://tny-robotics.com/icon.png',
    ogType: 'website',
    keywords: 'home, page, website, robot, robotics, furwaz, tny, 360, sensors, actuators, learn, build',
});
useHead(() => ({
    link: [ {rel: 'canonical', href: 'https://tny-robotics.com' + route.path}, ],
    htmlAttrs: { lang: locale.value }
}));

const headerBg = ref<HTMLDivElement | null>(null);
onMounted(() => {
    if (!import.meta.client) return;

    window.addEventListener('scroll', () => {
        if (!headerBg.value) return;

        const scroll = window.scrollY;
        const height = headerBg.value.clientHeight;
        
        headerBg.value.style.transform = `translateY(${scroll / 2}px)`;
    });
});

console.log(t('home.robots.tny360.content'))
</script>