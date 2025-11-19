<template>
    <div class="flex flex-col space-y-2">
        <template v-for="item in tree.children" :key="item.name">
            <div v-if="item.isFolder" class="flex flex-col space-y-1">
                <NuxtLink
                    :to="item.path"
                    class="flex space-x-2 items-center justify-start"
                >
                    <UIcon name="i-lucide-folder" class="w-4 h-4" />
                    <h2 class="font-semibold hover:underline" :class="otherStyle(item)">{{ item.name }}</h2>
                </NuxtLink>
                <DocTreeView :tree="item" :current-path="currentPath" class="border-l border-slate-500 pl-4" />
            </div>
            <div v-else>
                <NuxtLink
                    :to="item.path"
                    class="font-semibold hover:underline" :class="otherStyle(item)"
                >
                    {{ item.name }}
                </NuxtLink>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    tree: DocFolder;
    currentPath?: string;
}>();

function otherStyle(item?: DocItem) {
    if (!item) return '';
    if (!props.currentPath) return '';

    const path = item.path?.toLowerCase();
    const curr = props.currentPath.toLowerCase();
    if (path === '/'+curr ||
        path === curr ||
        path+'/index' === '/'+curr ||
        path+'/index' === curr) {
        return 'text-primary';
    }
    return '';
}
</script>

<style></style>