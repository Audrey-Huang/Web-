class Promise1{
    constructor(executor){
        this.status="pending";
        this.value="";
        this.error="";
        this.fulfilled=[];
        this.rejected=[];
        let resolve=(value)=>{
            if(this.status==="pending"){
                this.status="fulfilled";
                this.value=value;
                this.fulfilled.forEach(fn=>fn(this.value));
            }
        }
        let reject=(error)=>{
            if(this.status==="pending"){
                this.status="rejected";
                this.error=error;
                this.rejected.forEach(fn=>fn(this.error));
            }
        }
        try{
            executor(resolve,reject);
        }catch(e){
            reject(e);
        }
    }
    then(fulfilled,rejected){
        if(this.status==="fulfilled"){
            fulfilled(value);
        }
        if(this.status==="rejected"){
            rejected(error);
        }
        if(this.status==="pending"){
            this.fulfilled.push(fulfilled);
            this.rejected.push(rejected);
        }
    }
}

//实现promise.all
function _all(promiseArrs){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promiseArrs)){
            return reject("error");
        }
        let count=0;
        let arr=new Array(promiseArrs.length);
        for(let i=0;i<promiseArrs.length;i++){
            Promise.resolve(promiseArrs[i]).then(value=>{
                arr[i]=value;
                count++;
                if(count===promiseArrs.length){
                    return resolve(arr);
                }
            },error=>{
                return reject(error);
            })
        }
    })
}
function _race(promiseArrs){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promiseArrs)){
            return reject("error");
        }
        for(let i=0;i<promiseArrs.length;i++){
            Promise.resolve(promiseArrs[i]).then(value=>{
                resolve(value);
            },error=>{
                reject(error);
            })
        }
    })
}
let promiseArrs=[Promise.resolve(1),Promise.resolve(2),Promise.resolve(3)];
let p1=_all(promiseArrs);
let p2=_race(promiseArrs);
p1.then(resolve=>{
    console.log(resolve);
},error=>{
    console.log(error);
})
p2.then(resolve=>{
    console.log(resolve);
},error=>{
    console.log(error);
})