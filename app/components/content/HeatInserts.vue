<template>
    <div class="my-6 h-[calc(100vh-12em)] md:h-[calc(100vh-16em)] min-h-0 overflow-hidden rounded-xl bg-white dark:bg-slate-900">
        <div class="flex flex-col w-full h-full">
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4 dark:border-slate-700 h-fit">
                <div>
                    <h2 class="text-lg font-semibold"> {{ partName }} </h2>
                    <p class="text-sm text-slate-500"> {{ nbInserts }} heat inserts </p>
                </div>
                <div class="flex gap-4 justify-between items-center md:w-fit w-full">
                    <UButton icon="lucide:chevron-left" variant="soft" color="neutral" size="xl" label="Prev" :disabled="currentInsertIndex <= 0" @click="() => setCurrentInsert(currentInsertIndex-1)" />
                    <div class="flex w-fit h-fit">
                        {{ currentInsertIndex + 1 }} / {{ nbInserts }}
                    </div>
                    <UButton icon="lucide:chevron-right" trailing variant="soft" size="xl" label="Next" :disabled="currentInsertIndex >= nbInserts - 1" @click="() => setCurrentInsert(currentInsertIndex+1)" />
                </div>
            </div>
            <div class="relative flex grow min-h-0 min-w-0 max-w-full max-h-full">
                <div v-if="loading" class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center space-y-6 bg-slate-200 dark:bg-slate-900">
                    <p class="text-slate-500 font-semibold text-2xl"> Loading </p>
                    <UIcon name="lucide:loader-circle" class="animate-spin text-slate-500 w-12 h-12" />
                </div>
                <canvas ref="canvas" class="w-full h-full"></canvas>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { createThreeEnv, type Env } from '~/utils/threeView';

const props = defineProps<{
    path: string;
}>();

interface HeatInsertData {
    part: {
        name: string;
        path: string;
        rotation: { x: number; y: number; z: number };
    };
    inserts: Array<{
        pos: { x: number; y: number; z: number };
        dir?: { x?: number; y?: number; z?: number };
    }>;
}

const insertsAssets = import.meta.glob('../../assets/inserts/**/*.json', {
    eager: true,
    import: 'default',
}) as Record<string, HeatInsertData>;

const canvas = ref<HTMLCanvasElement>();

const loading = ref<boolean>(true);
const error = ref<string|null>(null);
const partName = ref<string>('');
const nbInserts = ref<number>(0);
const currentInsertIndex = ref<number>(0);

const filePath = `../../assets/inserts/${props.path}.json`;
const fileContent = insertsAssets[filePath];

const insertMeshes: THREE.Mesh[] = [];
let currentLerp: any;

function DEG2RAD(deg: number): number {
    return deg * (Math.PI / 180);
}

// ease-in-out lerp
function lerp(start: number, end: number, duration: number, updtFrq: number = 30) {
    return {
        cancelled: false,
        interval: null as any,
        onUpdate(callback: (value: number) => void) {
            const totalSteps = duration / updtFrq;
            const startTime = Date.now();
            this.interval = setInterval(() => {
                if (this.cancelled) return;
                const t = Math.min(1, (Date.now() - startTime) / duration);
                if (t >= 1) clearInterval(this.interval);
                const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease-in-out
                const value = start + (end - start) * easedT;
                callback(value);
            }, updtFrq);
            return this;
        }, onFinish(callback: () => void) {
            setTimeout(callback, duration);
            return this;
        }, cancel() {
            this.cancelled = true;
            return this;
        }
    };
}

let animInterval: any = null;
function startInsertAnimator() {
    animInterval = setInterval(() => {
        const selectedInsertMesh = insertMeshes[currentInsertIndex.value];
        const originalPosition = fileContent?.inserts[currentInsertIndex.value]?.pos;
        if (!selectedInsertMesh || !originalPosition) return;

        const dir = fileContent?.inserts[currentInsertIndex.value]?.dir;
        const direction = dir ? new THREE.Vector3(-(dir.x ?? 0), dir.y ?? 0, -(dir.z ?? 0)).normalize() : new THREE.Vector3(0, 0, -1);
        direction.normalize();
        
        const shift = (Math.sin(Date.now() / 500)+1) * 1;
        selectedInsertMesh.position.set(originalPosition.x + direction.x * shift, originalPosition.z + direction.z * shift, originalPosition.y + direction.y * shift);
    }, 33);
}
function stopInsertAnimator() {
    if (animInterval) {
        clearInterval(animInterval);
        animInterval = null;
    }
}

