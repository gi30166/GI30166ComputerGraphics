import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 10);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('classroomCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const overheadLight = new THREE.PointLight(0xffffff, 0.8);
overheadLight.position.set(0, 5, 0);
scene.add(overheadLight);

//class
const cubeGeometry = new THREE.BoxGeometry(10, 3, 10);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x5E4621, side: THREE.BackSide });
const classroom = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(classroom);

//top
const coverMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const coverGeometry = new THREE.BoxGeometry(10, 0.01, 10);
const cover = new THREE.Mesh(coverGeometry, coverMaterial);
cover.position.y =1.5;
scene.add(cover);

//bottom
const coverMaterial2 = new THREE.MeshStandardMaterial({ color: 0x444444 });
const coverGeometry2 = new THREE.BoxGeometry(10, 0.01, 10);
const cover2 = new THREE.Mesh(coverGeometry2, coverMaterial2);
cover2.position.y = -1.5;



scene.add(cover2);


// Load the .glb model
const loader = new GLTFLoader();
loader.load(
  '/models/chair.glb', // Path to your GLB file
  (gltf) => {
    const model = gltf.scene;
    const startX = -2;
    const startZ = -2;
    const spacing = 2;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const chair = model.clone();
        chair.scale.set(1, 1, 1); // Set the scale
        chair.position.set(startX + col * spacing, -1.5, startZ + row * spacing + 1); // Adjust positions
        scene.add(chair);
      }
    }
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Loading progress
  },
  (error) => {
    console.error('An error occurred while loading the GLTF model:', error); // Error handling
  }
);



//Student Chairs
const mtlLoader = new MTLLoader();
// mtlLoader.load('/models/chair.mtl', (materials) => {
//   materials.preload();
  
  const objLoader = new OBJLoader();
//   objLoader.setMaterials(materials);
//   objLoader.load('/models/chair.obj', (object) => {
//     const startX = -2;
//     const startZ = -2;
//     const spacing = 2;

//     for (let row = 0; row < 3; row++) {
//       for (let col = 0; col < 3; col++) {
//         const chair = object.clone();
//         chair.scale.set(0.1, 0.1, 0.1);
//         chair.position.set(startX + col * spacing, -1.5, startZ + row * spacing + 1 );
//         scene.add(chair);
//       }
//     }
//   });
// });

//Professor Visar's Chair
mtlLoader.load('/models/chair.mtl', (materials) => {
  materials.preload();
  
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('/models/chair.obj', (object) => {
    const startX = -2;
    const startZ = -2;
    const spacing = 2.5;

    for (let row = 0; row < 1; row++) {
      for (let col = 0; col < 1; col++) {
        const chair = object.clone();
        chair.scale.set(0.1, 0.1, 0.1);
        chair.position.set(startX- 1 + col * spacing, -1.5, startZ + row * spacing -1.5 );
        chair.rotation.y = Math.PI;
        scene.add(chair);
      }
    }
  });
});

//Windows + Texture
const textureLoader = new THREE.TextureLoader();
textureLoader.load('/textures/window_view.jpg', (texture) => {
  const windowGeometry = new THREE.PlaneGeometry(1.2, 1.2);
  const windowMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
  windowMesh.position.set(-4.98, 0, -2);
  windowMesh.rotation.y = Math.PI /2;
  scene.add(windowMesh);
});

//Windows type 2 + Texture
textureLoader.load('/textures/window_view2.jpg', (texture) => {
  const windowGeometry = new THREE.PlaneGeometry(1.5, 1.2);
  const windowMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
  windowMesh.position.set(-4.98, 0, 2);
  windowMesh.rotation.y = Math.PI /2;
  scene.add(windowMesh);
});

//table
textureLoader.load('/textures/board.jpg', (texture) => {
  const boardGeometry = new THREE.PlaneGeometry(2.5, 1.3);
  const boardMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
  boardMesh.position.set(0, 0, -4.98);
//   boardMesh.rotation.y = Math.PI /2;
  scene.add(boardMesh);
});

//Camera 
const controls = new OrbitControls(camera, renderer.domElement);

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Responsive Design
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
