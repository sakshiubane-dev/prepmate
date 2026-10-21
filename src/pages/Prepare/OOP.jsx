import React from 'react';
import { Box } from 'lucide-react';

export default function OOP() {
  const topics = [
    { q: "What is Encapsulation?", a: "The bundling of data and methods that operate on that data within a single unit or object, restricting direct access to some of the object's components." },
    { q: "Explain Polymorphism.", a: "The ability of different classes to be treated as instances of the same class through inheritance. It allows methods to do different things based on the object it is acting upon." },
    { q: "What is Inheritance?", a: "A mechanism wherein a new class is derived from an existing class, inheriting its attributes and methods." },
    { q: "What is Abstraction?", a: "Hiding complex implementation details and showing only the essential features of the object." }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <Box size={24} color="#f59e0b" />
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Object-Oriented Programming (OOP)
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
