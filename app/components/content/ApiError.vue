<template>
    <div class="relative p-4 w-full h-fit rounded-lg border-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <div class="flex items-center justify-between mb-4">
            <div class="flex justify-center items-center space-x-4">
                <ProseH3 :id="`error-${errorData.id}`" class="my-0"> {{ errorData.name }} </ProseH3>
                <ProseCode> {{ errorData.id }} </ProseCode>
            </div>
            <UTooltip :text="errorTypeTooltip">
                <div class="relative rounded px-2 py-1" :class="errorTypeBgColor">
                    <span class="font-semibold text-sm" :class="errorTypeTextColor">
                        {{ errorTypeText }}
                    </span>
                    <div v-if="false" class="bg-red-500/20 bg-yellow-500/20 bg-orange-500/20" />
                </div>
            </UTooltip>
        </div>

        <p class="text-slate-500 dark:text-slate-300 mb-4">{{ errorData.desc }}</p>

        <div class="flex flex-col space-y-2 bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg mb-4 border border-amber-200 dark:border-amber-900/50">
            <div class="flex space-x-2 text-amber-800 dark:text-amber-500 justify-start items-center">
                <UIcon name="lucide:wrench" />
                <strong class="block">How to fix:</strong>
            </div>
            <p class="text-amber-700 dark:text-amber-400 text-sm">{{ errorData.fix }}</p>
        </div>

        <div v-if="errorData.payload && errorData.payload.length > 0" class="flex flex-col space-y-8">
            <ProseH4 class="mt-0 font-medium"> Payload Data </ProseH4>
            <ul class="list-inside pl-4 space-y-2">
                <li v-for="item in errorData.payload" :key="item.name" class="space-x-2">
                    <span> {{ item.name }} </span>
                    <ProseCode>{{ item.type }}</ProseCode>
                    <p class="inline"> - </p>
                    <ProseP class="inline">
                        <em class="text-slate-600 dark:text-slate-300"> {{ item.desc }} </em>
                    </ProseP>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import typesData from '~/assets/types.json';

const props = defineProps({
    errorData: {
        type: Object as () => {
            id: string;
            name: string;
            desc: string;
            fix: string;
            payload: {
                name: string;
                type: string;
                desc: string;
            }[]
        },
        required: true
    }
});

const errorType = computed(() => {
    return props.errorData.id.substring(props.errorData.id.length - 2);
});
const errorTypeText = computed(() => {
    switch (errorType.value) {
        case '01' : return 'Trace';
        case '02' : return 'Warning';
        case '03' : return 'Error';
        case '04' : return 'Critical';
        default : return 'Unknown : ' + errorType.value;
    }
});
const errorTypeBgColor = computed(() => {
    switch (errorType.value) {
        case '02' : return 'bg-yellow-100 dark:bg-yellow-600/20';
        case '03' : return 'bg-orange-100 dark:bg-orange-600/20';
        case '04' : return 'bg-red-100 dark:bg-red-600/20';
        default : return 'bg-slate-100 dark:bg-slate-600/20';
    }
});
const errorTypeTextColor = computed(() => {
    switch (errorType.value) {
        case '02' : return 'text-yellow-800 dark:text-yellow-400';
        case '03' : return 'text-orange-800 dark:text-orange-400';
        case '04' : return 'text-red-800 dark:text-red-400';
        default : return 'text-slate-800 dark:text-slate-300';
    }
});

const errorLevelType = typesData['ErrorSeverity'] ?? null;
const errorTypeTooltip = computed(() => {
    if (!errorLevelType || !errorType.value) return '';
    return errorLevelType.values.find((item: { name: string }) => item.name.toLowerCase().trim() === errorTypeText.value.toLowerCase().trim())?.desc ?? 'No description available';
});
</script>