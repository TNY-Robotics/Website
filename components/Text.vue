<template>
    <div class="space-y-2">
        <p v-for="line in t(label).split('\n')"> {{ line }} </p>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();

defineProps<{
    label: string,
}>();
</script>