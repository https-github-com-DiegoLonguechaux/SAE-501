// Définir des variables globales
var container, scene, camera, renderer, controls;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock;

var movingCube;
var collideMeshList = [];
var cubes = [];
var crash = false;
var id = 0;
var crashId = " ";
var collisionTime = 2.0;
var collisionCooldown = 0;
var speedDisplay = document.getElementById("speedValue");
var speedReductionDuration = 3; // in seconds



init();
animate();

function init() {
    // Scene
    scene = new THREE.Scene();
    // Camera
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, screenWidth / screenHeight, 1, 20000);
    camera.position.set(0, 170, 400);

    // Renderer
    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({ antialias: true });
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(screenWidth * 0.85, screenHeight * 0.85);
    container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);

    THREEx.WindowResize(renderer, camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Joindre deux lignes droites
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-250, -1, -3000));
    geometry.vertices.push(new THREE.Vector3(-300, -1, 200));
    material = new THREE.LineBasicMaterial({
        color: 0x6699FF, linewidth: 5, fog: true
    });
    var line1 = new THREE.Line(geometry, material);
    scene.add(line1);
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(250, -1, -3000));
    geometry.vertices.push(new THREE.Vector3(300, -1, 200));
    var line2 = new THREE.Line(geometry, material);
    scene.add(line2);


    // Rejoignez le cube contrôlé
    var cubeGeometry = new THREE.BoxGeometry(50, 25, 60, 5, 5, 5);
    var wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    });


    movingCube = new THREE.Mesh(cubeGeometry, wireMaterial);
    movingCube.position.set(0, 25, -20);
    scene.add(movingCube);


}

function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
}

function update() {
    var delta = clock.getDelta();
    var moveDistance = 400 * delta;

    if (keyboard.pressed("left") || keyboard.pressed("Q")) {
        if (movingCube.position.x > -270)
            movingCube.position.x -= moveDistance;
    }
    if (keyboard.pressed("right") || keyboard.pressed("D")) {
        if (movingCube.position.x < 270)
            movingCube.position.x += moveDistance;
    }
    if (keyboard.pressed("up") || keyboard.pressed("Z")) {
        movingCube.position.z -= moveDistance;
    }
    if (keyboard.pressed("down") || keyboard.pressed("S")) {
        movingCube.position.z += moveDistance;
    }
    

    var originPoint = movingCube.position.clone();

    for (var vertexIndex = 0; vertexIndex < movingCube.geometry.vertices.length; vertexIndex++) {
        // coordonnées originales du sommet
        var localVertex = movingCube.geometry.vertices[vertexIndex].clone();
        // Les coordonnées transformées du sommet
        var globalVertex = localVertex.applyMatrix4(movingCube.matrix);
        var directionVector = globalVertex.sub(movingCube.position);

        var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(collideMeshList);
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
            crash = true;
            moveDistance = moveDistance / 2;
            crashId = collisionResults[0].object.name;
            break;
        }
        crash = false;
    }

    if (crash) {
        if (collisionCooldown <= 0) {
            movingCube.material.color.setHex(0x346386);
            movingCube.userData.originalSpeed = moveDistance; // Store the original speed
            moveDistance = moveDistance / 2; // Reduce the speed
            collisionCooldown = collisionTime;
        }
    } else {
        // movingCube.material.color.setHex(0xffffff);
        if (collisionCooldown > 0) {
            // Restaurer la vitesse d'origine après le temps de refroidissement
            collisionCooldown -= delta;
            if (collisionCooldown <= 0) {
                moveDistance = movingCube.userData.originalSpeed; // Restaurer la vitesse
                movingCube.material.color.setHex(0xffffff);
            }
        }
    }

    speedDisplay.textContent = "Vitesse : " + moveDistance.toFixed(2);
        
    

    if (Math.random() < 0.03 && cubes.length < 30) {
        makeRandomCube();
    }

    for (i = 0; i < cubes.length; i++) {
        if (cubes[i].position.z > camera.position.z) {
            scene.remove(cubes[i]);
            cubes.splice(i, 1);
            collideMeshList.splice(i, 1);
        } else {
            cubes[i].position.z += 10;
        }
    }

    // movingCube.position.z -= moveDistance;
}


// Renvoie un nombre aléatoire entre min et max
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Renvoie un nombre entier aléatoire compris entre min et max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function makeRandomCube() {
    var a = 1 * 50,
        b = getRandomInt(1, 3) * 50,
        c = 1 * 50;
    var geometry = new THREE.BoxGeometry(a, b, c);
    var color = new THREE.Color(Math.random() * 0xffffff)
    var material = new THREE.MeshBasicMaterial({
        color: color,
        size: 3
    });


    var object = new THREE.Mesh(geometry, material);
    var box = new THREE.BoxHelper(object);
    box.material.color.setHex(0xffffff);

    box.position.x = getRandomArbitrary(-250, 250);
    box.position.y = 1 + b / 2;
    box.position.z = getRandomArbitrary(-800, -1200);
    cubes.push(box);
    box.name = "box_" + id;
    id++;
    collideMeshList.push(box);

    scene.add(box);
}