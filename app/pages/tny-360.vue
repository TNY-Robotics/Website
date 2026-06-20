<template>
    <div class="space-y-32 pb-32">
        <header class="relative flex w-full h-fit pt-8 bg-white dark:bg-slate-900 overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-full bg-header-gradient">
                <img src="/tny-360/header.webp" alt="TNY-360" class="object-cover w-full h-full" />
            </div>
            <div class="flex flex-col w-full space-y-4 justify-center items-center lg:items-start py-32 lg:py-48 z-20 px-4 lg:px-24">
                <h1 class="show-up whitespace-nowrap text-5xl lg:text-7xl font-extrabold text-center lg:text-start text-white">
                    <RichText path="tny360.header.title" />
                </h1>
                <p class="show-up delay-200 text-xl lg:text-4xl text-center lg:text-start text-white max-w-192">
                    <RichText path="tny360.header.desc" />
                </p>
                <div class="show-up delay-400 pt-8">
                    <UButton :label="$t('tny360.header.button')" size="xl" @click="openModal()" />
                </div>
            </div>
        </header>

        <section class="show-up w-full px-2 lg:px-8 m-auto pt-32 space-y-16" v-show-on-display>
            <h2 class="subtitle"> <RichText path="tny360.readable.title" /> </h2>
            <div class="flex flex-col lg:flex-row justify-center items-center lg:space-x-8">
                <div class="relative flex flex-col w-full lg:w-1/2 justify-start items-center p-4 lg:p-16 h-fit mb-auto">
                    <div class="flex flex-col z-20 justify-center items-center space-y-4">
                        <h3 class="subsubtitle"> <RichText path="tny360.readable.ing.title" /> </h3>
                        <p class="lg:text-lg"> <RichText path="tny360.readable.ing.p1" /> </p>
                        <p class="lg:text-lg"> <RichText path="tny360.readable.ing.p2" /> </p>
                    </div>
                    <div class="w-full lg:w-2/3 h-fit z-10 bottom-0 left-0 flex justify-center">
                        <SmartVideo src="/tny-360/pcbs-dark.mp4" poster="/tny-360/pcbs-dark.webp" v-if="darkMode" />
                        <SmartVideo src="/tny-360/pcbs-light.mp4" poster="/tny-360/pcbs-light.webp" v-else />
                    </div>
                </div>
                <div class="relative flex flex-col w-full lg:w-1/2 justify-start items-center p-4 lg:p-16 h-fit mb-auto">
                    <div class="flex flex-col z-20 justify-center items-center space-y-4">
                        <h3 class="subsubtitle"> <RichText path="tny360.readable.doc.title" /> </h3>
                        <p class="lg:text-lg"> <RichText path="tny360.readable.doc.p1" /> </p>
                        <p class="lg:text-lg"> <RichText path="tny360.readable.doc.p2" /> </p>
                    </div>
                    <div class="w-full h-fit z-10 bottom-0 left-0 flex justify-center">
                        <SmartVideo src="/tny-360/doc-dark.mp4" poster="/tny-360/doc-dark.webp" v-if="darkMode" />
                        <SmartVideo src="/tny-360/doc-light.mp4" poster="/tny-360/doc-light.webp" v-else />
                    </div>
                </div>
            </div>
        </section>

        <section class="show-up w-full m-auto pt-64" v-show-on-display>
            <h2 class="subtitle text-center py-16 px-2"> <RichText path="tny360.dev.title" /> </h2>
            <div class="relative w-full flex h-128">
                <div class="absolute top-0 right-0 w-full h-full z-10">
                    <SmartVideo src="/tny-360/open-dark.mp4" poster="/tny-360/open-dark.webp" v-if="darkMode" />
                    <SmartVideo src="/tny-360/open-light.mp4" poster="/tny-360/open-light.webp" v-else />
                </div>
                <div class="show-right flex w-full flex-col justify-center gradient-dark-left z-20" v-show-on-display>
                    <div class="w-full lg:w-1/2 space-y-4 px-4 lg:px-16">
                    <h3 class="subsubtitle"> <RichText path="tny360.dev.open.title" /> </h3>
                    <p class="lg:text-lg"> <RichText path="tny360.dev.open.p1" />
                        <a href="https://github.com/tny-robotics" target="_blank" class="text-primary-400 hover:underline pl-1"> <RichText path="tny360.dev.open.link" /> </a>.
                    </p>
                    <p class="lg:text-lg"> <RichText path="tny360.dev.open.p2" /> </p>
                    </div>
                </div>
            </div>
            <div class="relative w-full flex h-128">
                <div class="absolute top-0 left-0 w-full h-full z-10">
                    <SmartVideo src="/tny-360/clips-dark.mp4" poster="/tny-360/clips-dark.webp" v-if="darkMode" />
                    <SmartVideo src="/tny-360/clips-light.mp4" poster="/tny-360/clips-light.webp" v-else />
                </div>
                <div class="show-left flex w-full flex-col justify-center items-end gradient-dark-right z-20" v-show-on-display>
                    <div class="w-full lg:w-1/2 space-y-4 px-4 lg:px-16">
                        <h3 class="subsubtitle"> <RichText path="tny360.dev.mod.title" /> </h3>
                        <p class="lg:text-lg"> <RichText path="tny360.dev.mod.p1" /> </p>
                        <p class="lg:text-lg"> <RichText path="tny360.dev.mod.p2" /> </p>
                    </div>
                </div>
            </div>
            <div class="relative w-full flex h-128">
                <div class="absolute top-0 left-0 w-full h-full z-10">
                    <SmartVideo src="/tny-360/ext-dark.mp4" poster="/tny-360/ext-dark.webp" v-if="darkMode" />
                    <SmartVideo src="/tny-360/ext-light.mp4" poster="/tny-360/ext-light.webp" v-else />
                </div>
                <div class="show-right flex w-full flex-col justify-center gradient-dark-left z-20" v-show-on-display>
                    <div class="w-full lg:w-1/2 space-y-4 px-4 lg:px-16">
                        <h3 class="subsubtitle"> <RichText path="tny360.dev.ext.title" /> </h3>
                        <p class="lg:text-lg"> <RichText path="tny360.dev.ext.p1" /> </p>
                        <p class="lg:text-lg"> <RichText path="tny360.dev.ext.p2" /> </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="show-up w-full px-2 lg:px-8 m-auto pt-64 space-y-16" v-show-on-display>
            <h2 class="subtitle"> <RichText path="tny360.evolve.title" /> </h2>
            <div class="flex flex-col lg:flex-row w-full space-y-8 lg:space-y-0">
                <div class="flex flex-col space-y-8 w-full lg:w-1/2 justify-start items-center p-4">
                    <div class="flex flex-col space-y-2 justify-center items-center">
                        <h3 class="subsubtitle"> <RichText path="tny360.evolve.poss.title" /> </h3>
                        <p class="lg:text-lg"> <RichText path="tny360.evolve.poss.p1" /> </p>
                    </div>
                    <div class="flex flex-col space-y-4 justify-center items-center">
                        <div class="flex justify-center items-center space-x-4 border-2 border-primary-500 rounded-lg p-4 lg:max-w-2/3">
                            <UIcon name="lucide:gamepad-2" class="w-16 h-12 p-4" />
                            <p class="lg:text-lg text-left"> <RichText path="tny360.evolve.poss.tel" /> </p>
                        </div>
                        <span class="h-8 w-1 border-l-4 border-dashed border-primary-500" />
                        <div class="flex justify-center items-center space-x-4 border-2 border-primary-500 rounded-lg p-4 lg:max-w-2/3">
                            <UIcon name="lucide:text-quote" class="w-16 h-12 p-4" />
                            <p class="lg:text-lg text-left"> <RichText path="tny360.evolve.poss.blocks" /> </p>
                        </div>
                        <span class="h-8 w-1 border-l-4 border-dashed border-primary-500" />
                        <div class="flex justify-center items-center space-x-4 border-2 border-primary-500 rounded-lg p-4 lg:max-w-2/3">
                            <UIcon name="lucide:terminal" class="w-16 h-12 p-4" />
                            <p class="lg:text-lg text-left"> <RichText path="tny360.evolve.poss.sdk" /> </p>
                        </div>
                        <span class="h-8 w-1 border-l-4 border-dashed border-primary-500" />
                        <div class="flex justify-center items-center space-x-4 border-2 border-primary-500 rounded-lg p-4 lg:max-w-2/3">
                            <UIcon name="lucide:bot" class="w-16 h-12 p-4" />
                            <p class="lg:text-lg text-left"> <RichText path="tny360.evolve.poss.ros" /> </p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col space-y-4 w-full lg:w-1/2 justify-start items-center p-4">
                    <h3 class="subsubtitle"> <RichText path="tny360.evolve.learn.title" /> </h3>
                    <p class="lg:text-lg"> <RichText path="tny360.evolve.learn.p1" /> </p>
                    <!-- <p class="lg:text-lg"> Au-delà de l'assemblage, notre écosystème propose des jeux éducatifs et des défis interactifs pour assimiler la logique de la programmation en s'amusant. </p> -->
                    <p class="lg:text-lg"> <b> <RichText path="tny360.evolve.learn.p2" /> </b> </p>
                    <SmartVideo src="/tny-360/learn-dark.mp4" poster="/tny-360/learn-dark.webp" v-if="darkMode" />
                    <SmartVideo src="/tny-360/learn-light.mp4" poster="/tny-360/learn-light.webp" v-else />
                </div>
            </div>
        </section>

        <section class="show-up w-full px-2 lg:px-8 m-auto pt-64 pb-64 space-y-8" v-show-on-display>
            <h2 class="subtitle text-center"> <RichText path="tny360.perfs.title" /> </h2>
            <div class="relative flex w-full min-h-128 lg:min-h-192 overflow-hidden bg-slate-100 dark:bg-slate-900">
                <div class="absolute top-0 left-0 w-full h-full flex justify-center items-end">
                    <div class="flex w-fit space-x-4 z-50 pb-4">
                        <button class="w-4 h-4 rounded-full border-2" :class="carouselIndex === 0 ? 'bg-primary-500 border-transparent' : 'bg-transparent border-primary-500'" @click="setCarouselIndex(0)"></button>
                        <button class="w-4 h-4 rounded-full border-2" :class="carouselIndex === 1 ? 'bg-primary-500 border-transparent' : 'bg-transparent border-primary-500'" @click="setCarouselIndex(1)"></button>
                        <button class="w-4 h-4 rounded-full border-2" :class="carouselIndex === 2 ? 'bg-primary-500 border-transparent' : 'bg-transparent border-primary-500'" @click="setCarouselIndex(2)"></button>
                        <button class="w-4 h-4 rounded-full border-2" :class="carouselIndex === 3 ? 'bg-primary-500 border-transparent' : 'bg-transparent border-primary-500'" @click="setCarouselIndex(3)"></button>
                    </div>
                </div>
                <div class="flex w-full transition-all duration-500" :style="{ transform: `translateX(-${carouselIndex * 100}%)` }">
                    <div class="relative flex flex-col w-full flex-shrink-0 justify-end items-center pb-12">
                        <div class="lg:absolute top-0 left-0 w-full h-1/2 lg:h-full">
                            <SmartVideo src="/tny-360/power-dark.mp4" poster="/tny-360/power-dark.webp" v-if="darkMode" />
                            <SmartVideo src="/tny-360/power-light.mp4" poster="/tny-360/power-light.webp" v-else />
                        </div>
                        <div class="flex flex-col max-w-256 space-y-2 justify-center items-center z-20 bg-white/85 dark:bg-slate-800/60 rounded-xl p-3 bg-blur-xl shadow-xl shadow-slate-900/10 mx-2">
                            <h3 class="subsubtitle text-center"> <RichText path="tny360.perfs.power.title" /> </h3>
                            <p class="text-sm lg:text-lg text-center"> <RichText path="tny360.perfs.power.p1" /> </p>
                            <p class="text-sm lg:text-lg text-center"> <RichText path="tny360.perfs.power.p2" /> </p>
                        </div>
                    </div>
                    <div class="relative flex flex-col w-full flex-shrink-0 justify-end items-center pb-12">
                        <div class="lg:absolute top-0 left-0 w-full h-1/2 lg:h-full">
                            <SmartVideo src="/tny-360/move-dark.mp4" poster="/tny-360/move-dark.webp" v-if="darkMode" />
                            <SmartVideo src="/tny-360/move-light.mp4" poster="/tny-360/move-light.webp" v-else />
                        </div>
                        <div class="flex flex-col max-w-256 space-y-2 justify-center items-center z-20 bg-white/85 dark:bg-slate-800/60 rounded-xl p-3 bg-blur-xl shadow-xl shadow-slate-900/10 mx-2">
                            <h3 class="subsubtitle text-center"> <RichText path="tny360.perfs.moves.title" /> </h3>
                            <p class="text-sm lg:text-lg text-center"> <RichText path="tny360.perfs.moves.p1" /> </p>
                            <p class="text-sm lg:text-lg text-center"> <RichText path="tny360.perfs.moves.p2" /> </p>
                        </div>
                    </div>
                    <div class="relative flex flex-col w-full flex-shrink-0 justify-end items-center pb-12">
                        <div class="lg:absolute top-0 left-0 w-full h-1/2 lg:h-full">
                            <SmartVideo src="/tny-360/alive-dark.mp4" poster="/tny-360/alive-dark.webp" v-if="darkMode" />
                            <SmartVideo src="/tny-360/alive-light.mp4" poster="/tny-360/alive-light.webp" v-else />
                        </div>
                        <div class="flex flex-col max-w-256 space-y-2 justify-center items-center z-20 bg-white/85 dark:bg-slate-800/60 rounded-xl p-3 bg-blur-xl shadow-xl shadow-slate-900/10 mx-2">
                            <h3 class="subsubtitle text-center">  <RichText path="tny360.perfs.alive.title" /></h3>
                            <p class="text-sm lg:text-lg text-center"> <RichText path="tny360.perfs.alive.p1" /> </p>
                            <p class="text-sm lg:text-lg text-center"> <RichText path="tny360.perfs.alive.p2" /> </p>
                        </div>
                    </div>
                    <div class="relative flex flex-col w-full flex-shrink-0 justify-end items-center pb-12">
                        <div class="lg:absolute top-0 left-0 w-full h-1/2 lg:h-full">
                            <SmartVideo src="/tny-360/hri-dark.mp4" poster="/tny-360/hri-dark.webp" v-if="darkMode" />
                            <SmartVideo src="/tny-360/hri-light.mp4" poster="/tny-360/hri-light.webp" v-else />
                        </div>
                        <div class="flex flex-col max-w-256 space-y-2 justify-center items-center z-20 bg-white/85 dark:bg-slate-800/60 rounded-xl p-3 bg-blur-xl shadow-xl shadow-slate-900/10 mx-2">
                            <h3 class="subsubtitle text-center">  <RichText path="tny360.perfs.hri.title" /></h3>
                            <p class="text-sm lg:text-lg text-center"> <RichText path="tny360.perfs.hri.p1" /> </p>
                            <p class="text-sm lg:text-lg text-center"> <RichText path="tny360.perfs.hri.p2" /> </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="relative flex flex-col py-16 space-y-24 px-4 xl:px-0 pt-24">
            <div class="absolute top-0 right-0 w-full h-full bg-slate-100 dark:bg-slate-900"></div>
            <h2 class="subtitle text-center z-20 px-4">
                <RichText path="tny360.start.title" />
            </h2>

            <div class="show-up flex flex-col xl:flex-row xl:flex-wrap justify-center items-center z-20 space-y-16 xl:space-y-0 xl:space-x-4 pt-8" v-show-on-display>
                <div class="show-left delay-200 relative bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl xl:rounded-r-none xl:rounded-l-4xl shadow-lg flex flex-col w-full max-w-88 xl:max-w-full xl:w-96 p-4 py-12 space-y-8 overflow-hidden" v-show-on-display>
                    <div class="absolute top-0 left-0 py-1 px-4 bg-slate-100 dark:bg-slate-700 rounded-br-xl text-slate-600 dark:text-slate-300">
                        BareBones
                    </div>
                    <h3 class="subsubtitle text-center">
                        <RichText path="tny360.start.barebones.title" />
                    </h3>
                    <p class="flex text-center">
                        <RichText path="tny360.start.barebones.desc" />
                    </p>
                    <div class="flex flex-col grow w-full items-center py-4 space-y-8">
                        <p class="text-4xl font-extrabold"> <span class="text-primary">{{ prices['barebones'] }}</span> €
                        </p>
                        <div class="flex flex-col space-y-2">
                            <div v-for="feature in features['barebones']" class="flex items-center space-x-2">
                                <UIcon name="i-lucide-check" size="1em" class="text-primary" />
                                <span> {{ feature }} </span>
                            </div>
                            <UButton variant="link" class="w-fit p-0" to="/docs/tny-robotics/products/tny-360-barebones-kit-founders-edition" trailing icon="lucide:arrow-right"> {{ $t('tny360.start.completeList') }} </UButton>
                        </div>
                    </div>
                    <div class="flex w-full justify-center pt-4">
                        <UTooltip :text="$t('tny360.start.restock')">
                            <UButton disabled class="w-fit" variant="subtle" size="xl">
                                <!-- <RichText path="tny360.start.barebones.button" /> -->
                                <RichText path="tny360.start.outOfStock" />
                            </UButton>
                        </UTooltip>
                    </div>
                </div>
                <div class="show-up z-10 relative shine xl:scale-110 bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-500 rounded-lg shadow-lg flex flex-col w-full max-w-88 xl:max-w-full xl:w-100 p-4 py-12" v-show-on-display>
                    <div class="absolute top-0 left-0 right-0 flex justify-center">
                        <div class="py-1 px-4 bg-slate-100 dark:bg-slate-700 rounded-b-xl text-slate-600 dark:text-slate-300">
                            Maker
                        </div>
                    </div>
                    <div class="absolute flex justify-center w-full top-0 left-0">
                        <p
                            class="-translate-y-full text-white bg-primary-500 bright px-4 py-1 rounded-t-lg w-fit font-extrabold lg:text-lg text-center">
                            <RichText path="tny360.start.best" />
                        </p>
                    </div>
                    <div class="shine-background" />
                    <div class="space-y-8 z-20">
                        <h3 class="subsubtitle text-center">
                            <RichText path="tny360.start.maker.title" />
                        </h3>
                        <p class="flex text-center">
                            <RichText path="tny360.start.maker.desc" />
                        </p>
                        <div class="flex flex-col grow w-full items-center py-4 space-y-8">
                            <p class="text-4xl font-extrabold"> <span class="text-primary">{{ prices['maker'] }}</span> € </p>
                            <div class="flex flex-col space-y-2">
                                <div v-for="feature in features['maker']"
                                    class="flex items-center w-full justify-start space-x-2">
                                    <UIcon name="i-lucide-check" size="1em" class="text-primary" />
                                    <span> {{ feature }} </span>
                                </div>
                                <UButton variant="link" class="w-fit p-0" to="/docs/tny-robotics/products/tny-360-maker-kit-founders-edition" trailing icon="lucide:arrow-right"> {{ $t('tny360.start.completeList') }} </UButton>
                            </div>
                        </div>
                        <div class="flex w-full justify-center pt-4">
                            <UTooltip :text="$t('tny360.start.restock')">
                                <UButton disabled class="w-fit" variant="subtle" size="xl">
                                    <!-- <RichText path="tny360.start.maker.button" /> -->
                                    <RichText path="tny360.start.outOfStock" />
                                </UButton>
                            </UTooltip>
                        </div>
                    </div>
                </div>
                <div class="show-right delay-200 relative bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl xl:rounded-l-none xl:rounded-r-4xl shadow-lg flex flex-col w-full max-w-88 xl:max-w-full xl:w-96 p-4 py-12 space-y-8 overflow-hidden" v-show-on-display>
                    <div class="absolute top-0 right-0 py-1 px-4 bg-slate-100 dark:bg-slate-700 rounded-bl-xl text-slate-600 dark:text-slate-300">
                        Ready2Run
                    </div>
                    <h3 class="subsubtitle text-center">
                        <RichText path="tny360.start.r2r.title" />
                    </h3>
                    <p class="flex text-center">
                        <RichText path="tny360.start.r2r.desc" />
                    </p>
                    <div class="flex flex-col grow w-full items-center py-4 space-y-8">
                        <p class="text-4xl font-extrabold"> <span class="text-primary">{{ prices['r2r'] }}</span> €
                        </p>
                        <div class="flex flex-col space-y-2">
                            <div v-for="feature in features['r2r']" class="flex items-center space-x-2">
                                <UIcon name="i-lucide-check" size="1em" class="text-primary" />
                                <span> {{ feature }} </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex w-full justify-center pt-4">
                        <UButton disabled class="w-fit" variant="subtle" size="xl">
                            <!-- <RichText path="tny360.start.r2r.button" /> -->
                            <RichText path="tny360.start.notYetAvailable" />
                        </UButton>
                    </div>
                </div>
            </div>

            <div
                class="flex space-x-4 mt-8 mx-auto mb-8 text-slate-500 dark:text-slate-400 justify-center items-center z-20 px-2">
                <UIcon name="i-lucide-info" size="24" class="min-w-6" />
                <div class="flex">
                    <p class="space-x-1.5">
                        <RichText path="tny360.info.title" />
                        <NuxtLink to="?newsletter=true" class="text-primary underline">
                            <RichText path="tny360.info.button" />
                        </NuxtLink>
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title: t('tny360.title'),
    description: t('tny360.description'),
    ogTitle: t('tny360.title'),
    ogDescription: t('tny360.description'),
    ogUrl: 'https://tny-robotics.com' + route.path,
    ogImage: 'https://tny-robotics.com/tny-360.png',
    ogType: 'website',
    keywords: 'home, page, website, robot, robotics, furwaz, tny, 360, dog, education, kit, build, learn, coding, programming, arduino, esp32',
});
useHead(() => ({
    link: [{ rel: 'canonical', href: 'https://tny-robotics.com' + route.path },],
    htmlAttrs: { lang: locale.value }
}));

