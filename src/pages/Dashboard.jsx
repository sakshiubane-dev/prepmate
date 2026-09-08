import React from 'react';
import ScoreRadialGauge from '../components/common/ScoreRadialGauge';
import AICareerCoachCard from '../components/common/AICareerCoachCard';
import TodaysPlanWidget from '../components/common/TodaysPlanWidget';
import SkillProgressBar from '../components/common/SkillProgressBar';
import { 
  FileText, 
  BrainCircuit, 
  Code2, 
  Layers, 
  Zap, 
  Compass, 
  UserCheck, 
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export default function Dashboard({ candidate, onNavigate, onStartMock }) {
  const categoryIcons = {
    resume: FileText,
    aptitude: BrainCircuit,
    dsa: Code2,
    coreCs: Layers,
    technical: Zap,
    systemDesign: Compass,
    hr: UserCheck,
    communication: MessageSquare
  };

  const categoryNames = {
    resume: 'Resume / ATS Readiness',
    aptitude: 'Aptitude & Reasoning',
    dsa: 'DSA & Algorithms',
    coreCs: 'Core CS (DBMS, OS, Networks)',
    technical: 'Technical & Stack Depth',
    systemDesign: 'System Design & Scalability',
    hr: 'HR & Behavioral STAR',
    communication: 'Communication Clarity'
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Top Banner Overview */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
              MNC Interview Preparation Dashboard
            </h2>
            <span className="badge badge-emerald">Active Profile</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Real-time competency evaluation for <strong>{candidate.targetRole}</strong> recruitment.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={() => onNavigate('prepare-systemdesign')} className="btn btn-secondary btn-sm">
            <span>Practice System Design</span>
          </button>
          <button onClick={onStartMock} className="btn btn-primary btn-sm">
            <Sparkles size={16} />
            <span>Launch AI Mock</span>
          </button>
        </div>
      </div>

      {/* Grid Row 1: MNC Readiness Gauge + AI Coach Recommendation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* MNC Score Radial Gauge */}
        <ScoreRadialGauge 
          score={candidate.mncReadinessScore} 
          delta={candidate.scoreDelta} 
        />

        {/* AI Career Coach Recommendation */}
        <AICareerCoachCard 
          recommendation={candidate.aiCoachRecommendation} 
          onStartPractice={onNavigate} 
        />
      </div>

      {/* Grid Row 2: Today's Plan + Category Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Today's Plan Checklist */}
        <TodaysPlanWidget 
          plan={candidate.todaysPlan} 
          onNavigate={onNavigate} 
        />

        {/* Quick Launch Practice Modules */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
              Quick Practice Suites
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>Adaptive Engine</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              { title: 'Aptitude Test', route: 'prepare-aptitude', icon: BrainCircuit, color: '#f59e0b' },
              { title: 'DSA Coding Sandbox', route: 'prepare-dsa', icon: Code2, color: '#10b981' },
              { title: 'System Design Canvas', route: 'prepare-systemdesign', icon: Compass, color: '#8b5cf6' },
              { title: 'ATS Resume Optimizer', route: 'resume-builder', icon: FileText, color: '#6366f1' }
            ].map((m, idx) => {
              const Icon = m.icon;
              return (
                <button
                  key={idx}
                  onClick={() => onNavigate(m.route)}
                  className="btn btn-secondary"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    gap: '0.5rem'
                  }}
                >
                  <Icon size={20} color={m.color} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>{m.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Scores Grid */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>
              Competency Breakdown across 8 Pillars
            </h3>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Updated dynamically as you complete practice sessions and AI mock interviews.
            </span>
          </div>
          <button onClick={() => onNavigate('analytics')} className="btn btn-outline btn-sm">
            <span>View Full Analytics</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
          {Object.entries(candidate.categoryScores).map(([key, score]) => (
            <SkillProgressBar 
              key={key} 
              name={categoryNames[key] || key} 
              score={score} 
              icon={categoryIcons[key]} 
            />
          ))}
        </div>
      </div>

      {/* Recent Interviews History */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>
            Recent AI Mock Interview Sessions
          </h3>
          <button onClick={onStartMock} className="btn btn-primary btn-sm">
            <span>Start New Interview</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {candidate.recentInterviews.map((session) => (
            <div key={session.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              backgroundColor: 'var(--bg-surface-hover)',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-color)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fff' }}>
                    {session.type}
                  </span>
                  <span className="badge badge-indigo" style={{ fontSize: '0.6875rem' }}>
                    {session.role}
                  </span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  {session.feedback}
                </p>
              </div>

              <div style={{ textAlign: 'right', minWidth: '100px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: session.score >= 80 ? '#34d399' : session.score >= 65 ? '#818cf8' : '#fbbf24' }}>
                  {session.score}%
                </div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                  {session.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
