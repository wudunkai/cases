
https://zhuanlan.zhihu.com/p/96934736


pwa 包括:
1. service worker      负责离线缓存
2. web app mainfest    桌面安装，以json的形式保存安装的信息然后可以安装到桌面
3. push notification   消息推送

service worker
1. 它是一种 JavaScript Worker，无法直接访问 DOM。 Service Worker 通过响应 postMessage 接口发送的消息来与其控制的页面通信，页面可在必要时对 DOM 执行操作。
2. 它是一种可编程网络代理，让您能够控制页面所发送网络请求的处理方式。
3. 它在不用时会被中止，并在下次有需要时重启，因此不能依赖 Service Worker onfetch 和 onmessage 处理程序中的全局状态。如果存在您需要持续保存并在重启后加以重用的信息，Service Worker 可以访问 IndexedDB API。
4. Service Worker 广泛地利用了 promise

整体流程

注：Service Worker 的生命周期完全独立于网页。
当我们要为网站安装Service Worker时，需要先在页面的 JavaScript 中注册，注册成功后会进入安装过程中，通常这一过程需要缓存某些静态资源。如果所有文件均已成功缓存，那么 Service Worker 就安装完毕。如果任何文件下载失败或缓存失败，那么安装步骤将会失败，Service Worker 就无法激活（也就是不会安装）。如果发生这种情况，不必担心，它下次会再试一次。安装之后，接下来就是激活步骤，这是管理旧缓存的时机，激活之后，Service Worker 将会对其作用域内的所有页面实施控制，不过首次注册该 Service Worker 的页面需要再次加载才会受其控制。Service Worker开始控制后，就可以开始执行我们缓存策略了。