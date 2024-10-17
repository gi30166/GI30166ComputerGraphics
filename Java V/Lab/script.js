import * as THREE from 'three';
import GUI from 'lil-gui'
const scene = new THREE.Scene();
const geometry = new THREE.ConeGeometry(0.5, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.z = 1.5

const geometry2 = new THREE.SphereGeometry(0.5,32)
const material2 = new THREE.MeshBasicMaterial( {color: 0xfff020, side: THREE.DoubleSide} );
const sphere2 = new THREE.Mesh( geometry2, material2);
scene.add (sphere2);
sphere2.position.x = 2;

const geometry3 = new THREE.CylinderGeometry(0.5, 0.5)
const material3 = new THREE.MeshBasicMaterial( {color: 0x987328, side: THREE.DoubleSide} );
const Cylinder3 = new THREE.Mesh( geometry3, material3);
scene.add (Cylinder3);
Cylinder3.position.x = -.2;
Cylinder3.rotation.x=.2
Cylinder3.position.z = -1;


const geometry1 = new THREE.PlaneGeometry(10,10)
const material1 = new THREE.MeshBasicMaterial( {color: 0xff4420, side: THREE.DoubleSide} );
const plane1 = new THREE.Mesh( geometry1, material1 );
plane1.rotation.x=-1.2
plane1.position.y= -1
plane1.position.x= 0
plane1.position.z= 0

scene.add( plane1);
const gui = new GUI();
const boxControls = gui.addFolder('Box Controls');

boxControls.add (mesh.position,'x', -3, 3, 0.1).name('Position X');
boxControls.add (mesh.rotation,'z', -3, 3, 0.1).name('Rotation Z');
boxControls.add (material, 'wireframe').name('WireFrame?');
boxControls.addColor(material, 'color').name('Select Color');

const boxControls2 = gui.addFolder('Box Controls');
boxControls2.add (sphere2.position,'x', -3, 3, 0.1).name('Position X');
boxControls2.add (sphere2.rotation,'z', -3, 3, 0.1).name('Rotation Z');
boxControls2.add (material2, 'wireframe').name('WireFrame?');
boxControls2.addColor(material2, 'color').name('Select Color');

const boxControls3 = gui.addFolder('Box Controls');
boxControls3.add (Cylinder3.position,'x', -3, 3, 0.1).name('Position X');
boxControls3.add (Cylinder3.rotation,'z', -3, 3, 0.1).name('Rotation Z');
boxControls3.add (material3, 'wireframe').name('WireFrame?');
boxControls3.addColor(material3, 'color').name('Select Color');


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
camera.position.y = 0.3
scene.add(camera);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600)
document.getElementById("scene").appendChild(renderer.domElement);


const animate = () =>{
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}

animate();