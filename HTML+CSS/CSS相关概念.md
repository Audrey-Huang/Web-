#### CSS流概念

“流”是css的一种基本定位和布局机制，是一种自上而下，自左而右排列的布局方式



#### 盒模型

元素按照盒模型的规则在页面中进行布局，分为两种IE盒模型，W3C盒模型

W3C盒模型：box-sizing：content-box

width=content

一个块的宽度=width+padding+border+margin

IE盒模型：box-sizing：border-box

width=padding+content+border

一个块的宽度=margin+width



#### CSS选择器优先级

* *通配符
* #header id选择器
* .nav 类选择器
* :: after 伪类选择器
* [type="input"] 属性选择器
* (+)兄弟选择器
* (>)后代选择器

| 选择器类型     | 权重       |
| -------------- | ---------- |
| 行内样式       | 1 0 0 0    |
| id选择器       | 0 1 0 0    |
| 类和伪类选择器 | 0 0 1 0    |
| 元素选择器     | 0 0 0 1    |
| 统配选择器     | 0 0 0 0    |
| 继承的元素     | 没有优先级 |



#### css样式继承

| 可以继承的样式   | font，color，ul，li，dl，dt，dd；      |
| ---------------- | -------------------------------------- |
| 不可以继承的样式 | border，padding，margin，width，height |



#### css3伪类与伪元素

伪元素由`::`表示，而伪类由`:`表示

伪类可以拼接，伪元素不可以和伪元素进行拼接

伪类选择元素是基于元素处于的状态，而不是静态的标签，状态是动态的，元素达到某种动态才会得到伪类的样式；当状态改变时，则失去该样式

伪类，种类多，使用场景多

* 状态类： hover/active/focus
* 结构类：first-child/last-child
* 表单类：checked/valid
* 语言类： lang/dir



伪元素是对元素中的特定内容进行操作，它所操作的层级比伪类要更深一点，本身是基于元素的抽象，并不存在文档中，所以叫做伪元素。

伪元素，种类较少，但可以不添加新元素，减少代码量（浮动塌陷

* ::placeholder
* ::selection
* ::before
* ::after
* ::first-letter



#### CSS3的新增特性

各种`css`选择器、伪类等

圆角`border-radius`

多列布局

文本效果

线性渐变

2D转换

过渡`transition`

动画`animation`

flex布局

旋转`transform`

媒体查询



#### 相对定位和绝对定位

* relative：相对于原来位置移动，元素设置此属性之后仍然处于文档流中，不影响其他元素的布局
* absolute：元素会脱离文档流，如果设置偏移，会影响其他元素的位置定位。（在父元素没有设置相对定位或绝对定位的情况下，元素相对于根元素定位。如果父元素设置了相对定位或绝对定位，元素会相对于自己最近的设置了相对或绝对定位的父元素进行定位。



#### 如何在页面上隐藏元素

- display:none  不渲染元素
- visibility: hidden 页面会渲染 但是不显示
- opcaity: 0 设置透明度0，不显示但会占据空间
- margin-left: -100% 向左移动页面100%的宽度
- left/right/top/bottom： 9999px 元素在视区外
- z-index：-9999 放到最底层，同一位置的元素可以遮盖



#### CSS长度单位

绝对长度：固定值，反映真实的物理尺寸

cm,mm,in,px,pt,pc

相对长度：一个长度相对于另一个长度的属性

em：相对于应用在当前元素的字体尺寸，一般浏览器字体大小默认16px，则2em=32px

rem：作用于非根元素时，则为相对于根元素的字体大小；用于根元素时则为初始长度

vw：viewpoint width，视窗宽度，1vw=视窗宽度的1%

vh：viewpoint height，视窗高度，1vh=视窗高度的1%

vmin，vmax值vh和vw中较小的这个



#### CSS样式引入

引入方式有四种：内联，内嵌，外链，导入

1.  从属关系： link是html标签，而@import是css提供的语法规则。
2.  加载顺序：link是跟随页面一起加载的，@import引用的css在页面加载完之后才会加载
3.  兼容性：link是html标签，没有兼容问题；@import在CSS2.1之后才被引入，低版本的浏览器不能被识别
4.  DOM可控性：link可以通过JS操作DOM来改变样式，而@import不可以。