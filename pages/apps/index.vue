<template>
    <div class="flex flex-col p-2 py-4 space-y-32 min-h-screen">
        <div class="space-y-2">
            <h1 class="text-center"> {{ $t('apps.intro.title') }} </h1>
            <p class="text-center"> {{ $t('apps.intro.content') }} </p>
        </div>
        <div class="space-y-8">
            <h2 class="text-center"> {{ $t('apps.blockEditor.title') }} <span class="text-primary font-bold">Block Editor</span> ! </h2>
            <div class="flex justify-between max-w-[80em]">
                <div class="w-1/2 space-y-4">
                    <Text label="apps.blockEditor.content" />
                    <UButton to="/apps/block-editor" trailing icon="i-heroicons-chevron-right"> {{ $t('apps.blockEditor.button') }} </UButton>
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
    title:`TNY Robotics | ${t('apps.title')}`,
    description: t('apps.description'),
    ogTitle:`TNY Robotics | ${t('apps.title')}`,
    ogDescription: t('apps.description'),
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