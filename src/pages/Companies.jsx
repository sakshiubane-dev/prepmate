import React from 'react';
import { COMPANY_TRACKS } from '../lib/seedData';
import { Building2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Companies({ onStartCompanyMock }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Building2 size={24} color="var(--accent-emerald)" />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Target MNC Company Practice Tracks
            </h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Practice company-oriented recruitment patterns based on public hiring frameworks.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {COMPANY_TRACKS.map((c) => (
          <div key={c.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {c.name}
                </h3>
                <span className="badge badge-indigo">{c.difficulty} Difficulty</span>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', display: 'block', marginBottom: '0.375rem' }}>
                  RECRUITMENT STAGES:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {c.rounds.map((r, rIdx) => (
                    <span key={rIdx} className="badge badge-violet" style={{ fontSize: '0.6875rem' }}>
                      {rIdx + 1}. {r}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', display: 'block', marginBottom: '0.375rem' }}>
                  KEY FOCUS AREAS:
                </span>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {c.focusAreas.map((fa, fIdx) => <li key={fIdx}>{fa}</li>)}
                </ul>
              </div>
            </div>

            <button onClick={() => onStartCompanyMock(c.name)} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Sparkles size={16} />
              <span>Start {c.name} Style Mock</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
