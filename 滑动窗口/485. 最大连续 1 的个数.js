/*
 * @lc app=leetcode.cn id=485 lang=javascript
 *
 * [485] 最大连续 1 的个数
 *
 * https://leetcode.cn/problems/max-consecutive-ones/description/
 *
 * algorithms
 * Easy (61.14%)
 * Likes:    326
 * Dislikes: 0
 * Total Accepted:    159.1K
 * Total Submissions: 260K
 * Testcase Example:  '[1,1,0,1,1,1]'
 *
 * 给定一个二进制数组 nums ， 计算其中最大连续 1 的个数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,1,0,1,1,1]
 * 输出：3
 * 解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.
 *
 *
 * 示例 2:
 *
 *
 * 输入：nums = [1,0,1,1,0,1]
 * 输出：2
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * nums[i] 不是 0 就是 1.
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * [1,0,1,1,0,1]  2
 * [1,1,0,1,1,1]  3
 * [1,1,1,1,1,0]  5
 */
var findMaxConsecutiveOnes = function (nums) {
  let right = 0,
    left = 0,
    len = 0;
  while (right < nums.length) {
    let num = nums[right];
    if (num === 0) {
      len = Math.max(len, right - left);
      if (right === num.length - 1) {
        console.info(len);
        return len;
      } else {
        left = right + 1;
      }
    } else {
      len = Math.max(len, right - left + 1);
    }

    right++;
  }
  console.info(len);
  return len;
};
findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1]);
findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]);
findMaxConsecutiveOnes([1, 1, 1, 1, 1, 0]);
// @lc code=end
