/*
 * @lc app=leetcode.cn id=632 lang=javascript
 *
 * [632] 最小区间
 *
 * https://leetcode.cn/problems/smallest-range-covering-elements-from-k-lists/description/
 *
 * algorithms
 * Hard (60.24%)
 * Likes:    363
 * Dislikes: 0
 * Total Accepted:    21.9K
 * Total Submissions: 36.3K
 * Testcase Example:  '[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]'
 *
 * 你有 k 个 非递减排列 的整数列表。找到一个 最小 区间，使得 k 个列表中的每个列表至少有一个数包含在其中。
 *
 * 我们定义如果 b-a < d-c 或者在 b-a == d-c 时 a < c，则区间 [a,b] 比 [c,d] 小。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]
 * 输出：[20,24]
 * 解释：
 * 列表 1：[4, 10, 15, 24, 26]，24 在区间 [20,24] 中。4 - 26
 * 列表 2：[0, 9, 12, 20]，20 在区间 [20,24] 中。0 - 20
 * 列表 3：[5, 18, 22, 30]，22 在区间 [20,24] 中。5 - 30
 *  [0, 4, 5, 9, 10, 12, 15, 18, 20, 22, 24, 26, 30]
 *
 * 示例 2：
 *
 *
 * 输入：nums = [[1,2,3],[1,2,3],[1,2,3]]
 * 输出：[1,1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * nums.length == k
 * 1 <= k <= 3500
 * 1 <= nums[i].length <= 50
 * -10^5 <= nums[i][j] <= 10^5
 * nums[i] 按非递减顺序排列
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} nums
 * @return {number[]}
 * 思路：
 *  对数组做合并，保存值和值所属的组，对合并后的数字做升序排序
 *  右窗口滑动，当窗口满足 存有所有组的至少一个值时，开始左滑窗口，并对比区间，保存最小值
 */
var smallestRange = function (nums) {
  const arr = [];
  const need = {};
  let range = [Number.MIN_VALUE, Number.MAX_VALUE];
  const needLen = nums.length;
  for (let i = 0; i < nums.length; i++) {
    nums[i].forEach((val) => {
      arr.push({ val, group: i });
      need[i] = 1;
    });
  }
  arr.sort((a, b) => a.val - b.val);
  let left = 0,
    right = 0,
    valid = 0;
  let window = {};
  while (right < arr.length) {
    let g = arr[right].group;
    window[g] ? window[g]++ : (window[g] = 1);
    if (window[g] === need[g]) {
      valid++;
    }
    while (valid === needLen) {
      if (range[1] - range[0] > arr[right].val - arr[left].val) {
        range = [arr[left].val, arr[right].val];
      }
      let g = arr[left].group;
      if (window[g] === need[g]) {
        valid--;
      }
      window[g]--;
      left++;
    }
    right++;
  }
  console.info(range);
  return range[0] === Number.MIN_VALUE ? [] : range;
};
smallestRange([
  [4, 10, 15, 24, 26],
  [0, 9, 12, 20],
  [5, 18, 22, 30],
]);
smallestRange([
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
]);
// @lc code=end
