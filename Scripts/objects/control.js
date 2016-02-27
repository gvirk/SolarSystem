/// <reference path="../../typings/tsd.d.ts"/>
/**
 * @author: Gursharnbir Singh
 * @project name : SolarSystem
 */
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++ 
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(target) {
            this.target = target;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map