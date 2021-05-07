function add(x,y,z){
    return x+y+z;
}
function curry(fn,...args1){
    if(args1.length>=fn.length){
        return fn(...args1);
    }
    return function(...args2){
        return curry(fn,...args1,...args2);
    }
}
var a=curry(add,1);
console.log(a(3)(4));