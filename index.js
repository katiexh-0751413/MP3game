import {
  BoxGeometry,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  DirectionalLight,
} from "three";

// Create our scene
const scene = new Scene();

// Create the camera so we can see our scene
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Create our renderer and add it to the DOM
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create our cube mesh from  a geometry and a material and add it to the scene
const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshPhongMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, material);
scene.add(cube);

// Add a directional light so we can see shadows on the cube
const color = 0xffffff;
const intensity = 1;
const light = new DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

// Position the camera
camera.position.z = 5;

// The animation loop updates the cube's rotation
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Start the animation loop
animate();