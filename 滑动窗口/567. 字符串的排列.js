/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 *
 * https://leetcode.cn/problems/permutation-in-string/description/
 *
 * algorithms
 * Medium (43.94%)
 * Likes:    706
 * Dislikes: 0
 * Total Accepted:    199.4K
 * Total Submissions: 453.3K
 * Testcase Example:  '"ab"\n"eidbaooo"'
 *
 * 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。
 *
 * 换句话说，s1 的排列之一是 s2 的 子串 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s1 = "ab" s2 = "eidbaooo"
 * 输出：true
 * 解释：s2 包含 s1 的排列之一 ("ba").
 *
 *
 * 示例 2：
 *
 *
 * 输入：s1= "ab" s2 = "eidboaoo"
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s1.length, s2.length <= 10^4
 * s1 和 s2 仅包含小写字母
 *
 *
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 * s2 = "eibbaooo"
 * s1= "ab"
 * 思路：
 *  因为s1 的排列之一是 s2 的 子串。所以子串的长度和 s2的长度一致，即窗口的大小 =  s2的长度。
 *  将子串需要的字符存到 map中，key为字符，value为字符的数量
 *  窗口子串的长度为单位右滑，
 *  右窗口每次右滑，如果当前字符是子串map的字符（即need中需要的字符），则向window添加新字符或者将原有字符数量+1，
 *  并且判断window中当前字符和 子串中当前字符的数量是否一致，一致则valid+1
 *  如果窗口大小大于子串的长度，左窗口开始左滑
 *  左窗口每次滑动之前都判断一下是否已经满足 valid === 子串map的长度，如果满足直接返回true
 *  左窗口左滑，如果当前字符是子串map中的字符，并且窗口中的当前字符数量 = 子串map的数量，valid-1
 *  将窗口中当前字符的数量-1
 */
var checkInclusion = function (s1, s2) {
  const need = {},
    window = {};
  for (let char of s1) {
    need[char] ? need[char]++ : (need[char] = 1);
  }
  let valid = 0,
    left = 0,
    right = 0;
  const needLen = Object.keys(need).length;
  while (right < s2.length) {
    let c = s2[right];
    right++;
    if (need[c]) {
      window[c] ? window[c]++ : (window[c] = 1);
      if (window[c] === need[c]) {
        valid++;
      }
    }
    if (right - left >= s1.length) {
      if (valid === needLen) {
        return true;
      }
      let d = s2[left];
      left++;
      if (need[d]) {
        if (window[d] === need[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }
  return false;
};
checkInclusion('ab', 'eibbaooo');
// @lc code=end
