import React, { useState } from 'react';
import { ALL_SUBJECTS } from '../lib/data/subjects.js';
import { ENGINEERING_BRANCHES } from '../lib/config/engineeringBranches.js';
import { getSubjectProgress } from '../lib/data/lessons/index.js';
import { 
  Code2, Box, Database, Cpu, Globe, Layers, Sliders, Zap, Activity, Flame, Shield, Droplets, 
  Settings as GearIcon, Building, Mountain, Dna, FlaskConical, Car, Factory, Plane, Radio, Search, Filter, ArrowRight 
} from 'lucide-react';

const iconMap = {
  Code2, Box, Database, Cpu, Globe, Layers, Sliders, Zap, Activity, Flame, Shield, Droplets,
  Settings: GearIcon, Building, Mountain, Dna, FlaskConical, Car, Factory, Plane, Radio
};

export default function CoreEngineering({ candidate, onSelectSubject }) {
  const [activeBranch, setActiveBranch] = useState(candidate?.branch || 'cs');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');

  const filteredSubjects = ALL_SUBJECTS.filter(s => {
    const matchesBranch = showAll || s.branch === activeBranch;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDiff = difficultyFilter === 'ALL' || s.difficulty.toUpperCase() === difficultyFilter;
    return matchesBranch && matchesSearch && matchesDiff;
  });

  const getBranchLabel = (id) => {
    const b = ENGINEERING_BRANCHES.find(item => item.id === id);
    return b ? b.label : id;
  };

  return (
    <div style={{ padding: '2.5rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header & Search Bar */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Core Engineering Subjects Hub
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
            Curated preparation paths for <strong>{getBranchLabel(activeBranch)}</strong>. Select any subject to explore lessons, assessments, and AI interviews.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={() => setShowAll(!showAll)} 
            className={`btn btn-sm ${showAll ? 'btn-primary' : 'btn-outline'}`}
          >
            {showAll ? 'Showing All Branches' : 'Filter by My Branch'}
          </button>
        </div>
      </div>

      {/* Branch Selector Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        {ENGINEERING_BRANCHES.map(b => (
          <button
            key={b.id}
            onClick={() => {
              setActiveBranch(b.id);
              setShowAll(false);
            }}
            className={`btn btn-sm ${activeBranch === b.id && !showAll ? 'btn-emerald' : 'btn-outline'}`}
            style={{ fontSize: '0.8125rem' }}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search subjects or topics (e.g. MOSFET, Thermodynamics, SQL, PCR)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.75rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              outline: 'none',
              fontSize: '0.9375rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="var(--text-dim)" />
          {['ALL', 'INTERMEDIATE', 'ADVANCED'].map(d => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`btn btn-sm ${difficultyFilter === d ? 'btn-secondary' : 'btn-outline'}`}
              style={{ fontSize: '0.75rem' }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Subject Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {filteredSubjects.map(subject => {
          const IconComponent = iconMap[subject.icon] || Code2;
          const subjectProgress = getSubjectProgress(subject);
          return (
            <div 
              key={subject.id} 
              className="card" 
              style={{
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onClick={() => onSelectSubject(subject)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      padding: '0.625rem',
                      borderRadius: '0.5rem',
                      background: 'rgba(99, 102, 241, 0.1)',
                      color: 'var(--accent-primary)'
                    }}>
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {subject.name}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                        {getBranchLabel(subject.branch)}
                      </span>
                    </div>
                  </div>

                  <span className={`badge ${subject.difficulty === 'Advanced' ? 'badge-amber' : 'badge-indigo'}`} style={{ fontSize: '0.6875rem' }}>
                    {subject.difficulty}
                  </span>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {subject.shortDescription}
                </p>
              </div>

              <div>
                {/* Progress bar */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.375rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>
                      Topics: {subjectProgress.topicsCompleted} / {subject.topics.length}
                    </span>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
                      {subjectProgress.progress}%
                    </span>
                  </div>
                  <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--bg-dark)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${subjectProgress.progress}%`, backgroundColor: 'var(--accent-emerald)', borderRadius: '3px' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
                    Relevance: {subject.interviewRelevance}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600 }}>
                    <span>Explore Subject</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
