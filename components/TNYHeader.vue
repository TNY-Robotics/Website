<template>
    <div class="flex z-50 sticky top-0 h-fit w-full border-b-4 border-slate-700 dark:border-slate-500 bg-slate-50 dark:bg-slate-800">
        <div class="hidden md:flex w-full h-fit justify-between items-center px-4 py-2">
            <div class="flex space-x-4">
                <div v-for="link in headerLinks">
                    <UButton variant="link" size="xl" :padding="false" :to="link.link">{{ $t(`${link.name}.name`) }}</UButton>
                </div>
            </div>
            <div class="flex space-x-4">
                <ThemeSwitch class="hidden lg:flex" />
                <LangSwitch />
                <!-- <UButton variant="ghost" to="/register"> {{ $t('verbs.register') }} </UButton>
                <UButton to="/login"> {{ $t('verbs.login') }} </UButton> -->
            </div>
        </div>
        <div class="flex flex-col md:hidden w-full h-fit justify-center items-center p-1">
            <div class="flex w-full justify-between items-center">
                <div>
                    <UButton variant="link" to="/">
                        <h1 class="text-lg font-semibold text-primary"> TNY Robotics </h1>
                    </UButton>
                </div>
                <div>
                    <UButton variant="ghost" icon="i-heroicons-bars-3" size="xl" @click="toggleMobileMenu" />
                </div>
            </div>
            <div ref="mobileMenu" class="w-full overflow-hidden transition-all" style="max-height: 0px;">
                <div class="flex flex-col h-fit w-full space-y-2">
                    <div v-for="link in headerLinks" class="w-fit">
                        <UButton variant="link" size="xl" :padding="false" :to="link.link">{{ $t(`${link.name}.name`) }}</UButton>
                    </div>
                    <div class="flex w-full justify-between items-center p-2">
                        <ThemeSwitch />
                        <LangSwitch />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const route = useRoute();

const mobileMenu = ref<HTMLElement | null>(null);
function toggleMobileMenu() {
    if (!mobileMenu.value) return;

    if (mobileMenu.value.style.maxHeight === '0px') {
        const children = mobileMenu.value.firstElementChild;
        if (children) {
            mobileMenu.value.style.maxHeight = `${children.clientHeight}px`;
        }
    } else {
        mobileMenu.value.style.maxHeight = '0px';
    }
}

const headerLinks = [
    {
        name: 'home',
        link: '/'
    },
    {
        name: 'robots',
        link: '/robots'
    },
    {
        name: 'apps',
        link: '/apps'
    },
    {
        name: 'docs',
        link: 'https://docs.tny-robotics.com'
    },
    {
        name: 'about',
        link: '/about'
    }
];
</script>