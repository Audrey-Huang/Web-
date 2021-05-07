function partition(A,low,high){
    var temp=A[low];
    while(low<high){
        while(low<high&&A[high]>=temp){
            --high;
        }
        A[low]=A[high];
        while(low<high&&A[low]<=temp){
            ++low;
        }
        A[high]=A[low];
    }
    A[low]=temp;
    return low;
}
function quicksort(A,low,high){
    if(low<high){
        var temp=partition(A,low,high);
        quicksort(A,low,temp-1);
        quicksort(A,temp+1,high);
    }
}

var A=[1,2,2,45,12,7,8,19];
quicksort(A,0,A.length-1);
console.log(A);