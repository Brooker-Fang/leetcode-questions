/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为 K 的子数组
 *
 * https://leetcode-cn.com/problems/subarray-sum-equals-k/description/
 *
 * algorithms
 * Medium (44.60%)
 * Likes:    1216
 * Dislikes: 0
 * Total Accepted:    167.3K
 * Total Submissions: 375.2K
 * Testcase Example:  '[1,1,1]\n2'
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回该数组中和为 k 的连续子数组的个数。
 * 示例 1：
 * 输入：nums = [1,1,1], k = 2
 * 输出：2
 * 示例 2：
 * 输入：nums = [1,2,3], k = 3
 * 输出：2
 * 提示：
 * 1 <= nums.length <= 2 * 10^4
 * -1000 <= nums[i] <= 1000
 * -10^7 <= k <= 10^7
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// var subarraySum = function (nums, k) {
//   const preSum = [0];
//   for (let i = 0; i < nums.length; i++) {
//     preSum[i + 1] = preSum[i] + nums[i];
//   }
//   let res = 0;
//   for (let left = 0; left < preSum.length - 1; left++) {
//     for (let right = left + 1; right < preSum.length; right++) {
//       const val = preSum[right] - preSum[left];
//       if (val === k) {
//         res++;
//       }
//     }
//   }
//   return res;
// };
var subarraySum = function (nums, k) {
  const map = new Map();
  map.set(0, 1);
  let sum = 0;
  let count = 0;

  for (const num of nums) {
    sum += num;
    if (map.has(sum - k)) {
      count += map.get(sum - k);
    }

    if (map.has(sum)) {
      map.set(sum, map.get(sum) + 1);
    } else {
      map.set(sum, 1);
    }
  }

  return count;
};
// @lc code=end
/* 
  思路: 
    子数组和为 k, 则 preSum[right+1] - preSum[left] = k, 所以 preSum[left] = preSum[right+] - k
    所以最终是要获取 前面的某前缀和 = 当前前缀和 - k 的个数
    所以在遍历时，将每次的前缀和存入map, 前缀和作为key, value为 当前前缀和出现的次数 
      每次计算 当前前缀和 - k = 目标前缀和target, 如果 map[target] 存在，则累计次数。
*/
