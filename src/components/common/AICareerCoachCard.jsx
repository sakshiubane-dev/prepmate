import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Info } from 'lucide-react';

export default function AICareerCoachCard({ recommendation, onStartPractice }) {
  const [showReason, setShowReason] = useState(false);

  if (!recommendation) return null;

  return (
    <div className="card" style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'var(--accent-ai)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)'
          }}>
            <Sparkles size={16} />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-ai)', letterSpacing: '0.05em' }}>
            AI CAREER COACH
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
          Your Next Best Step
        </h3>
        <button 
          onMouseEnter={() => setShowReason(true)}
          onMouseLeave={() => setShowReason(false)}
          style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
        >
          <Info size={16} />
        </button>
      </div>

      <AnimatePresence>
        {showReason && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            style={{
              padding: '0.75rem',
              background: 'var(--bg-surface-active)',
              borderRadius: '0.5rem',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              marginBottom: '1rem',
              border: '1px solid var(--border-color)'
            }}
          >
            <strong>Why this?</strong> {recommendation.reason}
          </motion.div>
        )}
      </AnimatePresence>
      
      {!showReason && (
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
          {recommendation.title}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {recommendation.suggestedSteps.map((s, idx) => (
          <motion.div 
            whileHover={{ x: 4, backgroundColor: 'var(--bg-surface-hover)' }}
            key={idx} 
            onClick={() => onStartPractice(recommendation.targetRoute)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.625rem 0.75rem',
              backgroundColor: 'var(--bg-surface-active)',
              borderRadius: '0.375rem',
              border: '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-main)', fontWeight: 500 }}>
                {idx + 1}. {s.action}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
              {s.time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
