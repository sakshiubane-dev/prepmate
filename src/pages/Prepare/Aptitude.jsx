import React, { useState } from 'react';
import { APTITUDE_CATEGORIES } from '../../lib/seedData';
import { BrainCircuit, Clock, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

export default function Aptitude() {
  const [activeCategory, setActiveCategory] = useState(APTITUDE_CATEGORIES[0]);
  const [inTestMode, setInTestMode] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testFinished, setTestFinished] = useState(false);

  const sampleQuestions = [
    {
      id: "q1",
      question: "A and B can complete a work in 12 days and 18 days respectively. A works for 4 days and then leaves. In how many days can B alone complete the remaining work?",
      options: ["9 days", "12 days", "14 days", "10 days"],
      correct: 1, // 12 days
      explanation: "A's 1 day work = 1/12. A's 4 days work = 4/12 = 1/3. Remaining work = 1 - 1/3 = 2/3. B's 1 day work = 1/18. Time taken by B = (2/3) / (1/18) = 12 days."
    },
    {
      id: "q2",
      question: "If 'PRODUCE' is coded as 'OROCDEP', how is 'FLAWLESS' coded in that same system?",
      options: ["EKBVLDDR", "EKAWLESR", "EKBWLESR", "EKAVLDER"],
      correct: 0,
      explanation: "Each letter is shifted backward by 1 position: P->O, R->Q, etc. Applying to FLAWLESS yields EKBVLDDR."
    },
    {
      id: "q3",
      question: "Choose the word which is most nearly SIMILAR in meaning to 'RESILIENT':",
      options: ["Fragile", "Adaptable & Robust", "Indifferent", "Rigid"],
      correct: 1,
      explanation: "'Resilient' means able to withstand or recover quickly from difficult conditions (Adaptable & Robust)."
    }
  ];

  const handleSelectOption = (optIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIdx]: optIdx }));
  };

  const handleFinishTest = () => {
    setTestFinished(true);
  };

  const calculateScore = () => {
    let score = 0;
    sampleQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score++;
    });
    return score;
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <BrainCircuit size={24} color="var(--accent-amber)" />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
              MNC Aptitude & Reasoning Suite
            </h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Quantitative, Logical, and Verbal preparation for MNC screening exams (TCS NQT, Infosys, Accenture).
          </p>
        </div>

        {!inTestMode && (
          <button onClick={() => { setInTestMode(true); setTestFinished(false); setCurrentQuestionIdx(0); setSelectedAnswers({}); }} className="btn btn-emerald">
            <Clock size={16} />
            <span>Start 15-Min Timed Test</span>
          </button>
        )}
      </div>

      {!inTestMode ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {APTITUDE_CATEGORIES.map(cat => (
            <div key={cat.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>{cat.topics.length} Key Topics</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
                  {cat.title}
                </h3>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  {cat.topics.map((t, idx) => <li key={idx}>{t}</li>)}
                </ul>
              </div>

              <button onClick={() => { setActiveCategory(cat); setInTestMode(true); }} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Practice {cat.title}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
          {!testFinished ? (
            <div>
              {/* Question Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <span className="badge badge-indigo">
                  Question {currentQuestionIdx + 1} of {sampleQuestions.length}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                  <Clock size={16} />
                  <span>14:45 remaining</span>
                </div>
              </div>

              {/* Question Text */}
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                {sampleQuestions[currentQuestionIdx].question}
              </h3>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {sampleQuestions[currentQuestionIdx].options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQuestionIdx] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                        backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-surface-hover)',
                        color: isSelected ? '#fff' : 'var(--text-main)',
                        fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <span>{opt}</span>
                      {isSelected && <CheckCircle2 size={18} color="var(--accent-primary)" />}
                    </button>
                  );
                })}
              </div>

              {/* Footer Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  disabled={currentQuestionIdx === 0}
                  onClick={() => setCurrentQuestionIdx(currentQuestionIdx - 1)}
                  className="btn btn-secondary"
                  style={{ opacity: currentQuestionIdx === 0 ? 0.5 : 1 }}
                >
                  Previous
                </button>

                {currentQuestionIdx < sampleQuestions.length - 1 ? (
                  <button onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)} className="btn btn-primary">
                    Next Question
                  </button>
                ) : (
                  <button onClick={handleFinishTest} className="btn btn-emerald">
                    Submit Aptitude Test
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Test Results Score Card */
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '1rem' }}>Test Completed</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                Aptitude Test Results
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: '1rem 0' }}>
                {calculateScore()} / {sampleQuestions.length}
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Accuracy: {Math.round((calculateScore() / sampleQuestions.length) * 100)}%
              </p>

              {/* Explanations */}
              <div style={{ textAlign: 'left', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sampleQuestions.map((q, idx) => (
                  <div key={idx} style={{ padding: '1rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>
                      {idx + 1}. {q.question}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>
                      <strong>Solution:</strong> {q.explanation}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setInTestMode(false)} className="btn btn-primary">
                <RotateCcw size={16} />
                <span>Return to Aptitude Categories</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
