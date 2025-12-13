<template>
    <div class="flex flex-col grow pt-24">
        <div class="relative flex w-full h-fit px-4 lg:px-24 pt-8 bg-white dark:bg-slate-900">
            <div class="absolute top-0 left-0 w-full h-full bg-header-gradient"></div>
            <div class="flex flex-col w-full space-y-16 justify-center items-center py-24 lg:py-32 z-20">
                <h1 class="text-3xl lg:text-5xl font-extrabold text-center">
                    <RichText path="education.header.title" />
                </h1>
                <p class="text-xl lg:text-3xl text-center"> 
                    <RichText path="education.header.subtitle" />
                </p>
            </div>
        </div>
        <div class="flex flex-col space-y-16 py-32">
            <h1 class="text-3xl lg:text-4xl text-center font-bold">
                <RichText path="education.levels.title" />
            </h1>
            <div class="flex flex-col lg:flex-row w-full justify-evenly space-y-16 lg:space-y-0 p-2">
                <div class="border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 space-y-4 max-w-xl">
                    <div class="flex flex-col pb-3">
                        <h1 class="w-full text-2xl font-semibold text-center">
                            <RichText path="education.levels.starter.title" />
                        </h1>
                        <p class="text-sm italic text-center">
                            <RichText path="education.levels.starter.subtitle" />
                        </p>
                    </div>
                    <div class="flex space-x-4 w-full">
                        <UIcon name="i-lucide-check" size="28" class="min-w-8 text-primary" />
                        <div class="flex flex-col space-y-1">
                            <h2 class="text-lg font-semibold text-left text-primary">
                                <RichText path="education.levels.starter.visual.title" />
                            </h2>
                            <p class="text-left"> <RichText path="education.levels.starter.visual.description" /> </p>
                        </div>
                    </div>
                    <div class="flex space-x-4 w-full">
                        <UIcon name="i-lucide-check" size="28" class="min-w-8 text-primary" />
                        <div class="flex flex-col space-y-1">
                            <h2 class="text-lg font-semibold text-left text-primary">
                                <RichText path="education.levels.starter.ready.title" />
                            </h2>
                            <p class="text-left"> <RichText path="education.levels.starter.ready.description" /> </p>
                        </div>
                    </div>
                </div>
                <div class="border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 space-y-4 max-w-xl">
                    <div class="flex flex-col pb-3">
                        <h1 class="w-full text-2xl font-semibold text-center">
                            <RichText path="education.levels.advanced.title" />
                        </h1>
                        <p class="text-sm italic text-center">
                            <RichText path="education.levels.advanced.subtitle" />
                        </p>
                    </div>
                    <div class="flex space-x-4 w-full">
                        <UIcon name="i-lucide-check" size="28" class="min-w-8 text-primary" />
                        <div class="flex flex-col space-y-1">
                            <h2 class="text-lg font-semibold text-left text-primary">
                                <RichText path="education.levels.advanced.standards.title" />
                            </h2>
                            <p class="text-left"> <RichText path="education.levels.advanced.standards.description" /> </p>
                        </div>
                    </div>
                    <div class="flex space-x-4 w-full">
                        <UIcon name="i-lucide-check" size="28" class="min-w-8 text-primary" />
                        <div class="flex flex-col space-y-1">
                            <h2 class="text-lg font-semibold text-left text-primary">
                                <RichText path="education.levels.advanced.api.title" />
                            </h2>
                            <p class="text-left"> <RichText path="education.levels.advanced.api.description" /> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col lg:flex-row space-y-16 py-32 justify-around px-2">
            <div class="flex flex-col lg:w-min justify-center space-y-8">
                <h1 class="text-3xl lg:text-4xl font-bold text-center lg:text-left lg:whitespace-nowrap">
                    <RichText path="education.courses.title" />
                </h1>
                <p class="text-lg text-center lg:text-left">
                    <RichText path="education.courses.description" />
                </p>
            </div>
            <div class="flex flex-col justify-center items-center">
                <div class="flex flex-col space-y-8 w-fit max-w-sm">
                    <div class="flex flex-col justify-center items-center border-1 border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-lg p-6 space-y-4">
                        <div class="flex space-x-2 text-primary">
                            <UIcon name="i-lucide-book-open" size="32" class="min-w-8" />
                            <h2 class="text-2xl font-semibold">
                                <RichText path="education.courses.theory.title" />
                            </h2>
                        </div>
                        <div class="text-center">
                            <p> <RichText path="education.courses.theory.description" /> </p>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center border-1 border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-lg p-6 space-y-4">
                        <div class="flex space-x-2 text-primary">
                            <UIcon name="i-lucide-pencil" size="32" class="min-w-8" />
                            <h2 class="text-2xl font-semibold">
                                <RichText path="education.courses.exercises.title" />
                            </h2>
                        </div>
                        <div class="text-center">
                            <p> <RichText path="education.courses.exercises.description" /> </p>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center border-1 border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-lg p-6 space-y-4">
                        <div class="flex space-x-2 text-primary">
                            <UIcon name="i-lucide-graduation-cap" size="32" class="min-w-8" />
                            <h2 class="text-2xl font-semibold">
                                <RichText path="education.courses.guides.title" />
                            </h2>
                        </div>
                        <div class="text-center">
                            <p> <RichText path="education.courses.guides.description" /> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col space-y-16 py-32 justify-center w-full px-2">
            <h1 class="text-3xl lg:text-4xl font-bold text-center">
                <RichText path="education.hardware.title" />
            </h1>
            <div class="flex w-fit mx-auto border-3 border-white dark:border-slate-900 rounded-lg shadow-lg overflow-hidden">
                <div class="flex flex-col space-y-1 bg-white bg-slate-700">
                    <button class="space-y-4 px-8 py-12 bg-slate-100 dark:bg-slate-800 hover:bg-primary-600/10 dark:hover:bg-primary-600/10 transition-all border-primary-400 dark:border-primary-500"
                        @click="hardwareSelect = 1" :class="hardwareSelect === 1 ? 'lg:border-r-4' : 'border-r-0'">
                        <h1 class="text-2xl font-semibold"> <RichText path="education.hardware.manip.title" /> </h1>
                        <p class="text-lg"> <RichText path="education.hardware.manip.description" /> </p>
                    </button>
                    <button class="space-y-4 px-8 py-12 bg-slate-100 dark:bg-slate-800 hover:bg-primary-600/10 dark:hover:bg-primary-600/10 transition-all border-primary-400 dark:border-primary-500"
                        @click="hardwareSelect = 2" :class="hardwareSelect === 2 ? 'lg:border-r-4' : 'border-r-0'">
                        <h1 class="text-2xl font-semibold"> <RichText path="education.hardware.fixable.title" /> </h1>
                        <p class="text-lg"> <RichText path="education.hardware.fixable.description" /> </p>
                    </button>
                    <button class="space-y-4 px-8 py-12 bg-slate-100 dark:bg-slate-800 hover:bg-primary-600/10 dark:hover:bg-primary-600/10 transition-all border-primary-400 dark:border-primary-500"
                        @click="hardwareSelect = 3" :class="hardwareSelect === 3 ? 'lg:border-r-4' : 'border-r-0'">
                        <h1 class="text-2xl font-semibold"> <RichText path="education.hardware.mobile.title" /> </h1>
                        <p class="text-lg"> <RichText path="education.hardware.mobile.description" /> </p>
                    </button>
                </div>
                <div class="hidden lg:flex relative w-4xl bg-white dark:bg-slate-900">
                    <img src="" alt="Robust piece image" class="absolute top-0 left-0 w-full h-full transition-all flex justify-center items-center"
                        :class="hardwareSelect === 1? 'opacity-100' : 'opacity-0'">
                    <img src="" alt="Printable piece image" class="absolute top-0 left-0 w-full h-full transition-all flex justify-center items-center"
                        :class="hardwareSelect === 2? 'opacity-100' : 'opacity-0'">
                    <img src="" alt="Movable robot image" class="absolute top-0 left-0 w-full h-full transition-all flex justify-center items-center"
                        :class="hardwareSelect === 3? 'opacity-100' : 'opacity-0'">
                </div>
            </div>
        </div>
        <div class="flex flex-col space-y-16 py-32 justify-center w-full">
            <h1 class="text-3xl lg:text-4xl font-bold text-center">
                <RichText path="education.budget.title" />
            </h1>
            <div class="flex flex-col lg:flex-row justify-evenly w-full space-y-4 lg:space-y-0 px-2">
                <div class="flex flex-col space-y-6 justify-center items-center px-4 py-6 lg:max-w-1/4 bg-white dark:bg-slate-900 rounded-lg">
                    <div class="flex space-x-4 text-primary text-center justify-center items-center">
                        <UIcon name="i-lucide-euro" size="32" class="min-w-8" />
                        <h2 class="text-lg lg:text-xl font-semibold"> <RichText path="education.budget.price.title" /> </h2>
                    </div>
                    <p class="text-md text-center"> <RichText path="education.budget.price.description" /> </p>
                </div>
                <div class="flex flex-col space-y-6 justify-center items-center px-4 py-6 lg:max-w-1/4 bg-white dark:bg-slate-900 rounded-lg">
                    <div class="flex space-x-4 text-primary text-center justify-center items-center">
                        <UIcon name="i-lucide-headset" size="32" class="min-w-8" />
                        <h2 class="text-lg lg:text-xl font-semibold"> <RichText path="education.budget.support.title" /> </h2>
                    </div>
                    <p class="text-md text-center"> <RichText path="education.budget.support.description" /> </p>
                </div>
                <div class="flex flex-col space-y-6 justify-center items-center px-4 py-6 lg:max-w-1/4 bg-white dark:bg-slate-900 rounded-lg">
                    <div class="flex space-x-4 text-primary text-center justify-center items-center">
                        <UIcon name="i-lucide-octagon-alert" size="32" class="min-w-8" />
                        <h2 class="text-lg lg:text-xl font-semibold"> <RichText path="education.budget.warranty.title" /> </h2>
                    </div>
                    <p class="text-md text-center"> <RichText path="education.budget.warranty.description" /> </p>
                </div>
            </div>
        </div>
        <div class="flex w-full pt-32 justify-evenly flex-col lg:flex-row">
            <UButton disabled size="xl" :label="$t('education.cta.devis')" trailing icon="i-lucide-mail" variant="ghost" />
            <UButton disabled size="xl" :label="$t('education.cta.download')" trailing icon="i-lucide-download" variant="ghost" />
        </div>
        <div class="flex space-x-4 mt-16 mx-auto mb-32 text-slate-500 dark:text-slate-400 justify-center items-center px-2">
            <UIcon name="i-lucide-info" size="24" class="min-w-6"/>
            <div class="flex">
                <p class="space-x-1.5">
                    <RichText path="education.info.title" />
                    <NuxtLink to="?newsletter=true" class="text-primary underline">
                        <RichText path="education.info.button" />
                    </NuxtLink>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title: t('education.title'),
    description: t('education.description'),
    ogTitle: t('education.title'),
    ogDescription: t('education.description'),
    ogUrl: 'https://tny-robotics.com' + route.path,
    ogImage: 'https://tny-robotics.com/icon-border.png',
    ogType: 'website',
    keywords: 'education, research, page, website, robot, robotics, furwaz, tny, 360, dog, education, kit, build, learn, coding, programming, arduino, esp32',
});
useHead(() => ({
    link: [{ rel: 'canonical', href: 'https://tny-robotics.com' + route.path },],
    htmlAttrs: { lang: locale.value }
}));

const hardwareSelect = ref(1);
const hardwareSelectChangeTimeout = ref<number | null>(null);
watch(hardwareSelect, (newValue) => {
    triggerHardwareSelectChangeAnimation();
});

function triggerHardwareSelectChangeAnimation() {
    if (hardwareSelectChangeTimeout.value) {
        clearTimeout(hardwareSelectChangeTimeout.value);
    }
    hardwareSelectChangeTimeout.value = setTimeout(() => {
        hardwareSelect.value = hardwareSelect.value % 3 + 1;
    }, 3000);
}
triggerHardwareSelectChangeAnimation();

</script>

<style></style>