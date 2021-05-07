function bubbleSort(arr){
    var m=arr.length;
    for(var i=0;i<m-1;i++){
        for(var j=0;j<m-1-i;j++){
            if(arr[j]>arr[j+1]){
                var temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }
    return arr;
}
arr=[1,2,3,4,1,2,7,3];
console.log(bubbleSort(arr));

function partition(arr,low,high){
    var temp=arr[low];
    while(low<high){
        while(low<high&&arr[high]>=temp){
            --high;
        }
        arr[low]=arr[high];
        while(low<high&&arr[low]<=temp){
            ++low;
        }
        arr[high]=arr[low];
    }
    arr[low]=temp;
    return low;
}
function quicksort(arr,low,high){
    if(low<high){
        var index=partition(arr,low,high);
        quicksort(arr,low,index-1);
        quicksort(arr,index+1,high);
    }
    return arr;
}
console.log(quicksort(arr,0,arr.length-1));