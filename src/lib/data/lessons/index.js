/**
 * PrepMate Unified Lesson Architecture
 * Centralized routing and data access for all engineering disciplines:
 * - DSA (20 modules)
 * - EXTC / Semiconductor Physics & Electronic Devices (9 modules)
 * - OOP (11 modules)
 * - DBMS (16 modules)
 * - OS (12 modules)
 * - Computer Networks (13 modules)
 * - Extensible fallback for all other engineering subjects (Mechanical, Electrical, and related domains)
 */

import { 
  DSA_LESSONS, 
  DSA_MODULE_ORDER, 
  normalizeModuleKey as normalizeDsaKey, 
  getLessonByIdOrTitle as getDsaLesson, 
  getAdjacentModules as getAdjacentDsaModules, 
  getAllDSAModules 
} from '../dsaLessons/index.js';

import { 
  EXTC_LESSONS, 
  EXTC_MODULE_ORDER, 
  normalizeExtcModuleKey as normalizeExtcKey, 
  getExtcLessonByIdOrTitle as getExtcLesson, 
  getAdjacentExtcModules as getAdjacentExtcLessons, 
  getAllExtcModules 
} from '../extcLessons/index.js';

import {
  OOP_LESSONS,
  OOP_MODULE_ORDER,
  normalizeOopKey,
  getOopLesson
} from './oopLessons.js';

import {
  DBMS_LESSONS,
  DBMS_MODULE_ORDER,
  normalizeDbmsKey,
  getDbmsLesson
} from './dbmsLessons.js';

import {
  OS_LESSONS,
  OS_MODULE_ORDER,
  normalizeOsKey,
  getOsLesson
} from './osLessons.js';

import {
  NETWORK_LESSONS,
  NETWORK_MODULE_ORDER,
  normalizeNetworkKey,
  getNetworkLesson
} from './networkLessons.js';

import {
  SYSTEM_DESIGN_LESSONS,
  SYSTEM_DESIGN_MODULE_ORDER,
  normalizeSystemDesignKey,
  getSystemDesignLesson
} from './systemDesignLessons.js';

import {
  ANALOG_ELECTRONICS_LESSONS,
  ANALOG_ELECTRONICS_MODULE_ORDER,
  normalizeAnalogElectronicsKey,
  getAnalogElectronicsLesson
} from './analogElectronicsLessons.js';

import {
  DIGITAL_ELECTRONICS_LESSONS,
  DIGITAL_ELECTRONICS_MODULE_ORDER,
  normalizeDigitalElectronicsKey,
  getDigitalElectronicsLesson
} from './digitalElectronicsLessons.js';

import { ALL_SUBJECTS } from '../subjects.js';

function createSubjectRegistryEntry({
  id,
  name,
  type = 'engineering',
  order,
  lessons,
  normalizer,
  getter
}) {
  return {
    id,
    name,
    type,
    order,
    lessons,
    storageKey: `prepmate_${id}_completed_modules`,
    normalizer,
    getter,
    adjacent: (currentId) => {
      const key = normalizer(currentId);
      if (!key) return { prev: null, next: null };
      const idx = order.indexOf(key);
      if (idx === -1) return { prev: null, next: null };
      const prevId = idx > 0 ? order[idx - 1] : null;
      const nextId = idx < order.length - 1 ? order[idx + 1] : null;
      return {
        prev: prevId ? { id: prevId, title: lessons[prevId]?.title || prevId } : null,
        next: nextId ? { id: nextId, title: lessons[nextId]?.title || nextId } : null
      };
    },
    all: () => order.map(k => lessons[k]).filter(Boolean)
  };
}

