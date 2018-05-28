

import '@/lib/GLTFLoader';
import '@/lib/OBJLoader';
import '@/lib/MTLLoader';
import '@/lib/ColladaLoader';
export async function getGLTFModel(path) {
    return new Promise(resolve => {
        const loader = new THREE.GLTFLoader();
        loader.load(path, data => {
            resolve(data);
        });
    });
}
export async function getOBJModel(path,OBJ_path,MTL_path) {
    return new Promise(resolve => {
        const mtlLoader = new THREE.MTLLoader();
		mtlLoader.setTexturePath(path);
        mtlLoader.load( MTL_path,  materials => {

            materials.preload();

            const objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.load( OBJ_path,  object => {
                debugger
                resolve(object);

            } );

        });
    });
}
export async function getDAELoader(path) {
    return new Promise(resolve => {
        const loader = new THREE.ColladaLoader();
        loader.load(path, data => {
            resolve(data);
        });
    });
}
export function getTexture({
    text, 
    backgroundColor,
    fontSize,
    fontColor,
    width,
    height
}) {
    let canvas = document.createElement('canvas');
    const _width =  width * 100, _height =  height * 100;
    canvas.width =_width, canvas.height = _height;
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, _width, _height);
    ctx.fillStyle = fontColor;
    ctx.font = `${fontSize * 100}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, _width / 2, _height / 2);
    let texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}
