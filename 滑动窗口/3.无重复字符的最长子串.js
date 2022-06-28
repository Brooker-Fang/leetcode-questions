/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 *
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (38.81%)
 * Likes:    7738
 * Dislikes: 0
 * Total Accepted:    1.8M
 * Total Submissions: 4.7M
 * Testcase Example:  '"abcabcbb"'
 *
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 *
 *
 * 示例 2:
 *
 *
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 *
 *
 * 示例 3:
 *
 *
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= s.length <= 5 * 10^4
 * s 由英文字母、数字、符号和空格组成
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 * 滑动窗口思路：
 *    右窗口边滑动边保存窗口里的字符 和 出现的次数，每次滑动保存 左窗口到右窗口的长度
 *    当遇到window里有相同字符时，左窗口开始滑动
 *    左窗口每次滑动则减少字符的次数，直到相同字符出现的次数 <= 1
 */
var lengthOfLongestSubstring = function (s) {
  let right = 0,
    left = 0;
  let child = {};
  let len = 0;
  while (right < s.length) {
    let c = s[right];

    child[c] ? child[c]++ : (child[c] = 1);
    while (child[c] > 1) {
      let d = s[left];
      left++;
      child[d]--;
    }
    len = Math.max(len, right - left + 1);

    right++;
  }
  return len;
};
/* 
  优化思路：
    用map保存窗口内的字符和字符索引
    当遇到相同字符时，将左窗口跳转到 之前保存字符的后面一个位置
    注：要取左窗口索引 与 要跳转到的索引的 最大值, 因为左窗口跳转时，并没有清除跳转位置之前的字符与其索引，如
*/
var lengthOfLongestSubstring = function (s) {
  const n = s.length;
  if (n <= 1) return n;

  let left = 0,
    right = 0;
  const window = new Map();
  let maxLen = 0;
  while (right < n) {
    let c = s[right];
    if (window.has(c)) {
      left = Math.max(left, window.get(c) + 1);
    }
    maxLen = Math.max(maxLen, right - left + 1);
    window.set(s[right], right);
    right++;
  }
  console.info(maxLen);
  return maxLen;
};
lengthOfLongestSubstring('abba');
// lengthOfLongestSubstring("abcabcbb")
// lengthOfLongestSubstring("bbbbb")
// lengthOfLongestSubstring("pwwkew")
// lengthOfLongestSubstring("dvdf")
// @lc code=end
