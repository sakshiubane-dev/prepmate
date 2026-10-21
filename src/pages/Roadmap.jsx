import React from 'react';
import { Compass, CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';

export default function Roadmap({ candidate, onNavigate }) {
  const getBranchWeeks = (branchId) => {
    switch(branchId) {
      case 'extc':
        return [
          {
            week: "Week 1: Electronics Fundamentals & Digital Logic",
            status: "COMPLETED",
            tasks: [
              "BJT vs MOSFET Transistor Characteristics & Diodes",
              "Boolean Algebra, K-Maps & Logic Gates",
              "Combinational & Sequential Circuits (Flip-Flops, Counters)",
              "Aptitude: Quant & Logical Reasoning"
            ]
          },
          {
            week: "Week 2: Signals & Systems + Microcontrollers",
            status: "IN_PROGRESS",
            tasks: [
              "Fourier & Laplace Transforms in LTI Systems",
              "8085 / 8051 & ARM Microcontroller Architecture",
              "Interrupts, Timers & Memory Interfacing",
              "Embedded C Basics & Pointer Management"
            ]
          },
          {
            week: "Week 3: Embedded Protocols & VLSI Fundamentals",
            status: "UPCOMING",
            tasks: [
              "UART, SPI, I2C Communication Protocols",
              "CMOS Inverter Static & Dynamic Power Dissipation",
              "Open-Loop & Closed-Loop Control System Stability",
              "Mock AI Technical Interview: EXTC Core"
            ]
          },
          {
            week: "Week 4: Final Placement Drive & Mixed Simulation",
            status: "UPCOMING",
            tasks: [
              "Full Core EXTC & Software Mixed Mock",
              "Weak-Topic Targeted Revision (Signals/VLSI)",
              "Resume Alignment for Core/Software Roles",
              "Recruitment Drive Ready Checklist"
            ]
          }
        ];
      case 'mechanical':
        return [
          {
            week: "Week 1: Engineering Mechanics & SOM",
            status: "COMPLETED",
            tasks: [
              "Force Systems, Equilibrium & Moment of Inertia",
              "Stress, Strain & Shear Force / Bending Moment",
              "Deflection of Beams & Column Failure Theories",
              "Aptitude: Quant & Spatial Reasoning"
            ]
          },
          {
            week: "Week 2: Thermodynamics & Fluid Mechanics",
            status: "IN_PROGRESS",
            tasks: [
              "First & Second Laws of Thermodynamics & Cycles",
              "Fluid Statics, Continuity & Bernoulli Equation",
              "Pipe Flow & Hydraulic Turbines / Pumps",
              "Heat Conduction & Convection Resistance"
            ]
          },
          {
            week: "Week 3: Theory of Machines & Machine Design",
            status: "UPCOMING",
            tasks: [
              "Mechanisms, Gears & Velocity Analysis",
              "Shaft & Bearing Design against Fatigue",
              "CAD/CAM 3D Modeling Fundamentals",
              "Mock AI Technical Interview: Mechanical Core"
            ]
          },
          {
            week: "Week 4: Manufacturing & Final Simulation",
            status: "UPCOMING",
            tasks: [
              "Casting, Welding & CNC Machining",
              "Full Core Mechanical Mock Interview",
              "Resume Alignment for Design & Manufacturing",
              "Recruitment Drive Ready Checklist"
            ]
          }
        ];
      case 'cs':
      default:
        return [
          {
            week: "Week 1: Foundations & Core CS",
            status: "COMPLETED",
            tasks: [
              "Master Arrays, Hashing & String Manipulation",
              "Review DBMS Indexing, ACID & Normalization",
              "Aptitude: Quant Percentages & Work/Time",
              "ATS Resume optimization with bullet metrics"
            ]
          },
          {
            week: "Week 2: Advanced Data Structures & Tech Depth",
            status: "IN_PROGRESS",
            tasks: [
              "Binary Trees, Graphs & Recursion/DP",
              "Operating System Concurrency & Process Scheduling",
              "React Virtual DOM & Node.js Event Loop Mock",
              "STAR Method Behavioral Story Drafting"
            ]
          },
          {
            week: "Week 3: System Design & Mock Interviews",
            status: "UPCOMING",
            tasks: [
              "Distributed Caching (Redis) & Load Balancing",
              "Database Sharding & Read Replicas Canvas",
              "Full AI Technical & Coding Mock Interviews",
              "Company Tracks: Amazon LP & Google Coding"
            ]
          },
          {
            week: "Week 4: Full MNC 5-Round Simulation & Polish",
            status: "UPCOMING",
            tasks: [
              "Attempt 5-Round Full MNC Pipeline",
              "Weak-Topic Targeted Revision",
              "Final Resume Job Matcher alignment",
              "Recruitment Drive Ready Checklist"
            ]
          }
        ];
    }
  };

  const weeks = getBranchWeeks(candidate?.branch);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Compass size={24} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Your Personalized 30-Day Interview Roadmap
            </h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Adapts automatically based on your weakest competency scores.
          </p>
        </div>

        <span className="badge badge-emerald">Week 2 Active</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {weeks.map((w, idx) => (
          <div key={idx} className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {w.week}
              </h3>
              <span className={`badge ${w.status === 'COMPLETED' ? 'badge-emerald' : w.status === 'IN_PROGRESS' ? 'badge-indigo' : 'badge-amber'}`}>
                {w.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {w.tasks.map((t, tIdx) => (
                <div key={tIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                  {w.status === 'COMPLETED' ? <CheckCircle2 size={16} color="var(--accent-emerald)" /> : <Circle size={16} color="var(--text-dim)" />}
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
