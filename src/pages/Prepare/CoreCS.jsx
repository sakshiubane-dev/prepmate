import React, { useState } from 'react';
import { Layers, Database, Cpu, Globe, Code2, ArrowRight } from 'lucide-react';

export default function CoreCS() {
  const subjects = [
    {
      id: 'dbms',
      title: 'Database Management Systems (DBMS)',
      icon: Database,
      color: '#10b981',
      topics: [
        { q: "What are ACID properties in Relational Databases?", a: "Atomicity (all or nothing), Consistency (preserves rules), Isolation (concurrent transactions execute independently), Durability (persisted after commit)." },
        { q: "Difference between B-Tree Indexing and Hash Indexing?", a: "B-Tree supports range queries O(log N). Hash indexing supports exact match lookups O(1) but cannot handle range operators (<, >)." }
      ]
    },
    {
      id: 'os',
      title: 'Operating Systems (OS)',
      icon: Cpu,
      color: '#06b6d4',
      topics: [
        { q: "What are the four necessary conditions for Deadlock?", a: "1. Mutual Exclusion 2. Hold and Wait 3. No Preemption 4. Circular Wait." },
        { q: "Process vs Thread memory sharing?", a: "Processes have isolated virtual address spaces. Threads within the same process share code, data, and heap, but maintain separate call stacks." }
      ]
    },
    {
      id: 'cn',
      title: 'Computer Networks (CN)',
      icon: Globe,
      color: '#8b5cf6',
      topics: [
        { q: "What happens during a 3-Way TCP Handshake?", a: "Client sends SYN -> Server responds with SYN-ACK -> Client replies with ACK, establishing reliable connection." }
      ]
    }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <Layers size={24} color="var(--accent-primary)" />
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Core Computer Science Subject Suites
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {subjects.map((sub) => {
          const Icon = sub.icon;
          return (
            <div key={sub.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Icon size={20} color={sub.color} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {sub.title}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sub.topics.map((t, idx) => (
                  <div key={idx} style={{ padding: '1rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      Q: {t.q}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {t.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
