/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    export class Planet extends THREE.Mesh {
        public geometry: THREE.Geometry;
        public mat: THREE.Material;
        public planet: THREE.Mesh;
        public pos: number;
        public speed: number;
        public size: number;
        
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