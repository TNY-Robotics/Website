<template>
    <UCheckbox v-model="checked" class="inline-flex" :label="label" />
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string
}>();

const checked = ref(false);

</script>