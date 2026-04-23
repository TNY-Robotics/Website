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
                <img src="/tny-360.png" alt="TNY - 360 Picture" class="lg:w-2/3 drop-shadow-2xl drop-shadow-fuchsia-500/5 max-w-full">
            </div>
            <div class="flex lg:w-1/2 justify-center items-center p-4 lg:p-8">
                <div class="flex flex-col space-y-6 max-w-196 lg:max-w-2/3">
                    <h2 class="subtitle">
                        <RichText path="index.tny360.title" />
                    </h2>
                    <p class="text-xl">
                        <RichText path="index.tny360.desc" />
                    </p>
                    <div class="pt-4">
                        <UButton :label="$t('index.tny360.button')" size="lg" trailing icon="i-lucide-arrow-right" href="/tny-360" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-center space-y-16 w-full h-fit p-4 py-16">
            <h2 class="subtitle text-center px-4"><RichText path="index.os.title" /></h2>
            <div class="flex flex-col lg:flex-row justify-center items-center lg:mx-32">
                <div class="lg:w-1/2">
                    <p class="text-xl text-elft max-w-2xl">
                        <RichText path="index.os.desc" />
                        <a class="link" href="https://components.espressif.com/components?q=namespace:tny-robotics" target="_blank">Official Component Registry</a>.
                    </p>
                </div>
                <div class="lg:w-1/2">
                    <img src="https://developer.espressif.com/blog/2024/10/what-is-the-esp-registry/assets/cm_logo.webp" class="lg:ml-auto w-2/3" alt="Official Component Registry Logo">
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-center space-y-16 w-full h-fit p-4">
            <div class="relative flex w-full h-128">
                <NuxtLink to="https://www.instagram.com/furwaz_" target="_blank">
                    <div class="absolute flex flex-col items-center top-[60%] md:left-[24%] -rotate-15 drop-shadow-2xl drop-shadow-primary scale-100 hover:scale-110 transition-transform">
                        <UIcon name="mdi:instagram" size="7em" class="text-primary" />
                        <RichText path="index.follow.instagram.title" class="text-primary font-bold" />
                    </div>
                </NuxtLink>
                <NuxtLink to="https://www.tiktok.com/@furwaz_" target="_blank">
                    <div class="absolute flex flex-col items-center top-[20%] md:left-[37%] -rotate-6 drop-shadow-2xl drop-shadow-primary scale-100 hover:scale-110 transition-transform">
                        <UIcon name="ic:baseline-tiktok" size="7em" class="text-primary" />
                        <RichText path="index.follow.tiktok.title" class="text-primary font-bold" />
                    </div>
                </NuxtLink>
                <NuxtLink to="https://discord.gg/XGABkx5A4y" target="_blank">
                    <div class="absolute flex flex-col items-center top-[16%] left-[55%] rotate-8 drop-shadow-2xl drop-shadow-primary scale-100 hover:scale-110 transition-transform">
                        <UIcon name="ic:baseline-discord" size="7em" class="text-primary" />
                        <RichText path="index.follow.discord.title" class="text-primary font-bold" />
                    </div>
                </NuxtLink>
                <NuxtLink to="https://www.youtube.com/@furwaz" target="_blank">
                    <div class="absolute flex flex-col items-center top-[70%] left-[69%] rotate-27 drop-shadow-2xl drop-shadow-primary scale-100 hover:scale-110 transition-transform">
                        <UIcon name="mdi:youtube" size="7em" class="text-primary" />
                        <RichText path="index.follow.youtube.title" class="text-primary font-bold" />
                    </div>
                </NuxtLink>
            </div>
            <h2 class="subtitle text-center xl:-translate-y-50 pointer-events-none"><RichText path="index.follow.title" /></h2>
        </div>
    </div>
</template>

<script lang="ts" setup>
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

.drop-shadow-primary {
    filter: drop-shadow(0 4px 20px rgba(249, 76, 255, 0.418));
}
</style>