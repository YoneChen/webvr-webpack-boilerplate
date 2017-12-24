 /*global THREE:true*/
 /*global WebVR:true*/
import VRPage from 'core/js/VRPage';
import CANNON from 'cannon';
class page2 extends VRPage {
	assets() {
		return {
			TEXTURE_GROUND: 'texture/road.jpg'
		};
	}
	start() {
		this.initPhysicsWorld();
		this.addLight();
		this.addSky(1000,0x519EcB);
		this.addGround(1000, 1000);
		this.addBalls();
		this.clock = new THREE.Clock();
	}
	initPhysicsWorld() {
		this.world = new CANNON.World();
		this.world.gravity.y = -10; // m/s²
		this.world.broadphase = new CANNON.NaiveBroadphase();
		this.physiclist = [];
	}
	addLight() {
		// create the enviromental light
		WebVR.Scene.add(new THREE.AmbientLight(0xFFFFFF));
		const light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(30, 30, -30);
		light.castShadow = true;
		// light.shadow.camera.far = 5000;      // default
		light.shadow.mapSize.width = 4096;
		light.shadow.mapSize.height = 4096;
		light.shadow.camera.left = -350;
		light.shadow.camera.right = 350;
		light.shadow.camera.top = 350;
		light.shadow.camera.bottom = -350;
		WebVR.Scene.add( light );
	}
	addBalls() {
		const { scene } = this;
		for (let i = 0; i < 60; i++) {
			// create ball
			const material = new THREE.MeshLambertMaterial({
				color: 0xef6500,
				needsUpdate: true,
				opacity: 1,
				transparent: true
			});
			const geometry = new THREE.SphereGeometry(2, 12, 12);
			const ball = new THREE.Mesh(geometry, material);
			ball.castShadow = true;
			ball.receiveShadow = true;
			ball.position.set(30 * Math.random() - 15, 30 * Math.random() + 15, 30 * Math.random() - 15);
			WebVR.Scene.add(ball);
			this.addBody(ball, 1); // 质量为1
			WebVR.Gazer.on(ball, 'gazeEnter', () => {
				ball.material.opacity = 0.5;
			});
			WebVR.Gazer.on(ball, 'gazeLeave', () => {
				ball.material.opacity = 1;
			});
		}
	}
	addSky(radius,color) {
		// create panorama
		const geometry = new THREE.SphereGeometry(radius,50,50);
		const material = new THREE.MeshBasicMaterial( { color,side:THREE.BackSide } );
		const sky = new THREE.Mesh(geometry,material);
		WebVR.Scene.add(sky);
	}
	addGround(width, height) {
		// create ground 
		const {TEXTURE_GROUND} = this.assets;
		const geometry = new THREE.PlaneBufferGeometry(width, height);
		const map = new THREE.TextureLoader().load(TEXTURE_GROUND);
		const material = new THREE.MeshLambertMaterial({ map });
		material.map.repeat.set(10, 10);
		material.map.wrapS = THREE.RepeatWrapping;
		material.map.wrapT = THREE.RepeatWrapping;
		const ground = new THREE.Mesh(geometry, material);
		ground.rotation.x = - Math.PI / 2;
		ground.position.y = -10;
		ground.receiveShadow = true;
		WebVR.Scene.add(ground);
		this.addBody(ground, 0);
	}
	addBody(mesh, mass) {
		if (mesh.type != 'Mesh') return;
		const {
		geometry,
			position,
			quaternion
	} = mesh;
		let shape = null;
		const { parameters } = geometry;
		switch (geometry.type) {
			case 'BoxGeometry': shape = new CANNON.Box(new CANNON.Vec3(parameters.width, parameters.height, parameters.depth)); break;
			case 'SphereGeometry': shape = new CANNON.Sphere(parameters.radius); break;
			case 'PlaneBufferGeometry' || 'PlaneGeometry': shape = new CANNON.Plane(); break;
			default: return;
		}
		const body = new CANNON.Body({ mass });
		body.position.set(position.x, position.y, position.z);
		body.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
		body.addShape(shape);
		this.world.add(body);
		this.physiclist.push({
			id: mesh.id,
			mesh,
			body
		});
	}
	updatePhysics(dt) {
		const { world, physiclist } = this;
		this.world.step(1 / 60, dt);
		physiclist.map(({ mesh, body }) => {
			mesh.position.copy(body.position);
			mesh.quaternion.copy(body.quaternion);
		});
	}
	update() {
		const delta = this.clock.getDelta();
		this.updatePhysics(delta);
	}
}
export default page2;