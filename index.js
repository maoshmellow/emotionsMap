/* import Globe from 'globe.gl'; */
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'
import { TrackballControls } from './node_modules/three/examples/jsm/controls/TrackballControls.js';
import { NearestFilter } from 'three';
import { Tween } from '@tweenjs/tween.js';

var globeContainer = document.getElementById("globeContainer");
var containerWidth = globeContainer.offsetWidth;
var containerHeight = globeContainer.offsetHeight;

const globeButton = document.getElementById("globeButton");
let spatialCoords;
let spatialX;
let spatialY;
let spatialZ;


//globe button setup
function findState(){
  const state = document.getElementById("locationText");

  function success(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    spatialCoords = Globe.getCoords(latitude, longitude);
    spatialX = spatialCoords.x;
    spatialY = spatialCoords.y;
    spatialZ = spatialCoords.z;
    
    const targetPosition = new THREE.Vector3(spatialX, spatialY, spatialZ);
    let duration = 3000;

    tweenCamera( targetPosition, duration );

    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    fetch(geoApiUrl)
    .then(res => res.json())
    .then(data => {
      state.textContent = data.principalSubdivision;
      console.log(data);
    })
  }
  
  function error(){
    state.textContent = "xxx";
  }

  navigator.geolocation.getCurrentPosition(success, error);
}



globeButton.addEventListener("click", findState);

//three-globe setup

const N = 300;
const gData = [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: Math.random() / 3,
    color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
}));

const Globe = new ThreeGlobe()
  .globeImageUrl("./textures/earthLights.jpg")
  .bumpImageUrl("./textures/bumpMap.jpg")
  .pointsData(gData)


// Setup SkyBox
var skyBox = new THREE.SphereGeometry(10000, 25, 25);
var textureLoader = new THREE.TextureLoader(), texture = textureLoader.load("./textures/night-sky1.jpg");
texture.minFilter = NearestFilter; //gets rid of pole pinching
var skyMaterial = new THREE.MeshPhongMaterial({
  map:texture,
})

var sky = new THREE.Mesh(skyBox, skyMaterial);
sky.material.side = THREE.BackSide;

// Setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(containerWidth, containerHeight);
document.getElementById('globeViz').appendChild(renderer.domElement);

// Setup scene
const scene = new THREE.Scene();
scene.add(Globe);
scene.add(new THREE.AmbientLight(0xbbbbbb));
scene.add(new THREE.DirectionalLight(0xffffff, 0.6));
scene.add(sky);

// Setup camera
const camera = new THREE.PerspectiveCamera();
camera.aspect = containerWidth/containerHeight;
camera.near = .1;
camera.far = 1000000;
camera.updateProjectionMatrix();
camera.position.z = 500;


// Add camera controls
const tbControls = new TrackballControls(camera, renderer.domElement);
tbControls.minDistance = 150;
tbControls.maxDistance = 900;
tbControls.rotateSpeed = 3;
tbControls.zoomSpeed = 0.8;

// Kick-off renderer
(function animate() { // IIFE
  // Frame cycle
  TWEEN.update();
  tbControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
})();

//transitions rotating camera position smoothly
function tweenCamera(targetPosition, duration) {
  tbControls.enabled = false;

  var position = new THREE.Vector3().copy( camera.position );

  var tween = new TWEEN.Tween(position)
      .to(targetPosition, duration)
      .onUpdate(function () {
          camera.position.copy(position);
          camera.lookAt( tbControls.target );
      } )
      .onComplete(function () {
          camera.position.copy(targetPosition);
          camera.lookAt(tbControls.target );
          tbControls.enabled = true;
      } )
      .start();

}