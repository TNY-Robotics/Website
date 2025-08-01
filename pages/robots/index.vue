<template>
    <div class="flex grow flex-col">
        <div class="relative">
            <div id="particle-container" class="absolute w-full h-full overflow-hidden" />
            <div id="header-zone" class="py-32">
                <h1> {{ $t('robots.name') }} </h1>
                <p class="subtitle">{{ $t('robots.title') }}</p>
            </div>
        </div>
        <XHeader />
        <div class="flex flex-col h-fit w-full space-y-32 py-16">
            <div class="flex justify-center h-fit w-full">
                <div class="max-w-140 h-fit space-y-8 text-center">
                    <p> {{ $t('robots.intro.p1') }} </p>
                    <p> {{ $t('robots.intro.p2') }} </p>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row space-y-16 lg:space-y-0 grow h-fit">
                <div class="flex flex-col w-full lg:w-1/2 min-h-full h-fit justify-center items-center px-4">
                    <div class="flex flex-col items-start max-w-140 space-y-8 text-left">
                        <h2> {{ $t('robots.tny.title') }} </h2>
                        <p> {{ $t('robots.tny.p1') }} </p>
                        <p> {{ $t('robots.tny.p2') }} </p>
                        <UButton :label="t('robots.tny.more')" href="/robots/tny-360" />
                    </div>
                </div>
                <div class="flex justify-center items-center w-full lg:w-1/2 max-h-full px-4">
                    <img src="~/assets/img/tny360.png" alt="TNY-360 Robot" class="max-w-[80%] lg:max-w-[50%] max-h-full tny-img">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title: t('robots.title'),
    description: t('robots.description'),
    ogTitle: t('robots.title'),
    ogDescription: t('robots.description'),
    ogUrl: 'https://tny-robotics.com' + route.path,
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