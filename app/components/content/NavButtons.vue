<template>
    <div class="flex w-full justify-between items">
        <UButton v-if="props.left" :href="props.leftLink" variant="outline" size="md">
            <UIcon v-if="props.leftIcon" :name="props.leftIcon" class="w-4 h-4 mr-1" />
            {{ props.left }}
        </UButton>
        <span v-if="!props.left" />
        <UButton v-if="props.right" :href="props.rightLink" variant="outline" size="md">
            {{ props.right }}
            <UIcon v-if="props.rightIcon" :name="props.rightIcon" class="w-4 h-4 ml-1" />
        </UButton>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    right?: string,
    left?: string,
    rightLink?: string,
    leftLink?: string,
    rightIcon?: string,
    leftIcon?: string,
}>();

</script>

<style></style>