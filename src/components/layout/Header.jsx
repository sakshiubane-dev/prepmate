import React from 'react';
import { Flame, Bell, Sparkles, ChevronDown, User } from 'lucide-react';

export default function Header({ candidate, onStartMock }) {
  return (
    <header style={{
      height: '64px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      {/* Greeting & Target Role */}
      <div>
        <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>
          Good evening, {candidate.name.split(' ')[0]}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>Targeting: <strong style={{ color: 'var(--text-main)' }}>{candidate.targetRole}</strong></span>
          <span>•</span>
          <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>{candidate.experienceLevel}</span>
        </div>
      </div>

      {/* Action Stats Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Streak Badge */}
        <div className="badge badge-amber" style={{ padding: '0.375rem 0.75rem', fontSize: '0.8125rem' }}>
          <Flame size={16} fill="#f59e0b" color="#f59e0b" />
          <span>{candidate.streakDays}-Day Streak</span>
        </div>

        {/* Start Interview CTA */}
        <button 
          onClick={onStartMock}
          className="btn btn-primary btn-sm"
        >
          <Sparkles size={16} />
          <span>Start AI Mock</span>
        </button>

        {/* User Avatar */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-surface-active)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-main)',
          fontWeight: 700,
          fontSize: '0.875rem'
        }}>
          {candidate.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
    </header>
  );
}
