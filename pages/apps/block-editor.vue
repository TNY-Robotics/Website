<template>
    <div class="min-h-screen">
        <div class="py-32">
            <h1 class="text-center text-5xl md:text-6xl lg:text-7xl"> {{ $t('blockEditor.name') }} </h1>
            <p class="text-center text-xl md:text-2xl"> {{ $t('blockEditor.title') }} </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title:`TNY Robotics | ${t('blockEditor.title')}`,
    description: t('blockEditor.description'),
    ogTitle:`TNY Robotics | ${t('blockEditor.title')}`,
    ogDescription: t('blockEditor.description'),
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

<style></style>