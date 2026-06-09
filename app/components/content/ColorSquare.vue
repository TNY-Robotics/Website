<template>
    <b :style="{ backgroundColor: color, padding: '0 0 0 23px' }" class="rounded-md mr-1"></b>
</template>

<script lang="ts" setup>
const props = defineProps<{
    color: string
}>();
</script>