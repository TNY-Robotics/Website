<template>
    <div :class="isVertical? 'w-fit py-2': 'h-fit w-full px-2'" class="flex grow p-1">
        <span :class="(isVertical? 'h-full w-' + width: 'w-full h-' + width) + ' ' + bgColor" class="flex rounded-full" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    vertical?: boolean
    color?: string
    size?: string
}>();
const isVertical = props.vertical ?? false;
const bgColor = props.color ?? 'bg-slate-200 dark:bg-slate-700';
const width = props.size ?? '1';
</script>

<style></style>