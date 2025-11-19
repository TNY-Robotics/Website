<template>
    <div class="space-y-32 pb-64">

        <!-- TNY PROMO HEADER -->
        <div class="flex flex-col justify-center items-center space-y-4 pt-32 lg:pt-64 py-16 lg:py-48 px-16 bg-white dark:bg-slate-900 overflow-hidden relative inset-shadow">
            <span class="absolute bg-slate-300 dark:bg-slate-600 shadow-xl w-12 lg:w-16 h-full right-0 bottom-0 translate-y-[30%] -translate-x-[200%] rotate-45"></span>
            <span class="absolute bg-slate-300 dark:bg-slate-600 shadow-xl w-16 lg:w-24 h-full right-0 bottom-0 translate-y-[30%]  translate-x-[50%] rotate-45"></span>
            <span class="absolute bg-primary-600 shadow-2xl w-32 lg:w-96 h-full left-0 bottom-0 scale-y-200 translate-x-[50%] rotate-45"></span>
            <span class="absolute bg-primary-600 shadow-2xl w-16 lg:w-32 h-full left-0 bottom-0 scale-y-200 -translate-x-[100%] rotate-45"></span>

            <TNYLogo class="w-32 lg:w-48 z-20 drop-shadow-lg drop-shadow-slate-800/30" />
            <p class="text-7xl lg:text-8xl font-extrabold z-20 drop-shadow-lg drop-shadow-slate-800/30 text-center">TNY Robotics</p>
            <p class="text-2xl font-semibold z-20 drop-shadow-lg drop-shadow-slate-800/30 text-center">Empowering curiosity. Unlocking capability.</p>
        </div>

        <!-- CONTENT -->
        <div class="flex flex-col lg:flex-row w-full h-fit pb-32">
            <div class="flex lg:w-1/2 justify-center items-center p-4 lg:p-8 max-w-128 lg:max-w-full">
                <img src="/tny-360.png" alt="TNY - 360 Picture" class="lg:w-2/3 drop-shadow-2xl drop-shadow-fuchsia-500/10 max-w-full">
            </div>
            <div class="flex lg:w-1/2 justify-center items-center p-4 lg:p-8">
                <div class="flex flex-col space-y-6 max-w-196 lg:max-w-2/3">
                    <div class="space-y-2">
                        <h1 class="text-4xl lg:text-6xl font-bold"> TNY - 360 </h1>
                        <p class="text-2xl"> Le meilleur robot quadrupède <span class="text-primary">Open-Source</span> pour apprendre <span class="text-primary">l'IA</span> et la <span class="text-primary">robotique</span>. </p>
                    </div>
                    <div>
                        <p class="text-md">Haute performance, assemblage facile, prix accessible.</p>
                        <p class="text-md">La robotique avancée enfin démocratisée</p>
                    </div>
                    <div class="pt-4">
                        <UButton label="En savoir plus" size="lg" trailing icon="i-lucide-arrow-right" href="/tny-360" />
                    </div>
                </div>
            </div>
        </div>
        <div class="relative flex flex-col justify-center space-y-16 w-full h-fit pb-48">
            <div class="absolute top-0 right-0 w-full h-full bg-slate-200 dark:bg-slate-900 -translate-y-16 -rotate-6 lg:-rotate-4 scale-y-110 scale-x-200"></div>

            <h2 class="text-center z-10 px-4">Pourquoi un <span class="text-primary whitespace-nowrap">TNY - 360</span> ?</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:flex xl:flex-row tems-center lg:justify-evenly z-10 mx-auto w-fit xl:w-full">
                <div class="max-w-64 bg-slate-50 dark:bg-slate-800 border-2 border-primary rounded-lg px-4 py-8 space-y-6 text-center shadow-lg overflow-hidden relative m-8">
                    <div class="absolute w-full h-full bg-gradient top-0 left-0"></div>
                    <UIcon name="i-lucide-zap" size="4em" class="text-primary" />
                    <h3 class="text-2xl font-bold"> Puissant </h3>
                    <p class="text-md"> Des moteurs puissants pour des mouvements explosifs </p>
                </div>
                <div class="max-w-64 bg-slate-50 dark:bg-slate-800 border-2 border-primary rounded-lg px-4 py-8 space-y-6 text-center shadow-lg overflow-hidden relative m-8">
                    <div class="absolute w-full h-full bg-gradient top-0 left-0"></div>
                    <UIcon name="i-lucide-earth" size="4em" class="text-primary" />
                    <h3 class="text-2xl font-bold"> Ouvert </h3>
                    <p class="text-md"> Un projet et des ressources disponibles partout, gratuitement </p>
                </div>
                <div class="max-w-64 bg-slate-50 dark:bg-slate-800 border-2 border-primary rounded-lg px-4 py-8 space-y-6 text-center shadow-lg overflow-hidden relative m-8">
                    <div class="absolute w-full h-full bg-gradient top-0 left-0"></div>
                    <UIcon name="i-lucide-book-open-text" size="4em" class="text-primary" />
                    <h3 class="text-2xl font-bold"> Documenté </h3>
                    <p class="text-md"> Des guides complets pour vous accompagner pas à pas </p>
                </div>
                <div class="max-w-64 bg-slate-50 dark:bg-slate-800 border-2 border-primary rounded-lg px-4 py-8 space-y-6 text-center shadow-lg overflow-hidden relative m-8">
                    <div class="absolute w-full h-full bg-gradient top-0 left-0"></div>
                    <UIcon name="i-lucide-puzzle" size="4em" class="text-primary" />
                    <h3 class="text-2xl font-bold"> Évolutif </h3>
                    <p class="text-md"> Une architecture modulaire pour ajouter vos propres capteurs et accessoires </p>
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-center space-y-16 w-full h-fit p-4">
            <h2 class="text-center">Qui <span class="text-primary">êtes</span> vous ?</h2>
            <div class="flex flex-col lg:flex-row w-full justify-evenly items-center space-y-8 lg:space-y-0 lg:space-x-4">
                <div class="flex flex-col justify-center items-start max-w-128 border-2 border-slate-200 dark:border-slate-700 shadow-lg rounded-lg p-4 pt-8 lg:p-8 space-y-8">
                    <div class="flex justify-center items-center w-full space-x-4">
                        <h3 class="text-xl lg:text-2xl font-bold text-center"> Un Passionné </h3>
                        <UIcon name="i-lucide-heart" size="2em" class="text-primary" />
                    </div>
                    <p> Vous adorez la robotique et l'IA, et vous voulez apprendre en construisant votre propre robot ! </p>
                    <UButton label="Voir les kits" size="lg" trailing icon="i-lucide-arrow-right" />
                </div>
                <div class="flex flex-col justify-center items-start max-w-128 border-2 border-slate-200 dark:border-slate-700 shadow-lg rounded-lg p-4 pt-8 lg:p-8 space-y-8">
                    <div class="flex justify-center items-center w-full space-x-4">
                        <h3 class="text-xl lg:text-2xl font-bold text-center"> Un enseignant/chercheur </h3>
                        <UIcon name="i-lucide-microscope" size="2em" class="text-primary" />
                    </div>
                    <p> Vous souhaitez intégrer un robot avancé et abordable dans vos cours ou vos projets de recherche. </p>
                    <UButton label="Voir l'offre éducation" size="lg" trailing icon="i-lucide-arrow-right" />
                </div>
            </div>
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

</script>

<style>
@import 'tailwindcss';

.inset-shadow {
    box-shadow: inset 0 0 50px rgba(74, 74, 107, 0.2);
}

.bg-gradient {
    background: radial-gradient(circle at 100% 100%, rgba(255, 0, 221, 0.02), transparent 60%), radial-gradient(circle at 50% 0%, rgba(255, 0, 221, 0.01), transparent 50%);
}
</style>