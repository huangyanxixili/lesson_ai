function traverse(arr) {
    var outlen = arr.length; // T(1)
    for (var i = 0; i < outlen; i++) { // T(1) + T(n+1) + T(n)
        var inlen = arr[i].length; // T(n)
        for (var j = 0; j < inlen; j++) { // T(n) + T(n^2+n) + T(n^2)
            console.log(arr[i][j]); // T(n^2)
        }
    }
}
// T(n) = 3n^2 + 5n + 1 --> O(n^2)