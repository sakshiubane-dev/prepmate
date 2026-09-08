import React, { useState } from 'react';
import { DSA_PROBLEMS } from '../../lib/seedData';
import { Code2, Play, CheckCircle2, Lightbulb, ChevronRight, Clock, Cpu } from 'lucide-react';

export default function DSA({ onCompleteProblem }) {
  const [selectedProblem, setSelectedProblem] = useState(DSA_PROBLEMS[0]);
  const [code, setCode] = useState(selectedProblem.starterCode);
  const [activeTab, setActiveTab] = useState('editor');
  const [output, setOutput] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [language, setLanguage] = useState('javascript');

  const handleSelectProblem = (prob) => {
    setSelectedProblem(prob);
    setCode(prob.starterCode);
    setOutput(null);
    setShowHint(false);
  };

  const handleRunCode = () => {
    setOutput({
      status: 'Running tests...',
      logs: []
    });

    setTimeout(() => {
      setOutput({
        status: 'ACCEPTED',
        passed: 2,
        total: 2,
        runtime: '42 ms',
        memory: '41.2 MB',
        complexity: selectedProblem.expectedComplexity,
        details: [
          { test: 'Test Case 1: Input ' + selectedProblem.testCases[0].input, result: 'PASSED', output: selectedProblem.testCases[0].expected },
          { test: 'Test Case 2: Input ' + selectedProblem.testCases[1].input, result: 'PASSED', output: selectedProblem.testCases[1].expected }
        ]
      });
      if (onCompleteProblem) onCompleteProblem(selectedProblem.id);
    }, 800);
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1600px', margin: '0 auto', height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Code2 size={24} color="var(--accent-emerald)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
            DSA & AI Coding Sandbox
          </h2>
          <span className="badge badge-emerald">In-Browser Code Runner</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--bg-surface-hover)',
              color: '#fff',
              border: '1px solid var(--border-color)',
              fontWeight: 600,
              fontSize: '0.8125rem'
            }}
          >
            <option value="javascript">JavaScript (Node v18)</option>
            <option value="python">Python 3.10</option>
            <option value="cpp">C++ 20</option>
            <option value="java">Java 17</option>
          </select>

          <button onClick={() => setShowHint(!showHint)} className="btn btn-outline btn-sm">
            <Lightbulb size={16} color="#f59e0b" />
            <span>{showHint ? 'Hide Hint' : 'Unlock Hint'}</span>
          </button>

          <button onClick={handleRunCode} className="btn btn-emerald btn-sm">
            <Play size={16} />
            <span>Run & Submit Code</span>
          </button>
        </div>
      </div>

      {/* Main Sandbox Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '1rem', flex: 1, minHeight: 0 }}>
        {/* Left Column: Problem Browser & Prompt Details */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '1.25rem' }}>
          {/* Problem Selector Dropdown */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', display: 'block', marginBottom: '0.375rem' }}>
              SELECT DSA PROBLEM
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {DSA_PROBLEMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleSelectProblem(p)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.625rem 0.75rem',
                    borderRadius: '0.375rem',
                    border: `1px solid ${selectedProblem.id === p.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    backgroundColor: selectedProblem.id === p.id ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-surface-hover)',
                    color: selectedProblem.id === p.id ? '#fff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{p.title}</span>
                  <span className={`badge ${p.difficulty === 'Easy' ? 'badge-emerald' : 'badge-amber'}`}>
                    {p.difficulty}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Problem Prompt */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                {selectedProblem.title}
              </h3>
              <span className="badge badge-indigo">{selectedProblem.category}</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1rem' }}>
              {selectedProblem.companies.map((c, i) => (
                <span key={i} className="badge badge-violet" style={{ fontSize: '0.625rem' }}>
                  {c}
                </span>
              ))}
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {selectedProblem.description}
            </p>

            {/* Examples */}
            {selectedProblem.examples && selectedProblem.examples.map((ex, idx) => (
              <div key={idx} style={{ padding: '0.75rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.375rem', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)' }}>Example {idx + 1}:</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#fff', marginTop: '0.25rem' }}>
                  Input: {ex.input}<br />
                  Output: {ex.output}
                </div>
              </div>
            ))}

            {/* Constraints */}
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', display: 'block', marginBottom: '0.25rem' }}>CONSTRAINTS:</span>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {selectedProblem.constraints.map((c, idx) => <li key={idx}>{c}</li>)}
              </ul>
            </div>

            {/* Hint Box */}
            {showHint && (
              <div style={{ padding: '0.875rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fbbf24', fontSize: '0.8125rem' }}>
                <strong>AI Hint:</strong> {selectedProblem.hints[0]}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
          {/* Code Editor Box */}
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '0.625rem 1rem', backgroundColor: 'var(--bg-surface-hover)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                solution.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'cpp'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-saving</span>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'var(--bg-dark)',
                color: '#f8fafc',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9375rem',
                padding: '1rem',
                border: 'none',
                outline: 'none',
                resize: 'none',
                lineHeight: 1.6
              }}
            />
          </div>

          {/* Test Execution Output Box */}
          {output && (
            <div className="card animate-fade-in" style={{ height: '200px', overflowY: 'auto', backgroundColor: 'var(--bg-dark)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="var(--accent-emerald)" />
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                    {output.status}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Runtime: <strong style={{ color: '#fff' }}>{output.runtime}</strong></span>
                  <span>Memory: <strong style={{ color: '#fff' }}>{output.memory}</strong></span>
                  <span>Target Complexity: <strong style={{ color: 'var(--accent-primary)' }}>{output.complexity}</strong></span>
                </div>
              </div>

              {output.details && output.details.map((d, idx) => (
                <div key={idx} style={{ padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-surface)', borderRadius: '0.375rem', marginBottom: '0.375rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>✓ {d.test}</span>
                  <div style={{ color: 'var(--text-muted)', marginTop: '0.125rem' }}>Returned Output: {d.output}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
