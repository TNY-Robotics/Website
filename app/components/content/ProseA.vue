<template>
	<a :href="link" :rel="rel" class="text-primary-400 hover:underline" :target="isExternal ? '_blank' : undefined">
        <slot />
        <UIcon v-if="isExternal" :name="icon" class="h-4 w-4 ml-1" style="transform: translateY(2px);" />
	</a>
</template>

<script setup lang="ts">
const props = defineProps<{
	href?: string
	target?: string
	rel?: string
}>();

const link = computed(() => {
    if (props.href?.startsWith('+')) return props.href.slice(1);
    return props.href;
});

const isExternal = computed(() => {
    if (!props.href || !link.value) return false;
    if (props.href.startsWith('+')) return true;
    return link.value.startsWith('http://') || link.value.startsWith('https://') || link.value.startsWith('mailto:');
});
const icon = computed(() => {
    if (!isExternal.value) return '';
    if (!link.value) return '';
    if (link.value.startsWith('mailto:')) return 'lucide:mail';
    return 'lucide:external-link';
});
</script>
