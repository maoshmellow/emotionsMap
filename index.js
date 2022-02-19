import Globe from 'globe.gl';
import * as THREE from 'three';

const N = 300;
const gData = [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: Math.random() / 3,
    color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
}));


const myGlobe = Globe();
myGlobe(document.getElementById('globeViz'))
  /* .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg') */
  .globeImageUrl("./textures/earthLights.jpg")
  .bumpImageUrl("./textures/bumpMap.jpg")
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
  .pointsData(gData);
