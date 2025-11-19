<template>
    <div class="flex flex-col">
        <NuxtRouteAnnouncer />
        <div class="flex flex-col grow">
            <HeaderBar />
            <NuxtPage class="overflow-x-hidden" />
        </div>
        <TNYFooter />

        <UModal title="Hey !" v-model:open="WIPModal">
            <template #body>
                <div class="flex flex-col justify-start items-start space-y-4">
                    <p> Ce site est actuellement <span class="font-bold">en cours de développement</span>. Certaines fonctionnalités peuvent ne pas être disponibles ou fonctionner de manière incorrecte. </p>
                    <p> N'hésitez pas à nous faire part de vos commentaires ou à signaler tout problème via notre page GitHub ou notre email de contact. </p>
                    <p> Merci de votre compréhension et de votre patience pendant que nous travaillons à l'amélioration du site ! </p>
                </div>
            </template>
            <template #footer>
                <div class="flex w-full justify-end">
                    <UButton label="Oki doki" size="lg" @click="WIPModal = false" />
                </div>
            </template>
        </UModal>
    </div>
</template>

<script lang="ts" setup>
const WIPModal = ref(true);
</script>
