/*global THREE:true*/
/*global WebVR:true*/
import VRPage from '@/core/js/VRPage';
import { Button } from '@/components';
class Index extends VRPage {
	assets() {
		return {
			TEXTURE_SKYBOX: 'texture/360bg.jpg',
			AUDIO_ENV: 'audio/env.wav'
		};
	}
	start() {
		const { AUDIO_ENV, TEXTURE_SKYBOX } = this.assets;
		this.addEnvAudio(AUDIO_ENV);
		this.addPanorama(1000, TEXTURE_SKYBOX);
        const button_page1 = new Button({text: 'Goto Page1!', fontSize: 0.8, width: 6, height: 4});
		button_page1.position.set(-6,0,-15);
        WebVR.Scene.add(button_page1);
		button_page1.onSelect = () => {
			WebVR.Router.push('1');
		}
        const button_page2 = new Button({text: 'Goto Page2!', fontSize: 0.8, width: 6, height: 4});
		button_page2.position.set(6,0,-15);
        WebVR.Scene.add(button_page2);
		button_page2.onSelect = () => {
			WebVR.Router.push('2');
		}
		this.addDirectLight();
	}
	loaded() {
		// play the sound
		this.envSound.play();
	}
	addPanorama(radius, path) {
		// create panorama
		const geometry = new THREE.SphereGeometry(radius, 50, 50);
		const texture = new THREE.TextureLoader().load(path);
		const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
		const panorama = new THREE.Mesh(geometry, material);
		WebVR.Scene.add(panorama);
	}
	addEnvAudio(path) {
		// instantiate audio object
		this.envSound = new THREE.Audio(WebVR.AudioListener);

		// add the audio object to the scene
		WebVR.Scene.add(this.envSound);
		// instantiate a loader
		const loader = new THREE.AudioLoader();

		// load a resource
		loader.load(
			// resource URL
			path,
			// Function when resource is loaded
			audioBuffer => {
				// set the audio object buffer to the loaded object
				this.envSound.setBuffer(audioBuffer);
				this.envSound.setLoop(true);
			}
		);
	}
	addDirectLight() {
		// create the enviromental light
		WebVR.Scene.add(new THREE.AmbientLight(0xFFFFFF));
		let light = new THREE.DirectionalLight(0xffffff, 0.3);
		light.position.set(50, 50, 50);
		light.castShadow = true;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 512;
		light.shadow.camera.near = 100;
		light.shadow.camera.far = 1200;
		light.shadow.camera.left = -1000;
		light.shadow.camera.right = 1000;
		light.shadow.camera.top = 350;
		light.shadow.camera.bottom = -350;
		WebVR.Scene.add(light);
	}
	update() {
	}
}
export default Index;