export const SUBJECT_REGISTRY = {
  'dsa': {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    type: 'software',
    order: DSA_MODULE_ORDER,
    lessons: DSA_LESSONS,
    storageKey: 'prepmate_dsa_completed_modules',
    normalizer: normalizeDsaKey,
    getter: getDsaLesson,
    adjacent: getAdjacentDsaModules,
    all: getAllDSAModules
  },
  'electronic_devices': {
    id: 'electronic_devices',
    name: 'Electronic Devices & Circuits (Semiconductor Physics)',
    type: 'extc',
    order: EXTC_MODULE_ORDER,
    lessons: EXTC_LESSONS,
    storageKey: 'prepmate_electronic_devices_completed_modules',
    normalizer: normalizeExtcKey,
    getter: getExtcLesson,
    adjacent: getAdjacentExtcLessons,
    all: getAllExtcModules
  },
  'extc': {
    id: 'electronic_devices',
    name: 'Electronic Devices & Circuits (Semiconductor Physics)',
    type: 'extc',
    order: EXTC_MODULE_ORDER,
    lessons: EXTC_LESSONS,
    storageKey: 'prepmate_electronic_devices_completed_modules',
    normalizer: normalizeExtcKey,
    getter: getExtcLesson,
    adjacent: getAdjacentExtcLessons,
    all: getAllExtcModules
  },
  'oop': createSubjectRegistryEntry({
    id: 'oop',
    name: 'Object-Oriented Programming',
    type: 'software',
    order: OOP_MODULE_ORDER,
    lessons: OOP_LESSONS,
    normalizer: normalizeOopKey,
    getter: getOopLesson
  }),
  'dbms': createSubjectRegistryEntry({
    id: 'dbms',
    name: 'Database Management Systems',
    type: 'software',
    order: DBMS_MODULE_ORDER,
    lessons: DBMS_LESSONS,
    normalizer: normalizeDbmsKey,
    getter: getDbmsLesson
  }),
  'os': createSubjectRegistryEntry({
    id: 'os',
    name: 'Operating Systems',
    type: 'software',
    order: OS_MODULE_ORDER,
    lessons: OS_LESSONS,
    normalizer: normalizeOsKey,
    getter: getOsLesson
  }),
  'networks': createSubjectRegistryEntry({
    id: 'networks',
    name: 'Computer Networks',
    type: 'software',
    order: NETWORK_MODULE_ORDER,
    lessons: NETWORK_LESSONS,
    normalizer: normalizeNetworkKey,
    getter: getNetworkLesson
  }),
  'systemdesign': createSubjectRegistryEntry({
    id: 'systemdesign',
    name: 'System Design & Distributed Systems',
    type: 'software',
    order: SYSTEM_DESIGN_MODULE_ORDER,
    lessons: SYSTEM_DESIGN_LESSONS,
    normalizer: normalizeSystemDesignKey,
    getter: getSystemDesignLesson
  }),
  'analog_electronics': createSubjectRegistryEntry({
    id: 'analog_electronics',
    name: 'Analog Electronics & Op-Amps',
    type: 'engineering',
    order: ANALOG_ELECTRONICS_MODULE_ORDER,
    lessons: ANALOG_ELECTRONICS_LESSONS,
    normalizer: normalizeAnalogElectronicsKey,
    getter: getAnalogElectronicsLesson
  }),
  'digital_electronics': createSubjectRegistryEntry({
    id: 'digital_electronics',
    name: 'Digital Electronics & Logic Design',
    type: 'engineering',
    order: DIGITAL_ELECTRONICS_MODULE_ORDER,
    lessons: DIGITAL_ELECTRONICS_LESSONS,
    normalizer: normalizeDigitalElectronicsKey,
    getter: getDigitalElectronicsLesson
  })
};

/**
 * Normalizes subject ID to match registry
 */
export function resolveSubjectId(subjectId) {
  if (!subjectId) return 'dsa';
  const clean = String(subjectId).toLowerCase().trim().replace(/[\s-]+/g, '_');
  if (SUBJECT_REGISTRY[clean]) return SUBJECT_REGISTRY[clean].id;
  if (clean === 'digital_electronics') return clean;
  if (clean.includes('extc') || clean.includes('semiconductor') || clean.includes('electronic')) {
    return 'electronic_devices';
  }
  return clean;
}

/**
 * Checks whether full pre-authored lesson content exists for a given subject and topic
 */
export function hasLessonContent(subjectId, topicKey) {
  const sId = resolveSubjectId(subjectId);
  const entry = SUBJECT_REGISTRY[sId];
  if (entry && entry.getter) {
    const lesson = entry.getter(topicKey);
    if (lesson) return true;
  }
  // A lesson belonging to another subject must not count as content for this subject.
  return false;
}

/**
 * Creates dynamic comprehensive lesson structure for subjects that don't yet have static lesson files
 */
function generateDynamicLesson(subjectId, topicKey) {
  const subject = ALL_SUBJECTS.find(s => s.id === subjectId || resolveSubjectId(s.id) === subjectId);
  const topicTitle = String(topicKey).replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const topicSlug = String(topicKey).toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return {
    id: topicSlug,
    subjectId: subject?.id || subjectId,
    title: topicTitle,
    estimatedTime: '30 mins',
    difficulty: subject?.difficulty || 'Intermediate',
    category: subject?.category || 'Engineering Fundamentals',
    isDynamic: true,
    learningObjectives: [
      `Master core principles, mathematical formulations, and engineering theory behind ${topicTitle}.`,
      `Understand real-world industry implementations, design patterns, and hardware/software constraints.`,
      `Analyze common interview questions, problem-solving techniques, and screening criteria.`
    ],
    prerequisites: subject?.prerequisites || ['Basic Engineering Fundamentals'],
    theoryAndConcepts: [
      {
        heading: `1. Core Overview of ${topicTitle}`,
        content: `Mastering **${topicTitle}** is a core requirement for technical assessments in **${subject?.name || 'this engineering domain'}**. Review the attached lecture slides, college notes, and reference derivations to gain complete depth on this module.`
      }
    ],
    interviewQuestions: [
      {
        q: `What are the core fundamentals and common interview considerations for ${topicTitle}?`,
        a: `Interviewers typically test theoretical principles, edge cases, practical application tradeoffs, and mathematical or architectural derivations related to ${topicTitle}.`
      }
    ]
  };
}

