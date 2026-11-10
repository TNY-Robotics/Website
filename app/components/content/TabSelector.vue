<template>
    <div class="w-full">
        <div class="flex w-full bg-slate-200 dark:bg-slate-900 rounded-lg p-2">
            <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
                class="w-full p-2 border-2 rounded-md transition-all"
                :class="activeTab === tab ? 'border-primary-400 bg-primary/10' : 'border-transparent'">
                <p class="text-lg font-semibold"> {{ tab }} </p>
            </button>
        </div>
        <div class="w-full h-full">
            <slot v-if="activeTabIndex >= 0" :name="`tab-${activeTabIndex + 1}`" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    tabs: string,
    active: string
}>();

const tabs = computed(() => props.tabs.split(',').map(tab => tab.trim()));
const activeTab = ref(props.active || tabs.value[0]);
const activeTabIndex = computed(() => tabs.value.findIndex(tab => tab === activeTab.value));
</script>