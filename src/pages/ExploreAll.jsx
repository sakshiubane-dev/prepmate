import React, { useState } from 'react';
import { ALL_SUBJECTS } from '../lib/data/subjects.js';
import { ENGINEERING_BRANCHES } from '../lib/config/engineeringBranches.js';
import { Compass, Search, Filter, ArrowRight, Layers } from 'lucide-react';

export default function ExploreAll({ onSelectSubject }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('ALL');

  const filteredSubjects = ALL_SUBJECTS.filter(s => {
    const matchesBranch = selectedBranch === 'ALL' || s.branch === selectedBranch;
    const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesBranch && matchesQuery;
  });

  return (
    <div style={{ padding: '2.5rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <Compass size={24} color="var(--accent-primary)" />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Explore All Engineering Subjects
          </h1>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Discover and study core topics outside your primary stream across all engineering disciplines.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <button
          onClick={() => setSelectedBranch('ALL')}
          className={`btn btn-sm ${selectedBranch === 'ALL' ? 'btn-primary' : 'btn-outline'}`}
        >
          All Engineering Branches ({ALL_SUBJECTS.length})
        </button>
        {ENGINEERING_BRANCHES.map(b => (
          <button
            key={b.id}
            onClick={() => setSelectedBranch(b.id)}
            className={`btn btn-sm ${selectedBranch === b.id ? 'btn-emerald' : 'btn-outline'}`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
        <input
          type="text"
          placeholder="Search any subject or topic (e.g. MOSFET, Thermodynamics, SQL, PCR, Aerodynamics, EV)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.875rem 1rem 0.875rem 2.75rem',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            fontSize: '0.9375rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {filteredSubjects.map(subject => (
          <div 
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
                <span className="badge badge-indigo">{subject.branch.toUpperCase()}</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                {subject.shortDescription}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
                {subject.topics?.length || 10} Core Topics
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-primary)', fontSize: '0.8125rem', fontWeight: 600 }}>
                <span>Open Subject</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
