/// <reference path="../../typings/tsd.d.ts"/>

// ********************************************
// * Source file : control.ts                 *
// * Author name : Yaroslav Kabanov           *
// * Last Modified by : Yaroslav Kabanov      *
// * Last Date Modified : February 26th, 2016 *
// * Program Description : Three.js based     *
// * simulation of Solar System (6 planets)   *
// * Version: 1.0                             *
// ********************************************    
// Git Rero: https://github.com/YaroslavKabanov/solar_system.git
// Live Link: http://solar-system-kabanov.azurewebsites.net 

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotationSpeed:number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed:number) {
           this.rotationSpeed = rotationSpeed;
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       //  zoom out to see all planets 
        public zoomPlanetOut(): void {
            zoomMars = false; 
            zoomEarth = false;
            zoomJupiter = false; 
            camera.position.set(0, 70, 180);
            camera.lookAt(scene.position);     
              
         } 
          // zoom planet with moon 
         public zoomEarth(): void {
            camera.position.set(earth.planet.position.x - 50, earth.planet.position.y + 50, earth.planet.position.z + 50);
            camera.lookAt(earth.planet.position);
            zoomEarth = true;
         } 
         
          public zoomMars(): void {
            camera.position.set(mars.planet.position.x - 50, mars.planet.position.y + 50, mars.planet.position.z + 50);
            camera.lookAt(mars.planet.position);
            zoomMars = true;
         } 
         
          public zoomJupiter(): void {
            camera.position.set(jupiter.planet.position.x - 50, jupiter.planet.position.y + 50, jupiter.planet.position.z + 50);
            camera.lookAt(jupiter.planet.position);
            zoomJupiter = true;
         } 
         
         
     }
 }

