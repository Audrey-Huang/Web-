let obj={
    name:"Audrey",
    age:23,
    main:{
        a:1,
        b:2
    },
    fn:function(){       
    },
    friends:[1,2,3,[22,33]]
}
function deepcopy(obj,map=new Map()){
    if(typeof obj!=="object"||obj===null){
        return obj;
    }
    if(map.get(obj)){
        return map.get(obj);
    }
    let newOne=obj instanceof Array?[]:{};
    map.set(obj,newOne);
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            newOne[key]=deepcopy(obj[key],map);
        }
    }
    return newOne;
}

let temp=deepcopy(obj);
temp.name="hahaha";
temp.main.b=9;
console.log(temp);
console.log(obj);