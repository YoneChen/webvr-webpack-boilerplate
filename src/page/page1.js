 /*global THREE:true*/
 /*global WebVR:true*/
 /*global TWEEN:true*/
import VRPage from 'core/js/VRPage';

import ASSET_TEXTURE_SKYBOX from 'assets/texture/360_page1.jpg';

import 'lib/OBJLoader';
import 'lib/MTLLoader';
class page1 extends VRPage {
	start() {
		this.addPanorama(1000, ASSET_TEXTURE_SKYBOX);
		this.addDirectLight();
	}
	loaded() {
	}
	addPanorama(radius,path) {
		// create panorama
		let geometry = new THREE.SphereGeometry(radius,50,50);
		let material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load(path),side:THREE.BackSide } );
		let panorama = new THREE.Mesh(geometry,material);
		WebVR.Scene.add(panorama);
		return panorama;
	}
	addDirectLight() {
		// create the enviromental light
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
	update() {
	}
}
export default page1;