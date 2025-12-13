<template>
    <div class="flex flex-col grow pt-24 px-4 space-y-32">
        <div class="flex w-full h-fit justify-evenly items-center pt-32">
            <div class="flex p-8 bg-white dark:bg-slate-900 rounded-lg shadow-lg max-w-7xl">
                <div class="space-y-4 w-3/5">
                    <h2 class="text-4xl font-bold pb-8"> <RichText path="about.mission.title" /> </h2>
                    <p class="text-xl"> <RichText path="about.mission.description1" /> </p>
                    <p class="text-xl"> <RichText path="about.mission.description2" /> </p>
                </div>
                <div class="flex justify-center items-center w-2/5">
                    <TNYLogo class="w-32 lg:w-48 z-20 drop-shadow-lg drop-shadow-slate-800/30" />
                </div>
            </div>
        </div>
        <div class="flex flex-col w-full h-fit justify-evenly items-center pt-32 space-y-8">
            <div class="flex flex-col space-y-4 justify-center items-center ">
                <h2 class="text-4xl font-bold"> <RichText path="about.dna.title" /> </h2>
                <p class="text-xl"> <RichText path="about.dna.description" /> </p>
            </div>
            <div class="flex justify-evenly items-center h-fit">
                <div class="flex flex-col border-2 border-slate-200 dark:border-slate-700 shadow-lg rounded m-4 p-4 max-w-sm h-48 space-y-4">
                    <h3 class="text-2xl font-semibold text-center text-primary"><RichText path="about.dna.lego.title" /></h3>
                    <p class="flex grow justify-center items-center text-center"><RichText path="about.dna.lego.content" /></p>
                </div>
                <div class="flex flex-col border-2 border-slate-200 dark:border-slate-700 shadow-lg rounded m-4 p-4 max-w-sm h-48 space-y-4">
                    <h3 class="text-2xl font-semibold text-center text-primary"><RichText path="about.dna.open.title" /></h3>
                    <p class="flex grow justify-center items-center text-center"><RichText path="about.dna.open.content" /></p>
                </div>
                <div class="flex flex-col border-2 border-slate-200 dark:border-slate-700 shadow-lg rounded m-4 p-4 max-w-sm h-48 space-y-4">
                    <h3 class="text-2xl font-semibold text-center text-primary"><RichText path="about.dna.durable.title" /></h3>
                    <p class="flex grow justify-center items-center text-center"><RichText path="about.dna.durable.content" /></p>
                </div>
            </div>
        </div>
        <div class="flex w-full justify-evenly items-center pt-32 pb-32">
            <div class="flex flex-col w-fit space-y-8 max-w-3xl">
                <h2 class="text-4xl font-bold"> <RichText path="about.founder.title" /> </h2>
                <p class="text-xl"> <RichText path="about.founder.description" /> </p>
            </div>
            <div class="flex w-fit">
                <div class="flex flex-col w-64">
                    <img src="~/assets/img/moi.png" alt="Paul LOISIL" class="drop-shadow-2xl mx-8">
                    <div class="z-20 flex w-full rounded-lg bg-white dark:bg-slate-900 shadow-xl h-fit p-4 justify-center items-center">
                        <p class="text-xl"> <RichText path="about.founder.name" /> </p>
                    </div>
                </div>
            </div>
        </div>
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
    link: [{ rel: 'canonical', href: 'https://tny-robotics.com' + route.path },],
    htmlAttrs: { lang: locale.value }
}));
</script>

<style></style>