/**
 * PrepMate EXTC Lesson Content Registry
 * Aggregates all 9 comprehensive EXTC educational modules for Electronic Devices & Transistors.
 */

import { EXTC_MODULES_1_5 } from './modules1_5.js';
import { EXTC_MODULES_6_9 } from './modules6_9.js';

export const EXTC_LESSONS = {
  ...EXTC_MODULES_1_5,
  ...EXTC_MODULES_6_9
};

export const EXTC_MODULE_ORDER = [
  'semiconductor-physics',
  'pn-junction',
  'diodes',
  'zener-diode',
  'bjt',
  'mosfet',
  'jfet',
  'cmos',
  'transistor-biasing'
];

/**
 * Normalizes an arbitrary topic string (e.g. "Semiconductor Physics", "bjt", "Transistor Biasing")
 * to its standard lesson key.
 */
export function normalizeExtcModuleKey(key) {
  if (!key) return null;
  if (typeof key === 'number') {
    return EXTC_MODULE_ORDER[key] || null;
  }

  const clean = String(key)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '');

  if (EXTC_LESSONS[clean]) return clean;

  // Specific alias mappings
  const aliases = {
    'semiconductor': 'semiconductor-physics',
    'semiconductorphysics': 'semiconductor-physics',
    'pn': 'pn-junction',
    'pnjunction': 'pn-junction',
    'pn-junctions': 'pn-junction',
    'diode': 'diodes',
    'rectifiers': 'diodes',
    'zener': 'zener-diode',
    'zenerdiode': 'zener-diode',
    'zeners': 'zener-diode',
    'bipolar': 'bjt',
    'bipolar-junction-transistor': 'bjt',
    'mos': 'mosfet',
    'fet': 'jfet',
    'junction-fet': 'jfet',
    'complementary-mos': 'cmos',
    'biasing': 'transistor-biasing',
    'transistorbiasing': 'transistor-biasing',
    'dc-biasing': 'transistor-biasing'
  };

  if (aliases[clean]) return aliases[clean];

  // Match by title
  for (const modId of EXTC_MODULE_ORDER) {
    const lesson = EXTC_LESSONS[modId];
    if (lesson.title.toLowerCase() === String(key).toLowerCase().trim()) {
      return modId;
    }
  }

  return null;
}

/**
 * Retrieves an EXTC lesson by ID or title.
 */
export function getExtcLessonByIdOrTitle(query) {
  const key = normalizeExtcModuleKey(query);
  return key ? EXTC_LESSONS[key] : null;
}

/**
 * Returns previous and next module IDs for navigation.
 */
export function getAdjacentExtcModules(currentId) {
  const key = normalizeExtcModuleKey(currentId);
  if (!key) return { prev: null, next: null };

  const idx = EXTC_MODULE_ORDER.indexOf(key);
  if (idx === -1) return { prev: null, next: null };

  const prevId = idx > 0 ? EXTC_MODULE_ORDER[idx - 1] : null;
  const nextId = idx < EXTC_MODULE_ORDER.length - 1 ? EXTC_MODULE_ORDER[idx + 1] : null;

  return {
    prev: prevId ? EXTC_LESSONS[prevId] : null,
    next: nextId ? EXTC_LESSONS[nextId] : null
  };
}

/**
 * Returns all EXTC modules in order.
 */
export function getAllExtcModules() {
  return EXTC_MODULE_ORDER.map(id => EXTC_LESSONS[id]);
}
