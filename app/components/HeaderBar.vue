<template>
    <div ref="parent" class="w-full h-fit text-slate-50">
        <div class="fixed flex flex-col w-full bg-slate-700 dark:bg-slate-700 transition-all z-50" :class="floating ? 'top-0 left-4 rounded-b-lg shadow-lg w-full-8 p-4 py-3' : 'top-0 left-0 p-6'">
            <div class="flex">
                <div class="w-fit items-center min-w-fit pr-3 transition-all xl:space-x-6 hidden lg:flex" :class="floating? 'pl-2': ''">
                    <img src="/icon.png" alt="TNY Robotics Logo" class="transition-all h-8 w-8" />
                    <h1 class="text-xl font-extrabold hidden xl:flex">TNY Robotics</h1>
                </div>
                <div class="grow w-fit px-4 hidden lg:flex">
                    <span class="flex grow w-1 rounded-full bg-slate-500 dark:bg-slate-500" />
                </div>
                <div class="items-center space-x-8 hidden lg:flex">
                    <UButton v-for="btn in buttons" :key="btn.label" :label="btn.label" variant="ghost" color="neutral" class="text-slate-200 hover:bg-slate-600 dark:text-slate-200" size="lg" :href="btn.href" />
                </div>
                <div class="flex lg:hidden justify-center items-center" :class="floating ? 'pl-2' : 'pr-0'">
                    <UButton icon="i-lucide-menu" size="xl" class="p-0 text-slate-200" variant="link" @click="toggleMobileMenu" />
                </div>
                <div class="flex w-full items-center justify-end space-x-4 transition-all" :class="floating ? 'pr-2' : 'pr-0'">
                    <LangSwitcher class="hidden xl:flex" />
                    <UButton label="Se préinscrire" size="lg" class="transition-all" />
                </div>
            </div>
            <div ref="mobileMenu" class="overflow-hidden w-full transition-all" style="max-height: 0px;">
                <div class="flex flex-col space-y-2 min-h-fit w-full pt-4">
                    <UButton v-for="btn in buttons" :key="btn.label" :label="btn.label" variant="soft" color="neutral" class="text-slate-200 hover:bg-slate-600 dark:text-slate-200" size="lg" :href="btn.href" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const parent = ref<HTMLElement|null>(null);
const floating = ref(false);

const route = useRoute();

const buttons = [
    { label: 'Accueil', href: '/' },
    { label: 'TNY - 360', href: '/tny-360' },
    { label: 'Éducation', href: '/edu' },
    { label: 'Logiciels', href: '/soft' },
    { label: 'Documentation', href: '/docs' },
    { label: 'À propos', href: '/about' },
];

const mobileMenu = ref<HTMLElement|null>(null);
function toggleMobileMenu() {
    if (!mobileMenu.value) return;
    if (mobileMenu.value.style.maxHeight === '0px') {
        const child = mobileMenu.value.firstElementChild;
        if (!child) return;
        const rect = child.getBoundingClientRect();
        mobileMenu.value.style.maxHeight = rect.height + 'px';
    } else {
        mobileMenu.value.style.maxHeight = '0px';
    }
}

function closeMobileMenu() {
    if (!mobileMenu.value) return;
    mobileMenu.value.style.maxHeight = '0px';
}

watch(() => route.path, () => {
    closeMobileMenu();
});

onMounted(() => {
    window.addEventListener('scroll', () => {
        if (!parent.value) return;
        floating.value = parent.value.getBoundingClientRect().top < 0;
    });
})
</script>

<style>
.w-full-8 {
    width: calc(100% - 2rem);
}
</style>