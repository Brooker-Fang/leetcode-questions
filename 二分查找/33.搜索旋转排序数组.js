/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 *
 * https://leetcode.cn/problems/search-in-rotated-sorted-array/description/
 *
 * algorithms
 * Medium (43.65%)
 * Likes:    2223
 * Dislikes: 0
 * Total Accepted:    586.2K
 * Total Submissions: 1.3M
 * Testcase Example:  '[4,5,6,7,0,1,2]\n0'
 *
 * 整数数组 nums 按升序排列，数组中的值 互不相同 。
 *
 * 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k],
 * nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始
 * 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。
 *
 * 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
 *
 * 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [4,5,6,7,0,1,2], target = 0
 * 输出：4
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [4,5,6,7,0,1,2], target = 3
 * 输出：-1
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1], target = 0
 * 输出：-1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 5000
 * -10^4 <= nums[i] <= 10^4
 * nums 中的每个值都 独一无二
 * 题目数据保证 nums 在预先未知的某个下标上进行了旋转
 * -10^4 <= target <= 10^4
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 思路：
 *   肯定有一部分是有序的，先找出有序的部分，根据中间值和 左右窗口的对比找出有序的部分。
 *   1、如果中间值 >= 左窗口的值，说明前半部分有序，反之说明后半部分有序
 *   2、判断target目标值是否在有序的部分，
 *        如果是前半部分有序，判断target是否>左窗口 && target < 中间值，
 *        如果满足条件说明target在有序的前半部分，则收缩右窗口right到mid-1
 *        否则在另一部分，即收缩左窗口left到mid+1。
 *        如果是后半部分有序，一样的判断target是否>中间值 && target < 右窗口的值。。。
 *
 */
var search = function (nums, target) {
  if (!nums || !nums.length) return -1;
  let left = 0,
    right = nums.length - 1,
    mid;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    let val = nums[mid];
    if (val === target) {
      return mid;
    }
    // 说明前半部分有序
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (target <= nums[right] && target > nums[mid]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};
//  4,5,6,0,1,2,3
// [0,1,2,4,5,6,7]

console.info(search([4, 5, 6, 7, 0, 1, 2], 0));
// @lc code=end
