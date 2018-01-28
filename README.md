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

You can custom your local environment port via `webpack/webpack.dev.js`.

## Run in development

    $ npm start

## Build for production

    $ npm run build

This will generator minified scripts to `dist/`.

## Create webvr page

Here comes the basic script to create a webvr page.
See more pages in `src/views/*.js` .

```javascript
import VRPage from 'core/js/VRPage';

class Index extends VRPage {
  assets() {
    return {
      TEXTURE_SKYBOX: 'texture/360bg.jpg'
    }
  }
  start() {
     // create panorama
    const { TEXTURE_SKYBOX } = this.assets;
    const geometry = new THREE.SphereGeometry(radius,50,50);
    const material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load(TEXTURE_SKYBOX),side:THREE.BackSide } );
    const panorama = new THREE.Mesh(geometry,material);
    WebVR.Scene.add(panorama);
  }
  loaded() {
    console.log(`page has been loaded.`);
  }
  update(delta) {
    // animate
  }
}
export default Index;
```

### Init WebVR and Add Routers

```javascript
// create router map
WebVR.init([
    {
        path: '/', // e.g 127.0.0.1:8080/
        component: () => import('@/views/index.js')
    },
    {
        path: '/user', // e.g 127.0.0.1:8080/1
        component: () => import('@/views/userPage.js')
    },
    {
        path: '/detail', // e.g 127.0.0.1:8080/2
        component: () => import('@/views/detailPage.js')
    }
],document.querySelector('.webvr-container')
);
```

## WebVR Router

WebVR.Router is a router controling the action between vr pages.

* push(routerName) // e.g: WebVR.Router.push('home') // goto 127.0.0.1:8080/home,history will push state
* replace(routerName) // e.g: WebVR.Router.replace('home') // goto 127.0.0.1:8080/home,history will replace state
* back()

By use `WebVR.Router.push` can just fetch the script of page when you need to goto other vr pages.

```javascript
WebVR.Router.push('2'); // it will redirect to e.g: 127.0.0.1:8080/2
```

### WebVR API from VRCore.js

`WebVR` is declared as a gobal variable that import from VRCore.js

| name | type | description |
|:-----------|------------:|:------------:|
| WebVR.init       |        Function(routerArray,domElement) |     init the router and vrcamera
| WebVR.Router       |        Object |     router for controling the action between vr pages
| WebVR.Scene       |        THREE.Scene |     global webvr scene
| WebVR.Camera     |      THREE.PerspectiveCamera |    global camera of first person
| WebVR.Renderer       |        THREE.Renderer |     global webvr renderer
| WebVR.CrossHair       |        THREE.Object3d |     global webvr crosshair
| WebVR.Display       |        VRDisplay |     vrdispaly[0]

### VRPage class API

VRPage class is a class for create a webvr page.

| name | type | description |
|:-----------|------------:|:------------:|
| start         | Function() |      excute before the first rendering
| loaded       | Function() |    excute after all the textures,3d models and audio are loaded
| update    | Function() |   excute during each rendering
| assets | Function() | declear assets path for the page

## How it work

![](http://upload-images.jianshu.io/upload_images/1939855-906ca3b5b179b888.png)

## Need Help

Ask questions [here](https://github.com/YoneChen/webvr-webpack-boilerplate/issues).

## Any advise

PR welcome [here](https://github.com/YoneChen/webvr-webpack-boilerplate/pulls).

## Contributors

Yone Chen <yorkchan94@gmail.com>

## License

MIT
