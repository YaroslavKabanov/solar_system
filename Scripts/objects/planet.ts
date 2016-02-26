/// <reference path="../../typings/tsd.d.ts"/>

// ********************************************
// * Source file : planet.ts                  *
// * Author name : Yaroslav Kabanov           *
// * Last Modified by : Yaroslav Kabanov      *
// * Last Date Modified : February 26th, 2016 *
// * Program Description : Three.js based     *
// * simulation of Solar System (6 plantes)   *
// * Version: 1.0                             *
// ********************************************    
// Git Rero: https://github.com/YaroslavKabanov/solar_system.git
// Live Link: http://solar-system-kabanov.azurewebsites.net 

module objects {
    // Planet class 
    export class Planet extends THREE.Mesh {
        public geometry: THREE.Geometry;
        public mat: THREE.Material;
        public planet: THREE.Mesh;
        public pos: number;
        public speed: number;
        public size: number;
        // planet constructor 
        constructor (size:number, material:string, position:number, speed:number) {
            this.geometry = new THREE.SphereGeometry(size, 20, 20);
            this.mat = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('images/' + material + '.jpg') });
            super(this.geometry, this.mat);
            this.planet = new THREE.Mesh(this.geometry, this.mat);
            this.pos = position;
            this.speed = speed;
        }
    }
}