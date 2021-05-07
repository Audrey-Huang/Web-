### VUE与React异同点

#### 相同点

- 使用虚拟DOM
- 提供响应式和组件化的视图组件
- 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库



#### 不同点

- ##### 运行时性能

在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。如要避免不必要的子组件的重渲染，你需要在所有可能的地方使用 `PureComponent`，或是手动实现 `shouldComponentUpdate` 方法。

在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。

- ##### JSX与Templates

在 React 中，所有的组件的渲染功能都依靠 JSX。JSX 是使用 XML 语法编写 JavaScript 的一种语法糖。

 Vue 也提供了渲染函数，甚至支持JSX。然而，我们默认推荐的还是模板。任何合乎规范的 HTML 都是合法的 Vue 模板，这也带来了一些特有的优势：对于很多习惯了 HTML 的开发者来说，模板比起 JSX 读写起来更自然。基于HTML的模板使得将已有的应用逐步迁移到Vue中更为容易。

更抽象一点来看，我们可以把组件区分为两类：一类**(Vue)**是偏视图表现的 (presentational)，一类则**(React)**是偏逻辑的 (logical)。

- **组件作用域内的CSS**

 React 和 Vue 主要的区别是，Vue 设置样式的默认方法是单文件组件里类似 `style` 的标签。

CSS 作用域在 React 中是通过 CSS-in-JS 的方案实现的 (比如 [styled-components](https://github.com/styled-components/styled-components) 和 [emotion](https://github.com/emotion-js/emotion))。这引入了一个新的面向组件的样式范例，它和普通的 CSS 撰写过程是有区别的。

- **向上扩展**

Vue 的路由库和状态管理库都是由官方维护支持且与核心库同步更新的。

React 则是选择把这些问题交给社区维护，因此创建了一个更分散的生态系统。但相对的，React 的生态系统相比 Vue 更加繁荣。