/// <reference path="_reference.ts"/>
/**
 * @author: Gursharnbir Singh
 * @project name : SolarSystem
 */
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
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var ambientLight;
var spotLight;
var pointLight;
var control;
var gui;
var stats;
var step = 0;
//sun mesh
var sun;
//planet objects
var object_mercury;
var object_venus;
var object_earth;
var object_mars;
var object_jupiter;
//planet meshs
var mesh_mercury;
var mesh_venus;
var mesh_earth;
var mesh_mars;
var mesh_jupiter;
//moon mesh
var moon;
function init() {
    scene = new Scene();
    setupRenderer();
    setupCamera();
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //add sun
    sun = new gameObject(new SphereGeometry(3, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/sun.jpg") }), 0, 0, 0);
    scene.add(sun);
    //rotation game objects
    object_mercury = new Object3D();
    object_venus = new Object3D();
    object_earth = new Object3D();
    object_mars = new Object3D();
    object_jupiter = new Object3D();
    object_mercury.position.set(0, 0, 0);
    object_venus.position.set(0, 0, 0);
    object_earth.position.set(0, 0, 0);
    object_mars.position.set(0, 0, 0);
    object_jupiter.position.set(0, 0, 0);
    sun.add(object_mercury);
    sun.add(object_venus);
    sun.add(object_earth);
    sun.add(object_mars);
    sun.add(object_jupiter);
    mesh_mercury = new gameObject(new SphereGeometry(1, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/planetmercury.jpg") }), -5, 0, 0);
    object_mercury.add(mesh_mercury);
    console.log("added planet");
    mesh_venus = new gameObject(new SphereGeometry(1, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/planetvenus.jpg") }), -10, 0, 0);
    object_venus.add(mesh_venus);
    mesh_earth = new gameObject(new SphereGeometry(1.5, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/planetearth.jpg") }), -13, 0, 0);
    object_earth.add(mesh_earth);
    moon = new gameObject(new SphereGeometry(0.5, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/planetmoon.jpg") }), -1.5, 0, 1.5);
    mesh_earth.add(moon);
    mesh_mars = new gameObject(new SphereGeometry(1.1, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/planetmars.jpg") }), -16, 0, 0);
    object_mars.add(mesh_mars);
    moon = new gameObject(new SphereGeometry(0.2, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/mars-moon.jpg") }), -0.3, 0, 1.5);
    mesh_mars.add(moon);
    mesh_jupiter = new gameObject(new SphereGeometry(2, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/planetjupiter.jpg") }), -21, 0, 0);
    object_jupiter.add(mesh_jupiter);
    moon = new gameObject(new SphereGeometry(0.2, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/mars_moon.jpg") }), -1.8, 0, 1.5);
    mesh_jupiter.add(moon);
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0xa5a5a5);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    //Add a PointLight to the scene
    //(Represents the sun's light)
    pointLight = new PointLight(0xffffff);
    pointLight.castShadow = true;
    pointLight.intensity = 1;
    pointLight.shadowMapHeight = 2048;
    pointLight.shadowMapWidth = 2048;
    scene.add(pointLight);
    console.log("Added a PointLight to the scene");
    // add controls
    gui = new GUI();
    var zoomIn = { add: function () {
            camera.position = new Vector3(0, 0, 0);
            object_earth.add(camera);
            camera.lookAt(mesh_earth.position);
        } };
    var zoomOut = { add: function () {
            object_earth.remove(camera);
            camera.position.x = -20;
            camera.position.y = 25;
            camera.position.z = 20;
            camera.lookAt(new Vector3(5, 0, 0));
        } };
    gui.add(zoomIn, 'add');
    gui.add(zoomOut, 'add');
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	   
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
function gameLoop() {
    stats.update();
    //orbit of the planets
    object_mercury.rotation.y += 0.04;
    object_venus.rotation.y += 0.025;
    object_earth.rotation.y += 0.01;
    object_mars.rotation.y += 0.008;
    object_jupiter.rotation.y += 0.002;
    //orbit of moon 
    mesh_earth.rotation.y += 0.02;
    mesh_jupiter.rotation.y += 0.05;
    mesh_mars.rotation.y += 0.05;
    requestAnimationFrame(gameLoop);
    renderer.render(scene, camera);
}
function setupRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    // renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000, 0);
    // renderer = new Renderer({ alpha: true });
    //  renderer.setClearColor(0xffffff, 0.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight);
    camera.position.x = -50;
    camera.position.y = 25;
    camera.position.z = 20;
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map