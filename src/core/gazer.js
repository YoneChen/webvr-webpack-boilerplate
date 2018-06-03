
// 凝视监听器
class VRGaze {
    constructor() {
        // 初始化射线发射源
        this.raycaster = new THREE.Raycaster();
        this._center = new THREE.Vector2();
        this.rayList = {}, this.targetList = [];
        this._intersection = null, this._lastTarget = null;
        this._gazeEnterTime = null, this.delayTime = 1500;
    }
    get delayTime() {
        return this._delayTime;
    }
    set delayTime(val) {
        this._delayTime = val;
    }
    get target() {
        return this._lastTarget;
    }
    get intersection() {
        return this._intersection;
    }
    /** 
     * @param {THREE.Mesh} target 监听的3d网格
     * @param {String} eventType 事件类型 
     *      'gazeEnter': '射线击中物体触发一次', 
     *      'gazeTrigger': '射线击中物体触发', 
     *      'gazeLeave': '射线离开物体触发'
     *      'gazeWait': '射线击中物体超过一定时间触发'
     * @param {Function} callback 事件回调
     **/
    on(target, eventType, callback) {
        const noop = () => { };
        if (!this.rayList[target.id]) this.rayList[target.id] = {
            target,
            gazeEnter: noop,
            gazeTrigger: noop,
            gazeLeave: noop,
            gazeWait: noop
        };
        this.rayList[target.id][eventType] = callback;
        this.targetList = Object.keys(this.rayList).map(key => this.rayList[key].target);
    }
    off(target, eventType) {
        if (!eventType) {
            delete this.rayList[target.id];
            this.targetList = Object.keys(this.rayList).map(key => this.rayList[key].target);
        } else {
            const noop = () => { };
            this.rayList[target.id][eventType] = noop;
        }
    }
    /** Remove all the target listeners. */
    removeAll() {
        this._lastTarget && this._lastTarget.id in this.rayList && this.rayList[this._lastTarget.id].gazeLeave(this._intersection);
        this.rayList = {}, this.targetList = [],this._lastTarget = null;
    }
    update(camera) {
        if (this.targetList.length <= 0) return;
        //创建凝视器
        this.raycaster.setFromCamera(this._center, camera);
        const intersects = this.raycaster.intersectObjects(this.targetList);
        if (intersects.length > 0) { //凝视触发
            const intersection = intersects[0], currentTarget = intersection.object;
            this._intersection = intersection;
            const targetChanged = this._lastTarget && this._lastTarget.id !== currentTarget.id; // 射线是否从A物体切换至B物体

            if (targetChanged) this.rayList[this._lastTarget.id].gazeLeave(this._intersection); // 射线从A物体离开，触发A物体的gazeLeave事件

            if (!this._lastTarget || targetChanged) {
                this._gazeEnterTime = Date.now();
                this.rayList[currentTarget.id].gazeEnter(intersection); // 射线进入B物体，触发B物体的gazeEnter事件
            }

            this.rayList[currentTarget.id].gazeTrigger(intersection); // 射线在B物体上，触发B物体的gazeTrigger事件
            
            this._delayListener(currentTarget.id);
            this._lastTarget = currentTarget;
        } else {
            // 如果是离开物体，则触发gazeLeave
            if (this._lastTarget) {
                this._lastTarget.id in this.rayList && this.rayList[this._lastTarget.id].gazeLeave(this._intersection);
            }
            this._intersection = null;
            this._lastTarget = null;
        }
    }
    _delayListener(targetid) {
        const {_gazeEnterTime,delayTime,rayList,_intersection} = this;
        if (_gazeEnterTime && Date.now() - _gazeEnterTime > delayTime) {
            rayList[targetid].gazeWait(_intersection);
            this._gazeEnterTime = null;
        }

    }
}
export default VRGaze;