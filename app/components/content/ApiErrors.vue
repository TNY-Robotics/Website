<template>
    <div class="flex flex-col gap-4">
        <ApiError v-for="err in filteredErrors" :key="err.id" :errorData="err" />

        <div v-if="!filteredErrors || filteredErrors.length === 0" class="text-slate-600 dark:text-slate-300 italic">
            No errors found for module "{{ props.module }}"
        </div>
    </div>
</template>

<script setup>
import errorsData from '~/assets/errors.json';

const props = defineProps({
    module: {
        type: String,
        required: true
    }
});

const filteredErrors = computed(() => {
    return Object.values(errorsData).filter(err => {
        return err.id.toLowerCase().startsWith(props.module.toLowerCase());
    });
});
</script>