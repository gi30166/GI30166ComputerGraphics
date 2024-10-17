import * as THREE from 'three';

const scene = new THREE.Scene();
//plane 1
const geometry = new THREE.PlaneGeometry(5,5)
const material = new THREE.MeshBasicMaterial( {color: 0xff4420, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.rotation.x=-1.549
plane.position.y= 0.343
plane.position.x= 0
plane.position.z= 0

scene.add( plane );
const sizes = {
    width: 800,
    height: 600
}

//plane2
const geometry1 = new THREE.PlaneGeometry(5,5)
const material1 = new THREE.MeshBasicMaterial( {color: 0xf58820, side: THREE.DoubleSide} );
const plane1 = new THREE.Mesh( geometry1, material1 );
scene.add( plane1 );
plane1.rotation.x=0
plane1.position.z= -2.45
plane1.position.y= 2.9

//plane3
const geometry2 = new THREE.PlaneGeometry(5,5)
const material2 = new THREE.MeshBasicMaterial( {color: 0xff6550, side: THREE.DoubleSide} );
const plane2 = new THREE.Mesh( geometry2, material2 );
scene.add( plane2 );
plane2.rotation.x=0
plane2.rotation.y= 4.71
plane2.rotation.z= 0

plane2.position.y= 2.79
plane2.position.x= 2.5
plane2.position.z= 0

//plane3
const geometry3 = new THREE.PlaneGeometry(5,5)
const material3 = new THREE.MeshBasicMaterial( {color: 0x65ff99, side: THREE.DoubleSide} );
const plane3 = new THREE.Mesh( geometry3, material3 );
scene.add( plane3 );
plane3.rotation.x=0
plane3.rotation.y= 4.71
plane3.rotation.z= 0

plane3.position.y= 2.79
plane3.position.x= -2.5
plane3.position.z= 0

//plane4
const geometry4 = new THREE.PlaneGeometry(5,5)
const material4 = new THREE.MeshBasicMaterial( {color: 0xfff4250, side: THREE.DoubleSide} );
const plane4 = new THREE.Mesh( geometry4, material4 );
plane4.rotation.x=-1.57
plane4.position.y= 5.285
plane4.position.x= 0
plane4.position.z= 0
scene.add( plane4 );


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
camera.position.x =0
camera.position.y=3;
scene.add(camera);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600)
document.getElementById("scene").appendChild(renderer.domElement);


renderer.render(scene, camera)