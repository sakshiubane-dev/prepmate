import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Wrench, 
  Boxes, 
  Compass, 
  BrainCircuit, 
  ClipboardCheck, 
  Sparkles, 
  FileText, 
  Briefcase, 
  BarChart3, 
  UserRound, 
  Settings, 
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { ENGINEERING_BRANCHES, CAREER_TARGETS_BY_BRANCH } from '../../lib/config/engineeringBranches.js';

const CollapsibleGroup = ({ group, items, currentTab, setCurrentTab }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ marginBottom: '0.875rem' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="sidebar-section-label"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.375rem 0.75rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          transition: 'color 0.2s ease'
        }}
      >
        <span>{group}</span>
        <motion.div
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={13} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0.25rem 0' }}>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`sidebar-nav-item${isActive ? ' active' : ''}`}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.75rem',
                      marginBottom: '0.125rem',
                      borderRadius: '0.375rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
                      <Icon
                        size={16}
                        style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-dim)', flexShrink: 0 }}
                      />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.label}
                      </span>
                    </div>

                    {item.badge && (
                      <span
                        className="badge"
                        style={{
                          fontSize: '0.625rem',
                          padding: '0.125rem 0.375rem',
                          border: 'none',
                          background: 'var(--accent-primary)',
                          color: 'white',
                          flexShrink: 0,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Sidebar({ currentTab, setCurrentTab, candidateScore, candidate }) {
  const branchObj = ENGINEERING_BRANCHES.find(b => b.id === candidate?.branch) || ENGINEERING_BRANCHES[0];
  const targetList = CAREER_TARGETS_BY_BRANCH[candidate?.branch] || CAREER_TARGETS_BY_BRANCH['cs'];
  const targetObj = targetList.find(t => t.id === candidate?.careerTrack) || targetList[0];

  const menuGroups = [
    {
      group: 'HOME',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      group: 'LEARN',
      items: [
        { id: 'my-subjects',        label: 'My Subjects',      icon: BookOpen },
        { id: 'core-engineering',   label: 'Core Engineering', icon: GraduationCap },
        { id: 'technical-skills',   label: 'Technical Skills', icon: Wrench },
        { id: 'prepare-systemdesign', label: 'System Design',  icon: Boxes },
        { id: 'explore-all',        label: 'Explore All',      icon: Compass }
      ]
    },
    {
      group: 'PRACTICE',
      items: [
        { id: 'prepare-aptitude',     label: 'Aptitude',           icon: BrainCircuit },
        { id: 'subject-practice',     label: 'Subject Practice',   icon: ClipboardCheck },
        { id: 'interviews-technical', label: 'AI Mock Interviews',  icon: Sparkles }
      ]
    },
    {
      group: 'CAREER',
      items: [
        { id: 'resume-builder', label: 'Resume & ATS',    icon: FileText },
        { id: 'job-matcher',    label: 'Job Matching',    icon: Briefcase },
        { id: 'roadmap',        label: 'Career Roadmap',  icon: Compass }
      ]
    },
    {
      group: 'INSIGHTS',
      items: [
        { id: 'analytics',    label: 'Analytics',    icon: BarChart3 },
        { id: 'skill-profile', label: 'Skill Profile', icon: UserRound }
      ]
    },
    {
      group: 'FACULTY & ADMIN',
      items: [
        { id: 'admin-learning-content', label: 'Notes Studio', icon: ShieldCheck, badge: 'ADMIN' }
      ]
    }
  ];

  return (
    <aside
      className="sidebar"
      style={{
        width: '260px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 40,
      }}
    >
      {/* Brand Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        borderBottom: '1px solid var(--border-color)',
        flexShrink: 0,
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'var(--accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-main)',
          boxShadow: '0 2px 8px var(--border-glow)',
          flexShrink: 0,
        }}>
          <img
            src="/images/prepmate-logo.png"
            alt=""
            aria-hidden="true"
            style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '8px' }}
          />
        </div>
        <div>
          <h2 style={{
            fontSize: '1.125rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-main)',
          }}>
            PrepMate
          </h2>
        </div>
      </div>

      {/* Navigation Menu */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.5rem' }}>
        {/* Branch Context Widget */}
        <div
          className="sidebar-context-widget"
          style={{
            padding: '0.75rem',
            margin: '0 0.25rem 1rem',
          }}
        >
          <div style={{
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: 'var(--text-main)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginBottom: '0.125rem',
          }}>
            {branchObj.label}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {targetObj.label}
          </div>
          <button
            onClick={() => setCurrentTab('settings')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--accent-primary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            Change track →
          </button>
        </div>

        {menuGroups.map((group, idx) => (
          <CollapsibleGroup
            key={idx}
            group={group.group}
            items={group.items}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-color)', flexShrink: 0 }}>
        <button
          onClick={() => setCurrentTab('settings')}
          className="sidebar-nav-item"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.5rem 0.75rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: '0.375rem',
          }}
        >
          <Settings size={16} style={{ color: 'var(--text-dim)' }} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
