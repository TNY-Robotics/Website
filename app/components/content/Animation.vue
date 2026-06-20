<template>
    <SmartVideo ref="video" :src="props.src" alt="Animation" class="rounded-lg bg-white dark:bg-slate-900" :style="{ transform: props.flip ? 'scaleX(-1)' : 'none' }" />
</template>

<script lang="ts" setup>
import SmartVideo from '../SmartVideo.vue';
const props = defineProps<{
    src: string;
    flip?: boolean;
}>();

</script>

<style>

</style>