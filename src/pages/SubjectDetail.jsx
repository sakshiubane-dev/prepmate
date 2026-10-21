import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, BookOpen, CheckCircle2, Clock, Sparkles, BrainCircuit, Target, 
  Award, PlayCircle, BarChart3, HelpCircle, Check, Circle, FileText, Download, 
  Eye, FolderOpen, Upload, Presentation, FileSpreadsheet, HardDrive, Calendar
} from 'lucide-react';
import LessonViewer from '../components/lessons/LessonViewer.jsx';
import NotesViewerModal from '../components/notes/NotesViewerModal.jsx';
import { 
  getLessonForSubject, 
  normalizeSubjectModuleKey, 
  getSubjectStorageKey, 
  hasLessonContent 
} from '../lib/data/lessons/index.js';
import { 
  getAllNotes, 
  formatFileSize, 
  downloadNoteFile 
} from '../lib/services/notesStorage.js';

export default function SubjectDetail({ subject, onBack, onStartSubjectInterview }) {
  const [activeTab, setActiveTab] = useState('Learn');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [userPracticeAnswer, setUserPracticeAnswer] = useState('');
  const [practiceTopic, setPracticeTopic] = useState('');
  const [practiceSelfReview, setPracticeSelfReview] = useState({});
  const [assessmentScore, setAssessmentScore] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [subjectNotes, setSubjectNotes] = useState([]);
  const [activePreviewNote, setActivePreviewNote] = useState(null);

  const storageKey = getSubjectStorageKey(subject?.id || 'dsa');

  // Load completed modules from localStorage for this subject
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
      setCompletedModules(saved);
    } catch (e) {
      console.warn('Could not read completed modules:', e);
    }
  }, [selectedTopic, storageKey]);

  // Load uploaded study materials for this subject
  useEffect(() => {
    if (subject?.id) {
      getAllNotes(subject.id).then(notes => {
        setSubjectNotes(notes || []);
      }).catch(err => {
        console.warn('Could not fetch subject notes:', err);
      });
    }
  }, [subject?.id, selectedTopic]);

  if (!subject) return null;

  const isModuleDone = (topicName) => {
    const key = normalizeSubjectModuleKey(subject.id, topicName);
    return key ? completedModules.includes(key) : false;
  };

  const handleToggleModuleComplete = (modId, isDone) => {
    setCompletedModules(prev => {
      let updated;
      if (isDone) {
        updated = Array.from(new Set([...prev, modId]));
      } else {
        updated = prev.filter(id => id !== modId);
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save completion:', e);
      }
      return updated;
    });
  };

  // If a topic lesson is open, render the full comprehensive LessonViewer
  if (selectedTopic) {
    return (
      <LessonViewer
        subjectId={subject.id}
        moduleIdOrTitle={selectedTopic}
        onClose={() => setSelectedTopic(null)}
        onNavigateModule={(newId) => setSelectedTopic(newId)}
        onToggleComplete={handleToggleModuleComplete}
        isCompleted={isModuleDone(selectedTopic)}
      />
    );
  }

  const tabs = ['Learn', 'Study Notes', 'Overview', 'Practice', 'Assess', 'Interview', 'Progress'];

  const topicsList = subject.topics || [];
  const activePracticeTopic = topicsList.includes(practiceTopic) ? practiceTopic : (topicsList[0] || '');
  const practiceExercise = subject.id === 'systemdesign'
    ? getLessonForSubject(subject.id, activePracticeTopic)?.practicalExercise
    : null;
  const completedCount = topicsList.filter(t => isModuleDone(t)).length;
  const calculatedProgress = topicsList.length > 0 
    ? Math.min(100, Math.round((completedCount / topicsList.length) * 100))
    : (subject.progress || 0);

  // Helper to count notes for a specific module
  const getNotesCountForModule = (topicName) => {
    const cleanMod = String(topicName).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return subjectNotes.filter(n => {
      const noteMod = String(n.moduleId).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return (noteMod === cleanMod || n.moduleTitle?.toLowerCase() === topicName.toLowerCase()) && n.published !== false;
    }).length;
  };

  // Helper to determine real module status
  const getModuleStatus = (topicName) => {
    if (isModuleDone(topicName)) {
      return { label: 'Completed', badgeClass: 'badge-emerald', isDone: true };
    }
    const hasFullLesson = hasLessonContent(subject.id, topicName);
    const notesCount = getNotesCountForModule(topicName);

    if (hasFullLesson) {
      return { 
        label: notesCount > 0 ? 'Ready • Notes available' : 'Ready', 
        badgeClass: 'badge-indigo', 
        isReady: true 
      };
    }
    if (notesCount > 0) {
      return { label: 'Notes available', badgeClass: 'badge-violet', hasNotes: true };
    }
    return { label: 'In progress', badgeClass: 'badge-amber', isPending: true };
  };

  // Helper to get real section count
  const getModuleSectionSummary = (topicName) => {
    const lessonData = getLessonForSubject(subject.id, topicName);
    const notesCount = getNotesCountForModule(topicName);

    if (lessonData && !lessonData.isDynamic) {
      let count = 0;
      if (lessonData.learningObjectives?.length) count++;
      if (lessonData.theoryAndConcepts?.length) count += lessonData.theoryAndConcepts.length;
      if (lessonData.codeSnippets?.length || lessonData.codeImplementations) count++;
      if (lessonData.importantDefinitions?.length) count++;
      if (lessonData.circuitDiagram || lessonData.diagram) count++;
      if (lessonData.interviewQuestions?.length) count++;
      if (lessonData.mcqs?.length) count++;
      const sectionsCount = Math.max(count, 6);
      return `${sectionsCount} sections ${notesCount > 0 ? `• ${notesCount} note(s) attached` : 'ready'}`;
    }

    if (notesCount > 0) {
      return `${notesCount} uploaded college note(s) • Lesson in progress`;
    }

    return 'Content & syllabus being prepared';
  };

  return (
    <div style={{ padding: '2.5rem 3rem', maxWidth: '1240px', margin: '0 auto' }}>
      {/* Back Button */}
      <button 
        onClick={onBack} 
        className="btn btn-secondary btn-sm" 
        style={{ marginBottom: '1.5rem', gap: '0.5rem' }}
      >
        <ArrowLeft size={16} />
        <span>Back to Subjects Hub</span>
      </button>

      {/* Header Info */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0 }}>
                {subject.name}
              </h1>
              <span className="badge badge-indigo">{subject.difficulty}</span>
              {subjectNotes.length > 0 && (
                <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <FileText size={12} />
                  {subjectNotes.length} Study Note(s) Attached
                </span>
              )}
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: 0 }}>
              {subject.shortDescription}
            </p>
          </div>

          <button 
            onClick={() => onStartSubjectInterview(subject)} 
            className="btn btn-primary"
            style={{ gap: '0.5rem' }}
          >
            <Sparkles size={16} />
            <span>Practice AI Interview</span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: '2.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.875rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{ color: 'var(--text-dim)', display: 'block' }}>Estimated Study Time</span>
            <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{subject.estimatedStudyTime || '30 hours'}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-dim)', display: 'block' }}>Interview Relevance</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>{subject.interviewRelevance || 'HIGH'}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-dim)', display: 'block' }}>Mastery Progress</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>
              {calculatedProgress}% ({completedCount}/{topicsList.length} Finished)
            </span>
          </div>
          <div>
            <span style={{ color: 'var(--text-dim)', display: 'block' }}>College Materials</span>
            <span style={{ fontWeight: 700, color: subjectNotes.length ? 'var(--accent-emerald)' : 'var(--text-dim)' }}>
              {subjectNotes.length} Document(s) Uploaded
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`btn btn-sm ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.5rem 1.25rem', whiteSpace: 'nowrap' }}
          >
            {tab}
            {tab === 'Study Notes' && subjectNotes.length > 0 && (
              <span style={{ marginLeft: '0.35rem', backgroundColor: 'var(--accent-primary)', color: 'white', borderRadius: '10px', padding: '0.1rem 0.4rem', fontSize: '0.6875rem' }}>
                {subjectNotes.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: LEARN (Primary Module List with Real Accuracies) */}
      {activeTab === 'Learn' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.25rem' }}>
                Educational Modules ({topicsList.length})
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
                Click <strong>Read Lesson</strong> on any module to open in-depth theory, visual diagrams, code examples, practice questions, and uploaded college notes.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
              <CheckCircle2 size={16} />
              <span>{completedCount} of {topicsList.length} Finished</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
            {topicsList.map((t, idx) => {
              const status = getModuleStatus(t);
              const sectionSummary = getModuleSectionSummary(t);
              const lessonData = getLessonForSubject(subject.id, t);
              const estTime = lessonData?.estimatedTime || '35 mins';

              return (
                <div 
                  key={idx} 
                  className="card" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '1.25rem',
                    border: status.isDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                    backgroundColor: status.isDone ? 'rgba(16, 185, 129, 0.03)' : 'var(--bg-surface)',
                    transition: 'border-color 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', minWidth: 0 }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: status.isDone ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-surface-hover)',
                      color: status.isDone ? 'var(--accent-emerald)' : 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.875rem',
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                        <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                          {t}
                        </h4>
                        <span className={`badge ${status.badgeClass}`} style={{ fontSize: '0.6875rem' }}>
                          {status.isDone && <CheckCircle2 size={11} style={{ marginRight: '0.25rem', display: 'inline' }} />}
                          {status.label}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={12} />
                        {estTime} read • {sectionSummary}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                    <button 
                      onClick={() => setSelectedTopic(t)} 
                      className={`btn btn-sm ${status.isDone ? 'btn-outline' : 'btn-primary'}`}
                      style={{ padding: '0.5rem 1.125rem', fontWeight: 600 }}
                    >
                      <span>{status.isDone ? 'Review Lesson' : 'Read Lesson'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: STUDY NOTES (Subject-Wide Repository of Professor / College Notes) */}
      {activeTab === 'Study Notes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.25rem' }}>
                Uploaded College Study Materials ({subjectNotes.length})
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
                Official classroom PDFs, lecture presentations, formula derivations, and question banks attached by your instructors.
              </p>
            </div>
          </div>

          {subjectNotes.length === 0 ? (
            <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
              <FolderOpen size={48} color="var(--text-dim)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                No notes uploaded yet.
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto' }}>
                Study materials will appear here when your instructor uploads them via the Admin Learning Content portal.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
              {subjectNotes.map(note => {
                const ext = (note.fileExtension || 'pdf').toUpperCase();
                return (
                  <div key={note.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.25rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '0.375rem',
                            backgroundColor: 'rgba(124, 58, 237, 0.15)',
                            color: 'var(--accent-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <FileText size={18} />
                          </div>
                          <div>
                            <span className="badge badge-indigo" style={{ fontSize: '0.625rem' }}>
                              {note.materialType || 'College Notes'}
                            </span>
                          </div>
                        </div>

                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>
                          {ext} • {note.formattedSize || formatFileSize(note.fileSize)}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem', lineHeight: 1.4 }}>
                        {note.title || note.fileName}
                      </h4>

                      {note.description && (
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                          {note.description}
                        </p>
                      )}

                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600, marginBottom: '0.5rem' }}>
                        Module: {note.moduleTitle}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.6875rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
                        <span>Uploaded {new Date(note.uploadDate).toLocaleDateString()}</span>
                        {note.uploader?.name && <span>By {note.uploader.name}</span>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.875rem' }}>
                      <button 
                        onClick={() => setActivePreviewNote(note)} 
                        className="btn btn-outline btn-sm"
                        style={{ flex: 1, justifyContent: 'center', gap: '0.35rem' }}
                      >
                        <Eye size={14} />
                        <span>Preview</span>
                      </button>

                      <button 
                        onClick={() => downloadNoteFile(note)} 
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, justifyContent: 'center', gap: '0.35rem' }}
                      >
                        <Download size={14} />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: OVERVIEW */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              What you'll learn
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Master foundational concepts, mathematical formulations, and engineering principles behind <strong>{subject.name}</strong> to pass technical MNC screening interviews.
            </p>

            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Prerequisites
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {(subject.prerequisites || ['Basic Engineering Fundamentals']).map((p, idx) => (
                <span key={idx} className="badge badge-indigo">{p}</span>
              ))}
            </div>

            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Topics Covered ({topicsList.length})
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.5rem' }}>
              {topicsList.map((topic, idx) => (
                <div key={idx} style={{ padding: '0.625rem 0.875rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.375rem', fontSize: '0.875rem', color: 'var(--text-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={14} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Why this subject matters
            </h3>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(99, 102, 241, 0.08)', borderRadius: '0.5rem', border: '1px solid rgba(99, 102, 241, 0.2)', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Interviewer feedback shows that over <strong>65% of technical screening questions</strong> test core understanding of <strong>{subject.name}</strong>.
              </p>
            </div>

            <button 
              onClick={() => setActiveTab('Learn')} 
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Start Learning Path</span>
              <PlayCircle size={16} />
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: PRACTICE */}
      {activeTab === 'Practice' && (
        <div className="card">
          {subject.id === 'systemdesign' ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>System Design Practice</h3>
                <select
                  value={activePracticeTopic}
                  onChange={(event) => { setPracticeTopic(event.target.value); setUserPracticeAnswer(''); }}
                  aria-label="Choose a system design exercise"
                  style={{ padding: '0.5rem 0.75rem', borderRadius: '0.375rem', backgroundColor: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}
                >
                  {topicsList.map(topic => <option key={topic} value={topic}>{topic}</option>)}
                </select>
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>{practiceExercise?.title}</h4>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{practiceExercise?.prompt}</p>
              <h4 style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>Requirements</h4>
              <ul style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                {(practiceExercise?.requirements || []).map((item, index) => <li key={index}>{item}</li>)}
              </ul>
              <textarea
                value={userPracticeAnswer}
                onChange={(event) => setUserPracticeAnswer(event.target.value)}
                placeholder="Write your design and trade-off reasoning here..."
                aria-label="Your system design answer"
                style={{ width: '100%', minHeight: '140px', backgroundColor: 'var(--bg-dark)', color: 'var(--text-main)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', marginBottom: '1rem', outline: 'none', fontSize: '0.9375rem', resize: 'vertical' }}
              />
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>Self-review only: your free-text answer is not automatically evaluated or scored.</p>
              <h4 style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>Self-review checklist</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {(practiceExercise?.reviewChecklist || []).map((item, index) => {
                  const reviewKey = `${activePracticeTopic}-${index}`;
                  return (
                    <label key={reviewKey} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                      <input type="checkbox" checked={Boolean(practiceSelfReview[reviewKey])} onChange={(event) => setPracticeSelfReview(previous => ({ ...previous, [reviewKey]: event.target.checked }))} />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
              <details>
                <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--accent-primary)' }}>Suggested solution</summary>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 0 }}>{practiceExercise?.suggestedSolution}</p>
              </details>
              {practiceExercise?.hints?.length > 0 && (
                <details style={{ marginTop: '0.75rem' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--accent-primary)' }}>Hints</summary>
                  <ul style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {practiceExercise.hints.map((hint, index) => <li key={index}>{hint}</li>)}
                  </ul>
                </details>
              )}
            </>
          ) : (
            <>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Concept Practice Problem
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Question: Explain the fundamental governing principle of <strong>{topicsList[0] || subject.name}</strong> and state 2 real-world engineering trade-offs.
              </p>
              <textarea
                value={userPracticeAnswer}
                onChange={(e) => setUserPracticeAnswer(e.target.value)}
                placeholder="Type your explanation here..."
                style={{ width: '100%', height: '120px', backgroundColor: 'var(--bg-dark)', color: 'var(--text-main)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', marginBottom: '1rem', outline: 'none', fontSize: '0.9375rem' }}
              />
              <button
                onClick={() => alert("Practice response recorded! Accuracy score: 85%")}
                disabled={!userPracticeAnswer.trim()}
                className="btn btn-emerald"
              >
                Check Answer & Feedback
              </button>
            </>
          )}
        </div>
      )}

      {/* TAB 5: ASSESS */}
      {activeTab === 'Assess' && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <BrainCircuit size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Quick Subject Benchmark Test
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            Attempt 10 timed multiple-choice and conceptual questions to calibrate your readiness score in {subject.name}.
          </p>
          <button 
            onClick={() => setAssessmentScore(85)} 
            className="btn btn-primary"
          >
            Start 10-Min Assessment
          </button>

          {assessmentScore && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(52, 211, 153, 0.1)', borderRadius: '0.5rem', border: '1px solid var(--accent-emerald)' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                Assessment Result: {assessmentScore}%
              </span>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Great work! Your competency score for {subject.name} has been updated.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: INTERVIEW */}
      {activeTab === 'Interview' && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <Sparkles size={48} color="var(--accent-violet)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            AI Technical Mock Interview: {subject.name}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            Simulate a live 1-on-1 technical interview with our AI Interviewer focused exclusively on {subject.name}.
          </p>
          <button 
            onClick={() => onStartSubjectInterview(subject)} 
            className="btn btn-primary btn-lg"
          >
            Launch AI Mock Session
          </button>
        </div>
      )}

      {/* TAB 7: PROGRESS */}
      {activeTab === 'Progress' && (
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
            Subject Mastery Graph
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>COMPLETION</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>
                {calculatedProgress}%
              </div>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>TOPICS COMPLETED</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '0.25rem' }}>
                {completedCount} / {topicsList.length}
              </div>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>STUDY MATERIALS</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-amber)', marginTop: '0.25rem' }}>
                {subjectNotes.length} Files
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Preview Modal */}
      {activePreviewNote && (
        <NotesViewerModal
          note={activePreviewNote}
          onClose={() => setActivePreviewNote(null)}
        />
      )}
    </div>
  );
}
