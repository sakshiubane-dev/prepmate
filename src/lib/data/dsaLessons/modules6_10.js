/**
 * DSA Modules 6 to 10: Hashing, Trees, Binary Search Trees (BST), Heaps, Graphs
 * Complete educational lesson content following the PrepMate Lesson Schema.
 */

export const MODULES_6_10 = {
  hashing: {
    id: 'hashing',
    title: 'Hashing',
    order: 6,
    difficulty: 'Beginner',
    estimatedTime: '50 mins',
    category: 'Non-Linear Data Structures',
    introduction: `Hashing is one of the most powerful paradigms in computer science. It maps data of arbitrary size (keys) to fixed-size integer values (hash codes) using a mathematical **hash function**. These hash codes map directly into bucket array indices, allowing Hash Maps and Hash Sets to deliver **average-case O(1) time complexity** for insertions, lookups, and deletions.

Modern software relies on hashing everywhere: database indexing, caching layers (Redis, Memcached), cryptographic authentication, distributed consistent hashing, symbol tables in compilers, and deduplication systems. Mastering collision resolution, load factors, and hash set/map idioms is essential for solving interview problems in linear time.`,
    learningObjectives: [
      'Understand how hash functions convert arbitrary keys into bucket indices in O(1) time.',
      'Analyze the two primary collision resolution strategies: Separate Chaining and Open Addressing (Linear Probing).',
      'Understand Load Factor (α = N / M) and dynamic table rehashing.',
      'Differentiate between Hash Maps (key-value) and Hash Sets (unique keys).',
      'Solve Two Sum and frequency map problems in O(N) time instead of O(N^2).',
      'Write robust hash map algorithms in JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Arrays and index access', 'Modulo arithmetic', 'Linked lists for chaining'],
    coreConcepts: `### 1. The Anatomy of a Hash Function
A hash function $h(k)$ takes a key $k$ and computes an integer:
\`bucketIndex = hash(key) % tableCapacity\`
A good hash function possesses three critical properties:
1. **Deterministic:** The same key must always yield the exact same hash code.
2. **Fast:** Computes in O(1) time.
3. **Uniform Distribution:** Distributes keys evenly across all buckets to minimize collisions.

### 2. Hash Collisions & Resolution
A collision occurs when two distinct keys $k_1 \\neq k_2$ evaluate to the same bucket index: $h(k_1) = h(k_2)$. By the Pigeonhole Principle, collisions are mathematically inevitable.
- **Separate Chaining:** Each bucket contains a linked list or red-black tree (Java 8+). If a collision occurs, the new entry is appended to that bucket's list. Worst case O(N) if all keys collide into one bucket, but average O(1) with a good hash function.
- **Open Addressing (Linear/Quadratic Probing, Double Hashing):** All entries reside directly in the bucket array. If slot $i$ is occupied, probe slot $(i + 1) % M$, $(i + 2) % M$, etc., until an empty slot is located.

### 3. Load Factor & Rehashing
The **Load Factor** $\\alpha = N / M$ measures table fullness, where $N$ is the number of stored keys and $M$ is table capacity.
- In Java's \`HashMap\`, the default threshold is $\\alpha = 0.75$.
- When $N / M > 0.75$, the hash table allocates a new array of double the capacity ($2M$), rehashes all existing keys into their new bucket indices, and discards the old table. This costs O(N) once, but preserves average **amortized O(1)** operations.

### 4. Hash Set vs. Hash Map
- **Hash Map:** Stores key-value pairs (e.g., username -> user object).
- **Hash Set:** Stores distinct keys only. Internally, a HashSet is backed by a HashMap where values are dummy placeholders.

### 5. Two-Pass vs. One-Pass Hash Complements
Many problems asking for pairs summing to target $T$ can be solved using a hash map in one pass:
For each element $x$ at index $i$, check if the complement $T - x$ exists in the map. If yes, a solution is found. If no, insert $x$ into the map. Time: O(N), Space: O(N).`,
    terminology: [
      { term: 'Hash Function', definition: 'A mathematical algorithm mapping keys of arbitrary length to fixed-size integers.' },
      { term: 'Collision', definition: 'The event where two different keys produce the exact same bucket index.' },
      { term: 'Separate Chaining', definition: 'Resolving collisions by storing colliding elements in a linked list or tree at that bucket.' },
      { term: 'Open Addressing', definition: 'Resolving collisions by probing alternative array slots within the same table.' },
      { term: 'Load Factor', definition: 'The ratio of elements to table capacity (N / M) used to trigger resizing.' },
      { term: 'Rehashing', definition: 'The process of rebuilding the hash table with doubled capacity and recalculating all bucket indices.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Two Sum with One-Pass Hash Map',
        steps: [
          'Given nums = [2, 7, 11, 15], target = 9',
          'Initialize empty hash map: map = {}',
          'i = 0, num = 2: complement = 9 - 2 = 7. Is 7 in map? No. map[2] = 0',
          'i = 1, num = 7: complement = 9 - 7 = 2. Is 2 in map? YES! It was found at index 0.',
          'Return [map[2], 1] -> [0, 1]!',
          'Done in a single pass of O(N) time and O(N) space, avoiding the brute-force O(N^2) double loop!'
        ]
      }
    ],
    visualExample: `HASH TABLE WITH SEPARATE CHAINING

Key: "apple"  --> Hash("apple") % 4 = 1
Key: "banana" --> Hash("banana") % 4 = 3
Key: "orange" --> Hash("orange") % 4 = 1  <-- COLLISION with "apple"!

Bucket Array:
[0] -> null
[1] -> [ "apple" : $1.20 ] ---> [ "orange" : $0.90 ] ---> null (Chained Node)
[2] -> null
[3] -> [ "banana" : $0.50 ] ---> null`,
    codeExamples: [
      {
        title: 'Two Sum (Optimal One-Pass Hash Map)',
        description: 'Finds the indices of two numbers in an array that add up to a target using a hash map in O(N) time.',
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        timeComplexity: 'O(N) linear scan',
        spaceComplexity: 'O(N) auxiliary map storage',
        javascript: `// JavaScript (Node.js ES6+)
function twoSum(nums, target) {
  const map = new Map(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// Verification
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]`,
        python: `# Python 3.10+
def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}  # value -> index

    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

    return []

# Verification
if __name__ == "__main__":
    print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
    print(two_sum([3, 2, 4], 6))       # [1, 2]`,
        java: `// Java 17+
import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;

public class TwoSum {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9))); // [0, 1]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6)));       // [1, 2]
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <vector>
#include <unordered_map>

std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> map; // value -> index

    for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}

int main() {
    auto res1 = twoSum({2, 7, 11, 15}, 9);
    std::cout << "[" << res1[0] << ", " << res1[1] << "]\\n"; // [0, 1]
    auto res2 = twoSum({3, 2, 4}, 6);
    std::cout << "[" << res2[0] << ", " << res2[1] << "]\\n"; // [1, 2]
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Average Lookup / Insert / Delete', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Assumes uniform hashing distribution' },
      { operation: 'Worst Case Lookup / Insert / Delete', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Occurs if all keys hash to the same bucket' },
      { operation: 'Java 8+ Treeified Bucket Worst Case', timeComplexity: 'O(log K)', spaceComplexity: 'O(1)', notes: 'Buckets with >8 nodes transform into Red-Black trees' },
      { operation: 'Rehash (Table Resize)', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', notes: 'Doubles capacity and copies all entries' },
      { operation: 'Iteration over all elements', timeComplexity: 'O(N + M)', spaceComplexity: 'O(1)', notes: 'N elements across M bucket slots' }
    ],
    commonMistakes: [
      'Assuming hash map lookup is ALWAYS O(1): In malicious worst cases (hash DOS attacks), lookups degrade to O(N).',
      'Mutating a key after inserting into a hash map: Changing an object field alters its hash code, making it unfindable in the table.',
      'Using un-hashable keys: Using custom classes in Java/Python without overriding both `equals()` / `__eq__` and `hashCode()` / `__hash__`.',
      'Confusing C++ `std::map` and `std::unordered_map`: `std::map` is a red-black tree (O(log N)); `std::unordered_map` is a true hash table (O(1)).',
      'Unnecessary map lookups: Calling `if (map.containsKey(k)) val = map.get(k)` does two hash lookups; get or compute directly.'
    ],
    interviewQuestions: [
      {
        question: 'What happens in Java 8 HashMap when a single bucket exceeds 8 colliding nodes?',
        answer: 'When a bucket list length reaches TREEIFY_THRESHOLD (8) and the total table capacity is at least 64, Java converts that linked list into a balanced Red-Black Tree. This changes the worst-case search time from O(N) down to O(log K), preventing denial-of-service degradation.'
      },
      {
        question: 'What is the contract between equals() and hashCode() in Java / Python?',
        answer: 'If two objects are equal according to equals(), they MUST return the exact same hashCode(). However, if two objects have the same hashCode(), they are not necessarily equal (a collision). If you override equals(), you must override hashCode(), or the hash map will fail to locate existing keys.'
      },
      {
        question: 'What is Consistent Hashing and why is it used in distributed systems?',
        answer: 'In distributed caching across N servers, traditional `hash(key) % N` invalidates almost all keys when a server joins or leaves. Consistent Hashing maps both servers and keys onto a circular hash ring (0 to 2^32 - 1). Adding or removing a server only relocates K/N keys on average, keeping distributed caches resilient.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Two Sum', platform: 'LeetCode #1', focus: 'One-pass hash complement' },
      { level: 'Beginner', title: 'Contains Duplicate', platform: 'LeetCode #217', focus: 'Hash set presence' },
      { level: 'Intermediate', title: 'Group Anagrams', platform: 'LeetCode #49', focus: 'Hash map with sorted/tuple keys' },
      { level: 'Intermediate', title: 'Subarray Sum Equals K', platform: 'LeetCode #560', focus: 'Prefix sum + frequency hash map' },
      { level: 'Advanced', title: 'LRU Cache', platform: 'LeetCode #146', focus: 'Hash Map + Doubly Linked List' }
    ],
    quickRevisionNotes: [
      'Hash table achieves average O(1) insert, delete, and lookup.',
      'Collisions resolved via Separate Chaining or Open Addressing.',
      'Load factor threshold (typically 0.75) triggers table doubling and rehashing.',
      'In C++, `unordered_map` is O(1) hash; `map` is O(log N) tree.',
      'Always implement both equals and hashCode when creating custom key classes.'
    ],
    knowledgeCheck: [
      {
        question: 'What is the average time complexity to look up a value by key in a well-distributed hash map?',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N^2)'],
        correctAnswer: 2,
        explanation: 'Computing the hash code and mapping to a bucket index takes constant time O(1) on average.'
      },
      {
        question: 'What does a Load Factor of 0.75 in a hash table indicate?',
        options: ['75% of operations fail', 'The table rehashes when 75% of bucket slots are filled', 'The table uses 75% less memory', 'Lookups take 0.75 seconds'],
        correctAnswer: 1,
        explanation: 'Load Factor α = N / M. When the ratio of stored elements N to capacity M exceeds 0.75, the table rehashes with double capacity.'
      },
      {
        question: 'In C++, which container provides O(1) average time hash lookups?',
        options: ['std::map', 'std::vector', 'std::unordered_map', 'std::set'],
        correctAnswer: 2,
        explanation: '`std::unordered_map` is the hash table implementation. `std::map` is an ordered Red-Black tree with O(log N) operations.'
      }
    ]
  },

  trees: {
    id: 'trees',
    title: 'Trees',
    order: 7,
    difficulty: 'Intermediate',
    estimatedTime: '55 mins',
    category: 'Hierarchical Data Structures',
    introduction: `A Tree is a non-linear, hierarchical data structure composed of nodes connected by directed edges. Unlike arrays and linked lists which represent linear sequences, trees represent natural hierarchies: file systems, DOM trees in web browsers, organization charts, abstract syntax trees (ASTs) in compilers, and decision trees in AI.

At the core of tree theory is the **Binary Tree**, where each node has at most two children: a left child and a right child. Trees provide the foundation for Binary Search Trees, Heaps, Tries, AVL trees, and Red-Black trees. Mastering tree traversals (preorder, inorder, postorder, level order) and recursion is a central pillar of technical interviews.`,
    learningObjectives: [
      'Understand tree anatomy: Root, Child, Parent, Leaf, Depth, Height, and Subtree.',
      'Master Depth-First Traversals: Preorder, Inorder, and Postorder.',
      'Master Breadth-First Traversal: Level Order Traversal using a Queue.',
      'Calculate maximum depth / height of a binary tree recursively.',
      'Check if a binary tree is symmetric or balanced.',
      'Implement recursive and iterative tree algorithms in JS, Python, Java, and C++.'
    ],
    prerequisites: ['Recursion and call stack', 'Linked list node references', 'Queue basics for BFS'],
    coreConcepts: `### 1. Fundamental Tree Terminology
- **Root:** The topmost node with no parent.
- **Leaf:** A node with zero children (\`left == null && right == null\`).
- **Edge:** The connection from parent to child. A tree with $N$ nodes has exactly $N - 1$ edges.
- **Depth:** Number of edges from the root down to a given node (Root depth = 0).
- **Height:** Number of edges on the longest path from a node down to a leaf (Leaf height = 0). Height of tree = Height of root.

### 2. Depth-First Traversals (DFS)
DFS visits nodes by diving deep down branches before backtracking:
- **Preorder (Root -> Left -> Right):** Used for copying/serializing a tree.
- **Inorder (Left -> Root -> Right):** In a BST, inorder produces elements in strictly ascending sorted order!
- **Postorder (Left -> Right -> Root):** Used for deleting trees, evaluating expression trees, and bottom-up calculations (height, subtree sum).

### 3. Breadth-First Traversal (BFS / Level Order)
BFS visits all nodes level by level, from left to right.
- Uses a Queue: Push root, and while queue is not empty, loop through all nodes in the current queue level, record their values, and enqueue their children.

### 4. Binary Tree Height via Postorder Recursion
The height of any node is $1 + \\max(\\text{height(left)}, \\text{height(right)})$, with base case height of null = 0 (or -1 depending on edge vs. node definition). This bottom-up postorder pattern is the backbone of most tree problems.`,
    terminology: [
      { term: 'Binary Tree', definition: 'A tree where each node has at most two children, referred to as left and right child.' },
      { term: 'Inorder Traversal', definition: 'Traversing Left subtree, then current Root, then Right subtree.' },
      { term: 'Preorder Traversal', definition: 'Traversing current Root first, then Left subtree, then Right subtree.' },
      { term: 'Postorder Traversal', definition: 'Traversing Left subtree, then Right subtree, and finally current Root.' },
      { term: 'Level Order', definition: 'Traversing the tree row by row from top to bottom using a FIFO queue.' },
      { term: 'Balanced Tree', definition: 'A tree where the heights of the left and right subtrees of every node differ by at most 1.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Tree Traversals on Sample Tree',
        steps: [
          'Given tree: Root 1, Left child 2, Right child 3, Node 2 has Left 4 and Right 5',
          'Preorder (Root, Left, Right): Visit 1 -> Visit 2 -> Visit 4 -> Visit 5 -> Visit 3 => [1, 2, 4, 5, 3]',
          'Inorder (Left, Root, Right): Left of 1 is 2; Left of 2 is 4; Visit 4 -> Visit 2 -> Visit 5 -> Visit 1 -> Visit 3 => [4, 2, 5, 1, 3]',
          'Postorder (Left, Right, Root): Left of 2 is 4; Right of 2 is 5; Visit 4 -> Visit 5 -> Visit 2 -> Visit 3 -> Visit 1 => [4, 5, 2, 3, 1]',
          'Level Order (BFS): Level 0: [1]; Level 1: [2, 3]; Level 2: [4, 5] => [[1], [2, 3], [4, 5]]'
        ]
      }
    ],
    visualExample: `BINARY TREE STRUCTURE & TRAVERSALS

         ( 1 )          <-- Root (Level 0)
        /     \\
     ( 2 )   ( 3 )      <-- Level 1
     /   \\
   ( 4 ) ( 5 )          <-- Leaves (Level 2)

Traversals:
Preorder  (NLR):  1 -> 2 -> 4 -> 5 -> 3
Inorder   (LNR):  4 -> 2 -> 5 -> 1 -> 3
Postorder (LRN):  4 -> 5 -> 2 -> 3 -> 1
Levelorder (BFS): [ [1], [2, 3], [4, 5] ]`,
    codeExamples: [
      {
        title: 'Maximum Depth of Binary Tree',
        description: 'Computes the maximum height (depth) of a binary tree recursively in O(N) time and O(H) call stack space.',
        input: 'root = [3, 9, 20, null, null, 15, 7]',
        output: '3',
        timeComplexity: 'O(N) visiting every node',
        spaceComplexity: 'O(H) recursion stack where H is tree height',
        javascript: `// JavaScript (Node.js ES6+)
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function maxDepth(root) {
  if (root === null) return 0;
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  return 1 + Math.max(leftDepth, rightDepth);
}

// Verification
const root = new TreeNode(3, 
  new TreeNode(9), 
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
console.log("Max Depth:", maxDepth(root)); // 3`,
        python: `# Python 3.10+
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root: TreeNode | None) -> int:
    if root is None:
        return 0
    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)
    return 1 + max(left_depth, right_depth)

# Verification
if __name__ == "__main__":
    tree = TreeNode(3, 
        TreeNode(9), 
        TreeNode(20, TreeNode(15), TreeNode(7))
    )
    print("Max Depth:", max_depth(tree))  # 3`,
        java: `// Java 17+
public class MaxDepthBinaryTree {
    public static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
        TreeNode(int val, TreeNode left, TreeNode right) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }

    public static int maxDepth(TreeNode root) {
        if (root == null) return 0;
        int left = maxDepth(root.left);
        int right = maxDepth(root.right);
        return 1 + Math.max(left, right);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(3, 
            new TreeNode(9), 
            new TreeNode(20, new TreeNode(15), new TreeNode(7))
        );
        System.out.println("Max Depth: " + maxDepth(root)); // 3
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <algorithm>

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode* l, TreeNode* r) : val(x), left(l), right(r) {}
};

int maxDepth(TreeNode* root) {
    if (root == nullptr) return 0;
    int left = maxDepth(root->left);
    int right = maxDepth(root->right);
    return 1 + std::max(left, right);
}

int main() {
    TreeNode* root = new TreeNode(3, 
        new TreeNode(9), 
        new TreeNode(20, new TreeNode(15), new TreeNode(7))
    );
    std::cout << "Max Depth: " << maxDepth(root) << "\\n"; // 3
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Tree Traversal (Pre, In, Post, BFS)', timeComplexity: 'O(N)', spaceComplexity: 'O(H) DFS / O(W) BFS', notes: 'Visits every node once. H=height, W=max width' },
      { operation: 'Max Depth / Height', timeComplexity: 'O(N)', spaceComplexity: 'O(H)', notes: 'Bottom-up postorder recursion' },
      { operation: 'Best Case Height (Balanced Tree)', timeComplexity: 'O(log N)', spaceComplexity: '-', notes: 'Each level doubles capacity' },
      { operation: 'Worst Case Height (Skewed Tree)', timeComplexity: 'O(N)', spaceComplexity: '-', notes: 'Degenerates into a linked list' }
    ],
    commonMistakes: [
      'Missing the Base Case: Forgetting `if (root === null) return 0;` leads to immediate stack overflow.',
      'Confusing Depth and Height: Depth is measured downwards from the root; height is measured upwards from the deepest leaf.',
      'Assuming all trees are balanced: In a skewed tree, recursion depth is O(N), not O(log N).',
      'Memory leaks in iterative traversals: Forgetting to pop nodes from stack/queue during while loops.',
      'Overcomplicating symmetric tree checks: A tree is symmetric if Left.left == Right.right and Left.right == Right.left.'
    ],
    interviewQuestions: [
      {
        question: 'Why does Inorder Traversal of a Binary Search Tree (BST) produce values in sorted ascending order?',
        answer: 'By definition of a BST, for any node X, all values in its left subtree are strictly smaller than X, and all values in its right subtree are strictly greater. Inorder processes Left first, then X, then Right, which naturally mirrors the sorted numerical sequence.'
      },
      {
        question: 'How does Level Order Traversal keep track of which level each node belongs to?',
        answer: 'Before looping through the queue in BFS, take snapshot of current queue size `levelSize = queue.size()`. Iterate exactly `levelSize` times to dequeue and collect only the nodes on the current level, enqueuing their children for the next level.'
      },
      {
        question: 'What is the Lowest Common Ancestor (LCA) in a binary tree and how is it found?',
        answer: 'The LCA of two nodes p and q is the deepest node that has both p and q as descendants. In postorder recursion: if root is null, p, or q, return root. Recurse left and right. If both left and right return non-null, root is the LCA. If only one returns non-null, propagate that non-null node upwards.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Maximum Depth of Binary Tree', platform: 'LeetCode #104', focus: 'Bottom-up recursion' },
      { level: 'Beginner', title: 'Invert Binary Tree', platform: 'LeetCode #226', focus: 'Tree manipulation' },
      { level: 'Intermediate', title: 'Binary Tree Level Order Traversal', platform: 'LeetCode #102', focus: 'Queue-based BFS' },
      { level: 'Intermediate', title: 'Lowest Common Ancestor of a Binary Tree', platform: 'LeetCode #236', focus: 'Postorder divide & conquer' },
      { level: 'Advanced', title: 'Binary Tree Maximum Path Sum', platform: 'LeetCode #124', focus: 'Subtree return vs global max update' }
    ],
    quickRevisionNotes: [
      'Binary tree: each node has at most 2 children.',
      'Preorder: Root -> Left -> Right. Inorder: Left -> Root -> Right. Postorder: Left -> Right -> Root.',
      'Level order traversal uses a Queue with levelSize snapshotting.',
      'Height of a balanced tree is O(log N); skewed tree is O(N).',
      'Most tree problems reduce to postorder recursion: solve left, solve right, combine at root.'
    ],
    knowledgeCheck: [
      {
        question: 'Which traversal algorithm yields elements of a Binary Search Tree in sorted ascending order?',
        options: ['Preorder', 'Inorder', 'Postorder', 'Level Order'],
        correctAnswer: 1,
        explanation: 'Inorder traversal visits Left subtree (smaller), Root (middle), then Right subtree (larger), producing strictly ascending sorted output.'
      },
      {
        question: 'A complete binary tree with N nodes has a height of approximately:',
        options: ['O(N)', 'O(log N)', 'O(N^2)', 'O(1)'],
        correctAnswer: 1,
        explanation: 'Because each level doubles in capacity (1, 2, 4, 8, ...), the number of levels required to hold N nodes is log2(N).'
      },
      {
        question: 'What data structure is used to implement Level Order (Breadth-First) Traversal of a tree?',
        options: ['Stack', 'Queue', 'Priority Queue', 'Hash Map'],
        correctAnswer: 1,
        explanation: 'A FIFO Queue ensures nodes discovered first at an upper level are processed before any child nodes at deeper levels.'
      }
    ]
  },

  bst: {
    id: 'bst',
    title: 'Binary Search Trees (BST)',
    order: 8,
    difficulty: 'Intermediate',
    estimatedTime: '50 mins',
    category: 'Hierarchical Data Structures',
    introduction: `A Binary Search Tree (BST) is a specialized binary tree that maintains a strict ordering invariant: for every node $X$, all values in $X$'s left subtree are **strictly less than** $X$, and all values in $X$'s right subtree are **strictly greater than** $X$.

This fundamental invariant enables binary-search-like capabilities on dynamic tree structures. Lookups, insertions, and deletions run in **O(log N) time** on balanced BSTs. BSTs form the algorithmic core of self-balancing trees (AVL trees, Red-Black Trees), ordered maps in standard libraries (C++ \`std::map\`, Java \`TreeMap\`), database indexing (B-Trees), and range query engines.`,
    learningObjectives: [
      'Master the BST ordering property and its mathematical implications.',
      'Implement Search, Insert, and Delete operations with exact pointer rewiring.',
      'Handle the three cases of BST node deletion (0 children, 1 child, 2 children).',
      'Validate whether an arbitrary binary tree is a valid BST using range boundaries (-∞, +∞).',
      'Find the Inorder Successor and Inorder Predecessor of a node.',
      'Write clean BST implementations in JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Binary Trees and recursive traversals', 'Binary Search concept on sorted arrays'],
    coreConcepts: `### 1. The BST Ordering Invariant
For every node $N$:
\`All nodes in LeftSubtree(N) < N.val < All nodes in RightSubtree(N)\`
Notice this applies to **all descendants** in the entire subtree, not merely the immediate left and right children!

### 2. Search & Insertion
- **Search(target):** Compare target with root. If equal, return node. If target < root.val, search left subtree. If target > root.val, search right subtree. Average time: O(log N); worst case O(N) if skewed.
- **Insert(val):** Trace the search path until hitting a null reference, then link the new node as a child at that spot.

### 3. Deletion (The Three Cases)
Deleting a node $Z$ from a BST requires maintaining the invariant:
- **Case 1 (Leaf Node):** $Z$ has no children. Simply disconnect $Z$ from its parent.
- **Case 2 (Single Child):** $Z$ has one child. Replace $Z$ with its child (bypass $Z$).
- **Case 3 (Two Children):** $Z$ has both left and right children.
  1. Find $Z$'s **inorder successor** (the minimum node in $Z$'s right subtree).
  2. Copy the successor's value into $Z$.
  3. Delete the successor node from the right subtree (which has at most one child!).

### 4. Validating a BST
A common mistake is checking only \`node.left.val < node.val < node.right.val\`. This fails for trees where a right descendant is smaller than an ancestor!
**Correct Approach:** Pass dynamic valid bounds \`(minBound, maxBound)\` down the recursion:
- Left child must satisfy: \`(minBound, node.val)\`
- Right child must satisfy: \`(node.val, maxBound)\`

### 5. Self-Balancing Trees (AVL & Red-Black)
If elements are inserted in sorted order (1, 2, 3, 4, 5), an unconstrained BST degenerates into a linear linked list with O(N) operations. Self-balancing trees apply tree rotations during insertions/deletions to ensure height remains strictly bounded by $O(\\log N)$.`,
    terminology: [
      { term: 'Inorder Successor', definition: 'The node with the smallest value greater than a given node (leftmost node in the right subtree).' },
      { term: 'Inorder Predecessor', definition: 'The node with the largest value smaller than a given node (rightmost node in the left subtree).' },
      { term: 'Degenerate / Skewed Tree', definition: 'A BST where every node has only one child, behaving like a singly linked list with O(N) performance.' },
      { term: 'Tree Rotation', definition: 'A local operation in self-balancing BSTs that changes tree structure without violating inorder sequence.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step BST Deletion (Two Children Case)',
        steps: [
          'Given BST with root 10. Left is 5, Right is 15. Node 15 has Left 12 and Right 20.',
          'Goal: Delete node 10 (root has two children: 5 and 15).',
          'Step 1: Locate inorder successor of 10 -> minimum node in right subtree.',
          'Walk to right child (15), then walk all the way left -> Node 12 is successor.',
          'Step 2: Copy value 12 into root: root.val = 12.',
          'Step 3: Recursively delete node 12 from right subtree (15). Since 12 is a leaf, remove it directly.',
          'New valid BST root is 12, left is 5, right is 15 (with right child 20)!'
        ]
      }
    ],
    visualExample: `BINARY SEARCH TREE ORDERING & VALIDATION

          [ 10 ]               Valid range: (-inf, +inf)
         /      \\
      [ 5 ]    [ 15 ]          Left range: (-inf, 10), Right range: (10, +inf)
     /    \\    /    \\
   [ 2 ] [ 7 ][ 12 ][ 18 ]     12 is correctly > 10 and < 15!

Invalid Example to watch out for:
          [ 10 ]
         /      \\
      [ 5 ]    [ 15 ]
               /
            [ 6 ]   <--- INVALID! 6 is less than root 10, violating BST!`,
    codeExamples: [
      {
        title: 'Validate Binary Search Tree',
        description: 'Verifies whether a binary tree is a valid BST using range boundaries in O(N) time and O(H) space.',
        input: 'root = [2, 1, 3]',
        output: 'true',
        timeComplexity: 'O(N) visiting each node',
        spaceComplexity: 'O(H) recursion stack space',
        javascript: `// JavaScript (Node.js ES6+)
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;

  if (root.val <= min || root.val >= max) {
    return false;
  }

  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}

// Verification
const validTree = new TreeNode(2, new TreeNode(1), new TreeNode(3));
console.log("Is valid BST:", isValidBST(validTree)); // true

const invalidTree = new TreeNode(5, 
  new TreeNode(1), 
  new TreeNode(4, new TreeNode(3), new TreeNode(6))
);
console.log("Is valid BST:", isValidBST(invalidTree)); // false`,
        python: `# Python 3.10+
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root: TreeNode | None, min_val=float('-inf'), max_val=float('inf')) -> bool:
    if root is None:
        return True

    if not (min_val < root.val < max_val):
        return False

    return (
        is_valid_bst(root.left, min_val, root.val) and
        is_valid_bst(root.right, root.val, max_val)
    )

# Verification
if __name__ == "__main__":
    valid_tree = TreeNode(2, TreeNode(1), TreeNode(3))
    print("Is valid BST:", is_valid_bst(valid_tree))  # True

    invalid_tree = TreeNode(5, TreeNode(1), TreeNode(4, TreeNode(3), TreeNode(6)))
    print("Is valid BST:", is_valid_bst(invalid_tree))  # False`,
        java: `// Java 17+
public class ValidateBST {
    public static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
        TreeNode(int val, TreeNode left, TreeNode right) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }

    public static boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }

    private static boolean validate(TreeNode node, Integer min, Integer max) {
        if (node == null) return true;

        if ((min != null && node.val <= min) || (max != null && node.val >= max)) {
            return false;
        }

        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }

    public static void main(String[] args) {
        TreeNode valid = new TreeNode(2, new TreeNode(1), new TreeNode(3));
        System.out.println("Is valid BST: " + isValidBST(valid)); // true

        TreeNode invalid = new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6)));
        System.out.println("Is valid BST: " + isValidBST(invalid)); // false
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <optional>

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode* l, TreeNode* r) : val(x), left(l), right(r) {}
};

bool validate(TreeNode* node, std::optional<int> minVal, std::optional<int> maxVal) {
    if (node == nullptr) return true;

    if ((minVal.has_value() && node->val <= minVal.value()) ||
        (maxVal.has_value() && node->val >= maxVal.value())) {
        return false;
    }

    return validate(node->left, minVal, node->val) &&
           validate(node->right, node->val, maxVal);
}

bool isValidBST(TreeNode* root) {
    return validate(root, std::nullopt, std::nullopt);
}

int main() {
    std::cout << std::boolalpha;
    TreeNode* valid = new TreeNode(2, new TreeNode(1), new TreeNode(3));
    std::cout << "Is valid BST: " << isValidBST(valid) << "\\n"; // true

    TreeNode* invalid = new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6)));
    std::cout << "Is valid BST: " << isValidBST(invalid) << "\\n"; // false
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Search / Insert / Delete (Balanced BST)', timeComplexity: 'O(log N)', spaceComplexity: 'O(log N) stack', notes: 'Halves the search space at every step' },
      { operation: 'Search / Insert / Delete (Skewed BST)', timeComplexity: 'O(N)', spaceComplexity: 'O(N) stack', notes: 'Degenerates to linked list on sorted input' },
      { operation: 'Inorder Traversal (Sorted Output)', timeComplexity: 'O(N)', spaceComplexity: 'O(H)', notes: 'Yields elements in strictly ascending order' },
      { operation: 'Find Min / Max', timeComplexity: 'O(H)', spaceComplexity: 'O(1)', notes: 'Walk leftmost (min) or rightmost (max)' }
    ],
    commonMistakes: [
      'Local vs Global BST verification: Checking only `node.left < node < node.right` fails when an indirect descendant violates ancestor bounds.',
      'Integer Overflow on boundary checks: Using Integer.MIN_VALUE or Integer.MAX_VALUE with <= or >= can overflow; use Long or null objects.',
      'Losing pointers during Case 3 deletion: Incorrectly updating the parent of the inorder successor causes tree disconnection.',
      'Assuming duplicate values are handled automatically: Traditional BSTs do not support duplicates unless explicitly stored as frequency counters.',
      'Neglecting tree balancing: Naively inserting sorted inputs into a standard BST yields an O(N) degenerate linked list.'
    ],
    interviewQuestions: [
      {
        question: 'How do you find the Inorder Successor of a given node in a BST?',
        answer: 'If the node has a right child, the successor is the leftmost node in that right subtree. If the node has no right child, traverse from the root downwards: whenever you turn left at an ancestor, that ancestor becomes the latest candidate successor. When you reach the target, the recorded candidate is the successor.'
      },
      {
        question: 'How does an AVL Tree maintain O(log N) worst-case height?',
        answer: 'An AVL tree enforces that for every node, the height difference (balance factor) between left and right subtrees is at most 1 (-1, 0, or 1). Upon insertion or deletion, if balance factor becomes 2 or -2, it performs one of four rotations (Left-Left, Right-Right, Left-Right, Right-Left) in O(1) time to restore balance.'
      },
      {
        question: 'How can you convert a Sorted Array into a Height-Balanced BST in O(N) time?',
        answer: 'Pick the middle element `mid = (left + right) / 2` as the root. Recursively construct the left subtree from elements `left..mid-1` and the right subtree from `mid+1..right`. Because the midpoint splits elements evenly, the resulting tree is guaranteed to be height-balanced.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Search in a Binary Search Tree', platform: 'LeetCode #700', focus: 'BST navigation' },
      { level: 'Beginner', title: 'Insert into a Binary Search Tree', platform: 'LeetCode #701', focus: 'Leaf insertion' },
      { level: 'Intermediate', title: 'Validate Binary Search Tree', platform: 'LeetCode #98', focus: 'Bounded recursion' },
      { level: 'Intermediate', title: 'Delete Node in a BST', platform: 'LeetCode #450', focus: 'Inorder successor replacement' },
      { level: 'Advanced', title: 'Kth Smallest Element in a BST', platform: 'LeetCode #230', focus: 'Inorder traversal counting' }
    ],
    quickRevisionNotes: [
      'BST Invariant: LeftSubtree < Node < RightSubtree for all descendants.',
      'Inorder traversal produces elements in strictly sorted order.',
      'Balanced BST operations are O(log N); skewed tree degrades to O(N).',
      'Validate BST by threading `(minBound, maxBound)` ranges down recursively.',
      'Deleting node with 2 children: replace with inorder successor, then delete successor.'
    ],
    knowledgeCheck: [
      {
        question: 'In a BST with N elements, what is the worst-case search time complexity if elements were inserted in strictly ascending order?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correctAnswer: 2,
        explanation: 'Inserting sorted elements produces a completely right-skewed tree resembling a linked list of height N, resulting in O(N) search time.'
      },
      {
        question: 'Where is the Minimum element located in any valid BST?',
        options: ['At the root', 'At the rightmost leaf', 'At the leftmost node', 'At the level with most nodes'],
        correctAnswer: 2,
        explanation: 'Because every left branch leads to smaller values, starting at root and repeatedly following left pointers reaches the global minimum.'
      },
      {
        question: 'When deleting a BST node with two children, which node is swapped in to take its place?',
        options: ['The root node', 'The Inorder Successor (or Predecessor)', 'Any leaf node', 'The right child directly'],
        correctAnswer: 1,
        explanation: 'The Inorder Successor (smallest value in right subtree) is strictly greater than all left descendants and smaller than all remaining right descendants.'
      }
    ]
  },

  heaps: {
    id: 'heaps',
    title: 'Heaps',
    order: 9,
    difficulty: 'Intermediate',
    estimatedTime: '50 mins',
    category: 'Non-Linear Data Structures',
    introduction: `A Heap is a specialized tree-based data structure that satisfies the **Heap Property**. In a **Min-Heap**, the value of every parent node is less than or equal to the values of its children, meaning the global minimum is always at the root. In a **Max-Heap**, the parent is always greater than or equal to its children, keeping the global maximum at the root.

Crucially, binary heaps are **complete binary trees**, which allows them to be represented compactly within a flat 1D array without any pointers! Heaps power Priority Queues, Heap Sort (O(N log N) in-place), Dijkstra Shortest Path, Prim Minimum Spanning Tree, and streaming Top-K / Median element problems.`,
    learningObjectives: [
      'Understand Min-Heap and Max-Heap properties and complete binary tree layout.',
      'Master the array representation of heaps and parent/child index arithmetic.',
      'Implement `heapifyDown` (sift-down) and `heapifyUp` (sift-up) operations in O(log N) time.',
      'Build a heap from an arbitrary array in O(N) linear time.',
      'Solve Top-K Frequent Elements and Kth Largest Element using bounded heaps.',
      'Write Priority Queue code across JavaScript, Python, Java, and C++.'
    ],
    prerequisites: ['Arrays and 0-based indexing', 'Complete binary trees concepts'],
    coreConcepts: `### 1. The Array Representation of a Binary Heap
Because a binary heap is a complete binary tree (filled on all levels except possibly the last, which is filled from left to right), it requires zero pointers. For any element at index $i$:
- **Parent:** \`Math.floor((i - 1) / 2)\`
- **Left Child:** \`2 * i + 1\`
- **Right Child:** \`2 * i + 2\`

### 2. Heap Operations
- **peek():** Read root element at \`arr[0]\` in **O(1)** time.
- **push(val):** Append val to the end of the array, then **heapifyUp** (swap with parent while smaller in Min-Heap) until heap property is restored. Cost: **O(log N)**.
- **pop():** Swap root \`arr[0]\` with the last element \`arr[len - 1]\`, remove the last element, then **heapifyDown** the new root (swap with smaller child) until property is restored. Cost: **O(log N)**.

### 3. Linear-Time Heap Construction (Build Heap in O(N))
If you insert $N$ elements into an empty heap one by one, it takes $O(N \\log N)$.
However, running \`heapifyDown\` starting from the last non-leaf node down to the root builds a heap in **O(N) time**!
Mathematically, most nodes reside near the bottom with small heights; the summation $\\sum_{h=0}^{\\log N} \\frac{N}{2^{h+1}} \\times h$ converges to $O(N)$.

### 4. Solving Top-K Problems with Heaps
- **Find K Largest Elements:** Maintain a **Min-Heap** of size $K$. For each incoming element, push it; if heap size exceeds $K$, pop the minimum. At the end, the heap contains the $K$ largest items, and the root is the $K$-th largest! Time: $O(N \\log K)$ instead of sorting $O(N \\log N)$.
- **Find K Smallest Elements:** Maintain a **Max-Heap** of size $K$.`,
    terminology: [
      { term: 'Complete Binary Tree', definition: 'A binary tree completely filled at all levels except possibly the bottom level, which is filled from left to right.' },
      { term: 'Heapify-Up (Sift-Up)', definition: 'Moving a node up the tree by swapping with its parent until heap ordering is satisfied.' },
      { term: 'Heapify-Down (Sift-Down)', definition: 'Moving a node down the tree by swapping with its smaller/larger child until heap ordering is satisfied.' },
      { term: 'Priority Queue', definition: 'An abstract data type where each element has a priority, and the element with highest priority is served first.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Heapify-Up on Min-Heap Push(2)',
        steps: [
          'Current Min-Heap Array: [3, 5, 8, 10, 12, 14]',
          'Append 2 at the end: array becomes [3, 5, 8, 10, 12, 14, 2], new index i = 6',
          'Parent of index 6: floor((6 - 1) / 2) = index 2 (value 8)',
          'Is 2 < 8? YES! Swap index 6 and 2 -> [3, 5, 2, 10, 12, 14, 8], i is now 2',
          'Parent of index 2: floor((2 - 1) / 2) = index 0 (value 3)',
          'Is 2 < 3? YES! Swap index 2 and 0 -> [2, 5, 3, 10, 12, 14, 8], i is now 0 (root)',
          'Reached root. Min-heap property fully restored in O(log N) time!'
        ]
      }
    ],
    visualExample: `BINARY HEAP TREE VS FLAT ARRAY MAPPING

Tree Form:
             [ 2 ] (index 0)
            /     \\
     [ 5 ] (1)   [ 3 ] (2)
     /   \\       /   \\
 [10](3) [12](4)[14](5)[ 8 ](6)

Flat Array:
Index:   0    1    2    3    4    5    6
Array: [ 2 |  5 |  3 | 10 | 12 | 14 |  8 ]

Parent Formula: Math.floor((i - 1) / 2)
Left Child:     2 * i + 1
Right Child:    2 * i + 2`,
    codeExamples: [
      {
        title: 'Kth Largest Element in an Array',
        description: 'Finds the Kth largest element using a Min-Heap of size K in O(N log K) time and O(K) space.',
        input: 'nums = [3, 2, 1, 5, 6, 4], k = 2',
        output: '5',
        timeComplexity: 'O(N log K) bounded heap',
        spaceComplexity: 'O(K) auxiliary heap storage',
        javascript: `// JavaScript (Node.js ES6+)
// Simple Min-Heap implementation
class MinHeap {
  constructor() { this.heap = []; }
  size() { return this.heap.length; }
  peek() { return this.heap[0]; }

  push(val) {
    this.heap.push(val);
    this._siftUp(this.heap.length - 1);
  }

  pop() {
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._siftDown(0);
    }
    return min;
  }

  _siftUp(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.heap[i] < this.heap[p]) {
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
      } else break;
    }
  }

  _siftDown(i) {
    const len = this.heap.length;
    while (2 * i + 1 < len) {
      let smallest = 2 * i + 1;
      const right = 2 * i + 2;
      if (right < len && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }
      if (this.heap[smallest] < this.heap[i]) {
        [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
        i = smallest;
      } else break;
    }
  }
}

function findKthLargest(nums, k) {
  const minHeap = new MinHeap();
  for (const num of nums) {
    minHeap.push(num);
    if (minHeap.size() > k) {
      minHeap.pop();
    }
  }
  return minHeap.peek();
}

console.log("2nd Largest:", findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5`,
        python: `# Python 3.10+
import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return min_heap[0]

# Verification
if __name__ == "__main__":
    print("2nd Largest:", find_kth_largest([3, 2, 1, 5, 6, 4], 2))  # 5`,
        java: `// Java 17+
import java.util.PriorityQueue;

public class KthLargest {
    public static int findKthLargest(int[] nums, int k) {
        // Min-heap of size k
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }

    public static void main(String[] args) {
        int[] arr = {3, 2, 1, 5, 6, 4};
        System.out.println("2nd Largest: " + findKthLargest(arr, 2)); // 5
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <vector>
#include <queue>

int findKthLargest(const std::vector<int>& nums, int k) {
    // Min-heap in C++: priority_queue<T, vector<T>, greater<T>>
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;

    for (int num : nums) {
        minHeap.push(num);
        if (static_cast<int>(minHeap.size()) > k) {
            minHeap.pop();
        }
    }
    return minHeap.top();
}

int main() {
    std::cout << "2nd Largest: " << findKthLargest({3, 2, 1, 5, 6, 4}, 2) << "\\n"; // 5
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'peek()', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Direct access to root arr[0]' },
      { operation: 'push() (Insert)', timeComplexity: 'O(log N)', spaceComplexity: 'O(1)', notes: 'Sifts up at most tree height H = log2(N)' },
      { operation: 'pop() (Extract Min/Max)', timeComplexity: 'O(log N)', spaceComplexity: 'O(1)', notes: 'Sifts down new root to leaf' },
      { operation: 'Build Heap (Heapify all)', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Bottom-up mathematical summation' },
      { operation: 'Search arbitrary value', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Heaps do not enforce left-right horizontal order' }
    ],
    commonMistakes: [
      'Assuming Heaps are fully sorted: Only parent-child relationships are ordered. The left child is NOT necessarily smaller than the right child!',
      'Using Max-Heap for Kth Largest: Using a Max-Heap requires storing all N elements (O(N) space). A Min-Heap of size K requires only O(K) space.',
      'C++ priority_queue default is Max-Heap: `std::priority_queue<int>` is a Max-Heap. For a Min-Heap, use `std::greater<int>`.',
      'Python heapq default is Min-Heap: To simulate a Max-Heap in Python, invert signs (`-val`).',
      'Thinking Build-Heap is O(N log N): Iterating backwards and calling siftDown on internal nodes takes O(N), not O(N log N).'
    ],
    interviewQuestions: [
      {
        question: 'Why does Build Heap run in O(N) linear time instead of O(N log N)?',
        answer: 'Most nodes in a binary tree are near the leaves (N/2 leaves have height 0, N/4 nodes have height 1, etc.). By running heapify-down bottom-up, the largest number of nodes do almost zero work, while only the single root does log N work. The formal summation sum(h / 2^h) converges to a constant, making total operations O(N).'
      },
      {
        question: 'How do you find the Median of a continuous stream of numbers in real time?',
        answer: 'Maintain two balanced heaps: a Max-Heap for the smaller half of numbers, and a Min-Heap for the larger half. Balance the heaps so their sizes differ by at most 1. The median is either the root of the larger heap, or the average of both roots in O(1) time.'
      },
      {
        question: 'Why are heaps represented using arrays instead of node pointers?',
        answer: 'Because binary heaps are complete binary trees, there are never gaps between nodes. This allows storing them contiguously in an array with mathematical index formulas (2i+1, 2i+2), eliminating pointer memory overhead (8 bytes per pointer) and maximizing CPU cache line spatial locality.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Kth Largest Element in an Array', platform: 'LeetCode #215', focus: 'Bounded min-heap' },
      { level: 'Beginner', title: 'Last Stone Weight', platform: 'LeetCode #1046', focus: 'Max-heap simulation' },
      { level: 'Intermediate', title: 'Top K Frequent Elements', platform: 'LeetCode #347', focus: 'Frequency map + Min-heap' },
      { level: 'Intermediate', title: 'Find Median from Data Stream', platform: 'LeetCode #295', focus: 'Two heaps (min/max) balance' },
      { level: 'Advanced', title: 'Merge k Sorted Lists', platform: 'LeetCode #23', focus: 'K-way merge with Min-heap' }
    ],
    quickRevisionNotes: [
      'Min-heap: root is minimum. Max-heap: root is maximum.',
      'Binary heaps are complete binary trees mapped directly into 1D arrays.',
      'Index formulas: Parent = (i-1)/2, Left = 2i+1, Right = 2i+2.',
      'Push and Pop run in O(log N) time; Peek runs in O(1).',
      'Build Heap runs in O(N) linear time using bottom-up sift-down.'
    ],
    knowledgeCheck: [
      {
        question: 'In a 0-indexed binary heap, what is the index of the parent of node at index 7?',
        options: ['index 2', 'index 3', 'index 4', 'index 5'],
        correctAnswer: 1,
        explanation: 'Parent formula: Math.floor((i - 1) / 2) = Math.floor((7 - 1) / 2) = Math.floor(6 / 2) = 3.'
      },
      {
        question: 'What is the time complexity to build a binary heap from an unsorted array of size N using bottom-up heapify?',
        options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
        correctAnswer: 1,
        explanation: 'Bottom-up sift-down takes advantage of the fact that the majority of nodes are near the bottom of the tree, mathematically summing to O(N).'
      },
      {
        question: 'To find the K largest elements in a stream of N elements using optimal O(K) space, which heap should be used?',
        options: ['A Max-Heap of size N', 'A Min-Heap of size K', 'A Max-Heap of size K', 'A Min-Heap of size N'],
        correctAnswer: 1,
        explanation: 'A Min-Heap of size K retains the K largest elements. The smallest of the top K sits at the root, ready to be ejected whenever a larger number arrives.'
      }
    ]
  },

  graphs: {
    id: 'graphs',
    title: 'Graphs',
    order: 10,
    difficulty: 'Intermediate',
    estimatedTime: '60 mins',
    category: 'Non-Linear Data Structures',
    introduction: `A Graph $G = (V, E)$ is the most versatile non-linear data structure in computer science. It consists of a set of vertices (nodes) $V$ and a set of edges $E$ that connect pairs of vertices. Unlike trees, graphs can contain cycles, multiple disconnected components, self-loops, and bidirectional connections.

Graphs model real-world networks: social connections (LinkedIn, Facebook), routing and navigation (Google Maps GPS), internet hyperlink graphs (Google PageRank), dependency resolution in package managers (npm, pip), and financial fraud rings. Mastering graph representations, BFS, DFS, cycle detection, topological sorting, and shortest path algorithms is indispensable for senior engineering interviews.`,
    learningObjectives: [
      'Understand graph types: Directed vs. Undirected, Weighted vs. Unweighted, Cyclic vs. Acyclic (DAG).',
      'Contrast Adjacency List and Adjacency Matrix representations in memory and time.',
      'Implement Breadth-First Search (BFS) and Depth-First Search (DFS) with visited tracking.',
      'Detect cycles in directed and undirected graphs.',
      'Implement Kahn Algorithm for Topological Sorting in Directed Acyclic Graphs (DAG).',
      'Understand Dijkstra Shortest Path and Minimum Spanning Trees (Kruskal/Prim).'
    ],
    prerequisites: ['Queues for BFS', 'Recursion & Stacks for DFS', 'Hash maps and sets for adjacency lists'],
    coreConcepts: `### 1. Graph Representations
- **Adjacency Matrix:** A 2D array of size $V \\times V$ where \`matrix[u][v] = 1\` indicates an edge.
  - Pros: O(1) edge lookup.
  - Cons: O(V^2) space overhead; slow O(V) neighbor iteration for sparse graphs.
- **Adjacency List:** An array or hash map of lists where \`adj[u]\` lists all neighbors of $u$.
  - Pros: Optimal $O(V + E)$ space; fast iteration over neighbors. Preferred for technical interviews!

### 2. Breadth-First Search (BFS)
Explores outward in concentric waves.
- Uses a **Queue** and a **visited** Set.
- Finds the **shortest path in unweighted graphs**.
- Time: $O(V + E)$, Space: $O(V)$.

### 3. Depth-First Search (DFS)
Explores down a path as far as possible before backtracking.
- Uses **Recursion** (call stack) or an explicit Stack, plus a **visited** Set.
- Used for connected components, path finding, maze solving, and cycle detection.
- Time: $O(V + E)$, Space: $O(V)$.

### 4. Cycle Detection
- **Undirected Graph:** A cycle exists if during DFS/BFS we encounter an already-visited neighbor that is NOT the immediate parent of the current node.
- **Directed Graph:** Requires tracking nodes currently in the active recursion call stack (3-color state: unvisited, visiting, visited). If we encounter a node currently in the active stack (back-edge), a cycle exists!

### 5. Topological Sorting (Kahn's Algorithm)
A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge $u \\to v$, $u$ appears before $v$.
1. Compute the **in-degree** (number of incoming edges) for every vertex.
2. Enqueue all vertices with in-degree = 0.
3. While queue is not empty: dequeue $u$, append to ordering, decrement in-degree for all neighbors of $u$. If any neighbor reaches in-degree = 0, enqueue it.
4. If the result contains fewer than $V$ nodes, the graph contains a cycle!`,
    terminology: [
      { term: 'Vertex (Node)', definition: 'An individual data point in the graph.' },
      { term: 'Edge', definition: 'A connection between two vertices (can be directed or undirected, weighted or unweighted).' },
      { term: 'In-Degree', definition: 'The count of incoming edges pointing into a vertex in a directed graph.' },
      { term: 'Out-Degree', definition: 'The count of outgoing edges pointing away from a vertex.' },
      { term: 'DAG', definition: 'Directed Acyclic Graph: a directed graph with no cycles, required for topological sorting.' },
      { term: 'Connected Component', definition: 'A maximal subgraph in which any two vertices are connected to each other by paths.' }
    ],
    stepByStepExamples: [
      {
        title: 'Step-by-Step Topological Sort (Course Schedule): 4 courses',
        steps: [
          'Given prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]] (Edges: 0->1, 0->2, 1->3, 2->3)',
          'Compute in-degrees: 0: 0 in-degree; 1: 1 in-degree; 2: 1 in-degree; 3: 2 in-degree',
          'Enqueue nodes with in-degree == 0: Queue = [0]',
          'Step 1: Dequeue 0. Add 0 to order. Decrement neighbors 1 and 2: in-degrees become 1: 0, 2: 0. Enqueue 1 and 2. Queue = [1, 2]',
          'Step 2: Dequeue 1. Add 1 to order. Decrement neighbor 3 (in-degree becomes 1).',
          'Step 3: Dequeue 2. Add 2 to order. Decrement neighbor 3 (in-degree becomes 0). Enqueue 3. Queue = [3]',
          'Step 4: Dequeue 3. Add 3 to order.',
          'Final Valid Topological Order: [0, 1, 2, 3]! All 4 courses completed successfully.'
        ]
      }
    ],
    visualExample: `GRAPH TOPOLOGICAL SORT (DAG)

    ( 0 ) ----------+
    /   \\           |
   v     v          |
 ( 1 )  ( 2 )       |
   \\     /          |
    v   v           v
    ( 3 ) <---------+

In-Degrees:
Node 0: 0  (Can start immediately!)
Node 1: 1  (Needs 0)
Node 2: 1  (Needs 0)
Node 3: 2  (Needs 1 and 2)

Valid Topological Execution Order: 0 -> 1 -> 2 -> 3`,
    codeExamples: [
      {
        title: 'Course Schedule (Topological Sort / Cycle Detection)',
        description: 'Determines if all courses can be finished using Kahn Algorithm (in-degree BFS) in O(V + E) time.',
        input: 'numCourses = 4, prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]]',
        output: 'true (Topological ordering exists: [0, 1, 2, 3])',
        timeComplexity: 'O(V + E) graph traversal',
        spaceComplexity: 'O(V + E) adjacency list & in-degree array',
        javascript: `// JavaScript (Node.js ES6+)
function canFinish(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);

  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let completedCount = 0;
  while (queue.length > 0) {
    const curr = queue.shift();
    completedCount++;

    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return completedCount === numCourses;
}

// Verification
console.log("Can finish 4 courses:", canFinish(4, [[1, 0], [2, 0], [3, 1], [3, 2]])); // true
console.log("Can finish cycle (1<->0):", canFinish(2, [[1, 0], [0, 1]])); // false`,
        python: `# Python 3.10+
from collections import deque

def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    in_degree = [0] * num_courses
    adj = [[] for _ in range(num_courses)]

    for course, prereq in prerequisites:
        adj[prereq].append(course)
        in_degree[course] += 1

    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    completed_count = 0

    while queue:
        curr = queue.popleft()
        completed_count += 1

        for neighbor in adj[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return completed_count == num_courses

# Verification
if __name__ == "__main__":
    print("Can finish:", can_finish(4, [[1, 0], [2, 0], [3, 1], [3, 2]]))  # True
    print("Can finish cycle:", can_finish(2, [[1, 0], [0, 1]]))           # False`,
        java: `// Java 17+
import java.util.*;

public class CourseSchedule {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        int[] inDegree = new int[numCourses];
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());

        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            inDegree[p[0]]++;
        }

        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) queue.offer(i);
        }

        int count = 0;
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            count++;
            for (int neighbor : adj.get(curr)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        return count == numCourses;
    }

    public static void main(String[] args) {
        int[][] pre = {{1, 0}, {2, 0}, {3, 1}, {3, 2}};
        System.out.println("Can finish: " + canFinish(4, pre)); // true
    }
}`,
        cpp: `// C++ 20
#include <iostream>
#include <vector>
#include <queue>

bool canFinish(int numCourses, const std::vector<std::vector<int>>& prerequisites) {
    std::vector<int> inDegree(numCourses, 0);
    std::vector<std::vector<int>> adj(numCourses);

    for (const auto& p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        inDegree[p[0]]++;
    }

    std::queue<int> q;
    for (int i = 0; i < numCourses; ++i) {
        if (inDegree[i] == 0) q.push(i);
    }

    int count = 0;
    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        count++;

        for (int neighbor : adj[curr]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }
    return count == numCourses;
}

int main() {
    std::cout << std::boolalpha;
    std::cout << "Can finish: " << canFinish(4, {{1, 0}, {2, 0}, {3, 1}, {3, 2}}) << "\\n"; // true
    std::cout << "Can finish cycle: " << canFinish(2, {{1, 0}, {0, 1}}) << "\\n";           // false
    return 0;
}`
      }
    ],
    complexityAnalysis: [
      { operation: 'Adjacency List Space', timeComplexity: '-', spaceComplexity: 'O(V + E)', notes: 'Stores only existing edges' },
      { operation: 'Adjacency Matrix Space', timeComplexity: '-', spaceComplexity: 'O(V^2)', notes: 'Dense matrix; wasteful for sparse graphs' },
      { operation: 'BFS / DFS Traversal', timeComplexity: 'O(V + E)', spaceComplexity: 'O(V)', notes: 'Visits every vertex and traverses each edge once' },
      { operation: 'Topological Sort (Kahn)', timeComplexity: 'O(V + E)', spaceComplexity: 'O(V + E)', notes: 'In-degree queue processing' },
      { operation: 'Dijkstra (with Min-Heap)', timeComplexity: 'O((V + E) log V)', spaceComplexity: 'O(V)', notes: 'Shortest path on non-negative weighted graphs' }
    ],
    commonMistakes: [
      'Forgetting the Visited Set: Without a visited set, graph traversals enter infinite loops on graphs containing cycles.',
      'Using Adjacency Matrix on sparse graphs: If V = 100,000 and E = 200,000, an adjacency matrix allocates 10 billion integers (~40GB RAM), causing Out-Of-Memory.',
      'Confusing directed and undirected cycle detection: In undirected graphs, the node you just came from (parent) must be excluded from cycle triggers.',
      'Applying Dijkstra with negative edge weights: Dijkstra assumes edge weights are non-negative. Use Bellman-Ford for negative weights.',
      'Ignoring disconnected graphs: When counting components, you must iterate 0 to V - 1 and launch DFS/BFS from each unvisited node.'
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between BFS and DFS in terms of memory consumption?',
        answer: 'BFS stores an entire frontier level in the queue; in a balanced tree/graph, the widest level contains ~V/2 nodes, taking O(V) space. DFS stores only the current branch path on its call stack; on a balanced graph, the stack depth is bounded by tree height O(log V). In a degenerate linear graph, both take O(V) space.'
      },
      {
        question: 'Why does Kahn Algorithm for Topological Sort fail if a cycle is present?',
        answer: 'Every node in a cycle has an in-degree of at least 1 (each node has an incoming edge from another node in the cycle). Therefore, no node in the cycle can ever reach in-degree = 0. The queue will become empty before all V vertices are processed, proving a cycle exists.'
      },
      {
        question: 'How does Dijkstra Algorithm find the shortest path in weighted graphs?',
        answer: 'Dijkstra maintains a distance array initialized to infinity (source = 0) and a Min-Heap of (distance, vertex) pairs. It repeatedly extracts the vertex with the smallest provisional distance, explores all outgoing edges, and performs relaxation: if dist[u] + weight(u, v) < dist[v], update dist[v] and push (dist[v], v) onto the min-heap.'
      }
    ],
    practiceProblems: [
      { level: 'Beginner', title: 'Number of Islands', platform: 'LeetCode #200', focus: 'Grid DFS/BFS components' },
      { level: 'Beginner', title: 'Clone Graph', platform: 'LeetCode #133', focus: 'Graph copying with hash map' },
      { level: 'Intermediate', title: 'Course Schedule (Kahn Algorithm)', platform: 'LeetCode #207', focus: 'Topological sort & cycle detection' },
      { level: 'Intermediate', title: 'Network Delay Time (Dijkstra)', platform: 'LeetCode #743', focus: 'Min-heap shortest path' },
      { level: 'Advanced', title: 'Alien Dictionary', platform: 'LeetCode #269', focus: 'Graph building + Topological sort' }
    ],
    quickRevisionNotes: [
      'Represent graphs with Adjacency Lists for optimal O(V + E) time and space.',
      'BFS uses a Queue and finds shortest paths in unweighted graphs.',
      'DFS uses Recursion and finds connected components and paths.',
      'Topological Sort requires a DAG and is solved in O(V + E) using in-degrees.',
      'Always maintain a `visited` set to prevent infinite cycles.'
    ],
    knowledgeCheck: [
      {
        question: 'What is the space complexity of an Adjacency Matrix representation for a graph with V vertices?',
        options: ['O(V + E)', 'O(V)', 'O(V^2)', 'O(E log V)'],
        correctAnswer: 2,
        explanation: 'An adjacency matrix is a 2D array of dimensions V x V, consuming O(V^2) memory regardless of how many edges exist.'
      },
      {
        question: 'Which condition identifies a cycle during Kahn Algorithm for Topological Sorting?',
        options: ['The queue is never empty', 'The number of processed nodes is less than the total number of vertices V', 'In-degree array has negative numbers', 'The graph has self-loops only'],
        correctAnswer: 1,
        explanation: 'Nodes trapped inside a directed cycle never reach in-degree 0, so they are never added to the queue, resulting in count < V.'
      },
      {
        question: 'Why can BFS be used to find the shortest path in an unweighted graph, but not in a general weighted graph?',
        options: ['BFS cannot handle negative numbers', 'BFS explores edges in increasing order of step count, not cumulative weight', 'Queue cannot store weights', 'DFS is faster for weights'],
        correctAnswer: 1,
        explanation: 'In unweighted graphs, each edge has equal cost (1), so level-by-level BFS reaches nodes along the minimum edge count. In weighted graphs, fewer edges does not mean lower weight.'
      }
    ]
  }
};
