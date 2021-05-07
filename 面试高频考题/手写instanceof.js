function _instanceof(left,right){
    if(typeof left!=="object"||left===null) return false;
    let pro=Object.getPrototypeOf(left);
    while(true){
        if(pro===null) return false;
        if(pro===right.prototype) return true;
        pro=Object.getPrototypeOf(pro);
    }
}