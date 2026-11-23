<template>
    <h2 :id="props.id" class="text-2xl font-bold mb-4">
        <slot />
    </h2>
</template>

<script setup lang="ts">
const props = defineProps<{
	id?: string
}>();
</script>
