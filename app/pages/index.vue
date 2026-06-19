<template>
    <div class="flex flex-col space-y-32 pb-32">

        <!-- TNY PROMO HEADER -->
        <div class="flex flex-col justify-center items-center space-y-4 pt-32 lg:pt-64 py-16 lg:py-48 px-16 bg-white dark:bg-slate-900 overflow-hidden relative inset-shadow">
            <div ref="headerBg" class="absolute top-0 left-0 w-full h-full bg-header-gradient overflow-hidden">
                <div
                    v-for="(particle, index) in hexParticles"
                    :key="particle.id" class="show" :style="{ animationDelay: `${index * 10}ms` }"
                > <span class="hex-particle absolute" :style="particle.style" /> </div>
            </div>
            <span class="show-left absolute bg-slate-300 dark:bg-slate-600 shadow-xl w-12 lg:w-16 h-full right-0 bottom-0 translate-y-[30%] -translate-x-[200%] rotate-45"></span>
            <span class="show-left absolute bg-slate-300 dark:bg-slate-600 shadow-xl w-16 lg:w-24 h-full right-0 bottom-0 translate-y-[30%]  translate-x-[50%] rotate-45"></span>
            <span class="show-right absolute bg-primary-600 shadow-2xl w-32 lg:w-96 h-full left-0 bottom-0 scale-y-200 translate-x-[50%] rotate-45"></span>
            <span class="show-right absolute bg-primary-600 shadow-2xl w-16 lg:w-32 h-full left-0 bottom-0 scale-y-200 -translate-x-[100%] rotate-45"></span>

            <TNYLogo class="show-up w-32 lg:w-48 z-20 drop-shadow-lg drop-shadow-slate-800/30" />
            <p class="show-up text-7xl lg:text-8xl font-extrabold z-20 drop-shadow-lg drop-shadow-slate-800/30 text-center">TNY Robotics</p>
            <p class="show-up delay-100 text-2xl font-semibold z-20 drop-shadow-lg drop-shadow-slate-800/30 text-center">Empowering curiosity. Unlocking capability.</p>
        </div>

        <!-- CONTENT -->
        <div class="flex flex-col justify-center items-center max-w-270 h-fit m-auto pb-32 p-2">
            <div class="show-up p-1 rounded-2xl bg-white dark:bg-slate-900 gradient-border shadow-xl" v-show-on-display>
                <div class="flex flex-col space-y-4 rounded-xl py-4 px-4 lg:py-8 lg:px-16 bg-slate-100 dark:bg-slate-900">
                    <div class="flex w-full justify-center items-center">
                        <h2 class="subtitle text-center"> <RichText path="index.tny360.title" /> </h2>
                    </div>
                    <div class="flex lg:flex-row flex-col space-x-8">
                        <div class="flex w-full lg:w-1/2 justify-center items-center">
                            <!-- <video v-if="darkMode" autoplay muted loop playsinline loading="lazy" class="w-full">
                                <source src="/tny-360/happy-dark.mp4" type="video/mp4" />
                            </video>
                            <video v-else autoplay muted loop playsinline loading="lazy" class="w-full">
                                <source src="/tny-360/happy-light.mp4" type="video/mp4" />
                            </video> -->
                            <SmartVideo src="/tny-360/happy-dark.mp4" poster="/tny-360/happy-dark.webp" v-if="darkMode" />
                            <SmartVideo src="/tny-360/happy-light.mp4" poster="/tny-360/happy-light.webp" v-else />
                        </div>
                        <div class="flex flex-col w-full lg:w-1/2 justify-center items-start space-y-8">
                            <p class="text-lg"> <RichText path="index.tny360.desc" class="space-y-4" /> </p>
                            <UButton to="/tny-360" variant="solid" size="md" :label="$t('index.tny360.button')" icon="lucide:chevron-right" trailing />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col w-full p-2 lg:p-8 max-w-270 m-auto">
            <div class="flex w-full justify-center items-center p-8">
                <h2 class="subtitle"> <RichText path="index.values.title" /> </h2>
            </div>
            <div class="flex flex-col space-y-16 w-full justify-start items-center">
                <div class="show-up flex flex-col w-full space-y-2" v-show-on-display>
                    <div class="flex space-x-4 justify-start items-center">
                        <div class="flex justify-center items-center min-w-16 h-16 border-2 rounded-xl border-primary-500">
                            <p class="text-slate-900 dark:text-white text-3xl font-bold"> 1 </p>
                        </div>
                        <h3 class="subsubtitle"> <RichText path="index.values.1.title" /> </h3>
                    </div>
                    <div class="pl-8">
                        <div class="pl-12 space-y-2 border-l-2 border-dashed border-primary-500">
                            <p class="text-lg" > <RichText path="index.values.1.desc" class="space-y-2" /> </p>
                        </div>
                    </div>
                </div>
                <div class="show-up flex flex-col w-full space-y-2" v-show-on-display>
                    <div class="flex space-x-4 justify-start items-center">
                        <div class="flex justify-center items-center min-w-16 h-16 border-2 rounded-xl border-primary-500">
                            <p class="text-slate-900 dark:text-white text-3xl font-bold"> 2 </p>
                        </div>
                        <h3 class="subsubtitle"> <RichText path="index.values.2.title" /> </h3>
                    </div>
                    <div class="pl-8">
                        <div class="pl-12 space-y-2 text-lg border-l-2 border-dashed border-primary-500">
                            <p class="text-lg"> <RichText path="index.values.2.desc" class="space-y-2" /> </p>
                        </div>
                    </div>
                </div>
                <div class="show-up flex flex-col w-full space-y-2" v-show-on-display>
                    <div class="flex space-x-4 justify-start items-center">
                        <div class="flex justify-center items-center min-w-16 h-16 border-2 rounded-xl border-primary-500">
                            <p class="text-slate-900 dark:text-white text-3xl font-bold"> 3 </p>
                        </div>
                        <h3 class="subsubtitle"> <RichText path="index.values.3.title" /> </h3>
                    </div>
                    <div class="pl-8">
                        <div class="pl-12 space-y-2 text-lg border-l-2 border-dashed border-primary-500">
                            <p class="text-lg"> <RichText path="index.values.3.desc" class="space-y-2" /> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col justify-center space-y-16 w-full h-fit p-4 pt-32">
            <div class="relative flex w-full h-128">
                <NuxtLink to="https://www.instagram.com/furwaz_" target="_blank">
                    <div class="absolute flex flex-col items-center top-[60%] md:left-[24%] -rotate-15 drop-shadow-2xl drop-shadow-primary scale-100 hover:scale-110 transition-transform">
                        <UIcon name="mdi:instagram" size="7em" class="text-primary" />
                        <RichText path="index.follow.instagram.title" class="text-primary font-bold" />
                    </div>
                </NuxtLink>
                <NuxtLink to="https://www.tiktok.com/@furwaz_" target="_blank">
                    <div class="absolute flex flex-col items-center top-[20%] md:left-[37%] -rotate-6 drop-shadow-2xl drop-shadow-primary scale-100 hover:scale-110 transition-transform">
                        <UIcon name="ic:baseline-tiktok" size="7em" class="text-primary" />
                        <RichText path="index.follow.tiktok.title" class="text-primary font-bold" />
                    </div>
                </NuxtLink>
                <NuxtLink to="https://discord.gg/XGABkx5A4y" target="_blank">
                    <div class="absolute flex flex-col items-center top-[16%] left-[55%] rotate-8 drop-shadow-2xl drop-shadow-primary scale-100 hover:scale-110 transition-transform">
                        <UIcon name="ic:baseline-discord" size="7em" class="text-primary" />
                        <RichText path="index.follow.discord.title" class="text-primary font-bold" />
                    </div>
                </NuxtLink>
                <NuxtLink to="https://www.youtube.com/@furwaz" target="_blank">
                    <div class="absolute flex flex-col items-center top-[70%] left-[69%] rotate-27 drop-shadow-2xl drop-shadow-primary scale-100 hover:scale-110 transition-transform">
                        <UIcon name="mdi:youtube" size="7em" class="text-primary" />
                        <RichText path="index.follow.youtube.title" class="text-primary font-bold" />
                    </div>
                </NuxtLink>
            </div>
            <h2 class="subtitle text-center xl:-translate-y-50 pointer-events-none"><RichText path="index.follow.title" /></h2>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title: t('index.name'),
    description: t('index.description'),
    ogTitle: t('index.name'),
    ogDescription: t('index.description'),
    ogUrl: 'https://tny-robotics.com' + route.path,
    ogImage: 'https://tny-robotics.com/icon-border.png',
    ogType: 'website',
    keywords: 'home, page, website, robot, robotics, furwaz, tny, 360, dog, education, kit, build, learn, coding, programming, arduino, esp32',
});
useHead(() => ({
    link: [ {rel: 'canonical', href: 'https://tny-robotics.com' + route.path}, ],
    htmlAttrs: { lang: locale.value }
}));

