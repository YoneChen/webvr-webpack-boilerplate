 /*global THREE:true*/
import 'lib/VRControls';
import 'lib/VREffect';
import 'three-onEvent';
// import {addGround,addLight,addObject} from './common/3dUtils'
import WebVRManager from 'webvr-boilerplate';
let 
	//public props
	Scene = {instance:'THREE.Scene'},
	Camera = {instance:'THREE.PerspectiveCamera'},
	Renderer = {instance:'THREE.WebGLRenderer'},
	Effect = {instance:'THREE.VREffect'},
	Controls = {instance:'THREE.Controls'},
	Manager = {instance:'THREE.Manager'},
	LoadingManager = {instance:'THREE.LoadingManager',value:null},
	AudioListener = {instance:'THREE.AudioListener'},
	CLOCK = {instance:'THREE.Clock'},
	LoaderCount = 0,
	CrossHair = {instance:'THREE.CrossHair'};
let isFirstPage = true,
	loopID = 0;
function createScene({domContainer=document.body,fov=70,far=4000}) {
	if(!isFirstPage) return isFirstPage;
	isFirstPage = !isFirstPage;
	if (!(domContainer instanceof HTMLElement)) {
		throw new Error('domContainer is not a HTMLElement!');
	}
	CLOCK = new THREE.Clock();
	// Initialize the scene
	Scene = new THREE.Scene();
	// Initialize the camera
	Camera = new THREE.PerspectiveCamera(fov,window.innerWidth/window.innerHeight,0.1,far);
	Camera.position.set( 0, 0, 0 );
	Scene.add(Camera);
	// Initialize the renderer
	Renderer = new THREE.WebGLRenderer({ antialias: true } );
	Renderer.setSize(window.innerWidth,window.innerHeight);
	Renderer.shadowMapEnabled = true;
	Renderer.setPixelRatio(window.devicePixelRatio);
	domContainer.appendChild(Renderer.domElement);
	initVR();
	initAudio();
	resize();
	createCrossHair();
	THREE.onEvent(Scene,Camera);
	return isFirstPage;
}
function resize() {

	window.addEventListener( 'resize', e => {
		// justify the renderer when resize the window
		Camera.aspect = window.innerWidth / window.innerHeight;
		Camera.updateProjectionMatrix();
		Effect.setSize(window.innerWidth, window.innerHeight);
	}, false );
}
function initVR() {
	// Initialize VREffect and VRControl
	Effect = new THREE.VREffect(Renderer);
	Controls = new THREE.VRControls(Camera);
	// Initialize the WebVR manager.
	Manager = new WebVRManager(Renderer, Effect);
}
function initAudio() {
	// instantiate a listener
	AudioListener = new THREE.AudioListener();

	// add the listener to the camera
	Camera.add( AudioListener );
}
function createCrossHair() {
	// 创建准心
	CrossHair = new THREE.Mesh(new THREE.RingGeometry( 0.02, 0.03, 32 ),new THREE.MeshBasicMaterial( {
		color: 0xffffff,
		opacity: 0.5,
		transparent: true
	}));
	CrossHair.position.z = -2;
	Camera.add( CrossHair );
}
function renderStop() {
	if (loopID !== -1) {
		window.cancelAnimationFrame(loopID);
		loopID = -1;
	}
}
function renderStart(callback) {
	// launch the render
	loopID = 0;
	let loop = () => {
		if(loopID === -1) return;
		loopID = requestAnimationFrame(loop);
		const delta = CLOCK.getDelta();
		callback(delta);
		Controls.update();
		Manager.render(Scene, Camera);
	};
	loop();
}
function clearScene() {
	for(let item of Scene.children) {
		if(item.type === 'Audio') {
			item.stop();
		}
	}
	Scene.children.splice(1);
}
function cleanPage() {
	renderStop();
	clearScene();
}
export {Scene,Camera,Renderer,Effect,Controls,Manager,AudioListener,CrossHair,CLOCK,renderStart,renderStop,LoaderCount,createScene,LoadingManager,cleanPage,resize,initVR,initAudio,createCrossHair};