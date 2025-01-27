import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Aquarium floor
const floorGeometry = new THREE.PlaneGeometry(50, 50);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x1e90ff }); // Blueish color for water
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Fish variables
const fishes = []; // To store fish objects
const fishAnimations = []; // To store fish animation parameters

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
// Rotate the fish to face the right way initially (adjust the rotation if necessary)
function loadFish(objPath, mtlPath, initialPosition, radius, speed) {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(
      mtlPath,
      (materials) => {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
          objPath,
          (object) => {
            object.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
            object.scale.set(0.2, 0.2, 0.2); // Make fish smaller
  
            // Adjust the initial rotation to make sure fish faces the correct direction
            // This part ensures the fish is properly oriented along the Y axis (it depends on your model)
            object.rotation.y = Math.PI / 2; // Or adjust this depending on the model orientation
  
            scene.add(object);
  
            // Store fish and animation details
            fishes.push(object);
            fishAnimations.push({ radius, speed, angle: Math.random() * Math.PI * 2 });
          },
          undefined,
          (error) => console.error('Error loading OBJ file:', error)
        );
      },
      undefined,
      (error) => console.error('Error loading MTL file:', error)
    );
  }  
// Add multiple fish to the scene
loadFish('/textures/fish1/13003_Auriga_Butterflyfish_v1_L3.obj', '/textures/fish1/13003_Auriga_Butterflyfish_v1_L3.mtl', { x: 10, y: 5, z: 0 }, 10, 0.03);
loadFish('/textures/fish2/13006_Blue_Tang_v1_l3.obj', '/textures/fish2/13006_Blue_Tang_v1_l3.mtl', { x: 5, y: 4, z: 5}, 5, 0.01);
loadFish('/textures/fish3/13008_Clown_Goby_Citrinis_v1_l3.obj', '/textures/fish3/13008_Clown_Goby_Citrinis_v1_l3.mtl', { x: -5, y: 2, z: -5 }, 4, 0.02);
loadFish('/textures/fish4/13009_Coral_Beauty_Angelfish_v1_l3.obj', '/textures/fish4/13009_Coral_Beauty_Angelfish_v1_l3.mtl', { x: -5, y: 2, z: -5 }, 7, 0.022);
loadFish('/textures/fish5/12265_Fish_v1_L2.obj', '/textures/fish5/12265_Fish_v1_L2.mtl', { x: -5, y: 1, z: -5 }, 5, 0.01);
loadFish('/textures/fish6/12993_Long_Fin_White_Cloud_v1_l3.obj', '/textures/fish6/12993_Long_Fin_White_Cloud_v1_l3.mtl', { x: -5, y: 1, z: -5 }, 6, 0.015);
loadFish('/textures/fish7/13013_Red_Head_Solon_Fairy_Wrasse_v1_l3.obj', '/textures/fish7/13013_Red_Head_Solon_Fairy_Wrasse_v1_l3.mtl', { x: 0, y: 2, z: -5 }, 3, 0.01);
loadFish('/textures/fish8/13014_Six_Line_Wrasse_v1_l3.obj', '/textures/fish8/13014_Six_Line_Wrasse_v1_l3.mtl', { x: -5, y: 3, z: -5 }, 13, 0.04);


// Animate fish in circular paths
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    animateBubbles();
    renderer.render(scene, camera);
  
    // Move fish in circular paths
    fishes.forEach((fish, index) => {
      const animation = fishAnimations[index];
      animation.angle += animation.speed; // Update angle for circular motion
  
      fish.position.x = animation.radius * Math.cos(animation.angle);
      fish.position.z = animation.radius * Math.sin(animation.angle);
  
      // Ensure fish faces forward in the direction of motion
      // Fish must rotate along the Y axis based on its path
      fish.rotation.y = -animation.angle;  // Rotate fish to face forward in the swimming direction
  
      // If rotation goes below 0, make sure we wrap it to a positive value
      if (fish.rotation.y < 0) fish.rotation.y += Math.PI * 2;
  
    });
  
    controls.update();
    renderer.render(scene, camera);
  }
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
