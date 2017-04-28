 /*global THREE:true*/
 /*global WebVR:true*/
import LoadControl from 'common/js/loadControl';
export default class VRPage {
	constructor(options) {
		WebVR.createScene(options);
		this.initPage();
	}
	initPage() {
		this.bindEvent();
		this.start();
		this.render();
	}
	bindEvent() {
		this.loadControl = new LoadControl();
		WebVR.LoadingManager = THREE.DefaultLoadingManager;
		WebVR.LoadingManager.onProgress = (url, itemsLoaded, itemsTotal ) => {
			if(!this.loadControl.hasAnimate())this.loadControl.initAnimate(itemsTotal);
			console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
			this.loadControl.loadItem(); 

		};
		WebVR.LoadingManager.onLoad = () => {
			this.loadControl.loadedAll();
			this.loaded();
			console.log('finish');

		};
	}
	start() {
	}
	loaded() {}
	update(delta) {
	}
	render() {
		// launch the render
		let render = () => {
			const delta = WebVR.CLOCK.getDelta();
			this.update(delta);
			WebVR.Controls.update();
			WebVR.Manager.render(WebVR.Scene, WebVR.Camera);
			WebVR.loopID = requestAnimationFrame(render);
		};
		render();
	}
}