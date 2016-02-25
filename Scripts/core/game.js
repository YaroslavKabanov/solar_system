/// <reference path="_reference.ts"/>
// ********************************************
// * Source file : game.ts                    *
// * Author name : Yaroslav Kabanov           *
// * Last Modified by : Yaroslav Kabanov      *
// * Last Date Modified : February 5th, 2016  *
// * Program Description : Three.js rotating  *
// * cube-man. Player can change rotation     *
// * speed and change color of the cubes.     *
// ********************************************    
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
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
var scene;
var axis;
var camera;
var renderer;
var sun;
var jupiter;
var earth;
var earthMoon;
var step = 1;
var stats;
var hemlLight;
var pointLight;
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
    addStatsObject();
    document.body.appendChild(renderer.domElement);
}
function createGeometry() {
    // new Planet(size,materialColor, positionFromSun, planetSpeed)
    sun = new Planet(15, 'sun', 0, 0);
    earth = new Planet(5, 'earth', 50, 0.3);
    jupiter = new Planet(10, 'jupiter', 70, 0.5);
    earthMoon = new Planet(2, 'moon2', 30, 0.7);
    scene.add(sun.planet);
    scene.add(jupiter.planet);
    scene.add(earth.planet);
    jupiter.add(earthMoon.planet);
    hemlLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    scene.add(hemlLight);
    pointLight = new THREE.PointLight(0xffffff, 0.2, 0);
    pointLight.position.set(0, 90, 90);
    scene.add(pointLight);
}
/*
    function Moon(size, material, position, speed) {
        this.name = new THREE.SphereGeometry(size, 20, 20);
        this.mat = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('images/' + material + '.jpg') });
        this.planet = new THREE.Mesh(this.name, this.mat);
        this.pos = position;
        this.speed = speed;
        scene.add(this.planet);
    }
    */
function planetPositionX(position, speed) {
    return position * Math.sin(step * speed);
}
function planetPositionZ(position, speed) {
    return position * Math.cos(step * speed);
}
function planetPositionY(position, speed) {
    return position * Math.cos(step * speed);
}
function animate() {
    step += 0.01;
    jupiter.planet.position.x = planetPositionX(jupiter.pos, jupiter.speed);
    jupiter.planet.position.z = planetPositionZ(jupiter.pos, jupiter.speed);
    earth.planet.position.x = planetPositionX(earth.pos, earth.speed);
    earth.planet.position.z = planetPositionZ(earth.pos, earth.speed);
    earthMoon.planet.position.x = planetPositionX(earthMoon.pos, earthMoon.speed);
    earthMoon.planet.position.z = planetPositionZ(earthMoon.pos, earthMoon.speed);
    earthMoon.planet.position.y = planetPositionY(earthMoon.pos, earthMoon.speed);
    //   moon2.planet.position.x = planetPositionX(moon2.pos, moon2.speed);
    //   moon2.planet.position.z = planetPositionZ(moon2.pos, moon2.speed);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
window.onload = function () {
    init();
    createGeometry();
    animate();
};
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0x040404, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //     renderer.shadowMap.enabled = true;
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 70;
    camera.position.z = 180;
    camera.lookAt(scene.position);
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
//# sourceMappingURL=game.js.map