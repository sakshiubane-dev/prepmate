import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Building2, Code2, ShieldCheck, Laptop, Cpu, Settings as GearIcon, Building, Dna, Briefcase } from 'lucide-react';
import { ENGINEERING_BRANCHES, CAREER_TARGETS_BY_BRANCH } from '../lib/config/engineeringBranches.js';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    branch: "cs",
    careerTrack: "software",
    targetRole: "Full Stack Developer",
    experienceLevel: "Fresher / Early-Career (0-1 yrs)",
    stack: ["JavaScript", "React", "Node.js", "SQL"],
    targetCompanies: ["Google", "Amazon", "Microsoft", "TCS Digital"],
    timeline: "Next 30 Days"
  });

  const getBranchIcon = (iconName) => {
    switch(iconName) {
      case 'Laptop': return <Laptop size={24} />;
      case 'Cpu': return <Cpu size={24} />;
      case 'Settings': return <GearIcon size={24} />;
      case 'Building': return <Building size={24} />;
      case 'Dna': return <Dna size={24} />;
      default: return <Briefcase size={24} />;
    }
  };

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
              {step === 1 ? 'Engineering Track & Goal' : step === 2 ? 'Tech Stack & Target Companies' : 'Interview Timeline & Goals'}
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
            PrepMate Setup Wizard
          </span>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Select your Engineering Branch
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Choose your core domain so we can personalize your readiness benchmark and technical roadmaps.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {ENGINEERING_BRANCHES.map(b => {
                const isSelected = formData.branch === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setFormData({ ...formData, branch: b.id })}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '1.25rem 0.75rem',
                      borderRadius: '0.75rem',
                      border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-dark)',
                      color: isSelected ? '#fff' : 'var(--text-muted)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-dim)' }}>
                      {getBranchIcon(b.icon)}
                    </div>
                    <span style={{ fontSize: '0.8125rem', fontWeight: isSelected ? 700 : 500, textAlign: 'center' }}>
                      {b.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
              What are you preparing for?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.625rem', marginBottom: '1.5rem' }}>
              {(CAREER_TARGETS_BY_BRANCH[formData.branch] || CAREER_TARGETS_BY_BRANCH['cs']).map(track => (
                <button
                  key={track.id}
                  onClick={() => setFormData({ ...formData, careerTrack: track.id })}
                  className={`btn ${formData.careerTrack === track.id ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'flex-start', textAlign: 'left', fontSize: '0.8125rem' }}
                >
                  {track.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
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
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
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
