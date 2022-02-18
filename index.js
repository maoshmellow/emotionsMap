// Copyright (c) 2021 Tactic, LLC

var mainScene;
var mainCamera;
var mainAudioListener;
var mainRenderer;
var currentScene = null;

var modelPlaced = false;

var isInitial = true;

var background = document.getElementById("background");
var loadingScreen = document.getElementById("loadingScreen");

var menuIcon = document.getElementById("menuIcon");
var menu = document.getElementById("sideMenu");
var landingPage = document.getElementById('landingPage');
var menuOn = false;

var ignatiusButton = document.getElementById('ignatiusBox');
var lobosButton = document.getElementById('lobosBox');
var cartwrightButton = document.getElementById('cartwrightBox');

var aboutIgnatiusButton = document.getElementById('button1');
var aboutLobosButton = document.getElementById('button2');
var aboutCartwrightButton = document.getElementById('button3');

var menuButton = document.getElementById('button5');
var endShareButton = document.getElementById('shareButton');
var endMenuButton = document.getElementById('restartButton');

var aboutIgnatius = document.getElementById('aboutIgnatius');
var aboutLobos = document.getElementById('aboutLobos');
var aboutCartwright = document.getElementById('aboutCartwright');

var ignatiusTutorial = document.getElementById('ignatiusTutorial');
var lobosTutorial = document.getElementById('lobosTutorial');
var cartwrightTutorial = document.getElementById('cartwrightTutorial');

var startButtons = document.getElementsByClassName('tutorialButton');
var backButton = document.getElementById("backButton");

var tapReticle = document.getElementById('tapReticle');
var scanReticle = document.getElementById('scanReticle');

var onTutorial = false;
var onExperience = false;
var tutorialPage = null;

var currentPage = null;

var logo = document.getElementById("logo");

backButton.addEventListener('click', backToMenu);

enable(loadingScreen,true);
currentPage = loadingScreen;

ignatiusButton.addEventListener('click', function(){
    LoadScene(ignatiusScene);
    isInitial = false;
});
lobosButton.addEventListener('click', function(){
    LoadScene(lobosScene);
    isInitial = false;
});
cartwrightButton.addEventListener('click', function(){
    LoadScene(cartwrightScene);
    isInitial = false;
});

aboutIgnatiusButton.addEventListener('click', () =>{
    enable (currentPage, false);
    enable(aboutIgnatius, true);
    handleMenu();
    currentPage = aboutIgnatius;
}
)

aboutLobosButton.addEventListener('click', () =>{
    enable (currentPage, false);
    enable(aboutLobos, true);
    handleMenu();
    currentPage = aboutLobos;
}
)

aboutCartwrightButton.addEventListener('click', () =>{
    enable (currentPage, false);
    enable(aboutCartwright, true);
    handleMenu();
    currentPage = aboutCartwright;
}
)

menuButton.addEventListener('click', () => {
    backToMenu();
    handleMenu();
}
)

endMenuButton.addEventListener('click', () => {
    backToMenu();
    handleMenu();
}
)


for (let button = 0; button < startButtons.length; button++) {
    startButtons[button].addEventListener('click', () => {
        PlayScene();
        enable(background, false);
    });
}


function startLoad(scene){ 
    enable(loadingScreen, true);
    setInterval(() => {
        if(scene.loaded() == true){
            enable(loadingScreen, false);
            clearInterval(startLoad);
        }}, 
    125);
}

let hasShare = false;
let shareData = {
    url: 'https://usf-web-d.s3.us-west-1.amazonaws.com/index.html',
    }

const shareButton = document.getElementById('button6');

// Must be triggered some kind of "user activation"
shareButton.addEventListener('click', async () => {
    try {
        await navigator.share(shareData);
        hasShare = true;
        //console.log("Can Share");
        //analyticsEvent('share', shareData);
    }
    catch(err) {
        //console.log(err);
        if(!err.message.includes("cancel")){
            copyURL();
            //analyticsEvent('copy', shareData);
        }
    }
});

endShareButton.addEventListener('click', async () => {
    try {
        await navigator.share(shareData);
        hasShare = true;
        //console.log("Can Share");
        //analyticsEvent('share', shareData);
    }
    catch(err) {
        //console.log(err);
        if(!err.message.includes("cancel")){
            copyURL();
            //analyticsEvent('copy', shareData);
        }
    }
});

function copyURL() {
    const el = document.createElement('textarea');
    el.value = shareData.url;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999)
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("Copied URL " + el.value + " to clipboard");
}


function determineScene(){
    if(currentScene == ignatiusScene){
        tutorialPage = ignatiusTutorial;
        currentPage = ignatiusTutorial;
    }

    else if(currentScene == lobosScene){
        tutorialPage = lobosTutorial;
        currentPage = lobosTutorial;
    }

    else if(currentScene == cartwrightScene){
        tutorialPage = cartwrightTutorial;
        currentPage = cartwrightTutorial;
    }
}



