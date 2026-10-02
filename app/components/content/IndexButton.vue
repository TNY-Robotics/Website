<template>
    <NuxtLink :href="props.href" class="flex justify-start items-center border-2 border-primary rounded-lg p-2 lg:p-4 m-4 max-w-xl mx-auto space-x-4 hover:bg-primary/10 transition-colors">
        <div class="min-w-fit px-4">
            <UIcon :name="props.icon" class="w-12 h-12 text-primary" />
        </div>
        <div class="flex flex-col min-w-0 max-w-100 text-start">
            <ProseH3 class="m-0 p-0 text-primary">{{ props.title }}</ProseH3>
            <ProseP class="m-0 p-0 text-slate-900 dark:text-white">{{ props.desc }}</ProseP>
        </div>
    </NuxtLink>
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
    }
})
</script>

<style></style>