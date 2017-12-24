 /*global THREE:true*/
 /*global WebVR:true*/
 import LoadControl from 'core/js/loadControl';
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
		 this.loadControl = new LoadControl();
		 if (WebVR.Display && WebVR.Display.isPresenting) {
			 this.loadControl.doubleDom();
		 }
		 THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal ) => {
			 if(flag) this.LoaderCount = itemsTotal - this.LoaderCount;
			 flag = false;
			 if(!this.loadControl.hasAnimate())this.loadControl.initAnimate(this.LoaderCount);
			 this.loadControl.loadItem(); 
		 };
		 THREE.DefaultLoadingManager.onLoad = () => {
			 this.loadControl.loadedAll();
			 setTimeout(() => {
				 this.loaded();
				 WebVR.renderStart(this.update.bind(this));
			 },100);
			 console.log('finish');
 
		 };
	 }
	 start() {
	 }
	 loaded() {}
	 update() {
	 }
 }