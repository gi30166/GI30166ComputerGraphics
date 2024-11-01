import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(30, 30, 30);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Grass plane with thickness
const groundSize = 100;
const grassMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const grass = new THREE.Mesh(new THREE.BoxGeometry(groundSize, 1, groundSize), grassMaterial);
grass.position.y = -0.5;
scene.add(grass);

// Roads
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
const road1 = new THREE.Mesh(new THREE.PlaneGeometry(10, groundSize), roadMaterial);
road1.rotation.x = -Math.PI / 2;
road1.position.y = 0.01;
scene.add(road1);

const road2 = new THREE.Mesh(new THREE.PlaneGeometry(groundSize, 10), roadMaterial);
road2.rotation.x = -Math.PI / 2;
road2.position.y = 0.01;
scene.add(road2);

// Adding individual buildings with outlines

// Building 1
const building1 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }));
building1.position.set(-15, 5, -15);
scene.add(building1);
const building1Edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(building1.geometry),
    new THREE.LineBasicMaterial({ color: 0x000000 })
);
building1.add(building1Edges);

// Building 2
const building2 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 20), new THREE.MeshBasicMaterial({ color: 0xffffff }));
building2.position.set(15, 5, -20);
scene.add(building2);
const building2Edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(building2.geometry),
    new THREE.LineBasicMaterial({ color: 0x000000 })
);
building2.add(building2Edges);

// Building 3
const building3 = new THREE.Mesh(new THREE.BoxGeometry(20, 10, 10), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
building3.position.set(20, 5, 15);
scene.add(building3);
const building3Edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(building3.geometry),
    new THREE.LineBasicMaterial({ color: 0x000000 })
);
building3.add(building3Edges);

// Stacked Buildings (Top-Right Corner)
const building4 = new THREE.Mesh(new THREE.BoxGeometry(12, 8, 15), new THREE.MeshBasicMaterial({ color: 0x808080 }));
building4.position.set(-15, 4, 20);
scene.add(building4);
const building4Edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(building4.geometry),
    new THREE.LineBasicMaterial({ color: 0x000000 })
);
building4.add(building4Edges);

const building5 = new THREE.Mesh(new THREE.BoxGeometry(12, 8, 15), new THREE.MeshBasicMaterial({ color: 0x909090 }));
building5.position.set(-15, 12, 20); // stacked on top of building 4
scene.add(building5);
const building5Edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(building5.geometry),
    new THREE.LineBasicMaterial({ color: 0x000000 })
);
building5.add(building5Edges);

// Side-by-Side Buildings (Bottom-Right Corner)
const building6 = new THREE.Mesh(new THREE.BoxGeometry(12, 8, 10), new THREE.MeshBasicMaterial({ color: 0x0066cc }));
building6.position.set(17, 4, 27);
scene.add(building6);
const building6Edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(building6.geometry),
    new THREE.LineBasicMaterial({ color: 0x000000 })
);
building6.add(building6Edges);


// Animated Sphere
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), sphereMaterial);
sphere.position.set(-20, 2, 0);
scene.add(sphere);

gsap.to(sphere.position, {
    x: 20,
    duration: 5,
    repeat: -1,
    yoyo: true,
});

const sphereMaterial2 = new THREE.MeshBasicMaterial({ color: 0xfff000 });
const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), sphereMaterial2);
sphere2.position.set(0, 2, -20);
scene.add(sphere2);

gsap.to(sphere2.position, {
    z : 20,
    duration: 5,
    repeat: -1,
    yoyo: true,
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
