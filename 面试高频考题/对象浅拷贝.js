let obj={
    name:"Audrey",
    age:23,
    message:{
        a:123,
        b:456,
    }
}

//1.使用assign对对象进行浅拷贝
let b=Object.assign({},obj);
b.name="hahaha";//简单变量不会受影响
b.message.a=1;//复杂变量会相互影响
console.log(obj);
console.log(b);

//2.使用解构函数进行浅拷贝
let c={...obj};
c.name="lalalala";
c.message.b=4;
console.log(c);
console.log(obj);