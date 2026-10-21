import React from 'react';
import { UserRound, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ENGINEERING_BRANCHES, CAREER_TARGETS_BY_BRANCH } from '../lib/config/engineeringBranches.js';

export default function SkillProfile({ candidate }) {
  const branchObj = ENGINEERING_BRANCHES.find(b => b.id === candidate?.branch);
  const targets = CAREER_TARGETS_BY_BRANCH[candidate?.branch] || [];
  const targetObj = targets.find(t => t.id === candidate?.careerTrack);

  return (
    <div style={{ padding: '2.5rem 3rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <UserRound size={28} color="var(--accent-primary)" />
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Engineering Skill Profile
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Verified candidate technical breakdown and readiness profile.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {candidate?.name || 'Alex Rivera'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {branchObj?.label || 'Computer Science'} • {targetObj?.label || 'Software Engineering'}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>READINESS INDEX</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
              {candidate?.mncReadinessScore || 78}%
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          Verified Competencies
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {Object.entries(candidate?.categoryScores || {}).map(([cat, score]) => (
            <div key={cat} style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.5rem', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-main)', textTransform: 'capitalize' }}>
                {cat.replace(/([A-Z])/g, ' $1')}
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: score >= 80 ? 'var(--accent-emerald)' : 'var(--accent-primary)' }}>
                {score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