function backToMenu(){
    enable(background, true);
    enable(logo, true);
    enable(backButton, false);
    if(currentPage != null){
        enable(currentPage, false);
    }
    enable(landingPage,true, 1);
    currentPage = landingPage;
    if(currentScene != null){
        StopScene();
        UnloadScene();
    }

    if(tapReticle.style.opacity != 0){
        enable(tapReticle, false);
    }
    if(scanReticle.style.opacity != 0){
        enable(scanReticle, false);
    }
}

function LoadScene(nextScene) {
    if (currentScene != null) {
        currentScene.stop();
        currentScene.unload();
    }
    if (nextScene != null) {
        currentScene = nextScene;
        currentScene.load( mainScene, mainCamera, mainAudioListener);
        determineScene();
        enable(landingPage, false, 1);
        enable(tutorialPage, true);
        enable(backButton, true);
    }
}


function UnloadScene() {
    if (currentScene != null) {
        currentScene.stop();
        currentScene.unload();
        currentScene = null;
        modelPlaced = false;
    }
}


function PlayScene() {
    if (currentScene != null) {
        onExperience = true;
        enable(logo, false);
        currentPage = null;
        startLoad(currentScene);
        if (currentScene == ignatiusScene){
            enable(ignatiusTutorial, false);
            enable(tapReticle, true);
            tapReticle.style.pointerEvents = 'none';
        }

        if (currentScene == lobosScene){
            enable(lobosTutorial, false);
            enable(tapReticle, true);
            tapReticle.style.pointerEvents = 'none';
        }

        if (currentScene == cartwrightScene){
            enable(cartwrightTutorial, false);
            enable(scanReticle, true);
        }
        enable(backButton, true);
    }

}


function StopScene() {
    if (currentScene != null) {
        currentScene.stop();
    }
}

function preventDefault(e){
    e.preventDefault();
}
function disableScroll(){
    document.body.addEventListener('touchmove', preventDefault, { passive: false });
}

function DisableLoadingScreen(){
    console.log("handleXrload");
    var temp = document.getElementById("loadBackground");
    if(temp != null) temp.style.display = "none";
  
    //disable html background
    console.log("handle loadingscreen");
    enable(loadingScreen,false);
  
    //disable 8thwall loading screen
    //console.log("handle loadingContainer");
    //var loadingContainer = document.getElementById("loadingContainer");
    //if(loadingContainer != null){loadingContainer.style.pointerEvents = "none"}
}



