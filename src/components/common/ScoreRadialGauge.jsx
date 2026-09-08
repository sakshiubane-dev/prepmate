import React from 'react';
import { TrendingUp, ShieldCheck } from 'lucide-react';

export default function ScoreRadialGauge({ score = 78, delta = "+8 points this month" }) {
  // Circular arc calculation
  const radius = 70;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, var(--bg-surface) 0%, rgba(17, 22, 37, 0.95) 100%)'
    }}>
      {/* Header Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <ShieldCheck size={18} color="var(--accent-primary)" />
        <span style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
          MNC READINESS SCORE
        </span>
      </div>

      {/* SVG Radial Arc */}
      <div style={{ position: 'relative', width: '180px', height: '180px' }}>
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background Track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Active Score Fill Arc */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke="url(#scoreGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Score Text */}
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
          <span style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
            {score}
          </span>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-dim)', fontWeight: 600 }}>
            out of 100
          </span>
        </div>
      </div>

      {/* Delta Badge */}
      <div style={{
        marginTop: '1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.375rem 0.875rem',
        borderRadius: '9999px',
        backgroundColor: 'rgba(16, 185, 129, 0.12)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        color: '#34d399',
        fontSize: '0.8125rem',
        fontWeight: 600
      }}>
        <TrendingUp size={14} />
        <span>{delta}</span>
      </div>
    </div>
  );
}
