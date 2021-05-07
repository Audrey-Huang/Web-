### Proxy和Reflect

给目标对象定义一个关联的代理对象，代理对象可以作为抽象的目标对象来使用。在对目标对象的各种操作影响目标对象之前，可以在代理对象中对这些操作加以控制。

- `target` —— 是要包装的对象，可以是任何东西，包括函数。
- `handler` —— 代理配置：带有“钩子”（“traps”，即拦截操作的方法）的对象。比如 `get` 钩子用于读取 `target` 属性，`set` 钩子写入 `target` 属性等等。

代理可撤销：

```js
const {proxy，revoke}=Proxy.revocable(target,handler);
revoke();//撤销代理
```

#### 带 “get” 钩子的默认值

##### `get(target, property, receiver)`

target--目标对象，即下段代码中的dictionary

property--目标属性名，即hello或者foo

receiver--本次读取属性所在的this对象

```js
let dictionary={
    "hello":"world",
    "foo":"fuck"
}
dictionary=new Proxy(dictionary,{
    get(target,phrase){
        if(phrase in target){
            return target[phrase];
        }
        else{
            return phrase;
        }
    }
});
console.log(dictionary["hello"]);//world
console.log(dicitonary["hahaha"]);//找不到hahahha，所以直接输出"hahaha"
```

#### 使用 “set” 钩子进行验证

##### `set(target, property, value, receiver)`

target--目标对象

property--目标属性名

value--目标属性要设置的值

receiver--仅与setter访问器相关

```js
let number=[];
numbers =new Proxy(number,{
    set(target,prop,val){
        if(typeof val=="number"){
            target[prop]=val;
            return true;
        }else{
            return false;
        }
    }
});
numbers.push(1);//添加成功
numbers.push(2);//添加成功
alert("Length is:"+number.length);
numbers.push("test");//TypeError(proxy的‘set’操作返回false);
```

##### 使用 “ownKeys” 和 “getOwnPropertyDescriptor” 进行迭代

Object.keys返回带有枚举类型的非Symbol键值对

```js
let user = {
  name: "John",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "ownKeys" 过滤掉 _password
for(let key in user) alert(key); // name，然后是 age

// 对这些方法同样有效：
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // John,30
```

##### 具有 “deleteProperty” 和其他钩子的受保护属性

几种钩子实现排除以_开头的属性

```js
let user = {
  name: "John",
  _password: "***"
};

user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    }
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value; // (*)
  },
  set(target, prop, val) { // 拦截写入操作
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) { // 拦截属性删除
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) { // 拦截读取属性列表
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// “get” 不允许读取 _password
try {
  alert(user._password); // Error: Access denied
} catch(e) { alert(e.message); }

//  “set” 不允许写入 _password
try {
  user._password = "test"; // Error: Access denied
} catch(e) { alert(e.message); }

// “deleteProperty” 不允许删除 _password 属性
try {
  delete user._password; // Error: Access denied
} catch(e) { alert(e.message); }

// “ownKeys” 过滤排除 _password
for(let key in user) alert(key); // name
```

##### “In range” 及 “has” 钩子

has钩子可以拦截 in 调用

```js
let range={
    start:0,
    end:10
}
range=new Proxy(range,{
    has(target,prop){
        return prop>=target.start&&prop<=target.end;
    }
})
console.log(5 in range);//true;
console.log(10 in range);//true
```

##### 包装函数："apply"

`apply(target, thisArg, args)` 钩子能使代理以函数的方式被调用：

- `target` 是目标对象（函数是 JavaScript 中的对象）
- `thisArg` 是 `this` 的值
- `args` 是参数列表

```js
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);
alert(sayHi.length); // 1 (*) proxy 转发“获取 length” 操作到目标对象
sayHi("John"); // Hello, John! （3秒后）
```



### Reflect

`Reflect` 是一个内置对象，可简化的创建 `Proxy`。

**对于每个可被 `Proxy` 捕获的内部方法，`Reflect` 都有一个对应的方法 Reflect，其名称和参数与 `Proxy` 钩子相同。**

因此，我们可以用 `Reflect` 来将操作转发到原始对象。