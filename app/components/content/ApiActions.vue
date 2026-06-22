<template>
    <div class="flex flex-col gap-4">
        <ApiAction
            v-for="item in moduleActions"
            :key="item.action.name"
            :module="item.module"
            :action="item.action"
            :args="item.args"
            :result="item.result"
            :desc="item.desc"
            :impl="item.impl"
        />

        <div v-if="!moduleActions || moduleActions.length === 0" class="text-slate-600 dark:text-slate-300 italic">
            No actions found for module "{{ props.module }}"
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import apiModules from '~/assets/modules.json';

const props = defineProps({
    module: {
        type: String,
        required: true
    }
});

const moduleActions = computed(() => {
    return (apiModules as any)[props.module] || [];
});
</script>