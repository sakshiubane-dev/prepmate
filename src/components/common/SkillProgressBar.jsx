import React from 'react';
import { getSkillStatus } from '../../lib/skills/competencyEngine';

export default function SkillProgressBar({ name, score, icon: Icon }) {
  const status = getSkillStatus(score);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.375rem',
      padding: '0.75rem 1rem',
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: '0.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {Icon && <Icon size={16} color="var(--accent-primary)" />}
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>
            {name}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className={`badge ${status.badge}`} style={{ fontSize: '0.6875rem', padding: '0.125rem 0.375rem' }}>
            {status.label}
          </span>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>
            {score}%
          </span>
        </div>
      </div>

      <div className="progress-bar-track" style={{ height: '6px' }}>
        <div 
          className="progress-bar-fill" 
          style={{ 
            width: `${score}%`, 
            backgroundColor: status.color 
          }} 
        />
      </div>
    </div>
  );
}
