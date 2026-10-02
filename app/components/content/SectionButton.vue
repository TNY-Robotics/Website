<template>
    <NuxtLink v-if="!disabled" :href="props.href" class="flex justify-start items-center my-4 max-w-3xl space-x-4 hover:bg-primary/10 transition-colors rounded-lg p-2">
        <div class="w-fit max-w-fit">
            <UIcon name="lucide:chevron-right" class="text-slate-700 dark:text-white w-12 h-12" />
        </div>
        <div class="flex flex-col space-y-2">
            <div class="flex justify-start items-center space-x-2">
                <UIcon :name="props.icon" class="text-primary w-6 h-6" />
                <ProseH3 class="m-0 p-0 text-primary">{{ props.title }}</ProseH3>
            </div>
            <ProseP class="m-0 p-0 text-slate-700 dark:text-white">{{ props.desc }}</ProseP>
        </div>
    </NuxtLink>
    <div v-else class="flex justify-start items-center my-4 max-w-3xl space-x-4 bg-slate-50 dark:bg-slate-800 rounded-lg p-2 opacity-50 cursor-not-allowed">
        <div class="w-fit max-w-fit">
            <UIcon name="lucide:chevron-right" class="text-slate-700 dark:text-white w-12 h-12" />
        </div>
        <div class="flex flex-col space-y-2">
            <div class="flex justify-start items-center space-x-2">
                <UIcon :name="props.icon" class="text-primary w-6 h-6" />
                <ProseH3 class="m-0 p-0 text-primary">{{ props.title }}</ProseH3>
            </div>
            <ProseP class="m-0 p-0 text-slate-700 dark:text-white">{{ props.desc }}</ProseP>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
</script>

<style></style>