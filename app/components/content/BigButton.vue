<template>
    <NuxtLink :to="href" class="flex justify-center items-center w-fit border-2 border-primary rounded-lg p-4 bg-transparent hover:bg-primary/10 transition-colors" :class="inline ? 'flex-row space-x-2' : 'flex-col space-y-2'">
        <div v-if="icon" class="flex justify-center">
            <UIcon :name="icon" class="w-8 h-8" />
        </div>
        <p class="text-lg"> {{ label }} </p>
    </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
    label: string
    href?: string
    icon?: string
    inline?: boolean
}>();
</script>

<style></style>