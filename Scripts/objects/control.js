/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed) {
            this.rotationSpeed = rotationSpeed;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.zoomPlanetOut = function () {
            camera.position.set(0, 70, 180);
            camera.lookAt(scene.position);
        };
        Control.prototype.zoomPlanetIn = function () {
            camera.position.set(earth.planet.position.x - 50, earth.planet.position.y + 50, earth.planet.position.z + 50);
            camera.lookAt(earth.planet.position);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map