 /*global THREE:true*/
 /*global WebVR:true*/
import VRPage from 'common/js/VRPage';
import TWEEN from 'tween.js';

import ASSET_TEXTURE_SKYBOX from 'assets/texture/360_page1.jpg';
import ASSET_AUDIO_ENV from 'assets/audio/env.wav';
import ASSET_MODEL_BALLON_OBJ from 'assets/model/ballon.obj';
import ASSET_MODEL_BALLON_MTL from 'assets/model/ballon.mtl';

import 'lib/OBJLoader';
import 'lib/MTLLoader';
class page1 extends VRPage {
	start() {
		this.addEnvAudio(ASSET_AUDIO_ENV);
		this.addPanorama(1000, ASSET_TEXTURE_SKYBOX);
		this.addBallon();
		this.addDirectLight();
	}
	loaded() {
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
				// play the audio
				// sound.play();
			}
		);
	}
	addDirectLight() {
		// 创建光线
		WebVR.Scene.add(new THREE.AmbientLight(0xdddddd));
		let light = new THREE.DirectionalLight( 0xddddcc, 0.3 );
		light.position.set( 100, 100, 100 );
		light.castShadow = true;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 512;
		light.shadow.camera.near = 50;
		light.shadow.camera.far = 500;
		light.shadow.camera.left = -500;
		light.shadow.camera.right = 500;
		light.shadow.camera.top = 150;
		light.shadow.camera.bottom = -150;
		WebVR.Scene.add( light );
		return light;
	}
	addBallon() {
		let mtlLoader = new THREE.MTLLoader();
		mtlLoader.load(ASSET_MODEL_BALLON_MTL, materials => {

			materials.preload();
			let objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.load(ASSET_MODEL_BALLON_OBJ,  object => {
				object.position.set(20,20,-100);
				object.scale.set(0.1,0.1,0.1);
				let {x,y,z} = object.position;
				let hover = new TWEEN.Tween(object.position)
				.to({x:x-20,y:y+150,z:z-80},10000)
				.easing(TWEEN.Easing.Sinusoidal.InOut);
				object.on('gaze',m => {
					hover.start();
				});
				WebVR.Scene.add( object );

			});

		});
	}
	update() {
		TWEEN.update();
	}
}
export default (() => {
	return new page1();
})();