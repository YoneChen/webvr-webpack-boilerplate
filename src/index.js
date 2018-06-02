import WebVRApp from '@/core'
// create routers map 
WebVRApp.create([
    {
        path: '/', // e.g http://127.0.1:9000/
        component: () => import('@/views/index.js')
    },
    {
        path: '/1', // e.g http://127.0.1:9000/1
        component: () => import('@/views/page1.js')
    },
    {
        path: '/2', // e.g http://127.0.1:9000/2
        component: () => import('@/views/page2.js')
    }
],document.querySelector('.webvr-container')
);