const { openModal } = useNewsletter();

const darkMode = ref(false);
onMounted(() => {
    darkMode.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        darkMode.value = e.matches;
    });
});

const carouselIndex = ref(0);
let carouselInterval: number | null = null;
async function setCarouselIndex(index: number) {
    carouselIndex.value = index;
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
    carouselInterval = setInterval(() => {
        carouselIndex.value = (carouselIndex.value + 1) % 4;
    }, 8000);
}

const prices = computed(() => ({
    barebones: 219,
    maker: 349,
    r2r: 499,
}));

const features = computed(() => ({
    barebones: [
        t('tny360.start.barebones.features.1'),
        t('tny360.start.barebones.features.2'),
        t('tny360.start.barebones.features.3'),
    ],
    maker: [
        t('tny360.start.maker.features.1'),
        t('tny360.start.maker.features.2'),
        t('tny360.start.maker.features.3'),
        t('tny360.start.maker.features.4'),
    ],
    r2r: [
        t('tny360.start.r2r.features.1'),
        t('tny360.start.r2r.features.2'),
        t('tny360.start.r2r.features.3'),
    ],
}));

onMounted(() => {
    setCarouselIndex(0);
});

onUnmounted(() => {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
});

</script>

<style scoped>
@import 'tailwindcss';

