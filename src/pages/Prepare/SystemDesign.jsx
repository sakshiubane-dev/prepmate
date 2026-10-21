import React, { useState } from 'react';
import { Compass, Plus, Server, Database, Cpu, Layers, Sparkles, AlertTriangle, CheckCircle2, ArrowRight, X, ChevronRight, ChevronLeft, Info } from 'lucide-react';
import { aiOrchestrator } from '../../lib/ai/aiOrchestrator';

export default function SystemDesign() {
  const [nodes, setNodes] = useState([
    { id: 'n1', type: 'Client', label: 'Web / Mobile Clients', x: 50, y: 100, color: '#6366f1' },
    { id: 'n2', type: 'Load Balancer', label: 'NGINX Load Balancer', x: 220, y: 100, color: '#06b6d4' },
    { id: 'n3', type: 'API Service', label: 'Node.js Microservices', x: 400, y: 100, color: '#8b5cf6' },
    { id: 'n4', type: 'Cache', label: 'Redis Cluster (In-Memory)', x: 400, y: 220, color: '#f59e0b' },
    { id: 'n5', type: 'Database', label: 'PostgreSQL Primary DB', x: 600, y: 100, color: '#10b981' }
  ]);

  const [aiEvaluation, setAiEvaluation] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState("URL Shortener (TinyURL)");
  const [showTools, setShowTools] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const componentPalette = [
    { type: 'Client', label: 'Web / Mobile Client', color: '#6366f1' },
    { type: 'Load Balancer', label: 'API Gateway / LB', color: '#06b6d4' },
    { type: 'API Service', label: 'Backend Microservice', color: '#8b5cf6' },
    { type: 'Cache', label: 'Redis / Memcached', color: '#f59e0b' },
    { type: 'Database', label: 'PostgreSQL / Mongo DB', color: '#10b981' },
    { type: 'Queue', label: 'Kafka / RabbitMQ', color: '#f43f5e' }
  ];

  const handleAddNode = (comp) => {
    const newNode = {
      id: `n_${Date.now()}`,
      type: comp.type,
      label: comp.label,
      x: 300 + Math.random() * 100,
      y: 150 + Math.random() * 100,
      color: comp.color
    };
    setNodes([...nodes, newNode]);
  };

  const handleEvaluateArchitecture = async () => {
    setEvaluating(true);
    setAiEvaluation(null);

    const architectureSummary = nodes.map(n => n.type).join(', ');
    const res = await aiOrchestrator.evaluateAnswer({
      type: 'SYSTEM_DESIGN',
      question: `Design a scalable ${selectedScenario}`,
      answer: `My architecture consists of: ${architectureSummary}. Caching is configured with Redis and PostgreSQL primary database.`
    });

    setEvaluating(false);
    setAiEvaluation(res);
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1600px', margin: '0 auto', height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Compass size={24} color="var(--accent-violet)" />
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              System Design & Architecture Canvas
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Construct distributed system topologies and receive instant AI scalability feedback.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <select
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--bg-surface-hover)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}
          >
            <option value="URL Shortener (TinyURL)">Design URL Shortener (TinyURL)</option>
            <option value="Notification System">Design High-Throughput Notification Service</option>
            <option value="Rate Limiter">Design Distributed API Rate Limiter</option>
            <option value="Video Streaming Platform">Design Video Streaming (YouTube/Netflix)</option>
          </select>

          <button onClick={handleEvaluateArchitecture} disabled={evaluating} className="btn btn-primary btn-sm">
            <Sparkles size={16} />
            <span>{evaluating ? 'Evaluating Architecture...' : 'Evaluate System AI'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: Palette + Canvas + AI Feedback */}
      <div style={{ display: 'grid', gridTemplateColumns: showTools ? '240px 1fr 380px' : 'auto 1fr 380px', gap: '1rem', flex: 1, minHeight: 0, transition: 'all 0.3s ease' }}>
        
        {/* Left: Component Palette (Collapsible) */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: showTools ? '1.5rem' : '1rem', width: showTools ? 'auto' : '60px', alignItems: showTools ? 'stretch' : 'center' }}>
          <button 
            onClick={() => setShowTools(!showTools)}
            className="btn btn-secondary btn-sm"
            style={{ alignSelf: showTools ? 'flex-end' : 'center', padding: '0.5rem' }}
          >
            {showTools ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>

          {showTools && (
            <>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
                ARCHITECTURAL COMPONENTS
              </span>

              {componentPalette.map((comp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddNode(comp)}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'flex-start', borderLeft: `4px solid ${comp.color}` }}
                >
                  <Plus size={14} />
                  <span>{comp.label}</span>
                </button>
              ))}

              <div style={{ marginTop: 'auto', padding: '0.75rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-violet)' }}>Pro Tip:</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                  Position Redis caching between API Services and PostgreSQL to handle read spikes.
                </p>
              </div>
            </>
          )}
          {!showTools && (
            <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', marginTop: '1rem' }}>
              TOOLS
            </div>
          )}
        </div>

        {/* Center: System Architecture Canvas */}
        <div className="card" style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', padding: '1rem' }}>
          
          {showOnboarding && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '2rem', borderRadius: '1rem', maxWidth: '400px', border: '1px solid var(--accent-violet)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Info size={24} color="var(--accent-violet)" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>Welcome to the Canvas!</h3>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Expand the tools menu on the left to add architectural components like Load Balancers, Databases, and Caches. Build your system and click <strong>Evaluate System AI</strong> for instant feedback!
                </p>
                <button onClick={() => setShowOnboarding(false)} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Got it!
                </button>
              </div>
            </div>
          )}

          <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
            <span className="badge badge-indigo">Active Scenario: {selectedScenario}</span>
          </div>

          {/* Grid Canvas Background Lines */}
          <div style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            position: 'relative'
          }}>
            {/* Component Nodes Render */}
            {nodes.map((node) => (
              <div
                key={node.id}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--bg-surface)',
                  border: `2px solid ${node.color}`,
                  borderRadius: '0.5rem',
                  boxShadow: 'var(--shadow-md)',
                  color: 'var(--text-main)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'grab'
                }}
              >
                <Server size={16} color={node.color} />
                <span>{node.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live AI System Evaluator & Follow-up Prompt */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            AI ARCHITECTURE EVALUATOR
          </span>

          {aiEvaluation ? (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Score Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'rgba(139, 92, 246, 0.12)', borderRadius: '0.5rem', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-violet)' }}>System Design Score</span>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{aiEvaluation.score}%</div>
                </div>
                <span className="badge badge-violet">Detailed Breakdown</span>
              </div>

              {/* Strengths */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', display: 'block', marginBottom: '0.375rem' }}>STRENGTHS:</span>
                {aiEvaluation.strengths.map((s, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                    <CheckCircle2 size={14} color="var(--accent-emerald)" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              {/* Bottlenecks / Weaknesses */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-rose)', display: 'block', marginBottom: '0.375rem' }}>BOTTLENECKS / RISKS:</span>
                {aiEvaluation.weaknesses.map((w, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    <AlertTriangle size={14} color="var(--accent-rose)" />
                    <span>{w}</span>
                  </div>
                ))}
              </div>

              {/* MNC Interviewer Follow-up Question */}
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', display: 'block', marginBottom: '0.375rem' }}>
                  INTERVIEWER FOLLOW-UP QUESTION:
                </span>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: 1.5 }}>
                  "{aiEvaluation.followUpQuestion}"
                </p>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-dim)' }}>
              <Compass size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
              <p style={{ fontSize: '0.875rem' }}>
                Add components to the canvas and click <strong>Evaluate System AI</strong> to receive feedback on scalability, bottlenecks, and failover strategy.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
