# webvr-webpack-boilerplate 

> A webvr multi-pages project for three.js, es6/7, webpack and postcss.

[![Build Status](https://travis-ci.org/YoneChen/webvr-webpack-boilerplate.svg?branch=master)](https://travis-ci.org/YoneChen/webvr-webpack-boilerplate)

![](https://pic2.zhimg.com/v2-251229f9ea0b901b1d29bd2aa11a69e9_b.png)

> [中文](https://zhuanlan.zhihu.com/p/26907805)

## Features

* webvr: a webvr boilerplate supporting scenes changing
* three.js: use as the global varriable
* es6/7: by babel and it's presets and plugins
* postcss: by postcss-loader
* webpack provides faster compilation
* glsl: import .glsl files for shaders

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

Here comes the basic script to create a webvr page.
See more pages in `src/page/*.js` .
```
import VRPage from 'core/js/VRPage';

import ASSET_TEXTURE_BOX from '../assets/texture/box.jpg';
class Index extends VRPage {
	start() {
		let geometry = new THREE.CubeGeometry(5,5,5);
		let material = new THREE.MeshBasicMaterial({ 
			map: new THREE.TextureLoader().load(ASSET_TEXTURE_BOX) 
		});
		this.box = new THREE.Mesh(geometry,material);
		this.box.position.set(3,-2,-3);
		// add gaze eventLisenter
		WebVR.Scene.add(this.box);
		this.box.on('gaze',mesh => { // gazeIn trigger
			mesh.scale.set(1.2,1.2,1.2);
		},mesh => { // gazeOut trigger
		});
	}
	loaded() {
        console.log(`${ASSET_TEXTURE_BOX} has been loaded.`);
	}
	update(delta) {
		this.box.rotation.y += 0.05;
	}
}
export default Index;
```

### Init WebVR and Add Routers

```
// create routers map 
WebVR.init([
    {
        route: '', // e.g http://127.0.1:9000/
        path: 'index.js' // src/page/index.js
    },
    {
        route: '1', // e.g http://127.0.1:9000/1
        path: 'page1.js'
    },
    {
        route: '2', // e.g http://127.0.1:9000/2
        path: 'page2.js'
    }
],document.querySelector('.webvr-container')
);
```

## Forward Pages
It is no need to fetch more html,just fetch the script of page when you need to go forward other pages.
```
WebVR.forward('2'); // it will redirect to e.g: http://127.0.1:9000/2
/** 2 steps to be excuted in WebVR.forward function
* WebVR.cleanPage(); // clear object3d and events in current page
* import(`page/${fileName}.js`); // fetch and load the next page
** /
```

### WebVR API from VRCore.js

| API | type | description |
|:-----------|------------:|:------------:| 
| WebVR.init       |        function(routerArray,domElement) |     init the router and vrcamera   
| WebVR.forward       |        function(routeName) |     load and change the scene  
| WebVR.Scene       |        THREE.Scene |     global webvr scene     
| WebVR.Camera     |      THREE.PerspectiveCamera |    global webvr eyes    
| WebVR.Renderer       |        THREE.Renderer |     global webvr renderer      
| WebVR.CrossHair       |        THREE.Object3d |     global webvr crosshair  
| WebVR.Display       |        VRDisplay |     vrdispaly[0]  

### VRPage instance function

| name | parameter | description |
|:-----------|------------:|:------------:|
| start         |          null |      excute before the first rendering      
| loaded       |       null |    excute after all the textures,3d models and audio are loaded    
| update    |     parameter |   excute during each rendering


## How it work?

![](http://upload-images.jianshu.io/upload_images/1939855-906ca3b5b179b888.png)

## Need Help?

Ask questions [here](https://github.com/YoneChen/webvr-webpack-boilerplate/issues).

## Any advise?

PR welcome [here](https://github.com/YoneChen/webvr-webpack-boilerplate/pulls).

## Contributors

Yone Chen <yorkchan94@gmail.com>

## License

MIT
