import React from 'react';
import { motion } from 'framer-motion';
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
  ShieldCheck,
  Database,
  GitBranch,
  Terminal,
  Box
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

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
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ padding: '2.5rem 3rem', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}
    >
      {/* 1. Header Overview Section */}
      <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            Good evening, {candidate.name.split(' ')[0]}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', color: 'var(--text-muted)' }}>
            <span style={{ fontWeight: 500 }}>{candidate.targetRole}</span>
            <span>•</span>
            <span>{candidate.experienceLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Readiness and AI Coach Section */}
      <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.5rem' }}>
        <ScoreRadialGauge 
          score={candidate.mncReadinessScore} 
          delta={candidate.scoreDelta} 
          breakdown={candidate.categoryScores}
        />
        <AICareerCoachCard 
          recommendation={candidate.aiCoachRecommendation} 
          onStartPractice={onNavigate} 
        />
      </motion.div>

      {/* 3. Today's Plan and Progress Section */}
      <motion.div variants={itemVariants}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <div>
            {candidate.todaysPlan && candidate.todaysPlan.length > 0 ? (
              <TodaysPlanWidget plan={candidate.todaysPlan} onNavigate={onNavigate} />
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--bg-surface)', borderRadius: '0.5rem', border: '1px dashed var(--border-color)' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>No tasks scheduled for today.</p>
                <button onClick={() => onNavigate('prepare-systemdesign')} className="btn btn-sm" style={{ marginTop: '1rem', background: 'var(--bg-surface-hover)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>Generate New Plan</button>
              </div>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Progress
              </h2>
              <button onClick={() => onNavigate('analytics')} className="btn btn-sm" style={{ background: 'transparent', color: 'var(--text-muted)' }}>
                View Full <ArrowUpRight size={14} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(candidate.categoryScores).slice(0,4).map(([key, score]) => (
                <SkillProgressBar 
                  key={key} 
                  name={categoryNames[key] || key} 
                  score={score} 
                  icon={categoryIcons[key]} 
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. Practice Hub & Recent Activity */}
      <motion.div variants={itemVariants}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              Practice Hub
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              Tailored modules for <strong>{candidate.branch || 'General'}</strong>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {(() => {
                const practiceModulesByBranch = {
                  'cs': [
                    { title: 'Aptitude Test', route: 'prepare-aptitude', icon: BrainCircuit },
                    { title: 'DSA Sandbox', route: 'prepare-dsa', icon: Code2 },
                    { title: 'Core CS (OS/DBMS)', route: 'prepare-corecs', icon: Layers },
                    { title: 'System Design', route: 'prepare-systemdesign', icon: Compass },
                    { title: 'OOP', route: 'prepare-oop', icon: Box },
                    { title: 'Git & GitHub', route: 'prepare-git', icon: GitBranch },
                  ],
                  'extc': [
                    { title: 'Aptitude Test', route: 'prepare-aptitude', icon: BrainCircuit },
                    { title: 'Digital Electronics', route: 'prepare-digitalelectronics', icon: Layers },
                    { title: 'Signals & Systems', route: 'prepare-signals', icon: Zap },
                    { title: 'Microcontrollers', route: 'prepare-microcontrollers', icon: Compass },
                    { title: 'Embedded Systems', route: 'prepare-embedded', icon: Code2 },
                    { title: 'Resume Optimizer', route: 'resume-builder', icon: FileText }
                  ],
                  'mechanical': [
                    { title: 'Aptitude Test', route: 'prepare-aptitude', icon: BrainCircuit },
                    { title: 'Thermodynamics', route: 'prepare-thermo', icon: Zap },
                    { title: 'Fluid Mechanics', route: 'prepare-fluid', icon: Compass },
                    { title: 'Strength of Materials', route: 'prepare-som', icon: Layers },
                    { title: 'Machine Design', route: 'prepare-machinedesign', icon: Box },
                    { title: 'Resume Optimizer', route: 'resume-builder', icon: FileText }
                  ],
                  'default': [
                    { title: 'Aptitude Test', route: 'prepare-aptitude', icon: BrainCircuit },
                    { title: 'Resume Optimizer', route: 'resume-builder', icon: FileText },
                    { title: 'HR & Behavioral', route: 'interviews-hr', icon: MessageSquare },
                  ]
                };
                
                const branchMap = { cs: 'Computer Science', extc: 'Electronics & Telecommunication', mechanical: 'Mechanical' };
                const branchDisplayName = branchMap[candidate.branch] || candidate.branch || 'General Engineering';
                const modules = practiceModulesByBranch[candidate.branch] || practiceModulesByBranch['default'];
                
                return modules.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: 'var(--bg-surface-hover)' }}
                      whileTap={{ scale: 0.98 }}
                      key={idx}
                      onClick={() => onNavigate(m.route)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        gap: '0.75rem',
                        textAlign: 'left',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-main)',
                        cursor: 'pointer'
                      }}
                    >
                      <Icon size={18} color="var(--text-dim)" />
                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{m.title}</span>
                    </motion.button>
                  );
                });
              })()}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Recent Activity
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {candidate.recentInterviews && candidate.recentInterviews.length > 0 ? (
                candidate.recentInterviews.map((session) => (
                  <motion.div 
                    whileHover={{ x: 4 }}
                    key={session.id} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem',
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-main)' }}>
                          {session.type}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        {session.feedback}
                      </p>
                    </div>

                    <div style={{ textAlign: 'right', minWidth: '100px' }}>
                      <div style={{ fontSize: '1.125rem', fontWeight: 700, color: session.score >= 80 ? 'var(--accent-emerald)' : session.score >= 65 ? 'var(--accent-primary)' : 'var(--accent-amber)' }}>
                        {session.score}%
                      </div>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                        {session.date}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--bg-surface)', borderRadius: '0.5rem', border: '1px dashed var(--border-color)' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: '0.5rem' }}>You haven't completed any mock interviews yet.</p>
                  <button onClick={onStartMock} className="btn btn-sm" style={{ background: 'var(--accent-primary)', color: 'var(--text-main)', border: 'none' }}>Take your first AI Mock</button>
                </div>
              )}
            </div>
          </div>

        </div>
      </motion.div>

    </motion.div>
  );
}

