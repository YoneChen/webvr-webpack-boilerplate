/*global THREE:true*/
import { root, renderStart } from './core';
const { Scene } = THREE;
import LoadControl from './loadControl';
class VRScene extends Scene {
	 constructor() {
		 super();
		 this.root = root;
		 this.LoaderCount = 0;
		 this.assets = this.assets();
		 this._initPage();
	 }
	 assets() {
		 return {};
	 }
	 start() {
	 }
	 loaded() {}
	 update() {
	 }
	 _initPage() {
		 this._loadPage();
		 this.start();
	 }
	 _loadPage() {
		 let flag = true;
		 const _managerLoaded = () => {
			if(this.loadControl) this.loadControl.loadedAll();
			setTimeout(() => {
				this.loaded();
				manager = null;
				renderStart(::this.update);
			},100);
			console.log('finish');
		 };
		 if (!Object.keys(this.assets).length) {
			_managerLoaded();
			return;
		 }
		 let manager = THREE.DefaultLoadingManager;
		 this.loadControl = new LoadControl();
		 if (this.root.display && this.root.display.isPresenting) {
			 this.loadControl.doubleDom();
		 }
		 manager.onProgress = (url, itemsLoaded, itemsTotal ) => {
			 if(flag) this.LoaderCount = itemsTotal - this.LoaderCount;
			 flag = false;
			 if(!this.loadControl.hasAnimate())this.loadControl.initAnimate(this.LoaderCount);
			 this.loadControl.loadItem(); 
		 };
		 manager.onLoad = this::_managerLoaded;
	 }
 }
 export default VRScene