### VUE-router路由模式

vue-router 有 3 种路由模式：hash、history、abstract

#### hash 模式

早 Hash 模式主要依赖 Location 对象的 hash 属性（`location.hash`）和`hashchange`事件。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：

```js
https://www.word.com#search
```

当一个窗口的 hash 改变时就会触发`hashchange`事件。`hashchange`事件对象有两个属性，`newURL`为当前页面新的 URL，`oldURL`为当前页面旧的 URL。

Hash 模式通过`window.onhashchange`监听基于 hash 的路由变化，来进行页面更新处理的。部分浏览器不支持`onhashchange`事件，我们可以自行使用定时器检测和触发的方式来进行兼容。

#### history 模式

History路由模式依赖于window.history()，History 对象提供了操作浏览器会话历史的接口。

**（1）在history中跳转**

使用`window.history.back()`、`window.history.forward()`和`window.history.go()`方法来完成在用户历史记录中向后和向前的跳转。

**（2）添加和修改历史记录中的条目**

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

```js
window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);
```

此时pushState和replaceState不会引起页面的加载，因此我们需要配合监听事件popState。

如果当前处于激活状态的历史记录条目是由`history.pushState()`方法创建，或者由`history.replaceState()`方法修改过的, 则`popstate`事件对象的`state`属性包含了这个历史记录条目的`state`对象的一个拷贝。



#### 给Vue项目配置路由

我们经常会使用的配置主要包括`path`、`component`、`name`、`redirect`、`children`等

`<router-view>`其实可以理解为占位符，而占位的内容是匹配到的路由信息对应的组件，这个组件会替代`<router-view>`进行渲染。一个被渲染组件同样可以包含自己的嵌套`<router-view>`，我们只需要保证在`routes`中的路由配置信息和我们的嵌套关系保持一致就可以。

这里还出现了`<router-link>`元素，它是 Vue Router 中的一种导航方式，可以理解为加了路由能力的`<a>`标签。

1.分析页面；

2.配置路由信息;

```js
// 配置路由信息
const routes = [
  // 以 / 开头的嵌套路径会被当作根路径
  {
    path: "/home",
    component: Home,
    name: "Home",
    children: [
      { path: "page1", component: Page1, name: "Page1" },
      { path: "page2", component: Page2, name: "Page2" }
    ]
  },
  // 通配符 * 会匹配所有路径
  // 路由 { path: '*' } 通常用于客户端 404 错误
  // 含有通配符的路由应该放在最后
  { path: "*", redirect: { name: "Home" } }
];

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

// 启动一个 Vue 应用
new Vue({
  el: "#app",
  router, // 传入路由能力
  render: h => h(App)js
```

3.在app组件，使用`<router-view>`添加最顶层的出口，渲染最高级路由匹配到的组件;

```js
<!-- App.vue -->
<template>
  <!-- 使用 <router-view></router-view> 来渲染最高级路由匹配到的组件 -->
  <router-view></router-view>
</template>
```

4.同时，我们需要在 Home 页面中使用`<router-view>`来展示子路由界面.

```js
<!-- Home.vue -->
<template>
  <div>
    <div>Home</div>
    <div>
      <router-link :to="{ name: 'Page1'}" tag="button">goto Page1</router-link>
      <router-link :to="{ name: 'Page2'}" tag="button">goto Page2</router-link>
    </div>
    <!-- 子路由界面 -->
    <!-- 如果路由为 /home/page1，此处是 Page1 组件 -->
    <!-- 如果路由为 /home/page2，此处是 Page2 组件 -->
    <router-view></router-view>
  </div>
</template>
```



#### Vue-导航方式

1.**编程式导航**

Vue Router 提供了`router`的实例方法，通过编写代码来实现导航功能。在 Vue 实例内部，你可以通过`$router`访问路由实例。

```js
// 字符串
router.push("/home");
// 对象
router.push({ path: "/home" });
// 命名的路由
router.push({ name: "Home" });
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1);
// 后退一步记录，等同于 history.back()
router.go(-1);
```

2.**声明式导航**

`<router-link>`组件支持用户在具有路由功能的应用中 (点击) 导航。通过`to`属性指定目标地址，默认渲染成带有正确链接的`<a>`标签，可以通过配置`tag`属性生成别的标签。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。

```js
<!-- 字符串 -->
<router-link to="/home">Home</router-link>
<!-- 使用 v-bind 的 JS 表达式 -->
<router-link v-bind:to="'/home'">Home</router-link>
<!-- 不写 v-bind 也可以，就像绑定别的属性一样 -->
<router-link :to="'/home'">Home</router-link>
<!-- 可使用 router.push() 的参数 -->
<router-link :to="{ name: 'Home' }">Home</router-link>

<!-- router-link 替换元素为 button -->
<router-link :to="{ name: 'Home' }" tag="button">Home</router-link>
<!-- 渲染结果 -->
<!-- 不会有 herf 内容，但会监听点击，触发导航 -->
<button>Home</button>

<router-link :to="{ name: 'Page1' }">Page1</router-link>
<!-- 当当前的路由命中时，router-link-exact-active 为精确匹配时的样式 -->
<a href="#/home/page1" class="router-link-exact-active router-link-active"
  >Page1</a
>
```



#### 通过路由传参

有些时候，我们需要在 URL 上带一些参数来标识当前内容。因为页面逻辑是通用的，只有内容不一样，这些内容的数据常常是根据某个 ID 来从后台获取，例如根据 ID 从后台获取某本书的详细信息。如果我们希望刷新页面的时候该 ID 不会丢失，则需要把这个标识带到我们的 URL 里。通常我们有两种方式来携带：
(1) `/page/detail?id=123`，在 Vue Router 中用`query`表示。
(2) `/page/detail/123`，在 Vue Router 中用`params`表示。

#### params 传参

params 的传参模式，我们需要首先在路由配置中进行特殊的配置（冒号":"标记）：

#### query 传参

params 传参有一个不方便的地方，即我们必须要传入一个动态路径参数才能匹配到对应的页面。但是有些时候，我们的页面也允许某些可选参数的缺失，例如我们想要`/edit`表示新建，`/edit/123`表示修改`id=123`的内容，但是当我们输入`/edit`的时候却匹配不到相同的页面。这种时候我们可以使用 query 传参，`/edit`表示新建、`/edit?id=123`表示修改。

query 的传参模式，我们不需要像 params 传参一样使用`/xxxx/:xxx`这样更改路由配置，只需要在导航的时候传参：