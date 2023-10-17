import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let container, stats, clock, model, modelOrbit;
let camera, scene, renderer;
let angularVelocity = 0;
let velocity = 0;

init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 100);
  camera.position.set(-5, 3, 10);
  camera.lookAt(0, 2, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0e0e0);
  scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

  clock = new THREE.Clock();

  // lights
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.position.set(0, 20, 10);
  scene.add(dirLight);

  // ground
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false }));
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  modelOrbit = new THREE.Group();
  scene.add(modelOrbit);

  const loader = new GLTFLoader();
  loader.load('./skate.glb', function (gltf) {
    model = gltf.scene;
    modelOrbit.add(model);
    modelOrbit.rotation.y = Math.PI / 2;
  }, undefined, function (e) {
    console.error(e);
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize);

  // stats
  stats = new Stats();
  container.appendChild(stats.dom);

  document.addEventListener("keydown", onDocumentKeyDown, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  velocity *= 0.95;
  angularVelocity *= 0.95;

  const dt = clock.getDelta();

  if (model != null) {

		if (modelOrbit.position.y < 0) {
			modelOrbit.position.y = 0;
		}

		model.rotation.y += angularVelocity;
		let direction = new THREE.Vector3(0, 0, 1);
		direction.applyAxisAngle(new THREE.Vector3(0, 1, 0),
			model.rotation.y);
		direction.multiplyScalar(velocity * dt);
		modelOrbit.position.add(direction);

		camera.position.set(modelOrbit.position.x, 8, modelOrbit.position.z);
		direction = new THREE.Vector3(0, 0, 1);
		direction.applyAxisAngle(new THREE.Vector3(0, 1, 0),
			model.rotation.y);
		direction.multiplyScalar(-20);
		camera.position.add(direction);
		camera.lookAt(modelOrbit.position.x, modelOrbit.position.y + 3, modelOrbit.position.z);
		camera.updateProjectionMatrix();
	}

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}

let arrowUpPressed = false;

function onDocumentKeyDown(event) {
  if (event.key === "ArrowUp") {
    velocity +=1;
    arrowUpPressed = true;
  }
  else if (event.key === "ArrowDown") {
    velocity -= 1;
  }
  else if (event.key === "ArrowLeft") {
    velocity += 1
    angularVelocity += 0.0051;
  }
  else if (event.key === "ArrowRight") {
    velocity += 1;
    angularVelocity -= 0.0051;
  }
  console.log(event)
}

