function copy(obj){
    if(typeof obj!=="object"||obj===null) return obj;
    let ans=obj instanceof Array?[]:{};
    for(let pro in obj){
        if(obj.hasOwnProperty(pro)){
            ans[pro]=obj[pro];
        }
    }
    return ans;
}
// let obj=[1,2,3,4,5,{name:"Audrey"}];
let obj={
    name:"Audrey",
    age:23,
    message:{
        a:123,
        b:456,
    }
}
let ans=copy(obj);
ans.name="hahahahaha";
ans.message.a=1;
console.log(ans);
console.log(obj);