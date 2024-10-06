import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { EffectComposer } from 'EffectComposer';
import { RenderPass } from 'RenderPass';
import { UnrealBloomPass } from 'UnrealBloomPass';
import { planetData, constellations } from './data.js';

let scene, camera, renderer, controls, loadingDiv, detailsDiv, progressBar;
const planets = {};
const asteroids = [];
let planetLabels = [];
const constellationLines = []; 
let speed = 0.01;

const speedSlider = document.getElementById("speed");
const speedValueDisplay = document.getElementById("speedValue");

let showAsteroids = true;
let showConstellations = true;

const audio = document.getElementById('background-music');

function createStarField() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
    const starCount = 1000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 1000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

function playSound() {
    audio.play().catch(error => {
        console.error("Error playing audio:", error);
    });
}

function pauseSound() {
    audio.pause();
}

function init() {
    loadingDiv = document.getElementById("loading");
    detailsDiv = document.getElementById("details");
    progressBar = document.getElementById("progress-fill");

    speedSlider.addEventListener('input', (event) => {
        speed = parseFloat(event.target.value);
        speedValueDisplay.textContent = speed.toFixed(2);
    });

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("scene-container").appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.enableZoom = true;
    camera.position.set(0, 5, 10);
    controls.update();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffcc00, 1.50, 10);
    scene.add(pointLight);
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);
    createStarField();

        document.getElementById("toggle-constellations").addEventListener('click', () => {
    showConstellations = !showConstellations; // Toggle the state
    constellationLines.forEach(line => {
        line.visible = showConstellations; // Show or hide lines
    });
    const button = document.getElementById("toggle-constellations");
    if (showConstellations) {
        button.classList.add("active");
        button.classList.remove("inactive");
    } else {
        button.classList.remove("active");
        button.classList.add("inactive");
    }
});

    const texturePromises = [];
    planetData.forEach(data => {
        texturePromises.push(loadTexture(data.texture));
    });

    document.getElementById("toggle-asteroids").addEventListener('click', () => {
    showAsteroids = !showAsteroids; // Toggle the state
    asteroids.forEach(asteroid => {
        asteroid.visible = showAsteroids; // Show or hide asteroids
    });
    const button = document.getElementById("toggle-asteroids");
    if (showAsteroids) {
        button.classList.add("active");
        button.classList.remove("inactive");
    } else {
        button.classList.remove("active");
        button.classList.add("inactive");
    }
});
     const settingsButton = document.getElementById("settings-button");
    const drawer = document.getElementById("drawer");
    const drawerLeft = document.getElementById("drawerLeft");

    settingsButton.addEventListener('click', () => {
    drawer.classList.toggle("active"); // Toggle the active class
    });

    window.addEventListener('click', (event) => {
        if (!drawer.contains(event.target) && !settingsButton.contains(event.target)) {
            drawer.classList.remove("active");
        }
    });

    drawer.addEventListener('transitionend', () => {
    if (drawer.classList.contains('active')) {
        settingsButton.style.opacity = '0'; // Hide button when drawer is open
    } else {
        settingsButton.style.opacity = '1'; // Show button when drawer is closed
    }
});


    Promise.all(texturePromises).then(() => {
        createSun();
        createOrbits();
        createPlanets();
        createAsteroids();
        createConstellations();
        createPlanetLabels();
        loadingDiv.style.display = 'none';
        animate();
        playSound();
    });

    let totalTextures = texturePromises.length;
    let loadedTextures = 0;

    function loadTexture(path) {
        return new Promise((resolve, reject) => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                path,
                (texture) => {
                    loadedTextures++;
                    updateProgressBar(loadedTextures, totalTextures);
                    resolve(texture);
                },
                undefined,
                (err) => {
                    console.error(`Error loading texture: ${path}`, err);
                    reject(err);
                }
            );
        });
    }

    function updateProgressBar(loaded, total) {
        const progress = (loaded / total) * 100;
        progressBar.style.width = progress + '%';
        if (loaded === total) {
            setTimeout(() => {
                loadingDiv.style.display = 'none'; 
            }, 500);
        }
    }
}

function createSun() {
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sunTextureLoader = new THREE.TextureLoader();
    sunTextureLoader.load("textures/sun.jpg", (texture) => {
        const sunMaterial = new THREE.MeshStandardMaterial({ map: texture });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        const glowGeometry = new THREE.SphereGeometry(1, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffcc00,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        sun.userData.glow = glow;
        scene.add(sun);
        scene.add(glow);
    }, undefined, (err) => {
        console.error("Error loading sun texture:", err);
    });
}

function createOrbits() {
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x888888 });
    planetData.forEach(data => {
        const orbitGeometry = new THREE.BufferGeometry();
        const points = [];
        const a = data.semiMajorAxis;
        for (let i = 0; i <= 64; i++) {
            const angle = (i / 64) * Math.PI * 2;
            const r = a * (1 - data.eccentricity * data.eccentricity) / (1 + data.eccentricity * Math.cos(angle));
            const x = r * Math.cos(angle);
            const z = r * Math.sin(angle);
            points.push(x, 0, z);
        }
        orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
        const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
        scene.add(orbit);
    });
}

function createRing(planet, outerRadius, thickness, texturePath) {
    const outerRingGeometry = new THREE.CylinderGeometry(outerRadius, outerRadius, thickness, 32);
    const ringTextureLoader = new THREE.TextureLoader();
    ringTextureLoader.load(texturePath, (texture) => {
        const outerRingMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        });
        const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
        outerRing.rotation.z = Math.PI;
        const ringGroup = new THREE.Group();
        ringGroup.add(outerRing);
        planet.add(ringGroup);
    }, undefined, (err) => {
        console.error(`Error loading ring texture for ${planet.userData.name}:`, err);
    });
}

