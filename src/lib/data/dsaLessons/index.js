/**
 * PrepMate DSA Lesson Content Registry
 * Aggregates all 20 comprehensive DSA educational modules.
 */

import { MODULES_1_5 } from './modules1_5.js';
import { MODULES_6_10 } from './modules6_10.js';
import { MODULES_11_15 } from './modules11_15.js';
import { MODULES_16_20 } from './modules16_20.js';

export const DSA_LESSONS = {
  ...MODULES_1_5,
  ...MODULES_6_10,
  ...MODULES_11_15,
  ...MODULES_16_20
};

export const DSA_MODULE_ORDER = [
  'arrays',
  'strings',
  'linked-lists',
  'stacks',
  'queues',
  'hashing',
  'trees',
  'bst',
  'heaps',
  'graphs',
  'tries',
  'recursion',
  'backtracking',
  'greedy-algorithms',
  'dynamic-programming',
  'sorting',
  'searching',
  'sliding-window',
  'two-pointers',
  'bit-manipulation'
];

/**
 * Normalizes an arbitrary topic string (e.g. "Binary Search Trees (BST)", "BST", "Two Pointers")
 * to its standard lesson key.
 */
export function normalizeModuleKey(key) {
  if (!key) return null;
  if (typeof key === 'number') {
    return DSA_MODULE_ORDER[key] || null;
  }

  const clean = String(key)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '');

  if (DSA_LESSONS[clean]) return clean;

  // Specific alias mappings
  const aliases = {
    'bst': 'bst',
    'binary-search-trees': 'bst',
    'binary-search-tree': 'bst',
    'binary-search-trees-bst': 'bst',
    'linked-list': 'linked-lists',
    'linkedlists': 'linked-lists',
    'greedy': 'greedy-algorithms',
    'dp': 'dynamic-programming',
    'slidingwindow': 'sliding-window',
    'twopointers': 'two-pointers',
    'bit-manip': 'bit-manipulation',
    'bit': 'bit-manipulation'
  };

  if (aliases[clean]) return aliases[clean];

  // Try matching by title
  for (const modId of DSA_MODULE_ORDER) {
    const lesson = DSA_LESSONS[modId];
    if (lesson.title.toLowerCase() === String(key).toLowerCase().trim()) {
      return modId;
    }
  }

  return null;
}

/**
 * Retrieves a lesson by ID, title, alias, or index.
 */
export function getLessonByIdOrTitle(query) {
  const key = normalizeModuleKey(query);
  return key ? DSA_LESSONS[key] : null;
}

/**
 * Returns previous and next module IDs for navigation.
 */
export function getAdjacentModules(currentId) {
  const key = normalizeModuleKey(currentId);
  const idx = DSA_MODULE_ORDER.indexOf(key);
  if (idx === -1) return { prev: null, next: null };

  const prevId = idx > 0 ? DSA_MODULE_ORDER[idx - 1] : null;
  const nextId = idx < DSA_MODULE_ORDER.length - 1 ? DSA_MODULE_ORDER[idx + 1] : null;

  return {
    prev: prevId ? DSA_LESSONS[prevId] : null,
    next: nextId ? DSA_LESSONS[nextId] : null
  };
}

/**
 * Returns complete list of all 20 modules in order with metadata.
 */
export function getAllDSAModules() {
  return DSA_MODULE_ORDER.map(id => DSA_LESSONS[id]);
}
