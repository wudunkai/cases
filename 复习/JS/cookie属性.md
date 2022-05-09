cookie 的几个重要的属性

name value size 


cookie 是服务器端保存在浏览器的一小段文本信息，浏览器每次向服务器端发出请求，都会附带上这段信息（不是所有都带上，具体的下文会介绍）
httpxmlrequest whithCridentials = ture

expiress：到期时间
 max-age：从现在开始计算多久后过期

 如果 没有设置expiress、max-age 则cookie 的有效期为会话期内有效
 
 如果两者都不设置的，那么这个 cookie 就是Session Cookie，也一旦关闭浏览器，浏览器就不会保留这个这个 
 

 Domain 和 path

这两个属性决定了，HTTP 请求的时候，哪些请求会带上哪些 Cookie，具体下面会做讲解。


Secure 属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。另一方面，如果当前协议是 HTTP，浏览器会自动忽略服务器发来的 Secure 属性。该属性只是一个开关，不需要指定值。如果通信是 HTTPS 协议，该开关自动打开。
设置了 Secure 这个属性，那么就会在 Secure 这一栏打钩

HttpOnly 属性指定该 Cookie 无法通过 JavaScript 脚本拿到，主要是Document.cookie 属性、XMLHttpRequest 对象和Request API都拿不到该属性。这样就防止了该 Cookie 被脚本读到，只有浏览器发出 HTTP 请求时，才会带上该 Cookie。

https://juejin.cn/post/6844903841909964813