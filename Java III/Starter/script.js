import * as THREE from 'three';

const scene = new THREE.Scene();
const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

scene.add(sphere);


const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 0;

scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);
		
document.getElementById("scene").appendChild(renderer.domElement);
//renderer.render(scene, camera);

var clock = new THREE.Clock();
const animate = () => {
	const elapsedTime = clock.getElapsedTime();
	sphere.rotation.y += elapsedTime * 0 ;
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

animate();