<template>
    <div class="flex grow flex-col">
        <div class="relative">
            <div id="particle-container" class="absolute w-full h-full overflow-hidden" />
            <div id="header-zone" class="py-32">
                <h1> {{ $t('about.name') }} </h1>
                <p class="subtitle">{{ $t('about.title') }}</p>
            </div>
        </div>
        <XHeader />
        <div class="flex flex-col h-fit w-full space-y-32 py-16">
            <div class="flex flex-col lg:flex-row space-y-16 lg:space-y-0 grow h-fit">
                <div class="flex flex-col w-full lg:w-1/2 min-h-full h-fit justify-center items-center px-4">
                    <div class="flex flex-col items-start max-w-140 space-y-8 text-left">
                        <h2> {{ $t('index.whoarewe.title') }} </h2>
                            <div class="space-y-2">
                                <p class="text-lg"> {{ $t('index.whoarewe.p1.base') }}, <span class="italic">{{ $t('index.whoarewe.p1.italic') }}</span> </p>
                                <p class="text-lg"> {{ $t('index.whoarewe.p2.base') }} <span class="text-fuchsia-400">{{ $t('index.whoarewe.p2.master') }}</span> {{ $t('index.whoarewe.p2.link') }} <span class="text-fuchsia-400">{{ $t('index.whoarewe.p2.desc') }}</span>. </p>
                            </div>
                            <div class="space-y-2">
                                <p class="text-lg"> {{ $t('index.whoarewe.p3') }} :</p>
                                <p class="text-lg font-bold">{{ $t('index.whoarewe.p4.base') }} <span class="text-fuchsia-400">{{ $t('index.whoarewe.p4.one') }}</span>, <span class="text-fuchsia-400">{{ $t('index.whoarewe.p4.two') }}</span> {{ $t('index.whoarewe.p4.and') }} <span class="text-fuchsia-400">{{ $t('index.whoarewe.p4.three') }}</span>.</p>
                            </div>
                    </div>
                </div>
                <div class="flex justify-center items-center w-full lg:w-1/2 max-h-full px-4">
                    <div class="flex flex-col space-y-8 w-min px-32">
                        <div class="w-48 h-48 lg:w-64 lg:h-64 border-2 border-slate-800 dark:border-slate-200 shadow-xl bg-slate-50 dark:bg-slate-800 overflow-hidden">
                            <img src="~/assets/img/moi.png" alt="Paul LOISIL" class="w-[80%] m-auto pt-4 moi-img">
                        </div>
                        <div class="space-y-2">
                            <p class="text-xl font-bold"> {{ $t('index.card.name') }} </p>
                            <p> {{ $t('index.card.year') }} </p>
                            <p> {{ $t('index.card.desc') }} </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex flex-col lg:flex-row space-y-16 lg:space-y-0 grow h-fit">
                <div class="flex flex-col w-full h-fit justify-center items-center px-4">
                    <div class="flex flex-col max-w-140 space-y-8 text-center">
                        <h2> {{ $t('about.mission.title') }} </h2>
                        <p> {{ $t('about.mission.p1') }} <br /> {{ $t('about.mission.p2') }} </p>
                        <p> {{ $t('about.mission.p3') }} </p>
                    </div>
                </div>
            </div>
            
            <!-- <div class="flex flex-col lg:flex-row space-y-16 lg:space-y-0 grow h-fit z-50 px-48">
                <div class="flex flex-col items-start max-w-140 space-y-8 text-left">
                    <h2> {{ $t('about.contrib.title') }} </h2>
                    <p> {{ $t('about.contrib.p1') }} 💪 </p>
                    <h3> {{ $t('about.contrib.supporters') }} </h3>
                    <div class="flex flex-wrap p-2">
                        <div class="rounded-full border-2 p-8 shadow-xl">

                        </div>
                    </div>
                    <h3> {{ $t('about.contrib.testers') }} </h3>
                    <div class="flex flex-wrap p-2">
                        <div class="rounded-full border-2 p-8 shadow-xl">

                        </div>
                    </div>
                    <h3> {{ $t('about.contrib.adopters') }} </h3>
                    <div class="flex flex-wrap p-2">
                        <div class="rounded-full border-2 p-8 shadow-xl">

                        </div>
                    </div>
                </div>
            </div> -->
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
    keywords: 'home, page, website, robot, robotics, furwaz, tny, 360, sensors, actuators, learn, build',
});
useHead(() => ({
    link: [ {rel: 'canonical', href: 'https://tny-robotics.com' + route.path}, ],
    htmlAttrs: { lang: locale.value }
}));

</script>

<style></style>