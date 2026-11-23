import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class Env {
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;
    public controls: OrbitControls;

    private shouldAnimate: boolean = true;

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, controls: OrbitControls)
    {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.controls = controls;
    }

    #animate() {
        if (!this.shouldAnimate) return;
        requestAnimationFrame(this.#animate.bind(this));
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    startRenderingLoop() {
        this.shouldAnimate = true;
        this.#animate();
    }

    stopRenderingLoop() {
        this.shouldAnimate = false;
        // Note : this will stop the animation loop by itself, no need to do anything more.
    }
}

export async function createThreeEnv(canvas: HTMLCanvasElement): Promise<Env> {
    return new Promise((resolve, reject) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // Lights
        const light1 = new THREE.DirectionalLight(0xf1f5f9, 0.6);
        light1.position.set(5, 10, 7.5);
        scene.add(light1);
        const light2 = new THREE.DirectionalLight(0xf1f5f9, 0.6);
        light2.position.set(10, -5, 7.5);
        scene.add(light2);
        const ambientLight = new THREE.AmbientLight(0x64748b);
        scene.add(ambientLight);

        resolve(new Env(scene, camera, renderer, controls));
    });
}