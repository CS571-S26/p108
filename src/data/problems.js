export const problems = {
  easy: {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    testCases: [
      { input: [[2,7,11,15], 9], expected: "[0,1]" },
      { input: [[3,2,4], 6],     expected: "[1,2]" },
      { input: [[3,3], 6],       expected: "[0,1]" },
    ],
    starterCode: {
      python: `def twoSum(nums, target):
    # Your code here
    pass

# --- DO NOT EDIT BELOW ---
tests = [
    ([2,7,11,15], 9, "[0, 1]"),
    ([3,2,4], 6, "[1, 2]"),
    ([3,3], 6, "[0, 1]"),
]
for nums, target, expected in tests:
    result = twoSum(nums[:], target)
    status = "PASS" if str(result) == expected else "FAIL"
    print(f"{status} | input: {nums}, {target} | expected: {expected} | got: {result}")
`,
      javascript: `function twoSum(nums, target) {
  // Your code here
}

// --- DO NOT EDIT BELOW ---
function check(result, expected) {
  if (!result) return false;
  return [...result].sort((a,b)=>a-b).join(',') === [...expected].sort((a,b)=>a-b).join(',');
}
const tests = [
  { nums: [2,7,11,15], target: 9, expected: [0,1] },
  { nums: [3,2,4],     target: 6, expected: [1,2] },
  { nums: [3,3],       target: 6, expected: [0,1] },
];
for (const { nums, target, expected } of tests) {
  const result = twoSum([...nums], target);
  const status = check(result, expected) ? "PASS" : "FAIL";
  console.log(\`\${status} | input: \${JSON.stringify(nums)}, \${target} | expected: \${JSON.stringify(expected)} | got: \${JSON.stringify(result)}\`);
}
`,
      java: `import java.util.*;
public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
    static boolean check(int[] result, int[] expected) {
        if (result == null || result.length != expected.length) return false;
        int[] r = result.clone(); int[] e = expected.clone();
        Arrays.sort(r); Arrays.sort(e);
        return Arrays.equals(r, e);
    }
    public static void main(String[] args) {
        Solution s = new Solution();
        int[][] nums = { {2,7,11,15}, {3,2,4}, {3,3} };
        int[] targets = { 9, 6, 6 };
        int[][] expected = { {0,1}, {1,2}, {0,1} };
        for (int i = 0; i < nums.length; i++) {
            int[] result = s.twoSum(nums[i].clone(), targets[i]);
            String status = check(result, expected[i]) ? "PASS" : "FAIL";
            System.out.println(status + " | input: " + Arrays.toString(nums[i]) + ", " + targets[i] + " | expected: " + Arrays.toString(expected[i]) + " | got: " + Arrays.toString(result));
        }
    }
}
`,
    },
  },

  medium: {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"',    output: "1", explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"',   output: "3", explanation: 'The answer is "wke", with the length of 3.' },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    testCases: [
      { input: ["abcabcbb"], expected: "3" },
      { input: ["bbbbb"],    expected: "1" },
      { input: ["pwwkew"],   expected: "3" },
      { input: [""],         expected: "0" },
    ],
    starterCode: {
      python: `def lengthOfLongestSubstring(s):
    # Your code here
    pass

# --- DO NOT EDIT BELOW ---
tests = [
    ("abcabcbb", 3),
    ("bbbbb", 1),
    ("pwwkew", 3),
    ("", 0),
]
for s, expected in tests:
    result = lengthOfLongestSubstring(s)
    status = "PASS" if result == expected else "FAIL"
    print(f"{status} | input: '{s}' | expected: {expected} | got: {result}")
`,
      javascript: `function lengthOfLongestSubstring(s) {
  // Your code here
}

// --- DO NOT EDIT BELOW ---
const tests = [
  { s: "abcabcbb", expected: 3 },
  { s: "bbbbb",    expected: 1 },
  { s: "pwwkew",   expected: 3 },
  { s: "",         expected: 0 },
];
for (const { s, expected } of tests) {
  const result = lengthOfLongestSubstring(s);
  const status = result === expected ? "PASS" : "FAIL";
  console.log(\`\${status} | input: '\${s}' | expected: \${expected} | got: \${result}\`);
}
`,
      java: `public class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Your code here
        return 0;
    }
    public static void main(String[] args) {
        Solution sol = new Solution();
        String[] inputs = { "abcabcbb", "bbbbb", "pwwkew", "" };
        int[] expected = { 3, 1, 3, 0 };
        for (int i = 0; i < inputs.length; i++) {
            int result = sol.lengthOfLongestSubstring(inputs[i]);
            String status = result == expected[i] ? "PASS" : "FAIL";
            System.out.println(status + " | input: '" + inputs[i] + "' | expected: " + expected[i] + " | got: " + result);
        }
    }
}
`,
    },
  },

  hard: {
    id: "median-two-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]",   output: "2.0",  explanation: "merged array = [1,2,3] and median is 2." },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5",  explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5." },
    ],
    constraints: [
      "nums1.length == m", "nums2.length == n",
      "0 <= m <= 1000", "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6",
    ],
    testCases: [
      { input: [[1,3],[2]],   expected: "2.0" },
      { input: [[1,2],[3,4]], expected: "2.5" },
      { input: [[0,0],[0,0]], expected: "0.0" },
    ],
    starterCode: {
      python: `def findMedianSortedArrays(nums1, nums2):
    # Your code here
    pass

# --- DO NOT EDIT BELOW ---
tests = [
    ([1,3], [2],   2.0),
    ([1,2], [3,4], 2.5),
    ([0,0], [0,0], 0.0),
]
for nums1, nums2, expected in tests:
    result = findMedianSortedArrays(nums1[:], nums2[:])
    status = "PASS" if result == expected else "FAIL"
    print(f"{status} | input: {nums1},{nums2} | expected: {expected} | got: {result}")
`,
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  // Your code here
}

// --- DO NOT EDIT BELOW ---
const tests = [
  { nums1: [1,3], nums2: [2],    expected: 2.0 },
  { nums1: [1,2], nums2: [3,4],  expected: 2.5 },
  { nums1: [0,0], nums2: [0,0],  expected: 0.0 },
];
for (const { nums1, nums2, expected } of tests) {
  const result = findMedianSortedArrays([...nums1], [...nums2]);
  const status = result === expected ? "PASS" : "FAIL";
  console.log(\`\${status} | input: \${JSON.stringify(nums1)},\${JSON.stringify(nums2)} | expected: \${expected} | got: \${result}\`);
}
`,
      java: `public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Your code here
        return 0.0;
    }
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] n1 = { {1,3}, {1,2}, {0,0} };
        int[][] n2 = { {2},   {3,4}, {0,0} };
        double[] expected = { 2.0, 2.5, 0.0 };
        for (int i = 0; i < n1.length; i++) {
            double result = sol.findMedianSortedArrays(n1[i].clone(), n2[i].clone());
            String status = result == expected[i] ? "PASS" : "FAIL";
            System.out.println(status + " | expected: " + expected[i] + " | got: " + result);
        }
    }
}
`,
    },
  },
};