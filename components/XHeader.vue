<template>
    <div id="x-header" class="flex flex-col w-full h-fit z-50 sticky top-0 bg-slate-50 dark:bg-slate-800 transition-all" :class="onTop? 'shadow-xl': ''">
        <div class="flex w-full h-fit p-3">
            <div class="w-64">
                <NuxtLink to="/">
                    <img src="~/assets/logo.png" alt="TNY Robotics logo" class="w-8 h-8 invert-70 dark:invert-0" />
                </NuxtLink>
            </div>
            <div class="hidden lg:flex justify-center items-center w-full space-x-8">
                <UButton variant="ghost" :label="$t('index.name')" href="/" />
                <UButton variant="ghost" :label="$t('robots.name')" href="/robots" />
                <UButton variant="ghost" :label="$t('apps.name')" href="/apps" />
                <UButton variant="ghost" :label="$t('docs.name')" href="https://docs.tny-robotics.com" />
                <UButton variant="ghost" :label="$t('about.name')" href="/about" />
            </div>
            <div class="flex lg:hidden grow" />
            <div class="flex w-64 justify-end pr-2 lg:pr-0">
                <LangSwitcher class="hidden lg:flex" />
                <UButton icon="i-heroicons-bars-3" variant="ghost" class="flex lg:hidden p-0" size="xl" @click="toggleMobile" />
            </div>
        </div>
        <div ref="mobileHeader" class="flex w-full overflow-hidden transition-all" style="height: 0px;">
            <div class="flex flex-col lg:hidden items-center space-y-1 min-h-fit h-fit w-full">
                <UButton variant="ghost" :label="$t('index.name')" href="/" />
                <UButton variant="ghost" :label="$t('robots.name')" href="/robots" />
                <UButton variant="ghost" :label="$t('apps.name')" href="/apps" />
                <UButton variant="ghost" :label="$t('docs.name')" href="https://docs.tny-robotics.com" />
                <UButton variant="ghost" :label="$t('about.name')" href="/about" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const onTop = ref(false);
onMounted(() => {
    const header = document.getElementById('x-header');
    if (!header) return;
    window.addEventListener('scroll', ev => {
        const y = header.getBoundingClientRect().y;
        onTop.value = y < 5;
    });
});

const mobileHeader = ref<HTMLDivElement>();
function toggleMobile() {
    if (!mobileHeader || !mobileHeader.value) return;

    if (mobileHeader.value.style.height === '0px') {
        const height = mobileHeader.value.firstElementChild?.getBoundingClientRect().height;
        mobileHeader.value.style.height = height + 'px';
    } else {
        mobileHeader.value.style.height = '0px';
    }
}
</script>

<style></style>