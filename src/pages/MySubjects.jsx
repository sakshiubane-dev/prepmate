import React from 'react';
import { ALL_SUBJECTS } from '../lib/data/subjects.js';
import { ENGINEERING_BRANCHES } from '../lib/config/engineeringBranches.js';
import { getSubjectProgress } from '../lib/data/lessons/index.js';
import { BookOpen, ArrowRight, CheckCircle2, Award } from 'lucide-react';

export default function MySubjects({ candidate, onSelectSubject }) {
  const userBranch = candidate?.branch || 'cs';
  const branchLabel = ENGINEERING_BRANCHES.find(b => b.id === userBranch)?.label || 'Engineering';

  // Filter subjects for current candidate's branch
  const mySubjectsList = ALL_SUBJECTS.filter(s => s.branch === userBranch);

  return (
    <div style={{ padding: '2.5rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <BookOpen size={24} color="var(--accent-primary)" />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
            My Active Subjects ({branchLabel})
          </h1>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Curated core subjects tailored specifically for your <strong>{candidate?.careerTrack || 'Core'}</strong> track.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {mySubjectsList.map(subject => {
            const subjectProgress = getSubjectProgress(subject);
            return <div 
            key={subject.id} 
            className="card"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
            onClick={() => onSelectSubject(subject)}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {subject.name}
                </h3>
                <span className="badge badge-indigo">{subject.difficulty}</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                {subject.shortDescription}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.375rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Completion</span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{subjectProgress.progress}%</span>
              </div>
              <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--bg-dark)', borderRadius: '3px', marginBottom: '1rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${subjectProgress.progress}%`, backgroundColor: 'var(--accent-emerald)' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  {subjectProgress.topicsCompleted} / {subject.topics?.length || 10} Topics
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-primary)', fontSize: '0.8125rem', fontWeight: 600 }}>
                  <span>Study Subject</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
          ;
        })}
      </div>
    </div>
  );
}
