import React from 'react';
import { Wrench, CheckCircle2, Code2, Cpu, Zap, Settings as GearIcon, Building, Dna } from 'lucide-react';

export default function TechnicalSkills({ candidate, onNavigate }) {
  const getSkillsForBranch = (branchId) => {
    switch (branchId) {
      case 'extc':
        return [
          { name: 'Embedded C & Pointer Operations', level: 'Advanced', progress: 82, route: 'core-engineering' },
          { name: 'Microcontrollers (8051, ARM Cortex)', level: 'Proficient', progress: 75, route: 'core-engineering' },
          { name: 'Communication Protocols (UART, SPI, I2C)', level: 'Proficient', progress: 70, route: 'core-engineering' },
          { name: 'VLSI & CMOS Digital IC Design', level: 'Developing', progress: 60, route: 'core-engineering' },
          { name: 'Verilog RTL & FPGA Implementation', level: 'Developing', progress: 55, route: 'core-engineering' },
          { name: 'PCB Design & Circuit Simulation', level: 'Proficient', progress: 68, route: 'core-engineering' }
        ];
      case 'mechanical':
        return [
          { name: 'CAD / 3D Solid Modeling (SolidWorks/CATIA)', level: 'Advanced', progress: 85, route: 'core-engineering' },
          { name: 'CAM & CNC G-Code Programming', level: 'Proficient', progress: 72, route: 'core-engineering' },
          { name: 'FEA & Stress Simulation (ANSYS)', level: 'Developing', progress: 64, route: 'core-engineering' },
          { name: 'MATLAB / Simulink Dynamic Modeling', level: 'Proficient', progress: 70, route: 'core-engineering' },
          { name: 'Manufacturing Processes & Tolerancing', level: 'Advanced', progress: 80, route: 'core-engineering' },
          { name: 'Python for Mechanical Automation', level: 'Developing', progress: 58, route: 'core-engineering' }
        ];
      case 'cs':
      default:
        return [
          { name: 'Data Structures & Algorithms', level: 'Advanced', progress: 82, route: 'prepare-dsa' },
          { name: 'Object Oriented Programming', level: 'Advanced', progress: 85, route: 'prepare-oop' },
          { name: 'SQL & Database Optimization', level: 'Proficient', progress: 74, route: 'prepare-database' },
          { name: 'Web Development (React / Node.js)', level: 'Advanced', progress: 88, route: 'core-engineering' },
          { name: 'Developer Tools (Git, Linux, Docker)', level: 'Proficient', progress: 70, route: 'prepare-git' },
          { name: 'Cloud & DevOps Fundamentals', level: 'Developing', progress: 58, route: 'core-engineering' }
        ];
    }
  };

  const skills = getSkillsForBranch(candidate?.branch);

  return (
    <div style={{ padding: '2.5rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <Wrench size={24} color="var(--accent-primary)" />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Technical Skills & Tools Matrix
          </h1>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Branch-specific technical competencies required for your target engineering interviews.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {skills.map((skill, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {skill.name}
                </h3>
                <span className="badge badge-indigo">{skill.level}</span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.375rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Proficiency Score</span>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{skill.progress}%</span>
                </div>
                <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--bg-dark)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${skill.progress}%`, backgroundColor: 'var(--accent-emerald)' }} />
                </div>
              </div>
            </div>

            <button onClick={() => onNavigate(skill.route)} className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
              Practice Skill
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
