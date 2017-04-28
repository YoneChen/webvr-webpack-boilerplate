 /*global THREE:true*/
 /*global WebVR:true*/
import LoadControl from 'common/js/loadControl';
export default class VRPage {
	constructor(options) {
		WebVR.createScene(options);
		this.initPage();
        WebVR.renderStart(this.update);
	}
	initPage() {
		this.bindEvent();
		this.start();
	}
	bindEvent() {
		this.loadControl = new LoadControl();
        if (WebVR.Manager.mode === 3) {
            this.loadControl.doubleDom();
        }
		WebVR.LoadingManager = THREE.DefaultLoadingManager;
		WebVR.LoadingManager.onProgress = (url, itemsLoaded, itemsTotal ) => {
			if(!this.loadControl.hasAnimate())this.loadControl.initAnimate(itemsTotal);
			console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
			this.loadControl.loadItem(); 

		};
		WebVR.LoadingManager.onLoad = () => {
			this.loadControl.loadedAll();
            setTimeout(() => {
                this.loaded();
            },100);
			console.log('finish');

		};
	}
	start() {
	}
	loaded() {}
	update(delta) {
	}
}