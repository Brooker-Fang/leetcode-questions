/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 *
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 *
 * algorithms
 * Medium (42.26%)
 * Likes:    1798
 * Dislikes: 0
 * Total Accepted:    586.1K
 * Total Submissions: 1.4M
 * Testcase Example:  '[5,7,7,8,8,10]\n8'
 *
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
 *
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 *
 * 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 6
 * 输出：[-1,-1]
 *
 * 示例 3：
 *
 *
 * 输入：nums = [], target = 0
 * 输出：[-1,-1]
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 * nums 是一个非递减数组
 * -10^9 <= target <= 10^9
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * [5,7,7,8,8,10], target = 8
 * [5,7,7,8,8,10], target = 6
 * 思路：
 *  寻找 leftIdx 即为在数组中寻找第一个大于等于 target 的下标，
 *  寻找 rightIdx 即为在数组中寻找第一个大于 target 的下标，然后将下标减一
 */

/* 
  解法一：
   先二分查找其中一个目标值索引mid，若不存在直接返回[-1, -1]
   然后再[0, mid] 之间用二分往前查找第一个元素位置
     每次取中间值（向上取整），并且只需要考虑 < 或 = 两种情况
     如果中间值 = target，
   最后在[mid, nums.length - 1] 之间查找最后一个元素位置
*/
var searchRange1 = function (nums, target) {
  if (!nums.length) {
    return [-1, -1];
  }
  let left = 0,
    right = nums.length - 1,
    leftBoard,
    rightBoard;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let val = nums[mid];
    if (val === target) {
      leftBoard = rightBoard = mid;
      break;
    } else if (val < target) {
      left = mid + 1;
    } else if (val > target) {
      right = mid - 1;
    }
  }
  if (typeof leftBoard === 'undefined') {
    return [-1, -1];
  }
  let leftIdx = 0;
  while (leftIdx < leftBoard) {
    let mid = Math.floor((leftIdx + leftBoard) / 2);
    let val = nums[mid];
    if (val === target) {
      leftBoard = mid;
    } else {
      leftIdx = mid + 1;
    }
  }
  let rightIdx = nums.length - 1;
  while (rightBoard < rightIdx) {
    let mid = Math.ceil((rightBoard + rightIdx) / 2);
    let val = nums[mid];
    if (val === target) {
      rightBoard = mid;
    } else {
      rightIdx = mid - 1;
    }
  }
  return [leftBoard, rightBoard];
};
console.info(searchRange1([5, 7, 7, 8, 8, 10], 8));
console.info(searchRange1([5, 7, 7, 8, 8, 10], 6));

/* 
  解法二：
   分为两次二分查找，分别查找左边界和右边界
    查找左边界：
      如果中间值 < 目标值，收缩左边界到 中间索引值+1
      如果中间值 = 目标值，收缩右边界到 中间索引值-1
      如果中间值 > 目标值，收缩右边界到 中间索引值-1
      当左边界>右边界时结束循环
      最后检查下左边界是否超过了数组长度，或者左边界的值不等于目标值，是则返回-1，否则返回左边界
    查找右边界：
      如果中间值 < 目标值，收缩左边界到 中间索引值+1
      如果中间值 = 目标值，收缩左边界到 中间索引值+1
      如果中间值 > 目标值，收缩右边界到 中间索引值-1
      当左边界 > 右边界时结束循环
      最后检查下右边界是否<0，或者右边界的值不等于目标值，是则返回-1，否则返回右边界

*/
var searchRange = function (nums, target) {
  if (!nums.length) {
    return [-1, -1];
  }
  let left = searchLeftIndex(nums, target);
  let right = searchRightIndex(nums, target);
  if (left === -1 || right === -1) {
    return [-1, -1];
  }
  return [left, right];
};
// [1,2,3,3,3,3,3,4,4,5,5] ,3
// [1,2,3,3,3] 3
var searchLeftIndex = function (nums, target) {
  let mid = 0;
  let right = nums.length - 1;
  let left = 0;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    let val = nums[mid];
    if (val === target) {
      // 搜索区间变为[left, mid -1]
      right = mid - 1;
    } else if (val < target) {
      // 搜索区间变为 [mid + 1, right]
      left = mid + 1;
    } else if (val > target) {
      // 搜索区间变为 [left, mid - 1]
      right = mid - 1;
    }
  }
  // 检查边界
  if (left >= nums.length || nums[left] !== target) {
    return -1;
  }
  return left;
};
// [1,2,3,3,3,3,3,4,4,5,5]
// [3,4,4,5,5]
var searchRightIndex = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let val = nums[mid];
    if (val < target) {
      left = mid + 1;
    } else if (val > target) {
      right = mid - 1;
    } else if (val === target) {
      left = mid + 1;
    }
  }
  // 检查边界
  if (right < 0 || nums[right] !== target) {
    return -1;
  }
  return right;
};
// console.info(searchRange([1,2,3,3,3,3,3,4,4,5,5] , 3))
console.info(searchRange([5, 7, 7, 8, 8, 10], 8));
// console.info(searchRange([5,7,7,8,8,10], 6))
// @lc code=end
