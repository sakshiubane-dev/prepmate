import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Building2, Code2, ShieldCheck } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    targetRole: "Full Stack Developer",
    experienceLevel: "Fresher / Early-Career (0-1 yrs)",
    stack: ["JavaScript", "React", "Node.js", "SQL"],
    targetCompanies: ["Google", "Amazon", "Microsoft", "TCS Digital"],
    timeline: "Next 30 Days"
  });

  const roles = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Engineer",
    "ML Engineer",
    "DevOps / Cloud Engineer"
  ];

  const experienceLevels = [
    "Student / Fresher",
    "Fresher / Early-Career (0-1 yrs)",
    "Junior Engineer (1-3 yrs)",
    "Preparing for Internal Placement / Campus Drives"
  ];

  const techStackOptions = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C++", "SQL", "MongoDB", "Docker", "AWS"];

  const companyOptions = ["Google", "Amazon", "Microsoft", "Meta", "TCS Digital", "Infosys", "Wipro", "Accenture", "Deloitte", "Uber"];

  const toggleStack = (tech) => {
    setFormData(prev => ({
      ...prev,
      stack: prev.stack.includes(tech) ? prev.stack.filter(t => t !== tech) : [...prev.stack, tech]
    }));
  };

  const toggleCompany = (comp) => {
    setFormData(prev => ({
      ...prev,
      targetCompanies: prev.targetCompanies.includes(comp) ? prev.targetCompanies.filter(c => c !== comp) : [...prev.targetCompanies, comp]
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(formData);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="card" style={{ maxWidth: '650px', width: '100%', padding: '2.5rem' }}>
        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-indigo">Step {step} of 3</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {step === 1 ? 'Target Role & Experience' : step === 2 ? 'Tech Stack & Target Companies' : 'Interview Timeline & Goals'}
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
            PrepMate Setup Wizard
          </span>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
              What position are you aiming for?
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Select your primary target role and experience level to calibrate your MNC Readiness benchmark.
            </p>

            <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
              Target Software Engineering Role
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.625rem', marginBottom: '1.5rem' }}>
              {roles.map(r => (
                <button
                  key={r}
                  onClick={() => setFormData({ ...formData, targetRole: r })}
                  className={`btn ${formData.targetRole === r ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'flex-start', textAlign: 'left', fontSize: '0.8125rem' }}
                >
                  {r}
                </button>
              ))}
            </div>

            <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
              Current Experience Level
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {experienceLevels.map(exp => (
                <button
                  key={exp}
                  onClick={() => setFormData({ ...formData, experienceLevel: exp })}
                  className={`btn ${formData.experienceLevel === exp ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'flex-start', textAlign: 'left', fontSize: '0.875rem' }}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
              Select your stack & target MNCs
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              We customize technical questions and system design scenarios based on your skills.
            </p>

            <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
              Primary Technologies
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {techStackOptions.map(tech => {
                const selected = formData.stack.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleStack(tech)}
                    className={`btn btn-sm ${selected ? 'btn-emerald' : 'btn-outline'}`}
                  >
                    {selected && <Check size={14} />}
                    <span>{tech}</span>
                  </button>
                );
              })}
            </div>

            <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
              Target Companies / Recruitment Drives
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {companyOptions.map(comp => {
                const selected = formData.targetCompanies.includes(comp);
                return (
                  <button
                    key={comp}
                    onClick={() => toggleCompany(comp)}
                    className={`btn btn-sm ${selected ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {selected && <Check size={14} />}
                    <span>{comp}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
              Interview Timeline & Preparation Goal
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              When are your upcoming MNC recruitment interviews scheduled?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {["Next 14 Days (Urgent Prep)", "Next 30 Days (Recommended)", "Next 60 Days (Comprehensive)", "Campus Placements Drive (This Semester)"].map(t => (
                <button
                  key={t}
                  onClick={() => setFormData({ ...formData, timeline: t })}
                  className={`btn ${formData.timeline === t ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'flex-start', textAlign: 'left', padding: '1rem' }}
                >
                  <ShieldCheck size={18} />
                  <span>{t}</span>
                </button>
              ))}
            </div>

            <div style={{ padding: '1rem', backgroundColor: 'rgba(99, 102, 241, 0.08)', borderRadius: '0.5rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>
                Let's build your candidate profile
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                We are generating your initial MNC Readiness baseline score and personal preparation plan...
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="btn btn-secondary">
              Back
            </button>
          ) : <div />}

          <button onClick={handleNext} className="btn btn-primary">
            <span>{step === 3 ? 'Generate My Dashboard' : 'Continue'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