.gradient-dark-left {
    background: linear-gradient(to right, rgba(248, 250, 252, 1.0) 0%, rgba(0, 0, 0, 0.0) 80%);
}

@media (prefers-color-scheme: dark) {
    .gradient-dark-left {
        background: linear-gradient(to right, rgba(29, 41, 61, 1.0) 0%, rgba(0, 0, 0, 0.0) 80%);
    }
}

.gradient-dark-right {
    background: linear-gradient(to left, rgba(248, 250, 252, 1.0) 0%, rgba(0, 0, 0, 0.0) 80%);
}

@media (prefers-color-scheme: dark) {
    .gradient-dark-right {
        background: linear-gradient(to left, rgba(29, 41, 61, 1.0) 0%, rgba(0, 0, 0, 0.0) 80%);
    }
}

.bg-gradient-highlight {
    background: radial-gradient(circle at 50% 50%, rgba(255, 0, 255, 0.1) 0%, rgba(255, 0, 255, 0.0) 70%);
}

.bg-gradient-centerfuschia {
    background: radial-gradient(circle at 50% 100%, rgba(255, 0, 255, 0.1) 0%, rgba(255, 0, 255, 0) 80%);
}

.drop-shadow-slate-900 {
    filter: drop-shadow(0 0 4px rgba(15, 23, 42, 0.8));
}

