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

        <UModal v-model:open="modalOpenModel" :title="$t('newsletter.title')">
            <template #body>
                <div class="flex flex-col justify-start items-start space-y-4">
                    <p> <RichText path="newsletter.content" class="space-y-4" /> </p>
                    <div class="flex flex-col justify-center items-center w-full space-y-1">
                        <p class="font-semibold"> {{ $t('newsletter.release.title') }} </p>
                        <div class="bg-slate-200 dark:bg-slate-800 rounded py-2 px-4">
                            <p class="text-lg" style="font-family: monospace;"> {{ $t('newsletter.release.date') }} </p>
                        </div>
                    </div>
                    <UForm :schema="emailFormSchema" :state="emailFormState" @submit="onEmailFormSubmit" class="w-fit mx-auto text-center py-8 space-y-4">
                        <UFormField name="email" label="" class="">
                            <UInput v-model="emailFormState.email" type="email" :placeholder="$t('newsletter.emailPlaceholder')" :disabled="emailButtonDisabled" />
                        </UFormField>
                        <UAlert v-show="emailSent" variant="subtle" color="success" icon="lucide:check-circle" class="flex text-start justify-center items-center"
                            :title="$t('newsletter.success.title')"
                            :description="$t('newsletter.success.content')">
                        </UAlert>
                        <UAlert v-show="emailError" variant="subtle" color="error" icon="lucide:exclamation-circle" class="flex text-start justify-center items-center"
                            :title="$t('newsletter.error.title')"
                            :description="$t('newsletter.error.content')">
                        </UAlert>
                        <UAlert v-show="emailAlreadySent" variant="subtle" color="warning" icon="lucide:alert-triangle" class="flex text-start justify-center items-center"
                            :title="$t('newsletter.already.title')"
                            :description="$t('newsletter.already.content')">
                        </UAlert>
                        <UButton type="submit" :label="$t('newsletter.title')" size="lg" class="mt-4" :loading="emailButtonLoading" :disabled="emailButtonDisabled" />
                    </UForm>
                </div>
            </template>
        </UModal>
    </div>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui';
import { object, string, type InferType } from 'yup';

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
