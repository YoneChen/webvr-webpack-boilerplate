# webvr-webpack2-boilerplate

> A webvr project for three.js, es6/7, webpack2 and postcss.

## Features

* webvr: a webvr boilerplate used with webpack 
* three.js: use as global varriable
* es6/7: by babel and it's presets and plugins
* postcss: by postcss-loader
* webpack2 provides faster compilation

## Installation

    $ npm install
    # or
    $ yarn install

## Configuration

You can custom your local environment port(default 9000) via `webpack/webpack.dev.js`.

## Run in development

    $ npm start

## Build for production

    $ npm run build

This will generator minified scripts to `dist/`.

## Create webvr page

See the example in `src/app`

| API | type | description |
|:-----------|------------:|:------------:|
| WebVR.Scene       |        static,THREE.Scene |     global webvr scene     
| WebVR.Camera     |      static,THREE.Camera |    global webvr eyes    
| WebVR.Renderer       |        static,THREE.Renderer |     global webvr renderer     
| start         |          instance,function |      excute before the first rendering      
| loaded       |       instance,function |    excute after all the textures,3d models and audio are loaded    
| update    |     instance,function |   excute during each rendering

Here comes the basic script for webvr page.

```
import WebVR from 'common/js/webVR';

import ASSET_TEXTURE_BOX from '../assets/texture/box.jpg';
class Index extends WebVR {
	constructor() {
		super({domContainer:document.querySelector('.main-page')});
	}
	start() {
		this.box = this.addBox();
	}
	addBox() {
		// create a box
		let geometry = new THREE.CubeGeometry(5,5,5);
		let material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load(ASSET_TEXTURE_BOX) } );
		let box = new THREE.Mesh(geometry,material);
        box.position.set(3,-2,-3);
		WebVR.Scene.add(box);
		return box;
	}
	loaded() {
        console.log(`${ASSET_TEXTURE_BOX} has been loaded.`);
	}
	update(delta) {
		this.box.rotation.y += 0.05;
	}
}
new Index();
```

## Need Help?

Ask questions [here](https://github.com/yorkchan94/webvr-webpack2-boilerplate/issues).

## Any advise?

PR welcome [here](https://github.com/yorkchan94/webvr-webpack2-boilerplate/pulls).

## Contributors

YorkChan <yorkchan94@gmail.com>

And thanks to Micooz's project [es6-webpack2-boilerplate](https://github.com/micooz/es6-webpack2-boilerplate)

## License

MIT
