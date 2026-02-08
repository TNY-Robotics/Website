<template>
    <footer class="flex flex-col p-4 bg-slate-200 dark:bg-slate-900">
        <!-- <div class="flex w-dull h-fit">
            <div class="flex grow justify-center items-center p-2">
                coucou
            </div>
            <div class="flex min-h-full w-fit justify-center items-center">
                <span class="min-w-1 h-full rounded-full bg-slate-50 dark:bg-slate-700" />
            </div>
            <div class="flex grow justify-center items-center p-2">
                coucou
            </div>
        </div> -->
        <div class="flex w-full h-fit justify-center items-center p-2">
            <p class="text-center">
                &copy; {{ year }} TNY Robotics. {{ $t('footer.reserved') }}.
            </p>
        </div>
    </footer>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();
</script>
