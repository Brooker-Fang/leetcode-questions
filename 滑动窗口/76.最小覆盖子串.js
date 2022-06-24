/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 *
 * https://leetcode.cn/problems/minimum-window-substring/description/
 *
 * algorithms
 * Hard (44.24%)
 * Likes:    1953
 * Dislikes: 0
 * Total Accepted:    302.3K
 * Total Submissions: 682K
 * Testcase Example:  '"ADOBECODEBANC"\n"ABC"'
 *
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 ""
 * 。
 *
 *
 *
 * 注意：
 *
 *
 * 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
 * 如果 s 中存在这样的子串，我们保证它是唯一的答案。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "ADOBECODEBANC", t = "ABC"
 * 输出："BANC"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "a", t = "a"
 * 输出："a"
 *
 *
 * 示例 3:
 *
 *
 * 输入: s = "a", t = "aa"
 * 输出: ""
 * 解释: t 中两个字符 'a' 均应包含在 s 的子串中，
 * 因此没有符合条件的子字符串，返回空字符串。
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 和 t 由英文字母组成
 *
 *
 *
 * 进阶：你能设计一个在 o(n) 时间内解决此问题的算法吗？
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const need = {},
    window = {};
  for (let str of t) {
    need[str] ? need[str]++ : (need[str] = 1);
  }
  const needLen = Object.keys(need).length;
  let left = 0,
    right = 0;
  let valid = 0;
  let start = 0,
    len = Number.MAX_VALUE;
  while (right < s.length) {
    let c = s[right];
    right++;
    if (need[c]) {
      window[c] ? window[c]++ : (window[c] = 1);
      if (window[c] === need[c]) {
        valid++;
      }
    }
    // valid === needLen 说明 T 中所有字符已经被覆盖，已经得到⼀个可⾏的覆盖⼦串
    // 窗口左移，获取最小子串
    while (valid === needLen) {
      // 更新最小覆盖子串
      if (right - left < len) {
        start = left;
        len = right - left;
      }

      // d 是将移除窗口的字符
      const d = s[left];
      left++;
      if (need[d]) {
        if (window[d] === need[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }
  return len === Number.MAX_VALUE ? '' : s.substr(start, len);
};
// @lc code=end
