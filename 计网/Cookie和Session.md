### Cookie和Session

**为什么要有这两个？**

因为HTTP是一种无状态的协议，即每次服务端接收到客户端的请求时，都是一个全新的请求，服务器并不知道客户端的历史请求记录；Session和Cookie的主要目的是为了弥补HTTP的无状态特性。

#### Cookie

HTTP 协议中的 Cookie 包括 `Web Cookie` 和`浏览器 Cookie`，它是服务器发送到 Web 浏览器的一小块数据。服务器发送到浏览器的 Cookie，浏览器会进行存储，并与下一个请求一起发送到服务器。通常，它用于判断两个请求是否来自于同一个浏览器，例如用户保持登录状态。

#### Session

服务器第一次接收到请求时，开辟了一块Session空间，同时生成一个sessionID，并通过响应头发送给客户端，客户端收到后再本机客户端设置了一个cookie信息。

接下来客户端每次向同一个网站发送请求时，请求头中的Cookie信息（sessionId)



#### 两者区别

- 作用范围不同，Cookie 保存在客户端（浏览器），Session 保存在服务器端。
- 存取方式的不同，Cookie 只能保存 ASCII，Session 可以存任意数据类型，一般情况下我们可以在 Session 中保持一些常用变量信息，比如说 UserId 等。
- 有效期不同，Cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，Session 一般失效时间较短，客户端关闭或者 Session 超时都会失效。
- 隐私策略不同，Cookie 存储在客户端，比较容易遭到不法获取，早期有人将用户的登录名和密码存储在 Cookie 中导致信息被窃取；Session 存储在服务端，安全性相对 Cookie 要好一些。
- 存储大小不同， 单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie。



#### 当浏览器禁用cookie时怎么办？

通过URL地址重写，将sessionId重写到URL地址中，服务器能解析重写后的URL获取sessionId。



#### 自动登录时记住密码的方式

1.基于session自动登录

当用户登录时，在服务器中创建一条session记录，seesionId返回给cookie，客户端拿到cookie后所有符合该服务器的域名和IP携带着cookie，实现自动认证。

2.基于token自动登录

token包含三个部分：header+payload+signature

服务端使用秘钥生成JWT，用户端JS拿到JWT后，将JWT存放在local storage中。

后面发生请求，将JWT放到请求头中，然后如果合法，则实现验证。