/**
 * Gets lesson for any supported subject
 */
export function getLessonForSubject(subjectId, topicKey) {
  if (!topicKey) return null;
  const sId = resolveSubjectId(subjectId);
  const entry = SUBJECT_REGISTRY[sId];
  if (entry && entry.getter) {
    const lesson = entry.getter(topicKey);
    if (lesson) return lesson;
  }

  // Cross check across all known registries
  const extcMatch = getExtcLesson(topicKey);
  if (extcMatch && (sId === 'electronic_devices' || sId === 'extc')) return extcMatch;

  const oopMatch = getOopLesson(topicKey);
  if (oopMatch && sId === 'oop') return oopMatch;

  const dbmsMatch = getDbmsLesson(topicKey);
  if (dbmsMatch && sId === 'dbms') return dbmsMatch;

  const osMatch = getOsLesson(topicKey);
  if (osMatch && sId === 'os') return osMatch;

  const netMatch = getNetworkLesson(topicKey);
  if (netMatch && sId === 'networks') return netMatch;

  const dsaMatch = getDsaLesson(topicKey);
  if (dsaMatch) return dsaMatch;

  // Do not return a lesson from a different subject merely because its topic slug matches.
  // Unknown topics receive a subject-specific placeholder instead.

  // Generate clean dynamic lesson so students can attach and view study notes for any module
  return generateDynamicLesson(sId, topicKey);
}

/**
 * Normalizes module key for any subject
 */
export function normalizeSubjectModuleKey(subjectId, key) {
  if (!key) return null;
  const sId = resolveSubjectId(subjectId);
  const entry = SUBJECT_REGISTRY[sId];
  if (entry && entry.normalizer) {
    const k = entry.normalizer(key);
    if (k) return k;
  }
  return normalizeExtcKey(key) || 
         normalizeOopKey(key) || 
         normalizeDbmsKey(key) || 
         normalizeOsKey(key) || 
         normalizeNetworkKey(key) || 
         normalizeDsaKey(key) || 
         String(key).toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/**
 * Returns previous and next modules for navigation
 */
export function getAdjacentSubjectModules(subjectId, currentId) {
  const sId = resolveSubjectId(subjectId);
  const entry = SUBJECT_REGISTRY[sId];
  if (entry && entry.adjacent) {
    return entry.adjacent(currentId);
  }

  // Try subject list from ALL_SUBJECTS
  const subject = ALL_SUBJECTS.find(s => s.id === sId || resolveSubjectId(s.id) === sId);
  if (subject && subject.topics) {
    const topics = subject.topics;
    const cleanCurrent = String(currentId).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const idx = topics.findIndex(t => 
      t.toLowerCase().replace(/[^a-z0-9]+/g, '-') === cleanCurrent || t === currentId
    );
    if (idx !== -1) {
      const prevTopic = idx > 0 ? topics[idx - 1] : null;
      const nextTopic = idx < topics.length - 1 ? topics[idx + 1] : null;
      return {
        prev: prevTopic ? { id: prevTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title: prevTopic } : null,
        next: nextTopic ? { id: nextTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title: nextTopic } : null
      };
    }
  }

  return { prev: null, next: null };
}

/**
 * Returns the localStorage progress key for a subject
 */
export function getSubjectStorageKey(subjectId) {
  const sId = resolveSubjectId(subjectId);
  const entry = SUBJECT_REGISTRY[sId];
  return entry ? entry.storageKey : `prepmate_${sId}_completed_modules`;
}

export function getSubjectProgress(subject) {
  if (subject?.id !== 'digital_electronics') {
    return {
      topicsCompleted: subject?.topicsCompleted,
      progress: subject?.progress
    };
  }

  try {
    const stored = JSON.parse(localStorage.getItem(getSubjectStorageKey(subject.id)) || '[]');
    const completed = new Set(Array.isArray(stored) ? stored : []);
    const topics = subject.topics || [];
    const topicsCompleted = topics.filter(topic => completed.has(normalizeSubjectModuleKey(subject.id, topic))).length;
    return {
      topicsCompleted,
      progress: topics.length ? Math.round((topicsCompleted / topics.length) * 100) : 0
    };
  } catch {
    return { topicsCompleted: 0, progress: 0 };
  }
}

export {
  DSA_LESSONS,
  DSA_MODULE_ORDER,
  getDsaLesson,
  getAdjacentDsaModules,
  getAllDSAModules,
  EXTC_LESSONS,
  EXTC_MODULE_ORDER,
  getExtcLesson,
  getAdjacentExtcLessons,
  getAllExtcModules,
  OOP_LESSONS,
  OOP_MODULE_ORDER,
  getOopLesson,
  DBMS_LESSONS,
  DBMS_MODULE_ORDER,
  getDbmsLesson,
  OS_LESSONS,
  OS_MODULE_ORDER,
  getOsLesson,
  NETWORK_LESSONS,
  NETWORK_MODULE_ORDER,
  getNetworkLesson
};
