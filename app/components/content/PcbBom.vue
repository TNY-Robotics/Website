<template>
    <div class="my-6 h-[calc(100vh-12em)] md:h-[calc(100vh-16em)] min-h-0 overflow-hidden rounded-xl bg-white  dark:bg-slate-900">
        <div v-if="loading" class="flex min-h-48 items-center justify-center gap-2 p-6 text-slate-500">
            <UIcon name="i-lucide-loader-circle" class="animate-spin" />
            Loading BOM...
        </div>
        <UAlert v-else-if="errorMessage" color="error" variant="subtle" title="Could not load PCB files" :description="errorMessage" class="m-4" />
        <div v-else class="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)]">
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4 dark:border-slate-700">
                <div>
                    <h2 class="text-lg font-semibold">{{ rootLabel }}</h2>
                    <p class="text-sm text-slate-500">{{ completedCount }}/{{ items.length }} component groups placed</p>
                </div>
                <div class="flex gap-1">
                    <UButton v-for="face in faces" :key="face" :label="face" size="sm" :variant="activeFace === face ? 'solid' : 'ghost'" @click="activeFace = face" />
                </div>
            </div>
            <div class="grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] overflow-hidden md:grid-cols-[1fr_2fr] md:grid-rows-1">
                <div class="min-h-0 overflow-y-auto border-b border-slate-200 dark:border-slate-700 md:border-b-0 md:border-r">
                    <button
                        v-for="(item, index) in items"
                        :key="item.id"
                        type="button"
                        class="flex w-full items-center gap-3 border-b border-slate-100 p-3 text-left hover:bg-primary-50 dark:border-slate-800 dark:hover:bg-slate-800 rounded-lg transition-all"
                        :class="{ 'bg-primary-50 ring-2 ring-inset ring-primary-400 dark:bg-slate-800': index === activeIndex, 'opacity-60': item.done }"
                        @click="selectItem(index)"
                    >
                        <UCheckbox size="xl" :checked="item.done" @click.stop="toggleItem(index)" />
                        <span class="min-w-0 flex-1">
                            <span class="flex min-w-0 items-center gap-2">
                                <span class="min-w-0 truncate font-semibold">{{ item.description }}</span>
                                <UBadge v-if="item.lcsc" color="neutral" variant="subtle" size="sm" class="shrink-0">
                                    {{ item.lcsc }}
                                </UBadge>
                            </span>
                            <span class="block truncate text-sm text-slate-500">{{ item.componentType }} · {{ item.footprint }}</span>
                            <span class="block truncate text-xs text-slate-400">{{ item.designators.join(', ') }}</span>
                        </span>
                        <span class="text-sm text-slate-500">×{{ item.quantity }}</span>
                    </button>
                </div>
                <div class="relative min-h-0 overflow-hidden p-3">
                    <PcbView :key="activeFace" ref="pcbView" :root="root" :repo="repo" :branch="branch" :layer="activeFace === 'Top' ? 'top' : 'bottom'" class="w-full h-full" />
                    <div ref="highlightsContainer" class="pointer-events-none absolute inset-3 overflow-hidden">
                        <div v-for="highlight in selectedItemsBounds"
                            :key="highlight.xMm + '-' + highlight.yMm"
                            class="absolute w-0 h-0 flex justify-center items-center"
                            :style="{
                                top: `${pcbView?.projectToViewbox({ xMm: highlight.xMm, yMm: highlight.yMm }, highlightsContainer).y}px`,
                                left: `${pcbView?.projectToViewbox({ xMm: highlight.xMm, yMm: highlight.yMm }, highlightsContainer).x}px`,
                            }"
                        >
                            <span class="bg-slate-200 dark:bg-slate-800 border-2 border-primary-400 rounded px-2 py-0.2 whitespace-nowrap">
                                {{ highlight.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { loadPcbBom, type PcbBomItem } from '~/utils/pcbBom';

const props = withDefaults(defineProps<{ root: string; branch?: string; repo?: string }>(), {
    branch: 'dev',
    repo: 'TNY-Robotics/TNY-360',
});
const items = ref<PcbBomItem[]>([]);
const loading = ref(true);
const errorMessage = ref('');
const activeIndex = ref(0);
const activeFace = ref<'Top' | 'Bottom'>('Top');
const pcbView = ref<{
    focus: (xMm: number, yMm: number, widthMm?: number) => void;
    reset: () => void;
    projectToViewbox: (point: { xMm: number; yMm: number }, root?: HTMLElement) => { x: number; y: number };
} | null>(null);
const pendingFocusItem = ref<PcbBomItem | null>(null);
const faces = ['Top', 'Bottom'] as const;
const rootLabel = computed(() => props.root.split('/').pop() || props.root);
const repo = computed(() => props.repo);
const branch = computed(() => props.branch);
const completedCount = computed(() => items.value.filter((item) => item.done).length);

const selectedItemsBounds = computed(() => {
    if (activeIndex.value === -1) return null;
    const item = items.value[activeIndex.value];
    if (!item) return null;

    const placements = item.placements.filter((placement) => placement.layer === (activeFace.value === 'Top' ? 'T' : 'B'));
    if (!placements.length) return null;
    
    return placements.map((placement, index) => ({ xMm: placement.xMm, yMm: placement.yMm, name: item.designators[index] }));
});

const highlightsContainer = ref<HTMLDivElement>();

function focusItem(item: PcbBomItem, switchFace = true) {
    const side = activeFace.value === 'Top' ? 'T' : 'B';
    const placements = item.placements.filter((placement) => placement.layer === side);
    if (!placements.length) {
        const otherSide = activeFace.value === 'Top' ? 'B' : 'T';
        const otherPlacements = item.placements.filter((placement) => placement.layer === otherSide);
        if (switchFace && otherPlacements.length) {
            pendingFocusItem.value = item;
            activeFace.value = otherSide === 'T' ? 'Top' : 'Bottom';
            return;
        }
        pcbView.value?.reset();
        return;
    }
    const xs = placements.map((placement) => placement.xMm);
    const ys = placements.map((placement) => placement.yMm);
    const width = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys), 8) * 2;
    pcbView.value?.focus((Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2, width);
}
function selectItem(index: number) {
    if (index === activeIndex.value || index < 0 || index >= items.value.length) {
        activeIndex.value = -1;
        pcbView.value?.reset();
        return;
    }
    activeIndex.value = index;
    nextTick(() => focusItem(items.value[index] as PcbBomItem));
}
function toggleItem(index: number) {
    (items.value[index] as PcbBomItem).done = !(items.value[index] as PcbBomItem).done;
    if ((items.value[index] as PcbBomItem).done) {
        const next = items.value.findIndex((item, itemIndex) => itemIndex > index && !item.done);
        if (next !== -1) selectItem(next);
    } else selectItem(index);
}
watch(activeFace, async () => {
    await nextTick();
    await nextTick();
    const item = pendingFocusItem.value ?? items.value[activeIndex.value];
    pendingFocusItem.value = null;
    if (item) focusItem(item, false);
});
onMounted(async () => {
    try {
        const data = await loadPcbBom(props);
        items.value = data.items;
        await nextTick();
        if (items.value[0]) selectItem(0);
    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : 'Could not load PCB files.';
    } finally {
        loading.value = false;
    }
});
</script>
