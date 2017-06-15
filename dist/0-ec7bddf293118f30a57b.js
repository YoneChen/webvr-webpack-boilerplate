webpackJsonp([0],{121:function(t,e,n){"use strict";(function(t,r){function a(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(314),c=a(l),h=n(318),f=a(h),d=n(324),p=a(d),m=n(323),v=a(m),g=n(322),y=a(g);n(321),n(320);var b=function(e){function n(){return i(this,n),o(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return s(n,e),u(n,[{key:"start",value:function(){this.addPanorama(1e3,p.default),this.addBallon(),this.addDirectLight()}},{key:"loaded",value:function(){}},{key:"addPanorama",value:function(e,n){var a=new t.SphereGeometry(e,50,50),i=new t.MeshBasicMaterial({map:(new t.TextureLoader).load(n),side:t.BackSide}),o=new t.Mesh(a,i);return r.Scene.add(o),o}},{key:"addDirectLight",value:function(){r.Scene.add(new t.AmbientLight(14540253));var e=new t.DirectionalLight(14540236,.3);return e.position.set(100,100,100),e.castShadow=!0,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=512,e.shadow.camera.near=50,e.shadow.camera.far=500,e.shadow.camera.left=-500,e.shadow.camera.right=500,e.shadow.camera.top=150,e.shadow.camera.bottom=-150,r.Scene.add(e),e}},{key:"addBallon",value:function(){var e=new t.MTLLoader;e.load(y.default,function(e){e.preload();var n=new t.OBJLoader;n.setMaterials(e),n.load(v.default,function(t){t.position.set(20,20,-100),t.scale.set(.1,.1,.1);var e=t.position,n=e.x,a=e.y,i=(e.z,new f.default.Tween(t.position).to({x:n-100,y:a+200,z:0},1e4).easing(f.default.Easing.Sinusoidal.InOut));t.on("gaze",function(t){i.start()}),r.Scene.add(t)})})}},{key:"update",value:function(){f.default.update()}}]),n}(c.default);e.default=b}).call(e,n(45),n(86))},314:function(t,e,n){"use strict";(function(t,r){function a(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=n(315),u=a(s),l=function(){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e),this.initPage()}return o(e,[{key:"initPage",value:function(){this.loadPage(),this.start()}},{key:"loadPage",value:function(){var e=this,n=!0;this.loadControl=new u.default,3===t.Manager.mode&&this.loadControl.doubleDom(),t.LoadingManager=r.DefaultLoadingManager,t.LoadingManager.onProgress=function(r,a,i){n&&(t.LoaderCount=i-t.LoaderCount),n=!1,e.loadControl.hasAnimate()||e.loadControl.initAnimate(t.LoaderCount),e.loadControl.loadItem()},t.LoadingManager.onLoad=function(){e.loadControl.loadedAll(),setTimeout(function(){e.loaded(),t.renderStart(e.update)},100),console.log("finish")}}},{key:"start",value:function(){}},{key:"loaded",value:function(){}},{key:"update",value:function(t){}}]),e}();e.default=l}).call(e,n(86),n(45))},315:function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();n(317);var i=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:37.5;r(this,t),this.radius=e,this.animate=!1,this.initDom()}return a(t,[{key:"initDom",value:function(){var e=t.Dom(this.radius),n=document.createDocumentFragment();this.dom=document.createElement("section"),this.dom.className+="load-control",this.dom.innerHTML=e,n.appendChild(this.dom),this.cricle=n.querySelectorAll("circle"),this.loadDom=n.querySelectorAll("svg"),this.cloneDom=this.loadDom[1],this.singleDom(),document.body.appendChild(n)}},{key:"singleDom",value:function(){this.cloneDom.style.display="none"}},{key:"doubleDom",value:function(){this.cloneDom.style.display="block"}},{key:"hasAnimate",value:function(){return this.animate}},{key:"initAnimate",value:function(t){var e=this;return!("number"!=typeof t||t<=0)&&(this.animate=!0,this.loadDataset={count:t,rest:t,cricleLength:2*this.radius*Math.PI,offest:0,unloadLength:0},Array.from(this.cricle).forEach(function(t){t.style.strokeDasharray=e.loadDataset.cricleLength+" "+e.loadDataset.cricleLength,t.style.strokeDashoffset=e.loadDataset.cricleLength,t.style.display="inline-block"}),this.loadDataset.unloadLength=this.loadDataset.cricleLength,void(this.loadDataset.offest=1/this.loadDataset.count*this.loadDataset.cricleLength))}},{key:"loadItem",value:function(){var t=this.loadDataset.unloadLength-=this.loadDataset.offest;return Array.from(this.cricle).forEach(function(e){e.style.transition="none",e.style.transition="stroke-dashoffset 1s",e.style.strokeDashoffset=t}),--this.loadDataset.rest}},{key:"loadedAll",value:function(){var t=this;this.dom.className+=" loaded",this.dom.addEventListener("webkitTransitionEnd",function(e){t.clear()}),this.dom.addEventListener("transitionend",function(e){t.clear()})}},{key:"clear",value:function(){this.dom.remove()}}],[{key:"Dom",value:function(t){return('<svg class="svg-load">\n\t\t\t\t\t\t<circle cx="50%" cy="50%" r="'+t+'"></circle>   \n\t\t\t\t\t\t<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central">Loading</text>\n\t\t\t\t\t</svg>').repeat(2)}}]),t}();e.default=i},316:function(t,e,n){e=t.exports=n(312)(),e.push([t.i,".load-control{-webkit-transition:opacity 1s 1s;transition:opacity 1s 1s;position:absolute;left:0;right:0;top:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#333;z-index:1}.svg-load{width:150px;height:150px}.svg-load circle{fill:none;stroke:#0ad;stroke-width:2px;display:none;//:rotate(-90deg);//:50%}.svg-load text{fill:#fff;font-size:12px}.loaded{opacity:0}","",{version:3,sources:["/./src/common/css/load-control.css"],names:[],mappings:"AAAA,cACC,iCAAA,yBAA0B,kBACP,OACX,QACC,MACF,SACG,oBACV,oBAAA,aAAc,yBACd,6BAA8B,yBAC9B,sBAAA,mBAAoB,sBACG,SACR,CACf,UAEA,YAAa,YACC,CACd,iBAEC,UAAW,YACK,iBACE,aACJ,kBACe,MACD,CAC5B,eAEA,UAAW,cACI,CACf,QAED,SAAW,CACX",file:"load-control.css",sourcesContent:[".load-control {\n\ttransition: opacity 1s 1s;\n\tposition: absolute;\n\tleft: 0;\n\tright: 0;\n\ttop: 0;\n\tbottom: 0;\n\tdisplay: flex;\n\tjustify-content: space-around;\n\talign-items: center;\n\tbackground-color: #333;\n\tz-index: 10000;\n}\n.svg-load {\n\twidth: 150px;\n\theight: 150px;     \n}\n.svg-load circle {\n\t\tfill: none;\n\t\tstroke: #00aadd;\n\t\tstroke-width: 2px;\n\t\tdisplay: none;\n\t\t// transform: rotate(-90deg);\n  //   \ttransform-origin: 50%;\n\t}\n.svg-load text {\n\t\tfill: #fff;\n\t\tfont-size: 12px\n\t}\n.loaded {\n\topacity: 0;\n}"],sourceRoot:"webpack://"}])},317:function(t,e,n){var r=n(316);"string"==typeof r&&(r=[[t.i,r,""]]);n(313)(r,{});r.locals&&(t.exports=r.locals)},318:function(t,e,n){(function(n){var r,a,i=i||function(){var t=[];return{getAll:function(){return t},removeAll:function(){t=[]},add:function(e){t.push(e)},remove:function(e){var n=t.indexOf(e);n!==-1&&t.splice(n,1)},update:function(e,n){if(0===t.length)return!1;var r=0;for(e=void 0!==e?e:i.now();r<t.length;)t[r].update(e)||n?r++:t.splice(r,1);return!0}}}();"undefined"==typeof window&&"undefined"!=typeof n?i.now=function(){var t=n.hrtime();return 1e3*t[0]+t[1]/1e6}:"undefined"!=typeof window&&void 0!==window.performance&&void 0!==window.performance.now?i.now=window.performance.now.bind(window.performance):void 0!==Date.now?i.now=Date.now:i.now=function(){return(new Date).getTime()},i.Tween=function(t){var e,n=t,r={},a={},o={},s=1e3,u=0,l=!1,c=!1,h=!1,f=0,d=null,p=i.Easing.Linear.None,m=i.Interpolation.Linear,v=[],g=null,y=!1,b=null,w=null,x=null;this.to=function(t,e){return a=t,void 0!==e&&(s=e),this},this.start=function(t){i.add(this),c=!0,y=!1,d=void 0!==t?t:i.now(),d+=f;for(var e in a){if(a[e]instanceof Array){if(0===a[e].length)continue;a[e]=[n[e]].concat(a[e])}void 0!==n[e]&&(r[e]=n[e],r[e]instanceof Array==!1&&(r[e]*=1),o[e]=r[e]||0)}return this},this.stop=function(){return c?(i.remove(this),c=!1,null!==x&&x.call(n,n),this.stopChainedTweens(),this):this},this.end=function(){return this.update(d+s),this},this.stopChainedTweens=function(){for(var t=0,e=v.length;t<e;t++)v[t].stop()},this.delay=function(t){return f=t,this},this.repeat=function(t){return u=t,this},this.repeatDelay=function(t){return e=t,this},this.yoyo=function(t){return l=t,this},this.easing=function(t){return p=t,this},this.interpolation=function(t){return m=t,this},this.chain=function(){return v=arguments,this},this.onStart=function(t){return g=t,this},this.onUpdate=function(t){return b=t,this},this.onComplete=function(t){return w=t,this},this.onStop=function(t){return x=t,this},this.update=function(t){var i,c,x;if(t<d)return!0;y===!1&&(null!==g&&g.call(n,n),y=!0),c=(t-d)/s,c=c>1?1:c,x=p(c);for(i in a)if(void 0!==r[i]){var A=r[i]||0,M=a[i];M instanceof Array?n[i]=m(M,x):("string"==typeof M&&(M="+"===M.charAt(0)||"-"===M.charAt(0)?A+parseFloat(M):parseFloat(M)),"number"==typeof M&&(n[i]=A+(M-A)*x))}if(null!==b&&b.call(n,x),1===c){if(u>0){isFinite(u)&&u--;for(i in o){if("string"==typeof a[i]&&(o[i]=o[i]+parseFloat(a[i])),l){var L=o[i];o[i]=a[i],a[i]=L}r[i]=o[i]}return l&&(h=!h),d=void 0!==e?t+e:t+f,!0}null!==w&&w.call(n,n);for(var C=0,k=v.length;C<k;C++)v[C].start(d+s);return!1}return!0}},i.Easing={Linear:{None:function(t){return t}},Quadratic:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quartic:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quintic:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sinusoidal:{In:function(t){return 1-Math.cos(t*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return.5*(1-Math.cos(Math.PI*t))}},Exponential:{In:function(t){return 0===t?0:Math.pow(1024,t-1)},Out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2)}},Circular:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){return 0===t?0:1===t?1:-Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)},Out:function(t){return 0===t?0:1===t?1:Math.pow(2,-10*t)*Math.sin(5*(t-.1)*Math.PI)+1},InOut:function(t){return 0===t?0:1===t?1:(t*=2,t<1?-.5*Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)+1)}},Back:{In:function(t){var e=1.70158;return t*t*((e+1)*t-e)},Out:function(t){var e=1.70158;return--t*t*((e+1)*t+e)+1},InOut:function(t){var e=2.5949095;return(t*=2)<1?.5*(t*t*((e+1)*t-e)):.5*((t-=2)*t*((e+1)*t+e)+2)}},Bounce:{In:function(t){return 1-i.Easing.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?.5*i.Easing.Bounce.In(2*t):.5*i.Easing.Bounce.Out(2*t-1)+.5}}},i.Interpolation={Linear:function(t,e){var n=t.length-1,r=n*e,a=Math.floor(r),o=i.Interpolation.Utils.Linear;return e<0?o(t[0],t[1],r):e>1?o(t[n],t[n-1],n-r):o(t[a],t[a+1>n?n:a+1],r-a)},Bezier:function(t,e){for(var n=0,r=t.length-1,a=Math.pow,o=i.Interpolation.Utils.Bernstein,s=0;s<=r;s++)n+=a(1-e,r-s)*a(e,s)*t[s]*o(r,s);return n},CatmullRom:function(t,e){var n=t.length-1,r=n*e,a=Math.floor(r),o=i.Interpolation.Utils.CatmullRom;return t[0]===t[n]?(e<0&&(a=Math.floor(r=n*(1+e))),o(t[(a-1+n)%n],t[a],t[(a+1)%n],t[(a+2)%n],r-a)):e<0?t[0]-(o(t[0],t[0],t[1],t[1],-r)-t[0]):e>1?t[n]-(o(t[n],t[n],t[n-1],t[n-1],r-n)-t[n]):o(t[a?a-1:0],t[a],t[n<a+1?n:a+1],t[n<a+2?n:a+2],r-a)},Utils:{Linear:function(t,e,n){return(e-t)*n+t},Bernstein:function(t,e){var n=i.Interpolation.Utils.Factorial;return n(t)/n(e)/n(t-e)},Factorial:function(){var t=[1];return function(e){var n=1;if(t[e])return t[e];for(var r=e;r>1;r--)n*=r;return t[e]=n,n}}(),CatmullRom:function(t,e,n,r,a){var i=.5*(n-t),o=.5*(r-e),s=a*a,u=a*s;return(2*e-2*n+i+o)*u+(-3*e+3*n-2*i-o)*s+i*a+e}}},function(n){r=[],a=function(){return i}.apply(e,r),!(void 0!==a&&(t.exports=a))}(this)}).call(e,n(119))},320:function(t,e,n){"use strict";(function(t){t.MTLLoader=function(e){this.manager=void 0!==e?e:t.DefaultLoadingManager},Object.assign(t.MTLLoader.prototype,t.EventDispatcher.prototype,{load:function(e,n,r,a){var i=this,o=new t.XHRLoader(this.manager);o.setPath(this.path),o.load(e,function(t){n(i.parse(t))},r,a)},setPath:function(t){this.path=t},setTexturePath:function(t){this.texturePath=t},setBaseUrl:function(t){console.warn("THREE.MTLLoader: .setBaseUrl() is deprecated. Use .setTexturePath( path ) for texture path or .setPath( path ) for general base path instead."),this.setTexturePath(t)},setCrossOrigin:function(t){this.crossOrigin=t},setMaterialOptions:function(t){this.materialOptions=t},parse:function(e){for(var n=e.split("\n"),r={},a=/\s+/,i={},o=0;o<n.length;o++){var s=n[o];if(s=s.trim(),0!==s.length&&"#"!==s.charAt(0)){var u=s.indexOf(" "),l=u>=0?s.substring(0,u):s;l=l.toLowerCase();var c=u>=0?s.substring(u+1):"";if(c=c.trim(),"newmtl"===l)r={name:c},i[c]=r;else if(r)if("ka"===l||"kd"===l||"ks"===l){var h=c.split(a,3);r[l]=[parseFloat(h[0]),parseFloat(h[1]),parseFloat(h[2])]}else r[l]=c}}var f=new t.MTLLoader.MaterialCreator(this.texturePath||this.path,this.materialOptions);return f.setCrossOrigin(this.crossOrigin),f.setManager(this.manager),f.setMaterials(i),f}}),t.MTLLoader.MaterialCreator=function(e,n){this.baseUrl=e||"",this.options=n,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.side=this.options&&this.options.side?this.options.side:t.FrontSide,this.wrap=this.options&&this.options.wrap?this.options.wrap:t.RepeatWrapping},t.MTLLoader.MaterialCreator.prototype={constructor:t.MTLLoader.MaterialCreator,setCrossOrigin:function(t){this.crossOrigin=t},setManager:function(t){this.manager=t},setMaterials:function(t){this.materialsInfo=this.convert(t),this.materials={},this.materialsArray=[],this.nameLookup={}},convert:function(t){if(!this.options)return t;var e={};for(var n in t){var r=t[n],a={};e[n]=a;for(var i in r){var o=!0,s=r[i],u=i.toLowerCase();switch(u){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(s=[s[0]/255,s[1]/255,s[2]/255]),this.options&&this.options.ignoreZeroRGBs&&0===s[0]&&0===s[1]&&0===s[2]&&(o=!1)}o&&(a[u]=s)}}return e},preload:function(){for(var t in this.materialsInfo)this.create(t)},getIndex:function(t){return this.nameLookup[t]},getAsArray:function(){var t=0;for(var e in this.materialsInfo)this.materialsArray[t]=this.create(e),this.nameLookup[e]=t,t++;return this.materialsArray},create:function(t){return void 0===this.materials[t]&&this.createMaterial_(t),this.materials[t]},createMaterial_:function(e){function n(t,e){if(!i[t]){var n=r.getTextureParams(e,i),a=r.loadTexture(o(r.baseUrl,n.url));a.repeat.copy(n.scale),a.offset.copy(n.offset),a.wrapS=r.wrap,a.wrapT=r.wrap,i[t]=a}}var r=this,a=this.materialsInfo[e],i={name:e,side:this.side},o=function(t,e){return"string"!=typeof e||""===e?"":/^https?:\/\//i.test(e)?e:t+e};for(var s in a){var u=a[s];if(""!==u)switch(s.toLowerCase()){case"kd":i.color=(new t.Color).fromArray(u);break;case"ks":i.specular=(new t.Color).fromArray(u);break;case"map_kd":n("map",u);break;case"map_ks":n("specularMap",u);break;case"map_bump":case"bump":n("bumpMap",u);break;case"ns":i.shininess=parseFloat(u);break;case"d":u<1&&(i.opacity=u,i.transparent=!0);break;case"Tr":u>0&&(i.opacity=1-u,i.transparent=!0)}}return this.materials[e]=new t.MeshPhongMaterial(i),this.materials[e]},getTextureParams:function(e,n){var r,a={scale:new t.Vector2(1,1),offset:new t.Vector2(0,0)},i=e.split(/\s+/);return r=i.indexOf("-bm"),r>=0&&(n.bumpScale=parseFloat(i[r+1]),i.splice(r,2)),r=i.indexOf("-s"),r>=0&&(a.scale.set(parseFloat(i[r+1]),parseFloat(i[r+2])),i.splice(r,4)),r=i.indexOf("-o"),r>=0&&(a.offset.set(parseFloat(i[r+1]),parseFloat(i[r+2])),i.splice(r,4)),a.url=i.join(" ").trim(),a},loadTexture:function(e,n,r,a,i){var o,s=t.Loader.Handlers.get(e),u=void 0!==this.manager?this.manager:t.DefaultLoadingManager;return null===s&&(s=new t.TextureLoader(u)),s.setCrossOrigin&&s.setCrossOrigin(this.crossOrigin),o=s.load(e,r,a,i),void 0!==n&&(o.mapping=n),o}}}).call(e,n(45))},321:function(t,e,n){"use strict";(function(t){t.OBJLoader=function(e){this.manager=void 0!==e?e:t.DefaultLoadingManager,this.materials=null,this.regexp={vertex_pattern:/^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,normal_pattern:/^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,uv_pattern:/^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,face_vertex:/^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,face_vertex_uv:/^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,face_vertex_uv_normal:/^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,face_vertex_normal:/^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,object_pattern:/^[og]\s*(.+)?/,smoothing_pattern:/^s\s+(\d+|on|off)/,material_library_pattern:/^mtllib /,material_use_pattern:/^usemtl /}},t.OBJLoader.prototype={constructor:t.OBJLoader,load:function(e,n,r,a){var i=this,o=new t.XHRLoader(i.manager);o.setPath(this.path),o.load(e,function(t){n(i.parse(t))},r,a)},setPath:function(t){this.path=t},setMaterials:function(t){this.materials=t},_createParserState:function(){var t={objects:[],object:{},vertices:[],normals:[],uvs:[],materialLibraries:[],startObject:function(t,e){if(this.object&&this.object.fromDeclaration===!1)return this.object.name=t,void(this.object.fromDeclaration=e!==!1);var n=this.object&&"function"==typeof this.object.currentMaterial?this.object.currentMaterial():void 0;if(this.object&&"function"==typeof this.object._finalize&&this.object._finalize(!0),this.object={name:t||"",fromDeclaration:e!==!1,geometry:{vertices:[],normals:[],uvs:[]},materials:[],smooth:!0,startMaterial:function(t,e){var n=this._finalize(!1);n&&(n.inherited||n.groupCount<=0)&&this.materials.splice(n.index,1);var r={index:this.materials.length,name:t||"",mtllib:Array.isArray(e)&&e.length>0?e[e.length-1]:"",smooth:void 0!==n?n.smooth:this.smooth,groupStart:void 0!==n?n.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(t){var e={index:"number"==typeof t?t:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return e.clone=this.clone.bind(e),e}};return this.materials.push(r),r},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(t){var e=this.currentMaterial();if(e&&e.groupEnd===-1&&(e.groupEnd=this.geometry.vertices.length/3,e.groupCount=e.groupEnd-e.groupStart,e.inherited=!1),t&&this.materials.length>1)for(var n=this.materials.length-1;n>=0;n--)this.materials[n].groupCount<=0&&this.materials.splice(n,1);return t&&0===this.materials.length&&this.materials.push({name:"",smooth:this.smooth}),e}},n&&n.name&&"function"==typeof n.clone){var r=n.clone(0);r.inherited=!0,this.object.materials.push(r)}this.objects.push(this.object)},finalize:function(){this.object&&"function"==typeof this.object._finalize&&this.object._finalize(!0)},parseVertexIndex:function(t,e){var n=parseInt(t,10);return 3*(n>=0?n-1:n+e/3)},parseNormalIndex:function(t,e){var n=parseInt(t,10);return 3*(n>=0?n-1:n+e/3)},parseUVIndex:function(t,e){var n=parseInt(t,10);return 2*(n>=0?n-1:n+e/2)},addVertex:function(t,e,n){var r=this.vertices,a=this.object.geometry.vertices;a.push(r[t+0]),a.push(r[t+1]),a.push(r[t+2]),a.push(r[e+0]),a.push(r[e+1]),a.push(r[e+2]),a.push(r[n+0]),a.push(r[n+1]),a.push(r[n+2])},addVertexLine:function(t){var e=this.vertices,n=this.object.geometry.vertices;n.push(e[t+0]),n.push(e[t+1]),n.push(e[t+2])},addNormal:function(t,e,n){var r=this.normals,a=this.object.geometry.normals;a.push(r[t+0]),a.push(r[t+1]),a.push(r[t+2]),a.push(r[e+0]),a.push(r[e+1]),a.push(r[e+2]),a.push(r[n+0]),a.push(r[n+1]),a.push(r[n+2])},addUV:function(t,e,n){var r=this.uvs,a=this.object.geometry.uvs;a.push(r[t+0]),a.push(r[t+1]),a.push(r[e+0]),a.push(r[e+1]),a.push(r[n+0]),a.push(r[n+1])},addUVLine:function(t){var e=this.uvs,n=this.object.geometry.uvs;n.push(e[t+0]),n.push(e[t+1])},addFace:function(t,e,n,r,a,i,o,s,u,l,c,h){var f,d=this.vertices.length,p=this.parseVertexIndex(t,d),m=this.parseVertexIndex(e,d),v=this.parseVertexIndex(n,d);if(void 0===r?this.addVertex(p,m,v):(f=this.parseVertexIndex(r,d),this.addVertex(p,m,f),this.addVertex(m,v,f)),void 0!==a){var g=this.uvs.length;p=this.parseUVIndex(a,g),m=this.parseUVIndex(i,g),v=this.parseUVIndex(o,g),void 0===r?this.addUV(p,m,v):(f=this.parseUVIndex(s,g),this.addUV(p,m,f),this.addUV(m,v,f))}if(void 0!==u){var y=this.normals.length;p=this.parseNormalIndex(u,y),m=u===l?p:this.parseNormalIndex(l,y),v=u===c?p:this.parseNormalIndex(c,y),void 0===r?this.addNormal(p,m,v):(f=this.parseNormalIndex(h,y),this.addNormal(p,m,f),this.addNormal(m,v,f))}},addLineGeometry:function(t,e){this.object.geometry.type="Line";for(var n=this.vertices.length,r=this.uvs.length,a=0,i=t.length;a<i;a++)this.addVertexLine(this.parseVertexIndex(t[a],n));for(var o=0,i=e.length;o<i;o++)this.addUVLine(this.parseUVIndex(e[o],r))}};return t.startObject("",!1),t},parse:function(e){console.time("OBJLoader");var n=this._createParserState();e.indexOf("\r\n")!==-1&&(e=e.replace(/\r\n/g,"\n")),e.indexOf("\\\n")!==-1&&(e=e.replace(/\\\n/g,""));for(var r=e.split("\n"),a="",i="",o="",s=0,u=[],l="function"==typeof"".trimLeft,c=0,h=r.length;c<h;c++)if(a=r[c],a=l?a.trimLeft():a.trim(),s=a.length,0!==s&&(i=a.charAt(0),"#"!==i))if("v"===i)if(o=a.charAt(1)," "===o&&null!==(u=this.regexp.vertex_pattern.exec(a)))n.vertices.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3]));else if("n"===o&&null!==(u=this.regexp.normal_pattern.exec(a)))n.normals.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3]));else{if("t"!==o||null===(u=this.regexp.uv_pattern.exec(a)))throw new Error("Unexpected vertex/normal/uv line: '"+a+"'");n.uvs.push(parseFloat(u[1]),parseFloat(u[2]))}else if("f"===i)if(null!==(u=this.regexp.face_vertex_uv_normal.exec(a)))n.addFace(u[1],u[4],u[7],u[10],u[2],u[5],u[8],u[11],u[3],u[6],u[9],u[12]);else if(null!==(u=this.regexp.face_vertex_uv.exec(a)))n.addFace(u[1],u[3],u[5],u[7],u[2],u[4],u[6],u[8]);else if(null!==(u=this.regexp.face_vertex_normal.exec(a)))n.addFace(u[1],u[3],u[5],u[7],void 0,void 0,void 0,void 0,u[2],u[4],u[6],u[8]);else{if(null===(u=this.regexp.face_vertex.exec(a)))throw new Error("Unexpected face line: '"+a+"'");n.addFace(u[1],u[2],u[3],u[4])}else if("l"===i){var f=a.substring(1).trim().split(" "),d=[],p=[];if(a.indexOf("/")===-1)d=f;else for(var m=0,v=f.length;m<v;m++){var g=f[m].split("/");""!==g[0]&&d.push(g[0]),""!==g[1]&&p.push(g[1])}n.addLineGeometry(d,p)}else if(null!==(u=this.regexp.object_pattern.exec(a))){var y=(" "+u[0].substr(1).trim()).substr(1);n.startObject(y)}else if(this.regexp.material_use_pattern.test(a))n.object.startMaterial(a.substring(7).trim(),n.materialLibraries);else if(this.regexp.material_library_pattern.test(a))n.materialLibraries.push(a.substring(7).trim());else{if(null===(u=this.regexp.smoothing_pattern.exec(a))){if("\0"===a)continue;throw new Error("Unexpected line: '"+a+"'")}var b=u[1].trim().toLowerCase();n.object.smooth="1"===b||"on"===b;var w=n.object.currentMaterial();w&&(w.smooth=n.object.smooth)}n.finalize();var x=new t.Group;x.materialLibraries=[].concat(n.materialLibraries);for(var c=0,h=n.objects.length;c<h;c++){var A=n.objects[c],M=A.geometry,L=A.materials,C="Line"===M.type;if(0!==M.vertices.length){var k=new t.BufferGeometry;k.addAttribute("position",new t.BufferAttribute(new Float32Array(M.vertices),3)),M.normals.length>0?k.addAttribute("normal",new t.BufferAttribute(new Float32Array(M.normals),3)):k.computeVertexNormals(),M.uvs.length>0&&k.addAttribute("uv",new t.BufferAttribute(new Float32Array(M.uvs),2));for(var O=[],I=0,_=L.length;I<_;I++){var j=L[I],w=void 0;if(null!==this.materials&&(w=this.materials.create(j.name),C&&w&&!(w instanceof t.LineBasicMaterial))){var B=new t.LineBasicMaterial;B.copy(w),w=B}w||(w=C?new t.LineBasicMaterial:new t.MeshPhongMaterial,w.name=j.name),w.shading=j.smooth?t.SmoothShading:t.FlatShading,O.push(w)}var D;if(O.length>1){for(var I=0,_=L.length;I<_;I++){var j=L[I];k.addGroup(j.groupStart,j.groupCount,I)}var E=new t.MultiMaterial(O);D=C?new t.LineSegments(k,E):new t.Mesh(k,E)}else D=C?new t.LineSegments(k,O[0]):new t.Mesh(k,O[0]);D.name=A.name,x.add(D)}}return console.timeEnd("OBJLoader"),x}}}).call(e,n(45))},322:function(t,e,n){t.exports=n.p+"d2258f8915435dc461cab78efb10fbe6.mtl"},323:function(t,e,n){t.exports=n.p+"e0a62b5153bfe26332cb1568584086ef.obj"},324:function(t,e,n){t.exports=n.p+"85f02261ff6efd802e7348db41842fe2.jpg"}});