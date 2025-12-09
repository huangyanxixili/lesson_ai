function add() {
    // let result = 0;
    // // 和数组一样有 .length 和 [i]下标访问 
    // for(let i = 0; i < arguments.length; i++) {
    //     result += arguments[i];
    // }
    // return result;
    // console.log(arguments.__proto__)
    // return arguments.reduce((prev, cur) => prev + cur, 0)

    
    // 字符串式的下标，是对象而非数组
    // console.log(JSON.stringify(arguments)); // {"0":1,"1":2,"2":3}
    // console.log(JSON.stringify([1, 2, 3])); // [1,2,3]

    // const args = [...arguments]
    // console.log(
    //     args, 
    //     Object.prototype.toString.call(args),
    //     args instanceof Array
    // )


}

console.log(add(1,2,3));

console.log([1, 2, 3, 4, 5, 6].reduce((prev, cur) => prev + cur, 0))
