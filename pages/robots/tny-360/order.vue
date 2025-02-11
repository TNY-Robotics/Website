<template>
    <div class="flex flex-col w-full h-fit">
        <div class="flex flex-col w-full h-fit justify-center items-center px-4 py-16 space-y-4">
            <h2 class="text-center text-primary"> {{ t('tny360.order.title') }} </h2>
            <h3 class="text-center"> {{ t('tny360.order.description') }} </h3>
        </div>
        <div class="flex flex-wrap md:p-8 justify-evenly items-center">
            <OrderCard class="max-w-[30em] m-4" :title="t('tny360.order.ready.title')" highlight
                :description1="t('tny360.order.ready.description1')"
                :description2="t('tny360.order.ready.description2')"
                :button="t('tny360.order.ready.button')"
                icon="i-heroicons-sparkles" />
            <OrderCard class="max-w-[30em] m-4" :title="t('tny360.order.assemble.title')"
                :description1="t('tny360.order.assemble.description1')"
                :description2="t('tny360.order.assemble.description2')"
                :button="t('tny360.order.assemble.button')"
                icon="i-heroicons-puzzle-piece" />
        </div>
        <div class="flex w-full h-fit justify-center items-center p-8">
            <UButton variant="link" color="gray" size="xl">
                {{ t('tny360.order.spare.name') }}
            </UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title:`TNY Robotics | ${t('tny360.order.title')}`,
    description: t('tny360.order.description'),
    ogTitle:`TNY Robotics | ${t('tny360.order.title')}`,
    ogDescription: t('tny360.order.description'),
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