/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0;
    let right = height.length - 1;
    let max = 0;

    while (left < right) {
        // 计算当前面积
        // 宽度 = 右指针 - 左指针
        const width = right - left;
        // 高度 = 两边较短的那根（短板效应）
        const h = Math.min(height[left], height[right]);
        
        // 更新最大面积
        max = Math.max(max, width * h);

        // 移动指针策略：移动较短的那根
        // 原因：宽度肯定会减小，如果移动长板，高度受限于短板不可能变大，面积只会变小。
        // 只有移动短板，才有可能遇到更长的板子，从而提升高度，获得更大面积。
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return max;
};

// --- 测试用例 ---
const height1 = [1,8,6,2,5,4,8,3,7];
console.log(`测试 1: [${height1}] => ${maxArea(height1)} (预期: 49)`);

const height2 = [1,1];
console.log(`测试 2: [${height2}] => ${maxArea(height2)} (预期: 1)`);