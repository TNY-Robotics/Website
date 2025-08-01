<template>
    <div class="relative flex flex-col grow h-fit w-full overflow-hidden">
        <!-- background dots -->
        <div id="particle-container" class="absolute w-full h-full overflow-hidden" />

        <!-- Big header zone -->
        <div id="header-zone" class="relative flex grow h-fit w-full min-h-screen">
            <!-- background icon -->
            <div class="flex items-center justify-center absolute w-full h-full overflow-hidden">
                <img id="tny-logo" src="~/assets/logo.png" alt="TNY Logo" class="opacity-10 drop-shadow-2xl w-64 h-64 lg:w-128 lg:h-128 invert-70 dark:invert-0">
            </div>

            <div class="flex grow h-fit w-full pt-16 md:pt-32 lg:pt-64 flex-col justify-center items-center space-y-6 z-10 px-8">
                <h1> {{ $t('main.title') }} </h1>
                <p class="subtitle"> {{ $t('main.slogan') }} </p>
                <div class="flex grow h-fit py-64">
                    <div style="box-shadow: 0px 4px 96px 10px oklch(72.3% 0.219 149.579);" class="w-fit h-fit rounded-lg bg-slate-50 dark:bg-slate-800">
                        <UButton :label="$t('index.kickstarter')" href="https://www.kickstarter.com/projects/furwaz/1456182268?ref=6fk4n3&token=4902aa56" target="_blank"
                            class="ks-btn border-1 hover:cursor-pointer transition-all"
                            size="xl" color="success" variant="outline" icon="i-heroicons-chevron-right" trailing />
                    </div>
                </div>
            </div>
        </div>

        <XHeader />
        <!-- Who are we ? -->
        <div class="flex flex-col lg:flex-row space-y-16 lg:space-y-0 grow h-fit z-50 pb-96 px-4 pt-16">
            <div class="who-text-zone flex grow lg:skew-x-[-25deg] min-h-full h-fit p-1 rounded-xl">
                <div class="flex grow h-fit min-h-full w-full overflow-hidden p-4 lg:p-8 rounded-lg">
                    <div class="flex flex-col grow lg:skew-x-[25deg] lg:pl-9 lg:pr-4 py-8 space-y-8">
                        <h2> {{ $t('index.whoarewe.title') }} </h2>
                        <div class="space-y-2">
                            <p> {{ $t('index.whoarewe.p1.base') }}, <span class="italic">{{ $t('index.whoarewe.p1.italic') }}</span> </p>
                            <p> {{ $t('index.whoarewe.p2.base') }} <span class="text-fuchsia-400">{{ $t('index.whoarewe.p2.master') }}</span> {{ $t('index.whoarewe.p2.link') }} <span class="text-fuchsia-400">{{ $t('index.whoarewe.p2.desc') }}</span>. </p>
                        </div>
                        <div class="space-y-2">
                            <p> {{ $t('index.whoarewe.p3') }} :</p>
                            <p class="font-bold">{{ $t('index.whoarewe.p4.base') }} <span class="text-fuchsia-400">{{ $t('index.whoarewe.p4.one') }}</span>, <span class="text-fuchsia-400">{{ $t('index.whoarewe.p4.two') }}</span> {{ $t('index.whoarewe.p4.and') }} <span class="text-fuchsia-400">{{ $t('index.whoarewe.p4.three') }}</span>.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center w-full lg:w-fit px-32">
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

        <!-- What do we do ? -->
        <div class="flex flex-col lg:flex-row space-y-16 lg:space-y-0 grow h-fit z-50 px-4">
            <div class="flex justify-center items-center w-full lg:w-1/2">
                <img src="~/assets/img/arm.png" alt="TNY-360 Robot" class="max-w-[50%] max-h-72 img-fuchsia">
            </div>
            <div class="flex flex-col w-full lg:w-1/2 min-h-full h-fit justify-center items-center">
                <div class="max-w-170 p-1 what-we-do rounded-xl">
                    <div class="space-y-8 text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <h2> {{ $t('index.whatwedo.title') }} </h2>
                        <div class="space-y-4 text-center">
                            <p> {{ $t('index.whatwedo.p1.one') }} <span class="text-fuchsia-400">{{ $t('index.whatwedo.p1.two') }}</span>, {{ $t('index.whatwedo.p1.three') }} <span class="text-fuchsia-400">{{ $t('index.whatwedo.p1.four') }}</span>. </p>
                            <p> {{ $t('index.whatwedo.p2.one') }} <span class="text-fuchsia-400">{{ $t('index.whatwedo.p2.two') }}</span>, <span class="text-fuchsia-400">{{ $t('index.whatwedo.p2.three') }}</span>, {{ $t('index.whatwedo.p2.but') }} <span class="text-fuchsia-400">{{ $t('index.whatwedo.p2.four') }}</span> {{ $t('index.whatwedo.p2.five') }}. </p>
                        </div>
                        <p> {{ $t('index.whatwedo.p3.one') }} : <span class="text-fuchsia-400">{{ $t('index.whatwedo.p3.two') }}</span> ! </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- little arrows -->
        <div class="flex flex-col py-16 -space-y-16 text-fuchsia-400 drop-shadow-arrows items-center">
            <UIcon name="i-heroicons-chevron-down" class="w-20 lg:w-32 h-24 anim-float" style="animation-delay: 000ms;" />
            <UIcon name="i-heroicons-chevron-down" class="w-20 lg:w-32 h-24 anim-float" style="animation-delay: 300ms;" />
        </div>

        <!-- TNY - 360 -->
        <div class="flex flex-col lg:flex-row space-y-16 lg:space-y-0 grow h-fit z-50 pb-96">
            <div class="flex flex-col w-full lg:w-1/2 min-h-full h-fit justify-center items-center px-4">
                <div class="flex flex-col items-start max-w-140 space-y-8 text-center">
                    <h2> {{ $t('index.tny.title') }} </h2>
                    <div class="space-y-4 text-start">
                        <p>
                            {{ $t('index.tny.p1.one') }} <span class="text-fuchsia-400">{{ $t('index.tny.p1.two') }}</span>, <span class="text-fuchsia-400">{{ $t('index.tny.p1.three') }}</span> {{  $t('index.tny.p1.and') }} <span class="text-fuchsia-400">{{ $t('index.tny.p1.four') }}</span>, {{ $t('index.tny.p1.five') }} <span class="text-fuchsia-400">{{ $t('index.tny.p1.six') }}</span>,
                            <span class="text-fuchsia-400">{{ $t('index.tny.p1.seven') }}</span>, {{ $t('index.tny.p1.eight') }} <span class="text-fuchsia-400">{{ $t('index.tny.p1.nine') }}</span> {{ $t('index.tny.p1.ten') }} <span class="text-fuchsia-400">{{ $t('index.tny.p1.eleven') }}</span> {{ $t('index.tny.p1.twelve') }} <span class="text-fuchsia-400">{{ $t('index.tny.p1.thirdteen') }}</span> !
                        </p>
                        <p>
                            {{ $t('index.tny.p2.one') }} <span class="text-fuchsia-400">{{ $t('index.tny.p2.two') }}</span>, {{ $t('index.tny.p2.three') }} <span class="text-fuchsia-400">{{ $t('index.tny.p2.four') }}</span>, {{ $t('index.tny.p2.five') }} <span class="text-fuchsia-400">{{ $t('index.tny.p2.six') }}</span>,
                            {{ $t('index.tny.p2.seven') }}  <span class="text-fuchsia-400">{{ $t('index.tny.p2.eight') }}</span> {{ $t('index.tny.p2.nine') }} !
                        </p>
                    </div>
                    <UButton :label="$t('index.tny.more')" href="/robots/tny-360" icon="i-heroicons-chevron-right" trailing />
                </div>
            </div>

            <div class="flex justify-center items-center w-full lg:w-1/2 max-h-full px-4">
                <img src="~/assets/img/tny360.gif" alt="TNY-360 Robot" class="max-w-[80%] lg:max-w-[50%] max-h-full tny-img">
            </div>
        </div>

        <!-- contact us -->
        <div class="flex flex-col py-16 space-y-8 items-center pb-32 px-4">
            <h2> {{ $t('index.contact.title') }} </h2>
            <div class="space-y-2 text-center">
                <p>{{ $t('index.contact.p1') }}</p>
                <p>{{ $t('index.contact.p2') }}</p>
            </div>
            <div class="flex space-x-8 justify-center">
                <UButton class="flex justify-center items-center p-4 h-fit w-fit border-2" variant="soft" href="https://youtube.com/@furwaz">
                    <UIcon name="i-lucide-youtube" class="w-8 h-8" />
                </UButton>
                <UButton class="flex justify-center items-center p-4 h-fit w-fit border-2" variant="soft" href="https://instagram.com/furwaz_">
                    <UIcon name="i-lucide-instagram" class="w-8 h-8" />
                </UButton>
                <UButton class="flex justify-center items-center p-4 h-fit w-fit border-2" variant="soft" href="https://twitter.com/furwaz">
                    <UIcon name="i-lucide-twitter" class="w-8 h-8" />
                </UButton>
                <UButton class="flex justify-center items-center p-4 h-fit w-fit border-2" variant="soft" href="mailto:contact@furwaz.com">
                    <UIcon name="i-lucide-mail" class="w-8 h-8" />
                </UButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title: t('index.title'),
    description: t('index.description'),
    ogTitle: t('index.title'),
    ogDescription: t('index.description'),
    ogUrl: 'https://tny-robotics.com' + route.path,
    ogImage: 'https://tny-robotics.com/icon.png',
    ogType: 'website',
    keywords: 'home, page, website, robot, robotics, furwaz, tny, 360, sensors, actuators, learn, build',
});
useHead(() => ({
    link: [ {rel: 'canonical', href: 'https://tny-robotics.com' + route.path}, ],
    htmlAttrs: { lang: locale.value }
}));

