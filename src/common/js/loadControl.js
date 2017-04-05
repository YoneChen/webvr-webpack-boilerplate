import '../css/load-control';
export default class LoadControl {
	constructor(count = 0) {
		if(!(typeof(count) === 'number') || count <=0 ) return false;
		this.initDom();
		this.initAnimate(count);
	}
	static Dom() {
		return `<svg class="svg-load" contorl="load">
						<circle cx="50%" cy="50%" r="25%"></circle>   
						<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central">Loading...</text>
					</svg>`.repeat(2);
	}
	initDom(domElement = document.body) {
		const DOM = LoadControl.Dom();
		this.dom = document.createElement('section');
		this.dom.className += 'load-control';
		this.dom.innerHTML = DOM;
		domElement.appendChild(this.dom);
		this.cricle = this.dom.querySelectorAll('circle');
		this.loadDom = this.dom.querySelectorAll('svg');
		this.cloneDom = this.loadDom[1];
		this.singleDom();
	}
	singleDom() {
		this.cloneDom.style.display = 'none';
	}
	doubleDom() {
		this.cloneDom.style.display = 'block';
	}
	initAnimate(count) {
		this.loadDataset = {
			count: count,
			rest: count,
			cricleLength: -1,
			offest: -1,
			unloadLength: -1
		};
		this.cricle.forEach(l => {
			l.style.transition = 'none';
			if(!this.cricleLength) this.loadDataset.cricleLength = l.getTotalLength();
			// 设置起始点
			l.style.strokeDasharray = `${this.loadDataset.cricleLength} ${this.loadDataset.cricleLength}`;
			l.style.strokeDashoffset = this.loadDataset.cricleLength;
			// 获取一个区域，获取相关的样式，让浏览器寻找一个起始点。
			l.getBoundingClientRect();
			// 定义动作
			l.style.transition = 'stroke-dashoffset 2s';
			// Go!
		});
		this.loadDataset.unloadLength = this.loadDataset.cricleLength;
		this.loadDataset.offest = 1/this.loadDataset.count * this.loadDataset.cricleLength;
	}
	loadItem() {
		this.cricle.forEach(l => {
			l.style.strokeDashoffset = this.loadDataset.unloadLength -= this.loadDataset.offest;
		});
		return --this.loadDataset.rest;
	}
	loadedAll() {
		this.dom.className += ' loaded';
	}
	clear() {
		this.dom.remove();
	}
}