/*
 * @lc app=leetcode.cn id=30 lang=javascript
 *
 * [30] 串联所有单词的子串
 *
 * https://leetcode.cn/problems/substring-with-concatenation-of-all-words/description/
 *
 * algorithms
 * Hard (37.18%)
 * Likes:    778
 * Dislikes: 0
 * Total Accepted:    129.2K
 * Total Submissions: 330K
 * Testcase Example:  '"barfoothefoobarman"\n["foo","bar"]'
 *
 * 给定一个字符串 s 和一些 长度相同 的单词 words 。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。
 *
 * 注意子串要与 words 中的单词完全匹配，中间不能有其他字符 ，但不需要考虑 words 中单词串联的顺序。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "barfoothefoobarman", words = ["foo","bar"]
 * 输出：[0,9]
 * 解释：
 * 从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
 * 输出的顺序不重要, [9,0] 也是有效答案。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
 * 输出：[6,9,12]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 由小写英文字母组成
 * 1
 * 1
 * words[i] 由小写英文字母组成
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 * s = "barfoofoobarthefoobarman"
 * words = ["bar","foo","the"]
 * 思路：
 *  从0-n（单词的长度）不同的起始位置做滑动窗口，即需要做 n（单词的长度） 次滑动窗口
 *   每次滑动窗口 都以n为单位滑动
 */
var findSubstring = function (s, words) {
  const index = [];
  const baseLen = words[0].length;
  const windowLen = baseLen * words.length;
  const need = {};
  words.forEach((item) => {
    need[item] ? need[item]++ : (need[item] = 1);
  });
  const needLen = Object.keys(need).length;
  for (let start = 0; start <= baseLen - 1; start++) {
    let valid = 0,
      right = start,
      left = start;
    let window = {};
    while (right < s.length) {
      let str = s.substr(right, baseLen);
      if (need[str]) {
        window[str] ? window[str]++ : (window[str] = 1);
        if (window[str] === need[str]) {
          valid++;
        }
      }
      if (right - left + baseLen > windowLen) {
        let left_str = s.substr(left, baseLen);
        if (need[left_str]) {
          if (window[left_str] === need[left_str]) {
            valid--;
          }
          window[left_str]--;
        }
        left += baseLen;
      }
      if (right - left + baseLen === windowLen && valid === needLen) {
        index.push(left);
      }
      right += baseLen;
    }
  }

  console.info(index);
  return index;
};

findSubstring('lingmindraboofooowingdingbarrwingmonkeypoundcake', ['fooo', 'barr', 'wing', 'ding', 'wing']);
findSubstring('barfoothefoobarman', ['foo', 'bar']);
// @lc code=end
