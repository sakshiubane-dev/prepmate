  // Section lists are selected by the resolved lesson subject.
import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, ArrowRight, CheckCircle2, Circle, Copy, Check, BookOpen,
  Clock, Target, AlertTriangle, HelpCircle, Code2, Sparkles, ChevronRight,
  List, X, Share2, Award, ExternalLink, Cpu, FileText, Download, Eye, Plus, Upload, HardDrive
} from 'lucide-react';
import { 
  getLessonForSubject, 
  getAdjacentSubjectModules, 
  getSubjectStorageKey, 
  resolveSubjectId 
} from '../../lib/data/lessons/index.js';
import { getNotesForModule, formatFileSize, downloadNoteFile } from '../../lib/services/notesStorage.js';
import NotesViewerModal from '../notes/NotesViewerModal.jsx';

const KMAP_GROUP_COLORS = [
  'rgba(99, 102, 241, 0.22)',
  'rgba(16, 185, 129, 0.22)',
  'rgba(245, 158, 11, 0.24)',
  'rgba(236, 72, 153, 0.2)'
];

function TruthTableRenderer({ tables }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {tables.map((table, tableIndex) => (
        <div key={`${table.title}-${tableIndex}`} className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.75rem' }}>{table.title}</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
            <thead>
              <tr>{table.columns.map((column, index) => <th key={index} scope="col" style={{ padding: '0.5rem 0.625rem', border: '1px solid var(--border-color)', color: 'var(--accent-primary)', textAlign: 'center', whiteSpace: 'nowrap' }}>{column}</th>)}</tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>{row.map((value, columnIndex) => <td key={columnIndex} style={{ padding: '0.45rem 0.625rem', border: '1px solid var(--border-color)', color: 'var(--text-main)', textAlign: 'center', whiteSpace: 'nowrap' }}>{value}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function KMapRenderer({ maps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {maps.map((map, mapIndex) => (
        <div key={`${map.title}-${mapIndex}`} className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.75rem' }}>{map.title}</h3>
          <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', marginBottom: '0.875rem' }}>
            <thead>
              <tr>
                <th scope="col" style={{ padding: '0.5rem', border: '1px solid var(--border-color)', color: 'var(--text-dim)' }}>{map.rowLabel} / {map.columnLabel}</th>
                {map.columnLabels.map((label, index) => <th key={index} scope="col" style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--border-color)', color: 'var(--accent-primary)', textAlign: 'center' }}>{label}</th>)}
              </tr>
            </thead>
            <tbody>
              {map.cells.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <th scope="row" style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--border-color)', color: 'var(--accent-primary)' }}>{map.rowLabels[rowIndex]}</th>
                  {row.map((cell, columnIndex) => {
                    const coveringGroups = (map.groups || []).map((group, index) => ({ group, index })).filter(({ group }) => group.cells.some(([groupRow, groupColumn]) => groupRow === rowIndex && groupColumn === columnIndex));
                    return (
                      <td key={columnIndex} style={{ minWidth: '64px', padding: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: coveringGroups.length ? KMAP_GROUP_COLORS[coveringGroups[0].index % KMAP_GROUP_COLORS.length] : 'var(--bg-dark)', color: 'var(--text-main)', textAlign: 'center' }}>
                        <div style={{ fontSize: '1rem', fontWeight: 800 }}>{cell.value}</div>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-dim)' }}>m{cell.minterm}</div>
                        {coveringGroups.length > 0 && <div style={{ fontSize: '0.625rem', color: 'var(--text-main)' }}>{coveringGroups.map(({ index }) => `G${index + 1}`).join(',')}</div>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.75rem' }}>
            {(map.groups || []).map((group, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: KMAP_GROUP_COLORS[index % KMAP_GROUP_COLORS.length], border: '1px solid var(--border-color)', flexShrink: 0 }} />
                <span>{group.label}: <strong style={{ color: 'var(--text-main)' }}>{group.term}</strong></span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{map.result}</p>
        </div>
      ))}
    </div>
  );
}

export default function LessonViewer({
  subjectId = 'dsa',
  moduleIdOrTitle,
  onClose,
  onNavigateModule,
  onToggleComplete,
  isCompleted = false,
  onOpenNotesLibrary = null
}) {
  const lesson = getLessonForSubject(subjectId, moduleIdOrTitle);
  const actualSubjectId = lesson?.subjectId || resolveSubjectId(subjectId);
  const isExtc = actualSubjectId === 'electronic_devices' || actualSubjectId === 'extc';
  const isSystemDesign = actualSubjectId === 'systemdesign';
  const isAnalogElectronics = actualSubjectId === 'analog_electronics';
  const isDigitalElectronics = actualSubjectId === 'digital_electronics';

  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('sec-objectives');
  const [showMobileTOC, setShowMobileTOC] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [completed, setCompleted] = useState(isCompleted);
  const [relatedNotes, setRelatedNotes] = useState([]);
  const [activePreviewNote, setActivePreviewNote] = useState(null);

  const containerRef = useRef(null);
  const storageKey = getSubjectStorageKey(actualSubjectId);

  // Load related notes for this module
  useEffect(() => {
    if (lesson?.id) {
      getNotesForModule(actualSubjectId, lesson.id).then(notes => {
        setRelatedNotes(notes || []);
      }).catch(err => {
        console.warn('Could not fetch related notes:', err);
      });
    }
  }, [lesson?.id, actualSubjectId]);

  // Sync completed state from props or localStorage
  useEffect(() => {
    if (lesson) {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
        setCompleted(saved.includes(lesson.id));
      } catch (e) {
        setCompleted(isCompleted);
      }
      setQuizAnswers({});
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }
  }, [lesson?.id, isCompleted, storageKey]);

  // Track scroll progress
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const total = scrollHeight - clientHeight;
      if (total > 0) {
        const pct = Math.min(100, Math.max(0, Math.round((scrollTop / total) * 100)));
        setScrollProgress(pct);
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  if (!lesson) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--bg-surface)', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
        <HelpCircle size={48} color="var(--accent-amber)" style={{ margin: '0 auto 1rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Lesson Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Could not find educational content for "{String(moduleIdOrTitle)}".
        </p>
        <button onClick={onClose} className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Return to Modules Hub</span>
        </button>
      </div>
    );
  }

  const { prev, next } = getAdjacentSubjectModules(actualSubjectId, lesson.id);

  const handleCopy = (codeText, idx) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeText);
      setCopiedCodeIdx(idx);
      setTimeout(() => setCopiedCodeIdx(null), 2000);
    }
  };

  const handleSelectQuizOption = (qIdx, optIdx) => {
    setQuizAnswers(prevAnswers => ({
      ...prevAnswers,
      [qIdx]: optIdx
    }));
  };

  const handleMarkComplete = () => {
    const nextState = !completed;
    setCompleted(nextState);

    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
      let updated;
      if (nextState) {
        updated = Array.from(new Set([...saved, lesson.id]));
      } else {
        updated = saved.filter(id => id !== lesson.id);
      }
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }

    if (onToggleComplete) {
      onToggleComplete(lesson.id, nextState);
    }
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    setShowMobileTOC(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 15 Sections for EXTC vs DSA
  const extcSections = [
    { id: 'sec-objectives', label: '1. Overview & Objectives' },
    { id: 'sec-prereq', label: '2. Prerequisites' },
    { id: 'sec-theory', label: '3. Detailed Theory & Concepts' },
    { id: 'sec-terms', label: '4. Important Definitions' },
    { id: 'sec-circuit', label: '5. Circuit Diagrams & Schematics' },
    { id: 'sec-steps', label: '6. Step-by-Step Worked Examples' },
    { id: 'sec-equations', label: '7. Equations & Formulas' },
    { id: 'sec-numerical', label: '8. Numerical Problems with Solutions' },
    { id: 'sec-applications', label: '9. Real-World Applications' },
    { id: 'sec-mistakes', label: '10. Common Mistakes' },
    { id: 'sec-viva', label: '11. Viva & Technical Questions' },
    { id: 'sec-quiz', label: '12. Practice MCQs with Explanations' },
    { id: 'sec-revision', label: '13. Quick Revision Notes' },
    { id: 'sec-notes', label: `14. Related Uploaded Notes (${relatedNotes.length})` },
    { id: 'sec-complete', label: '15. Mark as Complete' }
  ];

  const dsaSections = [
    { id: 'sec-intro', label: '1. Introduction' },
    { id: 'sec-objectives', label: '2. Objectives' },
    { id: 'sec-prereq', label: '3. Prerequisites' },
    { id: 'sec-core', label: '4. Core Concepts' },
    { id: 'sec-terms', label: '5. Terminology' },
    { id: 'sec-steps', label: '6. Step-by-Step' },
    { id: 'sec-visual', label: '7. Visual Diagram' },
    { id: 'sec-code', label: '8. Code Examples' },
    { id: 'sec-complexity', label: '9. Complexity' },
    { id: 'sec-mistakes', label: '10. Common Mistakes' },
    { id: 'sec-interview', label: '11. Interview Q&A' },
    { id: 'sec-practice', label: '12. Practice Problems' },
    { id: 'sec-revision', label: '13. Quick Revision' },
    { id: 'sec-notes', label: `14. Study Materials (${relatedNotes.length})` },
    { id: 'sec-complete', label: '15. Completion & Progress' }
  ];

  const systemDesignSections = [
    { id: 'sec-intro', label: 'Introduction' },
    { id: 'sec-objectives', label: '1. Learning Objectives' },
    { id: 'sec-prereq', label: '2. Prerequisites' },
    { id: 'sec-core', label: '3. Theory & Concepts' },
    { id: 'sec-terms', label: '4. Terminology' },
    { id: 'sec-visual', label: '5. Architecture Diagram' },
    { id: 'sec-applications', label: '6. Real-World Examples' },
    { id: 'sec-steps', label: '7. Step-by-Step Walkthrough' },
    { id: 'sec-tradeoffs', label: '8. Advantages & Trade-offs' },
    { id: 'sec-mistakes', label: '9. Pitfalls & Best Practices' },
    { id: 'sec-interview', label: '10. Interview Questions' },
    { id: 'sec-quiz', label: '11. Topic MCQs' },
    { id: 'sec-exercise', label: '12. Practical Exercise' },
    { id: 'sec-revision', label: '13. Revision Summary' },
    { id: 'sec-notes', label: `14. Study Materials (${relatedNotes.length})` },
    { id: 'sec-complete', label: '15. Completion & Navigation' }
  ];

  const analogElectronicsSections = [
    { id: 'sec-intro', label: 'Introduction' },
    { id: 'sec-objectives', label: '1. Learning Objectives' },
    { id: 'sec-prereq', label: '2. Prerequisites' },
    { id: 'sec-core', label: '3. Circuit Theory' },
    { id: 'sec-terms', label: '4. Terminology' },
    { id: 'sec-visual', label: '5. Circuit Diagram' },
    { id: 'sec-waveforms', label: '6. Input/Output Waveforms' },
    { id: 'sec-steps', label: '7. Circuit Operation' },
    { id: 'sec-equations', label: '8. Equations & Formulas' },
    { id: 'sec-numerical', label: '9. Solved Numericals' },
    { id: 'sec-applications', label: '10. Applications' },
    { id: 'sec-mistakes', label: '11. Common Mistakes' },
    { id: 'sec-troubleshooting', label: '12. Troubleshooting' },
    { id: 'sec-viva', label: '13. Interview Questions' },
    { id: 'sec-quiz', label: '14. Topic MCQs' },
    { id: 'sec-exercises', label: '15. Practice Exercises' },
    { id: 'sec-revision', label: '16. Quick Revision' },
    { id: 'sec-notes', label: `17. Study Materials (${relatedNotes.length})` },
    { id: 'sec-complete', label: '18. Completion & Navigation' }
  ];

  const digitalSectionOffset = Number(Boolean(lesson.kMaps?.length));
  const digitalElectronicsSections = [
    { id: 'sec-intro', label: 'Introduction' },
    { id: 'sec-objectives', label: '1. Learning Objectives' },
    { id: 'sec-prereq', label: '2. Prerequisites' },
    { id: 'sec-core', label: '3. Digital Theory' },
    { id: 'sec-terms', label: '4. Terminology' },
    { id: 'sec-visual', label: '5. Logic Diagram' },
    { id: 'sec-truth-tables', label: '6. Truth Tables' },
    ...(lesson.kMaps?.length ? [{ id: 'sec-kmaps', label: '7. K-Map Groupings' }] : []),
    { id: 'sec-expressions', label: `${7 + digitalSectionOffset}. Boolean Expressions` },
    { id: 'sec-steps', label: `${8 + digitalSectionOffset}. Step-by-Step` },
    { id: 'sec-equations', label: `${9 + digitalSectionOffset}. Equations & Formulas` },
    { id: 'sec-numerical', label: `${10 + digitalSectionOffset}. Worked Problems` },
    { id: 'sec-applications', label: `${11 + digitalSectionOffset}. Applications` },
    { id: 'sec-mistakes', label: `${12 + digitalSectionOffset}. Common Mistakes` },
    { id: 'sec-viva', label: `${13 + digitalSectionOffset}. Interview Questions` },
    { id: 'sec-quiz', label: `${14 + digitalSectionOffset}. Practice MCQs` },
    { id: 'sec-exercises', label: `${15 + digitalSectionOffset}. Practice Exercises` },
    { id: 'sec-revision', label: `${16 + digitalSectionOffset}. Quick Revision` },
    { id: 'sec-notes', label: `${17 + digitalSectionOffset}. Study Materials (${relatedNotes.length})` },
    { id: 'sec-complete', label: `${18 + digitalSectionOffset}. Completion & Navigation` }
  ];

  const sections = isExtc ? extcSections : isSystemDesign ? systemDesignSections : isAnalogElectronics ? analogElectronicsSections : isDigitalElectronics ? digitalElectronicsSections : dsaSections;
  const totalModulesCount = lesson.totalModules || (isExtc ? 9 : isSystemDesign ? 10 : isAnalogElectronics ? 11 : isDigitalElectronics ? 13 : 20);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--text-main)',
        minHeight: '100vh',
        overflowY: 'auto',
        scrollBehavior: 'smooth'
      }}
    >
      {/* Top Floating Reading Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          backgroundColor: 'transparent',
          zIndex: 100
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-emerald))',
            transition: 'width 0.1s linear'
          }}
        />
      </div>

      {/* Sticky Header Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-color)',
          padding: '0.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 90,
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            title="Back to Modules"
          >
            <ArrowLeft size={16} />
            <span style={{ display: 'inline-block' }}>All Modules</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-indigo" style={{ fontWeight: 700 }}>
              Module {lesson.order} of {totalModulesCount}
            </span>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              {lesson.title}
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setShowMobileTOC(!showMobileTOC)}
            className="btn btn-outline btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <List size={14} />
            <span>Table of Contents</span>
          </button>

          <button
            onClick={handleMarkComplete}
            className={`btn btn-sm ${completed ? 'btn-emerald' : 'btn-outline'}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            {completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            <span>{completed ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </header>

      {/* Main Container Layout */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', position: 'relative' }}>
        {/* Desktop Sticky Table of Contents Sidebar */}
        <aside
          style={{
            width: '270px',
            flexShrink: 0,
            padding: '2rem 1.25rem',
            position: 'sticky',
            top: '56px',
            height: 'calc(100vh - 56px)',
            overflowY: 'auto',
            borderRight: '1px solid var(--border-color)',
            display: 'block'
          }}
          className="desktop-toc"
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
            {isExtc ? 'EXTC MODULE SECTIONS' : isSystemDesign ? 'SYSTEM DESIGN SECTIONS' : isAnalogElectronics ? 'ANALOG ELECTRONICS SECTIONS' : isDigitalElectronics ? 'DIGITAL ELECTRONICS SECTIONS' : 'DSA LESSON SECTIONS'}
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {sections.map(sec => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                style={{
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '0.375rem 0.625rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.8125rem',
                  color: activeSection === sec.id ? 'var(--accent-primary)' : 'var(--text-muted)',
                  backgroundColor: activeSection === sec.id ? 'var(--bg-surface-hover)' : 'transparent',
                  fontWeight: activeSection === sec.id ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {sec.label}
              </button>
            ))}
          </nav>

          {/* Module Jump in TOC */}
          <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>
              MODULE JUMP
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {prev && (
                <button
                  onClick={() => onNavigateModule(prev.id)}
                  className="btn btn-outline btn-sm"
                  style={{ justifyContent: 'flex-start', fontSize: '0.75rem', padding: '0.375rem 0.5rem' }}
                >
                  <ArrowLeft size={12} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Prev: {prev.title}
                  </span>
                </button>
              )}
              {next && (
                <button
                  onClick={() => onNavigateModule(next.id)}
                  className="btn btn-primary btn-sm"
                  style={{ justifyContent: 'space-between', fontSize: '0.75rem', padding: '0.375rem 0.5rem' }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Next: {next.title}
                  </span>
                  <ArrowRight size={12} />
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Mobile Slide-over TOC */}
        {showMobileTOC && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              zIndex: 120,
              display: 'flex',
              justifyContent: 'flex-end'
            }}
            onClick={() => setShowMobileTOC(false)}
          >
            <div
              style={{
                width: '300px',
                backgroundColor: 'var(--bg-surface)',
                height: '100%',
                padding: '1.5rem',
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>Table of Contents</span>
                <button onClick={() => setShowMobileTOC(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {sections.map(sec => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className="btn btn-outline btn-sm"
                    style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Lesson Reading Body Content */}
        <main style={{ flex: 1, padding: '2.5rem 3rem', maxWidth: '1040px' }}>
          
          {/* Top Title Banner */}
          <div id={isSystemDesign || isDigitalElectronics ? 'sec-intro' : undefined} style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-emerald">
                {isExtc ? 'EXTC Core Track' : isSystemDesign ? 'System Design Track' : isAnalogElectronics ? 'Analog Electronics Track' : isDigitalElectronics ? 'Digital Electronics & Logic Design' : 'DSA Mastery Track'}
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={12} />
                {lesson.estimatedTime || '45 mins'} read
              </span>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              {lesson.title}
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              {lesson.introduction || (isExtc ? `Master foundational semiconductor concepts, derivations, and circuit design principles for ${lesson.title}.` : '')}
            </p>
          </div>

          {/* SECTION 1: Learning Objectives */}
          <section id="sec-objectives" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Target size={20} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                1. Learning Objectives
              </h2>
            </div>
            <div className="card" style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem' }}>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {lesson.learningObjectives?.map((obj, i) => (
                  <li key={i} style={{ fontSize: '0.9375rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* SECTION 2: Prerequisites */}
          <section id="sec-prereq" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <BookOpen size={20} color="var(--accent-indigo)" />
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                2. Prerequisites
              </h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {lesson.prerequisites?.map((prereq, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.625rem 1rem',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <CheckCircle2 size={16} color="var(--accent-emerald)" />
                  <span>{prereq}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: Detailed Theory & Core Concepts */}
          <section id={isExtc ? 'sec-theory' : 'sec-core'} style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Sparkles size={20} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {isDigitalElectronics ? '3. Digital Theory & Concepts' : '3. Detailed Theory & Engineering Concepts'}
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {(Array.isArray(lesson.theoryAndConcepts)
  ? lesson.theoryAndConcepts
  : Array.isArray(lesson.coreConcepts)
    ? lesson.coreConcepts
    : typeof lesson.coreConcepts === 'string'
      ? [{ heading: 'Core Concepts', content: lesson.coreConcepts }]
      : [] ).map((concept, i) => (
                <div key={i} className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                    {concept.heading}
                  </h3>
                  <div style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                    {concept.content}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: Important Definitions / Terminology */}
          <section id="sec-terms" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <HelpCircle size={20} color="var(--accent-amber)" />
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                4. Important Definitions & Terminology
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {(lesson.importantDefinitions || lesson.importantTerminology || []).map((t, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1rem 1.25rem',
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <span style={{ fontWeight: 800, color: 'var(--accent-primary)', display: 'block', marginBottom: '0.25rem' }}>
                    {t.term}
                  </span>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {t.definition}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: Circuit Diagrams & Visual Illustrations */}
          <section id={isExtc ? 'sec-circuit' : 'sec-visual'} style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Code2 size={20} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {isSystemDesign ? '5. Architecture Diagram' : isDigitalElectronics ? '5. Logic Diagram / Representation' : '5. Circuit Diagrams & Labelled Schematics'}
              </h2>
            </div>
            <pre
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                lineHeight: 1.6,
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-main)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border-color)',
                overflowX: 'auto'
              }}
            >
              {lesson.circuitDiagram || lesson.visualExample}
            </pre>
            {isDigitalElectronics && <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', margin: '0.5rem 0 0' }}>Static logic diagrams are provided; interactive simulation is not implemented.</p>}
          </section>

          {isDigitalElectronics && lesson.truthTables?.length > 0 && (
            <section id="sec-truth-tables" style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>6. Truth Tables</h2>
              <TruthTableRenderer tables={lesson.truthTables} />
            </section>
          )}

          {isDigitalElectronics && lesson.kMaps?.length > 0 && (
            <section id="sec-kmaps" style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>7. K-Map Examples & Groupings</h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Rows and columns use Gray-code order. Highlighted cells belong to valid adjacent power-of-two groups; edge groups wrap around.</p>
              <KMapRenderer maps={lesson.kMaps} />
            </section>
          )}

          {isDigitalElectronics && lesson.booleanExpressions?.length > 0 && (
            <section id="sec-expressions" style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>{7 + digitalSectionOffset}. Boolean Expressions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {lesson.booleanExpressions.map((item, index) => (
                  <div key={index} className="card" style={{ padding: '1rem 1.25rem', backgroundColor: 'var(--bg-surface)' }}>
                    <code style={{ display: 'block', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', marginBottom: '0.5rem' }}>{item.expression}</code>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {isAnalogElectronics && lesson.inputOutputWaveforms?.length > 0 && (
            <section id="sec-waveforms" style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Code2 size={20} color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>6. Input & Output Waveforms</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
                {lesson.inputOutputWaveforms.map((waveform, index) => (
                  <div key={index} className="card" style={{ padding: '1rem 1.25rem', backgroundColor: 'var(--bg-surface)' }}>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.5rem' }}>{waveform.label}</h3>
                    {waveform.waveform && <pre style={{ overflowX: 'auto', padding: '0.75rem', borderRadius: '0.375rem', backgroundColor: 'var(--bg-dark)', color: 'var(--text-main)', fontSize: '0.75rem', lineHeight: 1.5 }}>{waveform.waveform}</pre>}
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, whiteSpace: 'pre-line', margin: 0 }}>{waveform.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {isSystemDesign && (
            <section id="sec-applications" style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <ExternalLink size={20} color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>6. Real-World Engineering Examples</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                {(lesson.realWorldExamples || []).map((example, index) => (
                  <div key={index} className="card" style={{ padding: '1rem 1.25rem', backgroundColor: 'var(--bg-surface)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.5rem' }}>{example.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{example.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 7: Step-by-Step Worked Examples */}
          <section id="sec-steps" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <ChevronRight size={20} color="var(--accent-emerald)" />
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {isAnalogElectronics ? '7. Circuit Operation: Step-by-Step' : isDigitalElectronics ? `${8 + digitalSectionOffset}. Step-by-Step Explanations` : '6. Step-by-Step Worked Walkthroughs'}
              </h2>
            </div>
            {(lesson.stepByStepExamples || []).map((ex, idx) => (
              <div key={idx} className="card" style={{ marginBottom: '1rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
                  {ex.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {ex.steps.map((st, stepIdx) => (
                    <div key={stepIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      <span
                        style={{
                          backgroundColor: 'var(--bg-dark)',
                          color: 'var(--accent-primary)',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          flexShrink: 0
                        }}
                      >
                        {stepIdx + 1}
                      </span>
                      <span style={{ lineHeight: 1.6, paddingTop: '1px', color: 'var(--text-main)' }}>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {isSystemDesign && (
            <section id="sec-tradeoffs" style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <AlertTriangle size={20} color="var(--accent-amber)" />
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>8. Advantages, Disadvantages & Trade-offs</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                {[
                  { title: 'Advantages', items: lesson.designTradeoffs?.advantages, color: 'var(--accent-emerald)' },
                  { title: 'Disadvantages', items: lesson.designTradeoffs?.disadvantages, color: '#f87171' },
                  { title: 'Design trade-offs', items: lesson.designTradeoffs?.tradeoffs, color: 'var(--accent-primary)' }
                ].map(group => (
                  <div key={group.title} className="card" style={{ padding: '1rem 1.25rem', backgroundColor: 'var(--bg-surface)' }}>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: group.color, margin: '0 0 0.625rem' }}>{group.title}</h3>
                    <ul style={{ margin: 0, paddingLeft: '1.125rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {(group.items || []).map((item, index) => <li key={index} style={{ fontSize: '0.8125rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 7: Important Equations & Formulas (or Code for DSA) */}
          {isExtc || isAnalogElectronics || isDigitalElectronics ? (
            <section id="sec-equations" style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Cpu size={20} color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {isAnalogElectronics ? '8. Important Equations & Formulas' : isDigitalElectronics ? `${9 + digitalSectionOffset}. Equations & Formulas` : '7. Important Equations & Formulas'}
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.75rem' }}>
                {(lesson.importantEquations || []).map((eq, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '1.25rem',
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9375rem',
                        fontWeight: 700,
                        color: 'var(--accent-emerald)',
                        marginBottom: '0.375rem',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: 'var(--bg-dark)',
                        borderRadius: '0.375rem'
                      }}
                    >
                      {eq.equation}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      {eq.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section id="sec-code" style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code2 size={20} color="var(--accent-primary)" />
                  <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    8. Complete Code Implementations
                  </h2>
                </div>
                <div style={{ display: 'flex', backgroundColor: 'var(--bg-surface)', borderRadius: '0.5rem', padding: '0.25rem', border: '1px solid var(--border-color)' }}>
                  {[
                    { id: 'javascript', label: 'JavaScript' },
                    { id: 'python', label: 'Python' },
                    { id: 'java', label: 'Java' },
                    { id: 'cpp', label: 'C++' }
                  ].map(lang => (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLanguage(lang.id)}
                      style={{
                        padding: '0.375rem 0.75rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        background: selectedLanguage === lang.id ? 'var(--accent-primary)' : 'transparent',
                        color: selectedLanguage === lang.id ? '#ffffff' : 'var(--text-dim)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {(lesson.codeExamples || []).map((ex, idx) => {
                const codeString = ex[selectedLanguage] || ex.javascript;
                return (
                  <div key={idx} className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.875rem 1.25rem', backgroundColor: 'var(--bg-surface-hover)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9375rem' }}>{ex.title}</span>
                      <button onClick={() => handleCopy(codeString, idx)} className="btn btn-secondary btn-sm" style={{ padding: '0.25rem 0.625rem' }}>
                        {copiedCodeIdx === idx ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                        <span>{copiedCodeIdx === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre style={{ margin: 0, padding: '1.25rem', backgroundColor: '#090d16', color: '#f8fafc', fontSize: '0.8125rem', lineHeight: 1.6, overflowX: 'auto' }}>
                      {codeString}
                    </pre>
                  </div>
                );
              })}
            </section>
          )}

          {/* SECTION 8: Numerical Problems with Step-by-Step Solutions (EXTC) */}
          {(isExtc || isAnalogElectronics || isDigitalElectronics) && (
            <section id="sec-numerical" style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Cpu size={20} color="var(--accent-emerald)" />
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {isAnalogElectronics ? '9. Solved Numerical Problems' : isDigitalElectronics ? `${10 + digitalSectionOffset}. Worked Problems` : '8. Numerical Problems with Solutions'}
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {(lesson.numericalProblems || []).map((num, i) => (
                  <div key={i} className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span className="badge badge-emerald" style={{ flexShrink: 0 }}>Problem {i + 1}</span>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-main)', margin: 0, lineHeight: 1.5 }}>
                        {num.problem}
                      </h4>
                    </div>
                    <div
                      style={{
                        padding: '1.25rem',
                        backgroundColor: 'var(--bg-dark)',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.7,
                        whiteSpace: 'pre-line',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>
                        Step-by-Step Solution:
                      </strong>
                      {num.solution}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 9: Real-World Applications */}
          {(isExtc || isAnalogElectronics || isDigitalElectronics) && (
            <section id="sec-applications" style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <ExternalLink size={20} color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {isAnalogElectronics ? '10. Practical Applications' : isDigitalElectronics ? `${11 + digitalSectionOffset}. Practical Applications` : '9. Real-World Engineering Applications'}
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                {(lesson.applications || []).map((app, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '1rem 1.25rem',
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--text-main)',
                      lineHeight: 1.5
                    }}
                  >
                    <Sparkles size={16} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 10: Common Mistakes */}
          <section id="sec-mistakes" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <AlertTriangle size={20} color="var(--accent-amber)" />
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {isAnalogElectronics ? '11. Common Mistakes' : isDigitalElectronics ? `${12 + digitalSectionOffset}. Common Mistakes & Design Checks` : '10. Common Mistakes & Pitfalls'}
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {(lesson.commonMistakes || []).map((mst, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1rem 1.25rem',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    fontSize: '0.875rem',
                    color: 'var(--text-main)',
                    lineHeight: 1.6
                  }}
                >
                  <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{mst}</span>
                </div>
              ))}
            </div>
            {isSystemDesign && (
              <div style={{ marginTop: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>Best Practices</h3>
                <ul className="card" style={{ margin: 0, padding: '1.25rem 1.25rem 1.25rem 2.5rem', backgroundColor: 'var(--bg-surface)' }}>
                  {(lesson.bestPractices || []).map((practice, index) => (
                    <li key={index} style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: index === lesson.bestPractices.length - 1 ? 0 : '0.5rem' }}>{practice}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {isAnalogElectronics && lesson.troubleshooting?.length > 0 && (
            <section id="sec-troubleshooting" style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <AlertTriangle size={20} color="var(--accent-amber)" />
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>12. Troubleshooting</h2>
              </div>
              <ul className="card" style={{ margin: 0, padding: '1.25rem 1.25rem 1.25rem 2.5rem', backgroundColor: 'var(--bg-surface)' }}>
                {lesson.troubleshooting.map((item, index) => <li key={index} style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: index === lesson.troubleshooting.length - 1 ? 0 : '0.5rem' }}>{item}</li>)}
              </ul>
            </section>
          )}

          {/* SECTION 11: Viva & Technical Interview Questions */}
          <section id={isExtc ? 'sec-viva' : 'sec-interview'} style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Sparkles size={20} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {isAnalogElectronics ? '13. Technical Interview Questions' : isDigitalElectronics ? `${13 + digitalSectionOffset}. Technical Interview Questions` : '11. Viva & Technical Interview Questions'}
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(lesson.vivaQuestions || lesson.interviewQuestions || []).map((q, i) => (
                <div key={i} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span className="badge badge-indigo">Q{i + 1}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9375rem' }}>
                      {q.question || q.q}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, paddingLeft: '2.5rem' }}>
                    {q.answer || q.a || q.explanation}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 12: Practice MCQs with Explanations */}
          <section id="sec-quiz" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <HelpCircle size={20} color="var(--accent-amber)" />
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {isAnalogElectronics ? '14. Topic-Specific MCQs' : isDigitalElectronics ? `${14 + digitalSectionOffset}. Topic-Specific MCQs` : '12. Practice MCQs with Explanations'}
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {(lesson.practiceMCQs || lesson.knowledgeCheck || lesson.mcqs || []).map((mcq, qIdx) => {
                const userSelected = quizAnswers[qIdx];
                const isAnswered = userSelected !== undefined;
                const correctAnswer = mcq.correctAnswer ?? mcq.correct;
                const isCorrect = userSelected === correctAnswer;

                return (
                  <div key={qIdx} className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.875rem' }}>
                      Question {qIdx + 1}: {mcq.question}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                      {mcq.options.map((opt, optIdx) => {
                        let btnStyle = {
                          textAlign: 'left',
                          padding: '0.625rem 1rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-surface)',
                          color: 'var(--text-main)',
                          transition: 'all 0.15s ease'
                        };

                        if (isAnswered) {
                          if (optIdx === correctAnswer) {
                            btnStyle.backgroundColor = 'rgba(16, 185, 129, 0.15)';
                            btnStyle.borderColor = 'var(--accent-emerald)';
                            btnStyle.color = 'var(--accent-emerald)';
                            btnStyle.fontWeight = 700;
                          } else if (optIdx === userSelected) {
                            btnStyle.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                            btnStyle.borderColor = '#ef4444';
                            btnStyle.color = '#ef4444';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                            style={btnStyle}
                          >
                            <span style={{ fontWeight: 700, marginRight: '0.5rem' }}>
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div
                        style={{
                          padding: '0.875rem',
                          borderRadius: '0.5rem',
                          backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                          border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`,
                          fontSize: '0.8125rem',
                          color: 'var(--text-main)'
                        }}
                      >
                        <div style={{ fontWeight: 800, color: isCorrect ? 'var(--accent-emerald)' : '#ef4444', marginBottom: '0.25rem' }}>
                          {isCorrect ? 'Correct!' : 'Incorrect'}
                        </div>
                        <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          {mcq.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {isDigitalElectronics && lesson.practiceExercises?.length > 0 && (
            <section id="sec-exercises" style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>{15 + digitalSectionOffset}. Practice Questions & Solutions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {lesson.practiceExercises.map((exercise, index) => (
                  <details key={index} className="card" style={{ padding: '1rem 1.25rem', backgroundColor: 'var(--bg-surface)' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 800, color: 'var(--text-main)' }}>{exercise.title}</summary>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{exercise.prompt}</p>
                    <div style={{ padding: '0.875rem', borderRadius: '0.375rem', backgroundColor: 'var(--bg-dark)', color: 'var(--text-muted)', lineHeight: 1.6, whiteSpace: 'pre-line' }}><strong style={{ color: 'var(--accent-emerald)' }}>Solution: </strong>{exercise.solution}</div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {isAnalogElectronics && lesson.practiceExercises?.length > 0 && (
            <section id="sec-exercises" style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Target size={20} color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>15. Practice Exercises & Solutions</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {lesson.practiceExercises.map((exercise, index) => (
                  <details key={index} className="card" style={{ padding: '1rem 1.25rem', backgroundColor: 'var(--bg-surface)' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 800, color: 'var(--text-main)' }}>{exercise.title}</summary>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{exercise.prompt}</p>
                    <div style={{ padding: '0.875rem', borderRadius: '0.375rem', backgroundColor: 'var(--bg-dark)', color: 'var(--text-muted)', lineHeight: 1.6, whiteSpace: 'pre-line' }}><strong style={{ color: 'var(--accent-emerald)' }}>Solution: </strong>{exercise.solution}</div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {isSystemDesign && lesson.practicalExercise && (
            <section id="sec-exercise" style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Target size={20} color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>12. Practical System Design Exercise</h2>
              </div>
              <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.5rem' }}>{lesson.practicalExercise.title}</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{lesson.practicalExercise.prompt}</p>
                <h4 style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>Requirements</h4>
                <ul style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {(lesson.practicalExercise.requirements || []).map((item, index) => <li key={index}>{item}</li>)}
                </ul>
                <details style={{ marginTop: '1rem' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--accent-primary)' }}>Hints</summary>
                  <ul style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {(lesson.practicalExercise.hints || []).map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </details>
                <details style={{ marginTop: '0.75rem' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--accent-emerald)' }}>Suggested solution</summary>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{lesson.practicalExercise.suggestedSolution}</p>
                </details>
              </div>
            </section>
          )}

          {/* SECTION 13: Quick Revision Notes */}
          <section id="sec-revision" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <CheckCircle2 size={20} color="var(--accent-emerald)" />
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {isAnalogElectronics ? '16. Quick Revision Notes' : isDigitalElectronics ? `${16 + digitalSectionOffset}. Quick Revision Notes` : '13. Quick Revision Cheat-Sheet'}
              </h2>
            </div>
            <div className="card" style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem' }}>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(lesson.revisionSummary || lesson.quickRevisionNotes || []).map((note, i) => (
                  <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* SECTION 14: Study Materials & College Notes */}
          <section id="sec-notes" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  {isAnalogElectronics ? '17. Study Materials & College Notes' : isDigitalElectronics ? `${17 + digitalSectionOffset}. Study Materials & College Notes` : '14. Study Materials & College Notes'} ({relatedNotes.length})
                </h2>
              </div>

              {onOpenNotesLibrary && (
                <button 
                  onClick={() => onOpenNotesLibrary(lesson.title)}
                  className="btn btn-outline btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
                >
                  <Upload size={14} />
                  <span>Upload / Manage Notes</span>
                </button>
              )}
            </div>

            {/* Educational Disclaimer distinguishing College Notes from platform theory */}
            <div style={{
              padding: '0.875rem 1rem',
              backgroundColor: 'rgba(124, 58, 237, 0.06)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              marginBottom: '1.25rem',
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem'
            }}>
              <Sparkles size={16} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
              <span>
                <strong>College-Provided Study Materials:</strong> The documents below are uploaded by authorized faculty and mentors specifically for this module. You can preview them directly in-browser or download them for offline exam revision.
              </span>
            </div>

            {relatedNotes.length === 0 ? (
              <div 
                className="card"
                style={{
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px dashed var(--border-color)'
                }}
              >
                <FileText size={40} color="var(--text-dim)" style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
                <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  No notes uploaded yet.
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 1.25rem', lineHeight: 1.5 }}>
                  Study materials will appear here when your instructor uploads them.
                </p>
                {onOpenNotesLibrary && (
                  <button 
                    onClick={() => onOpenNotesLibrary(lesson.title)}
                    className="btn btn-primary btn-sm"
                    style={{ margin: '0 auto', gap: '0.35rem' }}
                  >
                    <Plus size={14} />
                    <span>Upload Notes for this Module</span>
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
                {relatedNotes.map(note => {
                  const ext = (note.fileExtension || note.originalFileName?.split('.').pop() || 'pdf').toUpperCase();
                  const isPdf = ext === 'PDF';
                  const isPres = ['PPT', 'PPTX'].includes(ext);
                  const isWord = ['DOC', 'DOCX'].includes(ext);

                  return (
                    <div 
                      key={note.id}
                      className="card"
                      style={{
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem' }}>
                          <span className="badge badge-indigo" style={{ fontSize: '0.625rem' }}>
                            {note.materialType || 'College Notes'}
                          </span>
                          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-dim)' }}>
                            {ext} • {note.formattedSize || formatFileSize(note.fileSize)}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', marginBottom: '0.5rem' }}>
                          <FileText size={18} color={isPdf ? '#ef4444' : isPres ? '#f97316' : isWord ? '#3b82f6' : 'var(--accent-primary)'} style={{ flexShrink: 0, marginTop: '2px' }} />
                          <h4 
                            style={{ 
                              fontSize: '0.9375rem', 
                              fontWeight: 700, 
                              color: 'var(--text-main)', 
                              margin: 0,
                              lineHeight: 1.4
                            }} 
                            title={note.title || note.fileName}
                          >
                            {note.title || note.fileName}
                          </h4>
                        </div>

                        {note.description && (
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '0.75rem' }}>
                            {note.description}
                          </p>
                        )}

                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
                          <span>Uploaded {new Date(note.uploadDate).toLocaleDateString()}</span>
                          {note.uploader?.name && <span> • By {note.uploader.name}</span>}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                        <button 
                          onClick={() => setActivePreviewNote(note)}
                          className="btn btn-outline btn-sm"
                          style={{ flex: 1, justifyContent: 'center', gap: '0.35rem', fontSize: '0.75rem', padding: '0.35rem 0.5rem' }}
                        >
                          <Eye size={13} />
                          <span>Preview Note</span>
                        </button>
                        <button 
                          onClick={() => downloadNoteFile(note)}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '0.35rem 0.65rem', gap: '0.35rem', fontSize: '0.75rem' }}
                          title="Download document"
                        >
                          <Download size={13} />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* SECTION 15: Completion & Navigation Footer */}
          <section id="sec-complete" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid var(--border-color)' }}>
            <div
              className="card"
              style={{
                textAlign: 'center',
                padding: '2.5rem',
                backgroundColor: completed ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-surface)',
                border: completed ? '1px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                marginBottom: '2rem'
              }}
            >
              <Award size={48} color={completed ? 'var(--accent-emerald)' : 'var(--accent-primary)'} style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {completed ? 'Module Completed!' : 'Finished this lesson?'}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                {completed
                  ? 'Your progress has been recorded in your local engineering transcript. You have mastered the core principles, derivations, and formulas of this module!'
                  : 'Mark this module as complete to record your learning progress and update your readiness metrics.'}
              </p>

              <button
                onClick={handleMarkComplete}
                className={`btn btn-lg ${completed ? 'btn-emerald' : 'btn-primary'}`}
                style={{ margin: '0 auto', gap: '0.5rem' }}
              >
                {completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                <span>{completed ? 'Completed (Click to Unmark)' : 'Mark Module as Complete'}</span>
              </button>
            </div>

            {/* Bottom Prev / Next Module Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              {prev ? (
                <button
                  onClick={() => onNavigateModule(prev.id)}
                  className="btn btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem' }}
                >
                  <ArrowLeft size={16} />
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', display: 'block' }}>PREVIOUS MODULE</span>
                    <span style={{ fontWeight: 700 }}>{prev.title}</span>
                  </div>
                </button>
              ) : <div />}

              {next ? (
                <button
                  onClick={() => onNavigateModule(next.id)}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)', display: 'block' }}>NEXT MODULE</span>
                    <span style={{ fontWeight: 700 }}>{next.title}</span>
                  </div>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="btn btn-emerald"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <CheckCircle2 size={16} />
                  <span>Return to Subjects Hub</span>
                </button>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Note Previewer Modal */}
      {activePreviewNote && (
        <NotesViewerModal 
          note={activePreviewNote}
          onClose={() => setActivePreviewNote(null)}
          onNoteUpdated={() => {
            getNotesForModule(actualSubjectId, lesson.id).then(notes => setRelatedNotes(notes || []));
          }}
          onNoteDeleted={() => {
            getNotesForModule(actualSubjectId, lesson.id).then(notes => setRelatedNotes(notes || []));
          }}
        />
      )}
    </div>
  );
}
