<template>
    <div class="flex z-50 sticky top-0 h-fit w-full px-4 py-2 justify-between items-center border-b-4 border-slate-700 dark:border-slate-500 bg-slate-50 dark:bg-slate-800">
        <div class="flex space-x-4">
            <div v-for="link in headerLinks">
                <UButton variant="link" size="xl" :padding="false" :to="link.link">{{ $t(`${link.name}.name`) }}</UButton>
            </div>
        </div>
        <div class="flex space-x-4">
            <ThemeSwitch />
            <LangSwitch />
            <!-- <UButton variant="ghost" to="/register"> {{ $t('verbs.register') }} </UButton>
            <UButton to="/login"> {{ $t('verbs.login') }} </UButton> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const route = useRoute();

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