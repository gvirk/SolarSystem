/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed) {
            this.zoom = "ZoomOut";
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        //Control Switch event action for Zoom In and ZoomOut the camera
        Control.prototype.zoomInEarth = function () {
            if (this.zoom == "Zoom In Earth") {
                camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.x = -50;
                camera.position.y = 25;
                camera.position.z = 20;
                camera.lookAt(new Vector3(5, 0, 0));
                console.log("Finished setting up Camera...");
                this.zoom = "Zoom Out";
            }
            else {
                camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.x = -10;
                camera.position.y = 0;
                camera.position.z = 0;
                camera.lookAt(new Vector3(5, 0, 0));
                console.log("Finished setting up zoom Earth Camera...");
                this.zoom = "Zoom In Earth";
                earthMesh.add(camera);
            }
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map