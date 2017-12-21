 /*global THREE:true*/
 /*global WebVR:true*/
 /*global TWEEN:true*/
import VRPage from 'core/js/VRPage';

// import ASSET_TEXTURE_SKYBOX from 'assets/texture/360_page1.jpg';
import ASSET_MODEL_HABITAT_OBJ from 'assets/model/Habitat/Habitat.obj';
import ASSET_MODEL_HABITAT_MTL from 'assets/model/Habitat/Habitat.mtl';

import 'lib/OBJLoader';
import 'lib/MTLLoader';
class page1 extends VRPage {
	start() {
		this.addSky(1000,0xffffff);
		this.addHabitat();
		this.addDirectLight();
		this.addFog();
	}
	loaded() {
	}
	addSky(radius,color) {
		// create panorama
		const geometry = new THREE.SphereGeometry(radius,50,50);
		const material = new THREE.MeshBasicMaterial( { color,side:THREE.BackSide } );
		const sky = new THREE.Mesh(geometry,material);
		WebVR.Scene.add(sky);
	}
	addFog() {
		WebVR.Scene.fog = new THREE.Fog(0xdddddd,0.01,50);
	}
	addDirectLight() {
		// create the enviromental light
		WebVR.Scene.add(new THREE.AmbientLight(0xdddddd));
		const light = new THREE.DirectionalLight( 0xddddcc, 0.3 );
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
	}
	addHabitat() {
		const mtlLoader = new THREE.MTLLoader();
		mtlLoader.load(ASSET_MODEL_HABITAT_MTL, materials => {

			materials.preload();
			const objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.load(ASSET_MODEL_HABITAT_OBJ,  object => {
				object.position.set(0,-12,0);
				object.scale.set(0.1,0.1,0.1);
				WebVR.Scene.add( object );

			});

		});
	}
	update() {
	}
}
export default page1;