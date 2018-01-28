 /*global THREE:true*/ 
 /*global TWEEN:true*/
 import '@/core/css/main.css';
 import VRButton from './VRButton';
 import Router from './VRRouter';
 import GazeEvent from 'gaze-event';
 let 
	 //public props
	 Scene, // THREE.Scene
	 Camera, // THREE.PerspectiveCamera
	 Renderer, // THREE.WebGLRenderer
	 AudioListener, // THREE.AudioListener
	 CrossHair; // THREE.CrossHair
 let Gazer = {},
	 Display = {};
 function init(routers,container,fov,far) {
	 createScene(...Array.prototype.slice.call(arguments,1));
	 Router.createRouter(routers);
	 Router.onchange(() => {
		 cleanPage();
	 })
 }
 function createScene(container=document.body,fov=70,far=4000) {
	 if (!(container instanceof HTMLElement)) {
		 throw new Error('container is not a HTMLElement!');
	 }
	 // Initialize the scene
	 Scene = new THREE.Scene();
	 // Initialize the camera
	 Camera = new THREE.PerspectiveCamera(fov,window.innerWidth/window.innerHeight,0.1,far);
	 Camera.position.set( 0, 0, 0 );
	 Scene.add(Camera);
	 // Initialize the renderer
	 Renderer = new THREE.WebGLRenderer({ antialias: true } );
	 Renderer.setSize(window.innerWidth,window.innerHeight);
	 Renderer.shadowMap.enabled = true;
	 Renderer.setPixelRatio(window.devicePixelRatio);
	 container.appendChild(Renderer.domElement);
	 initVR();
	 initAudio();
	 bindEvent();
	 Gazer = new GazeEvent();
	 addCrossHair();
 }

 function bindEvent() {
 
	 window.addEventListener( 'resize', e => {
		 // justify the renderer when resize the window
		 Camera.aspect = window.innerWidth / window.innerHeight;
		 Camera.updateProjectionMatrix();
		 Renderer.setSize(window.innerWidth, window.innerHeight);
	 }, false );
 }
 function initVR() {
	 Renderer.vr.enabled = true;
	 // get instance of VRDisplay
	 navigator.getVRDisplays().then( display => {
		 Display = display[0];
		 Renderer.vr.setDevice(Display);
		 VRButton.init(Renderer.domElement.parentNode,Display,Renderer);
	 }).catch(err => console.warn(err));
 }
 function initAudio() {
	 // instantiate a listener
	 AudioListener = new THREE.AudioListener();
 
	 // add the listener to the camera
	 Camera.add( AudioListener );
 }
 function addCrossHair() {
	 // create crosshair
	 const geometry1 = new THREE.CircleGeometry(0.002, 16);
	 const material = new THREE.MeshBasicMaterial({
		 color: 0xffffff,
		 opacity: 0.5,
		 side: THREE.DoubleSide,
		 transparent: true,
		 needsUpdate: true
	 });
	 const pointer = new THREE.Mesh(geometry1, material);
	 pointer.name = 'pointer';
	 const geometry2 = new THREE.Geometry();
	 const loader = new THREE.Mesh(geometry2, material);
	 loader.rotation.set(0, Math.PI, Math.PI / 2);
	 loader.name = 'loader';
	 CrossHair = new THREE.Group();
	 CrossHair.add(pointer);
	 CrossHair.add(loader);
	 CrossHair.position.z = -0.5;
	 CrossHair.matrixAutoUpdate = false;
	 CrossHair.updateMatrix();
	 CrossHair.animate = {};
	 // create crosshair animation
	 let loaderAnimation = () => new TWEEN.Tween({ thetaLength: 0 })
		 .to({ thetaLength: 2 * Math.PI }, Gazer.delayTime)
		 .onUpdate(({ thetaLength }) => {
			 loader.geometry = new THREE.RingGeometry(0.005, 0.007, 32, 8, 0, thetaLength);
			 loader.geometry.verticesNeedUpdate = true;
		 })
		 .onStop(() => {
			 loader.geometry = new THREE.Geometry();
			 CrossHair.animate.loader = loaderAnimation();
		 });
	 CrossHair.animate.loader = loaderAnimation();
	 Camera.add( CrossHair );
 }
 function renderStop() {
	 Renderer.dispose();
	 Gazer.removeAll();
	 TWEEN.removeAll();
 }
 function renderStart(callback) {
	 Renderer.animate(function() {
		 callback();
		 Gazer.update(Camera);
		 TWEEN.update();
		 Renderer.render(Scene, Camera);
	 });
 }
 function clearScene() {
	 for(let i = Scene.children.length - 1; i >= 0; i-- ) {
		 if (Scene.children[i].type === 'PerspectiveCamera') continue;
		 if (Scene.children[i].type === 'Audio') {
			 try {
				 Scene.children[i].stop();
			 } catch(err) {
				 // console.log()
			 }
		 }
		 Scene.remove(Scene.children[i]);
	 }
	 Scene.fog = null;
 }
 function cleanPage() {
	 renderStop();
	 Display.resetPose();
	 clearScene();
 }
 
 export {Scene,Camera,Renderer,AudioListener,CrossHair,renderStart,renderStop,init,Router,createScene,cleanPage,initVR,initAudio,addCrossHair,Display,Gazer};
 