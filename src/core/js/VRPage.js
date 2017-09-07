 /*global THREE:true*/
 /*global WebVR:true*/
import LoadControl from 'core/js/loadControl';
export default class VRPage {
	constructor(options={}) {
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
		WebVR.LoadingManager = THREE.DefaultLoadingManager;
		WebVR.LoadingManager.onProgress = (url, itemsLoaded, itemsTotal ) => {
			if(flag) WebVR.LoaderCount = itemsTotal - WebVR.LoaderCount;
			flag = false;
			if(!this.loadControl.hasAnimate())this.loadControl.initAnimate(WebVR.LoaderCount);
			this.loadControl.loadItem(); 
		};
		WebVR.LoadingManager.onLoad = () => {
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