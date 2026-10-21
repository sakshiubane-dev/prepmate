import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Sun, Moon, ShieldCheck } from 'lucide-react';

export default function Header({ candidate, onStartMock, theme = 'dark', onToggleTheme, onNavigate, onLogout }) {
  const isLight = theme === 'light';

  return (
    <header
      className="header"
      style={{
        height: '64px',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Greeting & Target Role */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
            Good {getGreeting()}, {candidate.name.split(' ')[0]}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1px' }}>
            <span>
              Branch:{' '}
              <strong style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
                {candidate.branch?.toUpperCase() || 'CS'}
              </strong>
            </span>
            <span style={{ color: 'var(--border-color)' }}>•</span>
            <span style={{ color: 'var(--accent-info)', fontWeight: 500 }}>{candidate.targetRole}</span>
          </div>
        </div>
      </div>

      {/* Right side actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          onClick={onToggleTheme}
          title={`Switch to ${isLight ? 'Dark' : 'Light'} mode`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.375rem 0.75rem',
            borderRadius: '9999px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-surface-hover)',
            color: 'var(--text-secondary)',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.18s ease',
          }}
        >
          {isLight ? (
            <>
              <Moon size={14} style={{ color: 'var(--accent-primary)' }} />
              <span>Dark</span>
            </>
          ) : (
            <>
              <Sun size={14} style={{ color: 'var(--accent-amber)' }} />
              <span>Light</span>
            </>
          )}
        </motion.button>

        {onLogout && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={onLogout}
            title="Log out"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.375rem 0.75rem',
              borderRadius: '9999px',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              background: 'rgba(239, 68, 68, 0.08)',
              color: '#fca5a5',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span>Logout</span>
          </motion.button>
        )}

        {/* Streak Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            padding: '0.375rem 0.75rem',
            fontSize: '0.8125rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            borderRadius: '9999px',
            background: 'var(--accent-amber-subtle)',
            color: 'var(--accent-amber)',
            border: '1px solid rgba(251, 191, 36, 0.25)',
            fontWeight: 600,
            cursor: 'default',
          }}
        >
          <Flame size={14} fill="currentColor" />
          <span>{candidate.streakDays}-Day</span>
        </motion.div>

        {/* Notes Studio CTA for Faculty/Admin */}
        {onNavigate && (
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('admin-learning-content')}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8125rem', fontWeight: 600, gap: '0.35rem' }}
            title="Upload and manage module study notes"
          >
            <ShieldCheck size={14} color="var(--accent-primary)" />
            <span>Notes Studio</span>
          </motion.button>
        )}

        {/* Quick Mock CTA */}
        <motion.button
          whileHover={{ y: -1, boxShadow: '0 4px 14px rgba(99,102,241,0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartMock}
          className="btn btn-primary btn-sm"
          style={{ padding: '0.45rem 1rem', fontSize: '0.8125rem', fontWeight: 600, border: 'none' }}
        >
          <Sparkles size={14} />
          <span>Quick Mock</span>
        </motion.button>

        {/* User Avatar */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'var(--accent-primary-subtle)',
            border: '2px solid var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)',
            fontWeight: 700,
            fontSize: '0.75rem',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {candidate.name.split(' ').map(n => n[0]).join('')}
        </motion.div>
      </div>
    </header>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
