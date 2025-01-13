import * as THREE from 'three';
import Gotham from './images/gotham.jpg';


export function dumpObject(obj, lines = [], isLast = true, prefix = '', log = false) {
    const localPrefix = isLast ? '└─' : '├─';
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);

    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;


    if (obj.children && obj.children.length > 0) {
        obj.children.forEach((child, ndx) => {
            const isLast = ndx === lastNdx;
            dumpObject(child, lines, isLast, newPrefix, log);
        });
    }

    if (log && prefix === '') {
        console.log(lines.join('\n'));
    }

    return lines;
}

// Function to add ambient lighting
export function addAmbientLighting(scene) {
    const mainLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(mainLight);
}

// Function to create a spotlight
export function createSpotLight(intensity = 2, angle = Math.PI / 14, penumbra = 0.35) {
    const light = new THREE.SpotLight(0xffffff, intensity);
    light.castShadow = true;
    light.position.set(0, 0, 10);
    light.target.position.set(0, 0, 0);
    light.angle = angle;
    light.penumbra = 0.35;

    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
    light.shadow.focus = 1;

    return light;
}

// Function to create a visual representation of a spotlight
export function createSpotLightRepr() {
    const geometry = new THREE.SphereGeometry(1, 6, 6);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 10);
    return sphere;
}

// Function to create a cylinder geometry
export function createCylinder(radius = 10, height = 16, radialSegments = 12, heightSegments = 10) {
    const geometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments, heightSegments, true);
    const material = new THREE.MeshBasicMaterial({
        color: 0x555555,
        opacity: 0.5,
        transparent: true,
        side: THREE.DoubleSide,
    });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.rotation.set(-Math.PI / 2, 0, 0);
    return cylinder;
}

// Function to add the Gotham background image to the scene
export function addGotham(scene) {
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(500, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        map: loader.load(Gotham),
        side: THREE.BackSide,
    });
    const gotham = new THREE.Mesh(geometry, material);
    scene.add(Gotham);
}
