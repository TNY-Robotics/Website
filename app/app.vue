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

        <UModal v-model:open="modalOpenModel" title="Rejoindre la liste d'attente">
            <template #body>
                <div class="flex flex-col justify-start items-start space-y-4">
                    <p> Inscrivez-vous à notre liste d'attente pour être informé de la sortie officielle du <span class="text-primary">TNY - 360</span> ! </p>
                    <p> En vous inscrivant, vous recevrez des mises à jour exclusives, des offres spéciales et la possibilité de précommander le robot avant son lancement public. </p>
                    <UForm :schema="emailFormSchema" :state="emailFormState" @submit="onEmailFormSubmit" class="w-fit mx-auto text-center py-8 space-y-4">
                        <UFormField name="email" label="" class="">
                            <UInput v-model="emailFormState.email" type="email" placeholder="john.doe@exemple.com" :disabled="emailButtonDisabled" />
                        </UFormField>
                        <UAlert v-show="emailSent" variant="subtle" color="success" icon="i-heroicons-check-circle-20-solid" class="flex text-start justify-center items-center"
                            title="Inscription réussie !"
                            description="Merci de vous être inscrit à la liste d'attente ! Nous vous enverrons bientôt des nouvelles.">
                        </UAlert>
                        <UAlert v-show="emailError" variant="subtle" color="error" icon="i-heroicons-exclamation-circle-20-solid" class="flex text-start justify-center items-center"
                            title="Woops ! Une erreur est survenue."
                            description="Désolé, nous n'avons pas pu traiter votre inscription. Veuillez réessayer plus tard.">
                        </UAlert>
                        <UAlert v-show="emailAlreadySent" variant="subtle" color="warning" icon="i-heroicons-exclamation-triangle-20-solid" class="flex text-start justify-center items-center"
                            title="Vous êtes déjà inscrit !"
                            description="Il semble que cette adresse e-mail soit déjà inscrite à la liste d'attente. Pas besoin de s'inscrire à nouveau !">
                        </UAlert>
                        <UButton type="submit" label="Rejoindre la liste d'attente" size="lg" class="mt-4" :loading="emailButtonLoading" :disabled="emailButtonDisabled" />
                    </UForm>
                </div>
            </template>
        </UModal>
    </div>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui';
import { object, string, type InferType } from 'yup';

const WIPModal = ref(true);

const { modalOpenModel } = useNewsletter();

const emailFormSchema = object({
    email: string().email('Veuillez entrer une adresse e-mail valide').required('L\'adresse e-mail est requise'),
});
const emailFormState = reactive({
    email: '',
});
const emailButtonLoading = ref(false);
const emailSent = ref(false);
const emailError = ref(false);
const emailAlreadySent = ref(false);
const emailButtonDisabled = computed(() => {
    return emailButtonLoading.value || emailSent.value;
});

type EmailFFormSchema = InferType<typeof emailFormSchema>;

async function onEmailFormSubmit(event: FormSubmitEvent<EmailFFormSchema>) {
    emailButtonLoading.value = true;
    try {
        const res = await fetch('https://api.tny-robotics.com/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: event.data.email }),
        });
        if (res.status === 409) {
            emailAlreadySent.value = true;
            emailError.value = false;
            emailSent.value = false;
            return;
        }
        emailAlreadySent.value = false;
        emailError.value = false;
        emailSent.value = true;
    } catch (error) {
        console.error('Erreur lors de l\'inscription à la liste d\'attente :', error);
        emailError.value = true;
        emailSent.value = false;
        emailAlreadySent.value = false;
    } finally {
        emailButtonLoading.value = false;
    }
}
</script>
