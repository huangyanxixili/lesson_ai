function merge(nums1, m, nums2, n) {
    // 数组是连续的储存空间，可以从后往前合并
    let p1 = m - 1;
    let p2 = n - 1;
    let p = m + n - 1;
    // 数组是有序的
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }
    while (p2 >= 0) {
        nums1[p] = nums2[p2]; // 剩余的 nums2 元素直接放到 nums1 中
        p2--;
        p--;
    }
}