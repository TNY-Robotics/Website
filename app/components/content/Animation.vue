<template>
    <video :src="props.src" autoplay loop muted playsinline alt="Animation" class="rounded-lg bg-white dark:bg-slate-900" />
</template>

<script lang="ts" setup>
const props = defineProps<{
    src: string;
}>();
</script>

<style>

</style>