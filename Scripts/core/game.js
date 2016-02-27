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
var mercuryObject;
var venusObject;
var earthObject;
var marsObject;
var jupiterObject;
//planet meshs
var mercuryMesh;
var venusMesh;
var earthMesh;
var marshMesh;
var jupiterMesh;
//moon mesh
var moonMesh;
function init() {
    scene = new Scene();
    setupRenderer();
    setupCamera();
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //adding sun
    sun = new gameObject(new SphereGeometry(3, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/sun.jpg") }), 0, 0, 0);
    scene.add(sun);
    //rotation game objects
    mercuryObject = new Object3D();
    venusObject = new Object3D();
    earthObject = new Object3D();
    marsObject = new Object3D();
    jupiterObject = new Object3D();
    mercuryObject.position.set(0, 0, 0);
    venusObject.position.set(0, 0, 0);
    earthObject.position.set(0, 0, 0);
    marsObject.position.set(0, 0, 0);
    jupiterObject.position.set(0, 0, 0);
    sun.add(mercuryObject);
    sun.add(venusObject);
    sun.add(earthObject);
    sun.add(marsObject);
    sun.add(jupiterObject);
    mercuryMesh = new gameObject(new SphereGeometry(1, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/planetmercury.jpg") }), -5, 0, 0);
    mercuryObject.add(mercuryMesh);
    console.log("added planet");
    venusMesh = new gameObject(new SphereGeometry(1, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/planetvenus.jpg") }), -10, 0, 0);
    venusObject.add(venusMesh);
    earthMesh = new gameObject(new SphereGeometry(1.5, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/planetearth.jpg") }), -13, 0, 0);
    earthObject.add(earthMesh);
    moonMesh = new gameObject(new SphereGeometry(0.5, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/planetmoon.jpg") }), -1.5, 0, 1.5);
    earthMesh.add(moonMesh);
    marshMesh = new gameObject(new SphereGeometry(1.1, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/planetmars.jpg") }), -16, 0, 0);
    marsObject.add(marshMesh);
    moonMesh = new gameObject(new SphereGeometry(0.2, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/mars-moon.jpg") }), -0.3, 0, 1.5);
    marshMesh.add(moonMesh);
    jupiterMesh = new gameObject(new SphereGeometry(2, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/planetjupiter.jpg") }), -21, 0, 0);
    jupiterObject.add(jupiterMesh);
    moonMesh = new gameObject(new SphereGeometry(0.2, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/mars_moon.jpg") }), -1.8, 0, 1.5);
    jupiterMesh.add(moonMesh);
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
    // add controls
    gui = new GUI();
    control = new Control(0.002);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	   
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'zoomInEarth');
    gui.add(controlObject, 'zoom').listen();
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
    mercuryObject.rotation.y += 0.04;
    venusObject.rotation.y += 0.025;
    earthObject.rotation.y += 0.01;
    marsObject.rotation.y += 0.008;
    jupiterObject.rotation.y += 0.002;
    //orbit of moon 
    earthMesh.rotation.y += 0.02;
    jupiterMesh.rotation.y += 0.05;
    marshMesh.rotation.y += 0.05;
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