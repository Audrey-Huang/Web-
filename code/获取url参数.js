function getUrlParam(sUrl, sKey) {
    var temp1=sUrl.split('?')[1];
    var temp2=temp1.split('#')[0];
    if(sKey){
        var temp3=temp2.split('&');
        var arrs=new Array();
        for(var i=0;i<temp3.length;i++){
            var temp4=temp3[i].split('=');
            if(temp4[0]===sKey){
                arrs.push(temp4[1]);
            }
        }
        if(arrs.length===1){
            return arrs[0];
        }else if(arrs.length===0){
            return "";
        }else{
            return arrs;
        }
    }else{
        if(temp2===""||temp2===undefined){
            return {};
        }else{
            var temp3=temp2.split('&');
            var arrObj=new Object();
            for(var i=0;i<temp3.length;i++){
                var temp4=temp3[i].split('=');
                console.log(temp4);
                if(!(temp4[0] in arrObj)){
                    arrObj[temp4[0]]=[];
                }
                arrObj[temp4[0]].push(temp4[1]);
            }
            return arrObj;
        }
    }
}
var sUrl="http://www.nowcoder.com?key=1&key=2&key=3&key=4&test1=4#hehe";
console.log(getUrlParam(sUrl));