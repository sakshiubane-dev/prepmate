import React from 'react';
import { GitBranch } from 'lucide-react';

export default function GitGithub() {
  const topics = [
    { q: "What is Git vs GitHub?", a: "Git is a local version control system that tracks changes in files. GitHub is a cloud-based hosting service that lets you manage Git repositories and collaborate with others." },
    { q: "Explain git merge vs git rebase.", a: "Merge takes the contents of a source branch and integrates them with a target branch, creating a new merge commit. Rebase moves or combines a sequence of commits to a new base commit, creating a linear history without merge commits." },
    { q: "What is a Pull Request (PR)?", a: "A method of submitting contributions to an open development project. It notifies team members that you have completed a feature and requests a review before merging it into the main branch." }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <GitBranch size={24} color="#f43f5e" />
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Git & GitHub Basics
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
