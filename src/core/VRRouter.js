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

    onchange() {},
    onload(component) {},
    // fetch and run page script
    push(routeName) {
        this.onchange();
        history.pushState({ routeName },0,routeName);
        this._loadComponent(routeName);
    },
    // fetch and run page script
    replace(routeName) {
        this.onchange();
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
            this.onchange();
            const routeName = e.state.routeName;
            this._loadComponent(routeName);
        },false);
    },
    get _currentRouteName() {
        return location.pathname.split('/').pop() || '';
    },
    _loadComponent(routeName) {
        const componentName = this._getComponentName(routeName);
        this._initComponent(componentName).then(component => { this.onload(component) } );
    },
    _getComponentName(routeName) {
        return this.routeObj[routeName.replace(/^\//,'')] || '';
    },
    async _initComponent(importComponent) {
       const mo = await importComponent();
       const component = new mo.default();
       return component;
    }
};
export default Router;