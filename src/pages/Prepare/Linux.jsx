import React from 'react';
import { Terminal } from 'lucide-react';

export default function Linux() {
  const topics = [
    { q: "What is a Linux Kernel?", a: "The core interface between a computer's hardware and its processes. It communicates between the two, managing resources as efficiently as possible." },
    { q: "How do you change file permissions in Linux?", a: "Using the `chmod` command. For example, `chmod 755 filename` gives read, write, execute permissions to the owner, and read/execute to group and others." },
    { q: "What is the difference between `ls -l` and `ls -a`?", a: "`ls -l` shows files in a long listing format (permissions, owner, size, date). `ls -a` lists all files including hidden files (those starting with a dot)." }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <Terminal size={24} color="#0ea5e9" />
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Linux Basics
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
