function threeSum(nums) {
    // 先排序
    // sort JS 内置的排序 冒泡的思想理解
    // a - b < 0  不交换位置 保持升序
    // a - b > 0  交换位置 转换降序
    nums.sort((a, b) => a - b);
    const res = [];

    // 固定一个数
    // 双指针 i+1, nums.length-1
    for(let i = 0; i < nums.length - 2; i++) {
        // 跳过重复的起点
        // i == 0 时，是第一个数，不会重复
        // i j k 三数不能重复
        if(i > 0 && nums[i] === nums[i-1]) continue;
        // 双指针
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if(sum == 0) {
                res.push([nums[i], nums[left], nums[right]]);
                // 继续找
                left++;
                right--;
                // 重复的数字，跳过 
                while(left < right && nums[left] === nums[left - 1]) left++;
                while(left < right && nums[right] === nums[right + 1]) right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return res;
}