/*
 * @lc app=leetcode.cn id=1094 lang=javascript
 *
 * [1094] 拼车
 *
 * https://leetcode.cn/problems/car-pooling/description/
 *
 * algorithms
 * Medium (54.69%)
 * Likes:    187
 * Dislikes: 0
 * Total Accepted:    49.2K
 * Total Submissions: 90.4K
 * Testcase Example:  '[[2,1,5],[3,3,7]]\n4'
 *
 * 车上最初有 capacity 个空座位。车 只能 向一个方向行驶（也就是说，不允许掉头或改变方向）
 *
 * 给定整数 capacity 和一个数组 trips ,  trip[i] = [numPassengersi, fromi, toi] 表示第 i
 * 次旅行有 numPassengersi 乘客，接他们和放他们的位置分别是 fromi 和 toi 。这些位置是从汽车的初始位置向东的公里数。
 *
 * 当且仅当你可以在所有给定的行程中接送所有乘客时，返回 true，否则请返回 false。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：trips = [[2,1,5],[3,3,7]], capacity = 4
 * 输出：false
 *
 *
 * 示例 2：
 *
 *
 * 输入：trips = [[2,1,5],[3,3,7]], capacity = 5
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= trips.length <= 1000
 * trips[i].length == 3
 * 1 <= numPassengersi <= 100
 * 0 <= fromi < toi <= 1000
 * 1 <= capacity <= 10^5
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
class DiffArray {
  constructor(origin) {
    this.diff = [];
    this.diff[0] = origin[0];
    for (let i = 1; i < origin.length; i++) {
      this.diff[i] = origin[i] - origin[i - 1];
    }
  }
  increment(i, j, val) {
    this.diff[i] += val;
    if (j + 1 < this.diff.length) {
      this.diff[j + 1] -= val;
    }
  }
  getResult() {
    const origin = [];
    origin[0] = this.diff[0];
    for (let i = 1; i < this.diff.length; i++) {
      origin[i] = origin[i - 1] + this.diff[i];
    }
    return origin;
  }
}
var carPooling = function (trips, capacity) {
  const origin = new Array(1001).fill(0);
  const diff = new DiffArray(origin);
  trips.forEach((trip) => {
    const val = trip[0];
    const i = trip[1];
    // trip[2] 是下站 站点，所以应该取前面一站，即 trip[1] ~ trip[2] 区间上站多少人
    const j = trip[2] - 1;
    diff.increment(i, j, val);
  });
  const result = diff.getResult();
  // 不超载 说明原数组每个值 都不大于 capacity
  return result.every((num) => num <= capacity);
};
// @lc code=end
