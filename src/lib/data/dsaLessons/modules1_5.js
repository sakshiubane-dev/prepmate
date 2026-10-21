/**
 * DSA Modules 1 to 5: Arrays, Strings, Linked Lists, Stacks, Queues
 * Complete educational lesson content following the PrepMate Lesson Schema.
 */

export const MODULES_1_5 = {
  arrays: {
    id: 'arrays',
    title: 'Arrays',
    order: 1,
    difficulty: 'Beginner',
    estimatedTime: '45 mins',
    category: 'Linear Data Structures',
    introduction: `An array is the most fundamental linear data structure in computer science. It stores a fixed-size, sequential collection of elements of the same type in contiguous memory locations. Because memory addresses are contiguous, arrays provide O(1) instantaneous random access using a mathematical base address formula: Address(A[i]) = BaseAddress + i * sizeof(DataType).

Arrays serve as the physical foundation for nearly every higher-level data structure, including dynamic arrays (ArrayList/Vector), strings, hash tables, heaps, matrices, and buffer caches. Understanding memory locality, traversal patterns, prefix sums, and subarray manipulations is the single most critical prerequisite for technical interview success.`,
    learningObjectives: [
      'Understand contiguous memory allocation and how pointer arithmetic enables O(1) random index access.',
      'Master fundamental array operations: traversal, insertion, deletion, and searching with exact Big-O costs.',
      'Apply the prefix sum technique to solve range sum queries in O(1) time.',
      'Navigate multi-dimensional arrays (matrices) and row-major vs. column-major indexing.',
      'Distinguish between contiguous subarrays, subsequences, and subsets.',
      'Implement canonical array algorithms cleanly across JavaScript, Python, Java, and C++.'
    ],
    prerequisites: [
      'Basic programming syntax (loops, conditionals, functions)',
      'Understanding of variables and computer memory concepts'
    ],
    coreConcepts: `### 1. Memory Layout and Indexing
When you declare an array of size N, the operating system allocates a single contiguous block of bytes. If the base address of an integer array is 1000 and each integer occupies 4 bytes, index 0 is at 1000, index 1 is at 1004, index 2 is at 1008, and index i is at 1000 + (i * 4). This calculation requires only one multiplication and one addition, granting true O(1) random read and write capability.

### 2. Static vs. Dynamic Arrays
- **Static Arrays:** Fixed size declared at compile or initialization time. Memory is allocated on the stack or heap once. If you exceed the size, you cannot resize it.
- **Dynamic Arrays (JS Array, Python list, Java ArrayList, C++ std::vector):** Backed by a static array under the hood. When capacity is reached, the runtime creates a new array of double the size (growth factor = 2x or 1.5x), copies all existing elements over, and reclaims old memory. While an individual resize takes O(N), the **amortized** cost of each append is O(1).

### 3. Insertion and Deletion Mechanics
- **Insertion at End:** O(1) amortized.
- **Insertion at Beginning/Middle:** Requires shifting all subsequent elements to the right by one position to make room, taking O(N) time.
- **Deletion:** Deleting from index k requires shifting all elements from k+1 to N-1 to the left by one position, taking O(N) time.

### 4. Prefix Sums & Range Queries
Prefix sums precalculate cumulative sums up to each index. If P[i] = A[0] + A[1] + ... + A[i], then the sum of any contiguous subarray from index L to R is computed in O(1) as:
Sum(L...R) = P[R] - P[L - 1] (with P[-1] = 0). This turns repeated O(N) subarray queries into O(1).

### 5. Multi-dimensional Arrays (2D Matrices)
A 2D array of size R x C is laid out linearly in RAM either in row-major order (standard for C/C++ multidimensional arrays; Java and Python commonly use arrays of references) where element (r, c) is at index \`r * C + c\`, or column-major order. Cache locality makes row-by-row traversal significantly faster than column-by-column jumping due to CPU cache lines fetching consecutive memory words.`,
    terminology: [
      { term: 'Contiguous Memory', definition: 'A consecutive, unbroken block of physical RAM addresses where array elements reside back-to-back.' },
      { term: 'Amortized O(1)', definition: 'The average time per operation over a long sequence of operations, even if an occasional single operation (e.g., resizing) takes longer.' },
      { term: 'Subarray', definition: 'A contiguous, unbroken slice of an array that preserves the original relative order.' },
      { term: 'Subsequence', definition: 'A sequence derived by deleting zero or more elements without changing the order of remaining elements (not necessarily contiguous).' },
      { term: 'Prefix Sum', definition: 'An array where each index stores the sum of all elements from the start up to that index.' },
      { term: 'Cache Locality', definition: 'The CPU hardware optimization where accessing an element loads adjacent memory into fast L1/L2 cache, making sequential access blazing fast.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Prefix Sum Calculation',
        steps: [
          'Given input array: nums = [2, 4, 1, 7, 3]',
          'Initialize prefix array: prefix = [2]',
          'Iterate i = 1: prefix[1] = prefix[0] + nums[1] = 2 + 4 = 6',
          'Iterate i = 2: prefix[2] = prefix[1] + nums[2] = 6 + 1 = 7',
          'Iterate i = 3: prefix[3] = prefix[2] + nums[3] = 7 + 7 = 14',
          'Iterate i = 4: prefix[4] = prefix[3] + nums[4] = 14 + 3 = 17',
          'Resulting prefix array: [2, 6, 7, 14, 17]',
          'Query Range Sum from index 1 to 3: prefix[3] - prefix[0] = 14 - 2 = 12. Notice nums[1]+nums[2]+nums[3] = 4+1+7 = 12. Time is O(1)!'
        ]
      }
    ],
    visualExample: `ARRAY MEMORY & PREFIX SUM VISUALIZATION

Memory Address:   1000    1004    1008    1012    1016
Index:             [0]     [1]     [2]     [3]     [4]
Original Array:   |  2  | |  4  | |  1  | |  7  | |  3  |
                   \\       /       /       /       /
Prefix Sums:      |  2  | |  6  | |  7  | | 14  | | 17  |
Formula:          P[0]=2  2+4=6   6+1=7   7+7=14  14+3=17

Range Query Sum(1 to 3):
Subarray elements: nums[1] + nums[2] + nums[3] = 4 + 1 + 7 = 12
Prefix formula:    prefix[3] - prefix[0]       = 14 - 2    = 12 (Done in O(1)!)`,
    codeExamples: [
      {
        title: 'Prefix Sum Array & Range Query',
        description: 'Constructs a prefix sum array in O(N) time and answers arbitrary range sum queries in O(1) time.',
        input: 'nums = [2, 4, 1, 7, 3], range queries = [[1, 3], [0, 2], [2, 4]]',
        output: 'Queries results: [12, 7, 11]',
        timeComplexity: 'O(N) construction, O(1) per query',
        spaceComplexity: 'O(N) auxiliary space for prefix table',
        javascript: `// JavaScript (Node.js ES6+)
class PrefixSum {
  constructor(nums) {
    this.prefix = new Array(nums.length);
    if (nums.length === 0) return;
    this.prefix[0] = nums[0];
    for (let i = 1; i < nums.length; i++) {
      this.prefix[i] = this.prefix[i - 1] + nums[i];
    }
  }

  queryRange(left, right) {
    if (left === 0) return this.prefix[right];
    return this.prefix[right] - this.prefix[left - 1];
  }
}

// Verification
const arr = [2, 4, 1, 7, 3];
const solver = new PrefixSum(arr);
console.log("Range [1, 3] sum:", solver.queryRange(1, 3)); // 12 (4+1+7)
console.log("Range [0, 2] sum:", solver.queryRange(0, 2)); // 7 (2+4+1)
console.log("Range [2, 4] sum:", solver.queryRange(2, 4)); // 11 (1+7+3)`,
        python: `# Python 3.10+
class PrefixSum:
    def __init__(self, nums: list[int]):
        self.prefix = []
        if not nums:
            return
        running = 0
        for num in nums:
            running += num
            self.prefix.append(running)

    def query_range(self, left: int, right: int) -> int:
        if left == 0:
            return self.prefix[right]
        return self.prefix[right] - self.prefix[left - 1]

# Verification
if __name__ == "__main__":
    arr = [2, 4, 1, 7, 3]
    solver = PrefixSum(arr)
    print("Range [1, 3] sum:", solver.query_range(1, 3))  # 12
    print("Range [0, 2] sum:", solver.query_range(0, 2))  # 7
    print("Range [2, 4] sum:", solver.query_range(2, 4))  # 11`,
        java: `// Java 17+
public class PrefixSum {
    private final int[] prefix;

    public PrefixSum(int[] nums) {
        prefix = new int[nums.length];
        if (nums.length == 0) return;
        prefix[0] = nums[0];
        for (int i = 1; i < nums.length; i++) {
            prefix[i] = prefix[i - 1] + nums[i];
        }
    }

    public int queryRange(int left, int right) {
        if (left == 0) return prefix[right];
        return prefix[right] - prefix[left - 1];
    }

    public static void main(String[] args) {
        int[] arr = {2, 4, 1, 7, 3};
        PrefixSum solver = new PrefixSum(arr);
        System.out.println("Range [1, 3] sum: " + solver.queryRange(1, 3)); // 12
        System.out.println("Range [0, 2] sum: " + solver.queryRange(0, 2)); // 7
        System.out.println("Range [2, 4] sum: " + solver.queryRange(2, 4)); // 11
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <vector>

class PrefixSum {
private:
    std::vector<int> prefix;
public:
    PrefixSum(const std::vector<int>& nums) {
        if (nums.empty()) return;
        prefix.resize(nums.size());
        prefix[0] = nums[0];
        for (size_t i = 1; i < nums.size(); ++i) {
            prefix[i] = prefix[i - 1] + nums[i];
        }
    }

    int queryRange(int left, int right) const {
        if (left == 0) return prefix[right];
        return prefix[right] - prefix[left - 1];
    }
};

int main() {
    std::vector<int> arr = {2, 4, 1, 7, 3};
    PrefixSum solver(arr);
    std::cout << "Range [1, 3] sum: " << solver.queryRange(1, 3) << "\\n"; // 12
    std::cout << "Range [0, 2] sum: " << solver.queryRange(0, 2) << "\\n"; // 7
    std::cout << "Range [2, 4] sum: " << solver.queryRange(2, 4) << "\\n"; // 11
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Random Access (by index)', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Direct pointer offset computation Base + (i * size)' },
      { operation: 'Search (Unsorted array)', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Linear search scanning elements sequentially' },
      { operation: 'Search (Sorted array)', timeComplexity: 'O(log N)', spaceComplexity: 'O(1)', notes: 'Binary search dividing search space in half' },
      { operation: 'Append / Remove Last Element (Dynamic Array)', timeComplexity: 'O(1) amortized', spaceComplexity: 'O(1)', notes: 'Appending occasionally resizes the array; removing the last element is O(1) without shrinking' },
      { operation: 'Insertion / Deletion at Start/Middle', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Requires shifting remaining elements right or left' },
      { operation: 'Prefix Sum Construction', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', notes: 'Single pass cumulative sum array' }
    ],
    commonMistakes: [
      'Off-by-one errors with array bounds: Accessing arr[N] when length is N causes out-of-bounds errors.',
      'Confusing Subarray with Subsequence: Subarrays must be strictly contiguous; subsequences do not need to be contiguous.',
      'Modifying an array during traversal: Mutating lengths or indices in a forward loop can skip elements or cause infinite loops.',
      'Ignoring 0-based prefix indexing: Range query formula prefix[right] - prefix[left-1] crashes if left == 0 without a boundary check or 1-indexed padding.',
      'Unnecessary copying: Passing large arrays by value in languages like C++ creates full O(N) duplicates; pass by const reference instead.'
    ],
    interviewQuestions: [
      {
        question: 'Why is accessing an array element by index O(1), but searching for a value is O(N)?',
        answer: 'Access by index is purely mathematical: the CPU calculates the exact memory byte address in one arithmetic cycle: base + index * size. However, finding a value requires inspecting each slot one by one in the worst case (linear search), inspecting all N items because values are not placed at predictable addresses.'
      },
      {
        question: 'How does dynamic array doubling ensure amortized O(1) insertions instead of O(N)?',
        answer: 'When an array of capacity N fills up, doubling it to 2N requires copying N items (cost N). However, it took N/2 individual insertions before this resize happened, and it will take another N insertions before the next resize. Spreading that cost across all operations gives an average of ~3 memory writes per insertion, which is mathematically bounded by a constant O(1).'
      },
      {
        question: 'How can you find the maximum subarray sum in O(N) time?',
        answer: 'Using Kadane Algorithm: Maintain a running current_sum and max_sum. At each element x, decide whether to extend the previous subarray or start fresh from x: current_sum = max(x, current_sum + x). Update max_sum = max(max_sum, current_sum). This operates in a single linear pass with O(1) auxiliary space.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Running Sum of 1D Array', platform: 'LeetCode #1480', focus: 'Prefix sum fundamentals' },
      { level: 'Beginner', title: 'Two Sum', platform: 'LeetCode #1', focus: 'Array traversal & hash complement' },
      { level: 'Intermediate', title: 'Maximum Subarray (Kadane)', platform: 'LeetCode #53', focus: 'Greedy/DP on contiguous subarrays' },
      { level: 'Intermediate', title: 'Product of Array Except Self', platform: 'LeetCode #238', focus: 'Prefix and Suffix product arrays' },
      { level: 'Advanced', title: 'Trapping Rain Water', platform: 'LeetCode #42', focus: 'Two pointers / Prefix-Suffix maximums' }
    ],
    quickRevisionNotes: [
      'Contiguous RAM layout enables O(1) random index access.',
      'Insertion/deletion at beginning or middle is O(N) due to element shifting.',
      'Amortized cost of append in dynamic arrays is O(1).',
      'Prefix Sum solves range sum queries in O(1) after O(N) precomputation.',
      'Kadane Algorithm finds maximum subarray sum in O(N) time and O(1) space.',
      'Always check 0-based boundary conditions when implementing range queries.'
    ],
    knowledgeCheck: [
      {
        question: 'What is the time complexity to insert an element at the beginning (index 0) of an array of size N?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
        correctAnswer: 2,
        explanation: 'Inserting at index 0 requires shifting all existing N elements one position to the right to make room, which takes O(N) operations.'
      },
      {
        question: 'If an array has prefix sums P, how is the sum of elements from index L to R calculated (where L > 0)?',
        options: ['P[R] - P[L]', 'P[R] - P[L - 1]', 'P[R] + P[L]', 'P[R - 1] - P[L]'],
        correctAnswer: 1,
        explanation: 'P[R] contains the sum from index 0 to R. Subtracting P[L - 1] removes the prefix sum before index L, leaving precisely the sum from L to R.'
      },
      {
        question: 'Why does traversing a 2D matrix row-by-row execute faster than column-by-column in row-major languages?',
        options: ['Row elements are shorter', 'Compiler removes column loops', 'Hardware CPU cache line spatial locality', 'Memory addresses are random'],
        correctAnswer: 2,
        explanation: 'In row-major order, elements in the same row are adjacent in memory. The CPU cache fetches entire consecutive 64-byte lines into fast L1 cache, minimizing slow RAM cache misses.'
      }
    ]
  },

  strings: {
    id: 'strings',
    title: 'Strings',
    order: 2,
    difficulty: 'Beginner',
    estimatedTime: '45 mins',
    category: 'Linear Data Structures',
    introduction: `A string is a sequential collection of characters stored as a contiguous sequence of bytes or code points. In modern software engineering, strings represent human communication, JSON payloads, URLs, code text, and database records.

A fundamental design decision across languages is string **immutability**. In JavaScript, Python, and Java, strings cannot be mutated in place; any concatenation or replacement creates a brand-new string in memory. Understanding this behavior prevents common performance traps (like O(N^2) loop concatenations) and equips you to solve anagrams, palindromes, and pattern matching problems.`,
    learningObjectives: [
      'Understand string immutability in JS, Python, and Java versus mutable strings in C++.',
      'Implement frequency counting using fixed 26-size arrays or hash maps in O(N) time.',
      'Master palindrome verification with two-pointer techniques in O(N) time and O(1) space.',
      'Detect anagrams efficiently via frequency sorting and character count matching.',
      'Avoid quadratic O(N^2) string builder bottlenecks during loops.',
      'Write robust string algorithms across JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Arrays and 1D indexing', 'Basic ASCII/Unicode character encoding concepts'],
    coreConcepts: `### 1. Immutability and Memory Allocation
In JavaScript, Java, and Python, string objects are immutable. When you execute:
\`str += "a"\` inside a loop of length N, the computer creates a new string of length 1, then length 2, ... up to length N. Total characters copied is 1 + 2 + ... + N = O(N^2)!
- **In JS:** Use \`Array.push()\` followed by \`.join('')\`.
- **In Java:** Use \`StringBuilder\`.
- **In Python:** Use \`"".join(list_of_chars)\`.
- **In C++:** \`std::string\` is **mutable** in place with amortized O(1) \`.push_back()\`.

### 2. Character Encodings (ASCII & Unicode)
ASCII maps 128 characters (0-127). English lowercase letters 'a' through 'z' have integer codes 97 through 122.
To map any lowercase letter to an array index between 0 and 25:
\`charIndex = char.charCodeAt(0) - 'a'.charCodeAt(0)\` (or \`ord(char) - ord('a')\` in Python).
This allows using a simple \`int[26]\` frequency array instead of an overhead-heavy hash map, drastically speeding up anagram and frequency checks.

### 3. Palindromes & Two Pointers
A string is a palindrome if it reads identical forward and backward. Using two pointers (one at \`left = 0\` and one at \`right = len - 1\`), we compare characters while moving inwards. If any mismatch is found, it is not a palindrome. This runs in O(N) time and O(1) auxiliary space.

### 4. Anagram Detection
Two strings are anagrams if they contain the exact same characters with identical frequencies, rearranged.
- Approach 1: Sort both strings and compare (O(N log N) time, O(1) or O(N) space).
- Approach 2: Count character frequencies in an array of size 26 (O(N) time, O(1) space).

### 5. Substring Search & Pattern Matching
Finding if needle of length M exists inside haystack of length N:
- Brute Force: Check every starting position (O(N * M) worst case).
- Advanced Algorithms: KMP (Knuth-Morris-Pratt), Rabin-Karp (rolling hash), and Boyer-Moore achieve O(N + M) linear pattern matching.`,
    terminology: [
      { term: 'Immutability', definition: 'The property where an object state cannot be modified after it is created; modifications yield a new object.' },
      { term: 'Anagram', definition: 'A word or phrase formed by rearranging the letters of another, using all the original letters exactly once.' },
      { term: 'Palindrome', definition: 'A sequence of characters that reads the exact same backwards as forwards (e.g., "racecar").' },
      { term: 'Code Point', definition: 'The unique numerical value assigned to a character within the Unicode standard.' },
      { term: 'StringBuilder', definition: 'A mutable sequence of characters used in Java/C# to append text in amortized O(1) without quadratic copying.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Valid Anagram Check (Frequency Counter)',
        steps: [
          'Given: s = "anagram", t = "nagaram"',
          'Check length: len(s) == len(t) (both 7). If unequal, immediately return false.',
          'Initialize frequency count array of size 26: counts = [0, 0, ..., 0]',
          'Iterate through both strings simultaneously:',
          'For each character in s: increment counts[char - "a"]',
          'For each character in t: decrement counts[char - "a"]',
          'Inspect counts array: If every value is 0, every character frequency was balanced!',
          'All 26 indices are 0 -> Output: True in O(N) time and O(1) space!'
        ]
      }
    ],
    visualExample: `VALID ANAGRAM FREQUENCY ARRAY WORKFLOW

String S: "anagram"          String T: "nagaram"
Counts array of 26 slots for lowercase english letters:

Char 'a': appears 3 times in S (+3) and 3 times in T (-3) -> net count = 0
Char 'n': appears 1 time in S (+1) and 1 time in T (-1)   -> net count = 0
Char 'g': appears 1 time in S (+1) and 1 time in T (-1)   -> net count = 0
Char 'r': appears 1 time in S (+1) and 1 time in T (-1)   -> net count = 0
Char 'm': appears 1 time in S (+1) and 1 time in T (-1)   -> net count = 0

Final Count Array: [0, 0, 0, 0, 0, 0, ... 0] -> Identical! True!`,
    codeExamples: [
      {
        title: 'Valid Palindrome (Alphanumeric with Two Pointers)',
        description: 'Determines if a string is a palindrome considering only alphanumeric characters and ignoring case.',
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        timeComplexity: 'O(N) single pass',
        spaceComplexity: 'O(1) in-place pointers',
        javascript: `// JavaScript (Node.js ES6+)
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  const isAlphaNum = (ch) => /[a-zA-Z0-9]/.test(ch);

  while (left < right) {
    while (left < right && !isAlphaNum(s[left])) left++;
    while (left < right && !isAlphaNum(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

// Verification
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false`,
        python: `# Python 3.10+
def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1

    return True

# Verification
if __name__ == "__main__":
    print(is_palindrome("A man, a plan, a canal: Panama"))  # True
    print(is_palindrome("race a car"))  # False`,
        java: `// Java 17+
public class ValidPalindrome {
    public static boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }

            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // true
        System.out.println(isPalindrome("race a car")); // false
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <string>
#include <cctype>

bool isPalindrome(const std::string& s) {
    int left = 0;
    int right = static_cast<int>(s.length()) - 1;

    while (left < right) {
        while (left < right && !std::isalnum(static_cast<unsigned char>(s[left]))) {
            left++;
        }
        while (left < right && !std::isalnum(static_cast<unsigned char>(s[right]))) {
            right--;
        }

        if (std::tolower(static_cast<unsigned char>(s[left])) != 
            std::tolower(static_cast<unsigned char>(s[right]))) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

int main() {
    std::cout << std::boolalpha;
    std::cout << isPalindrome("A man, a plan, a canal: Panama") << "\\n"; // true
    std::cout << isPalindrome("race a car") << "\\n"; // false
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Character Access by Index', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Array-like indexed access' },
      { operation: 'Length Calculation', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Stored in object metadata in modern languages' },
      { operation: 'Concatenation (Immutable)', timeComplexity: 'O(N + M)', spaceComplexity: 'O(N + M)', notes: 'Must allocate new memory buffer and copy both strings' },
      { operation: 'Substring Extraction', timeComplexity: 'O(K)', spaceComplexity: 'O(K)', notes: 'Copies K characters into new string' },
      { operation: 'Two-Pointer Palindrome Check', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Single pass in-place comparison' },
      { operation: 'Anagram Frequency Check', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Fixed 26-element array allocation' }
    ],
    commonMistakes: [
      'Loop String Concatenation: Doing `str += char` inside a loop of size N costs O(N^2). Use list join or StringBuilder.',
      'Assuming ASCII only: Modern software encounters Unicode/Emojis where one glyph can span multiple code units.',
      'Comparing strings with == in Java: `str1 == str2` checks memory reference equality; use `.equals()` for value comparison.',
      'Off-by-one errors in substring bounds: Many languages take `(startIndex, endIndex)` where `endIndex` is exclusive.',
      'Modifying string parameters: In Python/JS/Java, strings are immutable so passing a string to a function cannot alter the caller variable.'
    ],
    interviewQuestions: [
      {
        question: 'Why does repeated string concatenation inside a loop cause O(N^2) complexity in Java/Python/JS?',
        answer: 'Because strings are immutable, each concatenation allocates a brand-new memory buffer of size (current_length + added_length) and copies all previous characters into it. Over N iterations, 1 + 2 + 3 + ... + N = N(N+1)/2 copies occur, resulting in quadratic O(N^2) time. StringBuilder or Array.push().join("") allocates capacity dynamically in amortized O(1).'
      },
      {
        question: 'How do you check if two strings are anagrams in O(N) time and O(1) space?',
        answer: 'Create a fixed-size integer array of length 26. Iterate through the first string and increment the count for each character (c - "a"). Simultaneously iterate through the second string and decrement the count. Finally, verify that all 26 elements are zero. Space is O(1) because 26 is a constant independent of N.'
      },
      {
        question: 'What is the Rabin-Karp algorithm and how does rolling hash work?',
        answer: 'Rabin-Karp is a string searching algorithm that uses a rolling hash function. It computes a polynomial hash for the pattern and for each sliding window of the text. When sliding the window by one character, it subtracts the outgoing character and adds the incoming character in O(1) time without recomputing the entire hash from scratch.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Valid Anagram', platform: 'LeetCode #242', focus: 'Frequency array counting' },
      { level: 'Beginner', title: 'Valid Palindrome', platform: 'LeetCode #125', focus: 'Two pointers with filtering' },
      { level: 'Intermediate', title: 'Longest Palindromic Substring', platform: 'LeetCode #5', focus: 'Expand around center / Dynamic Programming' },
      { level: 'Intermediate', title: 'Group Anagrams', platform: 'LeetCode #49', focus: 'Hash map with sorted or frequency tuple key' },
      { level: 'Advanced', title: 'Minimum Window Substring', platform: 'LeetCode #76', focus: 'Sliding window with character frequency tracking' }
    ],
    quickRevisionNotes: [
      'Strings are immutable in JS, Python, and Java; mutable in C++ (`std::string`).',
      'Use StringBuilder or Array.join("") to avoid O(N^2) loop concatenation costs.',
      'Lowercase English letters map directly to indices 0..25 via `c - "a"`.',
      'Two pointers moving inwards check palindromes in O(N) time and O(1) space.',
      'Fixed-size 26-int frequency array counts characters in O(1) auxiliary space.'
    ],
    knowledgeCheck: [
      {
        question: 'What is the time complexity of building a string of length N by executing `s = s + ch` inside a loop of N iterations in Java or Python?',
        options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(1)'],
        correctAnswer: 2,
        explanation: 'Due to string immutability, each concatenation copies all previously accumulated characters into a new memory allocation, resulting in 1 + 2 + ... + N = O(N^2) total character copies.'
      },
      {
        question: 'In Java, how should two string values be compared for content equality?',
        options: ['str1 == str2', 'str1.equals(str2)', 'str1 === str2', 'str1.compareTo(str2) == -1'],
        correctAnswer: 1,
        explanation: 'In Java, `==` compares object references (memory addresses). `str1.equals(str2)` correctly compares the sequence of characters inside the strings.'
      },
      {
        question: 'What is the auxiliary space complexity of using an integer array of size 26 to check if two strings of length N are anagrams?',
        options: ['O(N)', 'O(26) = O(1)', 'O(N^2)', 'O(log N)'],
        correctAnswer: 1,
        explanation: 'The array has 26 fixed slots regardless of how large N is. In Big-O analysis, constant space bounded by 26 is O(1).'
      }
    ]
  },

  'linked-lists': {
    id: 'linked-lists',
    title: 'Linked Lists',
    order: 3,
    difficulty: 'Beginner',
    estimatedTime: '50 mins',
    category: 'Linear Data Structures',
    introduction: `A Linked List is a linear data structure where elements (called nodes) are not stored in contiguous memory locations. Instead, each node consists of two parts: data and a reference (pointer) to the next node in the sequence.

Unlike static arrays, linked lists can grow and shrink dynamically without expensive memory reallocation. Inserting or deleting a node at the head or when a pointer is already available takes O(1) time. Linked lists are fundamental for building stacks, queues, hash table collision chains, memory free-lists in operating systems, and undo/redo buffers.`,
    learningObjectives: [
      'Contrast contiguous array memory with pointer-linked dynamic node allocation.',
      'Implement Singly, Doubly, and Circular Linked List node architectures.',
      'Master fundamental operations: insertion, deletion, and searching.',
      'Reverse a linked list iteratively and recursively in O(N) time and O(1) space.',
      'Apply Floyd Cycle-Finding Algorithm (Fast & Slow pointers) to detect loops in O(N) time.',
      'Find the middle node and merge two sorted linked lists cleanly in all four languages.'
    ],
    prerequisites: ['Pointers and reference variables in computer memory', 'Basic classes and object creation'],
    coreConcepts: `### 1. Structure of a Node
Each node in a Singly Linked List holds a \`val\` and a \`next\` pointer:
\`class ListNode { int val; ListNode next; }\`
The list begins at a \`head\` pointer and terminates when a node points to \`null\` / \`nullptr\` / \`None\`.

### 2. Types of Linked Lists
- **Singly Linked List:** Each node points only to the next node. Forward traversal only.
- **Doubly Linked List:** Each node contains both \`next\` and \`prev\` pointers. Allows bidirectional traversal and O(1) node deletion given a pointer to that node.
- **Circular Linked List:** The last node's \`next\` pointer loops back to the \`head\` instead of pointing to null.

### 3. Insertion and Deletion
- **Insertion at Head:** Create new node, set \`newNode.next = head\`, update \`head = newNode\`. Cost: O(1).
- **Deletion at Head:** Update \`head = head.next\`. Cost: O(1).
- **Insertion/Deletion at arbitrary index k:** Must traverse k nodes to find the predecessor node. Cost: O(k) = O(N).

### 4. Linked List Reversal
To reverse a singly linked list in-place:
Maintain three pointers: \`prev = null\`, \`curr = head\`, \`next = null\`.
In each step:
1. Save \`next = curr.next\`
2. Reverse pointer: \`curr.next = prev\`
3. Advance \`prev = curr\`
4. Advance \`curr = next\`
When \`curr\` becomes null, \`prev\` is the new head! Time: O(N), Space: O(1).

### 5. Floyd's Cycle Detection (Tortoise and Hare)
To detect if a linked list contains a cycle:
Initialize two pointers: \`slow = head\` and \`fast = head\`.
Move \`slow\` by 1 step (\`slow = slow.next\`) and \`fast\` by 2 steps (\`fast = fast.next.next\`).
- If \`fast\` reaches null, there is no cycle.
- If \`slow === fast\` at any point, a cycle exists! Time: O(N), Space: O(1).`,
    terminology: [
      { term: 'Head', definition: 'The pointer to the very first node in the linked list.' },
      { term: 'Tail', definition: 'The final node in the linked list whose next pointer is null.' },
      { term: 'Sentinel / Dummy Node', definition: 'A placeholder node placed before the head to simplify edge-case insertions and deletions.' },
      { term: 'Dereference', definition: 'Accessing the value stored at a pointer memory address (e.g., node.next).' },
      { term: 'Memory Leak', definition: 'Failing to deallocate or unreference nodes in unmanaged languages (C/C++), consuming RAM.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step In-Place List Reversal',
        steps: [
          'Initial List: 1 -> 2 -> 3 -> null',
          'Pointers initialized: prev = null, curr = Node(1)',
          'Iteration 1: next = Node(2); curr.next = null; prev = Node(1); curr = Node(2)',
          'Iteration 2: next = Node(3); curr.next = Node(1); prev = Node(2); curr = Node(3)',
          'Iteration 3: next = null; curr.next = Node(2); prev = Node(3); curr = null',
          'curr is now null. Loop terminates.',
          'Return prev: 3 -> 2 -> 1 -> null. Fully reversed in O(N) time and O(1) space!'
        ]
      }
    ],
    visualExample: `LINKED LIST REVERSAL POINTER TRANSITION

Initial State:
prev (null)    curr (1) ----> (2) ----> (3) ----> null

Step 1:
prev (null) <-- [1]          curr [2] ----> [3] ----> null

Step 2:
null <-- [1] <-- [2]         curr [3] ----> null

Step 3:
null <-- [1] <-- [2] <-- [3] (prev)        curr (null)

Result: Return prev as new Head! (3 -> 2 -> 1 -> null)`,
    codeExamples: [
      {
        title: 'Reverse a Singly Linked List',
        description: 'Reverses a singly linked list in-place using three pointers in O(N) time and O(1) auxiliary space.',
        input: 'head = [1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        timeComplexity: 'O(N) linear pass',
        spaceComplexity: 'O(1) in-place auxiliary space',
        javascript: `// JavaScript (Node.js ES6+)
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextTemp = curr.next; // 1. Save next
    curr.next = prev;          // 2. Reverse link
    prev = curr;               // 3. Move prev forward
    curr = nextTemp;           // 4. Move curr forward
  }
  return prev; // New head of reversed list
}

// Verification helper
const list = new ListNode(1, new ListNode(2, new ListNode(3)));
let rev = reverseList(list);
const res = [];
while (rev) { res.push(rev.val); rev = rev.next; }
console.log("Reversed list:", res); // [3, 2, 1]`,
        python: `# Python 3.10+
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head: ListNode | None) -> ListNode | None:
    prev = None
    curr = head

    while curr is not None:
        next_temp = curr.next  # 1. Save next
        curr.next = prev       # 2. Reverse link
        prev = curr            # 3. Move prev forward
        curr = next_temp       # 4. Move curr forward

    return prev  # New head

# Verification
if __name__ == "__main__":
    node3 = ListNode(3)
    node2 = ListNode(2, node3)
    node1 = ListNode(1, node2)
    rev = reverse_list(node1)
    res = []
    while rev:
        res.append(rev.val)
        rev = rev.next
    print("Reversed list:", res)  # [3, 2, 1]`,
        java: `// Java 17+
public class ReverseLinkedList {
    public static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
        ListNode(int val, ListNode next) { this.val = val; this.next = next; }
    }

    public static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode nextTemp = curr.next; // 1. Save next
            curr.next = prev;             // 2. Reverse link
            prev = curr;                  // 3. Move prev forward
            curr = nextTemp;              // 4. Move curr forward
        }
        return prev;
    }

    public static void main(String[] args) {
        ListNode head = new ListNode(1, new ListNode(2, new ListNode(3)));
        ListNode rev = reverseList(head);
        while (rev != null) {
            System.out.print(rev.val + " "); // 3 2 1
            rev = rev.next;
        }
        System.out.println();
    }
}`,
        cpp: `// C++ 20
#include <iostream>

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode* n) : val(x), next(n) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;

    while (curr != nullptr) {
        ListNode* nextTemp = curr->next; // 1. Save next
        curr->next = prev;              // 2. Reverse link
        prev = curr;                    // 3. Move prev
        curr = nextTemp;                // 4. Move curr
    }
    return prev;
}

int main() {
    ListNode* head = new ListNode(1, new ListNode(2, new ListNode(3)));
    ListNode* rev = reverseList(head);
    while (rev != nullptr) {
        std::cout << rev->val << " "; // 3 2 1
        rev = rev->next;
    }
    std::cout << "\\n";
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Prepend (Insert at Head)', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Just re-point new node next to head' },
      { operation: 'Delete at Head', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Advance head pointer by one' },
      { operation: 'Search by Value', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Must traverse from head sequentially' },
      { operation: 'Access by Index k', timeComplexity: 'O(k)', spaceComplexity: 'O(1)', notes: 'No random access; must follow pointers k times' },
      { operation: 'Append (without tail pointer)', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Must walk to the end node' },
      { operation: 'Append (with tail pointer)', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Direct pointer link update' }
    ],
    commonMistakes: [
      'NullPointerExceptions: Attempting to read `curr.next.val` when `curr.next` is null crashes the runtime.',
      'Losing Reference to Remaining Nodes: Overwriting `curr.next` before caching the remaining list permanently disconnects all downstream nodes.',
      'Forgetting Dummy/Sentinel Nodes: Not using a dummy node requires writing duplicate edge-case code for inserting or deleting the head.',
      'Infinite Loops in Circular / Cycled Lists: Standard while(curr != null) loops run forever if a cycle exists. Use Floyd detection.',
      'Memory Leaks in C++: Deleting a node pointer without updating neighboring pointers or freeing unused nodes causes memory leaks.'
    ],
    interviewQuestions: [
      {
        question: 'Why does Floyd Cycle-Finding Algorithm guarantee the fast and slow pointers will meet if a loop exists?',
        answer: 'Once both pointers enter the cycle of length C, each iteration fast moves 2 steps and slow moves 1 step. The distance between fast and slow decreases by exactly 1 step per iteration: (distance - 1) % C. Because the gap reduces by 1 continuously, it must eventually reach 0 without jumping over the slow pointer.'
      },
      {
        question: 'What is a Dummy (Sentinel) Node and why is it best practice in linked list problems?',
        answer: 'A dummy node is a temporary node placed before the true head (dummy.next = head). It eliminates special-case checks when inserting or deleting at the head, because the head now has a guaranteed preceding node (dummy). At the end, you simply return dummy.next.'
      },
      {
        question: 'How do you find the middle of a linked list in a single pass?',
        answer: 'Use fast and slow pointers. Both start at head. While fast and fast.next are non-null, advance slow by 1 step and fast by 2 steps. When fast reaches the end (null or last node), slow is guaranteed to be at the exact middle node.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Reverse Linked List', platform: 'LeetCode #206', focus: 'Three pointer manipulation' },
      { level: 'Beginner', title: 'Middle of the Linked List', platform: 'LeetCode #876', focus: 'Fast & slow pointers' },
      { level: 'Intermediate', title: 'Linked List Cycle', platform: 'LeetCode #141', focus: 'Floyd cycle detection' },
      { level: 'Intermediate', title: 'Merge Two Sorted Lists', platform: 'LeetCode #21', focus: 'Dummy node & iterative splicing' },
      { level: 'Advanced', title: 'Reverse Nodes in k-Group', platform: 'LeetCode #25', focus: 'Sub-list reversal & pointer maintenance' }
    ],
    quickRevisionNotes: [
      'Linked lists store elements in non-contiguous nodes linked by references.',
      'Insertion/deletion at head is O(1); access by index is O(N).',
      'Use a dummy node (`dummy.next = head`) to eliminate head edge cases.',
      'Reversal requires three pointers: `prev`, `curr`, and `nextTemp`.',
      'Floyd Tortoise & Hare uses 1-step and 2-step pointers to detect cycles in O(N) time and O(1) space.'
    ],
    knowledgeCheck: [
      {
        question: 'What is the worst-case time complexity to search for an element in a singly linked list of size N?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
        correctAnswer: 2,
        explanation: 'Because linked list nodes are scattered in memory without indices, finding an element requires traversing from the head sequentially, which takes O(N) time.'
      },
      {
        question: 'In Floyd Cycle Detection, if the slow pointer moves 1 step per cycle, how many steps does the fast pointer move?',
        options: ['1 step', '2 steps', '3 steps', 'N steps'],
        correctAnswer: 1,
        explanation: 'Fast moves 2 steps while slow moves 1 step, shrinking the relative distance between them inside a cycle by 1 step every tick until they collide.'
      },
      {
        question: 'Why is a Dummy Node (Sentinel) utilized when merging two linked lists?',
        options: ['To allocate extra memory', 'To speed up CPU clock speed', 'To avoid null checks when initializing the new merged head', 'To reverse the lists automatically'],
        correctAnswer: 2,
        explanation: 'A dummy node provides a concrete non-null node to attach elements to, avoiding separate logic for setting the initial head pointer.'
      }
    ]
  },

  stacks: {
    id: 'stacks',
    title: 'Stacks',
    order: 4,
    difficulty: 'Beginner',
    estimatedTime: '45 mins',
    category: 'Linear Data Structures',
    introduction: `A Stack is an abstract linear data structure that adheres strictly to the **LIFO (Last In, First Out)** principle. The last element added to the stack is the first one to be removed. Think of a physical stack of dinner plates: you place new plates on top, and you remove plates from the top.

Stacks are omnipresent across software systems. The runtime execution call stack tracks active function invocations, local variables, and return addresses. Stacks power browser back-button history, text editor undo/redo engines, arithmetic expression evaluation (Reverse Polish Notation), and syntax parsing in compilers.`,
    learningObjectives: [
      'Understand the LIFO principle and core operations: push, pop, peek, and isEmpty.',
      'Implement stacks using both dynamic arrays and singly linked lists.',
      'Solve classic parenthesis and delimiter balancing problems in O(N) time.',
      'Evaluate infix, postfix, and prefix arithmetic expressions.',
      'Master the Monotonic Stack pattern for Next Greater Element problems in linear time.',
      'Implement stacks cleanly in JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Arrays and Dynamic Arrays', 'Linked Lists basics'],
    coreConcepts: `### 1. The LIFO Principle & Core Operations
All stack operations occur exclusively at one designated end called the **top**:
- **push(x):** Adds element x onto the top of the stack (O(1)).
- **pop():** Removes and returns the top element (O(1)). Throws error or returns null if empty.
- **peek() / top():** Inspects the top element without removing it (O(1)).
- **isEmpty():** Returns true if the stack contains zero elements (O(1)).

### 2. Implementation Approaches
- **Array-based Stack:** Uses a dynamic array. Appending to the end is \`push\`, removing the last element is \`pop\`. Highly cache-friendly and compact.
- **Linked List-based Stack:** Maintains a \`head\` pointer. Pushing prepends to the head; popping removes the head. Guaranteed O(1) without dynamic array doubling.

### 3. Balanced Parentheses Matching
A classic stack use case: Verify brackets \`()\`, \`{}\`, \`[]\` match and close in proper order.
Iterate through the string:
- If an opening bracket is found, push it onto the stack.
- If a closing bracket is found, inspect the stack. If empty or top bracket doesn't match the closing type, return false. Pop the matched opening bracket.
- At the end, return \`stack.isEmpty()\`. Time: O(N), Space: O(N).

### 4. Monotonic Stacks
A Monotonic Stack maintains elements in strictly increasing or decreasing order. When a new element violates the monotonicity, elements are popped until the condition is restored.
This solves **Next Greater Element** and **Largest Rectangle in Histogram** in O(N) total time because every element is pushed and popped at most once!`,
    terminology: [
      { term: 'LIFO', definition: 'Last In, First Out: the fundamental principle where the most recently added item is the first to be removed.' },
      { term: 'Top', definition: 'The active end of the stack where all pushes, pops, and peeks occur.' },
      { term: 'Stack Overflow', definition: 'An error condition occurring when attempting to push onto a full stack or exceeding the call stack recursion limit.' },
      { term: 'Stack Underflow', definition: 'An error condition occurring when attempting to pop or peek from an empty stack.' },
      { term: 'Monotonic Stack', definition: 'A stack whose elements are always sorted in either strictly non-decreasing or non-increasing order.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Valid Parentheses Check: "{[()]}"',
        steps: [
          'Input string: "{[()]}"',
          'Char 0: "{" (opening) -> push to stack. Stack: ["{"]',
          'Char 1: "[" (opening) -> push to stack. Stack: ["{", "["]',
          'Char 2: "(" (opening) -> push to stack. Stack: ["{", "[", "("]',
          'Char 3: ")" (closing) -> top is "(", matches! Pop "(". Stack: ["{", "["]',
          'Char 4: "]" (closing) -> top is "[", matches! Pop "[". Stack: ["{"]',
          'Char 5: "}" (closing) -> top is "{", matches! Pop "{". Stack: []',
          'End of string reached. Stack is empty -> Valid brackets: returns true!'
        ]
      }
    ],
    visualExample: `STACK (LIFO) VISUALIZATION: PUSH AND POP

push(10)       push(20)       push(30)       pop() -> returns 30
                                | 30 | (top)
                 | 20 | (top)   | 20 |         | 20 | (new top)
  | 10 | (top)   | 10 |         | 10 |         | 10 |
  +----+         +----+         +----+         +----+`,
    codeExamples: [
      {
        title: 'Valid Parentheses Validator',
        description: 'Determines if an input string of brackets (), {}, [] is valid using a stack in O(N) time and O(N) space.',
        input: 's = "{[()]}"',
        output: 'true',
        timeComplexity: 'O(N) single pass',
        spaceComplexity: 'O(N) stack storage',
        javascript: `// JavaScript (Node.js ES6+)
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (map[char]) {
      if (stack.length === 0 || stack[stack.length - 1] !== map[char]) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
}

// Verification
console.log(isValid("{[()]}")); // true
console.log(isValid("([)]"));   // false`,
        python: `# Python 3.10+
def is_valid(s: str) -> bool:
    stack = []
    bracket_map = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in bracket_map.values():
            stack.append(char)
        elif char in bracket_map:
            if not stack or stack[-1] != bracket_map[char]:
                return False
            stack.pop()

    return len(stack) == 0

# Verification
if __name__ == "__main__":
    print(is_valid("{[()]}"))  # True
    print(is_valid("([)]"))    # False`,
        java: `// Java 17+
import java.util.ArrayDeque;
import java.util.Deque;

public class ValidParentheses {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else {
                if (stack.isEmpty() || stack.pop() != c) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(isValid("{[()]}")); // true
        System.out.println(isValid("([)]"));   // false
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <stack>
#include <string>

bool isValid(const std::string& s) {
    std::stack<char> st;

    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else {
            if (st.empty() || st.top() != c) {
                return false;
            }
            st.pop();
        }
    }
    return st.empty();
}

int main() {
    std::cout << std::boolalpha;
    std::cout << isValid("{[()]}") << "\\n"; // true
    std::cout << isValid("([)]") << "\\n";   // false
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'push(x)', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Appends to top of stack' },
      { operation: 'pop()', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Removes top element' },
      { operation: 'peek() / top()', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Inspects top element' },
      { operation: 'isEmpty()', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Checks if size == 0' },
      { operation: 'Search / Arbitrary Access', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', notes: 'Violates stack contract; requires popping elements' }
    ],
    commonMistakes: [
      'Popping from an empty stack: Calling pop() without checking isEmpty() causes stack underflow errors.',
      'Using java.util.Stack in Java: The legacy Stack class inherits from Vector and has synchronization overhead. Use ArrayDeque instead.',
      'Forgetting to check if stack is empty at end: For input "(((", if you never check `stack.isEmpty()`, it erroneously passes.',
      'Confusing LIFO with FIFO: Popping yields the MOST RECENT element, not the oldest element.',
      'Uncontrolled recursion: Recursive calls consume stack frames; deep recursion causes Call Stack Overflow.'
    ],
    interviewQuestions: [
      {
        question: 'How can you implement a Min-Stack that retrieves the minimum element in O(1) time?',
        answer: 'Maintain two parallel stacks: the main stack for all values, and a minStack that stores the current minimum at each step. When pushing x, push min(x, minStack.peek()) onto minStack. When popping, pop from both stacks simultaneously. The top of minStack always holds the minimum in O(1) time.'
      },
      {
        question: 'What is a Monotonic Stack and what class of problems does it solve?',
        answer: 'A monotonic stack maintains elements in strictly ascending or descending order. It solves the Next Greater Element, Previous Greater Element, and Daily Temperatures problems in O(N) total time because every item is pushed and popped at most once.'
      },
      {
        question: 'How do compilers use stacks to evaluate arithmetic expressions?',
        answer: 'Compilers convert Infix expressions (e.g. 3 + 4 * 2) into Postfix/RPN (3 4 2 * +) using the Shunting-Yard algorithm. During evaluation, operands are pushed onto a stack. When an operator is encountered, the top two operands are popped, evaluated, and the result is pushed back.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Valid Parentheses', platform: 'LeetCode #20', focus: 'Bracket matching' },
      { level: 'Beginner', title: 'Min Stack', platform: 'LeetCode #155', focus: 'Auxiliary min tracking' },
      { level: 'Intermediate', title: 'Daily Temperatures', platform: 'LeetCode #739', focus: 'Monotonic stack' },
      { level: 'Intermediate', title: 'Evaluate Reverse Polish Notation', platform: 'LeetCode #150', focus: 'Expression evaluation' },
      { level: 'Advanced', title: 'Largest Rectangle in Histogram', platform: 'LeetCode #84', focus: 'Monotonic stack boundary analysis' }
    ],
    quickRevisionNotes: [
      'Stack is LIFO: Last In, First Out.',
      'All operations (push, pop, peek, isEmpty) execute in O(1) time.',
      'In Java, prefer `ArrayDeque` over legacy `java.util.Stack`.',
      'Balanced brackets: push opening brackets, pop and match on closing brackets.',
      'Monotonic stacks solve Next Greater Element problems in O(N) linear time.'
    ],
    knowledgeCheck: [
      {
        question: 'What is the time complexity of the peek() operation on a stack containing N elements?',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N^2)'],
        correctAnswer: 2,
        explanation: 'The peek() operation only inspects the top element without searching or shifting elements, taking constant O(1) time.'
      },
      {
        question: 'Which of the following is NOT a LIFO application?',
        options: ['Function call stack', 'Undo operation in text editors', 'Breadth-First Search (BFS)', 'Browser back button history'],
        correctAnswer: 2,
        explanation: 'Breadth-First Search (BFS) processes nodes level-by-level in FIFO order and requires a Queue, not a Stack (which is used for DFS).'
      },
      {
        question: 'If elements [1, 2, 3] are pushed onto a stack in that order, what is the order of elements returned by three successive pop() operations?',
        options: ['1, 2, 3', '3, 2, 1', '2, 1, 3', '3, 1, 2'],
        correctAnswer: 1,
        explanation: 'Because stacks follow Last In, First Out (LIFO), 3 was pushed last, so it is popped first, followed by 2, and finally 1.'
      }
    ]
  },

  queues: {
    id: 'queues',
    title: 'Queues',
    order: 5,
    difficulty: 'Beginner',
    estimatedTime: '45 mins',
    category: 'Linear Data Structures',
    introduction: `A Queue is an abstract linear data structure governed by the **FIFO (First In, First Out)** principle. The first element added to the queue is the first one to be removed. Think of a line of people waiting for a bus: the person who arrives first is served first.

Queues are essential in asynchronous processing and distributed architectures. Operating systems use queues for CPU process scheduling (Round-Robin) and IO disk request buffering. Web architectures rely on message queues (RabbitMQ, Kafka, AWS SQS) for decoupling microservices, and graph algorithms use queues as the core engine for Breadth-First Search (BFS).`,
    learningObjectives: [
      'Understand the FIFO principle and core operations: enqueue, dequeue, peek, and isEmpty.',
      'Implement Circular Queues to overcome array shifting limitations.',
      'Distinguish between Simple Queue, Deque (Double-Ended Queue), and Priority Queue.',
      'Implement Breadth-First Search (BFS) on trees and graphs using a queue.',
      'Implement a Queue using two Stacks.',
      'Write robust queue code across JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Arrays and modulo arithmetic', 'Linked lists basics'],
    coreConcepts: `### 1. The FIFO Principle & Core Operations
Operations occur at two distinct ends: **rear** (back) and **front** (head):
- **enqueue(x):** Appends element x to the rear of the queue (O(1)).
- **dequeue():** Removes and returns the front element (O(1)).
- **peek() / front():** Reads the front element without removing it (O(1)).
- **isEmpty():** Returns true if queue has 0 elements (O(1)).

### 2. Implementation Gotchas: Array Shifting vs. Circular Queue
In an array, dequeuing index 0 requires shifting all remaining elements left by 1 position (O(N) time).
- **Circular Queue:** Maintains \`front\` and \`rear\` indices that wrap around using modulo arithmetic: \`rear = (rear + 1) % capacity\`. Both enqueue and dequeue are guaranteed O(1)!
- **Linked List Queue:** Maintains both \`head\` (front) and \`tail\` (rear) pointers. Enqueue appends to tail (O(1)); dequeue removes head (O(1)).

### 3. Deque (Double-Ended Queue)
A Deque allows insertion and deletion at both the front and rear in O(1) time:
- \`push_front()\`, \`pop_front()\`, \`push_back()\`, \`pop_back()\`.
- Powers sliding window maximum algorithms and bidirectional search.

### 4. Priority Queue
Elements are popped according to priority (highest or lowest key), not insertion order. Internally backed by a binary heap, with O(log N) insertion and O(log N) deletion.

### 5. Breadth-First Search (BFS)
Queues are the foundational data structure for BFS traversal:
1. Enqueue root node.
2. While queue is not empty: dequeue current node, process it, and enqueue all unvisited neighbors.
3. This explores graphs level-by-level and guarantees finding the shortest path in unweighted graphs.`,
    terminology: [
      { term: 'FIFO', definition: 'First In, First Out: the first element inserted is the first element removed.' },
      { term: 'Front / Head', definition: 'The location where elements are dequeued (removed).' },
      { term: 'Rear / Back', definition: 'The location where new elements are enqueued (inserted).' },
      { term: 'Circular Queue', definition: 'A queue implementation utilizing modulo math to reuse vacated memory slots at the front of an array.' },
      { term: 'Deque', definition: 'Double-Ended Queue: supports O(1) insertion and deletion at both ends.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Circular Queue Modulo Indexing',
        steps: [
          'Capacity = 5. Array initialized: [null, null, null, null, null], front = 0, rear = 0, size = 0',
          'enqueue(10): arr[rear=0] = 10; rear = (0+1)%5 = 1; size = 1',
          'enqueue(20): arr[rear=1] = 20; rear = (1+1)%5 = 2; size = 2',
          'enqueue(30): arr[rear=2] = 30; rear = (2+1)%5 = 3; size = 3',
          'dequeue(): returns arr[front=0]=10; front = (0+1)%5 = 1; size = 2',
          'dequeue(): returns arr[front=1]=20; front = (1+1)%5 = 2; size = 1',
          'enqueue(40), enqueue(50), enqueue(60): rear wraps around index 0 via (4+1)%5 = 0!',
          'Vacated spaces at the beginning are recycled without shifting! All operations O(1)!'
        ]
      }
    ],
    visualExample: `QUEUE (FIFO) VS CIRCULAR QUEUE

Simple Queue:
ENQUEUE ---> [ 30 | 20 | 10 ] ---> DEQUEUE
             (Rear)      (Front)
             
Circular Queue (Capacity = 5):
                 [0] = 60 (rear)
            /                 \\
   [4] = 50                     [1] = null (vacated)
          \\                   /
            [3] = 40     [2] = 30 (front)

Front pointer moves clockwise; Rear pointer wraps around using: (index + 1) % Capacity`,
    codeExamples: [
      {
        title: 'Implement Queue Using Stacks',
        description: 'Implements a FIFO queue using two LIFO stacks with amortized O(1) push and pop operations.',
        input: 'enqueue(1), enqueue(2), peek(), dequeue(), isEmpty()',
        output: 'peek: 1, dequeue: 1, isEmpty: false',
        timeComplexity: 'O(1) amortized per operation',
        spaceComplexity: 'O(N) across two stacks',
        javascript: `// JavaScript (Node.js ES6+)
class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  push(x) {
    this.inStack.push(x);
  }

  pop() {
    this.peek();
    return this.outStack.pop();
  }

  peek() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack[this.outStack.length - 1];
  }

  empty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}

// Verification
const q = new MyQueue();
q.push(1);
q.push(2);
console.log("Peek:", q.peek());   // 1
console.log("Pop:", q.pop());     // 1
console.log("Empty:", q.empty()); // false`,
        python: `# Python 3.10+
class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def push(self, x: int) -> None:
        self.in_stack.append(x)

    def pop(self) -> int:
        self.peek()
        return self.out_stack.pop()

    def peek(self) -> int:
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]

    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack

# Verification
if __name__ == "__main__":
    q = MyQueue()
    q.push(1)
    q.push(2)
    print("Peek:", q.peek())   # 1
    print("Pop:", q.pop())     # 1
    print("Empty:", q.empty()) # False`,
        java: `// Java 17+
import java.util.ArrayDeque;
import java.util.Deque;

public class MyQueue {
    private final Deque<Integer> inStack = new ArrayDeque<>();
    private final Deque<Integer> outStack = new ArrayDeque<>();

    public void push(int x) {
        inStack.push(x);
    }

    public int pop() {
        peek();
        return outStack.pop();
    }

    public int peek() {
        if (outStack.isEmpty()) {
            while (!inStack.isEmpty()) {
                outStack.push(inStack.pop());
            }
        }
        return outStack.peek();
    }

    public boolean empty() {
        return inStack.isEmpty() && outStack.isEmpty();
    }

    public static void main(String[] args) {
        MyQueue q = new MyQueue();
        q.push(1);
        q.push(2);
        System.out.println("Peek: " + q.peek());   // 1
        System.out.println("Pop: " + q.pop());     // 1
        System.out.println("Empty: " + q.empty()); // false
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <stack>

class MyQueue {
private:
    std::stack<int> inStack;
    std::stack<int> outStack;

    void transfer() {
        if (outStack.empty()) {
            while (!inStack.empty()) {
                outStack.push(inStack.top());
                inStack.pop();
            }
        }
    }
public:
    void push(int x) {
        inStack.push(x);
    }

    int pop() {
        transfer();
        int val = outStack.top();
        outStack.pop();
        return val;
    }

    int peek() {
        transfer();
        return outStack.top();
    }

    bool empty() {
        return inStack.empty() && outStack.empty();
    }
};

int main() {
    std::cout << std::boolalpha;
    MyQueue q;
    q.push(1);
    q.push(2);
    std::cout << "Peek: " << q.peek() << "\\n";   // 1
    std::cout << "Pop: " << q.pop() << "\\n";     // 1
    std::cout << "Empty: " << q.empty() << "\\n"; // false
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'enqueue(x)', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Appends to rear' },
      { operation: 'dequeue()', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Removes from front (Circular queue / LL)' },
      { operation: 'peek() / front()', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Inspects front item' },
      { operation: 'isEmpty()', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Checks if size == 0' },
      { operation: 'Array shift() in JS / Python pop(0)', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Avoid in production loops; shifts all N elements' }
    ],
    commonMistakes: [
      'Using Python list pop(0) or JS Array shift(): `list.pop(0)` takes O(N) because it shifts all remaining elements. Use `collections.deque` in Python.',
      'Circular Queue capacity off-by-one: Confusing full condition `(rear + 1) % cap == front` vs tracking an explicit `size` counter.',
      'Confusing FIFO (Queue) and LIFO (Stack): Enqueuing adds to back; dequeuing takes from front.',
      'Queue Underflow: Calling dequeue() or peek() without verifying isEmpty() throws runtime exceptions.',
      'Memory bloat in unmanaged queues: In manual linked-list queues, failing to free dequeued nodes causes memory leakage.'
    ],
    interviewQuestions: [
      {
        question: 'Why does implementing a Queue using two Stacks achieve amortized O(1) for pop() and peek()?',
        answer: 'Each element is pushed to inStack once, popped from inStack once, pushed to outStack once, and popped from outStack once. Over its entire lifetime in the queue, an element undergoes exactly 4 stack operations. Therefore, the amortized cost per operation across N elements is 4N / N = O(1).'
      },
      {
        question: 'What is the advantage of a Circular Queue over a simple dynamic array queue?',
        answer: 'In a simple array queue, dequeuing elements leaves empty unused memory at the beginning. Reclaiming that space requires shifting all elements left in O(N) time. A circular queue uses modulo arithmetic `(index + 1) % capacity` to wrap pointers around, reusing vacated front slots in O(1) without shifting.'
      },
      {
        question: 'Why does Breadth-First Search (BFS) guarantee the shortest path in unweighted graphs?',
        answer: 'Because a Queue is FIFO, BFS processes all nodes at distance d before touching any node at distance d + 1. The first time the destination node is dequeued, it is guaranteed to have been reached along the minimum possible number of edges.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Implement Queue using Stacks', platform: 'LeetCode #232', focus: 'Two stack amortization' },
      { level: 'Beginner', title: 'Design Circular Queue', platform: 'LeetCode #622', focus: 'Modulo index management' },
      { level: 'Intermediate', title: 'Binary Tree Level Order Traversal', platform: 'LeetCode #102', focus: 'BFS with queue' },
      { level: 'Intermediate', title: 'Sliding Window Maximum', platform: 'LeetCode #239', focus: 'Monotonic double-ended queue (Deque)' },
      { level: 'Advanced', title: 'Shortest Path in Binary Matrix', platform: 'LeetCode #1091', focus: 'Matrix BFS with queue coordinates' }
    ],
    quickRevisionNotes: [
      'Queue is FIFO: First In, First Out.',
      'Enqueue adds to rear; Dequeue removes from front.',
      'Avoid `Array.shift()` in JS and `list.pop(0)` in Python (O(N) cost). Use `deque`.',
      'Circular queues reuse slots with `(index + 1) % capacity`.',
      'BFS uses queues to guarantee shortest paths in unweighted graphs.'
    ],
    knowledgeCheck: [
      {
        question: 'What is the time complexity of dequeuing from a simple array of size N when removing index 0 without circular indexing?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
        correctAnswer: 2,
        explanation: 'Removing index 0 requires shifting all remaining N - 1 elements left by one position, taking O(N) linear time.'
      },
      {
        question: 'In Python, what is the recommended data structure for high-performance O(1) append and popleft operations?',
        options: ['list', 'collections.deque', 'queue.LifoQueue', 'tuple'],
        correctAnswer: 1,
        explanation: 'Python `collections.deque` is implemented as a doubly-linked list of memory blocks, providing true O(1) appends and pops from both ends.'
      },
      {
        question: 'Which graph traversal algorithm fundamentally relies on a FIFO Queue?',
        options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'Topological Sort via DFS', 'Tarjan SCC'],
        correctAnswer: 1,
        explanation: 'BFS explores graph nodes in increasing order of distance from the source level-by-level, requiring a FIFO Queue.'
      }
    ]
  }
};
