<template>
    <div ref="parent" class="my-6 h-[calc(100vh-12em)] md:h-[calc(100vh-16em)] min-h-0 overflow-hidden rounded-xl bg-white dark:bg-slate-900">
        <div v-if="assemblyTreeRootStatus === undefined" class="p-4">
            Loading assembly...
        </div>
        <div v-else-if="assemblyTreeRootStatus === null" class="p-4">
            Error loading assembly.
        </div>
        <div v-else class="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)]">
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4 dark:border-slate-700">
                <div>
                    <h2 class="text-lg font-semibold"> {{ currentAssemblyStepPath.concat(currentAssemblyStep?.name ?? '').join(' > ') }} </h2>
                    <p class="text-sm text-slate-500"> {{ currentAssemblyStep?.parent?.steps?.length }} steps </p>
                </div>
                <div class="flex gap-1">
                    <UButton :icon="isFullscreen? 'lucide:shrink': 'lucide:expand'" variant="ghost" color="neutral" size="xl" @click="toggleFullscreen" />
                </div>
            </div>
            <div class="grid min-h-0 grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 divide-x-0 divide-y-2 md:divide-x-2 md:divide-y-0 divide-slate-200 dark:divide-slate-700">
                <div class="flex flex-col min-h-0 p-4 max-w-full overflow-auto space-y-4">
                    <Markdown v-if="currentAssemblyStep?.content" :components="customComponents"> {{ currentAssemblyStep.content.join('\n') }} </Markdown>
                </div>
                <div class="flex flex-col min-h-0 p-4">
                    <div class="flex flex-col grow w-full max-w-full min-w-0 overflow-auto">
                        <img v-if="currentAssemblyStep?.image?.length" :src="currentAssemblyStepImageSrc"
                            class="w-full bg-white dark:bg-slate-950 rounded-lg border-none h-fit min-h-0 object-contain"
                        />
                    </div>
                    <div class="flex justify-between items-center">
                        <UButton icon="lucide:chevron-left" variant="soft" color="neutral" size="xl" label="Prev" :disabled="prevAssemblyStepStatus === null" :loading="prevAssemblyStepStatus === undefined" @click="onPrevClicked" />
                        <div class="w-fit h-fit">
                            {{ currentAssemblyStepIndex + 1 }} / {{ currentAssemblyStep?.parent?.steps?.length }}
                        </div>
                        <UButton icon="lucide:chevron-right" trailing variant="soft" size="xl" label="Next" :disabled="nextAssemblyStepStatus === null" :loading="nextAssemblyStepStatus === undefined" @click="onNextClicked" />
                    </div>
                </div>
            </div>
        </div>
        <UModal fullscreen v-model:open="menuModalOpen">
            <template #content>
                content
            </template>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { Markdown } from '@comark/vue';
import InfoBox from './InfoBox.vue';
import AssemblyH1 from './AssemblyH1.vue';

const customComponents = {
    InfoBox,
    h1: AssemblyH1
};

const props = defineProps<{
    root: string;
}>();

const isFullscreen = ref(false);
const parent = ref<HTMLElement | null>(null);
const menuModalOpen = ref(false);

onMounted(() => {
    // Handle fullscreen
    const handleKeydown = (event: KeyboardEvent) => { if (event.key === 'Escape' && isFullscreen.value) isFullscreen.value = false; };
    window.addEventListener('keydown', handleKeydown);
    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeydown);
    });

    // fetch assembly
    fetchAssemblyNode(props.root)
        .then((node) => {
            assemblyTreeRoot = new AssemblyLevel(node, null);
            assemblyTreeRootStatus.value = assemblyTreeRoot;
            setCurrentAssemblyStep(assemblyTreeRoot.steps?.[0] as AssemblyStep);
        })
        .catch((err) => {
            assemblyTreeRoot = null;
            assemblyTreeRootStatus.value = undefined;
            console.error('Error loading root assembly node', err);
        });

    // Assembly hot reload
    if (import.meta.hot) {
        import.meta.hot.on('assembly-update', () => {
            // Handle assembly update
            alert('Assembly updated, reloading...');
        })
    }
});
watch(isFullscreen, (newValue) => {
    if (newValue) parent.value?.requestFullscreen();
    else if (!newValue) document.exitFullscreen();
});
function toggleFullscreen() {
    isFullscreen.value = !isFullscreen.value;
}

/// Assembly loading

interface AssemblyStepDesc {
    name: string;
    content: string[];
    image: string;
}

interface AssemblyNode {
    name: string;
    path: string;
    steps: (AssemblyStepDesc|{link:string})[];
}

const assemblyAssets = import.meta.glob('../../assets/assembly/**/*.json', {
    eager: true,
    import: 'default',
}) as Record<string, AssemblyNode>;

