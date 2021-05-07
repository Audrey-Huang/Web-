let obj=[1,2,3,4,2,3,4,7,8];
//1.使用instanOf 去重
function fn1(obj){
    let arr=[];
    for(var i=0;i<obj.length;i++){
        if(arr.indexOf(obj[i])==-1){
            arr.push(obj[i]);
        }
    }
    return arr;
}
let b=fn1(obj);
console.log(b);

//2.使用hash去重,但是可能会把字符和数字判断成为相等的，从而去掉了
function fn2(obj){
    let arr=[];
    let flag={};
    for(var i=0;i<obj.length;i++){
        if(!flag[obj[i]]){
            flag[obj[i]]=true;
            arr.push(obj[i]);
        }
    }
    return arr;
}
let c=fn2(obj);
console.log(c);

//3.使用filter去重
function fn3(obj){
    let flag={};
    let arr=[];
    arr=obj.filter(item=>{
        if(!flag[item]){
            flag[item]=true;
            return true;
        }
        else return false;
    })
    return arr;
}
let d=fn3(obj);
console.log(d);

//4.reduce去重,注意reduce需要有返回值
function fn4(obj){
    let flag={};
    let arr=[];
    arr=obj.reduce((pre,item)=>{
        if(!flag[item]){
            flag[item]=true;
            pre.push(item);
        }
        return pre;
    },[])
    return arr;
}
let e=fn4(obj);
console.log(e);

//5.set实现
let f=Array.from(new Set(obj));
console.log(f);
