<template>
    <div class="flex flex-col grow pt-24 px-2 lg:px-4 pb-32 space-y-32">
        <div class="flex flex-col flex-col-reverse lg:flex-row space-x-8 w-full h-fit">
            <div class="flex lg:w-1/2 justify-center items-center lg:p-4">
                <div class="space-y-8 w-fit h-fit">
                    <h1 class="text-5xl font-extrabold">
                        <RichText path="software.coder.title" />
                    </h1>
                    <p class="text-2xl font-semibold">
                        <RichText path="software.coder.subtitle" />
                    </p>
                    <p class="text-lg">
                        <RichText path="software.coder.description" />
                    </p>
                </div>
            </div>
            <div class="flex lg:w-1/2 justify-center items-center lg:p-24 py-16">
                <img src="~/assets/img/TNY-Coder Preview-Dark.png" alt="TNY-Coder preview" class="hidden dark:flex tny-coder-preview drop-shadow-2xl drop-shadow-slate-900/50 border-4 border-white dark:border-slate-700 rounded-lg"/>
                <img src="~/assets/img/TNY-Coder Preview-Light.png" alt="TNY-Coder preview" class="flex dark:hidden tny-coder-preview drop-shadow-2xl drop-shadow-slate-900/50 border-4 border-slate-600 dark:border-slate-700 rounded-lg"/>
            </div>
        </div>
        <div class="flex flex-col w-full justify-center items-center">
            <div class="flex flex-col w-fit justify-center items-center pb-8">
                <h2 class="text-3xl lg:text-4xl font-bold">
                    <RichText path="software.coder.download" />
                </h2>
                <p class="lg:text-lg italic text-slate-600 dark:text-slate-300">
                    <RichText :path="`software.coder.lastVersion`" :args="{ version: latestVersion }" />
                </p>
            </div>
            <div class="flex flex-col lg:flex-row space-x-4 justify-evenly items-center w-fit">
                <div v-for="platform in platforms" :key="platform.name" class="flex flex-col justify-center items-center space-y-2 m-4 lg:m-8 p-4 m-4 border-2 rounded-lg w-64"
                    :class="userPlatform === platform.key? 'bg-primary-500/5 dark:bg-primary-800/5 border-primary-500 dark:border-primary-500 shadow-xl' : 'border-slate-200 dark:border-slate-700 shadow-lg'">
                    <UIcon :name="platform.icon" class="text-6xl"/>
                    <p class="text-xl font-semibold"> {{ platform.name }} </p>
                    <UButton class="mt-8" :href="platform.link??''" :disabled="!platform.link" :variant="userPlatform === platform.key? 'subtle' : 'ghost'">
                        <RichText :path="`software.coder.platforms.${platform.key}`" />
                    </UButton>
                </div>
            </div>
            <UButton :href="lastReleaseLink??''" :disabled="!lastReleaseLink" :label="$t('software.coder.downloadForOthers')" target="_blank" variant="link" color="neutral" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();

useSeoMeta({
    title: t('software.title'),
    description: t('software.description'),
    ogTitle: t('software.title'),
    ogDescription: t('software.description'),
    ogUrl: 'https://tny-robotics.com' + route.path,
    ogImage: 'https://tny-robotics.com/icon-border.png',
    ogType: 'website',
    keywords: 'software, application, page, website, robot, robotics, furwaz, tny, 360, dog, education, kit, build, learn, coding, programming, arduino, esp32',
});
useHead(() => ({
    link: [{ rel: 'canonical', href: 'https://tny-robotics.com' + route.path },],
    htmlAttrs: { lang: locale.value }
}));

const GITHUB_USER = 'TNY-Robotics';
const GITHUB_REPO = 'TNY-Coder';
const RELEASES_API_URL = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/releases/latest`;

const platforms = ref([
    { name: 'Windows', icon: 'mdi:microsoft-windows', key: 'windows', extension: '.exe', link: null as string|null },
    { name: 'macOS', icon: 'mdi:apple', key: 'macos', extension: '.dmg', link: null as string|null },
    { name: 'Linux', icon: 'mdi:linux', key: 'linux', extension: '.AppImage', link: null as string|null },
]);
const latestVersion = ref('...');
const userAgent = ref<string | null>(null);
const userPlatform = computed(() => {
    if (!userAgent.value) return null;

    const ua = userAgent.value.toLowerCase();
    if (ua.indexOf('windows') !== -1) return 'windows';
    if (ua.indexOf('macintosh') !== -1 || ua.indexOf('mac os x') !== -1) return 'macos';
    if (ua.indexOf('linux') !== -1) return 'linux';
    return null;
});
const lastReleaseLink = ref<string | null>(null);

onMounted(async () => {
    userAgent.value = navigator?.userAgent || navigator?.vendor || (window as any).opera;

    const releases_data: any = await fetch(RELEASES_API_URL).then(async response => await response.json());
    latestVersion.value = releases_data.name;
    lastReleaseLink.value = releases_data.html_url;

    const assets_url = releases_data.assets_url;
    const assets_data: any = await fetch(assets_url).then(async response => await response.json());

    for (const platform of platforms.value) {
        const asset = assets_data.find((a: any) => a.name.endsWith(platform.extension));
        if (asset) {
            platform.link = asset.browser_download_url;
        } else {
            console.error(`No asset found for ${platform.key}`);;
        }
    }
});

</script>

<style>
.tny-coder-preview {
    transform: perspective(800px) rotateY(-25deg) rotateX(10deg) translateX(-4%);
}
</style>