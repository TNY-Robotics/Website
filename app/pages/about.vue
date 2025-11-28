<template>
  <div class="flex grow pt-24 px-4">
    Coming soon...
  </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title: t('about.title'),
    description: t('about.description'),
    ogTitle: t('about.title'),
    ogDescription: t('about.description'),
    ogUrl: 'https://tny-robotics.com' + route.path,
    ogImage: 'https://tny-robotics.com/icon-border.png',
    ogType: 'website',
    keywords: 'about, page, website, robot, robotics, furwaz, tny, 360, dog, education, kit, build, learn, coding, programming, arduino, esp32',
});
useHead(() => ({
    link: [ {rel: 'canonical', href: 'https://tny-robotics.com' + route.path}, ],
    htmlAttrs: { lang: locale.value }
}));
</script>

<style>

</style>