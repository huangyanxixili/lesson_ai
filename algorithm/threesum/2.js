const nums = [2, 1, 6, 3, 4, 5];
// b 在前， a 在后
nums.sort((a, b) => {
    console.log(a, b);
    return a - b;
});
console.log(nums);