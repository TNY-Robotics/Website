<template>
    <span class="inline-flex relative w-10 h-5 -mx-1">
        <div class="absolute flex justify-center items-center top-1 left-0 w-12 h-full -mx-1">
            <img :src="fileURL" class="w-12 h-12" />
        </div>
    </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
    name: string
}>();
const fileURL = `/docs/icons/${props.name}.svg`;
</script>