onMounted(() => {
    const particleContainer = document.getElementById('particle-container');
    const tnyLogo = document.getElementById("tny-logo");
    if (!particleContainer || !tnyLogo) return;

    window.addEventListener('scroll', ev => {
        particleContainer.style.transform = 'translateY(' + (window.scrollY*0.4) + 'px)';
        tnyLogo.style.transform = 'translateY(' + (window.scrollY*0.2) + 'px)';
    });
});

</script>

<style>
@import 'tailwindcss';

#header-zone {
    background: radial-gradient(ellipse 60% 40% at top center, rgb(255, 0, 255, 0.2) 0%, transparent 100%);
}

@keyframes ks-bg {
  from {
    -webkit-mask-position: 150%;
  }
  
  to {
    -webkit-mask-position: -50%;
  }
}

@keyframes anim-float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-0.8em); }
    100% { transform: translateY(0px); }
}

@keyframes anim-zoom {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.anim-float { animation: anim-float 3s infinite ease-in-out; }
.anim-zoom { animation: anim-zoom 5s infinite ease-in-out; }

.ks-btn {
    -webkit-mask-image: linear-gradient(-75deg, rgba(0,0,0,.7) 30%, #000 50%, rgba(0,0,0,.7) 70%);
    mask-image: linear-gradient(-75deg, rgba(0,0,0,.7) 30%, #000 50%, rgba(0,0,0,.7) 70%);
    -webkit-mask-size: 200%;
    mask-size: 200%;
    animation: ks-bg 2s infinite;
}

.what-we-do {
    background: linear-gradient(-160deg, transparent 50%, oklch(66.7% 0.295 322.15) 100%);
    box-shadow: 0px 8px 16px #1145, 32px 32px 96px -64px fuchsia;
}

.moi-img {
    filter: contrast(1) saturate(1) drop-shadow(0px 12px 32px rgb(255, 0, 255, 0.3));
}

.who-text-zone {
    background: linear-gradient(90deg, transparent 50%, oklch(66.7% 0.295 322.15) 100%);
    box-shadow: 32px 32px 96px -64px fuchsia;
}

.who-text-zone > div {
    background: linear-gradient(90deg, transparent 0%, oklch(98.4% 0.003 247.858) 30%, oklch(96.8% 0.007 247.896) 100%);
}

@media (prefers-color-scheme: dark) {
    .who-text-zone > div {
        background: linear-gradient(90deg, transparent 0%, oklch(27.9% 0.041 260.031) 30%, oklch(37.2% 0.044 257.287) 100%);
    }
}

.img-fuchsia {
    filter: brightness(100) saturate(100%) brightness(50%) sepia(100%) hue-rotate(220deg) saturate(8);
}

.tny-img {
    filter: drop-shadow(0px 8px 24px rgb(255, 0, 255, 0.1));
}

.drop-shadow-arrows {
    filter: drop-shadow(0px 0px 6px rgb(255, 0, 255, 0.8));
}

</style>