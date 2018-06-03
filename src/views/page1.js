/*global THREE:true*/
import { VRScene } from '@/core';
import {getGLTFModel} from '@/utils/common'
class page1 extends VRScene {
	assets() {
		return {
			AUDIO_ENV: 'audio/env.wav',
			MODEL_VILLAGE: {
				PATH: 'model/village/scene.gltf'
			}
		};
	}
	start() {
		const { AUDIO_ENV } = this.assets;
		this.addEnvAudio(AUDIO_ENV);
		this.addSky(1000, 0x111122);
		this.addVillage();
		this.addDirectLight();
		this.addFog();
	}
	loaded() {
		// play the sound
		this.envSound.play();
	}
	addEnvAudio(path) {
		// instantiate audio object
		this.envSound = new THREE.Audio(this.root.audioListener);

		// add the audio object to the scene
		this.add(this.envSound);
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
		this.add(sky);
	}
	addFog() {
		// this.fog = new THREE.Fog(0xdddddd, 0.01, 10);
		this.root.scene.fog = new THREE.Fog(0xdddddd, 0.01, 15);
	}
	addDirectLight() {
		// create the enviromental light
		this.add(new THREE.AmbientLight(0xaaaaaa));
		const light = new THREE.DirectionalLight(0xddddcc, 0.3);
		light.position.set(10, 10, 10);
		light.castShadow = true;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 512;
		light.shadow.camera.near = 50;
		light.shadow.camera.far = 500;
		light.shadow.camera.left = -500;
		light.shadow.camera.right = 500;
		light.shadow.camera.top = 150;
		light.shadow.camera.bottom = -150;
		this.add(light);
	}
	async addVillage() {
		const { PATH } = this.assets.MODEL_VILLAGE;
		const {scene} = await getGLTFModel(PATH);
		scene.position.set(0, -1, 0);
		scene.scale.set(0.2, 0.2, 0.2);
		this.add(scene);
	}
	update() {
	}
}
export default page1;