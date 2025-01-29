import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import GUI from 'lil-gui';
import { Water } from 'three/examples/jsm/objects/Water2';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(17, 20, 70);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Ground (Sand Texture)
const textureLoader = new THREE.TextureLoader();
const sandTexture = textureLoader.load('/textures/sand/sand.jpg');
sandTexture.wrapS = sandTexture.wrapT = THREE.RepeatWrapping;
sandTexture.repeat.set(10, 10);

const sandMaterial = new THREE.MeshStandardMaterial({
    map: sandTexture,
    bumpMap: sandTexture,
    bumpScale: 0.2,
});
const sandGeometry = new THREE.PlaneGeometry(30, 30, 30, 30);
const sandMesh = new THREE.Mesh(sandGeometry, sandMaterial);
sandMesh.rotation.x = -Math.PI / 2;
sandMesh.position.y=0.01;
scene.add(sandMesh);

// Aquarium Walls
const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x88ccee,
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.5,
    side: THREE.DoubleSide,
});
const wallGeometry = new THREE.BoxGeometry(30, 15, 30);
const walls = new THREE.Mesh(wallGeometry, glassMaterial);
walls.position.y = 7.5;
walls.scale.set(1, 1, 1);
scene.add(walls);

// Aquarium Cover
const coverMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
const coverGeometry = new THREE.BoxGeometry(33.5, 1, 33.5);
const cover = new THREE.Mesh(coverGeometry, coverMaterial);
cover.position.y = 15.5;
scene.add(cover);

//Pjesa Posht
const coverMaterial2 = new THREE.MeshStandardMaterial({ color: 0x444444 });
const coverGeometry2 = new THREE.BoxGeometry(31, 1, 31);
const cover2 = new THREE.Mesh(coverGeometry2, coverMaterial2);
cover2.position.y = -.5;
scene.add(cover2);

// Water Surface
const waterGeometry = new THREE.PlaneGeometry(30, 30);
const water = new Water(waterGeometry, {
    color: 0x001e0f,
    scale: 1,
    flowDirection: new THREE.Vector2(1, 1),
    textureWidth: 1024,
    textureHeight: 1024,
});
water.position.y = 14.2;
water.rotation.x = -Math.PI / 2;
scene.add(water);

// Reflector for Sunlight Effects
const reflectorGeometry = new THREE.PlaneGeometry(30, 30);
const reflector = new Reflector(reflectorGeometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x777777,
});
reflector.position.y = 14.3;
reflector.rotation.x = -Math.PI / 2;
scene.add(reflector);

// Bubbles
const bubbleGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const bubbleMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const bubbles = Array.from({ length: 50 }, () => {
    const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
    bubble.position.set(
        Math.random() * 28 - 14,
        Math.random() * 14,
        Math.random() * 28 - 14
    );
    scene.add(bubble);
    return bubble;
});

function animateBubbles() {
    bubbles.forEach((bubble) => {
        bubble.position.y += Math.random() * 0.02 + 0.01;
        if (bubble.position.y > 14) bubble.position.y = 0;
    });
}

// Table (Underneath the Aquarium)
const tableLoader = new MTLLoader();
tableLoader.load('/textures/table/table.mtl', (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('/textures/table/table.obj', (table) => {
        table.position.set(0, -20.1, 0);
        table.scale.set(40, 40, 40);
        
        // Adjust lighting and material if needed
        table.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0x8B4513, // or use the material from MTLLoader
                    roughness: 0.5,
                    metalness: 0.2,
                });
            }
        });

        scene.add(table);
    });
});

// Load Fish
function loadFish(objPath, mtlPath, position, scale, speed, rotation) {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlPath, (materials) => {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(objPath, (object) => {
            object.position.set(position.x, position.y, position.z);
            object.scale.set(0.1, 0.1, 0.1);
            object.rotation.set(rotation.x, rotation.y, rotation.z);
            scene.add(object);

            const swim = () => {
                object.position.x += Math.sin(Date.now() * speed) * 0.05;
                object.position.z += Math.cos(Date.now() * speed) * 0.05;
            };
            fishAnimations.push(swim);
        });
    });
}

const fishAnimations = [];
loadFish('/textures/fish1/13003_Auriga_Butterflyfish_v1_L3.obj', '/textures/fish1/13003_Auriga_Butterflyfish_v1_L3.mtl', { x: 10, y: 5, z: 0 }, 7, 0.01, { x: 0, y: Math.PI / 2, z: 0 });
loadFish('/textures/fish2/13006_Blue_Tang_v1_l3.obj', '/textures/fish2/13006_Blue_Tang_v1_l3.mtl', { x: 5, y: 4, z: 5 }, 5, 0.01, { x: 0, y: Math.PI / 2, z: 0 });
loadFish('/textures/fish3/13008_Clown_Goby_Citrinis_v1_l3.obj', '/textures/fish3/13008_Clown_Goby_Citrinis_v1_l3.mtl', { x: -5, y: 2, z: -5 }, 4, 0.01, { x: 0, y: Math.PI / 2, z: 0 });
loadFish('/textures/fish4/13009_Coral_Beauty_Angelfish_v1_l3.obj', '/textures/fish4/13009_Coral_Beauty_Angelfish_v1_l3.mtl', { x: -5, y: 2, z: -5 }, 7, 0.01, { x: 0, y: Math.PI / 2, z: 0 });
loadFish('/textures/fish5/12265_Fish_v1_L2.obj', '/textures/fish5/12265_Fish_v1_L2.mtl', { x: -5, y: 2, z: -5 }, 5, 0.01, { x: Math.PI / 2, y: Math.PI / 2, z: Math.PI / 2 });
loadFish('/textures/fish6/12993_Long_Fin_White_Cloud_v1_l3.obj', '/textures/fish6/12993_Long_Fin_White_Cloud_v1_l3.mtl', { x: -5, y: 1, z: -5 }, 6, 0.01, { x: 0, y: Math.PI / 2, z: 0 });
loadFish('/textures/fish7/13013_Red_Head_Solon_Fairy_Wrasse_v1_l3.obj', '/textures/fish7/13013_Red_Head_Solon_Fairy_Wrasse_v1_l3.mtl', { x: 0, y: 2, z: -5 }, 3, 0.01, { x: 0, y: Math.PI / 2, z: 0 });
loadFish('/textures/fish8/13014_Six_Line_Wrasse_v1_l3.obj', '/textures/fish8/13014_Six_Line_Wrasse_v1_l3.mtl', { x: -5, y: 3, z: -5 }, 7, 0.01, { x: 0, y: Math.PI / 2, z: 0 });

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    animateBubbles();
    
    if (water.material.uniforms && water.material.uniforms['time']) {
        water.material.uniforms['time'].value += 1.0 / 60.0;
    }

    fishAnimations.forEach((swim) => swim());
    renderer.render(scene, camera);
}

animate();

// Resize Handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});