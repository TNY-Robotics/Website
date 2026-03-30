<template>
    <div ref="container" :style="{ height: size.split(' ')[1], width: size.split(' ')[0]}">
        <div v-if="loading" class="flex w-full h-full justify-center items-center" >Loading ...</div>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const props = defineProps({
    model: String,
    size: { type: String, default: '400px 400px' },
    orient: { type: String, default: '2 2 2' }, // x y z initial
    fixed: { type: Boolean, default: false }, // if true, cannot rotate the model
});

const container = ref(null);
const canvas = ref(null);
const loading = ref(true);

const running = ref(true);

onMounted(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.001, 100);
    const orient = new THREE.Vector3(...props.orient.split(' ').map(Number)).normalize();
    const cam_obj = new THREE.Group();
    cam_obj.add(camera);
    scene.add(cam_obj);
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true, alpha: true });
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotateSpeed = 0.5;
    controls.autoRotate = !props.fixed.value;
    if (props.fixed.value) {
        controls.enableRotate = false;
    }

    const loader = new GLTFLoader();
    loader.load(props.model, (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = false;
                child.receiveShadow = false;
                child.material.emissive = child.material.color;
            }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const distance = Math.max(size.x, size.y, size.z);
        camera.lookAt(center);
        controls.target.copy(center);
        camera.position.copy(orient.clone().multiplyScalar(distance).add(new THREE.Vector3(center.x, 0, center.z)));
        controls.update();

        loading.value = false;
    });

    const animate = () => {
        if (!running.value) return;
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
        if (!container.value) return;
        camera.aspect = container.value.clientWidth / container.value.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    });
});

onUnmounted(() => {
    window.removeEventListener('resize', () => {});
    running.value = false;
});
</script>