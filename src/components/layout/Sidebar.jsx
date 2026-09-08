import React from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Code2, 
  Layers, 
  UserCheck, 
  FileText, 
  BarChart3, 
  Sparkles, 
  Building2, 
  Compass, 
  Settings, 
  Zap,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab, candidateScore }) {
  const menuGroups = [
    {
      group: "MAIN",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      group: "PREPARATION",
      items: [
        { id: 'prepare-aptitude', label: 'Aptitude Test', icon: BrainCircuit },
        { id: 'prepare-dsa', label: 'DSA & Coding Sandbox', icon: Code2 },
        { id: 'prepare-corecs', label: 'Core CS Subjects', icon: Layers },
        { id: 'prepare-systemdesign', label: 'System Design Canvas', icon: Compass }
      ]
    },
    {
      group: "AI INTERVIEWS",
      items: [
        { id: 'interviews-technical', label: 'Technical AI Mock', icon: Zap },
        { id: 'interviews-hr', label: 'HR STAR Interview', icon: UserCheck },
        { id: 'interviews-fullmock', label: 'Full MNC Mock (5-Round)', icon: Sparkles, badge: 'PRO' }
      ]
    },
    {
      group: "CAREER & RESUME",
      items: [
        { id: 'resume-builder', label: 'Resume & ATS Suite', icon: FileText },
        { id: 'companies', label: 'Company Tracks', icon: Building2 },
        { id: 'roadmap', label: '30-Day Roadmap', icon: Compass },
        { id: 'analytics', label: 'Analytics & Competency', icon: BarChart3 }
      ]
    },
    {
      group: "SYSTEM",
      items: [
        { id: 'settings', label: 'Settings & API Keys', icon: Settings }
      ]
    }
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      backgroundColor: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 40
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 0 12px rgba(99,102,241,0.4)'
        }}>
          <Zap size={20} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
            PREPMATE
          </h2>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', fontWeight: 600 }}>
            MNC INTERVIEW OS
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.75rem' }}>
        {menuGroups.map((group, idx) => (
          <div key={idx} style={{ marginBottom: '1.25rem' }}>
            <div style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: 'var(--text-dim)',
              letterSpacing: '0.08em',
              padding: '0 0.75rem 0.5rem 0.75rem'
            }}>
              {group.group}
            </div>

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.625rem 0.75rem',
                    marginBottom: '0.25rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: isActive ? 'var(--bg-surface-active)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={18} color={isActive ? 'var(--accent-primary)' : 'var(--text-dim)'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="badge badge-violet" style={{ fontSize: '0.625rem', padding: '0.125rem 0.375rem' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* MNC Readiness Footer Widget */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'rgba(99, 102, 241, 0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            MNC Readiness
          </span>
          <span className="badge badge-indigo" style={{ fontWeight: 700 }}>
            {candidateScore}/100
          </span>
        </div>
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill"
            style={{ 
              width: `${candidateScore}%`, 
              background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-emerald))' 
            }}
          />
        </div>
      </div>
    </aside>
  );
}
