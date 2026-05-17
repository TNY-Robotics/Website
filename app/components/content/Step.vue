<template>
<div class="flex flex-col md:flex-row md:space-x-4 items-center">
    <div class="w-full md:w-1/2 justify-center items-center text-center flex flex-col">
        <slot name="animation" />
    </div>
    <div class="w-full md:w-1/2">
        <slot name="text" />
    </div>
</div>
</template>

<script lang="ts" setup>

</script>