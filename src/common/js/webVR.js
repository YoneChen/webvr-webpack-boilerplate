 /*global THREE:true*/
import 'lib/VRControls';
import 'lib/VREffect';
import 'three-onEvent';
// import {addGround,addLight,addObject} from './common/3dUtils'
import WebVRManager from 'webvr-boilerplate';
import LoadControl from 'common/js/loadControl';
export default class WebVR {

	constructor(options) {
		WebVR.initScene(options);
		this.crossHair();
		WebVR.bindEvent();
		this.start();
		this.render();
	}
	static initScene({domContainer=document.body,fov=70,far=4000}) {
		// await WebVR.loadScript(['three-vrcontrols','three-vreffect','three-onevent']);
		if (!(domContainer instanceof HTMLElement)) {
			throw new Error('domContainer is not a HTMLElement!');
		}
		this.domContainer = domContainer;
		WebVR.CLOCK = new THREE.Clock();
		// Initialize the scene
		WebVR.Scene = new THREE.Scene();
		// Initialize the camera
		WebVR.Camera = new THREE.PerspectiveCamera(fov,window.innerWidth/window.innerHeight,0.1,far);
		WebVR.Camera.position.set( 0, 0, 0 );
		WebVR.Scene.add(WebVR.Camera);
		// Initialize the renderer
		WebVR.Renderer = new THREE.WebGLRenderer({ antialias: true } );
		WebVR.Renderer.setSize(window.innerWidth,window.innerHeight);
		// this.renderer.setClearColor(0x519EcB);
		WebVR.Renderer.shadowMapEnabled = true;
		WebVR.Renderer.setPixelRatio(window.devicePixelRatio);
		domContainer.appendChild(WebVR.Renderer.domElement);
		WebVR.initVR();
		WebVR.resize();
	}
	static resize() {

		window.addEventListener( 'resize', e => {
			// justify the renderer when resize the window
			WebVR.Camera.aspect = window.innerWidth / window.innerHeight;
			WebVR.Camera.updateProjectionMatrix();
			WebVR.Effect.setSize(window.innerWidth, window.innerHeight);
		}, false );
	}
	static initVR() {
		// Initialize VREffect and VRControl
		WebVR.Effect = new THREE.VREffect(WebVR.Renderer);
		WebVR.Controls = new THREE.VRControls(WebVR.Camera);
		// Initialize the WebVR manager.
		WebVR.Manager = new WebVRManager(WebVR.Renderer, WebVR.Effect);
	}
	crossHair() {
		// 创建准心
		let crosshair = new THREE.Mesh(new THREE.RingGeometry( 0.02, 0.03, 32 ),new THREE.MeshBasicMaterial( {
			color: 0xffffff,
			opacity: 0.5,
			transparent: true
		}));
		crosshair.position.z = -2;
		WebVR.Camera.add( crosshair );
	}
	static bindEvent() {
		THREE.onEvent(WebVR.Scene,WebVR.Camera);
		THREE.DefaultLoadingManager.onStart = ( url, itemsLoaded, itemsTotal ) => {
			this.loadControl = new  LoadControl(itemsTotal);

			console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

		};

		THREE.DefaultLoadingManager.onProgress = ( item, loaded, total ) => {

			this.loadControl.loadItem(); 

		};
		THREE.DefaultLoadingManager.onLoad = () => {
			this.loadControl.loadedAll();
			console.log('finish');

		};
	}
	start() {
	}
	update(delta) {
	}
	render() {
		// launch the render
		let render = () => {
			const delta = WebVR.CLOCK.getDelta();
			this.update(delta);
			WebVR.Controls.update();
			WebVR.Manager.render(WebVR.Scene, WebVR.Camera);
			WebVR.loopID = requestAnimationFrame(render);
		};
		render();
	}
}