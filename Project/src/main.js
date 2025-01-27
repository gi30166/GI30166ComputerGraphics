import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

// Create the scene
const scene = new THREE.Scene();

// Add camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Add aquarium floor (terrain)
const floorGeometry = new THREE.PlaneGeometry(50, 50);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Add bubbles
const bubbleGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const bubbleMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

function createBubble(x, y, z) {
    const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
    bubble.position.set(x, y, z);
    scene.add(bubble);
    return bubble;
}

const bubbles = Array.from({ length: 20 }, () =>
    createBubble(Math.random() * 10 - 5, Math.random() * 10, Math.random() * 10 - 5)
);

// Animate bubbles
function animateBubbles() {
    bubbles.forEach((bubble) => {
        bubble.position.y += 0.05;
        if (bubble.position.y > 10) bubble.position.y = 0;
    });
}

// Load and add fish models
function loadFish(objPath, mtlPath, position) {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlPath, (materials) => {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(objPath, (object) => {
            object.position.set(position.x, position.y, position.z);
            object.scale.set(0.5, 0.5, 0.5); // Adjust scale as needed
            scene.add(object);
        });
    });
}

// Add multiple fish to the scene
loadFish('/fish1/13003_Auriga_Butterflyfish_v1_L3.obj', '/fish1/13003_Auriga_Butterflyfish_v1_L3.mtl', { x: 0, y: 1, z: 0 });
loadFish('/fish2/13006_Blue_Tang_v1_l3.obj', '/fish2/13006_Blue_Tang_v1_l3.mtl', { x: 5, y: 2, z: 5 });
loadFish('/fish3/13008_Clown_Goby_Citrinis_v1_l3.obj', '/fish3/13008_Clown_Goby_Citrinis_v1_l3.mtl', { x: -5, y: 2, z: -5 });
loadFish('/fish4/13009_Coral_Beauty_Angelfish_v1_l3.obj', '/fish4/13009_Coral_Beauty_Angelfish_v1_l3.mtl', { x: -5, y: 2, z: -5 });

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    animateBubbles();
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
