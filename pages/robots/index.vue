<template>
    <div class="flex flex-col p-2 py-4 space-y-32 min-h-screen">
        <div class="space-y-2">
            <h1 class="text-center"> {{ $t('robots.intro.title') }} </h1>
            <p class="text-center"> {{ $t('robots.intro.content') }} </p>
        </div>
        <div class="space-y-8">
            <h2 class="text-center"> {{ $t('robots.tny360.title') }} <span class="text-primary font-bold">TNY - 360</span> ! </h2>
            <div class="flex justify-between max-w-[80em]">
                <div class="w-1/2 space-y-4">
                    <Text label="robots.tny360.content" />
                    <UButton to="/robots/tny-360" trailing icon="i-heroicons-chevron-right"> {{ $t('robots.tny360.button') }} </UButton>
                </div>
                <div class="w-1/2">
                    <!-- image -->
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title:`TNY Robotics | ${t('robots.title')}`,
    description: t('robots.description'),
    ogTitle:`TNY Robotics | ${t('robots.title')}`,
    ogDescription: t('robots.description'),
    ogUrl: 'https://tny-robotics.com',
    ogImage: 'https://tny-robotics.com/icon.png',
    ogType: 'website',
    keywords: 'home, page, website, robot, robotics, furwaz, tny, 360, sensors, actuators, learn, build',
});
useHead(() => ({
    link: [ {rel: 'canonical', href: 'https://tny-robotics.com' + route.path}, ],
    htmlAttrs: { lang: locale.value }
}));
</script>
