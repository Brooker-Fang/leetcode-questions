/*
 * @lc app=leetcode.cn id=1695 lang=javascript
 *
 * [1695] 删除子数组的最大得分
 *
 * https://leetcode.cn/problems/maximum-erasure-value/description/
 *
 * algorithms
 * Medium (49.90%)
 * Likes:    53
 * Dislikes: 0
 * Total Accepted:    10.7K
 * Total Submissions: 21.1K
 * Testcase Example:  '[4,2,4,5,6]'
 *
 * 给你一个正整数数组 nums ，请你从中删除一个含有 若干不同元素 的子数组。删除子数组的 得分 就是子数组各元素之 和 。
 *
 * 返回 只删除一个 子数组可获得的 最大得分 。
 *
 * 如果数组 b 是数组 a 的一个连续子序列，即如果它等于 a[l],a[l+1],...,a[r] ，那么它就是 a 的一个子数组。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [4,2,4,5,6]
 * 输出：17
 * 解释：最优子数组是 [2,4,5,6]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,2,1,2,5,2,1,2,5]
 * 输出：8
 * 解释：最优子数组是 [5,2,1] 或 [1,2,5]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * [4,2,4,5,6]
 * [5,2,1,2,5,2,1,2,5]
 * 思路：
 *  滑动窗口 + 前缀和
 *  记录窗口的值的索引，当遇到相同的值时，左窗口直接跳转到 索引之后的位置，并且将窗口的累加和 - （跳转后索引的累加和 - 之前索引的累加和）
 */
var maximumUniqueSubarray = function (nums) {
  let left = 0,
    right = 0,
    window = new Map(),
    max = Number.MIN_VALUE,
    sum = 0,
    len = nums.length;
  const preSum = [0];
  for (let i = 0; i < len; i++) {
    preSum[i + 1] = preSum[i] + nums[i];
  }
  while (right < nums.length) {
    let val = nums[right];
    sum += val;
    while (window.has(val)) {
      let preLeft = left;
      left = Math.max(left, window.get(val) + 1);
      if (left > len) {
        return max;
      }
      sum -= preSum[left] - preSum[preLeft];
      window.delete(val);
    }
    window.set(val, right);
    max = Math.max(max, sum);
    right++;
  }
  console.info(max);
  return max;
};
// maximumUniqueSubarray([4,2,4,5,6])
// maximumUniqueSubarray([5,2,1,2,5,2,1,2,5])
maximumUniqueSubarray([
  187, 470, 25, 436, 538, 809, 441, 167, 477, 110, 275, 133, 666, 345, 411, 459, 490, 266, 987, 965, 429, 166, 809, 340, 467, 318, 125, 165, 809, 610, 31, 585,
  970, 306, 42, 189, 169, 743, 78, 810, 70, 382, 367, 490, 787, 670, 476, 278, 775, 673, 299, 19, 893, 817, 971, 458, 409, 886, 434,
]);
// 16911
// @lc code=end
