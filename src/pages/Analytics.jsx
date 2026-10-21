import React from 'react';
import { BarChart3, TrendingUp, Award, Zap, ShieldCheck } from 'lucide-react';

export default function Analytics({ candidate }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <BarChart3 size={24} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Competency Analytics & Progression
            </h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Track your performance evolution across DSA, System Design, HR, and MNC Readiness.
          </p>
        </div>

        <span className="badge badge-emerald" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
          78 / 100 Overall Score
        </span>
      </div>

      {/* Progress Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {(() => {
          switch (candidate?.branch) {
            case 'extc':
              return (
                <>
                  <div className="card">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>DIGITAL ELECTRONICS PROGRESSION</span>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-violet)', margin: '0.5rem 0' }}>
                      54 → 68 → 79
                    </div>
                    <span className="badge badge-violet">+25 points overall improvement</span>
                  </div>
                  <div className="card">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>MICROCONTROLLER & EMBEDDED ACCURACY</span>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: '0.5rem 0' }}>
                      78.5%
                    </div>
                    <span className="badge badge-emerald">18 Modules Completed</span>
                  </div>
                </>
              );
            case 'mechanical':
              return (
                <>
                  <div className="card">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>THERMODYNAMICS & SOM PROGRESSION</span>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-violet)', margin: '0.5rem 0' }}>
                      48 → 62 → 75
                    </div>
                    <span className="badge badge-violet">+27 points overall improvement</span>
                  </div>
                  <div className="card">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>MACHINE DESIGN ACCURACY</span>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: '0.5rem 0' }}>
                      80.2%
                    </div>
                    <span className="badge badge-emerald">15 Design Scenarios Completed</span>
                  </div>
                </>
              );
            case 'cs':
            default:
              return (
                <>
                  <div className="card">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>SYSTEM DESIGN SCORE PROGRESSION</span>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-violet)', margin: '0.5rem 0' }}>
                      42 → 51 → 64
                    </div>
                    <span className="badge badge-violet">+22 points overall improvement</span>
                  </div>
                  <div className="card">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>DSA ACCURACY RATE</span>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: '0.5rem 0' }}>
                      82.4%
                    </div>
                    <span className="badge badge-emerald">24 Problems Completed</span>
                  </div>
                </>
              );
          }
        })()}

        <div className="card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>INTERVIEW CONSISTENCY STREAK</span>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-amber)', margin: '0.5rem 0' }}>
            7 Days
          </div>
          <span className="badge badge-amber">Top 5% Candidate Active</span>
        </div>
      </div>
    </div>
  );
}
