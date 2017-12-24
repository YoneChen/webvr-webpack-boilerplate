/*global THREE:true*/
/*global WebVR:true*/
/*global TWEEN:true*/
import VRPage from 'core/js/VRPage';
import 'lib/OBJLoader';
import 'lib/MTLLoader';
class page1 extends VRPage {
	assets() {
		return {
			AUDIO_ENV: 'audio/env.wav',
			MODEL_HABITAT: {
				PATH: 'model/Habitat/',
				OBJ: 'model/Habitat/Habitat.obj',
				MTL: 'model/Habitat/Habitat.mtl'
			}
		};
	}
	start() {
		const { AUDIO_ENV } = this.assets;
		this.addEnvAudio(AUDIO_ENV);
		this.addSky(1000, 0xffffff);
		this.addHabitat();
		this.addDirectLight();
		this.addFog();
	}
	loaded() {
		// play the sound
		this.envSound.play();
	}
	addEnvAudio(path) {
		// instantiate audio object
		this.envSound = new THREE.Audio(WebVR.AudioListener);

		// add the audio object to the scene
		WebVR.Scene.add(this.envSound);
		// instantiate a loader
		let loader = new THREE.AudioLoader();

		// load a resource
		loader.load(
			// resource URL
			path,
			// Function when resource is loaded
			audioBuffer => {
				// set the audio object buffer to the loaded object
				this.envSound.setBuffer(audioBuffer);
				this.envSound.setLoop(true);
				// play the audio
				// sound.play();
			}
		);
	}
	addSky(radius, color) {
		// create panorama
		const geometry = new THREE.SphereGeometry(radius, 50, 50);
		const material = new THREE.MeshBasicMaterial({ color, side: THREE.BackSide });
		const sky = new THREE.Mesh(geometry, material);
		WebVR.Scene.add(sky);
	}
	addFog() {
		WebVR.Scene.fog = new THREE.Fog(0xdddddd, 0.01, 50);
	}
	addDirectLight() {
		// create the enviromental light
		WebVR.Scene.add(new THREE.AmbientLight(0xdddddd));
		const light = new THREE.DirectionalLight(0xddddcc, 0.3);
		light.position.set(100, 100, 100);
		light.castShadow = true;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 512;
		light.shadow.camera.near = 50;
		light.shadow.camera.far = 500;
		light.shadow.camera.left = -500;
		light.shadow.camera.right = 500;
		light.shadow.camera.top = 150;
		light.shadow.camera.bottom = -150;
		WebVR.Scene.add(light);
	}
	addHabitat() {
		const { PATH, OBJ, MTL } = this.assets.MODEL_HABITAT;
		const mtlLoader = new THREE.MTLLoader();
		mtlLoader.setTexturePath(PATH);
		mtlLoader.load(MTL, materials => {

			materials.preload();
			const objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.load(OBJ, object => {
				object.position.set(0, -12, 0);
				object.scale.set(0.1, 0.1, 0.1);
				WebVR.Scene.add(object);

			});

		});
	}
	update() {
	}
}
export default page1;