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
                        <img src="~/assets/img/tny360-full.png" alt="" class="translate-y-4 drop-shadow-lg w-[80%]">
                    </div>
                </div>
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

        <div class="relative flex flex-col py-16 space-y-12">
            <div class="absolute top-0 right-0 w-full h-full bg-slate-200 dark:bg-slate-900 translate-y-4 scale-y-120 scale-x-200"></div>
            <h2 class="subtitle text-center z-20 px-4">
                <RichText path="tny360.start.title" />
            </h2>

            <div class="flex flex-wrap justify-evenly z-20">
                <div class="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg shadow-lg flex flex-col w-full md:w-1/3 m-4 p-8 space-y-4">
                    <h3 class="subsubtitle">
                        <RichText path="tny360.start.adventure.title" />
                    </h3>
                    <p class="flex grow">
                        <RichText path="tny360.start.adventure.desc" />
                    </p>
                    <div class="flex w-full justify-start pt-4">
                        <UButton class="w-fit" variant="solid" size="md" trailing icon="i-heroicons-chevron-right">
                            <RichText path="tny360.start.adventure.button" />
                        </UButton>
                    </div>
                </div>
                <div class="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg shadow-lg flex flex-col w-full md:w-1/3 m-4 p-8 space-y-4">
                    <h3 class="subsubtitle">
                        <RichText path="tny360.start.now.title" />
                    </h3>
                    <p class="flex grow">
                        <RichText path="tny360.start.now.desc" />
                    </p>
                    <div class="flex w-full justify-start pt-4">
                        <UButton class="w-fit" variant="solid" size="md" trailing icon="i-heroicons-chevron-right">
                            <RichText path="tny360.start.now.button" />
                        </UButton>
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
    title: t('tny360.name'),
    description: t('tny360.description'),
    ogTitle: t('tny360.name'),
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
</script>

<style></style>