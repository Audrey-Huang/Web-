#### cookie，localstorage和sessionstorage区别

1. cookie由服务端生成，用于标识用户身份；而两个storage用于浏览器端缓存数据

2. 三者都是键值对的集合
3. 一般情况下浏览器端不会修改cookie，但会频繁操作两个storage

4. 如果保存了cookie的话，http请求中一定会带上；而两个storage可以由脚本选择性的提交

5. 会话的storage会在会话结束后销毁；而local的那个会永久保存直到覆盖。cookie会在过期时间之后销毁。

6. 安全性方面，cookie中最好不要放置任何明文的东西。两个storage的数据提交后在服务端一定要校验（其实任何payload和qs里的参数都要校验）。