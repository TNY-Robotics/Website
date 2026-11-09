<template>
    <div class="pcb-view">
        <div v-if="loading" class="w-full h-full flex justify-center items-center">
            <UIcon name="lucide:loader-circle" class="animate-spin w-12 h-12 text-slate-500" />
        </div>
        <div ref="svgContainer" class="pcb-view__svg h-full w-full" />
    </div>
</template>

<script setup lang="ts">
import { displaySVGLayers, fetchGerberFile, renderGerberSVGLayers, type PcbViewController, getViewBoxModel } from '~/utils/pcbGerber';

const props = withDefaults(defineProps<{
    root?: string;
    branch?: string;
    repo?: string;
    layer?: 'top' | 'bottom';
}>(), {
    root: 'PCBs/Analog Reader',
    branch: 'dev',
    repo: 'TNY-Robotics/TNY-360',
    layer: 'top',
});

const loading = ref(true);
const errorMessage = ref('');
const svgContainer = ref<HTMLDivElement | null>(null);
const viewController = ref<PcbViewController | null>(null);
type PendingViewAction =
    | { type: 'focus'; xMm: number; yMm: number; widthMm?: number }
    | { type: 'reset' };
const pendingViewAction = ref<PendingViewAction | null>(null);

defineExpose({
    focus: (xMm: number, yMm: number, widthMm?: number) => {
        if (viewController.value) {
            viewController.value.focus(xMm, yMm, widthMm);
        } else {
            pendingViewAction.value = { type: 'focus', xMm, yMm, widthMm };
        }
    },
    reset: () => {
        if (viewController.value) {
            viewController.value.reset();
        } else {
            pendingViewAction.value = { type: 'reset' };
        }
    },
    projectToViewbox: (point: { xMm: number; yMm: number }, root?: HTMLElement) => {
        return viewController.value?.projectToViewbox(point, root) ?? { x: 0, y: 0 };
    },
    getViewBoxModel: () => {
        return getViewBoxModel().value;
    },
});

function projectToViewbox(point: { xMm: number; yMm: number }) {
    return viewController.value?.projectToViewbox(point) ?? { x: 0, y: 0 };
}

onMounted(async () => {
    try {
        const gerberFile = await fetchGerberFile(props.root, props.repo, props.branch);
        const svgLayers = await renderGerberSVGLayers(gerberFile, { layer: props.layer });

        if (!svgContainer.value) throw new Error('SVG container not found.');
        viewController.value = await displaySVGLayers(svgContainer.value, svgLayers, props.layer === "bottom");
        const pendingAction = pendingViewAction.value;
        pendingViewAction.value = null;
        if (pendingAction?.type === 'focus') {
            viewController.value.focus(pendingAction.xMm, pendingAction.yMm, pendingAction.widthMm);
        } else if (pendingAction?.type === 'reset') {
            viewController.value.reset();
        }

    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : 'Could not load PCB preview.';
    } finally {
        loading.value = false;
    }
});
</script>
