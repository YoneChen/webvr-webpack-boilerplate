/*global WebVR:true*/
// create routers map 
WebVR.init([
    {
        route: '', // e.g http://127.0.1:9000/
        path: 'index.js'
    },
    {
        route: '1', // e.g http://127.0.1:9000/1
        path: 'page1.js'
    },
    {
        route: '2', // e.g http://127.0.1:9000/2
        path: 'page2.js'
    }
],document.querySelector('.webvr-container')
);