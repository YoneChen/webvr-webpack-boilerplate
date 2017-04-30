 /*global THREE:true*/
 /*global WebVR:true*/
import VRPage from 'common/js/VRPage';
import TWEEN from 'tween.js';

import ASSET_TEXTURE_SKYBOX from 'assets/texture/360_page2.jpg';
import ASSET_AUDIO_ENV from 'assets/audio/env.wav';
class page2 extends VRPage {
	start() {
		this.addEnvAudio(ASSET_AUDIO_ENV);
		this.addPanorama(1000, ASSET_TEXTURE_SKYBOX);
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
	update() {
		TWEEN.update();
	}
}
export default (() => {
	return new page2();
})();