async function setCurrentInsert(index: number) {
    index = Math.max(0, Math.min(index, nbInserts.value - 1));
    currentInsertIndex.value = index;

    // Focus controls on the current insert
    const focusPosition = fileContent?.inserts[index]?.pos;
    const focusDirection = fileContent?.inserts[index]?.dir;
    if (focusPosition && focusDirection && env) {
        // lerp to the new position for smooth transition
        const insertPosition = new THREE.Vector3(focusPosition.x, focusPosition.z, focusPosition.y);
        // const endCameraPosition = insertPosition.clone().normalize().multiplyScalar(40).add(insertPosition);
        const direction = new THREE.Vector3(-(focusDirection.x ?? 0), -(focusDirection.z ?? 0), focusDirection.y ?? 0).normalize().multiplyScalar(40)
        direction.applyEuler(new THREE.Euler(DEG2RAD(30), 0, 0, 'XYZ')); // Rotate the direction vector for a better view
        const endCameraPosition = insertPosition.clone().add(direction);
        // const endCameraPosition = insertPosition.clone().add(); // Rotate the camera position around the Y-axis for a better view
        const startCameraPosition = env.camera.position.clone();
        const startTargetPosition = env.controls.target.clone();

        if (currentLerp) currentLerp.cancel();
        currentLerp = lerp(0, 1, 600).onUpdate((value) => {
            const newPosition = startCameraPosition.clone().lerp(endCameraPosition, value);
            if (!env) return;
            env.camera.position.copy(newPosition);
            env.camera.lookAt(insertPosition);
            env.controls.target.copy(startTargetPosition.clone().lerp(insertPosition, value));
            env.controls.update();
        }).onFinish(() => {
            currentLerp = null;
        });
    }

    // Set all inserts to their default position (in case they have been moved by animations)
    for (let i = 0; i < insertMeshes.length; i++) {
        const mesh = insertMeshes[i];
        const position = fileContent?.inserts[i]?.pos;
        if (mesh && position) {
            mesh.position.set(position.x, position.z, position.y);
        }
    }
}

let env: Env|null = null;
let insertMesh: THREE.Mesh | null = null;

// default here to display directly in header
partName.value = fileContent?.part.name ?? '';
nbInserts.value = fileContent?.inserts.length ?? 0;

onMounted(async () => {
    loading.value = true;
    error.value = null;

    if (!fileContent) {
        console.error(`Insert data not found for path: ${props.path}`);
        error.value = `Insert data not found for path: ${props.path}`;
        return;
    }

    if (!canvas.value) {
        console.error('Canvas element not found, could not initialize 3D view.');
        error.value = 'Canvas element not found, could not initialize 3D view.';
        return;
    }

    env = await createThreeEnv(canvas.value);
    env.startRenderingLoop();

    console.group(`Loading heat inserts for path: ${props.path}`);
    insertMesh = await loadSTLGeometry('/docs/models/insert.stl', new THREE.MeshStandardMaterial({ color: 0xeab308 }));
    insertMesh.rotation.x = DEG2RAD(-90); // FreeCAD is Z-up, Three.js is Y-up
    // spawn all inserts
    for (let i = 0; i < fileContent?.inserts.length; i++) {
        const meshClone = insertMesh.clone();
        const direction = fileContent?.inserts[i]?.dir;
        const position = fileContent?.inserts[i]?.pos;
        const baseDirection = new THREE.Vector3(0, 0, -1); // Default direction is up
        if (!direction || !position) {
            console.error(`Insert data missing for index ${i} in path: ${props.path}`);
            continue;
        }
        const targetDirection = new THREE.Vector3(direction.x ?? 0, direction.z ?? 0, -(direction.y ?? 0)); // Convert to Three.js coordinates
        targetDirection.normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(baseDirection, targetDirection);
        meshClone.setRotationFromQuaternion(quaternion);
        meshClone.position.set(position.x, position.z, position.y); // Convert to Three.js coordinates
        insertMeshes.push(meshClone);
        env.scene.add(meshClone);
    }
    console.groupEnd();
    
    try {
        const blob = await fetchSTLFile(fileContent.part.path, 'dev');
        const partMesh = await loadSTLGeometry(blob, new THREE.MeshStandardMaterial({ color: 0xffffff }));
        env.scene.add(partMesh);

        // Set rotation
        partMesh.rotation.x = DEG2RAD(fileContent.part.rotation.x);
        partMesh.rotation.y = DEG2RAD(fileContent.part.rotation.y);
        partMesh.rotation.z = DEG2RAD(fileContent.part.rotation.z);
    } catch (err) {
        console.error(`Failed to load part mesh for path: ${fileContent.part.path}`, err);
        error.value = `Failed to load part mesh for path: ${fileContent.part.path}`;
    }

    setCurrentInsert(0); // Focus on the first insert
    startInsertAnimator();
    setTimeout(() => {
        loading.value = false;
    }, 500);
});

onBeforeUnmount(() => {
    if (env) {
        env.stopRenderingLoop();
    }
    stopInsertAnimator();
});

</script>