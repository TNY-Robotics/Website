<template>
    <video v-if="!error" ref="video" :src="props.src" autoplay loop muted playsinline alt="Animation" class="rounded-lg bg-white dark:bg-slate-900" />
    <div v-if="error" class="text-red-500">
        Video not available (yet)
        <br>
        <p class="text-sm font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded text-slate-900 dark:text-white"> {{ videoPath }} </p>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    src: string;
}>();

const error = ref(false);
const video = ref<HTMLVideoElement | null>(null);

const videoPath = computed(() => {
    return props.src.substring('/docs/images/assembly/'.length);
});

onMounted(() => {
    if (video.value) {
        video.value.addEventListener('loadeddata', () => {
            error.value = false;
        });
        video.value.addEventListener('error', () => {
            error.value = true;
        });
    }
});

</script>

<style>

</style>