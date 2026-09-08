import React, { useState } from 'react';
import { DEFAULT_RESUME } from '../../lib/resume/atsAnalyzer';
import { aiOrchestrator } from '../../lib/ai/aiOrchestrator';
import { FileText, Sparkles, Plus, Download, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ResumeBuilder({ onNavigateToAts }) {
  const [resume, setResume] = useState(DEFAULT_RESUME);
  const [improvingIdx, setImprovingIdx] = useState(null);

  const handleImproveBullet = async (expIdx, bulletIdx, mode) => {
    setImprovingIdx(`${expIdx}_${bulletIdx}`);
    const originalBullet = resume.experience[expIdx].bullets[bulletIdx];
    const improved = await aiOrchestrator.improveResumeBullet(originalBullet, mode);

    const updatedExp = [...resume.experience];
    updatedExp[expIdx].bullets[bulletIdx] = improved;
    setResume({ ...resume, experience: updatedExp });
    setImprovingIdx(null);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <FileText size={24} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
              MNC AI Resume Builder
            </h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Craft ATS-optimized bullet points with measurable engineering impact.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={onNavigateToAts} className="btn btn-secondary btn-sm">
            <span>Analyze ATS Score</span>
          </button>
          <button onClick={() => alert("Resume exported as PDF!")} className="btn btn-primary btn-sm">
            <Download size={16} />
            <span>Export Resume PDF</span>
          </button>
        </div>
      </div>

      {/* Grid: Editor Left + Live Preview Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Editor Form */}
        <div className="card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.05em', marginBottom: '1rem', display: 'block' }}>
            EXPERIENCE & PROJECT BULLET OPTIMIZER
          </span>

          {resume.experience.map((exp, expIdx) => (
            <div key={expIdx} style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, color: '#fff' }}>{exp.role} @ {exp.company}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{exp.duration}</span>
              </div>

              {exp.bullets.map((b, bIdx) => (
                <div key={bIdx} style={{ marginBottom: '0.875rem' }}>
                  <textarea
                    value={b}
                    onChange={(e) => {
                      const updated = [...resume.experience];
                      updated[expIdx].bullets[bIdx] = e.target.value;
                      setResume({ ...resume, experience: updated });
                    }}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-surface)',
                      color: '#fff',
                      fontSize: '0.875rem',
                      padding: '0.75rem',
                      borderRadius: '0.375rem',
                      border: '1px solid var(--border-color)',
                      resize: 'vertical'
                    }}
                  />

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.375rem' }}>
                    <button
                      onClick={() => handleImproveBullet(expIdx, bIdx, 'ats')}
                      disabled={improvingIdx === `${expIdx}_${bIdx}`}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                    >
                      <Sparkles size={12} color="var(--accent-primary)" />
                      <span>Make ATS Friendly</span>
                    </button>

                    <button
                      onClick={() => handleImproveBullet(expIdx, bIdx, 'impact')}
                      disabled={improvingIdx === `${expIdx}_${bIdx}`}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                    >
                      <Sparkles size={12} color="var(--accent-emerald)" />
                      <span>Add Measurable Impact %</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Live Resume Document Preview */}
        <div className="card" style={{ backgroundColor: '#ffffff', color: '#1e293b', padding: '2rem', borderRadius: '0.5rem', fontFamily: 'Arial, sans-serif' }}>
          <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>{resume.fullName}</h1>
            <div style={{ fontSize: '0.875rem', color: '#475569', marginTop: '0.25rem' }}>
              {resume.email} • {resume.phone} • {resume.location}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem' }}>
              Professional Summary
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#334155', lineHeight: 1.5, marginTop: '0.375rem' }}>
              {resume.summary}
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem' }}>
              Experience
            </h2>
            {resume.experience.map((exp, idx) => (
              <div key={idx} style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
                  <span>{exp.role} — {exp.company}</span>
                  <span>{exp.duration}</span>
                </div>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8125rem', color: '#334155', marginTop: '0.25rem' }}>
                  {exp.bullets.map((b, bIdx) => <li key={bIdx} style={{ marginBottom: '0.25rem' }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem' }}>
              Technical Skills
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#334155', marginTop: '0.375rem' }}>
              {resume.skills.join(' • ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
