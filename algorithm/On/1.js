function traverse(arr) {
    var len = arr.length; // T(1)
    for(var i = 0; i < len; i++) { // T(1) + T(n+1) + T(n)
        console.log(arr[i]); // T(n)
    }
}
// T(n) =  3n + 3 --> O(n)

// 外部传输的 arr[]，所以并没有开辟新的内存空间，所以空间复杂度只有 O(1)