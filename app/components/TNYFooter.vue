<template>
    <footer class="flex flex-col p-4 bg-slate-200 dark:bg-slate-900">
        <div class="flex flex-col lg:flex-row w-full h-fit">
            <div class="flex lg:max-w-1/2 lg:w-1/2 justify-center items-center p-2">
                <div class="flex w-full h-fit justify-center items-center p-2">
                    <p class="text-center">
                        &copy; {{ year }} TNY Robotics. {{ $t('footer.reserved') }}.
                    </p>
                </div>
            </div>
            <div class="hidden lg:flex min-h-full w-fit justify-center items-center">
                <span class="min-w-1 h-full rounded-full bg-slate-50 dark:bg-slate-700" />
            </div>
            <div class="flex lg:max-w-1/2 lg:w-1/2 justify-center items-center p-2">
                <div class="flex flex-wrap p-2 justify-center">
                    <NuxtLink class="p-4 hover:underline text-center" to="/docs/tny-robotics/legal-notice">{{ $t('footer.legalNotice') }}</NuxtLink>
                    <NuxtLink class="p-4 hover:underline text-center" to="/docs/tny-robotics/terms-of-service">{{ $t('footer.termsService') }}</NuxtLink>
                    <NuxtLink class="p-4 hover:underline text-center" to="/docs/tny-robotics/privacy-policy">{{ $t('footer.privacyPolicy') }}</NuxtLink>
                    <NuxtLink class="p-4 hover:underline text-center" to="/docs/tny-robotics/terms-of-sale">{{ $t('footer.termsSale') }}</NuxtLink>
                    <NuxtLink class="p-4 hover:underline text-center" to="/docs/tny-robotics/return-policy">{{ $t('footer.returnPolicy') }}</NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();
</script>
