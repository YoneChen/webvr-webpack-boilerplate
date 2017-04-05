 /*global THREE:true*/
import './example.css';
import WebVR from 'common/js/webVR';
import TWEEN from 'tween.js';
const ASSET = {
	BACKGROUND_PATH: './assets/bg.jpg',
	BUTTON_BACKROUND_PATH1: './assets/btn1.png'
};
class Index extends WebVR {
	constructor() {
		super({domContainer:document.querySelector('.main-page')});
	}
	start() {
		this.addPanorama(1000, ASSET.BACKGROUND_PATH);
		this.addButton({index:1,background:ASSET.BUTTON_BACKROUND_PATH1});
		this.addButton({index:2,background:ASSET.BUTTON_BACKROUND_PATH1});
		this.addDirectLight();
	}
	addPanorama(radius,path) {
		// 创建全景
		let geometry = new THREE.SphereGeometry(radius,50,50);
		let material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load(path),side:THREE.BackSide } );
		let panorama = new THREE.Mesh(geometry,material);
		WebVR.Scene.add(panorama);
		return panorama;
	}
	addDirectLight() {
		// 创建光线
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
	addButton({background,index}) {
		// body...
		const option = {
			hover: 5,
			camera: WebVR.Camera,
			radius: 50,
			angle: Math.PI/6*index,
			width:20,
			height:15
		};
		let hx = option.hover*Math.sin(option.angle),hz = option.hover*Math.cos(option.angle);
		let geometry = new THREE.PlaneGeometry(option.width,option.height);
		let material = new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load(background)});
		let button = new THREE.Mesh(geometry,material);
		let cx = option.camera.position.x,
			cy = option.camera.position.y,
			cz = option.camera.position.z;
		let dx = option.radius*Math.sin(option.angle),
			dz = option.radius*Math.cos(option.angle);
		button.position.set(cx+dx,cy,cz-dz);
		button.rotation.y = -option.angle;
		WebVR.Scene.add(button);
		let x = button.position.x,
			z = button.position.z;
		let hover = new TWEEN.Tween(button.position)
		.to({x:x-hx,z:z+hz},1000)
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onComplete(() => {
		});
		let hoverback = new TWEEN.Tween(button.position)
		.to({x:x,z:z},1000)
		.easing(TWEEN.Easing.Sinusoidal.InOut);
		button.on('gaze',m => {
		// debugger
			hoverback.stop();
			hover.start();
		},m => {
			hover.stop();
			hoverback.start();
		});
	}
	update() {
		TWEEN.update();
	}
}
new Index();