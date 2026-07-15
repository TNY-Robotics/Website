<template>
    <div class="pt-24 lg:pt-32 flex flex-col space-y-4 justify-center items-center px-2">

        <div class="p-4 rounded-lg bg-slate-900 space-y-8 w-max max-w-full">
            <h1 class="text-3xl lg:text-4xl font-bold lg:whitespace-nowrap">
                <RichText path="qr.redirect.title" />
            </h1>
            <p class="mt-4 text-left text-lg text-center">
                <RichText path="qr.redirect.content" class="space-y-4" />
            </p>
        </div>

        <UModal v-model:open="qrIDInvalidModalOpen" :closeable="false" :title="$t('qr.invalid.title')">
            <template #body>
                <RichText path="qr.invalid.content" class="space-y-2" />
            </template>
            <template #footer>
                <div class="flex justify-between w-full">
                    <UButton href="/" variant="ghost" color="neutral">Accueil</UButton>
                    <UButton href="/docs" variant="solid" icon="lucide:chevron-right" trailing>Documentation</UButton>
                </div>
            </template>
        </UModal>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string[];
const qrID = slug[0]? slug[0].toLowerCase() : null;

const redirections = {
    'main-v1': '/docs/tny-360/anatomy/electronics/pcbs/main.v1.0',
    'reader-v1': '/docs/tny-360/anatomy/electronics/pcbs/reader.v1.0',
    'driver-v1': '/docs/tny-360/anatomy/electronics/pcbs/driver.v1.0',
    'plug-v1': '/docs/tny-360/anatomy/electronics/pcbs/plug.v1.0',
    'power-v1': '/docs/tny-360/anatomy/electronics/pcbs/power.v1.0',
    'paw-v1': '/docs/tny-360/anatomy/electronics/pcbs/paw.v1.0',
    'main-v1.2': '/docs/tny-360/anatomy/electronics/pcbs/main.v1.2',
    'driver-v1.1': '/docs/tny-360/anatomy/electronics/pcbs/driver.v1.1',
};

const qrIDInvalidModalOpen = ref(false);

onMounted(() => {
    if (!qrID) {
        return;
    }

    if (qrID in redirections) {
        setTimeout(() => {
            window.location.href = redirections[qrID as keyof typeof redirections] as string;
        }, 10);
    }
    else {
        qrIDInvalidModalOpen.value = true;
        console.warn(`No redirection found for ID: ${qrID}`);
    }
});
</script>