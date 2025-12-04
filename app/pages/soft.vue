<template>
    <div class="flex grow pt-24 px-2 lg:px-4 pb-32">
        <div class="flex flex-col flex-col-reverse lg:flex-row space-x-8 w-full h-fit">
            <div class="flex lg:w-1/2 justify-center items-center lg:p-4">
                <div class="space-y-8 w-fit h-fit">
                    <h1 class="text-5xl font-extrabold">
                        <RichText path="software.coder.title" />
                    </h1>
                    <p class="text-2xl font-semibold">
                        <RichText path="software.coder.subtitle" />
                    </p>
                    <p class="text-lg">
                        <RichText path="software.coder.description" />
                    </p>
                    <UButton disabled size="xl" :label="t('software.coder.button')" trailing icon="i-lucide-chevron-right" />
                </div>
            </div>
            <div class="flex lg:w-1/2 justify-center items-center lg:p-24 py-16">
                <img src="~/assets/img/TNY-Coder Preview-Dark.png" alt="TNY-Coder preview" class="hidden dark:flex tny-coder-preview drop-shadow-2xl drop-shadow-slate-900/50 border-4 border-white dark:border-slate-700 rounded-lg"/>
                <img src="~/assets/img/TNY-Coder Preview-Light.png" alt="TNY-Coder preview" class="flex dark:hidden tny-coder-preview drop-shadow-2xl drop-shadow-slate-900/50 border-4 border-slate-600 dark:border-slate-700 rounded-lg"/>
            </div>
        </div>
        <div>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title: t('software.title'),
    description: t('software.description'),
    ogTitle: t('software.title'),
    ogDescription: t('software.description'),
    ogUrl: 'https://tny-robotics.com' + route.path,
    ogImage: 'https://tny-robotics.com/icon-border.png',
    ogType: 'website',
    keywords: 'software, application, page, website, robot, robotics, furwaz, tny, 360, dog, education, kit, build, learn, coding, programming, arduino, esp32',
});
useHead(() => ({
    link: [{ rel: 'canonical', href: 'https://tny-robotics.com' + route.path },],
    htmlAttrs: { lang: locale.value }
}));
</script>

<style>
.tny-coder-preview {
    transform: perspective(800px) rotateY(-25deg) rotateX(10deg) translateX(-4%);
}
</style>