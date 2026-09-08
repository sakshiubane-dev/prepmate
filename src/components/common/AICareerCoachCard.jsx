import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Target } from 'lucide-react';

export default function AICareerCoachCard({ recommendation, onStartPractice }) {
  if (!recommendation) return null;

  return (
    <div className="card" style={{
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.25)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Accent Glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        background: 'rgba(99, 102, 241, 0.2)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Sparkles size={16} />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>
            AI CAREER COACH RECOMMENDATION
          </span>
        </div>
        <span className="badge badge-indigo">Personalized</span>
      </div>

      {/* Title & Reason */}
      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.375rem' }}>
        {recommendation.title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
        {recommendation.reason}
      </p>

      {/* Steps List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {recommendation.suggestedSteps.map((s, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.75rem',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '0.375rem',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                color: 'var(--accent-primary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {s.step}
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-main)', fontWeight: 500 }}>
                {s.action}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
              {s.time}
            </span>
          </div>
        ))}
      </div>

      {/* Action CTA */}
      <button
        onClick={() => onStartPractice(recommendation.targetRoute)}
        className="btn btn-primary btn-sm"
        style={{ width: '100%', justifyContent: 'center' }}
      >
        <span>{recommendation.ctaText}</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
