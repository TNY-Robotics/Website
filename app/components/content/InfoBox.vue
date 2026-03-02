<template>
    <div class="border-2 rounded-lg m-4" :class="customClasses">
        <div class="px-4 py-2" :class="['flex items-center space-x-2', customClasses]">
            <UIcon :name="boxIcon" class="w-5 h-5" />
            <h3 class="font-bold">{{ props.title }}</h3>
        </div>
        <div class="px-4">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    title: string,
    type: 'note' | 'warning' | 'danger' | 'tip' | 'info' | 'experimental',
}>()

const customClasses = computed(() => {
    switch (props.type) {
        case 'note': return 'border-blue-500 bg-blue-500/5';
        case 'warning': return 'border-yellow-500 bg-yellow-500/5';
        case 'danger': return 'border-red-500 bg-red-500/5';
        case 'tip': return 'border-green-500 bg-green-500/5';
        case 'info': return 'border-cyan-500 bg-cyan-500/5';
        case 'experimental': return 'border-purple-500 bg-purple-500/5';
    }
})
const boxIcon = computed(() => {
    switch (props.type) {
        case 'note': return 'i-lucide-sticky-note';
        case 'warning': return 'i-lucide-alert-triangle';
        case 'danger': return 'i-lucide-x-circle';
        case 'tip': return 'i-lucide-lightbulb';
        case 'info': return 'i-lucide-info';
        case 'experimental': return 'i-lucide-flask-conical';
    }
});
</script>

<style></style>