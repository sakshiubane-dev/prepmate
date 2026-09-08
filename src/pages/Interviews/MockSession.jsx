import React, { useState, useEffect } from 'react';
import { Sparkles, Mic, MicOff, Volume2, VolumeX, Send, ArrowRight, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { aiOrchestrator } from '../../lib/ai/aiOrchestrator';

export default function MockSession({ interviewType = 'TECHNICAL', onFinishInterview }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationHistory, setEvaluationHistory] = useState([]);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const questionSet = [
    {
      id: "q_1",
      question: "Explain the JavaScript Event Loop, Macro-tasks vs Micro-tasks queue execution order, and how Promise callbacks differ from setTimeout.",
      type: "TECHNICAL"
    },
    {
      id: "q_2",
      question: "Describe a project where your initial system architecture experienced performance bottlenecks under high concurrent traffic. What specific trade-offs did you make to resolve it?",
      type: "SYSTEM_DESIGN"
    },
    {
      id: "q_3",
      question: "Tell me about a situation where a critical deadline was approaching and you had a technical disagreement with a senior engineer. How did you handle it?",
      type: "HR"
    }
  ];

  const currentQuestion = questionSet[currentQuestionIdx] || questionSet[0];

  // Timer tick effect
  useEffect(() => {
    const interval = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Web Speech API Voice synthesis prompt read
  useEffect(() => {
    if (!isMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentQuestionIdx, isMuted]);

  const toggleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRec();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setUserAnswer(transcript);
        };
        recognition.start();
      }
    } else {
      setIsRecording(false);
    }
  };

  const handleSendAnswer = async () => {
    if (!userAnswer.trim()) return;

    setEvaluating(true);
    const evalRes = await aiOrchestrator.evaluateAnswer({
      type: currentQuestion.type,
      question: currentQuestion.question,
      answer: userAnswer
    });
    setEvaluating(false);

    const historyItem = {
      question: currentQuestion.question,
      answer: userAnswer,
      evaluation: evalRes
    };

    const newHistory = [...evaluationHistory, historyItem];
    setEvaluationHistory(newHistory);
    setUserAnswer('');

    if (currentQuestionIdx < questionSet.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Finish Interview Session
      onFinishInterview({
        type: interviewType,
        history: newHistory,
        duration: `${Math.floor(timerSeconds / 60)}m ${timerSeconds % 60}s`,
        avgScore: Math.round(newHistory.reduce((acc, h) => acc + h.evaluation.score, 0) / newHistory.length)
      });
    }
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto', height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Session Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles size={20} color="var(--accent-primary)" />
          <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#fff' }}>
            AI Mock Interviewer Session
          </h2>
          <span className="badge badge-indigo">
            Question {currentQuestionIdx + 1} of {questionSet.length}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button onClick={() => setIsMuted(!isMuted)} className="btn btn-outline btn-sm">
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} color="var(--accent-emerald)" />}
            <span>{isMuted ? 'Voice Off' : 'Voice On'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
            <Clock size={16} />
            <span>{formatTimer(timerSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Interviewer Persona + Candidate Input Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        {/* Left Column: AI Interviewer Prompt Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(180deg, var(--bg-surface) 0%, rgba(17, 22, 37, 0.95) 100%)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)'
              }}>
                <Sparkles size={22} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                  AI Senior MNC Interviewer
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  Active Assessment Mode
                </span>
              </div>
            </div>

            {/* Question Text Box */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--bg-dark)',
              borderRadius: '0.75rem',
              border: '1px solid var(--border-color)',
              marginBottom: '1.5rem'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>
                INTERVIEWER QUESTION:
              </span>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, color: '#fff', lineHeight: 1.6 }}>
                "{currentQuestion.question}"
              </p>
            </div>
          </div>

          {/* Previous Question Feedback Snippet */}
          {evaluationHistory.length > 0 && (
            <div style={{ padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.08)', borderRadius: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                  PREVIOUS ANSWER EVALUATION:
                </span>
                <span style={{ fontWeight: 800, color: '#fff' }}>
                  {evaluationHistory[evaluationHistory.length - 1].evaluation.score}%
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {evaluationHistory[evaluationHistory.length - 1].evaluation.strengths[0]}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Candidate Answer Input (Speech/Text) */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>
                YOUR RESPONSE (TEXT OR SPEECH)
              </span>

              <button
                onClick={toggleVoiceRecording}
                className={`btn btn-sm ${isRecording ? 'btn-emerald' : 'btn-outline'}`}
              >
                {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                <span>{isRecording ? 'Listening...' : 'Voice Input'}</span>
              </button>
            </div>

            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="State your answer clearly. Include trade-offs, Big-O complexity, or STAR framework metrics where applicable..."
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'var(--bg-dark)',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                padding: '1.25rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)',
                outline: 'none',
                resize: 'none',
                lineHeight: 1.6,
                marginBottom: '1rem'
              }}
            />
          </div>

          <button
            onClick={handleSendAnswer}
            disabled={evaluating || !userAnswer.trim()}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {evaluating ? (
              <span>Evaluating Response...</span>
            ) : (
              <>
                <span>{currentQuestionIdx < questionSet.length - 1 ? 'Submit & Next Question' : 'Submit & Finish Mock Session'}</span>
                <Send size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
