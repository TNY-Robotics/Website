<template>
    <div class="pt-24 lg:pt-32 flex flex-col space-y-4 justify-center items-center px-2">

        <div class="p-4 rounded-lg bg-slate-900 space-y-8 w-max lg:w-min max-w-full">
            <h1 class="text-3xl lg:text-4xl font-bold lg:whitespace-nowrap">
                <RichText path="qr.msg.title" />
            </h1>
            <p class="mt-4 text-left text-lg text-center">
                <RichText path="qr.msg.content" class="space-y-4" />
            </p>
            <div class="flex flex-col lg:flex-row w-full justify-between space-y-4 lg:space-y-0">
                <UButton :label="$t('qr.msg.learnMore')" size="xl" :href="`/tny-360`" target="_blank" variant="link" />
                <UButton :label="$t('tny360.header.button')" size="xl" @click="openModal()" />
            </div>
        </div>

        <UModal v-model:open="qrIDInvalidModalOpen" :closeable="false" :title="$t('qr.invalid.title')">
            <template #body>
                <RichText path="qr.invalid.content" class="space-y-2" />
            </template>
            <template #footer>
                <div class="flex justify-between w-full">
                    <UButton href="/" variant="ghost" icon="i-lucide-chevron-left">Accueil</UButton>
                    <UButton href="/docs" variant="solid" icon="i-lucide-chevron-right" trailing>Documentation</UButton>
                </div>
            </template>
        </UModal>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string[];
const qrID = slug[0]? slug[0].toLowerCase() : null;

const { openModal } = useNewsletter();

const redirections = {
    'pca9685': '/docs/TNY-360',
    '74hc4067': '/docs/TNY-360',
};

const qrIDInvalidModalOpen = ref(false);

onMounted(() => {
    if (!qrID) {
        return;
    }

    if (qrID in redirections) {
        setTimeout(() => {
            // window.location.href = redirections[qrID as keyof typeof redirections] as string;
        }, 2000);
    }
    else {
        // qrIDInvalidModalOpen.value = true;
        console.warn(`No redirection found for ID: ${qrID}`);
    }
});
</script>