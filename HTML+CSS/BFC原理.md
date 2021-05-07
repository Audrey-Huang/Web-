### BFC

块级格式化上下文，可以看做隔离了的容器，容器里面的元素不会再布局上影响到外面的元素，并且BFC具有普通容器所没有的一些特性。

#### 触发条件

1. float：left/right
2. position：absolute/fixed
3. overflow：auto/scroll/hidden
4. <html>根元素
5. display： inline-block/table-cell



#### BFC特性及应用

1.外边距合并

在同一BFC下外边距会发生折叠，要想外边距不重叠，可以将元素放在两个不同的BFC中。

2.BFC可以包含浮动元素

浮动元素会脱离文档流，如果触发外容器的BFC，那么容器就会包裹着浮动元素。

3.BFC可以组织元素被浮动元素覆盖

例如文字环绕，可以给文字容器也开启BFC，即能够保证互相不覆盖。