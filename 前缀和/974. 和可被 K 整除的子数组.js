/*
 * @lc app=leetcode.cn id=974 lang=javascript
 *
 * [974] 和可被 K 整除的子数组
 *
 * https://leetcode.cn/problems/subarray-sums-divisible-by-k/description/
 *
 * algorithms
 * Medium (47.28%)
 * Likes:    365
 * Dislikes: 0
 * Total Accepted:    47.2K
 * Total Submissions: 99.9K
 * Testcase Example:  '[4,5,0,-2,-3,1]\n5'
 *
 * 给定一个整数数组 nums 和一个整数 k ，返回其中元素之和可被 k 整除的（连续、非空） 子数组 的数目。
 *
 * 子数组 是数组的 连续 部分。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [4,5,0,-2,-3,1], k = 5
 * 输出：7
 * 解释：
 * 有 7 个子数组满足其元素之和可被 k = 5 整除：
 * [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2,
 * -3]
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [5], k = 9
 * 输出: 0
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= nums.length <= 3 * 10^4
 * -10^4 <= nums[i] <= 10^4
 * 2 <= k <= 10^4
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 *  子数组之和为k
 *    preNum[right+1] - preNum[left] = k
 *    preNum[right+1] - k = preNum[left]
 *  子数组之和能被k整除 === (preNum[right+1] - preNum[left]) % k = 0 === preNum[right+1] % k = preNum[left] % k
 *
 *  所以如果 两个数 相对于 K的余数相同，则他们相减 能被K整除
 *  如果前缀和 % k 的值余数是负数，则需要加k。如下例：
 *  k为2，当 前缀和 % 2 有可能为-1
 *  而-1 和 1 其实是等价的，
 *  因为1-(-1) 等于 2，2 % K = 0，即所形成的子数组满足元素和被 2 整除。
 *  所以前缀和 -1 和 1 其实是等价的。
 *  [-1,2,9] 2
 *[0,-1,1,10]
 */
var subarraysDivByK = function (nums, k) {
  const map = { 0: 1 };
  let count = 0;
  let preNum = 0;
  for (let i = 0; i < nums.length; i++) {
    preNum += nums[i];
    let preNumModK = preNum % k;
    if (preNumModK < 0) {
      preNumModK += k;
    }
    if (map[preNumModK]) {
      count += map[preNumModK];
      map[preNumModK]++;
    } else {
      map[preNumModK] = 1;
    }
  }
  return count;
};
// @lc code=end
