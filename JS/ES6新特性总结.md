### ES6新特性总结

##### 1.let，const块级作用域和var的区别

##### 2.解构—快速提取数组/对象中的元素：数组解构，对象解构

```js
const arr=[1,2,3];
const [a,b,c]=arr;
console.log(a,b,c);
```

##### 3.模板字符串：``

用来换行和插值

```js
const str = `fdsjak
fdsa`
console.log(str)

// 插值
const strs = `random: ${Math.random()}`;
console.log(strs)
```

字符串处理以及返回值为标签函数的返回值

```js
const [str1, str2, str3] = strs;
const genderParsed = gender == "1" ? "男" : "女";
// 可以在此做过滤，字符串处理，多语言等操作
return str1 + name + str2 + str3 + genderParsed;
// 返回值为标签函数的返回值
const result = tagFunc`my name is ${person.name}.gender is ${person.gender}`;
```

##### 4.字符串的扩展

```js
 const str = 'abcd';

 console.log(str.includes('e'));//false
 console.log(str.startsWith('a'));//true
 console.log(str.endsWith('a'))//false
```

##### 5.箭头函数

##### 6.Proxy和Reflect

代理一个对象的所有，包括读写操作和各种操作的监听

##### 7.Promise

解决异步编程中回调嵌套过深问题

##### 8.class定义类

##### 9.Set，Map，Symbol

##### 10.for...of

##### 11.生成器和迭代器