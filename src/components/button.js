import {getTexture} from '@/utils/common'
const {Object3D} = THREE;
class Button extends Object3D {
    constructor(root,options) {
        super();
        this.root = root;
        this._init(options);
    }
    onFocus() {}
    onBlur() {}
    onSelect() {}
    _init(options) {
        const option = {
            camera: this.root.camera,
            width: 10,
            height: 7.5,
            fontSize: 4,
            fontColor: '#00aadd',
            backgroundColor: '#333333',
            text: 'button',
            ...options
        };
        const button = this.createButton(option);
        this.add(button);
        const pointer = this.createPoint();
        this.root.gazer.on(button, 'gazeEnter', ({point}) => {
            this.root.scene.add(pointer);
            this.onFocus();
            this.root.crossHair.animate.loader.start();
        });
        this.root.gazer.on(button, 'gazeTrigger', ({point}) => {
            const z = point.z > 0 ? point.z - 0.01 : point.z + 0.01;
            pointer.position.set(point.x,point.y,z)
        });
        this.root.gazer.on(button, 'gazeLeave', ({point}) => {
            this.root.scene.remove(pointer);
            this.root.crossHair.animate.loader.stop();
            this.onBlur();
        });
        this.root.gazer.on(button, 'gazeWait', ({point}) => {
            this.root.crossHair.animate.loader.stop();
            this.onSelect();
        });
    }
    createButton(option) {

        const geometry = new THREE.PlaneGeometry(option.width, option.height);
        const texture = getTexture(option);
        const material = new THREE.MeshBasicMaterial({ map: texture, opacity: 0.75, transparent: true });
        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }
    createPoint() {
        const geometry = new THREE.CircleGeometry(0.05, 16);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            opacity: 0.8,
            transparent: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }
}
export default Button;