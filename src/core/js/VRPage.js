 /*global THREE:true*/
 /*global WebVR:true*/
 import LoadControl from '@/core/js/loadControl';
 export default class VRPage {
	 assets() {
		 return {};
	 }
	 constructor() {
		 this.LoaderCount = 0;
		 this.assets = this.assets();
		 this.initPage();
	 }
	 initPage() {
		 this.loadPage();
		 this.start();
	 }
	 loadPage() {
		 let flag = true;
		 const _managerLoaded = () => {
			if(this.loadControl) this.loadControl.loadedAll();
			setTimeout(() => {
				this.loaded();
				manager = null;
				WebVR.renderStart(this.update.bind(this));
			},100);
			console.log('finish');
		 };
		 if (!Object.keys(this.assets).length) {
			_managerLoaded();
			return;
		 }
		 var manager = THREE.DefaultLoadingManager;
		 this.loadControl = new LoadControl();
		 if (WebVR.Display && WebVR.Display.isPresenting) {
			 this.loadControl.doubleDom();
		 }
		 manager.onProgress = (url, itemsLoaded, itemsTotal ) => {
			 if(flag) this.LoaderCount = itemsTotal - this.LoaderCount;
			 flag = false;
			 if(!this.loadControl.hasAnimate())this.loadControl.initAnimate(this.LoaderCount);
			 this.loadControl.loadItem(); 
		 };
		 manager.onLoad = _managerLoaded.bind(this);
	 }
	 start() {
	 }
	 loaded() {}
	 update() {
	 }
 }