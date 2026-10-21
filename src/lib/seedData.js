/**
 * Rich Candidate Seed Data & Platform Datasets for PrepMate
 */

export const INITIAL_CANDIDATE = {
  id: "cand_9921",
  name: "Alex Rivera",
  email: "alex.rivera@university.edu",
  branch: "cs",
  careerTrack: "software",
  targetRole: "Full Stack Developer",
  experienceLevel: "Fresher / Early-Career (0-1 yrs)",
  targetCompanies: ["Google", "Amazon", "Microsoft", "TCS Digital", "Infosys"],
  primaryStack: ["JavaScript", "React", "Node.js", "Python", "SQL"],
  timeline: "Next 30 Days",
  mncReadinessScore: 78,
  scoreDelta: "+8 points this month",
  streakDays: 7,
  
  // Category Scores (0 - 100)
  categoryScores: {
    resume: 92,
    aptitude: 84,
    dsa: 72,
    coreCs: 68,
    programming: 82,
    technical: 81,
    systemDesign: 51,
    hr: 87,
    communication: 79,
    consistency: 85
  },

  // Today's Preparation Plan
  todaysPlan: [
    { id: "task_1", category: "DSA", title: "Practice Dynamic Programming & Trees", duration: "30 min", completed: false, route: "/prepare/dsa" },
    { id: "task_2", category: "Core CS", title: "Review DBMS Indexing & ACID Properties", duration: "25 min", completed: false, route: "/prepare/core-cs" },
    { id: "task_3", category: "System Design", title: "Study Database Caching & Redis Strategies", duration: "20 min", completed: true, route: "/prepare/system-design" },
    { id: "task_4", category: "HR Practice", title: "Draft STAR Story: High Pressure Failure", duration: "15 min", completed: false, route: "/interviews/hr" }
  ],

  // AI Recommendation Card
  aiCoachRecommendation: {
    title: "Your next best step",
    reason: "Your System Design score has remained at 51% across your last 3 practice assessments.",
    suggestedSteps: [
      { step: 1, action: "Study Distributed Caching Strategies", time: "20 min" },
      { step: 2, action: "Practice Database Sharding & Read Replicas", time: "25 min" },
      { step: 3, action: "Attempt URL Shortener System Design Canvas", time: "30 min" }
    ],
    ctaText: "Start Recommended Practice",
    targetRoute: "/prepare/system-design"
  },

  // Recent Interview Activity
  recentInterviews: [
    {
      id: "int_401",
      type: "System Design Mock",
      role: "Full Stack Engineer",
      date: "Yesterday",
      score: 64,
      status: "Completed",
      feedback: "Good discussion on REST endpoints, but missed caching layer and database scaling bottlenecks."
    },
    {
      id: "int_400",
      type: "Technical AI Mock",
      role: "React / Node Developer",
      date: "3 days ago",
      score: 84,
      status: "Completed",
      feedback: "Strong grasp of React Virtual DOM, hooks, and Node event loop execution."
    },
    {
      id: "int_399",
      type: "HR STAR Interview",
      role: "Software Engineering Intern",
      date: "5 days ago",
      score: 88,
      status: "Completed",
      feedback: "Excellent STAR framework structure in project leadership response."
    }
  ]
};

export const DSA_PROBLEMS = [
  {
    id: "dsa_1",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    companies: ["Amazon", "Google", "Microsoft"],
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." }
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists."],
    starterCode: `function twoSum(nums, target) {
  // Write your code here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    expectedComplexity: "Time: O(N), Space: O(N)",
    testCases: [
      { input: "[2, 7, 11, 15], 9", expected: "[0,1]" },
      { input: "[3, 2, 4], 6", expected: "[1,2]" }
    ],
    hints: [
      "Try using a Hash Map to store previously seen numbers and their indices.",
      "Check if target - current_number exists in your map in O(1) time."
    ]
  },
  {
    id: "dsa_2",
    title: "LRU Cache Implementation",
    difficulty: "Medium",
    category: "Design & Data Structures",
    companies: ["Google", "Amazon", "Meta"],
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with `get` and `put` operations in O(1) average time complexity.",
    starterCode: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}`,
    expectedComplexity: "Time: O(1) for Get & Put, Space: O(Capacity)",
    hints: [
      "In JavaScript, Map maintains insertion order. Re-inserting updates recency.",
      "Alternatively, use a Doubly Linked List with a Hash Map."
    ]
  },
  {
    id: "dsa_3",
    title: "Lowest Common Ancestor in Binary Tree",
    difficulty: "Medium",
    category: "Trees & Recursion",
    companies: ["Microsoft", "Apple", "Amazon"],
    description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.",
    starterCode: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}`,
    expectedComplexity: "Time: O(N), Space: O(H)",
    hints: [
      "Use post-order traversal recursively.",
      "If p and q are found in separate subtrees, root is the LCA."
    ]
  }
];

export const APTITUDE_CATEGORIES = [
  {
    id: "quant",
    title: "Quantitative Aptitude",
    topics: ["Percentages", "Profit & Loss", "Time & Work", "Probability", "Permutations & Combinations"],
    sampleQuestions: 15,
    avgTime: "20 min"
  },
  {
    id: "logical",
    title: "Logical Reasoning",
    topics: ["Number & Alphabet Series", "Coding-Decoding", "Seating Arrangement", "Syllogisms", "Puzzles"],
    sampleQuestions: 15,
    avgTime: "20 min"
  },
  {
    id: "verbal",
    title: "Verbal Ability",
    topics: ["Grammar & Usage", "Reading Comprehension", "Para Jumbles", "Vocabulary & Synonyms"],
    sampleQuestions: 12,
    avgTime: "15 min"
  }
];

export const COMPANY_TRACKS = [
  {
    id: "google",
    name: "Google",
    logoColor: "#4285f4",
    rounds: ["Phone Screen", "Technical Coding (2 Rounds)", "System Design", "Googliness & Leadership"],
    focusAreas: ["Advanced Graphs & DP", "System Scalability", "Clean Code Architecture"],
    difficulty: "High"
  },
  {
    id: "amazon",
    name: "Amazon",
    logoColor: "#ff9900",
    rounds: ["Online Assessment (OA)", "Technical Coding", "System Architecture", "Leadership Principles (LP)"],
    focusAreas: ["STAR Method Leadership", "Object Oriented Design", "Trees & Heaps"],
    difficulty: "High"
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logoColor: "#00a4ef",
    rounds: ["Codility Assessment", "Technical & Coding (2 Rounds)", "System Design", "AA / HR Round"],
    focusAreas: ["Strings & Arrays", "Concurrency & OS", "Problem Solving Approach"],
    difficulty: "Medium-High"
  },
  {
    id: "tcs_digital",
    name: "TCS Digital / NQT",
    logoColor: "#e11d48",
    rounds: ["NQT Aptitude & Verbal", "Advanced Coding", "Technical Interview", "Managerial & HR"],
    focusAreas: ["Aptitude & Speed", "Core DBMS & SQL", "Fundamental Data Structures"],
    difficulty: "Medium"
  },
  {
    id: "infosys",
    name: "Infosys DSE / HackWithInfy",
    logoColor: "#0284c7",
    rounds: ["Online Test", "Technical Interview", "HR Interview"],
    focusAreas: ["Greedy Algorithms", "Java/Python Basics", "Aptitude Accuracy"],
    difficulty: "Medium"
  }
];
