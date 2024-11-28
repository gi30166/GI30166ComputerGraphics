import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
);

plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5

scene.add(sphere)
scene.add(plane)

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
scene.add(camera);


const renderer = new THREE.WebGLRenderer();

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

renderer.setSize(800, 600)
document.getElementById("scene").appendChild(renderer.domElement);


const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