function createPlanets() {
    planetData.forEach(data => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(data.texture, (texture) => {
            const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
            const material = new THREE.MeshStandardMaterial({ map: texture });
            const planet = new THREE.Mesh(geometry, material);
            planet.userData = {
                orbitAngle: 0,
                semiMajorAxis: data.semiMajorAxis,
                eccentricity: data.eccentricity,
                speed: data.speed,
                texture: data.texture,
                info: data.info,
                name: data.name,
            };
            scene.add(planet);
            planets[data.name] = planet;

            planet.callback = function() {
                showPlanetDetails(planet.userData);
            };


            if (data.name === "Saturn") {
                createRing(planet, 0.65, 0.1, "textures/saturn_ring.png");
            }
        }, undefined, (err) => {
            console.error(`Error loading texture for ${data.name}:`, err);
        });
    });
}

function showPlanetDetails(planetData) {
    const planetName = document.getElementById("name");
    const planetInfo = document.getElementById("info");
    const planetImage = document.getElementById("texture");

    planetName.textContent = planetData.name;
    planetInfo.textContent = planetData.info || "Information not available.";
    planetImage.src = planetData.texture;

    const detailsDiv = document.getElementById("details");
    detailsDiv.style.display = 'block'; // Show the details

    const drawerLeft = document.getElementById("drawerLeft");
    drawerLeft.classList.add("active"); // Open the drawer
}

window.addEventListener('click', (event) => {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(Object.values(planets));
    playSound();

    if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object;
        if (clickedPlanet.callback) {
            clickedPlanet.callback(); // Show planet details
        }
    } else {
        // Hide details and close the drawer if clicked outside
        const details = document.getElementById("details");
        details.style.display = 'none';

        const drawerLeft = document.getElementById("drawerLeft");
        if (drawerLeft.classList.contains('active')) {
            drawerLeft.classList.remove('active'); // Close the drawer
        }
    }
});

function createPlanetLabels() {
    planetData.forEach(data => {
        const label = document.createElement('div');
        label.className = 'planet-label';
        label.textContent = data.name;
        label.style.position = 'absolute';
        label.style.color = 'white';
        label.style.pointerEvents = 'none';
        label.style.display = 'none';
        document.body.appendChild(label);
        planetLabels.push(label);
    });
}

function createAsteroids() {
    const asteroidGeometry = new THREE.OctahedronGeometry(0.05 + Math.random() * 0.1, 1);
    const textureLoader = new THREE.TextureLoader();
    const innerRadius = 5.7;
    const outerRadius = 6.2;
    const heightVariation = 2.5;

    for (let i = 0; i < 50; i++) {
        textureLoader.load("textures/asteroid.jpg", (texture) => {
            const material = new THREE.MeshStandardMaterial({ map: texture });
            const asteroid = new THREE.Mesh(asteroidGeometry, material);
            const distance = innerRadius + Math.random() * (outerRadius - innerRadius);
            const angle = Math.random() * Math.PI * 2;
            asteroid.position.set(distance * Math.cos(angle), (Math.random() - 0.5) * heightVariation, distance * Math.sin(angle));
            scene.add(asteroid);
            asteroids.push(asteroid);
        });
    }
}

function createConstellations() {
    const constellationMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    constellations.forEach(constellation => {
        const points = [];
        constellation.stars.forEach(star => {
            points.push(new THREE.Vector3(star.position.x, star.position.y, star.position.z));
        });
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const constellationLine = new THREE.Line(geometry, constellationMaterial);
        scene.add(constellationLine);
        constellationLines.push(constellationLine); // Store the line for toggling
    });
}

function animate() {
    requestAnimationFrame(animate);
    updatePlanets();
    controls.update();
    renderer.render(scene, camera);
}

function updatePlanets() {
    Object.values(planets).forEach(planet => {
        planet.userData.orbitAngle += speed * planet.userData.speed;
        const a = planet.userData.semiMajorAxis;
        const e = planet.userData.eccentricity;
        const r = a * (1 - e * e) / (1 + e * Math.cos(planet.userData.orbitAngle));
        planet.position.x = r * Math.cos(planet.userData.orbitAngle);
        planet.position.z = r * Math.sin(planet.userData.orbitAngle);
        planet.rotation.y += planet.userData.speed/10; // Rotate around the Y-axis
        const labelIndex = planetData.findIndex(data => data.name === planet.userData.name);
        if (labelIndex !== -1) {
            const label = planetLabels[labelIndex];
            const labelPos = planet.position.clone().project(camera);
            label.style.left = `${(labelPos.x * 0.5 + 0.5) * window.innerWidth}px`;
            label.style.top = `${-(labelPos.y * 0.5 - 0.5) * window.innerHeight - 20 }px`;
            label.style.display = 'block';
        }
    });
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const defaultCameraPosition = new THREE.Vector3(0, 5, 10); // Default camera position
const defaultCameraRotation = new THREE.Vector3(0, 0, 0); // Default camera rotation

document.getElementById("reset-camera").addEventListener('click', () => {
    camera.position.copy(defaultCameraPosition); // Reset to default position
    camera.rotation.set(defaultCameraRotation.x, defaultCameraRotation.y, defaultCameraRotation.z); // Reset rotation
    controls.update(); // Update controls
});


init();
