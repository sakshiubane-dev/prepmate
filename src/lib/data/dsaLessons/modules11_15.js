/**
 * DSA Modules 11 to 15: Tries, Recursion, Backtracking, Greedy Algorithms, Dynamic Programming
 * Complete educational lesson content following the PrepMate Lesson Schema.
 */

export const MODULES_11_15 = {
  tries: {
    id: 'tries',
    title: 'Tries',
    order: 11,
    difficulty: 'Intermediate',
    estimatedTime: '45 mins',
    category: 'Tree-Based Structures',
    introduction: `A Trie (pronounced "try", from re**trie**val), also known as a **Prefix Tree**, is a specialized tree-like data structure used for storing and searching dynamic sets of strings. Unlike standard binary search trees where each node stores a full key, a Trie node stores individual characters, and keys are defined by paths traversed from the root down to marked terminal nodes.

Tries excel at string search and prefix matching. While a Hash Map can check if an entire string exists in average O(L) time, it cannot efficiently find all words sharing a common prefix (e.g. all words starting with "app"). Tries provide **O(L) deterministic prefix searches**, powering search engine autocomplete, spell checkers, IP routing tables (longest prefix matching), and T9 predictive texting.`,
    learningObjectives: [
      'Understand TrieNode architecture: child pointers array/map and the `isEndOfWord` boolean flag.',
      'Implement `insert`, `search`, and `startsWith` operations in O(L) time where L is word length.',
      'Analyze space trade-offs between static 26-element pointer arrays and dynamic hash maps.',
      'Build search autocomplete and prefix-matching algorithms.',
      'Solve Word Search II / Boggle board problems combining Tries and Backtracking.',
      'Implement a production-ready Trie across JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Trees and tree traversals', 'Strings and character ASCII indexing'],
    coreConcepts: `### 1. The Structure of a TrieNode
Each TrieNode contains:
1. \`children\`: A collection of pointers to child nodes. For lowercase English letters 'a'..'z', this is typically a fixed array \`TrieNode[26]\` or a hash map.
2. \`isEndOfWord\`: A boolean flag that indicates whether a complete word terminates at this specific node.

### 2. Insertion
To insert a word of length $L$:
1. Start at the \`root\` node.
2. For each character $c$ in the word, calculate index: \`c.charCodeAt(0) - 97\`.
3. If \`curr.children[index]\` is null, create a new \`TrieNode\`.
4. Advance \`curr = curr.children[index]\`.
5. After the loop, set \`curr.isEndOfWord = true\`. Time: O(L), Space: O(L) worst case.

### 3. Exact Word Search
1. Start at the \`root\`.
2. Trace each character through the children. If any pointer is null, the word does not exist -> return \`false\`.
3. After exhausting all characters, return \`curr.isEndOfWord\`. (If \`isEndOfWord\` is false, the query string is merely a prefix, not a complete stored word).

### 4. Prefix Matching (\`startsWith\`)
Identical to word search, except when all characters in the prefix are matched, return \`true\` immediately regardless of whether \`curr.isEndOfWord\` is true or false!

### 5. Memory Optimization
A naive Trie with \`TrieNode[26]\` consumes $26 \\times 8 = 208$ bytes per node in 64-bit systems, even if most pointers are null. For sparse alphabets or Unicode, using a Hash Map \`Map<Character, TrieNode>\` or Compressed Trie (Radix Tree) saves significant RAM.`,
    terminology: [
      { term: 'Prefix Tree', definition: 'Another name for a Trie; emphasizes that all descendants of a node share a common prefix.' },
      { term: 'Terminal Node', definition: 'A node marked with isEndOfWord = true, signaling the completion of a valid dictionary word.' },
      { term: 'Radix Tree (Compressed Trie)', definition: 'An optimized Trie where single-child chains are merged into single edges containing multi-character strings.' },
      { term: 'Longest Prefix Match', definition: 'The algorithm used in network IP routers to find the most specific routing table entry.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Trie Insertion: "app" and "apple"',
        steps: [
          'Initialize root node with isEndOfWord = false',
          'Insert "app":',
          'Root -> Child["a"] -> Child["p"] -> Child["p"]',
          'Mark node for second "p" as isEndOfWord = true.',
          'Insert "apple":',
          'Follow existing path: "a" -> "p" -> "p" (reused existing nodes!)',
          'From "p", create Child["l"] -> create Child["e"]',
          'Mark "e" as isEndOfWord = true.',
          'Both "app" and "apple" coexist efficiently sharing the first 3 nodes!'
        ]
      }
    ],
    visualExample: `TRIE (PREFIX TREE) ARCHITECTURE

             [ ROOT ]
            /        \\
         ['a']       ['b']
          |            |
         ['p']       ['a']
          |            |
         ['p']*       ['t']*   <-- * denotes isEndOfWord = true
        /
     ['l']
      |
     ['e']*

Stored Words: "app", "apple", "bat"
Prefix "ap" exists? YES (Path matches down to ['p'])
Word "appl" exists? NO (isEndOfWord is false at ['l'])`,
    codeExamples: [
      {
        title: 'Implement Trie (Prefix Tree)',
        description: 'Implements complete Trie with insert, search, and startsWith methods in O(L) time per operation.',
        input: 'insert("apple"), search("apple"), search("app"), startsWith("app"), insert("app"), search("app")',
        output: 'true, false, true, true',
        timeComplexity: 'O(L) per operation where L is string length',
        spaceComplexity: 'O(Total characters inserted * alphabet size)',
        javascript: `// JavaScript (Node.js ES6+)
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let curr = this.root;
    for (const ch of word) {
      if (!curr.children[ch]) {
        curr.children[ch] = new TrieNode();
      }
      curr = curr.children[ch];
    }
    curr.isEndOfWord = true;
  }

  search(word) {
    let curr = this.root;
    for (const ch of word) {
      if (!curr.children[ch]) return false;
      curr = curr.children[ch];
    }
    return curr.isEndOfWord;
  }

  startsWith(prefix) {
    let curr = this.root;
    for (const ch of prefix) {
      if (!curr.children[ch]) return false;
      curr = curr.children[ch];
    }
    return true;
  }
}

// Verification
const trie = new Trie();
trie.insert("apple");
console.log("Search apple:", trie.search("apple"));   // true
console.log("Search app:", trie.search("app"));       // false
console.log("Starts with app:", trie.startsWith("app")); // true
trie.insert("app");
console.log("Search app now:", trie.search("app"));   // true`,
        python: `# Python 3.10+
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
        curr.is_end_of_word = True

    def search(self, word: str) -> bool:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                return False
            curr = curr.children[ch]
        return curr.is_end_of_word

    def starts_with(self, prefix: str) -> bool:
        curr = self.root
        for ch in prefix:
            if ch not in curr.children:
                return False
            curr = curr.children[ch]
        return True

# Verification
if __name__ == "__main__":
    t = Trie()
    t.insert("apple")
    print("Search apple:", t.search("apple"))       # True
    print("Search app:", t.search("app"))           # False
    print("Starts with app:", t.starts_with("app")) # True
    t.insert("app")
    print("Search app now:", t.search("app"))       # True`,
        java: `// Java 17+
public class Trie {
    public static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        bool isEndOfWord = false;
    }

    private final TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new TrieNode();
            }
            curr = curr.children[idx];
        }
        curr.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return curr.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        TrieNode curr = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return true;
    }

    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("apple");
        System.out.println("Search apple: " + trie.search("apple")); // true
        System.out.println("Search app: " + trie.search("app"));     // false
        System.out.println("Starts with app: " + trie.startsWith("app")); // true
        trie.insert("app");
        System.out.println("Search app now: " + trie.search("app")); // true
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <string>
#include <vector>

class Trie {
private:
    struct TrieNode {
        TrieNode* children[26] = {nullptr};
        bool isEndOfWord = false;
    };
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }

    void insert(const std::string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) {
                curr->children[idx] = new TrieNode();
            }
            curr = curr->children[idx];
        }
        curr->isEndOfWord = true;
    }

    bool search(const std::string& word) const {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return curr->isEndOfWord;
    }

    bool startsWith(const std::string& prefix) const {
        TrieNode* curr = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return true;
    }
};

int main() {
    std::cout << std::boolalpha;
    Trie trie;
    trie.insert("apple");
    std::cout << "Search apple: " << trie.search("apple") << "\\n"; // true
    std::cout << "Search app: " << trie.search("app") << "\\n";     // false
    std::cout << "Starts with app: " << trie.startsWith("app") << "\\n"; // true
    trie.insert("app");
    std::cout << "Search app now: " << trie.search("app") << "\\n"; // true
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Insert Word of length L', timeComplexity: 'O(L)', spaceComplexity: 'O(L)', notes: 'Creates at most L new nodes' },
      { operation: 'Search Word of length L', timeComplexity: 'O(L)', spaceComplexity: 'O(1)', notes: 'Traces L child pointers' },
      { operation: 'startsWith(Prefix of length P)', timeComplexity: 'O(P)', spaceComplexity: 'O(1)', notes: 'Inspects P characters' },
      { operation: 'Autocomplete Prefix Suggestions', timeComplexity: 'O(P + K)', spaceComplexity: 'O(K)', notes: 'P to locate node, then DFS through K matching subtree nodes' }
    ],
    commonMistakes: [
      'Confusing `search` and `startsWith`: `search` requires `curr.isEndOfWord == true`, while `startsWith` only requires reaching the end of the prefix.',
      'Memory bloat on large alphabets: Using `TrieNode[26]` for Unicode or mixed-case text wastes enormous amounts of null memory. Use hash maps.',
      'Memory leaks on node deletion: Deleting a word without pruning abandoned ancestor nodes leaves orphaned tree memory.',
      'Case sensitivity assumptions: Forgetting to normalize strings to lowercase causes indexing out of bounds (`c - "a"`).',
      'Ignoring duplicate insertions: Inserting the same word multiple times should idempotently set `isEndOfWord = true`.'
    ],
    interviewQuestions: [
      {
        question: 'Why would an engineer choose a Trie over a Hash Map for dictionary lookups?',
        answer: 'While a Hash Map has O(L) average lookup time, it cannot perform prefix matching (`startsWith`), prefix-based autocomplete, lexicographical sorting, or wildcard regex searching. Furthermore, Tries have no worst-case hash collisions and share common prefixes across words, reducing duplicate character storage.'
      },
      {
        question: 'What is a Compressed Trie (Radix Tree)?',
        answer: 'A Radix Tree optimizes standard Tries by merging every internal node with only one child into a single composite edge with a substring label. For example, the chain R -> O -> O -> T becomes a single edge labeled "root". This drastically reduces the number of node objects and pointer memory.'
      },
      {
        question: 'How are Tries applied to Bit Manipulation problems?',
        answer: 'A Binary Trie (0-1 Trie) stores fixed 32-bit integers bit-by-bit from MSB to LSB. To find the Maximum XOR of two numbers in an array, we insert numbers into the binary Trie and for each query number, greedily traverse the opposite bit branch whenever available.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Implement Trie (Prefix Tree)', platform: 'LeetCode #208', focus: 'Trie fundamentals' },
      { level: 'Intermediate', title: 'Design Add and Search Words Data Structure', platform: 'LeetCode #211', focus: 'Trie with wildcard dot search' },
      { level: 'Intermediate', title: 'Word Search II', platform: 'LeetCode #212', focus: 'Trie + Grid Backtracking' },
      { level: 'Advanced', title: 'Maximum XOR of Two Numbers in an Array', platform: 'LeetCode #421', focus: 'Binary 0-1 Trie' },
      { level: 'Advanced', title: 'Word Break II', platform: 'LeetCode #140', focus: 'Trie with DFS memoization' }
    ],
    quickRevisionNotes: [
      'Trie stores strings character-by-character along tree branches.',
      'Operations (insert, search, startsWith) take O(L) time where L is string length.',
      'Prefix search is O(P) independent of how many millions of words exist in the dictionary.',
      'Always distinguish `search` (requires `isEndOfWord`) from `startsWith` (does not require it).',
      'Binary Tries solve maximum XOR queries in O(32 * N) = O(N) linear time.'
    ],
    knowledgeCheck: [
      {
        question: 'What is the time complexity to check if a prefix of length P exists in a Trie containing N total words?',
        options: ['O(N * P)', 'O(log N)', 'O(P)', 'O(1)'],
        correctAnswer: 2,
        explanation: 'Searching a prefix in a Trie only requires walking P child pointers down the tree, completely independent of the total number of words N.'
      },
      {
        question: 'How does a Trie distinguish between a complete word and a partial prefix?',
        options: ['By looking at the height of the node', 'By checking the boolean flag isEndOfWord', 'By checking if the node has children', 'By comparing string lengths'],
        correctAnswer: 1,
        explanation: 'The `isEndOfWord` boolean flag marks whether a complete inserted dictionary word terminates at that exact character node.'
      },
      {
        question: 'What is the primary advantage of a Radix Tree (Compressed Trie) over a standard Trie?',
        options: ['Radix tree is faster than O(1)', 'It merges single-child nodes to significantly reduce memory overhead', 'It eliminates all pointers', 'It supports sorting numbers in O(1)'],
        correctAnswer: 1,
        explanation: 'A Radix Tree merges linear single-child chains into a single edge containing a string segment, cutting down the total number of nodes and pointer allocations.'
      }
    ]
  },

  recursion: {
    id: 'recursion',
    title: 'Recursion',
    order: 12,
    difficulty: 'Beginner',
    estimatedTime: '45 mins',
    category: 'Algorithmic Paradigms',
    introduction: `Recursion is a fundamental problem-solving technique where a function solves a complex problem by calling itself on smaller instances of the exact same subproblem. Recursion is the natural mathematical language for expressing divide-and-conquer strategies, tree traversals, graph explorations, backtracking, and dynamic programming.

Under the hood, recursive calls rely directly on the computer CPU's **Call Stack**. Understanding how activation records (stack frames) are allocated, when base cases terminate execution, and how to draw **recursion trees** unlocks the mastery needed to write clean, elegant code and avoid devastating Stack Overflow crashes.`,
    learningObjectives: [
      'Identify the two mandatory components of recursion: Base Cases and Recursive Cases.',
      'Visualize the runtime Call Stack, activation frames, and unwinding phase.',
      'Draw and analyze Recursion Trees to determine time and space complexity.',
      'Contrast Head Recursion, Tail Recursion, and compiler Tail-Call Optimization (TCO).',
      'Solve recurrence relations using the Master Theorem ($T(N) = aT(N/b) + f(N)$).',
      'Write robust recursive functions in JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Functions, return values, and parameters', 'Call stack memory architecture'],
    coreConcepts: `### 1. Anatomy of a Recursive Function
Every well-formed recursive function has two distinct parts:
1. **Base Case:** The simplest, non-recursive stopping condition that returns an immediate answer without further calls. Without a base case, recursion executes infinitely until memory is exhausted.
2. **Recursive Case:** Breaks the input down into one or more smaller subproblems and calls the function itself on those inputs, combining their results.

### 2. The Runtime Call Stack & Memory
When a function \`foo()\` calls itself, the CPU halts execution of the current function, packages its local variables, parameters, and instruction pointer into an **Activation Record (Stack Frame)**, and pushes it onto the runtime call stack.
- The depth of recursion determines the maximum stack space consumed: $O(\\text{depth})$.
- If recursion goes too deep (e.g., $10^5$ frames in Python/Java/JS), the OS terminates the program with a **StackOverflowError** (Maximum call stack size exceeded).

### 3. Tracing Recursion Trees
To analyze multi-branch recursive algorithms (e.g., Fibonacci: $F(N) = F(N-1) + F(N-2)$), sketch the call tree:
- Level 0 has $2^0 = 1$ call
- Level 1 has $2^1 = 2$ calls
- Level $k$ has $2^k$ calls
Total nodes across $N$ levels is $1 + 2 + 4 + ... + 2^N = 2^{N+1} - 1 = O(2^N)$ exponential time!
This visual tree immediately reveals overlapping redundant computations, motivating Memoization.

### 4. Tail Recursion & Optimization (TCO)
A function is **tail-recursive** if the recursive call is the very last operation executed before returning (no pending arithmetic after the call returns).
Compilers supporting Tail-Call Optimization (e.g., modern C++, ES6 in Safari) can reuse the same stack frame instead of pushing a new frame, reducing auxiliary space from $O(N)$ down to $O(1)$.`,
    terminology: [
      { term: 'Base Case', definition: 'The terminal condition that stops recursive calls and returns an immediate answer.' },
      { term: 'Stack Frame (Activation Record)', definition: 'A memory block on the call stack containing local variables and return address for a single function call.' },
      { term: 'Stack Overflow', definition: 'A fatal runtime crash when the number of stacked recursive calls exceeds available call stack memory.' },
      { term: 'Tail Recursion', definition: 'A special form of recursion where the recursive call is the final statement in the function.' },
      { term: 'Recurrence Relation', definition: 'A mathematical equation that expresses the running time of a function in terms of its smaller inputs.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Recursion Call Stack: Factorial(3)',
        steps: [
          'Call fact(3): not base case -> needs 3 * fact(2). Push frame fact(3) to call stack.',
          'Call fact(2): not base case -> needs 2 * fact(1). Push frame fact(2) to call stack.',
          'Call fact(1): base case hit! Returns 1 immediately.',
          'Unwinding: fact(2) receives 1 -> calculates 2 * 1 = 2. Frame fact(2) popped.',
          'Unwinding: fact(3) receives 2 -> calculates 3 * 2 = 6. Frame fact(3) popped.',
          'Result: 6! Call stack is empty.'
        ]
      }
    ],
    visualExample: `RECURSION CALL STACK EVOLUTION: FACTORIAL(3)

GROWTH PHASE (Wind-up):
| fact(1) | -> Base Case returns 1
| fact(2) | -> waiting on fact(1)
| fact(3) | -> waiting on fact(2)
+---------+

UNWINDING PHASE:
fact(1) returns 1
fact(2) computes 2 * 1 = 2, returns 2
fact(3) computes 3 * 2 = 6, returns 6 (Final answer!)`,
    codeExamples: [
      {
        title: 'Power of X to N (Divide and Conquer Recursion)',
        description: 'Computes x^n in O(log N) time using binary exponentiation recursion instead of naive O(N) multiplication.',
        input: 'x = 2.0, n = 10',
        output: '1024.0',
        timeComplexity: 'O(log N) logarithmic steps',
        spaceComplexity: 'O(log N) recursion stack frames',
        javascript: `// JavaScript (Node.js ES6+)
function myPow(x, n) {
  if (n === 0) return 1.0;
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  function fastPow(base, exp) {
    if (exp === 0) return 1.0;
    const half = fastPow(base, Math.floor(exp / 2));
    if (exp % 2 === 0) {
      return half * half;
    } else {
      return half * half * base;
    }
  }

  return fastPow(x, n);
}

// Verification
console.log("2^10 =", myPow(2.0, 10)); // 1024
console.log("2^-2 =", myPow(2.0, -2)); // 0.25`,
        python: `# Python 3.10+
def my_pow(x: float, n: int) -> float:
    if n == 0:
        return 1.0
    if n < 0:
        x = 1.0 / x
        n = -n

    def fast_pow(base: float, exp: int) -> float:
        if exp == 0:
            return 1.0
        half = fast_pow(base, exp // 2)
        if exp % 2 == 0:
            return half * half
        else:
            return half * half * base

    return fast_pow(x, n)

# Verification
if __name__ == "__main__":
    print("2^10 =", my_pow(2.0, 10))  # 1024.0
    print("2^-2 =", my_pow(2.0, -2))  # 0.25`,
        java: `// Java 17+
public class FastPower {
    public static double myPow(double x, int n) {
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        return fastPow(x, N);
    }

    private static double fastPow(double base, long exp) {
        if (exp == 0) return 1.0;
        double half = fastPow(base, exp / 2);
        if (exp % 2 == 0) {
            return half * half;
        } else {
            return half * half * base;
        }
    }

    public static void main(String[] args) {
        System.out.println("2^10 = " + myPow(2.0, 10)); // 1024.0
        System.out.println("2^-2 = " + myPow(2.0, -2)); // 0.25
    }
}`,
        cpp: `// C++ 20
#include <iostream>

double fastPow(double base, long long exp) {
    if (exp == 0) return 1.0;
    double half = fastPow(base, exp / 2);
    if (exp % 2 == 0) {
        return half * half;
    } else {
        return half * half * base;
    }
}

double myPow(double x, int n) {
    long long N = n;
    if (N < 0) {
        x = 1.0 / x;
        N = -N;
    }
    return fastPow(x, N);
}

int main() {
    std::cout << "2^10 = " << myPow(2.0, 10) << "\\n"; // 1024
    std::cout << "2^-2 = " << myPow(2.0, -2) << "\\n"; // 0.25
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Binary Exponentiation (fastPow)', timeComplexity: 'O(log N)', spaceComplexity: 'O(log N)', notes: 'Halves exponent at each step' },
      { operation: 'Linear Recursion (e.g., Factorial)', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', notes: 'N stack frames allocated sequentially' },
      { operation: 'Tree Recursion (Naive Fibonacci)', timeComplexity: 'O(2^N)', spaceComplexity: 'O(N)', notes: 'Exponential calls; stack space equal to max branch depth' },
      { operation: 'Tail Recursive Call with TCO', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Stack frame recycled by compiler' }
    ],
    commonMistakes: [
      'Missing or Unreachable Base Case: Results in infinite loops and immediate Stack Overflow crashes.',
      'Performing exponential work unknowingly: Calling `fib(n-1) + fib(n-2)` without memoization duplicates billions of calls for n = 45.',
      'Excessive memory on call stack: Using deep recursion (N > 100,000) instead of an iterative loop or stack object.',
      'Mutating global state inside recursion: Altering external variables across branches produces unpredictable race conditions.',
      'Returning without using recursive results: Forgetting the `return` keyword in recursive branches returns undefined.'
    ],
    interviewQuestions: [
      {
        question: 'What is the Master Theorem and how is it used to determine algorithmic time complexity?',
        answer: 'The Master Theorem analyzes divide-and-conquer recurrences of the form T(N) = aT(N/b) + O(N^d), where a is the number of subproblems, N/b is the subproblem size, and O(N^d) is the work done outside recursive calls. Comparing log_b(a) with d classifies the recurrence into one of three cases: O(N^d) if d > log_b(a), O(N^d log N) if d = log_b(a), or O(N^(log_b a)) if d < log_b(a).'
      },
      {
        question: 'Can any recursive function be rewritten iteratively, and how?',
        answer: 'Yes, by the Church-Turing thesis and formal computability theory, all recursive algorithms can be rewritten iteratively using an explicit Stack data structure in memory to simulate the CPU runtime call stack.'
      },
      {
        question: 'What is Tail Call Optimization (TCO)?',
        answer: 'TCO is a compiler optimization where if a function return is solely another function call (e.g. `return helper(n - 1, acc * n);`), the compiler replaces the current stack frame in place instead of pushing a new frame. This transforms recursive space complexity from O(N) down to O(1).'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Fibonacci Number', platform: 'LeetCode #509', focus: 'Basic recurrence' },
      { level: 'Beginner', title: 'Pow(x, n)', platform: 'LeetCode #50', focus: 'Divide and conquer exponentiation' },
      { level: 'Intermediate', title: 'Merge Two Sorted Lists (Recursive)', platform: 'LeetCode #21', focus: 'Recursive linked list splicing' },
      { level: 'Intermediate', title: 'K-th Symbol in Grammar', platform: 'LeetCode #779', focus: 'Tree index mapping' },
      { level: 'Advanced', title: 'Regular Expression Matching', platform: 'LeetCode #10', focus: 'Multi-branch recursive parsing' }
    ],
    quickRevisionNotes: [
      'Recursion requires two components: Base Case and Recursive Step.',
      'Space complexity is proportional to maximum Call Stack depth: O(height).',
      'Binary Exponentiation computes x^n in O(log N) time.',
      'Draw recursion trees to identify overlapping subproblems.',
      'Tail recursion allows compilers to optimize stack space to O(1).'
    ],
    knowledgeCheck: [
      {
        question: 'What occurs when a recursive function fails to reach its base case?',
        options: ['Compiler optimization error', 'Stack Overflow crash due to memory exhaustion', 'Function returns null', 'CPU runs in reverse'],
        correctAnswer: 1,
        explanation: 'Each recursive call allocates a stack frame on the call stack. Without a base case, frames continue to pile up until memory limits are exceeded, triggering a Stack Overflow.'
      },
      {
        question: 'What is the space complexity of naive recursive Fibonacci(N)?',
        options: ['O(2^N)', 'O(1)', 'O(N)', 'O(log N)'],
        correctAnswer: 2,
        explanation: 'Even though total calls are exponential O(2^N), the maximum number of active frames simultaneously living on the call stack at any point is the maximum depth of the tree, which is O(N).'
      },
      {
        question: 'In binary exponentiation fastPow(x, n), why is time complexity O(log N)?',
        options: ['Because it skips odd numbers', 'Because the exponent n is halved at every recursive step', 'Because multiplication is O(1)', 'Because it uses a hash map'],
        correctAnswer: 1,
        explanation: 'Dividing the exponent n by 2 on each step reduces the problem size logarithmically, taking log2(n) total recursive levels.'
      }
    ]
  },

  backtracking: {
    id: 'backtracking',
    title: 'Backtracking',
    order: 13,
    difficulty: 'Intermediate',
    estimatedTime: '55 mins',
    category: 'Algorithmic Paradigms',
    introduction: `Backtracking is an algorithmic paradigm that systematically explores all possible candidates to build a solution incrementally, abandoning a candidate ("backtracking") as soon as it determines that the candidate cannot possibly lead to a valid final solution.

Think of walking through a large hedge maze: you move forward along a path, and whenever you reach a dead end, you physically turn around, retrace your steps to the last junction, and try the next path. Backtracking is the universal technique for solving combinatorial problems: subsets, permutations, combinations, Sudoku puzzles, N-Queens placement, and constraint satisfaction problems.`,
    learningObjectives: [
      'Master the standard Backtracking Blueprint: Choose -> Explore -> Unchoose (Backtrack).',
      'Differentiate between Subsets, Combinations, and Permutations.',
      'Understand how **Pruning** eliminates millions of invalid branches in the decision tree.',
      'Solve the classic N-Queens puzzle with row/column/diagonal conflict hashing in O(1).',
      'Manage mutable path arrays during recursion without memory corruption.',
      'Implement backtracking templates in JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Recursion and call stack flow', 'Sets and bitmasks for fast state lookup'],
    coreConcepts: `### 1. The Universal Backtracking Blueprint
Every backtracking problem conforms to this exact structural template:
\`\`\`text
function backtrack(state, choices, result):
    if is_solution(state):
        result.append(copy(state))
        return

    for choice in choices:
        if is_valid(choice, state):
            make_choice(choice, state)       // 1. Choose
            backtrack(new_state, ...)        // 2. Explore
            undo_choice(choice, state)       // 3. Unchoose (Backtrack!)
\`\`\`

### 2. State Restoration (The "Unchoose" Step)
Because arrays and objects are passed by reference, mutating an array (e.g. \`path.push(num)\`) persists across recursive branches.
You **must** undo the mutation (\`path.pop()\`) immediately after the recursive call returns! This restores the environment so sibling branches evaluate against the correct clean state.

### 3. Permutations vs. Combinations vs. Subsets
- **Subsets (Power Set):** At each element, make a 2-way binary decision: include it or exclude it. Total combinations: $2^N$.
- **Combinations:** Choose $K$ elements from $N$ without regard to order. Maintain a \`startIndex\` to only pick future elements, preventing duplicate mirror sets like \`[1, 2]\` and \`[2, 1]\`.
- **Permutations:** Order matters (\`[1, 2]\` $\\neq$ \`[2, 1]\`). Use a boolean \`used[]\` array to allow choosing any unused element from any index. Total outputs: $N!$.

### 4. Pruning
Pruning is the act of terminating a recursive branch early if mathematical constraints prove it cannot yield a valid answer.
For example, in Sudoku, checking if a digit already exists in the row/col/box before recursing skips billions of impossible board permutations.`,
    terminology: [
      { term: 'State Space Tree', definition: 'The tree of all possible states and choices generated during execution of a backtracking algorithm.' },
      { term: 'Pruning (Bounding Function)', definition: 'Cutting off branches of the state space tree that are guaranteed not to lead to a valid solution.' },
      { term: 'Permutation', definition: 'An arrangement of elements where order matters (N! total arrangements).' },
      { term: 'Combination', definition: 'A selection of elements where order does not matter.' },
      { term: 'Power Set', definition: 'The set of all possible subsets of a set, containing exactly 2^N elements.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Backtracking: Subsets of [1, 2]',
        steps: [
          'Call backtrack(start=0, path=[]): Add [] to results.',
          'Loop i=0 (element 1): path becomes [1].',
          'Recurse backtrack(start=1, path=[1]): Add [1] to results.',
          'Loop i=1 (element 2): path becomes [1, 2].',
          'Recurse backtrack(start=2, path=[1, 2]): Add [1, 2] to results.',
          'start=2 exceeds length. Backtrack from element 2: path.pop() -> path is [1].',
          'Backtrack from element 1: path.pop() -> path is [].',
          'Loop i=1 (element 2): path becomes [2].',
          'Recurse backtrack(start=2, path=[2]): Add [2] to results. Backtrack: path.pop() -> [].',
          'Final Power Set Results: [[], [1], [1, 2], [2]]! Total = 2^2 = 4 subsets.'
        ]
      }
    ],
    visualExample: `BACKTRACKING DECISION TREE FOR SUBSETS OF [1, 2]

                     [ ]
                 /         \\
           Choose 1       Skip 1
             /               \\
          [1]                [ ]
         /   \\              /   \\
    Choose 2  Skip 2    Choose 2  Skip 2
      /         \\         /         \\
   [1, 2]       [1]      [2]        []

Leaves: [1, 2], [1], [2], []  -> All 2^N = 4 valid subsets generated!`,
    codeExamples: [
      {
        title: 'Subsets (Power Set Generation)',
        description: 'Generates all possible subsets (power set) of distinct integers using the standard backtracking blueprint in O(N * 2^N) time.',
        input: 'nums = [1, 2, 3]',
        output: '[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]',
        timeComplexity: 'O(N * 2^N) copying 2^N subsets of length up to N',
        spaceComplexity: 'O(N) recursion stack and path array',
        javascript: `// JavaScript (Node.js ES6+)
function subsets(nums) {
  const result = [];

  function backtrack(startIndex, currentPath) {
    // Make a shallow copy of currentPath and store it
    result.push([...currentPath]);

    for (let i = startIndex; i < nums.length; i++) {
      currentPath.push(nums[i]);        // 1. Choose
      backtrack(i + 1, currentPath);    // 2. Explore
      currentPath.pop();                // 3. Unchoose (Backtrack!)
    }
  }

  backtrack(0, []);
  return result;
}

// Verification
console.log("Subsets count:", subsets([1, 2, 3]).length); // 8 subsets
console.log("Subsets:", subsets([1, 2])); // [[], [1], [1, 2], [2]]`,
        python: `# Python 3.10+
def subsets(nums: list[int]) -> list[list[int]]:
    result = []

    def backtrack(start_index: int, current_path: list[int]):
        result.append(list(current_path))

        for i in range(start_index, len(nums)):
            current_path.append(nums[i])        # 1. Choose
            backtrack(i + 1, current_path)      # 2. Explore
            current_path.pop()                  # 3. Unchoose (Backtrack!)

    backtrack(0, [])
    return result

# Verification
if __name__ == "__main__":
    print("Subsets:", subsets([1, 2]))  # [[], [1], [1, 2], [2]]
    print("Subsets count:", len(subsets([1, 2, 3])))  # 8`,
        java: `// Java 17+
import java.util.*;

public class SubsetsSolution {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(0, nums, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(int start, int[] nums, List<Integer> current, List<List<Integer>> result) {
        result.add(new ArrayList<>(current)); // Deep copy

        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);             // 1. Choose
            backtrack(i + 1, nums, current, result); // 2. Explore
            current.remove(current.size() - 1); // 3. Unchoose (Backtrack!)
        }
    }

    public static void main(String[] args) {
        System.out.println("Subsets: " + subsets(new int[]{1, 2}));
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <vector>

void backtrack(int start, const std::vector<int>& nums, std::vector<int>& current, std::vector<std::vector<int>>& result) {
    result.push_back(current); // Copy

    for (int i = start; i < static_cast<int>(nums.size()); ++i) {
        current.push_back(nums[i]);              // 1. Choose
        backtrack(i + 1, nums, current, result); // 2. Explore
        current.pop_back();                      // 3. Unchoose (Backtrack!)
    }
}

std::vector<std::vector<int>> subsets(const std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    backtrack(0, nums, current, result);
    return result;
}

int main() {
    auto res = subsets({1, 2});
    std::cout << "Subsets count: " << res.size() << "\\n"; // 4
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Subsets (Power Set)', timeComplexity: 'O(N * 2^N)', spaceComplexity: 'O(N)', notes: '2^N subsets, copying each takes up to N' },
      { operation: 'Permutations of N elements', timeComplexity: 'O(N * N!)', spaceComplexity: 'O(N)', notes: 'N! leaf solutions, each of length N' },
      { operation: 'Combinations (N choose K)', timeComplexity: 'O(K * C(N, K))', spaceComplexity: 'O(K)', notes: 'Bounded by binomial coefficient' },
      { operation: 'N-Queens Solver', timeComplexity: 'O(N!)', spaceComplexity: 'O(N)', notes: 'Pruning eliminates non-attacking diagonals' }
    ],
    commonMistakes: [
      'Forgetting to Copy the Path: Doing `result.push(currentPath)` pushes the object reference. When backtracking pops elements, all saved results become empty! Always do `[...path]` or `new ArrayList<>(path)`.',
      'Forgetting the "Unchoose" Step: Failing to pop the added element corrupts the path for sibling iterations.',
      'Infinite Loops on Permutations: Forgetting to track which elements have been used causes infinite identical loops.',
      'Not sorting when handling duplicates: Problems like Subsets II or Permutations II require sorting first and skipping `nums[i] == nums[i-1]` when not picked.',
      'Inefficient state validation: Recalculating validation in O(N) when O(1) hash sets for rows/cols/diagonals can be maintained.'
    ],
    interviewQuestions: [
      {
        question: 'Why do we need to make a copy of the path before storing it in the result list?',
        answer: 'Because arrays/lists are stored as reference pointers in heap memory. If you append the original `currentPath` variable directly, you are storing pointers to the same mutable array. As backtracking continues and eventually pops every element back to empty, all stored elements in your result will also mutate to empty. A copy captures an immutable snapshot of that exact moment.'
      },
      {
        question: 'How do you check diagonal conflicts in O(1) in the N-Queens problem?',
        answer: 'For any cell at (row, col): all cells on the major diagonal (top-left to bottom-right) share the constant value (row - col). All cells on the anti-diagonal (top-right to bottom-left) share the constant value (row + col). By maintaining two boolean arrays/sets for (row - col) and (row + col), diagonal conflict checks take O(1) time.'
      },
      {
        question: 'What is the difference between Backtracking and standard Brute Force search?',
        answer: 'Brute force generates all possible combinations unconditionally to the very end before testing if they are valid (checking N^N boards in N-Queens). Backtracking checks constraints incrementally at each intermediate step and immediately prunes the entire branch as soon as a constraint is violated, saving millions of useless operations.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Subsets', platform: 'LeetCode #78', focus: 'Power set generation' },
      { level: 'Beginner', title: 'Combinations', platform: 'LeetCode #77', focus: 'Bounded depth search' },
      { level: 'Intermediate', title: 'Permutations', platform: 'LeetCode #46', focus: 'Used element tracking' },
      { level: 'Intermediate', title: 'Combination Sum', platform: 'LeetCode #39', focus: 'Unlimited reuse of elements' },
      { level: 'Advanced', title: 'N-Queens', platform: 'LeetCode #51', focus: 'Constraint propagation & diagonal hashing' }
    ],
    quickRevisionNotes: [
      'Blueprint: Choose -> Explore -> Unchoose (Backtrack).',
      'Always push a shallow/deep copy of the current path to the result list.',
      'Combinations use `startIndex`; Permutations use a `used[]` boolean array.',
      'Pruning stops exploration of doomed branches immediately.',
      'N-Queens checks diagonals in O(1) using `row - col` and `row + col`.'
    ],
    knowledgeCheck: [
      {
        question: 'What happens in JavaScript if you execute `result.push(path)` instead of `result.push([...path])` during backtracking?',
        options: ['Syntax error', 'Every entry in result will mutate whenever path changes, ending as empty arrays', 'Memory leak', 'Code executes faster without changes'],
        correctAnswer: 1,
        explanation: 'In JavaScript, arrays are passed by reference. Pushing `path` stores references to the same array; when backtracking pops elements, all stored references reflect those deletions.'
      },
      {
        question: 'How many total subsets exist for an array of N distinct elements?',
        options: ['N!', '2^N', 'N^2', 'N log N'],
        correctAnswer: 1,
        explanation: 'Each of the N elements has two independent choices: either be included in the subset or excluded, resulting in 2 * 2 * ... * 2 = 2^N subsets.'
      },
      {
        question: 'What is the primary purpose of the "Unchoose" step (e.g. path.pop()) in a backtracking algorithm?',
        options: ['To free RAM memory', 'To restore state so the next iteration can explore an alternative choice from a clean slate', 'To return values to the caller', 'To break out of the loop'],
        correctAnswer: 1,
        explanation: 'Unchoosing undoes the local modification, ensuring the shared mutable state is clean when exploring sibling branches.'
      }
    ]
  },

  'greedy-algorithms': {
    id: 'greedy-algorithms',
    title: 'Greedy Algorithms',
    order: 14,
    difficulty: 'Intermediate',
    estimatedTime: '50 mins',
    category: 'Algorithmic Paradigms',
    introduction: `A Greedy Algorithm is an algorithmic strategy that solves optimization problems by making the **locally optimal choice at each step**, with the hope that these local choices will lead to a globally optimal solution. Unlike backtracking or dynamic programming, a greedy algorithm never reconsiders or reverses its past decisions.

Greedy algorithms are blazing fast—often running in **O(N) or O(N log N) time** with O(1) space. However, greedy heuristics are notoriously tricky: they do not work on all problems. A greedy approach is mathematically sound only if the problem exhibits both the **Greedy Choice Property** and **Optimal Substructure**. Classic greedy masterworks include Dijkstra Shortest Path, Huffman Data Compression, Kruskal MST, and Activity Selection.`,
    learningObjectives: [
      'Recognize problems solvable by Greedy strategies vs. those requiring Dynamic Programming.',
      'Prove correctness using Exchange Arguments or "Greedy Stays Ahead" reasoning.',
      'Master the Activity Selection and Interval Scheduling problem families.',
      'Solve the Fractional Knapsack problem using value-to-weight density sorting.',
      'Implement Jump Game and Gas Station problems in linear O(N) time.',
      'Write optimal greedy algorithms in JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Sorting algorithms and custom comparators', 'Arrays and basic mathematical proofs'],
    coreConcepts: `### 1. The Two Mandatory Greedy Conditions
1. **Greedy Choice Property:** A global optimal solution can be reached by making a series of locally optimal (greedy) choices without looking ahead or backtracking.
2. **Optimal Substructure:** An optimal solution to the overall problem contains within it optimal solutions to its subproblems.

### 2. Interval Scheduling (Activity Selection)
Given $N$ activities with start and end times $(s_i, e_i)$, select the maximum number of mutually non-overlapping activities.
- **The Greedy Strategy:** Sort all activities by **earliest end time ($e_i$)**!
- Picking the activity that finishes first leaves the maximum possible remaining time for subsequent activities.
- Loop through sorted intervals: if $s_i \\ge \\text{last\_end\_time}$, pick it and update $\\text{last\_end\_time} = e_i$. Time: $O(N \\log N)$.

### 3. Fractional Knapsack vs. 0/1 Knapsack
- **Fractional Knapsack (Greedy Works):** You can take fractions of items. Sort items by value density ($\\text{value} / \\text{weight}$) in descending order and fill the knapsack greedily. Time: $O(N \\log N)$.
- **0/1 Knapsack (Greedy FAILS!):** You must take the whole item or leave it. Greedy by value or density can miss the optimal combination! 0/1 Knapsack **requires Dynamic Programming**.

### 4. How to Prove a Greedy Algorithm
Two standard proof techniques:
- **Greedy Stays Ahead:** Prove that at each step $k$, the greedy choice is at least as good as any hypothetical alternative.
- **Exchange Argument:** Assume an optimal solution differs from greedy. Show that replacing an optimal choice with the greedy choice never degrades the solution quality, proving the greedy solution is also optimal.`,
    terminology: [
      { term: 'Locally Optimal Choice', definition: 'The best immediate decision available at the current step without regard for future consequences.' },
      { term: 'Optimal Substructure', definition: 'A property where the optimal solution of a problem incorporates optimal solutions to its subproblems.' },
      { term: 'Exchange Argument', definition: 'A mathematical proof technique showing that transforming any optimal solution into the greedy solution preserves optimality.' },
      { term: 'Interval Scheduling', definition: 'Finding the largest set of mutually compatible time intervals.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Activity Selection by Earliest End Time',
        steps: [
          'Given intervals: [[1, 4], [3, 5], [0, 6], [5, 7], [3, 9], [5, 9], [6, 10], [8, 9]]',
          'Step 1: Sort by finish time: [1, 4], [3, 5], [0, 6], [5, 7], [8, 9], [3, 9], [5, 9], [6, 10]',
          'Step 2: Pick first activity [1, 4]. lastEnd = 4. Count = 1.',
          'Inspect [3, 5]: start 3 < lastEnd 4 (overlap, skip).',
          'Inspect [0, 6]: start 0 < lastEnd 4 (overlap, skip).',
          'Inspect [5, 7]: start 5 >= lastEnd 4! Pick it. lastEnd = 7. Count = 2.',
          'Inspect [8, 9]: start 8 >= lastEnd 7! Pick it. lastEnd = 9. Count = 3.',
          'Remaining activities overlap with 9. Final Maximum Activities = 3: [[1, 4], [5, 7], [8, 9]]!'
        ]
      }
    ],
    visualExample: `ACTIVITY SELECTION GREEDY TIMELINE

Activity A: |==== [1, 4] ====|  <-- Finishes earliest! PICK A
Activity B:      |==== [3, 5] ====| (Conflict with A, SKIP)
Activity C: |================ [0, 6] ================| (Conflict with A, SKIP)
Activity D:                   |==== [5, 7] ====|  <-- Finishes earliest next! PICK D
Activity E:                                       |== [8, 9] ==| <-- PICK E

Total Selected: 3 activities. Leaves the most remaining room on the timeline!`,
    codeExamples: [
      {
        title: 'Non-overlapping Intervals (Erase Minimum Intervals)',
        description: 'Finds the minimum number of intervals to remove to make the rest non-overlapping using greedy end-time sorting in O(N log N) time.',
        input: 'intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]',
        output: '1 (Remove [1, 3])',
        timeComplexity: 'O(N log N) sorting intervals',
        spaceComplexity: 'O(1) in-place pointers',
        javascript: `// JavaScript (Node.js ES6+)
function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;

  // Sort by end time ascending
  intervals.sort((a, b) => a[1] - b[1]);

  let countToKeep = 1;
  let lastEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= lastEnd) {
      countToKeep++;
      lastEnd = intervals[i][1];
    }
  }

  return intervals.length - countToKeep;
}

// Verification
console.log("Removals:", eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])); // 1
console.log("Removals:", eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])); // 2`,
        python: `# Python 3.10+
def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    if not intervals:
        return 0

    # Sort by finish time
    intervals.sort(key=lambda x: x[1])

    count_to_keep = 1
    last_end = intervals[0][1]

    for start, end in intervals[1:]:
        if start >= last_end:
            count_to_keep += 1
            last_end = end

    return len(intervals) - count_to_keep

# Verification
if __name__ == "__main__":
    print("Removals:", erase_overlap_intervals([[1, 2], [2, 3], [3, 4], [1, 3]]))  # 1
    print("Removals:", erase_overlap_intervals([[1, 2], [1, 2], [1, 2]]))          # 2`,
        java: `// Java 17+
import java.util.Arrays;

public class NonOverlappingIntervals {
    public static int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;

        // Sort by end time ascending
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

        int countToKeep = 1;
        int lastEnd = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] >= lastEnd) {
                countToKeep++;
                lastEnd = intervals[i][1];
            }
        }

        return intervals.length - countToKeep;
    }

    public static void main(String[] args) {
        int[][] intervals = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};
        System.out.println("Removals: " + eraseOverlapIntervals(intervals)); // 1
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <vector>
#include <algorithm>

int eraseOverlapIntervals(std::vector<std::vector<int>>& intervals) {
    if (intervals.empty()) return 0;

    // Sort by end time ascending
    std::sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) {
        return a[1] < b[1];
    });

    int countToKeep = 1;
    int lastEnd = intervals[0][1];

    for (size_t i = 1; i < intervals.size(); ++i) {
        if (intervals[i][0] >= lastEnd) {
            countToKeep++;
            lastEnd = intervals[i][1];
        }
    }

    return intervals.size() - countToKeep;
}

int main() {
    std::vector<std::vector<int>> intervals = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};
    std::cout << "Removals: " << eraseOverlapIntervals(intervals) << "\\n"; // 1
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Interval Scheduling Sorting', timeComplexity: 'O(N log N)', spaceComplexity: 'O(1) in-place or O(N)', notes: 'Sorting dominates total runtime' },
      { operation: 'Greedy Interval Linear Scan', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Single pass tracking lastEnd' },
      { operation: 'Fractional Knapsack', timeComplexity: 'O(N log N)', spaceComplexity: 'O(1)', notes: 'Sort by value/weight ratio' },
      { operation: 'Jump Game I & II', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Tracking max reachable index greedily' }
    ],
    commonMistakes: [
      'Applying Greedy to 0/1 Knapsack: You cannot take fractions of items; greedy density fails. Must use Dynamic Programming.',
      'Sorting intervals by Start Time instead of End Time: Sorting by start time can pick a huge interval that blocks multiple smaller ones.',
      'Assuming Greedy always works: Without mathematical proof (Exchange argument), greedy choices can easily trap you in local optima.',
      'Integer subtraction overflow in Java comparators: Using `(a, b) -> a[1] - b[1]` overflows if values are near Integer.MIN/MAX_VALUE. Use `Integer.compare(a[1], b[1])`.',
      'Modifying intervals while iterating: Mutating the array during a loop leads to skipped items and out-of-bounds errors.'
    ],
    interviewQuestions: [
      {
        question: 'Why does sorting by earliest end time guarantee optimal interval selection?',
        answer: 'By choosing the activity that finishes earliest, you leave the largest possible amount of remaining time available for all future activities. By an exchange argument, if another optimal solution picks an activity finishing later, replacing it with the greedy choice finishes even earlier and cannot possibly create any new conflicts.'
      },
      {
        question: 'Why does the greedy approach work for Fractional Knapsack but fail for 0/1 Knapsack?',
        answer: 'In Fractional Knapsack, you can always take the highest value-per-pound item until the sack is full. In 0/1 Knapsack, taking a high-density item might leave unfilled capacity that could have been filled with a combination of items of higher total aggregate value.'
      },
      {
        question: 'How does the Greedy strategy solve the Jump Game problem in O(N) time?',
        answer: 'Maintain a single variable `maxReach = 0`. Iterate through the array: if the current index `i > maxReach`, you are stuck and return false. Otherwise, update `maxReach = max(maxReach, i + nums[i])`. If `maxReach >= len - 1`, return true immediately.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Assign Cookies', platform: 'LeetCode #455', focus: 'Greedy matching' },
      { level: 'Beginner', title: 'Jump Game', platform: 'LeetCode #55', focus: 'Greedy reachability' },
      { level: 'Intermediate', title: 'Non-overlapping Intervals', platform: 'LeetCode #435', focus: 'Interval end-time sorting' },
      { level: 'Intermediate', title: 'Gas Station', platform: 'LeetCode #134', focus: 'Running total and reset' },
      { level: 'Advanced', title: 'Candy', platform: 'LeetCode #135', focus: 'Two-pass greedy distribution' }
    ],
    quickRevisionNotes: [
      'Greedy makes the best immediate choice without looking back.',
      'Requires Greedy Choice Property and Optimal Substructure.',
      'Interval scheduling: always sort by earliest END time.',
      'Fractional Knapsack is Greedy; 0/1 Knapsack is Dynamic Programming.',
      'Jump Game runs in O(N) by tracking running `maxReach`.'
    ],
    knowledgeCheck: [
      {
        question: 'In the Activity Selection problem, how should intervals be sorted to guarantee the maximum number of non-overlapping activities?',
        options: ['By Start Time ascending', 'By Duration ascending', 'By End Time ascending', 'By End Time descending'],
        correctAnswer: 2,
        explanation: 'Sorting by earliest End Time leaves the maximum amount of remaining timeline open for subsequent activities.'
      },
      {
        question: 'Which of the following problems CANNOT be solved optimally using a Greedy Algorithm?',
        options: ['Fractional Knapsack', 'Huffman Encoding', '0/1 Knapsack Problem', 'Dijkstra Shortest Path'],
        correctAnswer: 2,
        explanation: 'The 0/1 Knapsack problem requires full item inclusion or exclusion and exhibits overlapping subproblems, requiring Dynamic Programming.'
      },
      {
        question: 'What is the time complexity of the standard Interval Scheduling algorithm on N intervals?',
        options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(2^N)'],
        correctAnswer: 1,
        explanation: 'Sorting the N intervals by finish time takes O(N log N), followed by a single linear pass of O(N), giving O(N log N) total time.'
      }
    ]
  },

  'dynamic-programming': {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    order: 15,
    difficulty: 'Advanced',
    estimatedTime: '65 mins',
    category: 'Algorithmic Paradigms',
    introduction: `Dynamic Programming (DP) is one of the most intellectually rewarding and frequently tested paradigms in computer science. Invented by Richard Bellman in the 1950s, DP solves complex problems by breaking them down into simpler, overlapping subproblems, solving each subproblem **exactly once**, and storing their solutions in a lookup table (cache) to avoid redundant recalculation.

Where brute-force recursion requires exponential $O(2^N)$ time by repeating identical calculations billions of times, DP reduces complexity to polynomial **O(N) or O(N^2)** time. DP powers real-world systems: GPS route planning, DNA sequence alignment (Needleman-Wunsch algorithm), diff utilities (git diff / Longest Common Subsequence), NLP speech recognition (Viterbi algorithm), and financial portfolio optimization.`,
    learningObjectives: [
      'Identify the two mandatory criteria for DP: Overlapping Subproblems and Optimal Substructure.',
      'Master the two implementation paradigms: Top-Down Memoization vs. Bottom-Up Tabulation.',
      'Formulate State Space representations and write Recurrence State Transitions.',
      'Optimize memory using Rolling Variables to reduce O(N) space down to O(1).',
      'Master the classic DP categories: 1D linear, 0/1 Knapsack, Longest Common Subsequence (LCS), Longest Increasing Subsequence (LIS), and 2D Grids.',
      'Implement DP solutions across JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Recursion and call stack tracing', '2D arrays and hash tables'],
    coreConcepts: `### 1. The Two Pillars of Dynamic Programming
1. **Overlapping Subproblems:** The problem breaks down into smaller subproblems that are solved repeatedly. For instance, computing \`fib(5)\` requires \`fib(3)\` multiple times.
2. **Optimal Substructure:** The optimal solution to the overall problem is constructed directly from optimal solutions to its smaller subproblems.

### 2. Top-Down Memoization vs. Bottom-Up Tabulation
- **Top-Down (Memoization):** Start with natural recursion. Before computing, check if the answer is in a cache (array/map). If so, return it. If not, compute, save to cache, and return.
  - Pros: Intuitive translation from recurrence; visits only needed states.
  - Cons: Recursion call stack overhead; risk of stack overflow on large inputs.
- **Bottom-Up (Tabulation):** Eliminate recursion. Allocate a \`dp[]\` table, initialize base cases (e.g. \`dp[0] = 1\`), and loop iteratively from smallest subproblems up to the target.
  - Pros: No call stack overhead; faster in practice; allows space optimization.

### 3. Space Optimization (Rolling Variables)
If a transition only depends on the previous 1 or 2 states (e.g., $dp[i] = dp[i-1] + dp[i-2]$), you do not need an array of size $N$!
Maintain two scalar variables (\`prev2\`, \`prev1\`), updating them in each iteration. This reduces space complexity from **O(N) to O(1)**!

### 4. Canonical DP Problem Archetypes
- **1D Array (Climbing Stairs, House Robber):** $dp[i] = \\max(dp[i-1], dp[i-2] + \\text{val}[i])$.
- **0/1 Knapsack:** $dp[i][w] = \\max(dp[i-1][w], dp[i-1][w - \\text{weight}[i]] + \\text{value}[i])$. Can be optimized to a 1D array traversed backwards!
- **Longest Common Subsequence (LCS):** If $s_1[i] == s_2[j]$, $dp[i][j] = 1 + dp[i-1][j-1]$. Else $\\max(dp[i-1][j], dp[i][j-1])$.
- **Grid Pathfinding (Unique Paths):** $dp[r][c] = dp[r-1][c] + dp[r][c-1]$.`,
    terminology: [
      { term: 'Memoization', definition: 'A top-down optimization technique that caches results of function calls based on parameters.' },
      { term: 'Tabulation', definition: 'A bottom-up iterative approach that fills a table starting from base cases up to the desired target.' },
      { term: 'State Transition', definition: 'The mathematical equation relating the solution of a larger problem to its constituent subproblems.' },
      { term: 'Optimal Substructure', definition: 'When the optimal solution to a problem can be assembled from optimal solutions of its subproblems.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Climbing Stairs: N = 4 steps (1 or 2 steps at a time)',
        steps: [
          'Goal: Number of distinct ways to climb 4 stairs.',
          'Base Cases: 0 stairs = 1 way (do nothing); 1 stair = 1 way; 2 stairs = 2 ways (1+1 or 2).',
          'Recurrence: ways(i) = ways(i - 1) + ways(i - 2)',
          'Step i = 3: ways(3) = ways(2) + ways(1) = 2 + 1 = 3 ways.',
          'Step i = 4: ways(4) = ways(3) + ways(2) = 3 + 2 = 5 ways.',
          'The 5 paths: (1+1+1+1), (1+1+2), (1+2+1), (2+1+1), (2+2).',
          'Space optimized using 2 variables: O(N) time and O(1) auxiliary space!'
        ]
      }
    ],
    visualExample: `DYNAMIC PROGRAMMING: MEMOIZATION TREE PRUNING (FIBONACCI 5)

Without DP (Exponential O(2^N)):
                     fib(5)
                /              \\
            fib(4)             fib(3)
           /      \\           /      \\
       fib(3)    fib(2)    fib(2)   fib(1)
       /    \\
    fib(2) fib(1)
    
With DP (Linear O(N)):
fib(3) and fib(2) are computed ONCE, cached, and returned in O(1) on future visits!
Total calls shrink from 15 down to 5!`,
    codeExamples: [
      {
        title: 'Climbing Stairs (Space-Optimized O(1) Bottom-Up DP)',
        description: 'Computes the number of distinct ways to climb N stairs taking 1 or 2 steps in O(N) time and O(1) space.',
        input: 'n = 5',
        output: '8',
        timeComplexity: 'O(N) linear time',
        spaceComplexity: 'O(1) constant auxiliary space',
        javascript: `// JavaScript (Node.js ES6+)
function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1; // ways(1)
  let prev1 = 2; // ways(2)

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

// Verification
console.log("Ways for 3 stairs:", climbStairs(3)); // 3
console.log("Ways for 5 stairs:", climbStairs(5)); // 8`,
        python: `# Python 3.10+
def climb_stairs(n: int) -> int:
    if n <= 2:
        return n

    prev2, prev1 = 1, 2

    for _ in range(3, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1

# Verification
if __name__ == "__main__":
    print("Ways for 3 stairs:", climb_stairs(3))  # 3
    print("Ways for 5 stairs:", climb_stairs(5))  # 8`,
        java: `// Java 17+
public class ClimbingStairs {
    public static int climbStairs(int n) {
        if (n <= 2) return n;

        int prev2 = 1;
        int prev1 = 2;

        for (int i = 3; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }

    public static void main(String[] args) {
        System.out.println("Ways for 3 stairs: " + climbStairs(3)); // 3
        System.out.println("Ways for 5 stairs: " + climbStairs(5)); // 8
    }
}`,
        cpp: `// C++ 20
#include <iostream>

int climbStairs(int n) {
    if (n <= 2) return n;

    int prev2 = 1;
    int prev1 = 2;

    for (int i = 3; i <= n; ++i) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

int main() {
    std::cout << "Ways for 3 stairs: " << climbStairs(3) << "\\n"; // 3
    std::cout << "Ways for 5 stairs: " << climbStairs(5) << "\\n"; // 8
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Climbing Stairs / Fibonacci (DP)', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Single loop with 2 rolling variables' },
      { operation: '0/1 Knapsack (Tabulation)', timeComplexity: 'O(N * W)', spaceComplexity: 'O(W)', notes: 'Pseudo-polynomial time where W is capacity' },
      { operation: 'Longest Common Subsequence (LCS)', timeComplexity: 'O(N * M)', spaceComplexity: 'O(N * M) or O(min(N, M))', notes: '2D grid transitions' },
      { operation: 'Longest Increasing Subsequence (LIS)', timeComplexity: 'O(N^2) DP or O(N log N) Binary Search', spaceComplexity: 'O(N)', notes: 'Patience sorting yields N log N' }
    ],
    commonMistakes: [
      'Applying DP to non-overlapping subproblems: If subproblems do not overlap (e.g. Merge Sort), DP adds table overhead without benefit; use Divide and Conquer.',
      'Incorrect 0/1 Knapsack 1D array traversal: When optimizing to a 1D array, you MUST iterate weight capacity backwards (from W down to weight[i]) so items are not reused multiple times.',
      'Off-by-one errors in DP table dimensions: Often need a table of size `(N + 1) x (W + 1)` to cleanly accommodate the base case of 0 elements.',
      'Call stack overflow in Memoization: Deep recursion in Python/JS can crash on N > 10,000; convert to bottom-up tabulation.',
      'Forgetting base case initialization in tabulation: If base cases remain 0, transitions propagate zeros across the entire table.'
    ],
    interviewQuestions: [
      {
        question: 'How do you identify whether an interview problem should be solved using Dynamic Programming?',
        answer: 'Look for two main signatures: 1) The problem asks for an optimum (min, max, fewest, most) or a count of combinations (number of ways). 2) The problem has overlapping choices where a decision now affects future choices, and brute-force recursion leads to repeating identical subproblem arguments in the call tree.'
      },
      {
        question: 'Why is the 0/1 Knapsack problem described as Pseudo-Polynomial time?',
        answer: 'Its time complexity is O(N * W), where W is the numeric capacity. In computational complexity theory, the input size of W is represented by its number of bits (log W). An algorithm is polynomial only if it is polynomial in the number of bits. Because W grows exponentially relative to its bit length (2^b), it is pseudo-polynomial.'
      },
      {
        question: 'How can Longest Increasing Subsequence (LIS) be improved from O(N^2) to O(N log N)?',
        answer: 'Use Patience Sorting with Binary Search: Maintain an array `tails` where `tails[i]` stores the smallest tail of all increasing subsequences of length i + 1 found so far. For each number x, binary search for the first element >= x in `tails` and replace it; if x is larger than all elements, append x. The length of `tails` at the end is the LIS.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Climbing Stairs', platform: 'LeetCode #70', focus: '1D State transition' },
      { level: 'Beginner', title: 'House Robber', platform: 'LeetCode #198', focus: 'Include/exclude recurrence' },
      { level: 'Intermediate', title: 'Coin Change', platform: 'LeetCode #322', focus: 'Unbounded knapsack min state' },
      { level: 'Intermediate', title: 'Longest Increasing Subsequence', platform: 'LeetCode #300', focus: '1D DP & Binary search' },
      { level: 'Advanced', title: 'Edit Distance', platform: 'LeetCode #72', focus: '2D String alignment DP' }
    ],
    quickRevisionNotes: [
      'DP requires Overlapping Subproblems and Optimal Substructure.',
      'Top-Down: Recursion + Memoization. Bottom-Up: Iteration + Tabulation.',
      'Space optimize 1D recurrences from O(N) to O(1) using rolling variables.',
      '0/1 Knapsack 1D optimization requires looping backwards to avoid element reuse.',
      'Longest Common Subsequence runs in O(N * M) using 2D grid transitions.'
    ],
    knowledgeCheck: [
      {
        question: 'What are the two necessary properties a problem must possess to be solvable by Dynamic Programming?',
        options: ['Greedy choice and sorted input', 'Overlapping subproblems and optimal substructure', 'Binary search tree layout and balance', 'Linear complexity and constant space'],
        correctAnswer: 1,
        explanation: 'Dynamic Programming caches solutions to Overlapping Subproblems, while Optimal Substructure guarantees the overall optimum can be built from subproblem optima.'
      },
      {
        question: 'When optimizing 0/1 Knapsack from a 2D table to a 1D array, why must the inner loop iterate from max capacity W down to item weight?',
        options: ['To speed up loop counter', 'To prevent using the current item multiple times in the same iteration', 'Because arrays are stored backwards', 'To avoid index out of bounds'],
        correctAnswer: 1,
        explanation: 'Iterating backwards ensures you update dp[w] using values from the previous item step (unmodified left entries), preventing an item from being counted more than once.'
      },
      {
        question: 'In the Climbing Stairs problem, why can space complexity be reduced from O(N) to O(1)?',
        options: ['Because only numbers < 100 are used', 'Because computing ways(i) depends strictly on only the two immediately preceding states ways(i-1) and ways(i-2)', 'Because compilers eliminate loops', 'Because of tail recursion'],
        correctAnswer: 1,
        explanation: 'Since each step only references the immediate two previous values, two scalar variables suffice, eliminating the need for an N-element array.'
      }
    ]
  }
};
