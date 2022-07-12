/*
 * @lc app=leetcode.cn id=1052 lang=javascript
 *
 * [1052] 爱生气的书店老板
 *
 * https://leetcode.cn/problems/grumpy-bookstore-owner/description/
 *
 * algorithms
 * Medium (58.13%)
 * Likes:    227
 * Dislikes: 0
 * Total Accepted:    56.3K
 * Total Submissions: 97K
 * Testcase Example:  '[1,0,1,2,1,1,7,5]\n[0,1,0,1,0,1,0,1]\n3'
 *
 * 有一个书店老板，他的书店开了 n 分钟。每分钟都有一些顾客进入这家商店。给定一个长度为 n 的整数数组 customers ，其中
 * customers[i] 是在第 i 分钟开始时进入商店的顾客数量，所有这些顾客在第 i 分钟结束后离开。
 *
 * 在某些时候，书店老板会生气。 如果书店老板在第 i 分钟生气，那么 grumpy[i] = 1，否则 grumpy[i] = 0。
 *
 * 当书店老板生气时，那一分钟的顾客就会不满意，若老板不生气则顾客是满意的。
 *
 * 书店老板知道一个秘密技巧，能抑制自己的情绪，可以让自己连续 minutes 分钟不生气，但却只能使用一次。
 *
 * 请你返回 这一天营业下来，最多有多少客户能够感到满意 。
 *
 *
 * 示例 1：
 *
 *
 * 输入：customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3
 * 输出：16          [0,1,0,1,0,1,0,1]
 * 解释：书店老板在最后 3 分钟保持冷静。
 * 感到满意的最大客户数量 = 1 + 1 + 1 + 1 + 7 + 5 = 16.
 *
 *
 * 示例 2：
 *
 *
 * 输入：customers = [1], grumpy = [0], minutes = 1
 * 输出：1
 *
 *
 *
 * 提示：
 *
 *
 * n == customers.length == grumpy.length
 * 1 <= minutes <= n <= 2 * 10^4
 * 0 <= customers[i] <= 1000
 * grumpy[i] == 0 or 1
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} minutes
 * @return {number}
 * 思路：
 *  先求前缀和
 *  将minutes作为窗口大小滑动，最大值 = 窗口最大值 + 窗口左侧的值和(即左侧的前缀和) + 窗口右侧的值的和（总的前缀和 - 窗口右侧的前缀和(需要取右窗口的位置+1 即 right+1)）
 */
var maxSatisfied = function (customers, grumpy, minutes) {
  let sum = 0,
    right = 0,
    left = 0,
    max = 0,
    maxLeft = 0,
    maxRight = 0;
  let preSum = [0];
  const len = customers.length;
  for (let i = 0; i < len; i++) {
    preSum[i + 1] = preSum[i] + (grumpy[i] === 0 ? customers[i] : 0);
  }
  console.info(preSum);
  while (right < len) {
    let val = customers[right];
    sum += val;
    while (right - left > minutes) {
      let val = customers[left];
      sum -= val;
      left++;
    }
    // 窗口的值 + 窗口左侧的值 + 窗口右侧的值
    max = Math.max(max, sum + preSum[left] + preSum[len] - preSum[right + 1]);
    right++;
  }
  console.info(max);
  return max;
};
maxSatisfied([1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3);
maxSatisfied([1], [0], 1);
// @lc code=end
