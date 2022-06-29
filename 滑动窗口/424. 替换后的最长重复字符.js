/*
 * @lc app=leetcode.cn id=424 lang=javascript
 *
 * [424] 替换后的最长重复字符
 *
 * https://leetcode.cn/problems/longest-repeating-character-replacement/description/
 *
 * algorithms
 * Medium (53.81%)
 * Likes:    632
 * Dislikes: 0
 * Total Accepted:    68.3K
 * Total Submissions: 126.8K
 * Testcase Example:  '"ABAB"\n2'
 *
 * 给你一个字符串 s 和一个整数 k 。你可以选择字符串中的任一字符，并将其更改为任何其他大写英文字符。该操作最多可执行 k 次。
 *
 * 在执行上述操作后，返回包含相同字母的最长子字符串的长度。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "ABAB", k = 2
 * 输出：4
 * 解释：用两个'A'替换为两个'B',反之亦然。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "AABABBA", k = 1
 * 输出：4
 * 解释：
 * 将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
 * 子串 "BBBB" 有最长重复字母, 答案为 4。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s 仅由大写英文字母组成
 * 0 <= k <= s.length
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 *  AABABBA 1
 *  ABAC 2
 *  ABCDEEFG 2
 * 思路：滑动窗口
 *  max保存window中出现最多的次数
 *  窗口每次右滑更新最大值
 *  窗口大小为 max + k, 当窗口大于这个时开始左窗口开始滑动
 *  更新最长子串
 */
var characterReplacement = function (s, k) {
  let right = 0,
    left = 0,
    len = 0,
    max = 0;
  let window = {};
  while (right < s.length) {
    let c = s[right];
    window[c] ? window[c]++ : (window[c] = 1);
    max = Math.max(max, window[c]);

    while (max + k < right - left + 1) {
      let d = s[left];
      window[d]--;
      left++;
    }
    len = Math.max(len, right - left + 1);
    right++;
  }
  console.info(len);
  return len;
};
characterReplacement('AABABBA', 1);
characterReplacement('ABAC', 2);
characterReplacement('ABCDEEFG', 2);
// @lc code=end
