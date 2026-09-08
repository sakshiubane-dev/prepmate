/**
 * Competency Engine - PrepMate MNC Readiness Score Algorithm (0-100)
 */

export const CATEGORY_WEIGHTS = {
  resume: 0.10,        // Resume / ATS Readiness
  aptitude: 0.10,      // Quantitative, Logical, Verbal
  dsa: 0.15,           // Algorithms & Data Structures
  coreCs: 0.10,        // DBMS, OS, Computer Networks, OOP
  technical: 0.15,     // Role & Stack technical depth
  systemDesign: 0.15,  // Scalability, Caching, Architecture
  hr: 0.10,            // Behavioral & STAR compliance
  communication: 0.08, // Clarity, structure, articulation
  consistency: 0.07    // Interview streak & practice volume
};

/**
 * Calculates the overall MNC Readiness Score from category scores (each 0-100)
 * @param {Object} categoryScores 
 * @returns {number} Integer MNC Readiness Score (0-100)
 */
export function calculateMncReadinessScore(categoryScores = {}) {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const [key, weight] of Object.entries(CATEGORY_WEIGHTS)) {
    const score = categoryScores[key] ?? 50;
    weightedSum += score * weight;
    totalWeight += weight;
  }

  const rawScore = totalWeight > 0 ? weightedSum / totalWeight : 50;
  return Math.min(100, Math.max(0, Math.round(rawScore)));
}

/**
 * Evaluates skill status based on score threshold
 */
export function getSkillStatus(score) {
  if (score >= 80) return { label: 'Advanced', color: '#10b981', badge: 'badge-emerald' };
  if (score >= 65) return { label: 'Proficient', color: '#6366f1', badge: 'badge-indigo' };
  if (score >= 50) return { label: 'Developing', color: '#f59e0b', badge: 'badge-amber' };
  return { label: 'Needs Focus', color: '#f43f5e', badge: 'badge-rose' };
}
