// create Router to simulate routes
 const Router = {
    createRouter(routes=[{'/':'index.js'}]) {
        this.routeObj = {};
        routes.forEach(route => {
            Object.defineProperty(this.routeObj,route.path.replace(/^\//,''),{value:route.component}); 
        });
        this._proxyRouter();
        this._historyProxy();
    },
    onchange(callback) {
        this.callback = callback;
    },
    // fetch and run page script
    push(routeName) {
        this.callback();
        history.pushState({ routeName },0,routeName);
        this._loadComponent(routeName);
    },
    // fetch and run page script
    replace(routeName) {
        this.callback();
        history.replaceState({ routeName },0,routeName);
        this._loadComponent(routeName);
    },
    back() {
        history.back();
    },
    // when enter url,redirect(fetch and run page script)
    _proxyRouter() {
        const routeName = this._currentRouteName;
        history.replaceState({ routeName },0,this._currentRouteName);
        this._loadComponent(routeName);
    },
    // when go back or go forward,run pre-page script.
    _historyProxy() {
        window.addEventListener('popstate',e => {
            this.callback();
            const routeName = e.state.routeName;
            this._loadComponent(routeName);
        },false);
    },
    get _currentRouteName() {
        return location.pathname.split('/').pop() || '';
    },
    _loadComponent(routeName) {
        const component = this._getComponent(routeName);
        this._initComponent(component);
    },
    _getComponent(routeName) {
        return this.routeObj[routeName.replace(/^\//,'')] || '';
    },
    async _initComponent(importComponent) {
       const mo = await importComponent();
       new mo.default();
    }
};
export default Router;