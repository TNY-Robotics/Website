<template>
    <div class="flex flex-col">
        <NuxtRouteAnnouncer />
        <UApp>
            <NuxtLayout>
                <HeaderBar />
                <NuxtPage class="overflow-x-hidden" />
            </NuxtLayout>
        </UApp>
        <TNYFooter />
        <LazyNewsletterModal v-model:open="modalOpenModel" />
    </div>
</template>

<script lang="ts" setup>
const { modalOpenModel } = useNewsletter();
</script>