const customPipelineModule = () => {
    var clock = null;
    mainAudioListener = new THREE.AudioListener();

    const raycaster = new THREE.Raycaster();
    const tapPosition = new THREE.Vector2();
    //var modelPlaced = false;
    var groundPlane = null;

    var TimeoutHandler = function(callback, delay) {
        var timerId, start, remaining = delay;

        this.pause = function() {
            window.clearTimeout(timerId);
            remaining -= Date.now() - start;
        };

        this.resume = function() {
            start = Date.now();
            window.clearTimeout(timerId);
            timerId = window.setTimeout(callback, remaining);
        };

        this.resume();
    };


    // Populates some object into an XR scene and sets the initial camera position. The scene and
    // camera come from xr3js, and are only available in the camera loop lifecycle onStart() or later.
    const initXrScene = ({ scene, camera, renderer }) => {
        mainScene = scene;
        mainCamera = camera;
        mainRenderer = renderer;
        console.log('initXrScene')

        

        groundPlane  = new THREE.Mesh( // ground plane for raycasting for object placement.
            new THREE.PlaneGeometry( 100, 100, 1, 1 ),
            new THREE.MeshBasicMaterial({
                color: 0xffff00,
                transparent: true,
                opacity: 0.0,
                side: THREE.DoubleSide
            })
        )

        groundPlane.rotateX(-Math.PI / 2)
        groundPlane.position.set(0, 0, 0)
        scene.add(groundPlane)

        // Set the initial camera position relative to the scene we just laid out. This must be at a
        // height greater than y=0.
        scene.add(camera);
        camera.position.set(0, 3, 3)

        renderer.gammaOutput = true;
        renderer.shadowMap.enabled = true;
        //renderer.physicallyCorrectLights = true;
        //renderer.sortObjects = false;

        if (currentScene != null) {
            currentScene.load(mainScene, mainCamera, mainAudioListener);
        }
    }

    const placeObject = (pointX, pointZ) => {
        if ((currentScene != null) && (currentScene.loaded() == true)) {
            const { scene, camera, renderer } = XR8.Threejs.xrScene()
            const heightOffset = 0.05; // NOTE: intended to reduce z-fighting on model shadow
            console.log(`placing at ${pointX}, ${pointZ}`)
            currentScene.sceneRoot().position.set(pointX, heightOffset, pointZ);
            
            currentScene.play( mainScene, mainCamera, mainAudioListener );
            modelPlaced = true;
        }
    }

   

    const placeObjectTouchHandler = (e) => {
        if(currentScene.loaded() == false){
            return;
        }
        console.log('placeObjectTouchHandler')

        // If the canvas is tapped with one finger and hits the ground plane, spawn an object.
        const { scene, camera, renderer } = XR8.Threejs.xrScene()

        // calculate tap position in normalized device coordinates (-1 to +1) for both components.
        if (e.touches != null) {
            tapPosition.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
            tapPosition.y = - (e.touches[0].clientY / window.innerHeight) * 2 + 1
        }
        else {
            tapPosition.x = (e.clientX / window.innerWidth) * 2 - 1
            tapPosition.y = - (e.clientY / window.innerHeight) * 2 + 1
        }

        // Update the picking ray with the camera and tap position.
        raycaster.setFromCamera(tapPosition, camera)

        // Raycast against the ground plane
        at = raycaster.intersectObject(groundPlane);

        if ((at != null) && !modelPlaced){
            placeObject(at[0].point.x, at[0].point.z);

            if(tapReticle.style.opacity != 0){
                enable(tapReticle, false);
            }

        } else {
            console.log("did not intersect ground.");
        }
    }


    return {
        // Pipeline modules need a name. It can be whatever you want but must be unique within your app.
        name: 'customPipelineModule',

        onCameraStatusChange: ({ status, stream, video, config }) => {
            if((status === 'hasVideo') && (isInitial == true)){
                //xrLoaded = true;
                //window.xrLoaded = xrLoaded;
                DisableLoadingScreen();
            }
        },


        onStart: ({ canvas, canvasWidth, canvasHeight }) => {
            const { scene, camera, renderer } = XR8.Threejs.xrScene()    // Get the 3js sceen from xr3js.

            initXrScene({ scene, camera, renderer }) // Add objects to the scene and set starting camera position.

            canvas.addEventListener('touchstart', placeObjectTouchHandler, true)    // Add touch listener.
            canvas.addEventListener('mousedown', placeObjectTouchHandler, true)    // Add touch listener.


            // window.addEventListener('blur', function(){
            // }, false);
            // window.addEventListener('focus', function(){
            // }, false);

            // Sync the xr controller's 6DoF position and camera parameters with our scene.
            XR8.XrController.updateCameraProjectionMatrix({
                origin: camera.position,
                facing: camera.quaternion,
            })

            clock = new THREE.Clock();
            clock.start();

            enable(landingPage, true);
            currentPage = landingPage;


            
            disableScroll();

            function handleMenu() {
                menuIcon.classList.toggle("change");
                menu.style.right = menuOn?"-80%":"0%";
                menuOn = !menuOn;
            }

            menuIcon.addEventListener("click", handleMenu);

        },

        onUpdate: ({ processGpuResult, processCpuResult }) => {
            dt = clock.getDelta();
            if (currentScene != null) {
                currentScene.update(dt);
            }
        },

        onRender: () => {
            // this allows the current scene to do some post rendering
            // (such as UI or bloom shader)
            if ((currentScene != null) && (currentScene.render != null)) {
                currentScene.render(mainRenderer, mainScene, mainCamera);
            }
        },
        
        listeners: [
            {
                event: 'reality.imagefound', process: ({name,detail})=>{ 
                   console.log("FOUND: " + detail.name);
                   if ((currentScene != null) && (currentScene.imageFound != null)) {
                       currentScene.imageFound(detail);
                       currentScene.play( mainScene, mainCamera, mainAudioListener );
                       enable(scanReticle, false);
                   }
                } 
            },
            {
                event: 'reality.imagelost', process: ({name,detail})=>{ 
                   console.log("LOST: " + detail.name);
                   if ((currentScene != null) && (currentScene.imageLost != null)) {
                       currentScene.imageLost(detail);
                   }
                } 
            },
            {
               event:'reality.imageupdated', process: ({name,detail})=>{
                  if ((currentScene != null) && (currentScene.imageUpdate != null)) {
                       currentScene.imageUpdate(detail);
                   }
                } 
            },
        ],
    }
}


const onxrloaded = () => {

    XR8.addCameraPipelineModules([    // Add camera pipeline modules.
        // Existing pipeline modules.
        XR8.GlTextureRenderer.pipelineModule(),        // Draws the camera feed.
        XR8.Threejs.pipelineModule(),                  // Creates a ThreeJS AR Scene.
        XR8.XrController.pipelineModule(),             // Enables SLAM tracking.
        XRExtras.AlmostThere.pipelineModule(),         // Detects unsupported browsers and gives hints.
        XRExtras.FullWindowCanvas.pipelineModule(),    // Modifies the canvas to fill the window.
        XRExtras.Loading.pipelineModule(),             // Manages the loading screen on startup.
        XRExtras.RuntimeError.pipelineModule(),        // Shows an error image on runtime error.
        // Custom pipeline modules.
        customPipelineModule(),
    ])

    // Open the camera and start running the camera run loop.
    XR8.run({ canvas: document.getElementById('camerafeed'),
        allowedDevices: XR8.XrConfig.device().ANY,
    });
}

// Show loading screen before the full XR library has been loaded.
const load = () => {
    XRExtras.Loading.showLoading({ onxrloaded });
}

window.onload = () => { window.XRExtras ? load() : window.addEventListener('xrextrasloaded', load) }
