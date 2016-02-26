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

import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import Control = objects.Control;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import HemisphereLight = THREE.HemisphereLight;
//import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;

//Custom Game Objects
import Planet  = objects.Planet;


var scene: Scene;
var axis: AxisHelper;
var camera: PerspectiveCamera;
var renderer: Renderer; 
var sun: Planet;
var jupiter: Planet;
var earth: Planet;
var earthMoon: Planet;
var mars: Planet;
var uranus: Planet;
var neptune: Planet;
var step: number = 1;
var stats: Stats;
var hemlLight: HemisphereLight;
var pointLight: PointLight;
var ambientLight: AmbientLight;
var gui: GUI;
var control: Control;

    function init () {
        // new scene objects
        scene = new Scene ();
        
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

    function createGeometry() : void {
           // new Planet(size,materialColor, positionFromSun, planetSpeed)

    sun = new Planet(15,'sun',0,0);
    sun.castShadow = true;
    mars = new Planet(4, 'mars', 20, 0.4);
    mars.castShadow = true;
    earth = new Planet(5,'earth', 40, 0.8);
    earth.castShadow = true;
    jupiter = new Planet(10, 'jupiter', 70, 0.5);
    jupiter.castShadow = true;
    uranus = new Planet(7, 'uranus', 90, 0.1);
    uranus.castShadow = true;
    neptune = new Planet(8, 'neptune', 100, 0.4);
    neptune.castShadow = true;
    
    earthMoon = new Planet(2, 'moon2', 30, 0.8);

     scene.add(sun.planet);
     scene.add(mars.planet);
     scene.add(earth.planet);
     scene.add(jupiter.planet);
     scene.add(uranus.planet);
     scene.add(neptune.planet);


    hemlLight = new THREE.HemisphereLight( 0xffffff, 0xffffff,1);
    scene.add(hemlLight);

 //   pointLight = new THREE.PointLight(0xffffff,0.2,0);
 //   pointLight.position.set(0, 90, 90);
 //   scene.add(pointLight);
 
 pointLight = new PointLight( 0xffffff, 1, 100 );
    pointLight.position.set(0,4,0);
    pointLight.intensity = 5;
    pointLight.distance = 100;
    pointLight.castShadow = true;
    pointLight.shadowMapWidth = 2048;
    pointLight.shadowMapHeight = 2048;
    
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
        
        
    }

     // add controls
    gui = new GUI();
    control = new Control(0.05);
    addControl(control);
    
    function addControl(controlObject: Control): void {
    gui.add({zoom: 100}, 'zoom', 15, 150).onChange(function(value){
        camera.fov=value;
        camera.updateProjectionMatrix();
    });
}

        function planetPositionX(position,speed){
        return position * Math.sin(step*speed);
         }

        function planetPositionZ(position,speed){
            return position * Math.cos(step*speed);
        }

        function planetPositionY(position, speed) {
            return position * Math.cos(step * speed);
        }


    function animate(): void {
        step +=0.01;
        
        mars.planet.position.x = planetPositionX(mars.pos, mars.speed);
        mars.planet.position.z = planetPositionZ(mars.pos, mars.speed);
        
        earth.planet.position.x = planetPositionX(earth.pos, earth.speed);
        earth.planet.position.z = planetPositionZ(earth.pos, earth.speed);
        
        jupiter.planet.position.x = planetPositionX(jupiter.pos, jupiter.speed);
        jupiter.planet.position.z = planetPositionZ(jupiter.pos, jupiter.speed);
        
        uranus.planet.position.x = planetPositionX(uranus.pos, uranus.speed);
        uranus.planet.position.z = planetPositionZ(uranus.pos, uranus.speed);
        
        neptune.planet.position.x = planetPositionX(neptune.pos, neptune.speed);
        neptune.planet.position.z = planetPositionZ(neptune.pos, neptune.speed);
        

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    
window.onload = function () {
    init();
    createGeometry();
    animate();
}

// Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x040404, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
   //     renderer.shadowMap.enabled = true;
    }
    
 // Setup main camera for the scene
    function setupCamera(): void {
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