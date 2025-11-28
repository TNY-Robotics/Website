<template>
    <div class="space-y-32 pb-64">

        <!-- TNY PROMO HEADER -->
        <div class="flex flex-col justify-center items-center space-y-4 pt-32 lg:pt-64 py-16 lg:py-48 px-16 bg-white dark:bg-slate-900 overflow-hidden relative inset-shadow">
            <div class="absolute top-0 left-0 w-full h-full bg-header-gradient"></div>
            <span class="absolute bg-slate-300 dark:bg-slate-600 shadow-xl w-12 lg:w-16 h-full right-0 bottom-0 translate-y-[30%] -translate-x-[200%] rotate-45"></span>
            <span class="absolute bg-slate-300 dark:bg-slate-600 shadow-xl w-16 lg:w-24 h-full right-0 bottom-0 translate-y-[30%]  translate-x-[50%] rotate-45"></span>
            <span class="absolute bg-primary-600 shadow-2xl w-32 lg:w-96 h-full left-0 bottom-0 scale-y-200 translate-x-[50%] rotate-45"></span>
            <span class="absolute bg-primary-600 shadow-2xl w-16 lg:w-32 h-full left-0 bottom-0 scale-y-200 -translate-x-[100%] rotate-45"></span>

            <TNYLogo class="w-32 lg:w-48 z-20 drop-shadow-lg drop-shadow-slate-800/30" />
            <p class="text-7xl lg:text-8xl font-extrabold z-20 drop-shadow-lg drop-shadow-slate-800/30 text-center">TNY Robotics</p>
            <p class="text-2xl font-semibold z-20 drop-shadow-lg drop-shadow-slate-800/30 text-center">Empowering curiosity. Unlocking capability.</p>
        </div>

        <!-- CONTENT -->
        <div class="flex flex-col lg:flex-row w-full h-fit pb-32">
            <div class="flex lg:w-1/2 justify-center items-center p-4 lg:p-8 max-w-128 lg:max-w-full">
                <img src="/tny-360.png" alt="TNY - 360 Picture" class="lg:w-2/3 drop-shadow-2xl drop-shadow-fuchsia-500/10 max-w-full">
            </div>
            <div class="flex lg:w-1/2 justify-center items-center p-4 lg:p-8">
                <div class="flex flex-col space-y-6 max-w-196 lg:max-w-2/3">
                    <div class="space-y-2">
                        <h1 class="text-4xl lg:text-6xl font-bold">
                            <RichText path="index.tny360.title" />
                        </h1>
                        <p class="text-2xl">
                            <RichText path="index.tny360.desc" />
                        </p>
                    </div>
                    <div>
                        <p class="text-md">
                            <RichText path="index.tny360.subdesc" />
                        </p>
                    </div>
                    <div class="pt-4">
                        <UButton :label="$t('index.tny360.button')" size="lg" trailing icon="i-lucide-arrow-right" href="/tny-360" />
                    </div>
                </div>
            </div>
        </div>
        <div class="relative flex flex-col justify-center space-y-16 w-full h-fit pb-48">
            <div class="absolute top-0 right-0 w-full h-full bg-slate-200 dark:bg-slate-900 -translate-y-16 -rotate-6 lg:-rotate-4 scale-y-110 scale-x-200"></div>

            <h2 class="subtitle text-center z-10 px-4">
                <RichText path="index.whytny360.title" />
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:flex xl:flex-row tems-center lg:justify-evenly z-10 mx-auto w-fit xl:w-full">
                <div class="max-w-64 bg-slate-50 dark:bg-slate-800 border-2 border-primary rounded-lg px-4 py-8 space-y-6 text-center shadow-lg overflow-hidden relative m-8">
                    <div class="absolute w-full h-full bg-gradient top-0 left-0"></div>
                    <UIcon name="i-lucide-zap" size="4em" class="text-primary" />
                    <h3 class="subsubtitle"> <RichText path="index.whytny360.perf.title" /> </h3>
                    <p class="text-md"> <RichText path="index.whytny360.perf.desc" /> </p>
                </div>
                <div class="max-w-64 bg-slate-50 dark:bg-slate-800 border-2 border-primary rounded-lg px-4 py-8 space-y-6 text-center shadow-lg overflow-hidden relative m-8">
                    <div class="absolute w-full h-full bg-gradient top-0 left-0"></div>
                    <UIcon name="i-lucide-earth" size="4em" class="text-primary" />
                    <h3 class="subsubtitle"> <RichText path="index.whytny360.open.title" /> </h3>
                    <p class="text-md"> <RichText path="index.whytny360.open.desc" /> </p>
                </div>
                <div class="max-w-64 bg-slate-50 dark:bg-slate-800 border-2 border-primary rounded-lg px-4 py-8 space-y-6 text-center shadow-lg overflow-hidden relative m-8">
                    <div class="absolute w-full h-full bg-gradient top-0 left-0"></div>
                    <UIcon name="i-lucide-book-open-text" size="4em" class="text-primary" />
                    <h3 class="subsubtitle"> <RichText path="index.whytny360.doc.title" /> </h3>
                    <p class="text-md"> <RichText path="index.whytny360.doc.desc" /> </p>
                </div>
                <div class="max-w-64 bg-slate-50 dark:bg-slate-800 border-2 border-primary rounded-lg px-4 py-8 space-y-6 text-center shadow-lg overflow-hidden relative m-8">
                    <div class="absolute w-full h-full bg-gradient top-0 left-0"></div>
                    <UIcon name="i-lucide-puzzle" size="4em" class="text-primary" />
                    <h3 class="subsubtitle"> <RichText path="index.whytny360.evolve.title" /> </h3>
                    <p class="text-md"> <RichText path="index.whytny360.evolve.desc" /> </p>
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-center space-y-16 w-full h-fit p-4">
            <h2 class="subtitle text-center"><RichText path="index.whoareyou.title" /></h2>
            <div class="flex flex-col lg:flex-row w-full justify-evenly items-center space-y-8 lg:space-y-0 lg:space-x-4">
                <div class="flex flex-col justify-center items-start max-w-128 border-2 border-slate-200 dark:border-slate-700 shadow-lg rounded-lg p-4 pt-8 lg:p-8 space-y-8">
                    <div class="flex justify-center items-center w-full space-x-4">
                        <h3 class="subsubtitle text-center"> <RichText path="index.whoareyou.passionate.title" /> </h3>
                        <UIcon name="i-lucide-heart" size="2em" class="text-primary" />
                    </div>
                    <p> <RichText path="index.whoareyou.passionate.desc" /> </p>
                    <UButton :label="t('index.whoareyou.passionate.button')" size="lg" trailing icon="i-lucide-arrow-right" />
                </div>
                <div class="flex flex-col justify-center items-start max-w-128 border-2 border-slate-200 dark:border-slate-700 shadow-lg rounded-lg p-4 pt-8 lg:p-8 space-y-8">
                    <div class="flex justify-center items-center w-full space-x-4">
                        <h3 class="subsubtitle text-center"> <RichText path="index.whoareyou.educator.title" /> </h3>
                        <UIcon name="i-lucide-microscope" size="2em" class="text-primary" />
                    </div>
                    <p> <RichText path="index.whoareyou.educator.desc" /> </p>
                    <UButton :label="t('index.whoareyou.educator.button')" size="lg" trailing icon="i-lucide-arrow-right" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import RichText from '~/components/RichText.vue';

const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title: t('index.name'),
    description: t('index.description'),
    ogTitle: t('index.name'),
    ogDescription: t('index.description'),
    ogUrl: 'https://tny-robotics.com' + route.path,
    ogImage: 'https://tny-robotics.com/icon-border.png',
    ogType: 'website',
    keywords: 'home, page, website, robot, robotics, furwaz, tny, 360, dog, education, kit, build, learn, coding, programming, arduino, esp32',
});
useHead(() => ({
    link: [ {rel: 'canonical', href: 'https://tny-robotics.com' + route.path}, ],
    htmlAttrs: { lang: locale.value }
}));

</script>

<style>
@import 'tailwindcss';

.inset-shadow {
    box-shadow: inset 0 0 50px rgba(74, 74, 107, 0.2);
}

.bg-gradient {
    background: radial-gradient(circle at 100% 100%, rgba(255, 0, 221, 0.02), transparent 60%), radial-gradient(circle at 50% 0%, rgba(255, 0, 221, 0.01), transparent 50%);
}
</style>