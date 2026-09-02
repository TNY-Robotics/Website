<template>
    <UModal v-model:open="open" :title="$t('newsletter.title')">
        <template #body>
            <div class="flex flex-col justify-start items-start space-y-4">
                <p> <RichText path="newsletter.content" class="space-y-4" /> </p>
                <div class="flex flex-col justify-center items-center w-full space-y-2 py-4">
                    <p class="font-semibold"> {{ $t('newsletter.release.title') }} </p>
                    <div class="flex flex-col items-center bg-primary-300/15 dark:bg-primary-300/10 rounded-lg py-2 px-4 border-primary-500/50 border-2 shadow-xl shadow-primary-500/15">
                        <p class="text-xl font-semibold p-2 text-primary-400"> {{ stringifiedReleaseDate }} </p>
                        <div class="flex space-x-2 py-2">
                            <div class="flex flex-col items-center bg-white dark:bg-slate-900 rounded py-0.5 px-2">
                                <p class="text-sm font-semibold"> {{ $t('newsletter.release.days') }} </p>
                                <p class="text-lg" style="font-family: monospace;">{{ counter?.days }}</p>
                            </div>
                            <div class="flex flex-col items-center bg-white dark:bg-slate-900 rounded py-0.5 px-2">
                                <p class="text-sm font-semibold"> {{ $t('newsletter.release.hours') }} </p>
                                <p class="text-lg" style="font-family: monospace;">{{ counter?.hours }}</p>
                            </div>
                            <div class="flex flex-col items-center bg-white dark:bg-slate-900 rounded py-0.5 px-2">
                                <p class="text-sm font-semibold"> {{ $t('newsletter.release.minutes') }} </p>
                                <p class="text-lg" style="font-family: monospace;">{{ counter?.minutes }}</p>
                            </div>
                            <div class="flex flex-col items-center bg-white dark:bg-slate-900 rounded py-0.5 px-2">
                                <p class="text-sm font-semibold"> {{ $t('newsletter.release.seconds') }} </p>
                                <p class="text-lg" style="font-family: monospace;">{{ counter?.seconds }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="isDowntime" class="p-4 rounded-lg border-2 border-orange-500/40 bg-orange-500/20 w-full text-center">
                    <RichText path="newsletter.downtime" class="space-y-2" />
                </div>
                <UForm v-else :schema="emailFormSchema" :state="emailFormState" @submit="onEmailFormSubmit" class="w-fit mx-auto text-center py-8 space-y-4">
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
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui';
import { object, string, type InferType } from 'yup';

const { locale } = useI18n();
const open = defineModel<boolean>('open', { default: false });
const runtimeConfig = useRuntimeConfig()
const isDowntime = runtimeConfig.public.downtimeMode === 'true'

const emailFormSchema = object({
    email: string().email('Please enter a valid email address').required('Email is required'),
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

const releaseDate = new Date('2026-10-01');

const stringifiedReleaseDate = computed(() => releaseDate.toLocaleDateString(
    locale.value === 'fr' ? 'fr-FR' : 'en-US',
    locale.value === 'fr' ? { year: 'numeric', month: 'long', day: 'numeric' } : { year: 'numeric', month: 'long', day: 'numeric' }
));
const counter = ref<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
onMounted(() => {
    setInterval(() => {
        const now = new Date();
        const diff = releaseDate.getTime() - now.getTime();
        if (diff <= 0) {
            return null;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        counter.value = { days, hours, minutes, seconds };
    }, 1000);
})

</script>