const hexParticles = ref<Array<{ id: number; style: Record<string, string> }>>([]);

const createHexParticles = (count = 48) => {
    hexParticles.value = Array.from({ length: count }, (_, id) => {
        const size = 4 + Math.random() * 14;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 8 + Math.random() * 12;
        const delay = Math.random() * 10;
        const drift = (Math.random() * 2 - 1) * 120;

        return {
            id,
            style: {
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size * 1.1}px`,
                animationDuration: `${duration}s`,
                animationDelay: `-${delay}s`,
                '--drift': `${drift}px`,
            },
        };
    });
};

const darkMode = ref(false);
onMounted(() => {
    darkMode.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        darkMode.value = e.matches;
    });

    createHexParticles();
});

</script>

<style>
@import 'tailwindcss';

.inset-shadow {
    box-shadow: inset 0 0 50px rgba(74, 74, 107, 0.2);
}

.drop-shadow-primary {
    filter: drop-shadow(0 4px 20px rgba(249, 76, 255, 0.418));
}

.hex-particle {
    clip-path: polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%);
    background: #ff00ff;
    animation-name: hex-float;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    opacity: 0;
}

@keyframes hex-float {
    0% {
        transform: translate3d(0, 18px, 0) scale(0.35) rotate(0deg);
        opacity: 0;
    }
    15% {
        opacity: 0.8;
    }
    50% {
        transform: translate3d(var(--drift), -26px, 0) scale(1) rotate(180deg);
        opacity: 0.9;
    }
    85% {
        opacity: 0.7;
    }
    100% {
        transform: translate3d(calc(var(--drift) * -0.2), -64px, 0) scale(0.45) rotate(360deg);
        opacity: 0;
    }
}

.gradient-border {
    background: radial-gradient(circle at 0% 100%, rgba(255, 0, 255, 0.4), transparent), #0f172b;
    background-size: 100% 100%;
    background-position: 0% 0%;
}

.gradient-bg {
    background: radial-gradient(circle at 0% 100%, rgba(255, 0, 255, 0.1), transparent), #0f172b;
    background-size: 100% 100%;
    background-position: 0% 0%;
}

@media (prefers-color-scheme: light) {
    .gradient-border {
        background: radial-gradient(circle at 0% 100%, rgba(255, 0, 255, 0.3), transparent), #ffffff;
    }
    .gradient-bg {
        background: radial-gradient(circle at 0% 100%, rgba(255, 0, 255, 0.1), transparent), #ffffff;
    }
}
</style>