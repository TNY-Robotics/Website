<template>
    <NuxtPage />
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