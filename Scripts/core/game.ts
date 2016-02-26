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


var sphereGeometry: SphereGeometry;
var sphereMaterial:LambertMaterial;
var spotLight: SpotLight;
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
var zoom: boolean;
var moon: Mesh;
var moonCentre: Object3D;

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
        
        // add stats 
        addStatsObject();
        
        document.body.appendChild(renderer.domElement);
        
        
        
    }
    // create all meshes and lights 
    function createGeometry() : void {
   // new Planet(size,materialColor, distanceFromSun, planenRotationSpeed)

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
   
    neptune = new Planet(8, 'neptune', 110, 0.4);
    neptune.castShadow = true;
    
    moonCentre = new Object3D;
    scene.add(moonCentre);
   
   sphereMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('Content/images/moon.jpg') });
   sphereGeometry = new SphereGeometry(2,20,20);
   moon = new Mesh(sphereGeometry, sphereMaterial);
   moon.position.set(6,6,0);
   moon.castShadow = true; 
   moonCentre.add(moon); 
   

     scene.add(sun.planet);
     scene.add(mars.planet);
     scene.add(earth.planet);
     scene.add(jupiter.planet);
     scene.add(uranus.planet);
     scene.add(neptune.planet);
     scene.add(moonCentre);
      moonCentre.add(moon); 
    
    

     // added hem Light 
     hemlLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1);
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
    pointLight = new PointLight( 0xffffff, 1 , 100 );
    pointLight.position.set(0,0,0);
    pointLight.intensity = 20;
    pointLight.distance = 100;
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
    
    function addControl(controlObject: Control): void {
         gui.add(controlObject, "zoomPlanetIn"); // zoom planet with moon
         gui.add(controlObject, "zoomPlanetOut"); // back to normal view 
          
}
        // planet position x 
        function planetPositionX(position,speed){
        return position * Math.sin(step*speed);
         }
         // planet position z
        function planetPositionZ(position,speed){
            return position * Math.cos(step*speed);
        }
        // planet position y
        function planetPositionY(position, speed) {
            return position * Math.cos(step * speed);
        }

        // game loop 
    function gameLoop(): void {
        step +=0.01;
        
        mars.planet.position.x = planetPositionX(mars.pos, mars.speed);
        mars.planet.position.z = planetPositionZ(mars.pos, mars.speed);
        mars.planet.rotation.y += 0.020;
        
        earth.planet.position.x = planetPositionX(earth.pos, earth.speed);
        earth.planet.position.z = planetPositionZ(earth.pos, earth.speed);
        earth.planet.rotation.y += 0.020;
        
        moonCentre.position.x = planetPositionX(earth.pos, earth.speed);
        moonCentre.position.z = planetPositionZ(earth.pos, earth.speed);      
  
        jupiter.planet.position.x = planetPositionX(jupiter.pos, jupiter.speed);
        jupiter.planet.position.z = planetPositionZ(jupiter.pos, jupiter.speed);
        jupiter.planet.rotation.y += 0.020;
        
        uranus.planet.position.x = planetPositionX(uranus.pos, uranus.speed);
        uranus.planet.position.z = planetPositionZ(uranus.pos, uranus.speed);
        uranus.planet.rotation.y += 0.020;
        
        neptune.planet.position.x = planetPositionX(neptune.pos, neptune.speed);
        neptune.planet.position.z = planetPositionZ(neptune.pos, neptune.speed);
        neptune.planet.rotation.y += 0.020;
   
        
        
        moonCentre.rotation.z += 0.025;
            
   /*     
        moon.planet.position.x = planetPositionX(moon.pos, moon.speed);
        moon.planet.position.z = planetPositionZ(moon.pos, moon.speed);
        */
        
        if (zoom == true) {
             control.zoomPlanetIn(); 
        }
        
        

        requestAnimationFrame(gameLoop);
        renderer.render(scene, camera);
    }
// on page load methods     
window.onload = function () {
    init();
    createGeometry();
    gameLoop();
}

// Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
   //     renderer.shadowMap.enabled = true;
    }
    
 // Setup main camera for the scene
    function setupCamera(): void {
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