async function fetchAssemblyNode(path: string): Promise<AssemblyNode> {
    const relativePath = path.replace(/^\/?assembly\//, '').replace(/^\//, '');
    const jsonPath = relativePath.endsWith('.json')
        ? relativePath
        : `${relativePath}/index.json`;
    const asset = assemblyAssets[`../../assets/assembly/${jsonPath}`];

    if (!asset) throw new Error(`Assembly asset not found: ${jsonPath}`);
    return { ...asset, path: jsonPath };
}

function resolvePath(base: string|undefined, link: string): string {
    if (!link) return base ?? '';
    if (!base) return link;
    const baseParts = base.split('/').slice(0, -1); // remove last part (file name)
    const linkParts = link.split('/');
    for (const part of linkParts) {
        if (part === '.') continue;
        else if (part === '..') baseParts.pop();
        else baseParts.push(part);
    }
    return baseParts.join('/');
}

interface AssemblyStep {
    name: string;
    content: string[];
    image: string;
    parent: AssemblyLevel;
}

class AssemblyLevel {
    loaded: boolean = false;
    loading: boolean = false;

    parent: AssemblyLevel|null = null;
    name: string|undefined = undefined;
    path: string|undefined = undefined;
    steps: (AssemblyStep|AssemblyLevel)[]|undefined = undefined;

    private loadNodeData(node: AssemblyNode) {
        this.name = node.name;
        this.path = node.path;
        this.steps = node.steps.map((step) => {
            if ('link' in step) return new AssemblyLevel(resolvePath(this.path, step.link), this);
            else return { name: step.name, content: step.content, image: step.image, parent: this };
        });
    }

    constructor(nodeORlink: AssemblyNode|string, parent: AssemblyLevel|null= null) {
        this.loading = false;
        this.parent = parent;

        if (typeof nodeORlink === 'string') {
            // link to another level, just get the path and load later
            this.loaded = false;
            this.path = nodeORlink;
        } else {
            // actual node, load it
            this.loaded = true;
            this.loadNodeData(nodeORlink);
        }
    }

    async load() {
        if (this.loaded || this.loading || !this.path) return;
        this.loading = true;

        try {
            const node = await fetchAssemblyNode(this.path);
            this.loadNodeData(node);
            this.loaded = true;
        } catch (err) {
            console.error('Error loading assembly level', err);
            this.loaded = false;
        } finally {
            this.loading = false;
        }
    }
}

async function findFirstStep(level: AssemblyLevel, self: AssemblyStep|AssemblyLevel): Promise<AssemblyStep|null> {
    if (!level.loaded) await level.load();
    if (!level.steps || !level.steps.length) return null;
    const selfIndex = level.steps.indexOf(self);
    for (let i = selfIndex + 1; i < level.steps.length; i++) {
        const step = level.steps[i];
        if (step instanceof AssemblyLevel) {
            const result = await findFirstStep(step, self);
            if (result) return result;
        } else return step as AssemblyStep;
    }
    if (!level.parent) return null;
    return await findFirstStep(level.parent, level);
};

async function findNextStep(currentStep: AssemblyStep): Promise<AssemblyStep|null> {
    if (!currentStep.parent || !currentStep.parent.steps) return null;
    return await findFirstStep(currentStep.parent, currentStep);
}

async function findLastStep(level: AssemblyLevel, self: AssemblyStep|AssemblyLevel): Promise<AssemblyStep|null> {
    if (!level.loaded) await level.load();
    if (!level.steps || !level.steps.length) return null;
    let selfIndex = level.steps.indexOf(self);
    if (selfIndex === -1) selfIndex = level.steps.length;
    for (let i = selfIndex - 1; i >= 0; i--) {
        const step = level.steps[i];
        if (step instanceof AssemblyLevel) {
            const result = await findLastStep(step, self);
            if (result) return result;
        } else return step as AssemblyStep;
    }
    if (!level.parent) return null;
    const result = await findLastStep(level.parent, level);
    return result
}

async function findPrevStep(currentStep: AssemblyStep): Promise<AssemblyStep|null> {
    if (!currentStep.parent || !currentStep.parent.steps) return null;
    return await findLastStep(currentStep.parent, currentStep);
}

let assemblyTreeRoot: AssemblyLevel|undefined|null = undefined; // undefined = not loaded, null = error
const assemblyTreeRootStatus = ref<AssemblyLevel|undefined>(undefined);
const currentAssemblyStep = ref<AssemblyStep|undefined>(undefined);
let nextAssemblyStep: AssemblyStep|undefined|null = undefined;
const nextAssemblyStepStatus = ref<AssemblyStep|undefined|null>(undefined);
let prevAssemblyStep: AssemblyStep|undefined|null = undefined;
const prevAssemblyStepStatus = ref<AssemblyStep|undefined|null>(undefined);

const currentAssemblyStepPath = ref<string[]>([]);
const currentAssemblyStepIndex = ref<number>(-1);
const currentAssemblyStepImageSrc = ref<string>('');

function getStepPath(step: AssemblyStep): string[] {
    const path: string[] = [];
    let current: AssemblyLevel|null = step.parent;
    while (current) {
        if (current.name && current.parent) path.unshift(current.name);
        current = current.parent;
    }
    return path;
}

async function setCurrentAssemblyStep(step: AssemblyStep) {
    currentAssemblyStep.value = step;
    nextAssemblyStep = undefined;
    nextAssemblyStepStatus.value = undefined;
    prevAssemblyStep = undefined;
    prevAssemblyStepStatus.value = undefined;

    currentAssemblyStepPath.value = getStepPath(step);
    currentAssemblyStepIndex.value = step.parent?.steps?.indexOf(step) ?? -1;
    currentAssemblyStepImageSrc.value = resolvePath(currentAssemblyStepPath.value.join("/"), step.image);

    nextAssemblyStep = await findNextStep(step);
    nextAssemblyStepStatus.value = nextAssemblyStep;
    prevAssemblyStep = await findPrevStep(step);
    prevAssemblyStepStatus.value = prevAssemblyStep;
}

function onPrevClicked() {
    if (!prevAssemblyStep) return;
    setCurrentAssemblyStep(prevAssemblyStep);
}

function onNextClicked() {
    if (!nextAssemblyStep) return;
    setCurrentAssemblyStep(nextAssemblyStep);
}

</script>
