import React, { useState } from 'react';
import { analyzeAtsResume, DEFAULT_RESUME, SAMPLE_JOB_DESCRIPTION } from '../../lib/resume/atsAnalyzer';
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, FileText } from 'lucide-react';

export default function AtsAnalyzer() {
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESCRIPTION);
  const [analysis, setAnalysis] = useState(() => analyzeAtsResume(JSON.stringify(DEFAULT_RESUME), SAMPLE_JOB_DESCRIPTION));

  const handleReanalyze = () => {
    const result = analyzeAtsResume(JSON.stringify(DEFAULT_RESUME), jobDescription);
    setAnalysis(result);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1300px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <ShieldCheck size={24} color="var(--accent-emerald)" />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
              ATS Resume & Keyword Analyzer
            </h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Evaluate your resume against automated ATS screening algorithms used by MNC recruiters.
          </p>
        </div>

        <button onClick={handleReanalyze} className="btn btn-primary btn-sm">
          <Sparkles size={16} />
          <span>Run ATS Analysis</span>
        </button>
      </div>

      {/* Scores Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>OVERALL ATS SCORE</span>
          <div style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: '0.25rem 0' }}>
            {analysis.atsScore}%
          </div>
          <span className="badge badge-emerald">Passing Grade</span>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>KEYWORD MATCH</span>
          <div style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--accent-primary)', margin: '0.25rem 0' }}>
            {analysis.keywordMatchPct}%
          </div>
          <span className="badge badge-indigo">12 Keywords Tested</span>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>TECHNICAL STRENGTH</span>
          <div style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--accent-violet)', margin: '0.25rem 0' }}>
            {analysis.technicalStrength}%
          </div>
          <span className="badge badge-violet">High Depth</span>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>IMPACT & METRICS</span>
          <div style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--accent-amber)', margin: '0.25rem 0' }}>
            {analysis.impactScore}%
          </div>
          <span className="badge badge-amber">Action Verbs</span>
        </div>
      </div>

      {/* Matched vs Missing Skills */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '1rem' }}>
            ✓ Matched Keywords ({analysis.matchedSkills.length})
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {analysis.matchedSkills.map((s, idx) => (
              <span key={idx} className="badge badge-emerald" style={{ padding: '0.375rem 0.75rem' }}>
                <CheckCircle2 size={14} /> {s}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-rose)', marginBottom: '1rem' }}>
            ⚠ Missing Keywords ({analysis.missingSkills.length})
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {analysis.missingSkills.map((s, idx) => (
              <span key={idx} className="badge badge-rose" style={{ padding: '0.375rem 0.75rem' }}>
                <AlertTriangle size={14} /> {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Job Description Text Box */}
      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
          Target Job Description
        </h3>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          style={{
            width: '100%',
            height: '150px',
            backgroundColor: 'var(--bg-dark)',
            color: '#fff',
            fontSize: '0.875rem',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--border-color)',
            outline: 'none',
            resize: 'vertical'
          }}
        />
      </div>
    </div>
  );
}
