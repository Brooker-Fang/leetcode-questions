/*
 * @lc app=leetcode.cn id=643 lang=javascript
 *
 * [643] 子数组最大平均数 I
 *
 * https://leetcode.cn/problems/maximum-average-subarray-i/description/
 *
 * algorithms
 * Easy (44.31%)
 * Likes:    250
 * Dislikes: 0
 * Total Accepted:    82K
 * Total Submissions: 185.5K
 * Testcase Example:  '[1,12,-5,-6,50,3]\n4'
 *
 * 给你一个由 n 个元素组成的整数数组 nums 和一个整数 k 。
 *
 * 请你找出平均数最大且 长度为 k 的连续子数组，并输出该最大平均数。
 *
 * 任何误差小于 10^-5 的答案都将被视为正确答案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,12,-5,-6,50,3], k = 4
 * 输出：12.75
 * 解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5], k = 1
 * 输出：5.00000
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == nums.length
 * 1 <= k <= n <= 10^5
 * -10^4 <= nums[i] <= 10^4
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  let sum = 0,
    right = 0,
    left = 0;
  let average = -Number.MAX_VALUE;
  while (right < nums.length) {
    sum += nums[right];
    while (right - left + 1 > k) {
      sum -= nums[left];
      left++;
    }
    if (right - left + 1 === k) {
      average = Math.max(average, sum / k);
    }
    right++;
  }
  console.info(average);
  return average;
};
findMaxAverage([-1], 1);
// findMaxAverage([1,12,-5,-6,50,3], 4)
// findMaxAverage([5], 1)
// @lc code=end
