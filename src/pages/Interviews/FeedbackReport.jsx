import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Award } from 'lucide-react';

export default function FeedbackReport({ sessionData, onReturnDashboard }) {
  const score = sessionData?.avgScore || 84;
  const history = sessionData?.history || [];

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="card animate-fade-in" style={{ padding: '2.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: 'var(--accent-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <Award size={36} />
          </div>

          <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
            Session Complete — Report Card
          </span>

          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff' }}>
            AI Mock Interview Evaluation
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Session Duration: {sessionData?.duration || '12m 45s'} • Target Role: Full Stack Developer
          </p>

          <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: '1rem 0' }}>
            {score} <span style={{ fontSize: '1.5rem', color: 'var(--text-dim)' }}>/ 100</span>
          </div>

          <div className="badge badge-indigo" style={{ padding: '0.5rem 1rem' }}>
            +3 points added to MNC Readiness Profile
          </div>
        </div>

        {/* Strengths & Weaknesses Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Strengths */}
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-emerald)', display: 'block', marginBottom: '0.75rem' }}>
              KEY STRENGTHS IDENTIFIED:
            </span>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" />
                <span>Clear explanation of JavaScript Event Loop micro-tasks.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" />
                <span>Strong STAR framework alignment in HR leadership story.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" />
                <span>Proactive mention of asymptotic Big-O complexities.</span>
              </li>
            </ul>
          </div>

          {/* Weaknesses / Opportunities */}
          <div style={{ padding: '1.25rem', backgroundColor: 'rgba(244, 63, 94, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-rose)', display: 'block', marginBottom: '0.75rem' }}>
              AREAS FOR IMPROVEMENT:
            </span>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} color="var(--accent-rose)" />
                <span>System design answer lacked Redis caching layer details.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} color="var(--accent-rose)" />
                <span>Consider elaborating on database read replica failovers.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Detailed Question Answers */}
        {history.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
              Question Breakdown
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {history.map((item, idx) => (
                <div key={idx} style={{ padding: '1rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 700, color: '#fff' }}>Q{idx + 1}: {item.question}</span>
                    <span className="badge badge-emerald">{item.evaluation.score}%</span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    "{item.answer}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Action CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={onReturnDashboard} className="btn btn-primary btn-lg">
            <span>Return to Dashboard</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
