import React from 'react';
import { Database as DatabaseIcon } from 'lucide-react';

export default function Database() {
  const topics = [
    { q: "SQL vs NoSQL?", a: "SQL databases are relational, structured, and use predefined schemas (e.g., PostgreSQL, MySQL). NoSQL databases are non-relational, document/key-value oriented, with dynamic schemas (e.g., MongoDB, Redis)." },
    { q: "What is Normalization?", a: "The process of organizing data in a database to reduce redundancy and improve data integrity, typically involving dividing large tables into smaller ones." },
    { q: "What are Indexes?", a: "Data structures that improve the speed of data retrieval operations on a database table at the cost of additional space and write overhead." }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <DatabaseIcon size={24} color="#10b981" />
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Database Systems
        </h2>
      </div>

      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {topics.map((t, idx) => (
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
    </div>
  );
}
