<template>
    <TNYHeader />
    <div class="flex flex-col grow justify-center items-center min-h-screen">
        <h2 class="text-center text-4xl mb-4"> {{ $t('home.about.title') }} </h2>
        <div class="flex flex-col w-full justify-between max-w-[80em] pb-32">
            <div class="flex flex-col w-full h-fit p-2 max-w-[40em]">
                <h3 class="text-primary"> {{ $t('home.about.subtitle') }} </h3>
                <Text label="home.about.content" />
            </div>
        </div>
    </div>
    <TNYFooter />
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title:`TNY Robotics | ${t('about.title')}`,
    description: t('about.description'),
    ogTitle:`TNY Robotics | ${t('about.title')}`,
    ogDescription: t('about.description'),
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