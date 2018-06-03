/*global THREE:true*/
/*global TWEEN:true*/
import './css/main.css';
import VRButton from './button';
import Router from './router';
import Gazer from './gazer';
import WebVRPolyfill from 'webvr-polyfill';
const polyfill = new WebVRPolyfill();
const $scope = {};
function create(routers, container, fov, far) {
	_createRootScene(...Array.prototype.slice.call(arguments, 1));
	Router.createRouter(routers);
	Router.onchange = removeScene;
	Router.onload = addScene;
	$scope.router = Router;
}
function _createRootScene(container = document.body, fov = 70, far = 5000) {
	if (!(container instanceof HTMLElement)) {
		throw new Error('container is not a HTMLElement!');
	}
	// Initialize the scene
	const scene = new THREE.Scene();
	// Initialize the camera
	const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, far);
	camera.position.set(0, 0, 0);
	scene.add(camera);
	// Initialize the renderer
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(renderer.domElement);
	$scope.scene = scene;
	$scope.camera = camera;
	$scope.renderer = renderer;
	_initVR();
	_initAudio();
	_bindEvent();
	$scope.gazer = new Gazer();
	_addCrossHair();
}

function _bindEvent() {

	window.addEventListener('resize', e => {
		// justify the renderer when resize the window
		$scope.camera.aspect = window.innerWidth / window.innerHeight;
		$scope.camera.updateProjectionMatrix();
		$scope.renderer.setSize(window.innerWidth, window.innerHeight);
	}, false);
}
function _initVR() {
	$scope.renderer.vr.enabled = true;
	// get instance of VRDisplay
	navigator.getVRDisplays().then(display => {
		$scope.display = display[0];
		$scope.renderer.vr.setDevice($scope.display);
		VRButton.init($scope.renderer.domElement.parentNode, $scope.display, $scope.renderer);
		$scope.vrButton = VRButton;
	}).catch(err => console.error(err));
}
function _initAudio() {
	// instantiate a listener
	const audioListener = new THREE.AudioListener();

	// add the listener to the camera
	$scope.camera.add(audioListener);
	$scope.audioListener = audioListener;
}
function _addCrossHair() {
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
	const crossHair = new THREE.Group();
	//  CrossHair.add(pointer);
	crossHair.add(loader);
	crossHair.position.z = -0.5;
	crossHair.matrixAutoUpdate = false;
	crossHair.updateMatrix();
	crossHair.animate = {};
	// create crosshair animation
	let loaderAnimation = () => new TWEEN.Tween({ thetaLength: 0 })
		.to({ thetaLength: 2 * Math.PI }, $scope.gazer.delayTime)
		.onUpdate(({ thetaLength }) => {
			loader.geometry = new THREE.RingGeometry(0.005, 0.007, 32, 8, 0, thetaLength);
			loader.geometry.verticesNeedUpdate = true;
		})
		.onStop(() => {
			loader.geometry = new THREE.Geometry();
			crossHair.animate.loader = loaderAnimation();
		});
	crossHair.animate.loader = loaderAnimation();
	$scope.camera.add(crossHair);
	$scope.crossHair = crossHair;
}
function renderStop() {
	$scope.gazer.removeAll();
	$scope.renderer.dispose();
	TWEEN.removeAll();
}
function renderStart(callback) {
	$scope.renderer.animate(function () {
		callback();
		$scope.gazer.update($scope.camera);
		TWEEN.update();
		$scope.renderer.render($scope.scene, $scope.camera);
	});
}
function clearScene() {
	const childrenScenes = $scope.scene.children;
	const scene = childrenScenes.find(({ type }) => type === 'Scene');
	scene.children.forEach(object3D => {
		if (object3D.type === 'Audio') object3D.stop();
	});
	$scope.scene.remove(scene);
}
function addScene(scene) {
	if (scene && scene.type === 'Scene') $scope.scene.add(scene);
}
function removeScene() {
	renderStop();
	$scope.display.resetPose();
	clearScene();
}

export { $scope as root, renderStart, renderStop, create, addScene, removeScene };
