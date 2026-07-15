<template>
    <div ref="rootElement" class="flex flex-col space-y-3 pt-3 min-w-0 max-w-full w-full">
        <template v-for="item in tree.children" :key="item.name">
            <div v-if="item.isFolder" class="flex flex-col min-w-0 max-w-full w-full">
                <NuxtLink
                    :to="item.path"
                    class="flex space-x-4 w-full items-center justify-between min-w-0 max-w-full"
                >
                    <h2 class="whitespace-nowrap text-ellipsis min-w-0 max-w-full w-full overflow-hidden hover:underline" :class="otherStyle(item) + ' ' + (root? 'font-extrabold text-xl' : 'font-medium')">{{ item.name }}</h2>
                    <UButton v-if="item.children.length" icon="lucide:chevron-down" color="neutral"
                        @click="ev => onItemExpandClicked(ev, item)" size="xl" variant="link"
                        class="w-6 h-6 p-0 transition-all" :class="item.expanded?.value? '': 'rotate-90'" />
                </NuxtLink>
                <div v-if="item.children.length" :id="`docChildren-${item.name}`" class="flex h-fit w-full transition-all overflow-hidden" :style="item.expanded?.value? 'max-height: none;' : 'max-height: 0px;'">
                    <DocTreeView :tree="item" :root="false" :current-path="currentPath" class="h-fit w-full pl-4"
                        :class="root? '': 'border-l-2 border-slate-300 dark:border-slate-600'" />
                </div>
            </div>
            <div v-else class="min-w-0 max-w-full w-full">
                <NuxtLink
                    :to="item.path"
                    class="" :class="otherStyle(item)"
                >
                    <p class="whitespace-nowrap text-ellipsis min-w-0 max-w-full w-full overflow-hidden font-medium hover:underline"> {{ item.name }} </p>
                </NuxtLink>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    tree: DocFolder;
    currentPath?: string;
    root?: boolean;
}>();

const VERSION_REGEX = /v(\d+\.)+\d+$/;
function fileNameWithoutVersion(path: string) {
    return path.replace(VERSION_REGEX, '');
}

function isSelected(item?: DocItem) {
    if (!item) return false;
    if (!props.currentPath) return false;

    const path = fileNameWithoutVersion(item.path?.toLowerCase() || '');
    const curr = fileNameWithoutVersion(props.currentPath.toLowerCase());
    return path === '/'+curr ||
        path === curr ||
        path+'/index' === '/'+curr ||
        path+'/index' === curr;
}

function otherStyle(item?: DocItem) {
    return isSelected(item)? 'text-primary': '';
}

const rootElement = ref<HTMLElement|null>(null);
function onItemExpandClicked(ev: Event, item: DocFolder) {
    ev.preventDefault();
    item.expanded.value = !item.expanded.value;
}

if (props.root && (props.currentPath === '/docs' || props.currentPath === '/docs/')) {
    props.tree.children.forEach(child => {
        if (child.isFolder) {
            child.expanded.value = true;
        }
    });
}

props.tree.children.forEach(child => {
    if (isSelected(child) && child.isFolder) {
        child.expanded.value = true;
    }
});

</script>

<style></style>