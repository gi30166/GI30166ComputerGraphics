import * as THREE from 'three';
const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(5, 5, 5);
scene.add(light);


scene.add(light);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshPhongMaterial({
    color: 0x0820ff,
    shininess: 100,
    specular: 0x555555
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);

box.position.x = -4;
scene.add(box)


const sizes = {
    width: 800,
    height: 600
}


const orthoCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0, 100);
const camera = new THREE.PerspectiveCamera(75, 800 / 600);
camera.position.z = 10;
camera.position.y = 2;

orthoCamera.position.z = 16;
orthoCamera.position.y = 6;

scene.add(camera);
scene.add(orthoCamera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600)
document.getElementById("perspective").appendChild(renderer.domElement);

const orthoRenderer = new THREE.WebGLRenderer();
orthoRenderer.setSize(800, 600)
document.getElementById("orthographic").appendChild(orthoCamera.domElement);

orthoRenderer.render(scene.orthoCamera);
const animate = () => {
    requestAnimationFrame(animate);
    box.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();