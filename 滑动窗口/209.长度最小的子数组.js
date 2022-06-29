/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 *
 * https://leetcode.cn/problems/minimum-size-subarray-sum/description/
 *
 * algorithms
 * Medium (48.80%)
 * Likes:    1226
 * Dislikes: 0
 * Total Accepted:    358.3K
 * Total Submissions: 734.7K
 * Testcase Example:  '7\n[2,3,1,2,4,3]'
 *
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 *
 * 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr]
 * ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 *
 * 示例 1：
 * 输入：target = 7, nums = [2,3,1,2,4,3]
 * 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 * 示例 2：
 *
 * 输入：target = 4, nums = [1,4,4]
 * 输出：1
 * 示例 3：
 * 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
 * 输出：0
 * 提示：
 *
 * 进阶：
 *
 *
 * 如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。
 *
 *
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 * [2,3,1,2,4,3] 7
 * 思路：
 *  滑动窗口
 * 时间复杂度：O(n)
 */
var minSubArrayLen = function (target, nums) {
  let len = 0,
    left = 0,
    right = 0,
    sum = 0;
  while (right < nums.length) {
    sum += nums[right];
    while (sum >= target) {
      len = len === 0 ? right - left + 1 : Math.min(len, right - left + 1);
      sum -= nums[left];
      left++;
    }
    right++;
  }
  console.info(len);
  return len;
};
minSubArrayLen(7, [2, 3, 1, 2, 4, 3]);
minSubArrayLen(4, [1, 4, 4]);
minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]);

/* 
  TODO:
  O(n log(n)) 时间复杂度的解法： 前缀和 + 二分查找 
*/
var minSubArrayLen = function (target, nums) {
  const n = nums.length;

  let ans = Infinity;

  const sums = [0]; // 前缀和

  for (let i = 1; i <= n; i++) {
    sums[i] = sums[i - 1] + nums[i - 1];
  }

  console.log(sums);

  for (let i = 1; i <= n; i++) {
    let endValue = sums[i - 1] + target;

    let bound = binarySearch(sums, i, n, endValue);
    if (bound !== -1) {
      ans = Math.min(ans, bound - (i - 1));
    }
  }

  return ans === Infinity ? 0 : ans;
};
function binarySearch(a, l, r, target) {
  while (l < r) {
    let mid = (l + r) >> 1;
    if (a[mid] < target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return a[l] >= target ? l : -1;
}
// @lc code=end
