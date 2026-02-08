<template>
    <div class="space-y-32 pb-64">
        <div class="relative flex w-full h-fit px-4 lg:px-24 pt-8 bg-white dark:bg-slate-900">
            <div class="absolute top-0 left-0 w-full h-full bg-header-gradient"></div>
            <div class="flex flex-col w-full lg:w-1/2 space-y-4 justify-center items-center lg:items-start py-32 lg:py-48 z-20">
                <h1 class="whitespace-nowrap text-5xl lg:text-7xl font-extrabold text-center lg:text-start">
                    <RichText path="tny360.header.title" />
                </h1>
                <p class="text-xl lg:text-4xl text-center lg:text-start"> 
                    <RichText path="tny360.header.desc" />
                </p>
                <div class="pt-8">
                    <UButton :label="$t('tny360.header.button')" size="xl" @click="openModal()" />
                </div>
            </div>
        </div>

        <div class="px-4 lg:px-8">
            <div class="flex items-center w-full min-h-[75vh] h-fit md:h-[75vh] bg-white border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-900 overflow-hidden rounded-lg">
                <div class="flex flex-col items-center w-full space-y-12 py-16">
                    <h2 class="subtitle text-center px-4">
                        <RichText path="tny360.features.title" />
                    </h2>

                    <div class="flex flex-col space-y-8 px-4 lg:px-8 md:max-w-[40em]">
                        <div class="space-y-2 lg:min-w-140">
                            <div class="flex space-x-4 w-full justify-center lg:justify-start">
                                <div class="hidden lg:flex w-fit items-center"> <UIcon name="i-heroicons-cube" class="w-8 h-8" /> </div>
                                <h3 class="subsubtitle text-center lg:text-left">
                                    <RichText path="tny360.features.print.title" />
                                </h3>
                            </div>
                            <p class="text-center lg:text-left lg:pl-12">
                                <RichText path="tny360.features.print.desc" />
                            </p>
                        </div>
                        <div class="space-y-2 lg:min-w-140">
                            <div class="flex space-x-4 w-full justify-center lg:justify-start">
                                <div class="hidden lg:flex w-fit items-center"> <UIcon name="i-heroicons-wrench-screwdriver" class="w-8 h-8" /> </div>
                                <h3 class="subsubtitle text-center lg:text-left">
                                    <RichText path="tny360.features.schema.title" />
                                </h3>
                            </div>
                            <p class="text-center lg:text-left lg:pl-12">
                                <RichText path="tny360.features.schema.desc" />
                            </p>
                        </div>
                        <div class="space-y-2 lg:min-w-140">
                            <div class="flex space-x-4 w-full justify-center lg:justify-start">
                                <div class="hidden lg:flex w-fit items-center"> <UIcon name="i-heroicons-code-bracket" class="w-8 h-8" /> </div>
                                <h3 class="subsubtitle text-center lg:text-left">
                                    <RichText path="tny360.features.soft.title" />
                                </h3>
                            </div>
                            <p class="text-center lg:text-left lg:pl-12">
                                <RichText path="tny360.features.soft.desc" />
                            </p>
                        </div>
                    </div>
                </div>
                <div class="hidden xl:flex flex-col w-full h-full -skew-x-12 bg-primary-400 translate-x-20 shadow-2xl border-l-4 border-primary-500 dark:border-primary-400">
                    <div class="flex justify-center items-center skew-x-12 grow">
                        <img src="/tny-360.png" alt="" class="translate-y-4 drop-shadow-lg w-[80%]">
                    </div>
                </div>
            </div>

            <div class="w-full text-center pl-1 py-8 space-y-4">
                <h2 class="subtitle"> <RichText path="tny360.features.takeALook.title" /></h2>
                <p class="text-lg">
                    <RichText path="tny360.features.takeALook.desc" />
                    <NuxtLink target="_blank" to="https://github.com/tny-robotics/tny-360" class="text-primary underline px-1">
                        <RichText path="tny360.features.takeALook.link" />
                    </NuxtLink>.
                </p>
            </div>
        </div>

        <div class="flex flex-col py-16 min-h-[75vh] space-y-12">
            <h2 class="subtitle text-center px-4">
                <RichText path="tny360.learn.title" />
            </h2>

            <div class="flex grow w-full justify-start overflow-auto">
                <div class="flex w-full justify-evenly">
                    <div v-for="platform in platforms" :key="platform.type" class="flex flex-col bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg p-4 pt-8 text-center space-y-8 w-1/6 min-w-64 lg:min-w-75 m-4 shadow-lg card">
                        <h3 class="subsubtitle text-primary">
                            {{ platform.title }}
                        </h3>
                        <div>
                            <p> {{ platform.description }} </p>
                        </div>
                        <div class="flex grow items-end justify-center pb-4">
                            <UButton :to="platform.link" variant="solid" size="lg">
                                {{ platform.button }}
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 lg:px-16">
            <div class="space-y-4">
                <h2 class="subtitle">
                    <RichText path="tny360.specs.title" />
                </h2>
                <div class="w-full lg:w-2/5">
                    <table class="table-auto w-full">
                        <thead>
                            <tr>
                                <th class="dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 px-4 py-2 text-left"> <RichText path="tny360.specs.component" /> </th>
                                <th class="dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 px-4 py-2 text-left"> <RichText path="tny360.specs.detail" /> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="line in specs" :key="line.component">
                                <td class="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-4 py-2"> {{ line.component }} </td>
                                <td class="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-4 py-2"> {{ line.detail }} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="relative flex flex-col py-16 space-y-24 px-4 xl:px-0 pt-24">
            <div class="absolute top-0 right-0 w-full h-full bg-slate-200 dark:bg-slate-900"></div>
            <h2 class="subtitle text-center z-20 px-4">
                <RichText path="tny360.start.title" />
            </h2>

            <div class="flex flex-col xl:flex-row xl:flex-wrap justify-center items-center z-20 space-y-16 xl:space-y-0 xl:space-x-4 pt-8">
                <div class="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl xl:rounded-r-none xl:rounded-l-4xl shadow-lg flex flex-col w-full max-w-80 xl:max-w-full xl:w-96 p-4 py-12 space-y-8">
                    <h3 class="subsubtitle text-center">
                        <RichText path="tny360.start.tinkerer.title" />
                    </h3>
                    <p class="flex text-center">
                        <RichText path="tny360.start.tinkerer.desc" />
                    </p>
                    <div class="flex grow w-full justify-center py-4">
                        <p class="text-4xl font-extrabold"> <span class="text-primary">{{ prices['tinkerer'] }}</span> € </p>
                    </div>
                    <div class="flex w-full justify-center pt-4">
                        <UButton disabled class="w-fit" variant="subtle" size="xl">
                            <!-- <RichText path="tny360.start.tinkerer.button" /> -->
                            <RichText path="tny360.start.notYetAvailable" />
                        </UButton>
                    </div>
                </div>
                <div class="relative shine xl:scale-110 bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-500 rounded-lg shadow-lg flex flex-col w-full max-w-80 xl:max-w-full xl:w-100 p-4 py-12">
                    <div class="absolute flex justify-center w-full top-0 left-0">
                        <p class="-translate-y-full bg-primary-500 bright px-4 py-1 rounded-t-lg w-fit font-extrabold text-lg text-center"> <RichText path="tny360.start.best" /> </p>
                    </div>
                    <div class="shine-background" />
                    <div class="space-y-8 z-20">
                        <h3 class="subsubtitle text-center">
                            <RichText path="tny360.start.adventure.title" />
                        </h3>
                        <p class="flex text-center">
                            <RichText path="tny360.start.adventure.desc" />
                        </p>
                        <div class="flex grow w-full justify-center py-4">
                            <p class="text-4xl font-extrabold"> <span class="text-primary">{{ prices['adventure'] }}</span> € </p>
                        </div>
                        <div class="flex w-full justify-center pt-4">
                            <UButton disabled class="w-fit" variant="subtle" size="xl">
                                <!-- <RichText path="tny360.start.adventure.button" /> -->
                                <RichText path="tny360.start.notYetAvailable" />
                            </UButton>
                        </div>
                    </div>
                </div>
                <div class="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl xl:rounded-l-none xl:rounded-r-4xl shadow-lg flex flex-col w-full max-w-80 xl:max-w-full xl:w-96 p-4 py-12 space-y-8">
                    <h3 class="subsubtitle text-center">
                        <RichText path="tny360.start.ready.title" />
                    </h3>
                    <p class="flex text-center">
                        <RichText path="tny360.start.ready.desc" />
                    </p>
                    <div class="flex grow w-full justify-center py-4">
                        <p class="text-4xl font-extrabold"> <span class="text-primary">{{ prices['ready'] }}</span> € </p>
                    </div>
                    <div class="flex w-full justify-center pt-4">
                        <UButton disabled class="w-fit" variant="subtle" size="xl">
                            <!-- <RichText path="tny360.start.ready.button" /> -->
                            <RichText path="tny360.start.notYetAvailable" />
                        </UButton>
                    </div>
                </div>
            </div>
            
            <div class="flex space-x-4 mt-8 mx-auto mb-8 text-slate-500 dark:text-slate-400 justify-center items-center z-20 px-2">
                <UIcon name="i-lucide-info" size="24" class="min-w-6"/>
                <div class="flex">
                    <p class="space-x-1.5">
                        <RichText path="tny360.info.title" />
                        <NuxtLink to="?newsletter=true" class="text-primary underline">
                            <RichText path="tny360.info.button" />
                        </NuxtLink>
                    </p>
                </div>
            </div>
        </div>
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
    link: [ {rel: 'canonical', href: 'https://tny-robotics.com' + route.path}, ],
    htmlAttrs: { lang: locale.value }
}));