.bg-blur-xl {
    backdrop-filter: blur(20px);
}

.shine {
    @apply shadow-xl shadow-fuchsia-500/20;
}

.shine-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(192, 0, 255, 0.03) 50%, rgba(192, 0, 255, 0.2) 50%, rgba(192, 0, 255, 0.2) 55%, rgba(192, 0, 255, 0.03) 55%, rgba(192, 0, 255, 0.03) 56%, rgba(192, 0, 255, 0.2) 56%, rgba(192, 0, 255, 0.2) 58%, rgba(192, 0, 255, 0.03) 58%);
    background-size: 400% 400%;
    animation: shine 4s cubic-bezier(.75, 0, .25, 1) infinite;
    pointer-events: none;
}

@keyframes shine {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 130% 50%;
    }
}

/* Container de la grille */
.bento-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(220px, auto);
    gap: 20px;
    max-width: 1250px;
    margin: 0 auto;
}

/* Style de base des cartes (Glassmorphism) */
.bento-card {
    @apply flex flex-col p-4 space-y-2 rounded-xl justify-center items-center bg-white dark:bg-slate-700/12 border-2 border-slate-100 dark:border-slate-700 shadow-lg;
    @apply hover:bg-fuchsia-500/5 hover:border-fuchsia-400 hover:scale-102 hover:shadow-fuchsia-500/10 transition-all;
}

.bento-card-large {
    grid-column: span 2;
    grid-row: span 2;
}

.bento-card-wide {
    grid-column: span 2;
}

.bento-card-tall {
    grid-row: span 2;
}

@media (max-width: 768px) {
    .bento-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .bento-small-hidden {
        display: none !important;
    }

    .bento-card-large,
    .bento-card-wide,
    .bento-card-tall {
        grid-column: span 2;
        grid-row: auto;
    }
}

</style>