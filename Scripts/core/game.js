/// <reference path="_reference.ts"/>
// ********************************************
// * Source file : game.ts                    *
// * Author name : Yaroslav Kabanov           *
// * Last Modified by : Yaroslav Kabanov      *
// * Last Date Modified : February 26th, 2016 *
// * Program Description : Three.js based     *
// * simulation of Solar System (6 planets)   *
// * Version: 1.0                             *
// ********************************************    
// Git Rero: https://github.com/YaroslavKabanov/solar_system.git
// Live Link: http://solar-system-kabanov.azurewebsites.net 
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var Control = objects.Control;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var HemisphereLight = THREE.HemisphereLight;
//import Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var Planet = objects.Planet;
var sphereGeometry;
var sphereMaterial;
var spotLight;
var scene;
var axis;
var camera;
var renderer;
var sun;
var jupiter;
var earth;
var earthMoon;
var mars;
var uranus;
var neptune;
var step = 1;
var stats;
var hemlLight;
var pointLight;
var ambientLight;
var gui;
var control;
var zoomEarth;
var zoomMars;
var zoomJupiter;
var moon;
var moonCentre;
var moon2;
var moonCentre2;
function init() {
    // new scene objects
    scene = new Scene();
    // setup default renderer
    setupRenderer();
    // setup camera
    setupCamera();
    // add an axis helper 
    axis = new AxisHelper(50);
    scene.add(axis);
    // add stats 
    addStatsObject();
    document.body.appendChild(renderer.domElement);
}
// create all meshes and lights 
function createGeometry() {
    // new Planet(size,materialColor, distanceFromSun, planenRotationSpeed)
    sun = new Planet(15, 'sun', 0, 0);
    sun.castShadow = true;
    sun.receiveShadow = true;
    mars = new Planet(4, 'mars', 20, 0.4);
    mars.castShadow = true;
    mars.receiveShadow = true;
    earth = new Planet(5, 'earth', 40, 0.8);
    earth.castShadow = true;
    earth.receiveShadow = true;
    jupiter = new Planet(10, 'jupiter', 70, 0.5);
    jupiter.castShadow = true;
    jupiter.receiveShadow = true;
    uranus = new Planet(7, 'uranus', 90, 0.1);
    uranus.castShadow = true;
    uranus.receiveShadow = true;
    neptune = new Planet(8, 'neptune', 110, 0.4);
    neptune.castShadow = true;
    neptune.receiveShadow = true;
    moonCentre = new Object3D;
    scene.add(moonCentre);
    moonCentre2 = new Object3D;
    scene.add(moonCentre2);
    // earth's moon
    sphereMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('Content/images/moon.jpg') });
    sphereGeometry = new SphereGeometry(2, 20, 20);
    moon = new Mesh(sphereGeometry, sphereMaterial);
    moon.position.set(6, 6, 0);
    moon.castShadow = true;
    moonCentre.add(moon);
    // neptune's moon
    sphereMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('Content/images/moon.jpg') });
    sphereGeometry = new SphereGeometry(4, 20, 20);
    moon2 = new Mesh(sphereGeometry, sphereMaterial);
    moon2.position.set(10, 10, 0);
    moon2.castShadow = true;
    moonCentre2.add(moon2);
    // added planets to scene 
    scene.add(sun.planet);
    scene.add(mars.planet);
    scene.add(earth.planet);
    scene.add(jupiter.planet);
    scene.add(uranus.planet);
    scene.add(neptune.planet);
    scene.add(moonCentre);
    moonCentre.add(moon);
    scene.add(moonCentre2);
    moonCentre2.add(moon2);
    // added hem Light 
    hemlLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    scene.add(hemlLight);
    /*
     spotLight = new SpotLight( 0x000000 );
     spotLight.position.set( 0, 20, 180 );
     spotLight.castShadow = true;
     spotLight.lookAt(scene.position);
     pointLight.intensity = 2;
     pointLight.distance = 100;
     
     scene.add(spotLight);
     */
    // added point light
    pointLight = new PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 0);
    pointLight.intensity = 9;
    pointLight.distance = 120;
    pointLight.castShadow = true;
    pointLight.shadowMapWidth = 1024;
    pointLight.shadowMapHeight = 1248;
    scene.add(pointLight);
    // add ambient light 
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
}
// add controls
gui = new GUI();
control = new Control(0.05);
addControl(control);
function addControl(controlObject) {
    gui.add(controlObject, "zoomEarth"); // zoom planet with moon - Earth
    gui.add(controlObject, "zoomMars"); // zoom to Mars
    gui.add(controlObject, "zoomJupiter"); // zoom to Jupiter
    gui.add(controlObject, "zoomPlanetOut"); // back to normal view 
}
// planet position x 
function planetPositionX(position, speed) {
    return position * Math.sin(step * speed);
}
// planet position z
function planetPositionZ(position, speed) {
    return position * Math.cos(step * speed);
}
// planet position y
function planetPositionY(position, speed) {
    return position * Math.cos(step * speed);
}
// game loop 
function gameLoop() {
    step += 0.01;
    mars.planet.position.x = planetPositionX(mars.pos, mars.speed);
    mars.planet.position.z = planetPositionZ(mars.pos, mars.speed);
    mars.planet.rotation.y += 0.020;
    earth.planet.position.x = planetPositionX(earth.pos, earth.speed);
    earth.planet.position.z = planetPositionZ(earth.pos, earth.speed);
    earth.planet.rotation.y += 0.020;
    moonCentre.position.x = planetPositionX(earth.pos, earth.speed);
    moonCentre.position.z = planetPositionZ(earth.pos, earth.speed);
    moonCentre2.position.x = planetPositionX(neptune.pos, neptune.speed);
    moonCentre2.position.z = planetPositionZ(neptune.pos, neptune.speed);
    jupiter.planet.position.x = planetPositionX(jupiter.pos, jupiter.speed);
    jupiter.planet.position.z = planetPositionZ(jupiter.pos, jupiter.speed);
    jupiter.planet.rotation.y += 0.020;
    uranus.planet.position.x = planetPositionX(uranus.pos, uranus.speed);
    uranus.planet.position.z = planetPositionZ(uranus.pos, uranus.speed);
    uranus.planet.rotation.y += 0.020;
    neptune.planet.position.x = planetPositionX(neptune.pos, neptune.speed);
    neptune.planet.position.z = planetPositionZ(neptune.pos, neptune.speed);
    neptune.planet.rotation.y += 0.020;
    moonCentre.rotation.z += 0.020;
    moon.rotation.y += 0.025;
    moonCentre2.rotation.z += 0.03;
    moon2.rotation.y += 0.025;
    if (zoomEarth == true) {
        control.zoomEarth();
    }
    if (zoomMars == true) {
        control.zoomMars();
    }
    if (zoomJupiter == true) {
        control.zoomJupiter();
    }
    requestAnimationFrame(gameLoop);
    renderer.render(scene, camera);
}
// on page load methods     
window.onload = function () {
    init();
    createGeometry();
    gameLoop();
};
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //     renderer.shadowMap.enabled = true;
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 70;
    camera.position.z = 180;
    camera.lookAt(scene.position);
}
// add stats
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
//# sourceMappingURL=game.js.map