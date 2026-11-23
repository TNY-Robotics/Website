import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

export async function fetchSTLFile(file: string, branch: string = 'main', repo: string = 'TNY-Robotics/TNY-360'): Promise<Blob> {
    const fileDownloadUrl = `https://raw.githubusercontent.com/${repo}/${branch}/CAD/5.Exported/STLs/${encodeURIComponent(file)}.stl`
    const res = await fetch(fileDownloadUrl);
    if (!res.ok) throw new Error(`STL file request failed (${res.status}).`);
    return await res.blob();
}

export async function loadSTLGeometry(blob: Blob|string, material: THREE.Material = new THREE.MeshStandardMaterial({ color: 0xffffff })): Promise<THREE.Mesh> {
    return new Promise((resolve, reject) => {
        let url: string = '';
        if (typeof blob === 'string') url = blob;
        else url = URL.createObjectURL(blob);
        
        const loader = new STLLoader();
        loader.load(url, (geometry) => {
            const mesh = new THREE.Mesh(geometry, material);
            const min = new THREE.Vector3();
            const max = new THREE.Vector3();
            
            // Vertices centering (not centering the mesh itself to avoid issues with rotation)
            for (let i = 0; i < geometry.attributes.position?.count!; i++) {
                const x = geometry.attributes.position!.getX(i);
                const y = geometry.attributes.position!.getY(i);
                const z = geometry.attributes.position!.getZ(i);
                if (i === 0) {
                    min.set(x, y, z);
                    max.set(x, y, z);
                } else {
                    min.min(new THREE.Vector3(x, y, z));
                    max.max(new THREE.Vector3(x, y, z));
                }
            }
            const center = new THREE.Vector3().addVectors(min, max).multiplyScalar(0.5);
            for (let i = 0; i < geometry.attributes.position?.count!; i++) {
                geometry.attributes.position?.setXYZ(
                    i,
                    geometry.attributes.position?.getX(i) - center.x,
                    geometry.attributes.position?.getY(i) - center.y,
                    geometry.attributes.position?.getZ(i) - min.z // place part on the ground
                );
            }

            resolve(mesh);
        }, undefined, (error: any) => {
            console.error('Error loading STL file:', error);
            reject(error);
        });
    });
}