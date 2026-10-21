export const ENGINEERING_BRANCHES = [
  { id: 'extc', label: 'EXTC / E&TC Engineering', icon: 'Cpu', shortLabel: 'EXTC' },
  { id: 'cs', label: 'Computer Science / IT', icon: 'Laptop', shortLabel: 'CS / IT' },
  { id: 'mechanical', label: 'Mechanical Engineering', icon: 'Settings', shortLabel: 'Mechanical' }
];

export const CAREER_TARGETS_BY_BRANCH = {
  cs: [
    { id: 'software', label: 'Software Engineering' },
    { id: 'frontend', label: 'Frontend Development' },
    { id: 'backend', label: 'Backend Development' },
    { id: 'fullstack', label: 'Full Stack Development' },
    { id: 'data_eng', label: 'Data Engineering' },
    { id: 'aiml', label: 'AI / ML' },
    { id: 'devops', label: 'Cloud / DevOps' },
    { id: 'cybersecurity', label: 'Cybersecurity' },
    { id: 'general', label: 'General Placement' }
  ],
  extc: [
    { id: 'embedded', label: 'Embedded Systems' },
    { id: 'vlsi', label: 'VLSI Design' },
    { id: 'electronics_design', label: 'Electronics Design' },
    { id: 'telecom', label: 'Telecommunications' },
    { id: 'dsp', label: 'Signal Processing' },
    { id: 'iot', label: 'IoT & Hardware' },
    { id: 'software', label: 'Software Engineering' },
    { id: 'general', label: 'General Placement' }
  ],
  mechanical: [
    { id: 'core_mech', label: 'Core Mechanical' },
    { id: 'design_eng', label: 'Design Engineering' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'automotive', label: 'Automotive' },
    { id: 'thermal', label: 'Thermal Engineering' },
    { id: 'cadcam', label: 'CAD / CAM' },
    { id: 'software', label: 'Software Engineering' },
    { id: 'general', label: 'General Placement' }
  ],
};

// Branch specific weights for scoring Engine
export const BRANCH_WEIGHTS = {
  cs: { dsa: 0.20, coreCs: 0.20, programming: 0.20, technical: 0.15, systemDesign: 0.10, aptitude: 0.05, communication: 0.05, hr: 0.05 },
  extc: { digitalElectronics: 0.15, signalsAndSystems: 0.15, microcontrollers: 0.15, embeddedSystems: 0.15, communication: 0.10, aptitude: 0.10, technical: 0.10, hr: 0.10 },
  mechanical: { thermodynamics: 0.15, manufacturing: 0.15, machineDesign: 0.15, som: 0.15, fluidMechanics: 0.10, aptitude: 0.10, technical: 0.10, hr: 0.10 },
  default: { technical: 0.30, aptitude: 0.20, communication: 0.20, hr: 0.20, resume: 0.10 }
};
