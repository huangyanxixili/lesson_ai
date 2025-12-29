// function add(nums) {
//     nums.push(3); // 副作用
//     return nums.reduce((pre, cur) => pre + cur, 0);
// }

const add = function(x, y) {
    return x + y
}

const nums = [1, 2];
console.log(add(nums)) 