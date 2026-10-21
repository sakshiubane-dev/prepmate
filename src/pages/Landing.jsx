import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Code2, 
  Layers, 
  FileText, 
  Compass, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Building2,
  Cpu
} from 'lucide-react';

export default function Landing({ onStart, onExplore }) {
  const features = [
    { icon: ShieldCheck, title: "MNC Readiness Score (0-100)", desc: "Real-time competency metric tracking your hiring probability across 10 evaluation pillars." },
    { icon: Sparkles, title: "Adaptive AI Mock Interviews", desc: "Dynamic interviewer asking follow-up questions tailored to your response, role, and stack." },
    { icon: Code2, title: "DSA Sandbox & Code Runner", desc: "In-browser algorithm editor with test case execution, complexity analysis, and hint systems." },
    { icon: Compass, title: "System Design Canvas", desc: "Drag-and-drop architecture builder evaluating load balancing, database sharding, and caching." },
    { icon: FileText, title: "ATS Resume & Job Matcher", desc: "Optimize bullet points for impact metrics and align your skills with specific MNC job postings." },
    { icon: Cpu, title: "Aptitude & Core CS Suites", desc: "Timed quantitative, logical reasoning, DBMS, OS, and networking practice tracks." }
  ];

  const companies = ["Google", "Amazon", "Microsoft", "Meta", "Infosys Digital", "TCS Digital", "Accenture", "Deloitte"];

  return (
    <div style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-main)', minHeight: '100vh' }}>
      {/* Top Navbar */}
      <nav style={{
        height: '70px',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)'
          }}>
            <img
              src="/images/prepmate-logo.png"
              alt=""
              aria-hidden="true"
              style={{ width: '34px', height: '34px', objectFit: 'contain', borderRadius: '8px' }}
            />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-main)' }}>
            PREPMATE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={onExplore} className="btn btn-secondary btn-sm">
            Explore Platform
          </button>
          <button onClick={onStart} className="btn btn-primary btn-sm">
            <span>Start Preparing</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '5rem 2rem 3rem 2rem',
        textAlign: 'center',
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative'
      }}>
        <div className="badge badge-indigo" style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem' }}>
          <Sparkles size={14} />
          <span>AI-Powered MNC Interview Preparation Platform</span>
        </div>

        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.04em',
          marginBottom: '1.5rem',
          background: 'linear-gradient(180deg, #ffffff 0%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Prepare for the interview.<br />Become the candidate they remember.
        </h1>

        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-muted)',
          maxWidth: '750px',
          margin: '0 auto 2.5rem auto',
          lineHeight: 1.6
        }}>
          End-to-end software engineering recruitment preparation — from resume ATS screening and aptitude tests to DSA code execution, system design, and 5-round MNC AI mock interviews.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={onStart} className="btn btn-primary btn-lg">
            <span>Start Preparing Free</span>
            <ArrowRight size={18} />
          </button>
          <button onClick={onExplore} className="btn btn-secondary btn-lg">
            <span>View Demo Dashboard</span>
          </button>
        </div>

        {/* Product Preview Card */}
        <div style={{
          marginTop: '4rem',
          borderRadius: '1rem',
          border: '1px solid rgba(255,255,255,0.12)',
          backgroundColor: 'var(--bg-surface)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f43f5e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                app.prepmate.ai/dashboard
              </span>
            </div>
            <span className="badge badge-emerald">Live Candidate Profile</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', textAlign: 'left' }}>
            <div className="card" style={{ background: 'rgba(255,255,255,0.02)', textAlign: 'center', padding: '2rem 1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>MNC READINESS</span>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-primary)', margin: '0.5rem 0' }}>78</div>
              <span className="badge badge-emerald">+8 pts this month</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>DSA & Algorithms</span>
                <strong style={{ color: '#34d399' }}>72% (Proficient)</strong>
              </div>
              <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: '72%', background: '#10b981' }} /></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>System Design & Architecture</span>
                <strong style={{ color: '#fbbf24' }}>51% (Needs Focus)</strong>
              </div>
              <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: '51%', background: '#f59e0b' }} /></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>HR & Behavioral STAR</span>
                <strong style={{ color: '#818cf8' }}>87% (Advanced)</strong>
              </div>
              <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: '87%', background: '#6366f1' }} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Companies */}
      <section style={{ padding: '3rem 2rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
            PREPARE FOR HIRING PATTERNS AT TOP TECH COMPANIES
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
            {companies.map((c, i) => (
              <span key={i} style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
            Everything you need in one platform
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>
            A complete AI preparation ecosystem designed specifically for software engineering candidates.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="card card-hover" style={{ textAlign: 'left' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(99,102,241,0.12)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Icon size={22} />
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '5rem 2rem',
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-dark) 100%)'
      }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
          Ready to raise your MNC Readiness Score?
        </h2>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Join thousands of software engineering candidates preparing for top product companies.
        </p>
        <button onClick={onStart} className="btn btn-primary btn-lg">
          <span>Start Preparing Now</span>
          <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
