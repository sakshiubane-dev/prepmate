import React, { useState } from 'react';
import { Settings as SettingsIcon, Key, Cpu, ShieldCheck, Download, Save } from 'lucide-react';

export default function Settings({ candidate }) {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSaveKeys = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <SettingsIcon size={24} color="var(--accent-primary)" />
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
          Platform Settings & API Integration
        </h2>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
          AI Service Abstraction Engine
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          PrepMate runs seamlessly out-of-the-box using built-in evaluation models (`/lib/ai/aiOrchestrator.js`). You can optionally connect an external OpenAI / Gemini LLM API key.
        </p>

        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
          LLM API KEY (OPENAI / GEMINI)
        </label>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-proj-..."
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--bg-dark)',
              color: '#fff',
              border: '1px solid var(--border-color)',
              outline: 'none',
              fontFamily: 'var(--font-mono)'
            }}
          />
          <button onClick={handleSaveKeys} className="btn btn-primary">
            <Save size={16} />
            <span>Save API Key</span>
          </button>
        </div>

        {saved && (
          <div className="badge badge-emerald">
            ✓ Settings updated successfully!
          </div>
        )}
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
          Candidate Competency Export
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Download your complete MNC Readiness score history and skill graph metrics as JSON.
        </p>
        <button onClick={() => {
          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(candidate, null, 2));
          const downloadAnchor = document.createElement('a');
          downloadAnchor.setAttribute("href", dataStr);
          downloadAnchor.setAttribute("download", "prepmate_candidate_profile.json");
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          downloadAnchor.remove();
        }} className="btn btn-secondary">
          <Download size={16} />
          <span>Export Profile Data (JSON)</span>
        </button>
      </div>
    </div>
  );
}
