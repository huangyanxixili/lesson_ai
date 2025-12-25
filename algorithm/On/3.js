for (var i = 0; i < len; i *= 2) { // T(1) + T(logn+1) + T(logn)
    console.log(arr[i]); // T(logn)
}
// T(n) = 3logn + 2 --> O(logn)