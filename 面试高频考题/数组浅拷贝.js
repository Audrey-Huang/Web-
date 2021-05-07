let arr=[1,2,3,4,5,{name:"Audrey"}];

//1.concat实现数组浅拷贝
let b=[].concat(arr);
b[0]=0;//简单变量不会相互影响
b[5].name="lalala";//复杂变量会相互影响
console.log(b);
console.log(arr);

//2.slice实现数组浅拷贝
let c=arr.slice();
c[1]=0;
c[5].name="are you sure";
console.log(c);
console.log(arr);

//3.使用Array.from进行浅拷贝
let d=Array.from(arr);
d[2]=0;
d[5].name="yes i am sure";
console.log(d);
console.log(arr);

//4.使用解构函数进行浅拷贝
let e=[...arr];
e[3]=0;
e[5].name="i am tired";
console.log(e);
console.log(arr);