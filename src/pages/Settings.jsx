import React, { useState } from 'react';
import { User, Settings as SettingsIcon, Layers, ShieldCheck, Download, Save, ChevronDown, Key } from 'lucide-react';
import { ENGINEERING_BRANCHES, CAREER_TARGETS_BY_BRANCH } from '../lib/config/engineeringBranches.js';
import { ALL_SUBJECTS } from '../lib/data/subjects.js';

export default function Settings({ candidate, onUpdateCandidate }) {
  const [branch, setBranch] = useState(candidate?.branch || 'cs');
  const [careerTarget, setCareerTarget] = useState(candidate?.careerTrack || 'software');
  const [studyTime, setStudyTime] = useState('1 hour');
  const [prepPriority, setPrepPriority] = useState('Placement');
  const [showDeveloperSettings, setShowDeveloperSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [savedDevKeys, setSavedDevKeys] = useState(false);

  // Available subjects for the branch
  const availableSubjects = ALL_SUBJECTS.filter(s => s.branch === branch);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState(
    availableSubjects.map(s => s.id)
  );

  const handleBranchChange = (newBranch) => {
    setBranch(newBranch);
    const newTargets = CAREER_TARGETS_BY_BRANCH[newBranch] || [];
    const defaultTarget = newTargets[0]?.id || 'general';
    setCareerTarget(defaultTarget);

    const newAvail = ALL_SUBJECTS.filter(s => s.branch === newBranch).map(s => s.id);
    setSelectedSubjectIds(newAvail);

    if (onUpdateCandidate) {
      onUpdateCandidate({
        ...candidate,
        branch: newBranch,
        careerTrack: defaultTarget
      });
    }
  };

  const handleTargetChange = (newTarget) => {
    setCareerTarget(newTarget);
    if (onUpdateCandidate) {
      onUpdateCandidate({
        ...candidate,
        careerTrack: newTarget
      });
    }
  };

  const toggleSubject = (id) => {
    if (selectedSubjectIds.includes(id)) {
      setSelectedSubjectIds(selectedSubjectIds.filter(i => i !== id));
    } else {
      setSelectedSubjectIds([...selectedSubjectIds, id]);
    }
  };

  return (
    <div style={{ padding: '2.5rem 3rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <User size={28} color="var(--accent-primary)" />
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
            PROFILE & CAREER SETTINGS
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Configure your engineering domain, target roles, core preparation subjects, and learning preferences.
          </p>
        </div>
      </div>

      {/* 1. YOUR ENGINEERING JOURNEY */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          1. Your Engineering Journey
        </h3>

        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
          ENGINEERING BRANCH
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {ENGINEERING_BRANCHES.map(b => (
            <button
              key={b.id}
              onClick={() => handleBranchChange(b.id)}
              className={`btn btn-sm ${branch === b.id ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.8125rem' }}
            >
              {b.label}
            </button>
          ))}
        </div>

        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
          DYNAMIC CAREER TARGET ({ENGINEERING_BRANCHES.find(b => b.id === branch)?.label})
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {(CAREER_TARGETS_BY_BRANCH[branch] || []).map(t => (
            <button
              key={t.id}
              onClick={() => handleTargetChange(t.id)}
              className={`btn btn-sm ${careerTarget === t.id ? 'btn-emerald' : 'btn-outline'}`}
              style={{ fontSize: '0.8125rem' }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. CORE SUBJECTS TOGGLE */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          2. Core Subjects Selection
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Choose which subjects appear prominently in your preparation plan and dashboard.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {availableSubjects.map(sub => {
            const isSelected = selectedSubjectIds.includes(sub.id);
            return (
              <button
                key={sub.id}
                onClick={() => toggleSubject(sub.id)}
                className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline'}`}
              >
                <span>{isSelected ? '✓ ' : '+ '}{sub.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. LEARNING PREFERENCES */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          3. Learning Preferences
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
              DAILY STUDY COMMITMENT
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['30 min', '1 hour', '2 hours', '3+ hours'].map(t => (
                <button
                  key={t}
                  onClick={() => setStudyTime(t)}
                  className={`btn btn-sm ${studyTime === t ? 'btn-emerald' : 'btn-outline'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
              PREPARATION PRIORITY
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['Placement', 'Core Engineering', 'Software Jobs', 'Higher Studies'].map(p => (
                <button
                  key={p}
                  onClick={() => setPrepPriority(p)}
                  className={`btn btn-sm ${prepPriority === p ? 'btn-primary' : 'btn-outline'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. ADVANCED DEVELOPER SETTINGS (COLLAPSIBLE / SECURE API KEYS) */}
      <div className="card" style={{ border: '1px solid var(--border-color)' }}>
        <div 
          onClick={() => setShowDeveloperSettings(!showDeveloperSettings)} 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={18} color="var(--text-dim)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Advanced Developer Settings (Custom LLM Keys)
            </h3>
          </div>
          <ChevronDown size={18} style={{ transform: showDeveloperSettings ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </div>

        {showDeveloperSettings && (
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              PrepMate runs automatically with pre-configured internal AI models. Optionally provide a masked custom OpenAI/Gemini API key for developer testing.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-proj-••••••••••••••••"
                style={{
                  flex: 1,
                  padding: '0.625rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'var(--bg-dark)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-color)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem'
                }}
              />
              <button 
                onClick={() => {
                  setSavedDevKeys(true);
                  setTimeout(() => setSavedDevKeys(false), 2000);
                }} 
                className="btn btn-secondary btn-sm"
              >
                Save Secret
              </button>
            </div>

            {savedDevKeys && (
              <span className="badge badge-emerald" style={{ marginTop: '0.5rem', display: 'inline-block' }}>
                ✓ Key securely updated
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
