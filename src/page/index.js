 /*global THREE:true*/
 /*global WebVR:true*/
import 'common/css/main.css';
import VRPage from 'common/js/VRPage';
import TWEEN from 'tween.js';

import ASSET_TEXTURE_SKYBOX from 'assets/texture/360bg.jpg';
import ASSET_AUDIO_ENV from 'assets/audio/env.wav';
class Index extends VRPage {
	constructor() {
		super({domContainer:document.querySelector('.main-page')});
	}
	start() {
		this.addEnvAudio(ASSET_AUDIO_ENV);
		this.addPanorama(1000, ASSET_TEXTURE_SKYBOX);
		this.addButton({
			index:1,
			text:'Goto Page1!',
			callback: () => {
				WebVR.forward('page1');
			}
		});
		this.addButton({
			index:2,
			text:'Goto Page2!',
			callback: () => {
				WebVR.forward('page2');
			}
		});
		this.addDirectLight();
	}
	loaded() {
		// play the sound
        this.envSound.play();
	}
	addPanorama(radius,path) {
		// create panorama
		let geometry = new THREE.SphereGeometry(radius,50,50);
		let material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load(path),side:THREE.BackSide } );
		let panorama = new THREE.Mesh(geometry,material);
		WebVR.Scene.add(panorama);
		return panorama;
	}
	addEnvAudio(path) {
		// instantiate audio object
		this.envSound = new THREE.Audio( WebVR.AudioListener );

		// add the audio object to the scene
		WebVR.Scene.add( this.envSound );
		// instantiate a loader
		let loader = new THREE.AudioLoader();

		// load a resource
		loader.load(
			// resource URL
			path,
			// Function when resource is loaded
			audioBuffer => {
				// set the audio object buffer to the loaded object
				this.envSound.setBuffer( audioBuffer );
				this.envSound.setLoop(true);
			}
		);
	}
	addDirectLight() {
		// create the enviromental light
		WebVR.Scene.add(new THREE.AmbientLight(0xFFFFFF));
		let light = new THREE.DirectionalLight( 0xffffff, 0.3 );
		light.position.set( 50, 50, 50 );
		light.castShadow = true;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 512;
		light.shadow.camera.near = 100;
		light.shadow.camera.far = 1200;
		light.shadow.camera.left = -1000;
		light.shadow.camera.right = 1000;
		light.shadow.camera.top = 350;
		light.shadow.camera.bottom = -350;
		WebVR.Scene.add( light );
		return light;
	}
	getTexture(text,fontSize) {
		const WIDTH = 400,HEIGHT = 300;
		let canvas = document.createElement('canvas');
		canvas.width = WIDTH,canvas.height = HEIGHT;
		let ctx = canvas.getContext('2d');
		ctx.fillStyle = '#000000';
		ctx.fillRect(0,0,WIDTH,WIDTH);
		ctx.fillStyle = '#00aadd';
		ctx.font = `${fontSize}px Arial`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(text,WIDTH/2,HEIGHT/2);
		let texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;
		return texture;
	}
	addButton({text,index,fontSize=64,callback=()=>{}}) {
		const option = {
			hover: 5,
			camera: WebVR.Camera,
			radius: 25,
			angle: Math.PI/6*index,
			width:10,
			height:7.5
		};
		let hx = option.hover * Math.sin(option.angle),hz = option.hover * Math.cos(option.angle);
		let geometry = new THREE.PlaneGeometry(option.width,option.height);
		let material = new THREE.MeshBasicMaterial({map:this.getTexture(text,32),opacity:0.75,transparent:true});
		let button = new THREE.Mesh(geometry,material);
		let cx = option.camera.position.x,
			cy = option.camera.position.y,
			cz = option.camera.position.z;
		let dx = option.radius*Math.sin(option.angle),
			dz = option.radius*Math.cos(option.angle);
		button.position.set(cx+dx,cy,cz-dz);
		button.rotation.y = -option.angle;
		let x = button.position.x,
			z = button.position.z;
		let hover = new TWEEN.Tween(button.position)
		.to({x:x-hx,z:z+hz},1000)
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onComplete(() => {
			callback();
		});
		let hoverback = new TWEEN.Tween(button.position)
		.to({x:x,z:z},1000)
		.easing(TWEEN.Easing.Sinusoidal.InOut);
		button.on('gaze',m => {
			hoverback.stop();
			hover.start();
		},m => {
			hover.stop();
			hoverback.start();
		});
		WebVR.Scene.add(button);
	}
	update() {
		TWEEN.update();
	}
}
export default (() => {
	return new Index();
})();