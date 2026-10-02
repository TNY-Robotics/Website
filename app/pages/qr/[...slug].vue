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
                    <UButton to="/" variant="ghost" color="neutral">Accueil</UButton>
                    <UButton to="/docs" variant="solid" icon="lucide:chevron-right" trailing>Documentation</UButton>
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
    // V2 links
    'reader-v2': '/docs/tny-360/understand-it/hardware/electrical/pcb-ecosystem/analog-reader/',
    'driver-v2': '/docs/tny-360/understand-it/hardware/electrical/pcb-ecosystem/motor-driver/',
    'main-v2': '/docs/tny-360/understand-it/hardware/electrical/pcb-ecosystem/main-board/',
    'backbone-v2': '/docs/tny-360/understand-it/hardware/electrical/pcb-ecosystem/backbone/',
    'power-v2': '/docs/tny-360/understand-it/hardware/electrical/pcb-ecosystem/power/',
    'buck-v2': '/docs/tny-360/understand-it/hardware/electrical/pcb-ecosystem/buck-converter/',
    'ext-v2': '/docs/tny-360/understand-it/hardware/electrical/pcb-ecosystem/extension-board/',
    'visor-v2': '/docs/tny-360/understand-it/hardware/electrical/pcb-ecosystem/visor-board/',

    // V1 links
    'main-v1': '/docs/tny-360/archive/v1/practical-guides/assembling/head/final.v1.2',
    'reader-v1': '/docs/tny-360/archive/v1/practical-guides/assembling/torso/components.v1.1',
    'driver-v1': '/docs/tny-360/archive/v1/practical-guides/assembling/torso/components.v1.1',
    'plug-v1': '/docs/tny-360/archive/v1/practical-guides/assembling/final/universal-mount',
    'power-v1': '/docs/tny-360/archive/v1/practical-guides/assembling/final/power',
    'paw-v1': '/docs/tny-360/archive/v1/practical-guides/assembling/torso/components.v1.1',
    'main-v1.2': '/docs/tny-360/archive/v1/practical-guides/assembling/head/final.v1.2',
    'driver-v1.1': '/docs/tny-360/archive/v1/practical-guides/assembling/torso/components.v1.1',
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