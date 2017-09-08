 /*global THREE:true*/
import 'three-onevent';
import 'core/css/main.css';
import VRButton from './VRButton';
let 
	//public props
	Scene, // THREE.Scene
	Camera, // THREE.PerspectiveCamera
	Renderer, // THREE.WebGLRenderer
	LoadingManager, // THREE.LoadingManager
	AudioListener, // THREE.AudioListener
	LoaderCount = 0,
	CrossHair; // THREE.CrossHair
let Event = {},
	Display = {};
function init(routers,container,fov,far) {
	createScene(...Array.prototype.slice.call(arguments,1));
	VRRouter.createRouter(routers);
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
	Renderer.shadowMapEnabled = true;
	Renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(Renderer.domElement);
	initVR();
	initAudio();
	bindEvent();
	createCrossHair();
	Event = new THREE.onEvent(Scene,Camera);
}
// create VRRouter to simulate routes
const VRRouter = {
	createRouter(routes=[{'':'index.js'}]) {
		this.routeObj = {};
		routes.forEach(route => {
			Object.defineProperty(this.routeObj,route.route,{value:route.path}); 
		});
		this.proxyRouter();
		this.historyProxy();
	},
	// when enter url,redirect(fetch and run page script)
	proxyRouter() {
		const routeName = this.getCurrentRouteName();
		const fileName = this.getFileName(routeName);
		history.replaceState(
			{
				routeName,
				fileName
			},
			0,this.getCurrentRouteName()
		);
		this.fetchFile(fileName);
	},
	// fetch and run page script
	forward(routeName,newtarget = true) {
		cleanPage();
		const fileName = this.getFileName(routeName);
		if (newtarget) {
			history.pushState({
				routeName,
				fileName
			},0,routeName);
		}
		this.fetchFile(fileName);
	},
	// when go back or go forward,run pre-page script.
	historyProxy() {
		window.addEventListener('popstate',e => {
			const routeName = e.state.routeName;
			this.forward(routeName,false);
		},false);
	},
	getCurrentRouteName() {
		return location.pathname.split('/').pop();
	},
	getFileName(routeName) {
		return this.routeObj[routeName] || '';
	}
};
VRRouter.fetchFile = function(fileName) {
	import(`page/${fileName}`).then(page => {
		new page.default();
	});
};
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
function createCrossHair() {
	// create crosshair
	CrossHair = new THREE.Mesh(new THREE.RingGeometry( 0.02, 0.03, 32 ),new THREE.MeshBasicMaterial( {
		color: 0xffffff,
		opacity: 0.5,
		transparent: true
	}));
	CrossHair.position.z = -2;
	Camera.add( CrossHair );
}
function renderStop() {
	Renderer.dispose();
}
function renderStart(callback) {
	Renderer.animate(function() {
		callback();
		Renderer.render(Scene, Camera);
		Event.update();
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
}
function cleanPage() {
	renderStop();
	Display.resetPose();
	clearScene();
	Event.removeAll();
}
function forward(routeName='') {
	VRRouter.forward(routeName);
}

export {Scene,Camera,Renderer,AudioListener,CrossHair,renderStart,renderStop,LoaderCount,init,VRRouter,createScene,LoadingManager,cleanPage,forward,initVR,initAudio,createCrossHair,Display};
