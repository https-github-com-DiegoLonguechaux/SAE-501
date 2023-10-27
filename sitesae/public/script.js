import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

let container, stats, clock, model, modelOrbit;
let camera, scene, renderer;
let angularVelocity = 0;
let velocity = 0;
//for fbx
let mixer;
const STEPS_PER_FRAME = 5;
const speedDelta = 0.005;

const playerVelocity = new THREE.Vector3();

const keyStates = {};

document.addEventListener('keydown', (event)=>{
  keyStates[event.code] = true;
  console.log('Key down:', event.code);
});

document.addEventListener('keyup', (event)=>{
  keyStates[event.code] = false;
  console.log('Key up:', event.code);
});

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
    modelOrbit.position.z = -10;
  }, undefined, function (e) {
    console.error(e);
  });

  // ---------- FBX Animation ----------
  const fbxLoader = new FBXLoader();
  fbxLoader.load('./skateboarding2.fbx', (object) => {
  mixer = new THREE.AnimationMixer(object); // create mixer for the FBX model
  model = object;
  modelOrbit.add(model);
  modelOrbit.rotation.y = 0;

  // load animations from the FBX model
  const clips = object.animations;
  if (clips && clips.length) {
    mixer.clipAction(clips[0]).play(); // play first animation
  }
  }, undefined, function (e) {
  console.error(e);
  });

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize);

  // stats
  stats = new Stats();
  container.appendChild(stats.dom);

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight; 
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


// ---------- Sk8 Control ---------
function controls(deltaTime) {
  const rotationDelta = deltaTime * Math.PI; // rotation speed

  if (keyStates['ArrowUp']) {
    const skateDirection = new THREE.Vector3(0, 0, 1);
    skateDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), modelOrbit.rotation.y);
    playerVelocity.add(skateDirection.multiplyScalar(speedDelta));
  }else {
    playerVelocity.set(0, 0, 0);
  }
  
  if (keyStates['ArrowLeft']) {
    modelOrbit.rotation.y += rotationDelta;
  }

  if (keyStates['ArrowRight']) {
    modelOrbit.rotation.y -= rotationDelta;
  }
}

function animate() {
  const deltaTime = Math.min( 0.05, clock.getDelta() ) / STEPS_PER_FRAME;

  for ( let i = 0; i < STEPS_PER_FRAME; i ++ ) {
    controls( deltaTime );
  }

  velocity *= 1;
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
		modelOrbit.position.add(playerVelocity);

    const cameraDistance = 25;  // distance of the camera from the skateboard
    const cameraHeight = 10;     // height of the camera relative to the ground


    const targetRotation = modelOrbit.rotation.y;

    // camera position depending on the rotation of the skate

    const cameraPosition = new THREE.Vector3(
      modelOrbit.position.x - cameraDistance * Math.sin(targetRotation),
      modelOrbit.position.y + cameraHeight,
      modelOrbit.position.z - cameraDistance * Math.cos(targetRotation)
    );

    camera.position.copy(cameraPosition);

    // Turn the camera for follow the skate rotation
    camera.rotation.set(0, targetRotation, 0);

    camera.lookAt(modelOrbit.position.x, modelOrbit.position.y + 3, modelOrbit.position.z );
    camera.updateProjectionMatrix();
	}

  // for fbx animation
  if (mixer) {
    mixer.update(dt); // person animation update
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}