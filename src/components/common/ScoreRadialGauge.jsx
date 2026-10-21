import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, ShieldCheck, ChevronDown } from 'lucide-react';

export default function ScoreRadialGauge({ score = 78, delta = "+8 points this month", breakdown = {} }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const radius = 70;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div 
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="card" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-surface)',
        cursor: 'pointer',
        padding: '1.5rem',
        border: '1px solid var(--border-color)',
      }}
      whileHover={{ borderColor: 'rgba(124, 108, 242, 0.4)' }}
    >
      <motion.div layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            MNC READINESS SCORE
          </span>
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
          <ChevronDown size={18} color="var(--text-muted)" />
        </motion.div>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: isExpanded ? 'row' : 'column', alignItems: 'center', gap: '2rem' }}>
        <motion.div layout style={{ position: 'relative', width: '180px', height: '180px', margin: isExpanded ? '0' : '0 auto' }}>
          <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="transparent"
              stroke="var(--bg-surface-hover)"
              strokeWidth={strokeWidth}
            />
            <motion.circle
              cx="90"
              cy="90"
              r={radius}
              fill="transparent"
              stroke="url(#scoreGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent-primary)" />
                <stop offset="100%" stopColor="var(--accent-emerald)" />
              </linearGradient>
            </defs>
          </svg>

          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
              {score}
            </span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-dim)', fontWeight: 600 }}>
              out of 100
            </span>
          </div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
            >
              {Object.entries(breakdown).slice(0, 6).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: 'var(--bg-surface-active)', borderRadius: '0.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-main)', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: val >= 80 ? 'var(--accent-emerald)' : val >= 60 ? 'var(--accent-primary)' : 'var(--accent-amber)' }}>
                    {val}%
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div layout style={{
        marginTop: '1.5rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.375rem',
        color: 'var(--accent-emerald)',
        fontSize: '0.8125rem',
        fontWeight: 600
      }}>
        <TrendingUp size={14} />
        <span>{delta}</span>
      </motion.div>
    </motion.div>
  );
}
