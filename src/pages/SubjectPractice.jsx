import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { ALL_SUBJECTS } from '../lib/data/subjects.js';

export default function SubjectPractice({ candidate, onSelectSubject }) {
  const userBranch = candidate?.branch || 'cs';
  const subjects = ALL_SUBJECTS.filter(s => s.branch === userBranch);

  return (
    <div style={{ padding: '2.5rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <ClipboardCheck size={24} color="var(--accent-primary)" />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Subject Practice Sets
          </h1>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Solve topic practice problems, numerical calculations, and conceptual questions for your branch.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {subjects.map(s => (
          <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {s.name} Practice
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                {s.shortDescription}
              </p>
            </div>

            <button onClick={() => onSelectSubject(s)} className="btn btn-primary" style={{ justifyContent: 'center' }}>
              <span>Start Practice Questions</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
