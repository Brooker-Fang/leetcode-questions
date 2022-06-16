/*
 * @lc app=leetcode.cn id=303 lang=javascript
 *
 * [303] 区域和检索 - 数组不可变
 *
 * https://leetcode-cn.com/problems/range-sum-query-immutable/description/
 *
 * algorithms
 * Easy (73.06%)
 * Likes:    397
 * Dislikes: 0
 * Total Accepted:    137.9K
 * Total Submissions: 188.5K
 * Testcase Example:  '["NumArray","sumRange","sumRange","sumRange"]\n' +
  '[[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]'
 *
 * 给定一个整数数组  nums，求出数组从索引 i 到 j（i ≤ j）范围内元素的总和，包含 i、j 两点。
 * 
 * 
 * 
 * 实现 NumArray 类：
 * 
 * 
 * NumArray(int[] nums) 使用数组 nums 初始化对象
 * int sumRange(int i, int j) 返回数组 nums 从索引 i 到 j（i ≤ j）范围内元素的总和，包含 i、j 两点（也就是
 * sum(nums[i], nums[i + 1], ... , nums[j])）
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 输入：
 * ["NumArray", "sumRange", "sumRange", "sumRange"]
 * [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
 * 输出：
 * [null, 1, -1, -3]
 * 
 * 解释：
 * NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
 * numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
 * numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1)) 
 * numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
 * 
 * 
 * 
 * 提示：
 * 
 * 0 
 * -10^5 
 * 0 
 * 最多调用 10^4 次 sumRange 方法
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 */
 let preSum = [0]
 var NumArray = function(nums) {
   for(let i = 0; i < nums.length ; i++) {
     preSum[i+1] = preSum[i] + nums[i]
   }
 };
 
 /** 
  * @param {number} left 
  * @param {number} right
  * @return {number}
  */
 NumArray.prototype.sumRange = function(left, right) {
   return preSum[right+1] - preSum[left]
 };
 
 /**
  * 思路：
  *   是用一个新的数组 preSum 记录 nums[0..i-1] 的累加和，
  *   preSum除了第一项为0，其他项 preNum[i] = nums[0..i-1] 累加，即preSum[i+1] = preSum[i] + nums[i]
  * 
  *   如果想获取num[left, right]之间的元素和，可以通过 preSum[right+1] - preSum[left]
  */
 // @lc code=end