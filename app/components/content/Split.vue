<template>
<div class="flex flex-col md:flex-row md:space-x-4 items-center">
    <div :class="side==='right'? 'w-full' : 'w-full md:w-1/2 justify-center items-center text-center flex'">
        <slot name="left" />
    </div>
    <div :class="side==='left'? 'w-full' : 'w-full md:w-1/2 justify-center items-center text-center flex'">
        <slot name="right" />
    </div>
</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    side: 'left' | 'right' | 'center'
}>();
</script>