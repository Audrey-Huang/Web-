let obj=[1,2,3,[4,5,[6,7]]];
// function flat(obj){
//     if(typeof obj!=="object"||obj===null){
//         return obj;
//     }
//     let arr=[];
//     for(var i=0;i<obj.length;i++){
//         if(obj[i] instanceof Array){
//             arr=arr.concat(flat(obj[i]));
//         }else{
//             arr.push(obj[i]);
//         }
//     }
//     return arr;
// }
// let newOne=flat(obj);
// console.log(newOne);

var ansArr=obj.flat(Infinity);
console.log(ansArr);