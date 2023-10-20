import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import ChatComponent from './ChatComponent.js';

class MyThreeJSComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showChat: false,
        }
    }

        componentDidMount() {
            this.initThreeJS();
        }

        initThreeJS() {
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
                loader.load('../resources/RobotExpressive.glb', function (gltf) {
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
                    velocity += 1;
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


        }

        handleChatButtonClick = () => {
            this.setState({ showChat: !this.state.showChat });
        }

        render() {
            const chatSVG = (
                <svg
                    width="48"
                    height="48"
                    viewBox="0 0 82 82"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M76.875 41C76.875 21.1868 60.8132 5.125 41 5.125C21.1867 5.125 5.12497 21.1868 5.12497 41C5.12497 60.8132 21.1867 76.875 41 76.875C47.068 76.875 52.7926 75.3657 57.81 72.7007L71.9755 76.7289C72.6338 76.9156 73.3301 76.923 73.9923 76.7506C74.6545 76.5782 75.2587 76.2321 75.7424 75.7481C76.2262 75.2641 76.5719 74.6597 76.744 73.9974C76.9161 73.3351 76.9082 72.6389 76.7212 71.9806L72.693 57.8177C75.446 52.6399 76.8822 46.8641 76.875 41ZM56.375 33.3125C56.375 33.9921 56.105 34.6439 55.6244 35.1245C55.1439 35.605 54.4921 35.875 53.8125 35.875H28.1875C27.5079 35.875 26.8561 35.605 26.3755 35.1245C25.8949 34.6439 25.625 33.9921 25.625 33.3125C25.625 32.6329 25.8949 31.9811 26.3755 31.5005C26.8561 31.02 27.5079 30.75 28.1875 30.75H53.8125C54.4921 30.75 55.1439 31.02 55.6244 31.5005C56.105 31.9811 56.375 32.6329 56.375 33.3125ZM53.8125 46.125C54.4921 46.125 55.1439 46.395 55.6244 46.8755C56.105 47.3561 56.375 48.0079 56.375 48.6875C56.375 49.3671 56.105 50.0189 55.6244 50.4995C55.1439 50.98 54.4921 51.25 53.8125 51.25H38.4375C37.7579 51.25 37.1061 50.98 36.6255 50.4995C36.145 50.0189 35.875 49.3671 35.875 48.6875C35.875 48.0079 36.145 47.3561 36.6255 46.8755C37.1061 46.395 37.7579 46.125 38.4375 46.125H53.8125Z"
                        fill="#1E1E1E"
                    />
                </svg>
            );
            const secondButtonSvg = (
                <svg
                    width="48"
                    height="48"
                    viewBox="0 0 70 63"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path xmlns="http://www.w3.org/2000/svg" d="M0.833008 5.00591L5.20634 0.666748L62.333 57.7934L57.9938 62.1667L37.4938 41.6667H21.2305L11.083 51.9167C9.95551 52.9417 8.45217 53.6251 6.81217 53.6251C5.2264 53.6251 3.70558 52.9951 2.58427 51.8738C1.46295 50.7525 0.833008 49.2317 0.833008 47.6459V46.7917L4.24967 21.5767C4.59134 18.0576 6.06051 14.9142 8.31551 12.4884L0.833008 5.00591ZM11.083 21.1667V24.5834H17.9163V31.4167H21.333V25.5059L16.9938 21.1667H11.083ZM50.3747 7.50008C58.438 7.50008 65.0322 13.6842 65.7497 21.5767L69.1663 46.7917V47.6459C69.1663 49.9009 67.9363 51.9168 66.0913 52.8734L20.718 7.50008H50.3747ZM50.3747 14.3334C49.6951 14.3334 49.0433 14.6034 48.5627 15.084C48.0822 15.5645 47.8122 16.2163 47.8122 16.8959C47.8122 17.5755 48.0822 18.2273 48.5627 18.7079C49.0433 19.1884 49.6951 19.4584 50.3747 19.4584C51.0543 19.4584 51.7061 19.1884 52.1866 18.7079C52.6672 18.2273 52.9372 17.5755 52.9372 16.8959C52.9372 16.2163 52.6672 15.5645 52.1866 15.084C51.7061 14.6034 51.0543 14.3334 50.3747 14.3334ZM44.3955 20.3126C43.7159 20.3126 43.0641 20.5826 42.5835 21.0631C42.103 21.5437 41.833 22.1955 41.833 22.8751C41.833 23.5547 42.103 24.2065 42.5835 24.687C43.0641 25.1676 43.7159 25.4376 44.3955 25.4376C45.0751 25.4376 45.7269 25.1676 46.2075 24.687C46.688 24.2065 46.958 23.5547 46.958 22.8751C46.958 22.1955 46.688 21.5437 46.2075 21.0631C45.7269 20.5826 45.0751 20.3126 44.3955 20.3126ZM56.3538 20.3126C55.6742 20.3126 55.0224 20.5826 54.5419 21.0631C54.0613 21.5437 53.7913 22.1955 53.7913 22.8751C53.7913 23.5547 54.0613 24.2065 54.5419 24.687C55.0224 25.1676 55.6742 25.4376 56.3538 25.4376C57.0335 25.4376 57.6852 25.1676 58.1658 24.687C58.6464 24.2065 58.9163 23.5547 58.9163 22.8751C58.9163 22.1955 58.6464 21.5437 58.1658 21.0631C57.6852 20.5826 57.0335 20.3126 56.3538 20.3126ZM50.3747 26.2917C49.6951 26.2917 49.0433 26.5617 48.5627 27.0423C48.0822 27.5229 47.8122 28.1746 47.8122 28.8542C47.8122 29.5339 48.0822 30.1856 48.5627 30.6662C49.0433 31.1468 49.6951 31.4167 50.3747 31.4167C51.0543 31.4167 51.7061 31.1468 52.1866 30.6662C52.6672 30.1856 52.9372 29.5339 52.9372 28.8542C52.9372 28.1746 52.6672 27.5229 52.1866 27.0423C51.7061 26.5617 51.0543 26.2917 50.3747 26.2917Z" fill="#1E1E1E" />
                </svg>
            );
            return (
                <div style={{ position: 'relative' }}>
                    <div ref={(container) => (this.container = container)} />

                    {/* Bouton Chat qui affiche ou masque le composant Chat */}
                    <div style={{ position: 'absolute', top: 10, right: 25, zIndex: 1 }}>
                        <button onClick={this.handleChatButtonClick}>
                            {chatSVG}
                        </button>
                    </div>

                    {/* Afficher le composant Chat s'il est activé */}
                    {this.state.showChat && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 100,
                                right: 25,
                                zIndex: 1,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {/* Ici, vous pouvez ajouter le code de votre composant Chat */}
                            {/* Par exemple, un formulaire de chat */}
                            <ChatComponent />
                        </div>
                    )}

                    <div
                        style={{
                            position: 'absolute',
                            top: 100,
                            right: 25,
                            zIndex: 1,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Link to="/game-page">
                            <button>
                                {secondButtonSvg}
                            </button>
                        </Link>
                    </div>
                </div>
            );
        }
    }

export default MyThreeJSComponent;