const { openModal } = useNewsletter();

const specs = computed(() => ([
    { component: t('tny360.specs.processor.component'), detail: t('tny360.specs.processor.detail') },
    { component: t('tny360.specs.motors.component'), detail: t('tny360.specs.motors.detail') },
    { component: t('tny360.specs.camera.component'), detail: t('tny360.specs.camera.detail') },
    { component: t('tny360.specs.screen.component'), detail: t('tny360.specs.screen.detail') },
    { component: t('tny360.specs.imu.component'), detail: t('tny360.specs.imu.detail') },
    { component: t('tny360.specs.communication.component'), detail: t('tny360.specs.communication.detail') },
    { component: t('tny360.specs.power.component'), detail: t('tny360.specs.power.detail') },
]));

const platforms = computed(() => ([
    {
        type: 'mobile',
        link: '/docs/TNY-360/usage/mobile-app/',
        title: t('tny360.learn.mobile.title'),
        description: t('tny360.learn.mobile.desc'),
        button: t('tny360.learn.mobile.button'),
    },
    {
        type: 'blocks',
        link: '/docs/TNY-360/usage/desktop-app',
        title: t('tny360.learn.desktop.title'),
        description: t('tny360.learn.desktop.desc'),
        button: t('tny360.learn.desktop.button'),
    },
    {
        type: 'python',
        link: '/docs/TNY-360/usage/programming/python/',
        title: t('tny360.learn.python.title'),
        description: t('tny360.learn.python.desc'),
        button: t('tny360.learn.python.button'),
    },
    {
        type: 'ros2',
        link: '/docs/TNY-360/usage/programming/ros2/',
        title: t('tny360.learn.ros2.title'),
        description: t('tny360.learn.ros2.desc'),
        button: t('tny360.learn.ros2.button'),
    },
    {
        type: 'esp32',
        link: '/docs/TNY-360/operation/firmware/',
        title: t('tny360.learn.esp32.title'),
        description: t('tny360.learn.esp32.desc'),
        button: t('tny360.learn.esp32.button'),
    },
]));

const prices = computed(() => ({
    tinkerer: 179,
    adventure: 249,
    ready: 349,
}));

</script>

<style>
@import 'tailwindcss';

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
    animation: shine 4s cubic-bezier(.75,0,.25,1) infinite;
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
</style>