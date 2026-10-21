import React, { useState } from 'react';
import { SAMPLE_JOB_DESCRIPTION, analyzeAtsResume, DEFAULT_RESUME } from '../../lib/resume/atsAnalyzer';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, Layers, FileText } from 'lucide-react';

export default function JobMatcher({ onOptimizeResume }) {
  const [jd, setJd] = useState(SAMPLE_JOB_DESCRIPTION);
  const [analysis, setAnalysis] = useState(() => analyzeAtsResume(JSON.stringify(DEFAULT_RESUME), SAMPLE_JOB_DESCRIPTION));
  const [optimized, setOptimized] = useState(false);

  const handleOptimize = () => {
    setOptimized(true);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1300px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Layers size={24} color="var(--accent-violet)" />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Job Description Matcher & Gap Analyzer
            </h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Compare target MNC job postings directly against your competency profile.
          </p>
        </div>

        <button onClick={handleOptimize} className="btn btn-primary btn-sm">
          <Sparkles size={16} />
          <span>Optimize Resume for this Role</span>
        </button>
      </div>

      {/* Side by Side Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Left: Job Description Input */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Target Job Description (MNC Posting)
          </h3>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            style={{
              width: '100%',
              height: '320px',
              backgroundColor: 'var(--bg-dark)',
              color: 'var(--text-main)',
              fontSize: '0.875rem',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-color)',
              outline: 'none',
              resize: 'none',
              lineHeight: 1.6
            }}
          />
        </div>

        {/* Right: Gap Analysis & Match Breakdown */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Role Compatibility Score
              </h3>
              <span className="badge badge-emerald" style={{ fontSize: '1rem', fontWeight: 800 }}>
                {analysis.keywordMatchPct}% Match
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>
                MATCHED SKILLS & REQUIREMENTS:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.25rem' }}>
                {analysis.matchedSkills.map((s, idx) => (
                  <span key={idx} className="badge badge-emerald">✓ {s}</span>
                ))}
              </div>

              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>
                IDENTIFIED SKILL GAPS:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {analysis.missingSkills.map((s, idx) => (
                  <span key={idx} className="badge badge-rose">✕ {s}</span>
                ))}
              </div>
            </div>

            {optimized && (
              <div className="animate-fade-in" style={{ padding: '1rem', backgroundColor: 'rgba(99, 102, 241, 0.12)', borderRadius: '0.5rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', display: 'block', marginBottom: '0.25rem' }}>
                  NEW TAILORED RESUME VERSION GENERATED:
                </span>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Created <strong>"Resume_SoftwareEngineer_Amazon.pdf"</strong> incorporating Docker, Redis caching architecture, and AWS microservices.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
