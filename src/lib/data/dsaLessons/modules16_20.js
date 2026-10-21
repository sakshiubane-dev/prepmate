/**
 * DSA Modules 16 to 20: Sorting, Searching, Sliding Window, Two Pointers, Bit Manipulation
 * Complete educational lesson content following the PrepMate Lesson Schema.
 */

export const MODULES_16_20 = {
  sorting: {
    id: 'sorting',
    title: 'Sorting',
    order: 16,
    difficulty: 'Intermediate',
    estimatedTime: '55 mins',
    category: 'Algorithms',
    introduction: `Sorting is the process of rearranging a sequence of elements into a specific non-decreasing or non-increasing order. Sorting is the bedrock of computational efficiency: once data is sorted, searching drops from O(N) linear time to O(log N) logarithmic time, duplicates can be detected in O(1) adjacent checks, and range queries become trivial.

From elementary algorithms like Bubble, Selection, and Insertion Sort to advanced divide-and-conquer powerhouses like Merge Sort and Quick Sort, to non-comparison linear algorithms like Counting Sort and Radix Sort, understanding **stability**, **in-place memory**, and **worst-case guarantees** is a cornerstone of technical interview preparation.`,
    learningObjectives: [
      'Contrast comparison-based sorts (O(N log N) theoretical lower bound) with non-comparison linear sorts (O(N)).',
      'Implement Merge Sort and Quick Sort (Lomuto & Hoare partition schemes).',
      'Understand the concept of algorithm Stability and why it matters in real-world databases.',
      'Differentiate In-Place memory sorting (Quick Sort, Heap Sort) from Out-of-Place sorting (Merge Sort).',
      'Implement Counting Sort for bounded integer domains.',
      'Implement sorting algorithms across JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Arrays and 1D indexing', 'Divide and conquer recursion', 'Big-O notation analysis'],
    coreConcepts: `### 1. Comparison Sorts: The O(N log N) Lower Bound
In comparison-based sorting, elements are compared pair-wise. Decision tree theory mathematically proves that any comparison sort must take at least $\\Omega(N \\log N)$ comparisons in the worst case (since there are $N!$ possible permutations and $\\log_2(N!) \\approx N \\log N$).

### 2. Divide and Conquer: Merge Sort vs. Quick Sort
- **Merge Sort:** Divides array into halves, recursively sorts both, and merges them using two pointers.
  - Time: **Guaranteed O(N log N)** in all cases (best, average, worst).
  - Space: **O(N)** auxiliary buffer needed during merge.
  - Stability: **Stable** (preserves original order of equal elements).
- **Quick Sort:** Chooses a pivot, partitions elements such that all elements < pivot are left and > pivot are right, then recurses.
  - Time: Average **O(N log N)**, but **Worst Case O(N^2)** if pivot is poorly chosen (e.g., sorted array with last element pivot).
  - Space: **O(log N)** average recursion stack space, but **O(N)** in the worst case.
  - Stability: **Unstable**.

### 3. Algorithm Stability
A sorting algorithm is **stable** if two items with equal keys maintain their original relative order after sorting. Stability is vital when sorting by multiple columns (e.g. sorting students by Name, then stably sorting by Grade).

### 4. Non-Comparison Linear Sorts
- **Counting Sort:** Counts occurrences of each value in a frequency array. Runs in **O(N + K)** time where $K$ is the range of values.
- **Radix Sort:** Sorts integers digit by digit (from least significant to most significant) using Counting Sort as a stable subroutine. Runs in **O(d * (N + b))** time.

### 5. Summary Comparison Matrix
| Algorithm | Best | Average | Worst | Space | Stable? | In-Place? |
|---|---|---|---|---|---|---|
| Bubble Sort | O(N) | O(N^2) | O(N^2) | O(1) | Yes | Yes |
| Insertion Sort | O(N) | O(N^2) | O(N^2) | O(1) | Yes | Yes |
| Merge Sort | O(N log N) | O(N log N) | O(N log N) | O(N) | Yes | No |
| Quick Sort | O(N log N) | O(N log N) | O(N^2) | O(log N) | No | Yes |
| Heap Sort | O(N log N) | O(N log N) | O(N log N) | O(1) | No | Yes |
| Counting Sort | O(N + K) | O(N + K) | O(N + K) | O(K) | Yes | No |`,
    terminology: [
      { term: 'Stability', definition: 'The property where elements with identical keys retain their initial relative order in the sorted output.' },
      { term: 'In-Place', definition: 'An algorithm that transforms input without allocating extra auxiliary memory proportional to input size (O(1) extra RAM).' },
      { term: 'Pivot', definition: 'An element chosen in Quick Sort around which all other elements are partitioned.' },
      { term: 'Counting Sort', definition: 'A non-comparison integer sorting algorithm that tallies frequencies in a direct-mapped array.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Merge Sort on [38, 27, 43, 3, 9, 82, 10]',
        steps: [
          'Divide: split into [38, 27, 43] and [3, 9, 82, 10]',
          'Divide further until 1-element arrays: [38], [27], [43], [3], [9], [82], [10]',
          'Conquer & Merge: Merge [38] and [27] -> [27, 38]',
          'Merge [27, 38] and [43] -> [27, 38, 43]',
          'Merge [3] and [9] -> [3, 9]; Merge [82] and [10] -> [10, 82]; Merge -> [3, 9, 10, 82]',
          'Final Merge: Two pointers merge [27, 38, 43] and [3, 9, 10, 82]',
          'Compare 27 vs 3 -> pick 3; 27 vs 9 -> pick 9; 27 vs 10 -> pick 10; 27 vs 82 -> pick 27...',
          'Final Sorted Result: [3, 9, 10, 27, 38, 43, 82] in guaranteed O(N log N) time!'
        ]
      }
    ],
    visualExample: `MERGE SORT DIVIDE AND CONQUER TREE

                [38, 27, 43, 3, 9, 82, 10]
                     /              \\
             [38, 27, 43]         [3, 9, 82, 10]
             /        \\            /         \\
          [38, 27]    [43]       [3, 9]     [82, 10]
          /     \\      |          /   \\       /    \\
        [38]   [27]   [43]      [3]   [9]   [82]   [10]
         \\      /      |          \\   /       \\    /
          [27, 38]    [43]        [3, 9]     [10, 82]
             \\        /              \\         /
            [27, 38, 43]             [3, 9, 10, 82]
                     \\              /
                [3, 9, 10, 27, 38, 43, 82]`,
    codeExamples: [
      {
        title: 'Merge Sort Implementation',
        description: 'Sorts an array using recursive divide-and-conquer Merge Sort with guaranteed O(N log N) time.',
        input: 'arr = [38, 27, 43, 3, 9, 82, 10]',
        output: '[3, 9, 10, 27, 38, 43, 82]',
        timeComplexity: 'O(N log N) in all cases',
        spaceComplexity: 'O(N) auxiliary merge buffer',
        javascript: `// JavaScript (Node.js ES6+)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}

// Verification
console.log("Sorted:", mergeSort([38, 27, 43, 3, 9, 82, 10]));
// [3, 9, 10, 27, 38, 43, 82]`,
        python: `# Python 3.10+
def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Verification
if __name__ == "__main__":
    nums = [38, 27, 43, 3, 9, 82, 10]
    print("Sorted:", merge_sort(nums))
    # [3, 9, 10, 27, 38, 43, 82]`,
        java: `// Java 17+
import java.util.Arrays;

public class MergeSortAlgorithm {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left >= right) return;
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;

        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];

        System.arraycopy(temp, 0, arr, left, temp.length);
    }

    public static void main(String[] args) {
        int[] nums = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(nums, 0, nums.length - 1);
        System.out.println("Sorted: " + Arrays.toString(nums));
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <vector>

void merge(std::vector<int>& arr, int left, int mid, int right) {
    std::vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    for (int idx = 0; idx < k; ++idx) {
        arr[left + idx] = temp[idx];
    }
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

int main() {
    std::vector<int> nums = {38, 27, 43, 3, 9, 82, 10};
    mergeSort(nums, 0, nums.size() - 1);
    for (int n : nums) std::cout << n << " ";
    std::cout << "\\n";
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Merge Sort', timeComplexity: 'O(N log N)', spaceComplexity: 'O(N)', notes: 'Guaranteed N log N in all cases; stable' },
      { operation: 'Quick Sort (Average)', timeComplexity: 'O(N log N)', spaceComplexity: 'O(log N)', notes: 'In-place cache-friendly; unstable' },
      { operation: 'Quick Sort (Worst Case)', timeComplexity: 'O(N^2)', spaceComplexity: 'O(N)', notes: 'Degenerates if pivot is always min or max' },
      { operation: 'Counting Sort', timeComplexity: 'O(N + K)', spaceComplexity: 'O(K)', notes: 'Linear non-comparison for bounded range K' },
      { operation: 'Insertion Sort (Best Case)', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Linear on nearly sorted arrays' }
    ],
    commonMistakes: [
      'Assuming Quick Sort is always O(N log N): Without random pivot selection, already-sorted input produces O(N^2) worst case.',
      'Assuming JavaScript `Array.sort()` sorts numbers by default: `[10, 2].sort()` produces `[10, 2]` because JS sorts lexicographically as strings! Must supply `(a, b) => a - b`.',
      'Forgetting that Merge Sort requires O(N) auxiliary space: Merge Sort cannot merge in-place in linear time without complex block logic.',
      'Unstable sorting bugs in multi-attribute data: Using Quick Sort when stability is required corrupts secondary sorted fields.',
      'Using Counting Sort on huge ranges: If range K = 10^9, an array of size K crashes with OutOfMemoryError.'
    ],
    interviewQuestions: [
      {
        question: 'Why is Quick Sort generally preferred over Merge Sort for in-memory primitive sorting in standard libraries?',
        answer: 'Quick Sort operates in-place with O(log N) stack memory, whereas Merge Sort requires O(N) extra buffer memory and continuous allocation. Furthermore, Quick Sort exhibits superior CPU cache locality because it partitions elements linearly without jumping across buffers. Java uses Dual-Pivot QuickSort for primitives and Timsort (hybrid Merge/Insertion sort) for objects.'
      },
      {
        question: 'What is Timsort and why is it used in Python (sorted) and Java (Arrays.sort for objects)?',
        answer: 'Timsort is an adaptive, stable hybrid sort derived from Merge Sort and Insertion Sort. Real-world data frequently contains pre-existing sorted segments ("runs"). Timsort identifies these runs and merges them, running in O(N) linear time on already-sorted data and O(N log N) worst-case.'
      },
      {
        question: 'Can you sort an array of integers in O(N) linear time?',
        answer: 'Yes, if elements are within a bounded integer range or have a fixed number of digits, non-comparison algorithms like Counting Sort (O(N + K)) or Radix Sort (O(d * N)) sort without pair-wise comparisons, breaking the theoretical comparison-based lower bound of Omega(N log N).'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Sort an Array (Merge Sort)', platform: 'LeetCode #912', focus: 'Divide and conquer' },
      { level: 'Beginner', title: 'Sort Colors (Dutch National Flag)', platform: 'LeetCode #75', focus: '3-way in-place partition' },
      { level: 'Intermediate', title: 'Kth Largest Element (Quickselect)', platform: 'LeetCode #215', focus: 'Average O(N) partition selection' },
      { level: 'Intermediate', title: 'Merge Intervals', platform: 'LeetCode #56', focus: 'Sorting + linear scan' },
      { level: 'Advanced', title: 'Maximum Gap', platform: 'LeetCode #164', focus: 'Bucket sort / Pigeonhole principle' }
    ],
    quickRevisionNotes: [
      'Comparison sort lower bound is Omega(N log N).',
      'Merge Sort: Guaranteed O(N log N), O(N) space, stable.',
      'Quick Sort: Average O(N log N), Worst O(N^2), in-place, unstable.',
      'In JS, `arr.sort((a, b) => a - b)` is mandatory for numbers!',
      'Counting and Radix sort achieve O(N) on bounded integer domains.'
    ],
    knowledgeCheck: [
      {
        question: 'Why does JavaScript `[10, 2, 5].sort()` produce `[10, 2, 5]` without a custom comparator?',
        options: ['JavaScript sort is broken', 'Default sort converts elements to strings and compares UTF-16 code units', 'Numbers must be floats', 'It sorts in reverse'],
        correctAnswer: 1,
        explanation: 'By ECMAScript spec, the default sort comparator converts elements to strings. "10" comes before "2" lexicographically.'
      },
      {
        question: 'What is the theoretical worst-case time complexity of Merge Sort on an array of size N?',
        options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
        correctAnswer: 1,
        explanation: 'Merge Sort always splits the array into exact halves and performs an O(N) merge at each level, ensuring guaranteed O(N log N) even in the worst case.'
      },
      {
        question: 'Which sorting algorithm is in-place and has an average time complexity of O(N log N)?',
        options: ['Merge Sort', 'Quick Sort', 'Counting Sort', 'Bubble Sort'],
        correctAnswer: 1,
        explanation: 'Quick Sort partitions elements directly within the original array, using only O(log N) stack frames without extra buffer arrays.'
      }
    ]
  },

  searching: {
    id: 'searching',
    title: 'Searching',
    order: 17,
    difficulty: 'Intermediate',
    estimatedTime: '50 mins',
    category: 'Algorithms',
    introduction: `Searching is the algorithmic task of finding the location or confirming the existence of a target value within a collection of data. While Linear Search inspects each item sequentially in O(N) time, **Binary Search** slashes the search space in half with every single comparison, achieving lightning-fast **O(log N) logarithmic time**.

Binary Search is deceptively tricky: Donald Knuth famously noted that while the idea is simple, only 10% of programmers write a bug-free binary search on their first attempt due to integer overflow and boundary off-by-one errors. Beyond finding elements in sorted arrays, binary search extends to **Lower/Upper Bounds**, **Rotated Sorted Arrays**, and **Binary Search on Answers** (minimizing/maximizing feasible thresholds).`,
    learningObjectives: [
      'Master the standard Binary Search template and avoid the integer overflow trap: `mid = left + (right - left) / 2`.',
      'Implement Lower Bound (`bisect_left`) and Upper Bound (`bisect_right`) to locate duplicate ranges.',
      'Search in Rotated Sorted Arrays by identifying which half is strictly sorted.',
      'Apply the "Binary Search on the Answer" pattern (e.g. Koko Eating Bananas, Capacity to Ship Packages).',
      'Handle loop termination conditions: `while (left <= right)` vs `while (left < right)`.',
      'Implement search algorithms in JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Arrays and sorted order', 'Basic mathematical inequalities'],
    coreConcepts: `### 1. Classical Binary Search
In a sorted array, compare target with midpoint:
\`mid = left + Math.floor((right - left) / 2)\`
- If \`arr[mid] === target\`: return \`mid\`.
- If \`target < arr[mid]\`: eliminate right half -> \`right = mid - 1\`.
- If \`target > arr[mid]\`: eliminate left half -> \`left = mid + 1\`.
Loop runs while \`left <= right\`. If loop exits without matching, target is not present. Time: **O(log N)**, Space: **O(1)**.

### 2. Preventing Integer Overflow
Computing \`mid = (left + right) / 2\` can fail in Java/C++/C# when \`left + right\` exceeds $2^{31} - 1$, resulting in negative integer overflow!
**Always use:** \`mid = left + (right - left) / 2\`.

### 3. Lower Bound & Upper Bound
When arrays contain duplicates:
- **Lower Bound (First Occurrence / Bisect Left):** The first index where \`arr[idx] >= target\`. When \`arr[mid] === target\`, don't return! Move \`right = mid\` to search left.
- **Upper Bound (Bisect Right):** The first index where \`arr[idx] > target\`.

### 4. Search in Rotated Sorted Array
An array like \`[4, 5, 6, 7, 0, 1, 2]\` was rotated at an unknown pivot.
Key Insight: In any rotated sorted array, **at least one half (left or right) is guaranteed to be strictly sorted**!
1. Check if left half is sorted: \`arr[left] <= arr[mid]\`.
   - If target falls within \`[arr[left], arr[mid]]\`, search left: \`right = mid - 1\`.
   - Else search right: \`left = mid + 1\`.
2. Otherwise, right half is strictly sorted:
   - If target falls within \`[arr[mid], arr[right]]\`, search right: \`left = mid + 1\`.
   - Else search left: \`right = mid - 1\`.

### 5. Binary Search on Answers
If a problem asks for the minimum or maximum value $X$ satisfying a condition, and the condition is monotonic (if feasible for $X$, feasible for all $Y > X$):
Binary search across the range of feasible answers $[\\text{min\_possible}, \\text{max\_possible}]$ using an \`isPossible(mid)\` validator function!`,
    terminology: [
      { term: 'Search Space', definition: 'The range of possible indices or candidate values within which the target must reside.' },
      { term: 'Monotonicity', definition: 'A property where a function is entirely non-increasing or non-decreasing, essential for binary search validity.' },
      { term: 'Lower Bound', definition: 'The first index of an element that is greater than or equal to a target value.' },
      { term: 'Upper Bound', definition: 'The first index of an element that is strictly greater than a target value.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Binary Search for 7 in [1, 3, 5, 7, 9, 11]',
        steps: [
          'Array: [1, 3, 5, 7, 9, 11], target = 7. left = 0, right = 5.',
          'Iteration 1: mid = 0 + (5 - 0)/2 = 2. arr[2] = 5.',
          'Is 7 > 5? YES -> target must be in right half. left = mid + 1 = 3.',
          'Iteration 2: left = 3, right = 5. mid = 3 + (5 - 3)/2 = 4. arr[4] = 9.',
          'Is 7 < 9? YES -> target must be in left half. right = mid - 1 = 3.',
          'Iteration 3: left = 3, right = 3. mid = 3 + (3 - 3)/2 = 3. arr[3] = 7.',
          'arr[3] == 7 -> MATCH FOUND at index 3 in only 3 checks!'
        ]
      }
    ],
    visualExample: `BINARY SEARCH HALVING SEARCH SPACE (Target = 7)

Step 1:
[ 1 | 3 | 5 | 7 | 9 | 11 ]    mid = index 2 (val 5)
  ^       ^            ^      5 < 7 -> Discard left half!
left     mid         right

Step 2:
            [ 7 | 9 | 11 ]    mid = index 4 (val 9)
              ^   ^    ^      9 > 7 -> Discard right half!
            left mid right

Step 3:
            [ 7 ]             mid = index 3 (val 7) == MATCH!
              ^
         left/mid/right`,
    codeExamples: [
      {
        title: 'Search in Rotated Sorted Array',
        description: 'Searches for a target value in an array rotated around an unknown pivot in O(log N) time and O(1) space.',
        input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0',
        output: '4 (index of value 0)',
        timeComplexity: 'O(log N) binary search',
        spaceComplexity: 'O(1) in-place pointers',
        javascript: `// JavaScript (Node.js ES6+)
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) return mid;

    // Check if left half is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Target in left half
      } else {
        left = mid + 1;  // Target in right half
      }
    } else {
      // Right half must be sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;  // Target in right half
      } else {
        right = mid - 1; // Target in left half
      }
    }
  }

  return -1;
}

// Verification
console.log("Index of 0:", search([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log("Index of 3:", search([4, 5, 6, 7, 0, 1, 2], 3)); // -1`,
        python: `# Python 3.10+
def search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid

        # Check if left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            # Right half is sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1

# Verification
if __name__ == "__main__":
    print("Index of 0:", search([4, 5, 6, 7, 0, 1, 2], 0))  # 4
    print("Index of 3:", search([4, 5, 6, 7, 0, 1, 2], 3))  # -1`,
        java: `// Java 17+
public class SearchRotatedArray {
    public static int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) return mid;

            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] nums = {4, 5, 6, 7, 0, 1, 2};
        System.out.println("Index of 0: " + search(nums, 0)); // 4
        System.out.println("Index of 3: " + search(nums, 3)); // -1
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <vector>

int search(const std::vector<int>& nums, int target) {
    int left = 0, right = static_cast<int>(nums.size()) - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) return mid;

        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

int main() {
    std::vector<int> nums = {4, 5, 6, 7, 0, 1, 2};
    std::cout << "Index of 0: " << search(nums, 0) << "\\n"; // 4
    std::cout << "Index of 3: " << search(nums, 3) << "\\n"; // -1
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Linear Search', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Unsorted arrays' },
      { operation: 'Standard Binary Search', timeComplexity: 'O(log N)', spaceComplexity: 'O(1)', notes: 'Sorted array' },
      { operation: 'Rotated Sorted Array Search', timeComplexity: 'O(log N)', spaceComplexity: 'O(1)', notes: 'Distinct values' },
      { operation: 'Rotated Array with Duplicates', timeComplexity: 'O(N) worst case', spaceComplexity: 'O(1)', notes: 'Cannot determine sorted half when nums[left]==nums[mid]==nums[right]' },
      { operation: 'Binary Search on Answer Range R', timeComplexity: 'O(N log R)', spaceComplexity: 'O(1)', notes: 'Log R checks, each running O(N) validator' }
    ],
    commonMistakes: [
      'Integer Overflow in Midpoint: `(left + right) / 2` overflows in Java/C++; always use `left + (right - left) / 2`.',
      'Off-by-one loop conditions: Using `left < right` when `left <= right` is needed causes the algorithm to skip inspecting the final 1-element case.',
      'Infinite loops on boundary updates: Doing `left = mid` or `right = mid` without strictly shrinking the interval when size is 2.',
      'Assuming input is always sorted: Applying binary search to an unsorted array produces incorrect random results without warning.',
      'Rotated array with duplicates: Forgetting that duplicates degrade the worst-case time to O(N) when both ends equal the midpoint.'
    ],
    interviewQuestions: [
      {
        question: 'Why does calculating midpoint as `left + (right - left) / 2` prevent integer overflow?',
        answer: 'If left and right are both large positive 32-bit integers (e.g. 1.5 billion each), their sum (3.0 billion) exceeds Integer.MAX_VALUE (2.14 billion), overflowing to negative. In contrast, `right - left` is non-negative and smaller than right, so dividing by 2 and adding to left never exceeds right, completely avoiding overflow.'
      },
      {
        question: 'What is the "Binary Search on Answers" technique and how do you recognize it?',
        answer: 'It applies when the problem asks for the minimum or maximum value of an answer (e.g., minimum capacity to ship packages in D days, minimum eating speed). You establish the minimum possible answer (low) and maximum possible answer (high). If an answer X is possible, all values > X are also possible (monotonicity). You binary search the numeric answer range and use an O(N) greedy checker.'
      },
      {
        question: 'How do you find the first and last position of an element in a sorted array in O(log N) time?',
        answer: 'Run two separate binary searches: 1) To find the first position (lower bound), when `nums[mid] == target`, move `right = mid - 1` to search left. 2) To find the last position (upper bound), when `nums[mid] == target`, move `left = mid + 1` to search right. Both run in O(log N) time.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Binary Search', platform: 'LeetCode #704', focus: 'Classic template' },
      { level: 'Beginner', title: 'First Bad Version', platform: 'LeetCode #278', focus: 'Lower bound condition' },
      { level: 'Intermediate', title: 'Search in Rotated Sorted Array', platform: 'LeetCode #33', focus: 'Sorted half partitioning' },
      { level: 'Intermediate', title: 'Koko Eating Bananas', platform: 'LeetCode #875', focus: 'Binary search on answer' },
      { level: 'Advanced', title: 'Median of Two Sorted Arrays', platform: 'LeetCode #4', focus: 'Dual-array binary search partition' }
    ],
    quickRevisionNotes: [
      'Binary search requires sorted or monotonic properties; runs in O(log N).',
      'Midpoint formula: `mid = left + (right - left) / 2` prevents integer overflow.',
      'Rotated array: at least one half is always sorted; identify it first.',
      'Lower bound finds first occurrence; Upper bound finds strictly greater element.',
      'Binary search on answer range runs in O(N log(Range)).'
    ],
    knowledgeCheck: [
      {
        question: 'What is the maximum number of comparisons Binary Search takes on an array of 1,024 sorted elements in the worst case?',
        options: ['1,024', '512', '11', '100'],
        correctAnswer: 2,
        explanation: 'log2(1024) = 10. Checking the final 1-element boundary takes at most 1 additional comparison, totaling 11 comparisons.'
      },
      {
        question: 'Why should you write `mid = left + (right - left) / 2` instead of `(left + right) / 2`?',
        options: ['It runs faster on the CPU', 'It avoids integer overflow when left + right exceeds maximum integer capacity', 'It supports floating point values', 'It makes the code shorter'],
        correctAnswer: 1,
        explanation: 'Adding large integers can exceed 2^31 - 1, causing arithmetic overflow. Subtraction keeps values strictly within bounds.'
      },
      {
        question: 'In a rotated sorted array with distinct values, how do you verify if the left half `[left..mid]` is sorted?',
        options: ['Check if nums[left] < nums[right]', 'Check if nums[left] <= nums[mid]', 'Check if nums[mid] > nums[mid + 1]', 'Check if nums[left] == 0'],
        correctAnswer: 1,
        explanation: 'If `nums[left] <= nums[mid]`, the left segment contains no rotation pivot and is strictly non-decreasing.'
      }
    ]
  },

  'sliding-window': {
    id: 'sliding-window',
    title: 'Sliding Window',
    order: 18,
    difficulty: 'Intermediate',
    estimatedTime: '50 mins',
    category: 'Algorithmic Patterns',
    introduction: `The Sliding Window pattern is an algorithmic technique that transforms nested loops over contiguous array/string subarrays from quadratic O(N^2) time into linear **O(N) time**. It maintains a running window (defined by \`left\` and \`right\` boundary pointers) that slides across the sequence.

Instead of recalculating sums or character frequencies from scratch for every subarray (which wastes O(K) work per window), the sliding window **incrementally subtracts the outgoing element on the left** and **adds the incoming element on the right** in O(1) time. This pattern is foundational for stream processing, rate limiters, network throughput monitoring, and substring search challenges.`,
    learningObjectives: [
      'Master the distinction between Fixed-Size Windows and Variable-Size Windows.',
      'Achieve O(1) state transitions by sliding boundaries: subtract outgoing, add incoming.',
      'Maintain auxiliary hash maps / frequency arrays to validate window criteria.',
      'Solve the Longest Substring Without Repeating Characters problem in linear time.',
      'Implement Minimum Window Substring with character deficit counters.',
      'Implement sliding window templates in JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Arrays and strings', 'Hash maps and frequency counting', 'Two pointers concept'],
    coreConcepts: `### 1. Fixed-Size Sliding Windows
Used when the window size $K$ is constant (e.g. "Maximum sum subarray of size $K$"):
1. Compute the sum of the first $K$ elements ($[0 \\dots K-1]$).
2. For each index $i$ from $K$ to $N - 1$:
   - Add incoming: \`+ arr[i]\`
   - Subtract outgoing: \`- arr[i - K]\`
   - Update maximum sum in O(1)!
Total time: **O(N)** instead of $O(N \\times K)$.

### 2. Variable-Size Sliding Windows (Dynamic Window)
Used when seeking the longest or shortest contiguous subarray satisfying a condition (e.g., "Shortest subarray with sum $\\ge S$"):
1. Expand window by advancing \`right\` pointer: incorporate \`arr[right]\` into window state.
2. While the window condition is violated (or met, when minimizing):
   - Contract window by advancing \`left\` pointer: remove \`arr[left]\` from state.
   - Update answer.
Even though there is a nested while loop, each element is visited at most twice (once by \`right\`, once by \`left\`), ensuring **O(N) amortized time**!

### 3. Tracking Frequencies Inside the Window
When solving substring problems, use a frequency array \`int[128]\` or Hash Map. Maintain a \`deficitCount\` of required matching characters to verify in O(1) whether the current window contains all desired characters.`,
    terminology: [
      { term: 'Sliding Window', definition: 'A contiguous subsegment of an array or string whose boundaries shift dynamically to evaluate subsets in linear time.' },
      { term: 'Fixed Window', definition: 'A window of predetermined constant length K that shifts one element at a time.' },
      { term: 'Dynamic / Variable Window', definition: 'A window whose size expands and contracts based on problem-specific constraints.' },
      { term: 'Amortized Linear Time', definition: 'Even with nested loops, left and right pointers only move forward at most N times each, taking O(2N) = O(N) operations.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Longest Substring Without Repeating Characters: "pwwkew"',
        steps: [
          'Initialize left = 0, maxLen = 0, lastSeen = Map()',
          'right = 0, char "p": not in map. lastSeen["p"] = 0. window = "p", maxLen = 1.',
          'right = 1, char "w": not in map. lastSeen["w"] = 1. window = "pw", maxLen = 2.',
          'right = 2, char "w": "w" was seen at index 1! Move left = max(left, 1 + 1) = 2. lastSeen["w"] = 2. window = "w", maxLen = 2.',
          'right = 3, char "k": not in window. lastSeen["k"] = 3. window = "wk", maxLen = 2.',
          'right = 4, char "e": not in window. lastSeen["e"] = 4. window = "wke", maxLen = 3.',
          'right = 5, char "w": "w" seen at index 2 >= left(2). Move left = 2 + 1 = 3. window = "kew", maxLen = 3.',
          'End of string. Result = 3 ("wke" or "kew") in O(N) time and O(1) space!'
        ]
      }
    ],
    visualExample: `SLIDING WINDOW (VARIABLE SIZE) ON "pwwkew"

Step 1: [ p ] w w k e w          len = 1
         ^
        L,R

Step 2: [ p   w ] w k e w        len = 2
          ^   ^
          L   R

Step 3:   p [ w   w ] k e w      Duplicate 'w'! Shift L past first 'w'
              ^   ^
              L   R
              
Step 4:   p   w [ w   k   e ] w  len = 3 ("wke")
                  ^       ^
                  L       R`,
    codeExamples: [
      {
        title: 'Longest Substring Without Repeating Characters',
        description: 'Finds the length of the longest substring without duplicate characters using a sliding window and hash map in O(N) time.',
        input: 's = "abcabcbb"',
        output: '3 ("abc")',
        timeComplexity: 'O(N) single pass',
        spaceComplexity: 'O(min(N, M)) where M is character set size',
        javascript: `// JavaScript (Node.js ES6+)
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastSeen.has(ch) && lastSeen.get(ch) >= left) {
      left = lastSeen.get(ch) + 1; // Jump left pointer past duplicate
    }
    lastSeen.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// Verification
console.log("Max len abcabcbb:", lengthOfLongestSubstring("abcabcbb")); // 3
console.log("Max len bbbbb:", lengthOfLongestSubstring("bbbbb"));       // 1`,
        python: `# Python 3.10+
def length_of_longest_substring(s: str) -> int:
    last_seen = {}
    max_len = 0
    left = 0

    for right, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= left:
            left = last_seen[ch] + 1
        last_seen[ch] = right
        max_len = max(max_len, right - left + 1)

    return max_len

# Verification
if __name__ == "__main__":
    print("Max len abcabcbb:", length_of_longest_substring("abcabcbb"))  # 3
    print("Max len bbbbb:", length_of_longest_substring("bbbbb"))        # 1`,
        java: `// Java 17+
import java.util.HashMap;
import java.util.Map;

public class LongestSubstringNoRepeat {
    public static int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);
            if (lastSeen.containsKey(ch) && lastSeen.get(ch) >= left) {
                left = lastSeen.get(ch) + 1;
            }
            lastSeen.put(ch, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        System.out.println("Max len: " + lengthOfLongestSubstring("abcabcbb")); // 3
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

int lengthOfLongestSubstring(const std::string& s) {
    std::vector<int> lastSeen(128, -1);
    int maxLen = 0;
    int left = 0;

    for (int right = 0; right < static_cast<int>(s.length()); ++right) {
        unsigned char ch = s[right];
        if (lastSeen[ch] >= left) {
            left = lastSeen[ch] + 1;
        }
        lastSeen[ch] = right;
        maxLen = std::max(maxLen, right - left + 1);
    }
    return maxLen;
}

int main() {
    std::cout << "Max len: " << lengthOfLongestSubstring("abcabcbb") << "\\n"; // 3
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Fixed Window Slide', timeComplexity: 'O(1) per step', spaceComplexity: 'O(1)', notes: 'Add incoming, subtract outgoing' },
      { operation: 'Variable Window Total', timeComplexity: 'O(N)', spaceComplexity: 'O(K) map', notes: 'Left and right pointers each move at most N times' },
      { operation: 'Brute Force Subarray Checks', timeComplexity: 'O(N^2) or O(N^3)', spaceComplexity: 'O(1)', notes: 'Recalculating without sliding window' },
      { operation: 'Minimum Window Substring', timeComplexity: 'O(N + M)', spaceComplexity: 'O(Alphabet)', notes: 'Using character frequency deficit tracker' }
    ],
    commonMistakes: [
      'Recalculating the entire window: Iterating from left to right on each step defeats the purpose, causing O(N^2) complexity.',
      'Moving left pointer backwards: When updating `left = lastSeen[ch] + 1`, failing to verify `lastSeen[ch] >= left` can move left backwards!',
      'Shrinking the window too late: In minimum window problems, failing to shrink while the condition is still satisfied misses the minimal answer.',
      'Using Hash Maps when fixed arrays work: For ASCII strings, `int[128]` is 10x faster and uses less memory than a HashMap.',
      'Off-by-one window length: The length of a window spanning indices `[left, right]` is `right - left + 1`, not `right - left`.'
    ],
    interviewQuestions: [
      {
        question: 'Why does a variable-size sliding window with a nested while loop run in O(N) time and not O(N^2)?',
        answer: 'Because the `left` pointer only ever increments forward and never resets or moves backward. Over the entire execution of the algorithm, the `right` pointer increments N times and the `left` pointer increments at most N times. The total number of loop operations is at most 2N, which is asymptotically O(N).'
      },
      {
        question: 'How do you solve the Minimum Window Substring problem in linear time?',
        answer: 'Count character requirements of target string T in a hash map. Maintain a `matchCount` of characters whose required frequency has been met. Expand `right`: if incoming char satisfies frequency, increment `matchCount`. Once `matchCount == required`, contract `left` while recording the minimal window length until the match condition breaks.'
      },
      {
        question: 'What is the key indicator that a problem can be solved with a Sliding Window?',
        answer: 'The problem involves contiguous subarrays or substrings, and asks to find a maximum, minimum, or target condition where expanding the right boundary monotonically increases a metric (e.g. sum, count) and advancing the left boundary monotonically decreases it.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Maximum Average Subarray I', platform: 'LeetCode #643', focus: 'Fixed size window' },
      { level: 'Beginner', title: 'Longest Substring Without Repeating Characters', platform: 'LeetCode #3', focus: 'Variable window with map' },
      { level: 'Intermediate', title: 'Max Consecutive Ones III', platform: 'LeetCode #1004', focus: 'Window with k flipped zeros' },
      { level: 'Intermediate', title: 'Fruit Into Baskets', platform: 'LeetCode #904', focus: 'At most 2 distinct elements' },
      { level: 'Advanced', title: 'Minimum Window Substring', platform: 'LeetCode #76', focus: 'Frequency map deficit matching' }
    ],
    quickRevisionNotes: [
      'Sliding window reduces contiguous subarray search from O(N^2) to O(N).',
      'Fixed window: subtract outgoing `arr[i-K]`, add incoming `arr[i]`.',
      'Variable window: expand `right`, contract `left` while condition met.',
      'Window length formula is always `right - left + 1`.',
      'Ensure `left` never moves backwards: `left = Math.max(left, lastSeen[c] + 1)`.'
    ],
    knowledgeCheck: [
      {
        question: 'What is the formula to calculate the number of elements in a window spanning indices from `left` to `right` inclusive?',
        options: ['right - left', 'right - left + 1', 'right - left - 1', '(right + left) / 2'],
        correctAnswer: 1,
        explanation: 'Both boundaries are inclusive, so the count of elements between index 2 and index 4 is 4 - 2 + 1 = 3.'
      },
      {
        question: 'What is the overall time complexity of a variable sliding window algorithm where both left and right pointers traverse an array of size N?',
        options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(2^N)'],
        correctAnswer: 2,
        explanation: 'Since both pointers only increment forward and never regress, each element is visited at most twice, resulting in O(2N) = O(N) linear time.'
      },
      {
        question: 'When sliding a fixed-size window of size K to the right by one position, how is the new sum updated in O(1)?',
        options: ['Sum all K elements from scratch', 'Add the incoming element and subtract the outgoing element', 'Multiply by K', 'Use a binary search'],
        correctAnswer: 1,
        explanation: 'Subtracting the element falling out of the window and adding the new element entering updates the running sum in constant O(1) time.'
      }
    ]
  },

  'two-pointers': {
    id: 'two-pointers',
    title: 'Two Pointers',
    order: 19,
    difficulty: 'Beginner',
    estimatedTime: '45 mins',
    category: 'Algorithmic Patterns',
    introduction: `The Two Pointers pattern is an algorithmic technique where two pointer variables iterate through a linear data structure simultaneously to process pairs or partitions efficiently. Depending on the problem, the pointers may start at opposite ends and move toward each other, or start at the same end and move in the same direction at varying speeds (Fast & Slow pointers).

Two Pointers is celebrated for replacing nested loops (O(N^2)) with a single coordinated pass (**O(N) time**) and zero auxiliary memory (**O(1) space**). It is the premier technique for Two Sum in sorted arrays, 3Sum, Container With Most Water, removing duplicates in-place, linked list cycle detection, and partitioning in Quick Sort.`,
    learningObjectives: [
      'Master Opposite-Direction pointers (meeting in the middle) for sorted arrays and palindromes.',
      'Master Same-Direction / Fast-Slow pointers (Tortoise & Hare, reader-writer in-place compaction).',
      'Solve 3Sum and 4Sum in O(N^2) time while avoiding duplicates.',
      'Solve the Container With Most Water problem using greedy two-pointer narrowing.',
      'Partition arrays in-place in O(N) time (Dutch National Flag, Quick Sort).',
      'Write two-pointer algorithms across JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Arrays and 1D indexing', 'Basic inequality comparisons'],
    coreConcepts: `### 1. Opposite-Direction Pointers (Meeting in the Middle)
Pointers start at opposite extremes: \`left = 0\`, \`right = len - 1\`.
- **Two Sum II (Sorted Array):** Compute \`sum = arr[left] + arr[right]\`.
  - If \`sum === target\`: match found!
  - If \`sum < target\`: to increase the sum, advance \`left++\`.
  - If \`sum > target\`: to decrease the sum, advance \`right--\`.
  Runs in **O(N) time and O(1) space** without any hash table!

### 2. Same-Direction Pointers (Reader-Writer / Slow-Fast)
Both pointers start at the beginning:
- **In-Place Deduplication / Removal:** \`writeIndex\` marks where the next valid element should be placed; \`readIndex\` scans ahead. When \`arr[readIndex]\` is valid, write \`arr[writeIndex] = arr[readIndex]\` and advance \`writeIndex++\`.
- **Fast and Slow Pointers (Floyd):** \`slow\` moves 1 step, \`fast\` moves 2 steps. Detects cycles and locates the middle of linked lists in O(N) time and O(1) space.

### 3. Container With Most Water
Given heights $H[0 \\dots N-1]$, area between lines $i$ and $j$ is $(j - i) \\times \\min(H[i], H[j])$.
- Start \`left = 0\`, \`right = len - 1\`.
- The width is maximal at the start. To have any hope of finding a larger area as width shrinks, we **must** move the pointer pointing to the **shorter line** inwards! Moving the taller line can only decrease width without increasing height. Time: O(N), Space: O(1).

### 4. 3Sum Problem
Given an unsorted array, find all unique triplets $[a, b, c]$ summing to 0:
1. Sort the array in $O(N \\log N)$.
2. Iterate $i$ from 0 to $N - 3$:
   - If $i > 0$ and $arr[i] == arr[i-1]$, continue (skip duplicates).
   - Run Two-Pointer Two Sum on remaining elements $i+1 \\dots N-1$ with target $-arr[i]$.
Total time: $O(N^2)$, Space: $O(1)$.`,
    terminology: [
      { term: 'Two Pointers', definition: 'An approach using two coordinate index references to scan data in coordinated linear time.' },
      { term: 'Slow and Fast Pointers', definition: 'Pointers moving at different velocities (1x vs 2x) used for cycle detection and middle finding.' },
      { term: 'Reader-Writer Pattern', definition: 'A fast pointer scans candidates while a slow pointer writes valid items in-place.' },
      { term: 'In-Place Partitioning', definition: 'Rearranging array elements according to a pivot without creating secondary arrays.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Two Sum II (Sorted): [2, 7, 11, 15], Target = 9',
        steps: [
          'Array: [2, 7, 11, 15], Target = 9. left = 0 (val 2), right = 3 (val 15).',
          'Step 1: sum = 2 + 15 = 17. 17 > 9 -> sum is too large! Move right pointer: right = 2.',
          'Step 2: left = 0 (val 2), right = 2 (val 11). sum = 2 + 11 = 13. 13 > 9 -> still too large! Move right = 1.',
          'Step 3: left = 0 (val 2), right = 1 (val 7). sum = 2 + 7 = 9. MATCH FOUND!',
          'Indices returned: [0, 1] in only 3 comparisons, O(N) time and O(1) space!'
        ]
      }
    ],
    visualExample: `TWO POINTERS (OPPOSITE DIRECTION)

Target = 9
[ 2 ,  7 , 11 , 15 ]      sum = 2 + 15 = 17 > 9 -> Move Right <--
  ^             ^
 left         right

[ 2 ,  7 , 11 , 15 ]      sum = 2 + 11 = 13 > 9 -> Move Right <--
  ^       ^
 left   right

[ 2 ,  7 , 11 , 15 ]      sum = 2 + 7 = 9 == TARGET! MATCH!
  ^    ^
left  right`,
    codeExamples: [
      {
        title: 'Two Sum II - Input Array Is Sorted',
        description: 'Finds two numbers in a 1-indexed sorted array that add up to target using opposite-direction pointers in O(N) time and O(1) space.',
        input: 'numbers = [2, 7, 11, 15], target = 9',
        output: '[1, 2] (1-indexed)',
        timeComplexity: 'O(N) single pass',
        spaceComplexity: 'O(1) constant auxiliary space',
        javascript: `// JavaScript (Node.js ES6+)
function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1]; // 1-indexed
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}

// Verification
console.log("Indices:", twoSum([2, 7, 11, 15], 9)); // [1, 2]
console.log("Indices:", twoSum([2, 3, 4], 6));       // [1, 3]`,
        python: `# Python 3.10+
def two_sum(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1

    while left < right:
        curr_sum = numbers[left] + numbers[right]
        if curr_sum == target:
            return [left + 1, right + 1]  # 1-indexed
        elif curr_sum < target:
            left += 1
        else:
            right -= 1

    return []

# Verification
if __name__ == "__main__":
    print("Indices:", two_sum([2, 7, 11, 15], 9))  # [1, 2]
    print("Indices:", two_sum([2, 3, 4], 6))       # [1, 3]`,
        java: `// Java 17+
import java.util.Arrays;

public class TwoSumSorted {
    public static int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return new int[]{left + 1, right + 1}; // 1-indexed
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{};
    }

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        System.out.println("Indices: " + Arrays.toString(twoSum(nums, 9))); // [1, 2]
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <vector>

std::vector<int> twoSum(const std::vector<int>& numbers, int target) {
    int left = 0, right = static_cast<int>(numbers.size()) - 1;

    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) {
            return {left + 1, right + 1}; // 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return {};
}

int main() {
    auto res = twoSum({2, 7, 11, 15}, 9);
    std::cout << "Indices: [" << res[0] << ", " << res[1] << "]\\n"; // [1, 2]
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Two Sum II (Sorted)', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Opposite direction narrowing' },
      { operation: '3Sum (Sorted array)', timeComplexity: 'O(N^2)', spaceComplexity: 'O(1)', notes: 'Outer loop N times inner two-pointer N' },
      { operation: 'Container With Most Water', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Greedy inwards narrowing' },
      { operation: 'Remove Duplicates from Sorted Array', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Fast-slow reader-writer pointers' },
      { operation: 'Trapping Rain Water (Two Pointers)', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Tracking leftMax and rightMax pointers' }
    ],
    commonMistakes: [
      'Applying Two Sum pointers to unsorted arrays: If the array is not sorted, advancing left or right has no predictable relationship to the sum.',
      'Duplicate combinations in 3Sum: Forgetting to skip duplicate values `while (left < right && nums[left] == nums[left+1]) left++` yields duplicate triplets.',
      'Pointer crossover off-by-one: Using `while (left <= right)` when two distinct elements are required permits picking the same element twice (`left == right`).',
      'Moving the wrong pointer in Container With Most Water: Moving the taller line instead of the shorter line cannot yield a larger area.',
      'Modifying array size during iteration: Mutating array lengths during two-pointer sweeps can cause index out-of-bounds.'
    ],
    interviewQuestions: [
      {
        question: 'Why does moving the shorter pointer in Container With Most Water guarantee we do not miss the maximum area?',
        answer: 'The area between lines i and j is `(j - i) * min(H[i], H[j])`. If H[i] < H[j], H[i] is the bottleneck. If we were to keep H[i] and move H[j] inward to j-1, the width strictly decreases, while the height can never exceed H[i]. Thus, every other rectangle using H[i] has strictly smaller area. Pruning H[i] by advancing i++ is safe.'
      },
      {
        question: 'How does Two Pointers reduce 3Sum from O(N^3) to O(N^2)?',
        answer: 'Sorting the array takes O(N log N). For each element X at index i, the problem reduces to finding pairs summing to -X in the remaining sorted slice i+1..N-1. Two pointers solves the pair sum in O(N) linear time, resulting in N * O(N) = O(N^2) total time and O(1) space.'
      },
      {
        question: 'What is the Reader-Writer two pointer pattern?',
        answer: 'In-place array compaction (e.g. Remove Duplicates, Move Zeroes): a Fast/Reader pointer scans every element in the array, while a Slow/Writer pointer marks the boundary where the next valid element belongs. When Reader finds a keeper element, it overwrites Writer position and Writer advances.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Two Sum II - Input Array Is Sorted', platform: 'LeetCode #167', focus: 'Opposite direction' },
      { level: 'Beginner', title: 'Remove Duplicates from Sorted Array', platform: 'LeetCode #26', focus: 'Reader-writer in-place' },
      { level: 'Intermediate', title: '3Sum', platform: 'LeetCode #15', focus: 'Sorting + Two pointers + Duplicate skipping' },
      { level: 'Intermediate', title: 'Container With Most Water', platform: 'LeetCode #11', focus: 'Greedy two pointers' },
      { level: 'Advanced', title: 'Trapping Rain Water', platform: 'LeetCode #42', focus: 'Dual boundary maximums' }
    ],
    quickRevisionNotes: [
      'Two Pointers replaces nested loops with O(N) time and O(1) space.',
      'Opposite direction: start at ends, move inward based on comparison.',
      'Fast and Slow: reader/writer for in-place modification; 1x/2x for cycle detection.',
      'In 3Sum: sort first, iterate outer index, two-pointer inner search.',
      'Container With Most Water: always advance the pointer at the shorter bar.'
    ],
    knowledgeCheck: [
      {
        question: 'Why does Two Sum II run in O(N) time using two pointers on a sorted array?',
        options: ['Because it uses a hash map', 'Because with each step, one pointer moves inward, inspecting all necessary pairs in at most N steps', 'Because sorting takes O(1)', 'Because binary search is called N times'],
        correctAnswer: 1,
        explanation: 'Each comparison either finds the target, increments left, or decrements right. The pointers move closer until they meet, guaranteeing at most N total steps.'
      },
      {
        question: 'In the Container With Most Water problem, which pointer is moved at each iteration?',
        options: ['The pointer with the taller line', 'The pointer with the shorter line', 'Both pointers simultaneously', 'Random pointer'],
        correctAnswer: 1,
        explanation: 'The shorter line limits the container height. Moving the taller line only shrinks the width without any chance of increasing the height, so the shorter line must be moved.'
      },
      {
        question: 'What is the time complexity of the 3Sum problem using sorting and two pointers?',
        options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(N^3)'],
        correctAnswer: 2,
        explanation: 'Sorting takes O(N log N). The outer loop runs N times, and each inner two-pointer scan takes O(N), resulting in O(N log N + N^2) = O(N^2) total time.'
      }
    ]
  },

  'bit-manipulation': {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    order: 20,
    difficulty: 'Intermediate',
    estimatedTime: '50 mins',
    category: 'Computer Systems & Algorithms',
    introduction: `Bit Manipulation is the act of algorithmically manipulating individual binary bits (0s and 1s) directly at the machine word level using low-level bitwise operators. Because computers represent all integers, characters, and memory pointers as binary voltages, bitwise operations map directly to single-cycle CPU instructions (ALU), executing with unmatched speed and zero memory allocation.

Bit manipulation is the secret weapon of high-performance computing, systems programming, cryptography, network packet encoding, compression algorithms, and graphics engines. Mastering bit masks, bitwise XOR tricks, power-of-two tests, and bitwise state flags is a distinguishing hallmark of top software engineers.`,
    learningObjectives: [
      'Master fundamental bitwise operators: AND (&), OR (|), XOR (^), NOT (~), Left Shift (<<), Right Shift (>>).',
      'Understand Two Complement representation for negative numbers.',
      'Perform bit masking operations: Set bit, Clear bit, Toggle bit, and Test bit at index k in O(1).',
      'Harness XOR properties: `x ^ x = 0` and `x ^ 0 = x` to solve Single Number in O(N) time and O(1) space.',
      'Test if an integer is a Power of Two using Brian Kernighan trick: `n & (n - 1) === 0`.',
      'Represent subsets and combinatorics using 32-bit integer bitmasks across all four languages.'
    ],
    prerequisites: ['Binary representation (base 2)', 'Integer memory layout (32-bit / 64-bit)'],
    coreConcepts: `### 1. Fundamental Bitwise Operators
- **AND (\`a & b\`):** 1 if both bits are 1; else 0. Clears bits.
- **OR (\`a | b\`):** 1 if at least one bit is 1; else 0. Sets bits.
- **XOR (\`a ^ b\`):** 1 if bits differ (one is 1, one is 0); 0 if identical. Invert / toggle.
  - Critical XOR Laws: \`x ^ x = 0\`, \`x ^ 0 = x\`, commutative and associative!
- **NOT (\`~a\`):** Inverts all bits (0 becomes 1, 1 becomes 0).
- **Left Shift (\`a << k\`):** Shifts bits left by $k$ positions (multiplies by $2^k$).
- **Right Shift (\`a >> k\`):** Arithmetic right shift (preserves sign bit; divides by $2^k$).
- **Unsigned Right Shift (\`a >>> k\`):** Fills leftmost bits with zeros (logical shift).

### 2. Common Bit Manipulation Formulas
- **Get bit k:** \`(n >> k) & 1\`
- **Set bit k (make it 1):** \`n | (1 << k)\`
- **Clear bit k (make it 0):** \`n & ~(1 << k)\`
- **Toggle bit k (flip it):** \`n ^ (1 << k)\`
- **Extract lowest set bit:** \`n & (-n)\`
- **Clear lowest set bit:** \`n & (n - 1)\`

### 3. Brian Kernighan's Algorithm (Counting Set Bits)
To count how many 1-bits exist in an integer $N$:
Repeatedly execute \`n = n & (n - 1)\`. Each execution clears the lowest set bit to 0!
The loop runs in **O(number of set bits)** time instead of scanning all 32 bits!

### 4. Power of Two Check
A positive integer is a power of two ($1, 2, 4, 8, 16, \\dots$) if and only if its binary representation has **exactly one 1-bit** (e.g. $8 = 1000_2$, $7 = 0111_2$).
Evaluating \`n > 0 && (n & (n - 1)) === 0\` checks this in a single CPU instruction!

### 5. Bitmasks for State Representation
A 32-bit integer can represent a set of up to 32 elements. If element $i$ is in the set, bit $i$ is 1; else 0.
- Union of two sets: \`setA | setB\`
- Intersection of two sets: \`setA & setB\`
- Set difference: \`setA & ~setB\`
- Check membership of $x$: \`(setA & (1 << x)) !== 0\``,
    terminology: [
      { term: 'Bitmask', definition: 'A binary number used to select, set, clear, or toggle specific bits within another binary value.' },
      { term: 'Two\'s Complement', definition: 'The standard binary representation for signed integers: negative of x is ~x + 1.' },
      { term: 'Brian Kernighan Trick', definition: 'The operation n & (n - 1) which clears the lowest set 1-bit of n in O(1).' },
      { term: 'Hamming Weight', definition: 'The number of symbols that are different from zero (number of set 1-bits) in a binary string.' },
      { term: 'XOR (Exclusive OR)', definition: 'A bitwise operator returning 1 if and only if its inputs are strictly different.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Single Number using XOR Cancellation',
        steps: [
          'Given array: nums = [4, 1, 2, 1, 2] (every number appears twice except 4)',
          'Initialize running XOR sum: acc = 0',
          'Process 4: acc = 0 ^ 4 = 4',
          'Process 1: acc = 4 ^ 1',
          'Process 2: acc = 4 ^ 1 ^ 2',
          'Process 1: acc = 4 ^ 1 ^ 2 ^ 1. By commutativity: (1 ^ 1) = 0 -> acc = 4 ^ 2 ^ 0 = 4 ^ 2',
          'Process 2: acc = 4 ^ 2 ^ 2. (2 ^ 2) = 0 -> acc = 4 ^ 0 = 4!',
          'All duplicate pairs annihilate to 0. Unique single number 4 remains in O(N) time and O(1) space!'
        ]
      }
    ],
    visualExample: `BIT MANIPULATION ESSENTIAL FORMULAS

1. Power of Two Test: n & (n - 1) == 0
   n = 8:       1 0 0 0
   n - 1 = 7:   0 1 1 1
   n & (n - 1): 0 0 0 0  == 0  --> TRUE! 8 is a power of 2.

2. Single Number XOR Cancellation:
   Numbers:   [ 4,  1,  2,  1,  2 ]
   XOR all:   4 ^ (1 ^ 1) ^ (2 ^ 2)
            = 4 ^ 0 ^ 0
            = 4  (Single number found in O(1) space!)`,
    codeExamples: [
      {
        title: 'Single Number (XOR Accumulator)',
        description: 'Finds the single element in an array where every other element appears twice in O(N) time and O(1) space.',
        input: 'nums = [4, 1, 2, 1, 2]',
        output: '4',
        timeComplexity: 'O(N) single pass',
        spaceComplexity: 'O(1) auxiliary space',
        javascript: `// JavaScript (Node.js ES6+)
function singleNumber(nums) {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}

// Verification
console.log("Single number:", singleNumber([4, 1, 2, 1, 2])); // 4
console.log("Single number:", singleNumber([2, 2, 1]));       // 1`,
        python: `# Python 3.10+
def single_number(nums: list[int]) -> int:
    result = 0
    for num in nums:
        result ^= num
    return result

# Verification
if __name__ == "__main__":
    print("Single number:", single_number([4, 1, 2, 1, 2]))  # 4
    print("Single number:", single_number([2, 2, 1]))        # 1`,
        java: `// Java 17+
public class SingleNumber {
    public static int singleNumber(int[] nums) {
        int result = 0;
        for (int num : nums) {
            result ^= num;
        }
        return result;
    }

    public static void main(String[] args) {
        int[] nums = {4, 1, 2, 1, 2};
        System.out.println("Single number: " + singleNumber(nums)); // 4
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <vector>

int singleNumber(const std::vector<int>& nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;
}

int main() {
    std::cout << "Single number: " << singleNumber({4, 1, 2, 1, 2}) << "\\n"; // 4
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Bitwise AND / OR / XOR / NOT', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Single CPU clock cycle instruction' },
      { operation: 'Shifts (<<, >>, >>>)', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Hardware barrel shifter operation' },
      { operation: 'Brian Kernighan Set Bit Count', timeComplexity: 'O(K) where K = set bits', spaceComplexity: 'O(1)', notes: 'At most 32 loop iterations' },
      { operation: 'Power of Two Check', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Single expression n > 0 && (n & (n - 1)) == 0' },
      { operation: 'Generate All Subsets via Bitmask', timeComplexity: 'O(N * 2^N)', spaceComplexity: 'O(1)', notes: 'Iterate mask from 0 to 2^N - 1' }
    ],
    commonMistakes: [
      'Operator Precedence Trap: Bitwise operators have LOWER precedence than equality and arithmetic! `if (n & 1 == 0)` evaluates as `n & (1 == 0)`! Always write `if ((n & 1) === 0)`.',
      'Signed 32-bit Shift in JavaScript: JavaScript bitwise operators coerce numbers to signed 32-bit integers. Shifting large numbers can flip the sign bit unexpectedly.',
      'Confusing Logical AND (&&) with Bitwise AND (&): `&&` evaluates booleans with short-circuiting; `&` operates on individual bits.',
      'Shifting by >= 32 bits: Shifting a 32-bit integer by 32 or more positions is undefined behavior in C/C++ and wraps modulo 32.',
      'Forgetting n > 0 in Power of Two: The expression `0 & (0 - 1) == 0` evaluates to true, but 0 is NOT a power of two.'
    ],
    interviewQuestions: [
      {
        question: 'Why does `n & (n - 1)` clear the lowest set bit of an integer?',
        answer: 'Subtracting 1 from a binary number flips the lowest set bit to 0 and turns all trailing 0s into 1s (e.g., 12 = 1100_2, 11 = 1011_2). Performing a bitwise AND between n and n - 1 leaves all higher bits unchanged, while the lowest 1 and its trailing bits become 0 (1100 & 1011 = 1000).'
      },
      {
        question: 'How do you swap two numbers without using any temporary variable?',
        answer: 'Using XOR: `a = a ^ b; b = a ^ b; a = a ^ b;`. In step 1, a stores the XOR difference. In step 2, `b = (a ^ b) ^ b = a`. In step 3, `a = (a ^ b) ^ a = b`. Note: this fails if a and b refer to the exact same memory address (a ^ a = 0).'
      },
      {
        question: 'How can you find the two unique numbers in an array where every other number appears twice?',
        answer: 'XOR all numbers together: the result `xorAll = x ^ y` represents the difference between the two unique numbers. Since x != y, xorAll has at least one 1-bit. Find the lowest set bit `diff = xorAll & (-xorAll)`. Partition all numbers into two groups based on whether this bit is set. XORing each group separately isolates x and y in O(N) time and O(1) space.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Single Number', platform: 'LeetCode #136', focus: 'XOR cancellation' },
      { level: 'Beginner', title: 'Number of 1 Bits', platform: 'LeetCode #191', focus: 'Brian Kernighan count' },
      { level: 'Intermediate', title: 'Single Number II', platform: 'LeetCode #137', focus: 'Modulo-3 bit counters' },
      { level: 'Intermediate', title: 'Bitwise AND of Numbers Range', platform: 'LeetCode #201', focus: 'Common prefix bits' },
      { level: 'Advanced', title: 'Maximum XOR of Two Numbers in an Array', platform: 'LeetCode #421', focus: 'Bitmask Trie' }
    ],
    quickRevisionNotes: [
      'XOR Laws: x ^ x = 0, x ^ 0 = x. Single number in O(N) time and O(1) space.',
      'Check Power of 2: `n > 0 && (n & (n - 1)) === 0`.',
      'Operator Precedence: Always wrap bitwise expressions in parentheses: `((n & 1) === 0)`.',
      'Set bit k: `n | (1 << k)`. Clear bit k: `n & ~(1 << k)`. Toggle bit k: `n ^ (1 << k)`.',
      'Kernighan trick `n & (n - 1)` clears lowest set bit in O(1).'
    ],
    knowledgeCheck: [
      {
        question: 'What is the result of evaluating `12 & (12 - 1)` where 12 is binary `1100`?',
        options: ['11 (1011)', '8 (1000)', '4 (0100)', '0 (0000)'],
        correctAnswer: 1,
        explanation: '12 is 1100_2, and 11 is 1011_2. Bitwise AND: 1100 & 1011 = 1000_2, which is decimal 8.'
      },
      {
        question: 'Why does the expression `if (n & 1 == 0)` fail to check if n is an even number in C++ and Java?',
        options: ['Bitwise AND does not work on odd numbers', 'Operator `==` has higher precedence than `&`, evaluating as `n & (1 == 0)`', 'Numbers must be unsigned', 'Bitwise AND returns a boolean'],
        correctAnswer: 1,
        explanation: 'In C++, Java, and JS, equality operators (==) have higher precedence than bitwise AND (&). The expression evaluates as `n & false`, causing logic errors unless written as `(n & 1) == 0`.'
      },
      {
        question: 'If every element in an array appears twice except for one unique element, which bitwise operator can isolate it in O(N) time and O(1) space?',
        options: ['AND (&)', 'OR (|)', 'XOR (^)', 'NOT (~)'],
        correctAnswer: 2,
        explanation: 'XOR has the property that `x ^ x = 0` and `x ^ 0 = x`. XORing all numbers annihilates all duplicate pairs, leaving only the unique number.'
      }
    ]
  }
};
