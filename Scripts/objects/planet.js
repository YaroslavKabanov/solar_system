/// <reference path="../../typings/tsd.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var objects;
(function (objects) {
    // Planet class 
    var Planet = (function (_super) {
        __extends(Planet, _super);
        // planet constructor 
        function Planet(size, material, position, speed) {
            this.geometry = new THREE.SphereGeometry(size, 20, 20);
            this.mat = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('Content/images/' + material + '.jpg') });
            _super.call(this, this.geometry, this.mat);
            this.planet = new THREE.Mesh(this.geometry, this.mat);
            this.pos = position;
            this.speed = speed;
        }
        return Planet;
    })(THREE.Mesh);
    objects.Planet = Planet;
})(objects || (objects = {}));
//# sourceMappingURL=planet.js.map