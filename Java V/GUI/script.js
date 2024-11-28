import * as THREE from 'three';
import GUI from 'lil-gui'
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

const gui = new GUI();
const boxControls = gui.addFolder('Box Controls');

gui.add (mesh.position,'y', -3, 3, 0.1).name('Position Y');
gui.add (mesh.rotation,'z', -3, 3, 0.1).name('Rotation Z');
gui.add (material, 'wireframe').name('WireFrame?');
gui.addColor(material, 'color').name('Select Color');

var rotateSpeed = 0;

const startRotate = () => {
    if (rotateSpeed != 0) {
        rotateSpeed = 0;
    } else {
        rotateSpeed = 0.1;
    }
}

gui.add({startRotate}, 'startRotate');

scene.add(mesh)
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
scene.add(camera);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600)
document.getElementById("scene").appendChild(renderer.domElement);


const animate = () =>{
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}

animate();